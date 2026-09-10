import test from 'node:test';
import assert from 'node:assert/strict';

import { homeDemo, resolveHomeDemoAttempt } from '../src/domain/learning/home-demo.ts';

test('homepage demo uses the approved Glacier meaning question and connection chain', () => {
  assert.equal(homeDemo.word, 'GLACIER');
  assert.equal(homeDemo.correctOptionId, 'glacier');
  assert.deepEqual(homeDemo.connection, ['GLACIER', 'MELT', 'SEA LEVEL']);
  assert.equal(homeDemo.options.find((option) => option.id === 'glacier')?.label.kk, 'Құрлықтағы үлкен мұз массасы');
});

test('homepage demo gives one retry before revealing the answer', () => {
  assert.equal(resolveHomeDemoAttempt(homeDemo.correctOptionId, 'wind', 0), 'try_again');
  assert.equal(resolveHomeDemoAttempt(homeDemo.correctOptionId, 'weather', 1), 'reveal');
});

test('homepage demo resolves immediately on the correct answer', () => {
  assert.equal(resolveHomeDemoAttempt(homeDemo.correctOptionId, 'glacier', 0), 'correct');
});
