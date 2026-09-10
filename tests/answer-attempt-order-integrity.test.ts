import test from 'node:test';
import assert from 'node:assert/strict';

import { atmosphereLesson } from '../src/content/lessons/atmosphere.ts';
import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { applyValidatedGuestStateUpdate } from '../src/domain/learning/runtime-state-update.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function progressAt(stepIndex: number) {
  return {
    lessonId: atmosphereLesson.id,
    currentStepIndex: stepIndex,
    currentStepId: atmosphereLesson.steps[stepIndex]!.id,
    status: 'in_progress' as const,
    xp: 5,
    attempts: {
      'meaning-atmosphere': { count: 1, correct: true, xpAwarded: true },
    },
  };
}

test('attempt on a future interactive step is incompatible', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = progressAt(0);
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('attempt on the current interactive step remains valid before Continue', () => {
  const stepIndex = atmosphereLesson.steps.findIndex((step) => step.id === 'meaning-atmosphere');
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = progressAt(stepIndex);
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('past attempt remains valid after the learner advances', () => {
  const stepIndex = atmosphereLesson.steps.findIndex((step) => step.id === 'connection-atmosphere-weather-climate');
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = progressAt(stepIndex);
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('runtime guard rejects rewinding progress while a later attempt remains', () => {
  const meaningIndex = atmosphereLesson.steps.findIndex((step) => step.id === 'meaning-atmosphere');
  const current = createEmptyGuestState();
  current.lessonProgress.atmosphere = progressAt(meaningIndex);

  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    lessonProgress: {
      ...draft.lessonProgress,
      atmosphere: {
        ...draft.lessonProgress.atmosphere!,
        currentStepIndex: 0,
        currentStepId: atmosphereLesson.steps[0]!.id,
      },
    },
  }));

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
});
