'use client';

import { useEffect, useState } from 'react';
import type { ReadingStep } from '@/domain/content/types';
import type { LearningLevel } from '@/domain/learning/onboarding';
import type { PreferredLocale } from '@/domain/learning/settings';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

export function ReadingExercise({
  step,
  locale,
  level,
  onAttempt,
  onContinue,
}: {
  step: ReadingStep;
  locale: PreferredLocale;
  level: LearningLevel;
  onAttempt: (correct: boolean) => void;
  onContinue: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const copy = lessonUiCopy[locale];
  const passage = step.passages[level];

  function choose(answerId: string) {
    if (resolved) return;
    const correct = answerId === step.correctAnswerId;
    const nextAttempts = attempts + 1;
    setSelected(answerId);
    setAttempts(nextAttempts);
    onAttempt(correct);
    if (correct || nextAttempts >= 2) setResolved(true);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (resolved) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < step.answers.length) choose(step.answers[index]!.id);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step.answers, resolved, attempts]);

  const correct = selected === step.correctAnswerId;
  const revealCorrect = resolved && !correct;

  return (
    <section className="lesson-stage lesson-stage--question lesson-stage--reading" aria-labelledby={`reading-title-${step.id}`}>
      <div className="lesson-stage__inner lesson-stage__inner--reading">
        <p className="eyebrow eyebrow--dark">{copy.reading.eyebrow.toUpperCase()} / {level}</p>
        <h1 id={`reading-title-${step.id}`} className="reading-title">{step.title[locale]}</h1>
        <p className="reading-support">{copy.reading.supportNote}</p>

        <article className="reading-passage" lang="en" aria-label={`${step.title.en} — ${level}`}>
          {passage}
        </article>

        <div className="reading-check">
          <p className="reading-check__label">{copy.reading.comprehension.toUpperCase()}</p>
          <h2 className="reading-check__question" lang="en">{step.question}</h2>
          <div className="choice-list" role="group" aria-label={step.question} lang="en">
            {step.answers.map((answer, index) => {
              const isSelected = selected === answer.id;
              const isCorrect = answer.id === step.correctAnswerId;
              const stateClass = isSelected
                ? correct
                  ? 'choice-card--correct'
                  : 'choice-card--incorrect'
                : revealCorrect && isCorrect
                  ? 'choice-card--correct-reveal'
                  : '';
              return (
                <button
                  key={answer.id}
                  type="button"
                  className={`choice-card ${stateClass}`.trim()}
                  onClick={() => choose(answer.id)}
                  disabled={resolved}
                  aria-pressed={isSelected}
                >
                  <span className="choice-card__number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="choice-card__copy"><span>{answer.text}</span></span>
                  {revealCorrect && isCorrect && <span className="choice-card__status">{copy.common.answer.toUpperCase()}</span>}
                  {isSelected && correct && <span className="choice-card__status">{copy.common.correct.toUpperCase()}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {selected && !correct && !resolved && (
          <div className="feedback-panel" role="status" aria-live="polite">
            <strong>{copy.common.notYet.toUpperCase()}</strong>
            <p>{copy.reading.retry}</p>
          </div>
        )}

        {resolved && (
          <div className="feedback-panel feedback-panel--resolved" role="status" aria-live="polite">
            <strong>{(correct ? copy.reading.success : copy.common.answerRevealed).toUpperCase()}</strong>
            <p>{step.explanation[locale]}</p>
            <button type="button" className="button button--dark" onClick={onContinue}>{copy.common.continue}</button>
          </div>
        )}
      </div>
    </section>
  );
}
