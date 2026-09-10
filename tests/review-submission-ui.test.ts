import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync('src/components/review/ReviewSession.tsx', 'utf8');

test('ReviewSession delegates authoritative review mutation to the idempotent domain boundary', () => {
  assert.match(source, /submitDueReviewAnswer/);
  assert.doesNotMatch(source, /recordReviewResult/);
  assert.doesNotMatch(source, /applyReviewEvidence/);
  assert.doesNotMatch(source, /computeMasteryState/);
  assert.doesNotMatch(source, /current\.xp\s*\+\s*\(/);
});

test('ReviewSession captures one submission timestamp for the UI event and passes it to the domain helper', () => {
  assert.match(source, /const submittedAt = new Date\(\)/);
  assert.match(source, /submitDueReviewAnswer\([\s\S]*submittedAt/);
});
