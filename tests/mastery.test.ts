import test from 'node:test';
import assert from 'node:assert/strict';
import { computeMasteryState } from '../src/domain/learning/mastery.ts';

test('unseen vocabulary is NEW', () => {
  assert.equal(computeMasteryState({ exposures: 0 }), 'NEW');
});

test('an exposed word without demonstrated recall is SEEN', () => {
  assert.equal(computeMasteryState({ exposures: 1 }), 'SEEN');
});

test('partial successful evidence is LEARNING', () => {
  assert.equal(computeMasteryState({ exposures: 2, recognition: true, recall: true }), 'LEARNING');
});

test('recognition, recall and context make a word STRONG', () => {
  assert.equal(
    computeMasteryState({ exposures: 3, recognition: true, recall: true, context: true }),
    'STRONG',
  );
});

test('delayed review is required for MASTERED', () => {
  assert.equal(
    computeMasteryState({
      exposures: 4,
      recognition: true,
      recall: true,
      context: true,
      delayedReview: true,
    }),
    'MASTERED',
  );
});

import { progressMasteryAfterReview } from '../src/domain/learning/mastery.ts';

test('successful delayed reviews strengthen mastery without using XP', () => {
  assert.equal(progressMasteryAfterReview('LEARNING', true), 'STRONG');
  assert.equal(progressMasteryAfterReview('STRONG', true), 'MASTERED');
  assert.equal(progressMasteryAfterReview('MASTERED', true), 'MASTERED');
});

test('review mistakes schedule relearning instead of resetting to NEW', () => {
  assert.equal(progressMasteryAfterReview('MASTERED', false), 'LEARNING');
  assert.equal(progressMasteryAfterReview('STRONG', false), 'LEARNING');
  assert.equal(progressMasteryAfterReview('SEEN', false), 'SEEN');
});
