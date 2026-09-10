import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { reviewItems } from '../src/content/review-items.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';
import { applyMasterySignal, computeMasteryState, createMasteryEvidence } from '../src/domain/learning/mastery.ts';
import {
  createEmptyGuestState,
  serializeGuestState,
  type GuestState,
} from '../src/domain/learning/guest-state.ts';
import { applyValidatedGuestStateUpdate } from '../src/domain/learning/runtime-state-update.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function withCompletedLesson(state: GuestState, slug: string): GuestState {
  const lesson = lessonSequence.find((candidate) => candidate.slug === slug);
  assert.ok(lesson);
  const finalIndex = lesson.steps.length - 1;
  return {
    ...state,
    lessonProgress: {
      ...state.lessonProgress,
      [slug]: {
        lessonId: lesson.id,
        currentStepIndex: finalIndex,
        currentStepId: lesson.steps[finalIndex]!.id,
        status: 'completed',
        xp: 0,
        attempts: {},
      },
    },
  };
}

function withSeenMastery(state: GuestState, itemId: string): GuestState {
  const evidence = applyMasterySignal(createMasteryEvidence(), 'exposure');
  return {
    ...state,
    masteryEvidence: { ...state.masteryEvidence, [itemId]: evidence },
    masteryStates: { ...state.masteryStates, [itemId]: computeMasteryState(evidence) },
  };
}


test('every review item has at least one authored target-word lesson origin', () => {
  for (const item of reviewItems) {
    const origins = lessonSequence.filter((lesson) => lesson.targetWords.includes(item.id));
    assert.ok(origins.length > 0, `${item.id} must have an authored target-word lesson origin`);
  }
});

test('persisted review record is incompatible before an authored target-word lesson is completed', () => {
  const state = createEmptyGuestState();
  state.reviewRecords.atmosphere = createReviewRecord('atmosphere', new Date('2026-09-10T00:00:00.000Z'));

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('persisted mastery evidence is incompatible before an authored target-word lesson is completed', () => {
  const state = withSeenMastery(createEmptyGuestState(), 'glacier');

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('completed origin lesson allows its review and mastery state', () => {
  let state = withCompletedLesson(createEmptyGuestState(), 'glaciers');
  state = withSeenMastery(state, 'glacier');
  state.reviewRecords.glacier = createReviewRecord('glacier', new Date('2026-09-10T00:00:00.000Z'));

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('completing an unrelated lesson does not authorize another word mastery record', () => {
  let state = withCompletedLesson(createEmptyGuestState(), 'atmosphere');
  state = withSeenMastery(state, 'glacier');

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('runtime write guard rejects review state created before its origin lesson is completed', () => {
  const current = createEmptyGuestState();
  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    reviewRecords: {
      ...draft.reviewRecords,
      atmosphere: createReviewRecord('atmosphere', new Date('2026-09-10T00:00:00.000Z')),
    },
  }));

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
});
