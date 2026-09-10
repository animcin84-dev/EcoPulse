import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonsBySlug } from '../src/content/index.ts';
import { createEmptyGuestState, serializeGuestState, type GuestState } from '../src/domain/learning/guest-state.ts';
import { computeMasteryState, type MasteryEvidence } from '../src/domain/learning/mastery.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function completedGlaciersState(): GuestState {
  const state = createEmptyGuestState();
  const lesson = lessonsBySlug.glaciers;
  const finalIndex = lesson.steps.length - 1;
  state.lessonProgress.glaciers = {
    lessonId: lesson.id,
    currentStepIndex: finalIndex,
    currentStepId: lesson.steps[finalIndex]!.id,
    status: 'completed',
    xp: 0,
    attempts: {},
  };
  return state;
}

function withGlacierPair(stage: number, evidence: MasteryEvidence): GuestState {
  const state = completedGlaciersState();
  state.reviewRecords.glacier = {
    ...createReviewRecord('glacier', new Date('2026-09-10T00:00:00.000Z')),
    stage,
  };
  state.masteryEvidence.glacier = evidence;
  state.masteryStates.glacier = computeMasteryState(evidence);
  return state;
}

const exposureOnly: MasteryEvidence = {
  exposures: 1,
  recognition: false,
  recall: false,
  context: false,
  delayedReview: false,
};

const recallOnly: MasteryEvidence = {
  exposures: 1,
  recognition: false,
  recall: true,
  context: false,
  delayedReview: false,
};

const recallAndContext: MasteryEvidence = {
  exposures: 1,
  recognition: false,
  recall: true,
  context: true,
  delayedReview: false,
};

const baseSkills: MasteryEvidence = {
  exposures: 1,
  recognition: true,
  recall: true,
  context: true,
  delayedReview: false,
};

test('review stage 1 requires prior recall evidence', () => {
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(withGlacierPair(1, exposureOnly))));
  assert.equal(loaded.integrity, 'incompatible');
});

test('review stage 2 requires prior recall and context evidence', () => {
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(withGlacierPair(2, recallOnly))));
  assert.equal(loaded.integrity, 'incompatible');
});

test('review stage 3 requires prior recall context and recognition evidence', () => {
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(withGlacierPair(3, recallAndContext))));
  assert.equal(loaded.integrity, 'incompatible');
});

test('delayed-review mastery cannot exist before the stage 4 gate', () => {
  const impossible = { ...baseSkills, delayedReview: true };
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(withGlacierPair(3, impossible))));
  assert.equal(loaded.integrity, 'incompatible');
});

test('maintenance history may stay at stage 4 after a later mistake clears delayed mastery', () => {
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(withGlacierPair(4, baseSkills))));
  assert.equal(loaded.integrity, 'valid');
});
