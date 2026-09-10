import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { reviewItemsById } from '../src/content/review-items.ts';

test('every curriculum target word has a review item', () => {
  for (const lesson of lessonSequence) {
    for (const word of lesson.targetWords) {
      assert.ok(reviewItemsById[word], `${lesson.slug}: missing review item for ${word}`);
    }
  }
});

test('review items contain bilingual definition and exactly one declared answer', () => {
  for (const item of Object.values(reviewItemsById)) {
    assert.ok(item.definition.en.trim());
    assert.ok(item.definition.kk.trim());
    assert.equal(item.options.filter((option) => option.id === item.correctOptionId).length, 1);
  }
});
