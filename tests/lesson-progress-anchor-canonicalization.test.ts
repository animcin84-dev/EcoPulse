import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

test('current schema rejects mismatched numeric index and stable step id', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = {
    lessonId: 'lesson-atmosphere',
    currentStepIndex: 1,
    currentStepId: 'think-no-atmosphere',
    status: 'in_progress',
    xp: 0,
    attempts: {},
  };

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('current schema lesson progress requires a stable step id', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = {
    lessonId: 'lesson-atmosphere',
    currentStepIndex: 1,
    status: 'in_progress',
    xp: 0,
    attempts: {},
  };

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('legacy v6 resume anchor is canonicalized to the modern step index', () => {
  const current = createEmptyGuestState();
  const legacy = {
    ...current,
    schemaVersion: 6,
    lessonProgress: {
      atmosphere: {
        lessonId: 'lesson-atmosphere',
        currentStepIndex: 3,
        currentStepId: 'think-no-atmosphere',
        status: 'in_progress',
        xp: 0,
        attempts: {},
      },
    },
  };

  const loaded = loadGuestStateWithStatus(storage(JSON.stringify(legacy)));
  assert.equal(loaded.integrity, 'valid');
  assert.equal(loaded.state.lessonProgress.atmosphere?.currentStepId, 'think-no-atmosphere');
  assert.equal(loaded.state.lessonProgress.atmosphere?.currentStepIndex, 5);
});
