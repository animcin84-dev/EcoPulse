import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createReviewRecord,
  recordReviewResult,
  selectDueReviewItems,
  chooseNextBestAction,
  buildReviewBatch,
} from '../src/domain/learning/review.ts';

const day = 24 * 60 * 60 * 1000;
const start = new Date('2026-09-09T12:00:00.000Z');

function plusDays(date: Date, days: number) {
  return new Date(date.getTime() + days * day);
}

test('successful review intervals progress 1, 3, 7, 14 and 30 days', () => {
  let record = createReviewRecord('drought', start);
  const expectedIntervals = [1, 3, 7, 14, 30];
  let current = start;

  for (const interval of expectedIntervals) {
    record = recordReviewResult(record, 'correct', current);
    assert.equal(record.dueAt, plusDays(current, interval).toISOString());
    current = new Date(record.dueAt);
  }
});

test('an incorrect review moves the item back and makes it due next day', () => {
  let record = createReviewRecord('glacier', start);
  record = recordReviewResult(record, 'correct', start);
  record = recordReviewResult(record, 'correct', plusDays(start, 1));
  assert.equal(record.stage, 2);

  const mistakeAt = plusDays(start, 4);
  record = recordReviewResult(record, 'incorrect', mistakeAt);

  assert.equal(record.stage, 1);
  assert.equal(record.dueAt, plusDays(mistakeAt, 1).toISOString());
  assert.equal(record.mistakes, 1);
});

test('due review selection returns overdue items first and respects limit', () => {
  const records = [
    { ...createReviewRecord('a', start), dueAt: plusDays(start, -3).toISOString() },
    { ...createReviewRecord('b', start), dueAt: plusDays(start, -1).toISOString() },
    { ...createReviewRecord('c', start), dueAt: plusDays(start, 2).toISOString() },
  ];

  assert.deepEqual(selectDueReviewItems(records, start, 1).map((item) => item.itemId), ['a']);
  assert.deepEqual(selectDueReviewItems(records, start, 5).map((item) => item.itemId), ['a', 'b']);
});

test('next best action prioritizes due review, then lesson, then mission', () => {
  assert.deepEqual(
    chooseNextBestAction({ dueReviewCount: 4, nextLessonSlug: 'glaciers', missionId: 'water-watch' }),
    { type: 'review', count: 4 },
  );
  assert.deepEqual(
    chooseNextBestAction({ dueReviewCount: 0, nextLessonSlug: 'glaciers', missionId: 'water-watch' }),
    { type: 'lesson', slug: 'glaciers' },
  );
  assert.deepEqual(
    chooseNextBestAction({ dueReviewCount: 0, nextLessonSlug: null, missionId: 'water-watch' }),
    { type: 'mission', id: 'water-watch' },
  );
});

test('newly learned material is first reviewed the next day, not immediately', () => {
  const record = createReviewRecord('atmosphere', start);
  assert.equal(record.stage, 0);
  assert.equal(record.dueAt, plusDays(start, 1).toISOString());
  assert.deepEqual(selectDueReviewItems([record], start), []);
});


test('maintenance review stages keep advancing while the interval remains capped at 30 days', () => {
  let record = { ...createReviewRecord('ecosystem', start), stage: 5, dueAt: start.toISOString() };
  record = recordReviewResult(record, 'correct', start);
  assert.equal(record.stage, 6);
  assert.equal(record.dueAt, plusDays(start, 30).toISOString());

  const nextTime = new Date(record.dueAt);
  record = recordReviewResult(record, 'correct', nextTime);
  assert.equal(record.stage, 7);
  assert.equal(record.dueAt, plusDays(nextTime, 30).toISOString());
});

test('review batching caps one focused session and reports the due work left outside it', () => {
  const records = Array.from({ length: 11 }, (_, index) => ({
    itemId: `item-${index + 1}`,
    stage: 0,
    dueAt: plusDays(start, -index).toISOString(),
    mistakes: 0,
  }));

  const batch = buildReviewBatch(records, start, 8);
  assert.equal(batch.records.length, 8);
  assert.equal(batch.totalDue, 11);
  assert.equal(batch.remainingCount, 3);
  assert.deepEqual(batch.records.map((record) => record.itemId), [
    'item-11', 'item-10', 'item-9', 'item-8', 'item-7', 'item-6', 'item-5', 'item-4',
  ]);
});

test('review batching never reports hidden remaining work when all due items fit', () => {
  const records = [
    { itemId: 'a', stage: 0, dueAt: plusDays(start, -1).toISOString(), mistakes: 0 },
    { itemId: 'b', stage: 0, dueAt: start.toISOString(), mistakes: 0 },
  ];

  const batch = buildReviewBatch(records, start, 8);
  assert.equal(batch.records.length, 2);
  assert.equal(batch.totalDue, 2);
  assert.equal(batch.remainingCount, 0);
});
