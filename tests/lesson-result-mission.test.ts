import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('lesson result renders the mapped optional mission without replacing the next lesson action', () => {
  const resultSource = readFileSync('src/components/lesson/ResultPanel.tsx', 'utf8');
  const experienceSource = readFileSync('src/components/lesson/LessonExperience.tsx', 'utf8');

  assert.match(experienceSource, /resolveLessonMission/);
  assert.match(experienceSource, /missionCompleted/);
  assert.match(resultSource, /mission\.title\[locale\]/);
  assert.match(resultSource, /mission\.description\[locale\]/);
  assert.match(resultSource, /`\/mission\/\$\{mission\.id\}`/);
  assert.match(resultSource, /missionCompleted/);
  assert.match(resultSource, /nextLesson \? `\/lesson\/\$\{nextLesson\.slug\}` : '\/learn'/);
});

test('lesson result mission offer surfaces no-photo and no-location safety metadata', () => {
  const source = readFileSync('src/components/lesson/ResultPanel.tsx', 'utf8');
  assert.match(source, /copy\.result\.noPhoto/);
  assert.match(source, /copy\.result\.noLocation/);
  assert.match(source, /copy\.result\.missionOptional/);
});
