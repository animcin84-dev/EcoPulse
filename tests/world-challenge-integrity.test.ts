import test from 'node:test';
import assert from 'node:assert/strict';
import { worldChallenges } from '../src/content/world-challenges.ts';
import { scienceSourcesById, sourceRequirementsByChallenge } from '../src/content/science-sources.ts';

test('every World Challenge has bilingual reasoning and valid official science sources', () => {
  for (const challenge of worldChallenges) {
    assert.ok(challenge.reasoningPrompt.en.trim(), challenge.slug);
    assert.ok(challenge.reasoningPrompt.kk.trim(), challenge.slug);
    assert.ok(challenge.sourceIds.length > 0, challenge.slug);
    for (const sourceId of challenge.sourceIds) assert.ok(scienceSourcesById[sourceId], `${challenge.slug}/${sourceId}`);
  }
});

test('World Challenge source refs cover each checkpoint scientific focus', () => {
  for (const challenge of worldChallenges) {
    const required = sourceRequirementsByChallenge[challenge.slug] ?? [];
    assert.ok(required.length > 0, challenge.slug);
    const covered = new Set(challenge.sourceIds.flatMap((id) => scienceSourcesById[id]?.claimTags ?? []));
    for (const claim of required) assert.ok(covered.has(claim), `${challenge.slug}: ${claim}`);
  }
});
