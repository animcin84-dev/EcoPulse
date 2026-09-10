import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import {
  completeWorldChallengeInGuestState,
  createEmptyGuestState,
  serializeGuestState,
  type GuestState,
} from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function withCompletedWorldLessons(state: GuestState, world: string): GuestState {
  const lessonProgress = { ...state.lessonProgress };
  for (const lesson of lessonSequence.filter((candidate) => candidate.world === world)) {
    const finalIndex = lesson.steps.length - 1;
    lessonProgress[lesson.slug] = {
      lessonId: lesson.id,
      currentStepIndex: finalIndex,
      currentStepId: lesson.steps[finalIndex]!.id,
      status: 'completed',
      xp: 0,
      attempts: {},
    };
  }
  return { ...state, lessonProgress };
}

test('world challenge domain completion is a no-op while its world lessons are locked', () => {
  const state = createEmptyGuestState();
  const result = completeWorldChallengeInGuestState(state, 'weather-detective');

  assert.equal(result, state);
  assert.equal(result.xp, 0);
  assert.deepEqual(result.completedChallengeIds, []);
});

test('world challenge domain completion awards XP after all world lessons are complete', () => {
  const state = withCompletedWorldLessons(createEmptyGuestState(), 'earth-atmosphere');
  const result = completeWorldChallengeInGuestState(state, 'weather-detective');

  assert.equal(result.xp, 50);
  assert.deepEqual(result.completedChallengeIds, ['weather-detective']);
});

test('persisted completed challenge without world prerequisites is incompatible', () => {
  const state = createEmptyGuestState();
  state.completedChallengeIds = ['weather-detective'];

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('persisted completed challenge with completed world prerequisites remains valid', () => {
  const state = withCompletedWorldLessons(createEmptyGuestState(), 'earth-atmosphere');
  state.completedChallengeIds = ['weather-detective'];

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});
