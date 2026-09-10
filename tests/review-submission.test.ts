import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { createMasteryEvidence } from '../src/domain/learning/mastery.ts';
import { submitDueReviewAnswer } from '../src/domain/learning/review-submission.ts';

const now = new Date('2026-09-10T04:00:00.000Z');
const input = {
  itemId: 'glacier',
  answer: 'glacier',
  word: 'GLACIER',
  correctOptionId: 'glacier-kk',
  contextAcceptedAnswers: ['GLACIER'],
};

function dueState(stage = 0) {
  const state = createEmptyGuestState();
  return {
    ...state,
    reviewRecords: {
      glacier: {
        itemId: 'glacier',
        stage,
        dueAt: new Date(now.getTime() - 60_000).toISOString(),
        mistakes: 0,
      },
    },
    masteryEvidence: { glacier: createMasteryEvidence() },
  };
}

test('a due correct review applies atomically and awards +10 XP once', () => {
  const state = dueState();
  const result = submitDueReviewAnswer(state, input, now);

  assert.equal(result.applied, true);
  assert.equal(result.correct, true);
  assert.equal(result.state.xp, 10);
  assert.equal(result.state.reviewRecords.glacier?.stage, 1);
  assert.ok(Date.parse(result.state.reviewRecords.glacier!.dueAt) > now.getTime());
  assert.equal(result.state.masteryEvidence.glacier?.recall, true);
  assert.equal(result.state.masteryStates.glacier, 'LEARNING');
});

test('submitting the same correct review again against the updated state is a no-op', () => {
  const first = submitDueReviewAnswer(dueState(), input, now);
  const second = submitDueReviewAnswer(first.state, input, now);

  assert.equal(second.applied, false);
  assert.equal(second.correct, false);
  assert.strictEqual(second.state, first.state);
  assert.equal(second.state.xp, 10);
  assert.equal(second.state.reviewRecords.glacier?.stage, 1);
});

test('a future review record cannot be submitted early', () => {
  const state = dueState();
  state.reviewRecords.glacier!.dueAt = new Date(now.getTime() + 60_000).toISOString();

  const result = submitDueReviewAnswer(state, input, now);
  assert.equal(result.applied, false);
  assert.strictEqual(result.state, state);
  assert.equal(result.state.xp, 0);
});

test('an incorrect due review schedules relearning once without XP', () => {
  const state = dueState(2);
  const wrongInput = { ...input, answer: 'wrong' };
  const first = submitDueReviewAnswer(state, wrongInput, now);

  assert.equal(first.applied, true);
  assert.equal(first.correct, false);
  assert.equal(first.state.xp, 0);
  assert.equal(first.state.reviewRecords.glacier?.stage, 1);
  assert.equal(first.state.reviewRecords.glacier?.mistakes, 1);
  assert.ok(Date.parse(first.state.reviewRecords.glacier!.dueAt) > now.getTime());

  const duplicate = submitDueReviewAnswer(first.state, wrongInput, now);
  assert.equal(duplicate.applied, false);
  assert.strictEqual(duplicate.state, first.state);
  assert.equal(duplicate.state.reviewRecords.glacier?.mistakes, 1);
});

test('a missing review record is a no-op', () => {
  const state = createEmptyGuestState();
  const result = submitDueReviewAnswer(state, input, now);
  assert.equal(result.applied, false);
  assert.equal(result.correct, false);
  assert.strictEqual(result.state, state);
});
