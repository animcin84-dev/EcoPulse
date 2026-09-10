import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('World Challenge runner requires a transient English reasoning step before completion', () => {
  const source = readFileSync('src/components/challenges/WorldChallengeExperience.tsx', 'utf8');
  assert.match(source, /awaitingReasoning/);
  assert.match(source, /isReasoningResponseReady/);
  assert.match(source, /challenge\.reasoningPrompt\[locale\]/);
  assert.match(source, /lang="en"/);
  assert.match(source, /maxLength=\{280\}/);
  assert.doesNotMatch(source, /missionReflections|save.*Reasoning|reasoning.*updateState/i);
});

test('World Challenge runner exposes official source disclosure before checkpoint completion', () => {
  const source = readFileSync('src/components/challenges/WorldChallengeExperience.tsx', 'utf8');
  assert.match(source, /SourceDisclosure/);
  assert.match(source, /sourceIds=\{challenge\.sourceIds\}/);
});
