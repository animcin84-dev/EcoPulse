import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

test('persisted answer attempt cannot be correct without having awarded its one-time step XP', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = {
    lessonId: 'lesson-atmosphere',
    currentStepIndex: 1,
    currentStepId: 'meaning-atmosphere',
    status: 'in_progress',
    xp: 0,
    attempts: {
      'meaning-atmosphere': { count: 1, correct: true, xpAwarded: false },
    },
  };

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'corrupt');
});

test('persisted attempts are rejected on non-interactive discover/result steps', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = {
    lessonId: 'lesson-atmosphere',
    currentStepIndex: 0,
    currentStepId: 'discover-atmosphere',
    status: 'in_progress',
    xp: 0,
    attempts: {
      'discover-atmosphere': { count: 1, correct: false, xpAwarded: false },
    },
  };

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('authored scored connection attempts remain valid progress evidence', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = {
    lessonId: 'lesson-atmosphere',
    currentStepIndex: 2,
    currentStepId: 'connection-atmosphere-weather-climate',
    status: 'in_progress',
    xp: 10,
    attempts: {
      'connection-atmosphere-weather-climate': { count: 1, correct: true, xpAwarded: true },
    },
  };

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});
