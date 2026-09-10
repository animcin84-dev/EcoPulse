import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonsBySlug } from '../src/content/index.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';
import { applyMasterySignal, computeMasteryState, createMasteryEvidence } from '../src/domain/learning/mastery.ts';
import { createEmptyGuestState, serializeGuestState, type GuestState } from '../src/domain/learning/guest-state.ts';
import { applyValidatedGuestStateUpdate } from '../src/domain/learning/runtime-state-update.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function withCompletedLesson(state: GuestState, slug: keyof typeof lessonsBySlug): GuestState {
  const lesson = lessonsBySlug[slug];
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

function withAtmosphereMastery(state: GuestState): GuestState {
  const evidence = applyMasterySignal(createMasteryEvidence(), 'exposure');
  return {
    ...state,
    masteryEvidence: { ...state.masteryEvidence, atmosphere: evidence },
    masteryStates: { ...state.masteryStates, atmosphere: computeMasteryState(evidence) },
  };
}

test('review record without its matching mastery ledger is incompatible', () => {
  const state = withCompletedLesson(createEmptyGuestState(), 'atmosphere');
  state.reviewRecords.atmosphere = createReviewRecord('atmosphere', new Date('2026-09-10T00:00:00.000Z'));

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('mastery ledger without its matching review record is incompatible', () => {
  const state = withAtmosphereMastery(withCompletedLesson(createEmptyGuestState(), 'atmosphere'));

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('paired review and mastery state remains valid after the origin lesson', () => {
  const state = withAtmosphereMastery(withCompletedLesson(createEmptyGuestState(), 'atmosphere'));
  state.reviewRecords.atmosphere = createReviewRecord('atmosphere', new Date('2026-09-10T00:00:00.000Z'));

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('runtime guard rejects removing review while mastery remains', () => {
  const current = withAtmosphereMastery(withCompletedLesson(createEmptyGuestState(), 'atmosphere'));
  current.reviewRecords.atmosphere = createReviewRecord('atmosphere', new Date('2026-09-10T00:00:00.000Z'));

  const result = applyValidatedGuestStateUpdate(current, (draft) => {
    const reviewRecords = { ...draft.reviewRecords };
    delete reviewRecords.atmosphere;
    return { ...draft, reviewRecords };
  });

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
});
