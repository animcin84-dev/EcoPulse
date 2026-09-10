import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceLesson, completeLesson, createLessonProgress, recordAnswer } from '../src/domain/learning/progress.ts';

test('new lesson progress starts at the first step with no XP', () => {
  const progress = createLessonProgress('lesson-atmosphere');
  assert.equal(progress.currentStepIndex, 0);
  assert.equal(progress.status, 'in_progress');
  assert.equal(progress.xp, 0);
  assert.deepEqual(progress.attempts, {});
});

test('advanceLesson completes after the final step', () => {
  let progress = createLessonProgress('lesson-atmosphere');
  progress = advanceLesson(progress, 2);
  assert.equal(progress.currentStepIndex, 1);
  assert.equal(progress.status, 'in_progress');
  progress = advanceLesson(progress, 2);
  assert.equal(progress.currentStepIndex, 1);
  assert.equal(progress.status, 'completed');
});

test('wrong answers are recorded without XP', () => {
  const progress = recordAnswer(createLessonProgress('lesson-atmosphere'), 'meaning', false, 5);
  assert.equal(progress.attempts.meaning?.count, 1);
  assert.equal(progress.attempts.meaning?.correct, false);
  assert.equal(progress.xp, 0);
});

test('XP is awarded only once for the first correct result on a step', () => {
  let progress = createLessonProgress('lesson-atmosphere');
  progress = recordAnswer(progress, 'meaning', false, 5);
  progress = recordAnswer(progress, 'meaning', true, 5);
  progress = recordAnswer(progress, 'meaning', true, 5);

  assert.equal(progress.attempts.meaning?.count, 3);
  assert.equal(progress.attempts.meaning?.correct, true);
  assert.equal(progress.xp, 5);
});


test('completeLesson marks the current lesson complete without changing earned XP', () => {
  let progress = createLessonProgress('lesson-atmosphere');
  progress = recordAnswer(progress, 'meaning', true, 5);
  progress = completeLesson(progress);
  assert.equal(progress.status, 'completed');
  assert.equal(progress.xp, 5);
});

import { resolveLessonStepIndex } from '../src/domain/learning/progress.ts';

test('lesson progress can track the authored step id as a stable resume anchor', () => {
  let progress = createLessonProgress('lesson-atmosphere', 'discover-atmosphere');
  assert.equal(progress.currentStepId, 'discover-atmosphere');

  progress = advanceLesson(progress, ['discover-atmosphere', 'meaning-atmosphere', 'think-no-atmosphere']);
  assert.equal(progress.currentStepIndex, 1);
  assert.equal(progress.currentStepId, 'meaning-atmosphere');
});

test('stable step id wins over a stale numeric index when lesson content gains a new step', () => {
  const progress = {
    ...createLessonProgress('lesson-atmosphere'),
    currentStepIndex: 3,
    currentStepId: 'think-no-atmosphere',
  };

  const index = resolveLessonStepIndex(progress, [
    'discover-atmosphere',
    'meaning-atmosphere',
    'connection-atmosphere-weather-climate',
    'reading-atmosphere',
    'think-no-atmosphere',
    'result-first-pulse',
  ]);
  assert.equal(index, 4);
});
