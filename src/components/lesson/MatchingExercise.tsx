'use client';

import { useMemo, useState } from 'react';
import type { MatchingStep } from '@/domain/content/types';
import { isMatchingAnswerCorrect } from '@/domain/learning/exercise-evaluation';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

type MatchingExerciseProps = {
  step: MatchingStep;
  locale: 'en' | 'kk';
  onAttempt: (correct: boolean) => void;
  onContinue: () => void;
};

export function MatchingExercise({ step, locale, onAttempt, onContinue }: MatchingExerciseProps) {
  const pairIds = useMemo(() => step.pairs.map((pair) => pair.id), [step.pairs]);
  const rightOptions = useMemo(() => [...step.pairs].reverse(), [step.pairs]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [correct, setCorrect] = useState(false);
  const copy = lessonUiCopy[locale];

  function check() {
    if (resolved || pairIds.some((pairId) => !answers[pairId])) return;
    const isCorrect = isMatchingAnswerCorrect(pairIds, answers);
    const nextAttempts = attempts + 1;
    setCorrect(isCorrect);
    setAttempts(nextAttempts);
    onAttempt(isCorrect);
    if (isCorrect) {
      setResolved(true);
      return;
    }
    if (nextAttempts >= 2) {
      setAnswers(Object.fromEntries(pairIds.map((pairId) => [pairId, pairId])));
      setResolved(true);
    }
  }

  return (
    <section className="lesson-stage lesson-stage--question" aria-labelledby={`matching-title-${step.id}`}>
      <div className="lesson-stage__inner lesson-stage__inner--narrow">
        <p className="eyebrow eyebrow--dark">{copy.matching.eyebrow.toUpperCase()}</p>
        <h1 id={`matching-title-${step.id}`} className="question-title">{step.title[locale]}</h1>
        <p className="matching-prompt">{step.prompt[locale]}</p>
        <p className="matching-instruction">
          {copy.matching.instruction}
        </p>

        <div className="matching-list">
          {step.pairs.map((pair, index) => (
            <div className="matching-row" key={pair.id}>
              <div className="matching-row__concept">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{pair.left[locale]}</strong>
              </div>
              <label>
                <span className="sr-only">{`${copy.matching.meaningFor}: ${pair.left[locale]}`}</span>
                <select
                  value={answers[pair.id] ?? ''}
                  onChange={(event: { currentTarget: { value: string } }) => setAnswers((current) => ({ ...current, [pair.id]: event.currentTarget.value }))}
                  disabled={resolved}
                >
                  <option value="">{copy.matching.chooseMeaning}</option>
                  {rightOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.right[locale]}</option>
                  ))}
                </select>
              </label>
            </div>
          ))}
        </div>

        {!resolved && (
          <button
            type="button"
            className="button button--dark matching-check"
            onClick={check}
            disabled={pairIds.some((pairId) => !answers[pairId])}
          >
            {copy.matching.check}
          </button>
        )}

        {attempts > 0 && !resolved && (
          <div className="feedback-panel" role="status">
            <strong>{copy.common.notYet.toUpperCase()}</strong>
            <p>{copy.matching.retry}</p>
          </div>
        )}

        {resolved && (
          <div className="feedback-panel feedback-panel--resolved" role="status">
            <strong>{(correct ? copy.matching.success : copy.matching.revealed).toUpperCase()}</strong>
            <p>{step.explanation[locale]}</p>
            <button type="button" className="button button--dark" onClick={onContinue}>{copy.common.continue}</button>
          </div>
        )}
      </div>
    </section>
  );
}
