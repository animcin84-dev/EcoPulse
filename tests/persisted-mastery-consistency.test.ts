import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { applyMasterySignal, computeMasteryState, createMasteryEvidence } from '../src/domain/learning/mastery.ts';
import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function withCompletedLesson<T extends ReturnType<typeof createEmptyGuestState>>(state: T, slug: string): T {
  const lesson = lessonSequence.find((candidate) => candidate.slug === slug);
  assert.ok(lesson);
  const finalIndex = lesson.steps.length - 1;
  state.lessonProgress[slug] = {
    lessonId: lesson.id,
    currentStepIndex: finalIndex,
    currentStepId: lesson.steps[finalIndex]!.id,
    status: 'completed',
    xp: 0,
    attempts: {},
  };
  return state;
}

test('schema v7 rejects a mastery label that has no matching evidence record', () => {
  const state = createEmptyGuestState();
  state.masteryStates.habitat = 'MASTERED';

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'corrupt');
});

test('schema v7 rejects a mastery label that disagrees with its evidence', () => {
  const state = createEmptyGuestState();
  state.masteryEvidence.glacier = applyMasterySignal(createMasteryEvidence(), 'exposure');
  state.masteryStates.glacier = 'MASTERED';

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'corrupt');
});

test('schema v7 accepts matching mastery label and evidence', () => {
  const state = withCompletedLesson(createEmptyGuestState(), 'glaciers');
  let evidence = createMasteryEvidence();
  for (const signal of ['exposure', 'recognition', 'recall', 'context'] as const) {
    evidence = applyMasterySignal(evidence, signal);
  }
  state.masteryEvidence.glacier = evidence;
  state.masteryStates.glacier = computeMasteryState(evidence);
  state.reviewRecords.glacier = createReviewRecord('glacier', new Date('2026-09-10T00:00:00.000Z'));

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
  assert.equal(loaded.state.masteryStates.glacier, 'STRONG');
});

test('legacy v6 can reconstruct missing evidence from its historical mastery label', () => {
  const current = withCompletedLesson(createEmptyGuestState(), 'glaciers');
  const legacy = {
    ...current,
    schemaVersion: 6,
    masteryStates: { glacier: 'STRONG' },
    masteryEvidence: {},
    reviewRecords: { glacier: createReviewRecord('glacier', new Date('2026-09-10T00:00:00.000Z')) },
  };

  const loaded = loadGuestStateWithStatus(storage(JSON.stringify(legacy)));
  assert.equal(loaded.integrity, 'valid');
  assert.equal(loaded.state.masteryStates.glacier, 'STRONG');
  assert.equal(computeMasteryState(loaded.state.masteryEvidence.glacier!), 'STRONG');
});

test('schema v7 rejects mastery signals when exposure evidence is zero', () => {
  const state = createEmptyGuestState();
  state.masteryEvidence.atmosphere = {
    exposures: 0,
    recognition: true,
    recall: false,
    context: false,
    delayedReview: false,
  };
  state.masteryStates.atmosphere = 'NEW';

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'corrupt');
});

test('schema v7 rejects delayed-review evidence without the prerequisite skills', () => {
  const state = createEmptyGuestState();
  state.masteryEvidence.atmosphere = {
    exposures: 1,
    recognition: true,
    recall: false,
    context: false,
    delayedReview: true,
  };
  state.masteryStates.atmosphere = 'LEARNING';

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'corrupt');
});
