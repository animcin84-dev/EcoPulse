import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { GUEST_PROGRESS_STORAGE_KEY, loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function memoryStorage(raw: string | null) {
  return {
    getItem(key: string) {
      assert.equal(key, GUEST_PROGRESS_STORAGE_KEY);
      return raw;
    },
    setItem() {},
    removeItem() {},
  };
}

test('normal storage load quarantines a shape-valid snapshot with stale authored references', () => {
  const state = createEmptyGuestState();
  state.lessonProgress = {
    atmosphere: {
      lessonId: 'lesson-atmosphere',
      currentStepIndex: 1,
      currentStepId: 'removed-step-from-old-content',
      status: 'in_progress',
      xp: 5,
      attempts: {},
    },
  };
  const raw = serializeGuestState(state);

  const loaded = loadGuestStateWithStatus(memoryStorage(raw));

  assert.equal(loaded.integrity, 'incompatible');
  assert.equal(loaded.raw, raw);
  assert.deepEqual(loaded.state, createEmptyGuestState());
});

test('normal storage load still accepts a semantically consistent current snapshot', () => {
  const state = createEmptyGuestState();
  state.lessonProgress = {
    atmosphere: {
      lessonId: 'lesson-atmosphere',
      currentStepIndex: 0,
      currentStepId: 'discover-atmosphere',
      status: 'in_progress',
      xp: 0,
      attempts: {},
    },
  };
  const raw = serializeGuestState(state);

  const loaded = loadGuestStateWithStatus(memoryStorage(raw));

  assert.equal(loaded.integrity, 'valid');
  assert.equal(loaded.raw, raw);
  assert.equal(loaded.state.lessonProgress.atmosphere?.currentStepId, 'discover-atmosphere');
});
