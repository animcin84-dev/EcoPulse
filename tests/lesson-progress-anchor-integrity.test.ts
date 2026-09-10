import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { applyValidatedGuestStateUpdate } from '../src/domain/learning/runtime-state-update.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function atmosphereProgress(overrides: Partial<ReturnType<typeof baseProgress>> = {}) {
  return { ...baseProgress(), ...overrides };
}

function baseProgress() {
  return {
    lessonId: 'lesson-atmosphere',
    currentStepIndex: 6,
    currentStepId: 'result-first-pulse',
    status: 'completed' as const,
    xp: 0,
    attempts: {},
  };
}

test('stored completed lesson must point at its authored final result step', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = atmosphereProgress({
    currentStepIndex: 1,
    currentStepId: 'meaning-atmosphere',
  });

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('stored progress rejects an out-of-range numeric index even when stable step id exists', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = atmosphereProgress({
    currentStepIndex: 999,
    currentStepId: 'result-first-pulse',
  });

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('valid completed lesson at its result step still loads normally', () => {
  const state = createEmptyGuestState();
  state.lessonProgress.atmosphere = atmosphereProgress();

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('runtime write guard rejects falsely completed lesson progress', () => {
  const current = createEmptyGuestState();
  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    lessonProgress: {
      ...draft.lessonProgress,
      atmosphere: atmosphereProgress({
        currentStepIndex: 1,
        currentStepId: 'meaning-atmosphere',
      }),
    },
  }));

  assert.equal(result.applied, false);
  assert.deepEqual(result.state.lessonProgress, {});
});
