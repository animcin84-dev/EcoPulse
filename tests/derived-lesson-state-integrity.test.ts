import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonsBySlug } from '../src/content/index.ts';
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

test('known connected concept without completed origin lesson is incompatible', () => {
  const state = createEmptyGuestState();
  state.connectedConceptIds = ['weather'];
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('connected concept is valid after a completed lesson that authors the connection', () => {
  const state = withCompletedLesson(createEmptyGuestState(), 'atmosphere');
  state.connectedConceptIds = ['weather'];
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('known Think scenario without its completed lesson is incompatible', () => {
  const state = createEmptyGuestState();
  state.completedScenarioIds = ['think-no-atmosphere'];
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('Think scenario is valid after its authored lesson is completed', () => {
  const state = withCompletedLesson(createEmptyGuestState(), 'atmosphere');
  state.completedScenarioIds = ['think-no-atmosphere'];
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('runtime guard rejects removing an origin lesson while derived state remains', () => {
  const current = withCompletedLesson(createEmptyGuestState(), 'atmosphere');
  current.connectedConceptIds = ['weather'];
  current.completedScenarioIds = ['think-no-atmosphere'];

  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    lessonProgress: {},
  }));

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
});
