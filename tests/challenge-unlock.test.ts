import test from 'node:test';
import assert from 'node:assert/strict';

import { isWorldChallengeUnlocked } from '../src/domain/learning/curriculum.ts';
import { lessonSequence } from '../src/content/index.ts';
import { createLessonProgress, completeLesson } from '../src/domain/learning/progress.ts';

test('world challenge stays locked until every lesson in its world is completed', () => {
  const earthLessons = lessonSequence.filter((lesson) => lesson.world === 'earth-atmosphere');
  const progress = {
    [earthLessons[0]!.slug]: completeLesson(createLessonProgress(earthLessons[0]!.id)),
  };

  assert.equal(isWorldChallengeUnlocked('earth-atmosphere', lessonSequence, progress), false);
});

test('world challenge unlocks after all lessons in its world are completed', () => {
  const progress = Object.fromEntries(
    lessonSequence
      .filter((lesson) => lesson.world === 'earth-atmosphere')
      .map((lesson) => [lesson.slug, completeLesson(createLessonProgress(lesson.id))]),
  );

  assert.equal(isWorldChallengeUnlocked('earth-atmosphere', lessonSequence, progress), true);
});

test('unknown worlds do not unlock accidentally', () => {
  assert.equal(isWorldChallengeUnlocked('unknown-world', lessonSequence, {}), false);
});
