import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonsBySlug } from '../src/content/index.ts';
import { createEmptyGuestState, type GuestState } from '../src/domain/learning/guest-state.ts';
import { applyMasterySignal, computeMasteryState, createMasteryEvidence } from '../src/domain/learning/mastery.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';
import { mergeProgressSnapshots } from '../src/domain/learning/progress-sync.ts';
import { hasConsistentLearningStateReferences } from '../src/domain/learning/state-integrity.ts';

function completedGlaciersState(): GuestState {
  const state = createEmptyGuestState();
  const lesson = lessonsBySlug.glaciers;
  const finalIndex = lesson.steps.length - 1;
  state.lessonProgress.glaciers = {
    lessonId: lesson.id,
    currentStepIndex: finalIndex,
    currentStepId: lesson.steps[finalIndex]!.id,
    status: 'completed',
    xp: 40,
    attempts: {},
  };
  return state;
}

function withReviewPair(stage: number, mastered: boolean, dueAt: string): GuestState {
  const state = completedGlaciersState();
  let evidence = applyMasterySignal(createMasteryEvidence(), 'exposure');
  if (mastered) {
    for (const signal of ['recall', 'context', 'recognition', 'delayedReview'] as const) {
      evidence = applyMasterySignal(evidence, signal);
    }
  }
  state.masteryEvidence.glacier = evidence;
  state.masteryStates.glacier = computeMasteryState(evidence);
  state.reviewRecords.glacier = {
    ...createReviewRecord('glacier', new Date('2026-09-10T00:00:00.000Z')),
    stage,
    dueAt,
  };
  return state;
}

test('merging two individually valid review snapshots remains semantically valid', () => {
  const local = withReviewPair(0, false, '2026-09-11T00:00:00.000Z');
  const remote = withReviewPair(4, true, '2026-10-10T00:00:00.000Z');
  assert.equal(hasConsistentLearningStateReferences(local), true);
  assert.equal(hasConsistentLearningStateReferences(remote), true);

  const merged = mergeProgressSnapshots(local, remote);
  assert.equal(hasConsistentLearningStateReferences(merged), true);
});

test('sync keeps the conservative stage and due date while clearing only impossible delayed mastery', () => {
  const local = withReviewPair(0, false, '2026-09-11T00:00:00.000Z');
  const remote = withReviewPair(4, true, '2026-10-10T00:00:00.000Z');

  const merged = mergeProgressSnapshots(local, remote);
  assert.equal(merged.reviewRecords.glacier?.stage, 0);
  assert.equal(merged.reviewRecords.glacier?.dueAt, '2026-09-11T00:00:00.000Z');
  assert.equal(merged.masteryEvidence.glacier?.delayedReview, false);
  assert.equal(merged.masteryEvidence.glacier?.recognition, true);
  assert.equal(merged.masteryEvidence.glacier?.recall, true);
  assert.equal(merged.masteryEvidence.glacier?.context, true);
  assert.equal(merged.masteryStates.glacier, 'STRONG');
});
