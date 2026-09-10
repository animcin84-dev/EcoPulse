'use client';

import { useState } from 'react';
import type { FillBlankStep } from '@/domain/content/types';
import { isAcceptedFillBlankAnswer } from '@/domain/learning/exercise-evaluation';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

type FillBlankExerciseProps = {
  step: FillBlankStep;
  locale: 'en' | 'kk';
  onAttempt: (correct: boolean) => void;
  onContinue: () => void;
};

export function FillBlankExercise({ step, locale, onAttempt, onContinue }: FillBlankExerciseProps) {
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [correct, setCorrect] = useState(false);
  const copy = lessonUiCopy[locale];

  function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    if (resolved || !answer.trim()) return;
    const isCorrect = isAcceptedFillBlankAnswer(answer, step.acceptedAnswers);
    const nextAttempts = attempts + 1;
    setCorrect(isCorrect);
    setAttempts(nextAttempts);
    onAttempt(isCorrect);
    if (isCorrect || nextAttempts >= 2) setResolved(true);
  }

  return (
    <section className="lesson-stage lesson-stage--question" aria-labelledby={`fill-blank-title-${step.id}`}>
      <div className="lesson-stage__inner lesson-stage__inner--narrow">
        <p className="eyebrow eyebrow--dark">{copy.fill.eyebrow.toUpperCase()}</p>
        <h1 id={`fill-blank-title-${step.id}`} className="question-title">{step.title[locale]}</h1>
        <p className="fill-blank-prompt">{step.prompt[locale]}</p>

        <form className="fill-blank-form" onSubmit={submit}>
          <label htmlFor={`fill-blank-${step.id}`}>
            <span>{copy.fill.inputLabel}</span>
            <input
              id={`fill-blank-${step.id}`}
              type="text"
              value={answer}
              onChange={(event: { currentTarget: { value: string } }) => setAnswer(event.currentTarget.value)}
              disabled={resolved}
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-describedby={attempts > 0 ? `fill-feedback-${step.id}` : undefined}
            />
          </label>
          {!resolved && (
            <button type="submit" className="button button--dark" disabled={!answer.trim()}>
              {copy.fill.check}
            </button>
          )}
        </form>

        {attempts > 0 && !resolved && (
          <div id={`fill-feedback-${step.id}`} className="feedback-panel" role="status">
            <strong>{copy.common.notYet.toUpperCase()}</strong>
            <p>{step.hint?.[locale] ?? copy.fill.retry}</p>
          </div>
        )}

        {resolved && (
          <div id={`fill-feedback-${step.id}`} className="feedback-panel feedback-panel--resolved" role="status">
            <strong>{(correct ? copy.fill.success : copy.common.answerRevealed).toUpperCase()}</strong>
            {!correct && <p className="fill-blank-reveal"><b>{copy.fill.answerPrefix}</b> {step.acceptedAnswers[0]}</p>}
            <p>{step.explanation[locale]}</p>
            <button type="button" className="button button--dark" onClick={onContinue}>{copy.common.continue}</button>
          </div>
        )}
      </div>
    </section>
  );
}
