import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('focused mission reflection follows hydrated persisted state until the learner edits it', () => {
  const source = readFileSync('src/components/missions/MissionExperience.tsx', 'utf8');
  assert.match(source, /useState<string \| null>\(null\)/);
  assert.match(source, /draftOverride \?\? savedReflection/);
  assert.doesNotMatch(source, /useState\(savedReflection\)/);
});

test('focused mission completion reuses the idempotent guest-domain function and returns to My Pulse', () => {
  const source = readFileSync('src/components/missions/MissionExperience.tsx', 'utf8');
  assert.match(source, /completeMissionInGuestState/);
  assert.match(source, /saveMissionReflectionInGuestState/);
  assert.match(source, /href="\/pulse"/);
  assert.match(source, /maxLength=\{280\}/);
});
