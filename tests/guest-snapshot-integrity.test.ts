import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, GUEST_STATE_VERSION, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string | null) {
  return {
    getItem() { return raw; },
    setItem() {},
    removeItem() {},
  };
}

test('a valid empty current snapshot is classified as valid/empty rather than corrupt', () => {
  const raw = serializeGuestState(createEmptyGuestState());
  const result = loadGuestStateWithStatus(storage(raw));
  assert.equal(result.available, true);
  assert.equal(result.integrity, 'valid');
  assert.equal(result.raw, raw);
});


test('an empty-string stored payload is quarantined as corrupt rather than treated as no snapshot', () => {
  const raw = '';
  const result = loadGuestStateWithStatus(storage(raw));
  assert.equal(result.available, true);
  assert.equal(result.integrity, 'corrupt');
  assert.equal(result.raw, raw);
  assert.deepEqual(result.state, createEmptyGuestState());
});

test('malformed JSON is quarantined as corrupt and its raw bytes are preserved', () => {
  const raw = '{broken json';
  const result = loadGuestStateWithStatus(storage(raw));
  assert.equal(result.available, true);
  assert.equal(result.integrity, 'corrupt');
  assert.equal(result.raw, raw);
  assert.deepEqual(result.state, createEmptyGuestState());
});

test('malformed current-schema shape is quarantined instead of silently accepted as empty', () => {
  const raw = JSON.stringify({ ...createEmptyGuestState(), xp: -10 });
  const result = loadGuestStateWithStatus(storage(raw));
  assert.equal(result.integrity, 'corrupt');
  assert.equal(result.raw, raw);
});

test('a future snapshot version is quarantined as unsupported without downgrade', () => {
  const raw = JSON.stringify({ ...createEmptyGuestState(), schemaVersion: GUEST_STATE_VERSION + 1, xp: 99 });
  const result = loadGuestStateWithStatus(storage(raw));
  assert.equal(result.integrity, 'unsupported');
  assert.equal(result.raw, raw);
  assert.equal(result.state.xp, 0);
});

test('no stored snapshot is an available empty slot, not corruption', () => {
  const result = loadGuestStateWithStatus(storage(null));
  assert.equal(result.available, true);
  assert.equal(result.integrity, 'empty');
  assert.equal(result.raw, null);
});
