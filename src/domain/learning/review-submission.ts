import type { GuestState } from './guest-state.ts';
import { computeMasteryState, createMasteryEvidence } from './mastery.ts';
import { applyReviewEvidence, evaluateReviewAnswer, reviewModeForStage } from './review-mastery.ts';
import { recordReviewResult } from './review.ts';

export type ReviewSubmissionInput = {
  itemId: string;
  answer: string;
  word: string;
  correctOptionId: string;
  contextAcceptedAnswers: string[];
};

export type ReviewSubmissionResult = {
  state: GuestState;
  applied: boolean;
  correct: boolean;
};

export function submitDueReviewAnswer(
  state: GuestState,
  input: ReviewSubmissionInput,
  now: Date,
): ReviewSubmissionResult {
  const record = state.reviewRecords[input.itemId];
  if (!record) return { state, applied: false, correct: false };

  const dueTime = Date.parse(record.dueAt);
  if (!Number.isFinite(dueTime) || dueTime > now.getTime()) {
    return { state, applied: false, correct: false };
  }

  const mode = reviewModeForStage(record.stage);
  const correct = evaluateReviewAnswer(mode, input.answer, {
    word: input.word,
    correctOptionId: input.correctOptionId,
    contextAcceptedAnswers: input.contextAcceptedAnswers,
  });
  const currentEvidence = state.masteryEvidence[input.itemId] ?? createMasteryEvidence();
  const nextEvidence = applyReviewEvidence(currentEvidence, record.stage, correct);
  const nextRecord = recordReviewResult(record, correct ? 'correct' : 'incorrect', now);

  return {
    applied: true,
    correct,
    state: {
      ...state,
      xp: state.xp + (correct ? 10 : 0),
      reviewRecords: {
        ...state.reviewRecords,
        [input.itemId]: nextRecord,
      },
      masteryEvidence: {
        ...state.masteryEvidence,
        [input.itemId]: nextEvidence,
      },
      masteryStates: {
        ...state.masteryStates,
        [input.itemId]: computeMasteryState(nextEvidence),
      },
    },
  };
}
