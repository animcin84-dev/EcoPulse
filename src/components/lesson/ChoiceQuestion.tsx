'use client';

import { useEffect, useState } from 'react';
import type { ChoiceOption, LocalizedText } from '@/domain/content/types';
import { isReasoningResponseReady } from '@/domain/learning/adaptive-support';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

type ChoiceQuestionProps = {
  label: string;
  prompt: LocalizedText;
  options: ChoiceOption[];
  correctOptionId: string;
  explanation: LocalizedText;
  hint?: LocalizedText;
  locale: 'en' | 'kk';
  secondaryLocale?: 'kk';
  showHintBeforeAttempt?: boolean;
  showHintAfterFirstAttempt?: boolean;
  reasoningPrompt?: LocalizedText;
  requireReasoning?: boolean;
  onAttempt: (correct: boolean) => void;
  onContinue: () => void;
};

export function ChoiceQuestion({
  label,
  prompt,
  options,
  correctOptionId,
  explanation,
  hint,
  locale,
  secondaryLocale,
  showHintBeforeAttempt = false,
  showHintAfterFirstAttempt = true,
  reasoningPrompt,
  requireReasoning = false,
  onAttempt,
  onContinue,
}: ChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [reasoning, setReasoning] = useState('');
  const copy = lessonUiCopy[locale];

  function choose(optionId: string) {
    if (resolved) return;
    const correct = optionId === correctOptionId;
    const nextAttempts = attempts + 1;
    setSelected(optionId);
    setAttempts(nextAttempts);
    onAttempt(correct);
    if (correct || nextAttempts >= 2) setResolved(true);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (resolved) return;
      const index = Number(event.key) - 1;
      if (index >= 0 && index < options.length) choose(options[index]!.id);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, resolved, attempts]);

  const correct = selected === correctOptionId;
  const showFinalCorrect = resolved && !correct;

  return (
    <section className="lesson-stage lesson-stage--question" aria-labelledby="question-title">
      <div className="lesson-stage__inner lesson-stage__inner--narrow">
        <p className="eyebrow eyebrow--dark">{label}</p>
        <h1 id="question-title" className="question-title">{prompt[locale]}</h1>
        {showHintBeforeAttempt && hint && !selected && <div className="adaptive-clue"><span>{copy.common.clue.toUpperCase()}</span><p>{hint[locale]}</p></div>}
        <div className="choice-list" role="group" aria-label={prompt[locale]}>
          {options.map((option, index) => {
            const isSelected = selected === option.id;
            const isCorrectOption = option.id === correctOptionId;
            const stateClass = isSelected
              ? correct
                ? 'choice-card--correct'
                : 'choice-card--incorrect'
              : showFinalCorrect && isCorrectOption
                ? 'choice-card--correct-reveal'
                : '';
            return (
              <button
                key={option.id}
                type="button"
                className={`choice-card ${stateClass}`.trim()}
                onClick={() => choose(option.id)}
                disabled={resolved}
              >
                <span className="choice-card__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="choice-card__copy"><span>{option.label[locale]}</span>{secondaryLocale && secondaryLocale !== locale && <small lang={secondaryLocale}>{option.label[secondaryLocale]}</small>}</span>
                {showFinalCorrect && isCorrectOption && <span className="choice-card__status">{copy.common.answer.toUpperCase()}</span>}
                {isSelected && correct && <span className="choice-card__status">{copy.common.correct.toUpperCase()}</span>}
              </button>
            );
          })}
        </div>

        {selected && !correct && !resolved && (
          <div className="feedback-panel" role="status">
            <strong>{copy.common.notYet.toUpperCase()}</strong>
            <p>{showHintAfterFirstAttempt ? (hint?.[locale] ?? copy.common.retryConnection) : copy.common.compareNoClue}</p>
          </div>
        )}

        {resolved && (
          <div className="feedback-panel feedback-panel--resolved" role="status">
            <strong>{(correct ? copy.common.connectionFound : copy.common.answerRevealed).toUpperCase()}</strong>
            <p>{explanation[locale]}</p>
            {reasoningPrompt && requireReasoning && (
              <label className="reasoning-extension">
                <span>{copy.choice.reasoningLabel.toUpperCase()}</span>
                <strong>{reasoningPrompt[locale]}</strong>
                <textarea lang="en" value={reasoning} onChange={(event: { currentTarget: { value: string } }) => setReasoning(event.currentTarget.value)} maxLength={280} rows={3} placeholder={copy.choice.reasoningPlaceholder} />
                <small>{(isReasoningResponseReady(reasoning) ? copy.choice.reasoningReady : copy.choice.reasoningMinimum).toUpperCase()}</small>
              </label>
            )}
            <button type="button" className="button button--dark" onClick={onContinue} disabled={requireReasoning && !!reasoningPrompt && !isReasoningResponseReady(reasoning)}>{copy.common.continue}</button>
          </div>
        )}
      </div>
    </section>
  );
}
