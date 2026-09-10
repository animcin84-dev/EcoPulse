'use client';

import { useEffect, useState } from 'react';
import type { FactMythStep } from '@/domain/content/types';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

type FactMythExerciseProps = {
  step: FactMythStep;
  locale: 'en' | 'kk';
  onAttempt: (correct: boolean) => void;
  onContinue: () => void;
};

export function FactMythExercise({ step, locale, onAttempt, onContinue }: FactMythExerciseProps) {
  const [selected, setSelected] = useState<'fact' | 'myth' | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const copy = lessonUiCopy[locale];

  function choose(answer: 'fact' | 'myth') {
    if (resolved) return;
    const correct = answer === step.correctAnswer;
    const nextAttempts = attempts + 1;
    setSelected(answer);
    setAttempts(nextAttempts);
    onAttempt(correct);
    if (correct || nextAttempts >= 2) setResolved(true);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (resolved) return;
      if (event.key === '1') choose('fact');
      if (event.key === '2') choose('myth');
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [attempts, resolved, step.correctAnswer]);

  const correct = selected === step.correctAnswer;
  const revealCorrect = resolved && !correct;

  return (
    <section className="lesson-stage lesson-stage--question" aria-labelledby={`fact-myth-title-${step.id}`}>
      <div className="lesson-stage__inner lesson-stage__inner--narrow">
        <p className="eyebrow eyebrow--dark">{copy.factMyth.eyebrow.toUpperCase()}</p>
        <h1 id={`fact-myth-title-${step.id}`} className="question-title">{step.title[locale]}</h1>
        <blockquote className="fact-myth-statement">“{step.statement[locale]}”</blockquote>

        <div className="fact-myth-grid" role="group" aria-label={copy.factMyth.groupLabel}>
          {(['fact', 'myth'] as const).map((answer, index) => {
            const isSelected = selected === answer;
            const isCorrectAnswer = answer === step.correctAnswer;
            const state = isSelected
              ? correct
                ? 'fact-myth-option--correct'
                : 'fact-myth-option--incorrect'
              : revealCorrect && isCorrectAnswer
                ? 'fact-myth-option--correct-reveal'
                : '';
            return (
              <button
                key={answer}
                type="button"
                className={`fact-myth-option ${state}`.trim()}
                onClick={() => choose(answer)}
                disabled={resolved}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{(answer === 'fact' ? copy.factMyth.fact : copy.factMyth.myth).toUpperCase()}</strong>
                {revealCorrect && isCorrectAnswer && <small>{copy.common.answer.toUpperCase()}</small>}
                {isSelected && correct && <small>{copy.common.correct.toUpperCase()}</small>}
              </button>
            );
          })}
        </div>

        {selected && !correct && !resolved && (
          <div className="feedback-panel" role="status">
            <strong>{copy.common.notYet.toUpperCase()}</strong>
            <p>{copy.factMyth.retry}</p>
          </div>
        )}

        {resolved && (
          <div className="feedback-panel feedback-panel--resolved" role="status">
            <strong>{(correct ? copy.factMyth.claimChecked : copy.common.answerRevealed).toUpperCase()}</strong>
            <p>{step.explanation[locale]}</p>
            <button type="button" className="button button--dark" onClick={onContinue}>{copy.common.continue}</button>
          </div>
        )}
      </div>
    </section>
  );
}
