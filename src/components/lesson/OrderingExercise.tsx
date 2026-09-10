'use client';

import { useMemo, useState } from 'react';
import type { OrderingStep } from '@/domain/content/types';
import { isCorrectOrder, moveOrderingItem } from '@/domain/learning/ordering';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

type OrderingExerciseProps = {
  step: OrderingStep;
  locale: 'en' | 'kk';
  onAttempt: (correct: boolean) => void;
  onContinue: () => void;
};

export function OrderingExercise({ step, locale, onAttempt, onContinue }: OrderingExerciseProps) {
  const initialOrder = useMemo(() => step.items.map((item) => item.id), [step.items]);
  const [order, setOrder] = useState(initialOrder);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const copy = lessonUiCopy[locale];

  const itemById = useMemo(() => new Map(step.items.map((item) => [item.id, item])), [step.items]);

  function move(index: number, direction: -1 | 1) {
    if (resolved) return;
    setOrder((current) => moveOrderingItem(current, index, direction));
  }

  function check() {
    if (resolved) return;
    const correct = isCorrectOrder(order, step.correctOrder);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    onAttempt(correct);
    if (correct) {
      setResolved(true);
      return;
    }
    if (nextAttempts >= 2) {
      setOrder(step.correctOrder);
      setRevealed(true);
      setResolved(true);
    }
  }

  return (
    <section className="lesson-stage lesson-stage--question" aria-labelledby="ordering-title">
      <div className="lesson-stage__inner lesson-stage__inner--narrow">
        <p className="eyebrow eyebrow--dark">{copy.ordering.eyebrow.toUpperCase()}</p>
        <h1 id="ordering-title" className="question-title">{step.prompt[locale]}</h1>
        <p className="ordering-instruction">
          {copy.ordering.instruction}
        </p>

        <ol className="ordering-list" aria-label={copy.ordering.listLabel}>
          {order.map((id, index) => {
            const item = itemById.get(id)!;
            return (
              <li className="ordering-card" key={id}>
                <span className="ordering-card__position" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="ordering-card__label">{item.label[locale]}</span>
                <span className="ordering-card__controls">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={resolved || index === 0}
                    aria-label={`${copy.ordering.moveUp}: ${item.label[locale]}`}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={resolved || index === order.length - 1}
                    aria-label={`${copy.ordering.moveDown}: ${item.label[locale]}`}
                  >
                    ↓
                  </button>
                </span>
              </li>
            );
          })}
        </ol>

        {!resolved && (
          <button type="button" className="button button--dark ordering-check" onClick={check}>
            {copy.ordering.check}
          </button>
        )}

        {attempts > 0 && !resolved && (
          <div className="feedback-panel" role="status">
            <strong>{copy.common.notYet.toUpperCase()}</strong>
            <p>{copy.ordering.retry}</p>
          </div>
        )}

        {resolved && (
          <div className="feedback-panel feedback-panel--resolved" role="status">
            <strong>{(revealed ? copy.ordering.revealed : copy.common.connectionFound).toUpperCase()}</strong>
            <p>{step.explanation[locale]}</p>
            <button type="button" className="button button--dark" onClick={onContinue}>{copy.common.continue}</button>
          </div>
        )}
      </div>
    </section>
  );
}
