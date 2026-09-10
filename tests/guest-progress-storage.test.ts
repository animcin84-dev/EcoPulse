import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storageWithValue(value: string | null) {
  return {
    getItem() { return value; },
    setItem() {},
    removeItem() {},
  };
}

test('guest storage reports available when local progress can be read', () => {
  const state = createEmptyGuestState();
  const result = loadGuestStateWithStatus(storageWithValue(serializeGuestState(state)));
  assert.equal(result.available, true);
  assert.deepEqual(result.state, state);
});

test('guest storage reports unavailable when localStorage read throws', () => {
  const storage = {
    getItem() { throw new Error('blocked'); },
    setItem() {},
    removeItem() {},
  };
  const result = loadGuestStateWithStatus(storage);
  assert.equal(result.available, false);
  assert.deepEqual(result.state, createEmptyGuestState());
});

test('missing storage is unavailable rather than pretending durable persistence exists', () => {
  const result = loadGuestStateWithStatus();
  assert.equal(result.available, false);
  assert.deepEqual(result.state, createEmptyGuestState());
});
