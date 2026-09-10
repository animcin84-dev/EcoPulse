import test from 'node:test';
import assert from 'node:assert/strict';

import { moveOrderingItem, isCorrectOrder } from '../src/domain/learning/ordering.ts';
import { seaLevelLesson } from '../src/content/lessons/sea-level.ts';
import { validateLesson } from '../src/domain/content/validate.ts';
import type { Lesson } from '../src/domain/content/types.ts';

test('moveOrderingItem moves an item by one position without mutating the input', () => {
  const original = ['temperature', 'melt', 'sea-level'];
  const moved = moveOrderingItem(original, 2, -1);

  assert.deepEqual(moved, ['temperature', 'sea-level', 'melt']);
  assert.deepEqual(original, ['temperature', 'melt', 'sea-level']);
});

test('moveOrderingItem leaves boundary items in place', () => {
  assert.deepEqual(moveOrderingItem(['a', 'b', 'c'], 0, -1), ['a', 'b', 'c']);
  assert.deepEqual(moveOrderingItem(['a', 'b', 'c'], 2, 1), ['a', 'b', 'c']);
});

test('isCorrectOrder requires the exact authored sequence', () => {
  assert.equal(isCorrectOrder(['a', 'b', 'c'], ['a', 'b', 'c']), true);
  assert.equal(isCorrectOrder(['a', 'c', 'b'], ['a', 'b', 'c']), false);
});

test('sea-level lesson includes an accessible ordering step for the land-ice system', () => {
  const ordering = seaLevelLesson.steps.find((step) => step.type === 'ordering');
  assert.ok(ordering);
  assert.deepEqual(ordering.correctOrder, ['temperature-rise', 'land-ice-melt', 'sea-level-rise']);
  assert.equal(ordering.items.length, 3);
});

test('lesson validator rejects ordering steps with duplicate items or mismatched correct order', () => {
  const broken: Lesson = {
    id: 'ordering-broken',
    slug: 'ordering-broken',
    version: '1.0.0',
    world: 'ice-water',
    title: { en: 'Broken', kk: 'Қате' },
    estimatedMinutes: 5,
    targetWords: ['melt'],
    sourceIds: ['nasa-sea-level'],
    steps: [
      {
        id: 'bad-order',
        type: 'ordering',
        title: { en: 'Order', kk: 'Ретте' },
        prompt: { en: 'Order it', kk: 'Ретте' },
        items: [
          { id: 'a', label: { en: 'A', kk: 'A' } },
          { id: 'a', label: { en: 'A again', kk: 'A қайта' } },
        ],
        correctOrder: ['a', 'missing'],
        explanation: { en: 'Because', kk: 'Себебі' },
        xp: 10,
      },
      { id: 'result', type: 'result', title: { en: 'Done', kk: 'Дайын' } },
    ],
  };

  const errors = validateLesson(broken);
  assert.ok(errors.some((error) => error.includes('items ids must be unique')));
  assert.ok(errors.some((error) => error.includes('correctOrder must contain each item exactly once')));
});
