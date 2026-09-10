import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('ReviewSession tells the learner when another due batch remains and can start it explicitly', () => {
  const source = readFileSync('src/components/review/ReviewSession.tsx', 'utf8');
  assert.match(source, /buildReviewBatch/);
  assert.match(source, /remainingDue/);
  assert.match(source, /copy\.remainingTitle/);
  assert.match(source, /copy\.continueReview/);
  assert.match(source, /startNextBatch/);
});
