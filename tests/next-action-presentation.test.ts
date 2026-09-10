import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence, missions } from '../src/content/index.ts';
import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { resolveNextLearningAction } from '../src/domain/learning/next-action.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';

test('returning next action prioritizes due review and localizes the presentation', () => {
  const now = new Date('2026-09-09T12:00:00.000Z');
  const state = createEmptyGuestState();
  state.reviewRecords.atmosphere = createReviewRecord('atmosphere', new Date('2026-09-08T12:00:00.000Z'));

  const action = resolveNextLearningAction(state, lessonSequence, missions, now);
  assert.equal(action.type, 'review');
  assert.equal(action.href, '/review');
  assert.equal(action.title.en, 'Review 1 word');
  assert.equal(action.title.kk, '1 сөзді қайталау');
});

test('next action falls through to the first incomplete lesson when no review is due', () => {
  const state = createEmptyGuestState();
  const action = resolveNextLearningAction(state, lessonSequence, missions, new Date('2026-09-09T12:00:00.000Z'));

  assert.equal(action.type, 'lesson');
  assert.equal(action.href, '/lesson/atmosphere');
  assert.equal(action.title.en, lessonSequence[0]!.title.en);
  assert.equal(action.title.kk, lessonSequence[0]!.title.kk);
});

test('next action offers the first incomplete optional mission after lessons are complete', () => {
  const state = createEmptyGuestState();
  for (const lesson of lessonSequence) {
    state.lessonProgress[lesson.slug] = {
      lessonId: lesson.id,
      currentStepIndex: lesson.steps.length - 1,
      status: 'completed',
      xp: 0,
      attempts: {},
    };
  }

  const action = resolveNextLearningAction(state, lessonSequence, missions, new Date('2026-09-09T12:00:00.000Z'));
  assert.equal(action.type, 'mission');
  assert.equal(action.href, `/mission/${missions[0]!.id}`);
  assert.equal(action.title.en, missions[0]!.title.en);
});

test('next action becomes explore after lessons and missions are complete', () => {
  const state = createEmptyGuestState();
  for (const lesson of lessonSequence) {
    state.lessonProgress[lesson.slug] = {
      lessonId: lesson.id,
      currentStepIndex: lesson.steps.length - 1,
      status: 'completed',
      xp: 0,
      attempts: {},
    };
  }
  state.completedMissionIds = missions.map((mission) => mission.id);

  const action = resolveNextLearningAction(state, lessonSequence, missions, new Date('2026-09-09T12:00:00.000Z'));
  assert.equal(action.type, 'none');
  assert.equal(action.href, '/explore');
  assert.equal(action.title.kk, 'EcoPulse байланыстарын зерттеу');
});
