import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { createLessonProgress, completeLesson } from '../src/domain/learning/progress.ts';
import { findNextIncompleteLesson } from '../src/domain/learning/curriculum.ts';

test('next incomplete lesson is the first lesson without completed progress', () => {
  const first = lessonSequence[0]!;
  const progress = {
    [first.slug]: completeLesson(createLessonProgress(first.id)),
  };
  assert.equal(findNextIncompleteLesson(lessonSequence, progress)?.slug, lessonSequence[1]!.slug);
});

test('next incomplete lesson is null when the core journey is complete', () => {
  const progress = Object.fromEntries(
    lessonSequence.map((lesson) => [lesson.slug, completeLesson(createLessonProgress(lesson.id))]),
  );
  assert.equal(findNextIncompleteLesson(lessonSequence, progress), null);
});
