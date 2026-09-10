import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('lesson player resumes and advances through stable authored step ids', () => {
  const source = readFileSync('src/components/lesson/LessonExperience.tsx', 'utf8');
  assert.match(source, /resolveLessonStepIndex/);
  assert.match(source, /lesson\.steps\.map\(\(candidate\) => candidate\.id\)/);
  assert.doesNotMatch(source, /advanceLesson\(current, lesson\.steps\.length\)/);
});
