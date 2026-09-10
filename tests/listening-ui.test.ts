import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('generic lesson engine renders listening through a dedicated accessible user-triggered component', () => {
  assert.equal(existsSync('src/components/lesson/ListeningExercise.tsx'), true);
  const player = readFileSync('src/components/lesson/LessonExperience.tsx', 'utf8');
  const listening = readFileSync('src/components/lesson/ListeningExercise.tsx', 'utf8');

  assert.match(player, /step\.type === 'listening'/);
  assert.match(player, /<ListeningExercise/);
  assert.match(listening, /buildListeningPlaybackPlan/);
  assert.match(listening, /speechSynthesis/);
  assert.match(listening, /SpeechSynthesisUtterance/);
  assert.match(listening, /onClick=\{play\}/);
  assert.match(listening, /aria-expanded=\{showTranscript\}/);
  assert.match(listening, /step\.utterances\[level\]/);
  assert.match(listening, /window\.addEventListener\('keydown'/);
  assert.match(listening, /onAttempt\(correct\)/);
  assert.match(listening, /hasListened \|\| showTranscript/);
  assert.doesNotMatch(listening, /autoPlay/);
});
