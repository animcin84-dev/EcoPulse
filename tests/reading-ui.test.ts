import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('generic lesson engine renders adaptive reading through a dedicated accessible component', () => {
  assert.equal(existsSync('src/components/lesson/ReadingExercise.tsx'), true);
  const player = readFileSync('src/components/lesson/LessonExperience.tsx', 'utf8');
  const reading = readFileSync('src/components/lesson/ReadingExercise.tsx', 'utf8');

  assert.match(player, /step\.type === 'reading'/);
  assert.match(player, /<ReadingExercise/);
  assert.match(reading, /step\.passages\[level\]/);
  assert.match(reading, /lang="en"/);
  assert.match(reading, /window\.addEventListener\('keydown'/);
  assert.match(reading, /lessonUiCopy/);
  assert.match(reading, /onAttempt\(correct\)/);
});
