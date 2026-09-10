'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { reviewItemsById } from '@/content/review-items';
import { productCopy } from '@/domain/learning/product-copy';
import { evaluateReviewAnswer, reviewModeForStage } from '@/domain/learning/review-mastery';
import { buildReviewBatch } from '@/domain/learning/review';
import { formatReviewItemAnnouncement, formatReviewProgressText } from '@/domain/learning/accessibility';
import { submitDueReviewAnswer } from '@/domain/learning/review-submission';
import { useGuestProgress } from '../progress/GuestProgressProvider';

export function ReviewSession() {
  const { state, hydrated, updateState } = useGuestProgress();
  const [queueIds, setQueueIds] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [resolved, setResolved] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [focusRequest, setFocusRequest] = useState(0);
  const reviewItemFocusRef = useRef<HTMLElement | null>(null);
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].review;

  useEffect(() => {
    if (!hydrated || initialized) return;
    const eligibleRecords = Object.values(state.reviewRecords).filter((record) => reviewItemsById[record.itemId]);
    const batch = buildReviewBatch(eligibleRecords, new Date(), 8);
    setQueueIds(batch.records.map((record) => record.itemId));
    setInitialized(true);
  }, [hydrated, initialized, state.reviewRecords]);

  const currentId = queueIds[index];
  const item = currentId ? reviewItemsById[currentId] : undefined;
  const record = item ? state.reviewRecords[item.id] : undefined;
  const mode = reviewModeForStage(record?.stage ?? 0);
  const complete = queueIds.length > 0 && index >= queueIds.length;
  const remainingDue = complete
    ? buildReviewBatch(
        Object.values(state.reviewRecords).filter((reviewRecord) => reviewItemsById[reviewRecord.itemId]),
        new Date(),
        8,
      ).totalDue
    : 0;

  const progressText = useMemo(
    () => queueIds.length ? formatReviewProgressText(index, queueIds.length, locale) : '0 / 0',
    [index, locale, queueIds.length],
  );

  function resolveAnswer(answerValue: string) {
    if (!item || !record || resolved) return;
    const submittedAt = new Date();
    const isCorrect = evaluateReviewAnswer(mode, answerValue, {
      word: item.word,
      correctOptionId: item.correctOptionId,
      contextAcceptedAnswers: item.context.acceptedAnswers,
    });
    setAnswer(answerValue);
    setWasCorrect(isCorrect);
    setResolved(true);

    updateState((current) => submitDueReviewAnswer(current, {
      itemId: item.id,
      answer: answerValue,
      word: item.word,
      correctOptionId: item.correctOptionId,
      contextAcceptedAnswers: item.context.acceptedAnswers,
    }, submittedAt).state);
  }

  function submitTyped(event: { preventDefault(): void }) {
    event.preventDefault();
    if (!answer.trim()) return;
    resolveAnswer(answer);
  }

  useEffect(() => {
    if (focusRequest === 0) return;
    reviewItemFocusRef.current?.focus({ preventScroll: false });
  }, [focusRequest]);

  useEffect(() => {
    if (!hydrated || !initialized || resolved || mode !== 'recognition' || !item) return;
    const activeItem = item;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target as HTMLElement | null;
      const editable = Boolean(
        target?.isContentEditable
        || target?.tagName === 'INPUT'
        || target?.tagName === 'TEXTAREA'
        || target?.tagName === 'SELECT',
      );
      if (editable) return;

      const optionIndex = Number(event.key) - 1;
      if (!Number.isInteger(optionIndex) || optionIndex < 0 || optionIndex >= activeItem.options.length) return;
      event.preventDefault();
      resolveAnswer(activeItem.options[optionIndex]!.id);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hydrated, initialized, item, mode, resolved]);

  function next() {
    setAnswer('');
    setResolved(false);
    setWasCorrect(false);
    setIndex((value) => value + 1);
    setFocusRequest((value) => value + 1);
  }

  function startNextBatch() {
    const eligibleRecords = Object.values(state.reviewRecords).filter((reviewRecord) => reviewItemsById[reviewRecord.itemId]);
    const batch = buildReviewBatch(eligibleRecords, new Date(), 8);
    setQueueIds(batch.records.map((reviewRecord) => reviewRecord.itemId));
    setIndex(0);
    setAnswer('');
    setResolved(false);
    setWasCorrect(false);
    setFocusRequest((value) => value + 1);
  }

  if (!hydrated || !initialized) {
    return <section className="review-shell"><p className="eyebrow eyebrow--dark">REVIEW</p><h1>{copy.loading}</h1></section>;
  }

  if (!queueIds.length) {
    return (
      <section className="review-shell review-shell--empty">
        <p className="eyebrow eyebrow--dark">{copy.clearEyebrow.toUpperCase()}</p>
        <h1>{copy.clearTitle}</h1>
        <p>{copy.clearBody}</p>
        <Link href="/learn" className="button button--dark">{copy.clearAction}</Link>
      </section>
    );
  }

  if (complete || !item || !record) {
    const hasMoreDue = complete && remainingDue > 0;
    return (
      <section className="review-shell review-shell--empty">
        <p className="eyebrow eyebrow--dark">{copy.completeEyebrow.toUpperCase()}</p>
        <h1>{hasMoreDue ? copy.remainingTitle : copy.completeTitle}</h1>
        <p>{hasMoreDue ? copy.remainingBody.replace('{count}', String(remainingDue)) : copy.completeBody}</p>
        {hasMoreDue ? (
          <button type="button" className="button button--dark" onClick={startNextBatch}>{copy.continueReview}</button>
        ) : (
          <Link href="/pulse" className="button button--dark">{copy.completeAction}</Link>
        )}
      </section>
    );
  }

  const modeLabel = mode === 'recall'
    ? copy.modes.recall
    : mode === 'context'
      ? copy.modes.context
      : mode === 'recognition'
        ? copy.modes.recognition
        : copy.modes.delayed;
  const itemAnnouncement = formatReviewItemAnnouncement(index, queueIds.length, modeLabel, item.word, locale);

  return (
    <section
      ref={reviewItemFocusRef}
      tabIndex={-1}
      className="review-shell review-item-focus"
      aria-labelledby="review-title"
    >
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{itemAnnouncement}</p>
      <div className="review-meta">
        <span>{modeLabel.toUpperCase()}</span>
        <span
          role="progressbar"
          aria-label={progressText}
          aria-valuemin={1}
          aria-valuemax={queueIds.length}
          aria-valuenow={index + 1}
          aria-valuetext={progressText}
        >{index + 1} / {queueIds.length}</span>
      </div>
      <h1 id="review-title">{item.word}</h1>

      {mode === 'recognition' ? (
        <>
          <p className="review-definition" lang="en">{item.definition.en}</p>
          <p className="review-prompt">{copy.chooseKazakh}</p>
          <div className="review-options">
            {item.options.map((option, optionIndex) => {
              const isSelected = answer === option.id;
              const isAnswer = resolved && option.id === item.correctOptionId;
              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => resolveAnswer(option.id)}
                  disabled={resolved}
                  aria-keyshortcuts={String(optionIndex + 1)}
                  aria-pressed={isSelected}
                  className={`review-option ${isSelected ? (wasCorrect ? 'review-option--correct' : 'review-option--incorrect') : ''} ${isAnswer ? 'review-option--answer' : ''}`.trim()}
                >
                  <span>{String(optionIndex + 1).padStart(2, '0')}</span>
                  <strong lang="kk">{option.label.kk}</strong>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <p className="review-definition" lang={mode === 'context' ? locale : mode === 'recall' ? 'kk' : 'en'}>
            {mode === 'context'
              ? item.context.prompt[locale]
              : mode === 'recall'
                ? item.definition.kk
                : item.definition.en}
          </p>
          <p className="review-prompt">{mode === 'context' ? copy.completeEnglish : copy.typeEnglish}</p>
          <form className="review-recall-form" onSubmit={submitTyped}>
            <label htmlFor="review-answer" className="sr-only">{copy.inputLabel}</label>
            <input
              id="review-answer"
              value={answer}
              lang="en"
              onChange={(event: { currentTarget: { value: string } }) => setAnswer(event.currentTarget.value)}
              autoComplete="off"
              autoCapitalize="none"
              disabled={resolved}
              placeholder={copy.inputPlaceholder}
            />
            <button type="submit" className="button button--dark" disabled={resolved || !answer.trim()}>{copy.check}</button>
          </form>
        </>
      )}

      {resolved && (
        <div className="review-feedback" role="status" aria-live="polite">
          <strong>{wasCorrect ? copy.strengthened.toUpperCase() : copy.relearning.toUpperCase()}</strong>
          <p>{wasCorrect ? item.definition[locale] : `${copy.answerPrefix}: ${item.word}. ${item.definition[locale]}`}</p>
          <button type="button" className="button button--dark" onClick={next}>{copy.next}</button>
        </div>
      )}
    </section>
  );
}
