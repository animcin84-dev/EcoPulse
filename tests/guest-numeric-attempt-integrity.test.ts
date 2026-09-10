import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function validStateWithAttempt() {
  const state = createEmptyGuestState();
  state.lessonProgress = {
    atmosphere: {
      lessonId: 'lesson-atmosphere',
      currentStepIndex: 1,
      currentStepId: 'meaning-atmosphere',
      status: 'in_progress',
      xp: 5,
      attempts: {
        'meaning-atmosphere': { count: 1, correct: true, xpAwarded: true },
      },
    },
  };
  return state;
}

test('guest snapshot rejects fractional global or lesson XP', () => {
  const global = validStateWithAttempt();
  global.xp = 1.5;
  assert.equal(loadGuestStateWithStatus(storage(serializeGuestState(global))).integrity, 'corrupt');

  const lesson = validStateWithAttempt();
  lesson.lessonProgress.atmosphere!.xp = 2.5;
  assert.equal(loadGuestStateWithStatus(storage(serializeGuestState(lesson))).integrity, 'corrupt');
});

test('guest snapshot rejects malformed answer-attempt records instead of trusting a TypeScript cast', () => {
  const cases: unknown[] = [
    { count: 0, correct: true, xpAwarded: true },
    { count: 1.5, correct: true, xpAwarded: true },
    { count: 1, correct: 'yes', xpAwarded: true },
    { count: 1, correct: true, xpAwarded: 'yes' },
    { count: 1, correct: false, xpAwarded: true },
  ];

  for (const attempt of cases) {
    const state = validStateWithAttempt();
    (state.lessonProgress.atmosphere!.attempts as Record<string, unknown>)['meaning-atmosphere'] = attempt;
    const loaded = loadGuestStateWithStatus(storage(JSON.stringify(state)));
    assert.equal(loaded.integrity, 'corrupt');
  }
});

test('guest snapshot accepts a valid authored answer-attempt record', () => {
  const state = validStateWithAttempt();
  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
  assert.deepEqual(loaded.state.lessonProgress.atmosphere?.attempts['meaning-atmosphere'], {
    count: 1,
    correct: true,
    xpAwarded: true,
  });
});
