import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function currentPayload(mutator: (payload: Record<string, unknown>) => void) {
  const payload = JSON.parse(serializeGuestState(createEmptyGuestState())) as Record<string, unknown>;
  mutator(payload);
  return loadGuestStateWithStatus(storage(JSON.stringify(payload)));
}

test('current schema invalid settings are quarantined instead of silently defaulted', () => {
  const loaded = currentPayload((payload) => {
    payload.settings = { preferredLocale: 'ru', motion: 'spin', media: 'huge' };
  });
  assert.equal(loaded.integrity, 'corrupt');
});

test('current schema mission reflections must already be trimmed non-empty and at most 280 chars', () => {
  for (const reflection of ['  padded  ', 'x'.repeat(281), '   ']) {
    const loaded = currentPayload((payload) => {
      payload.completedMissionIds = ['water-watch'];
      payload.missionReflections = { 'water-watch': reflection };
    });
    assert.equal(loaded.integrity, 'corrupt');
  }
});

test('current schema rejects duplicate set-like ids instead of silently deduplicating them', () => {
  const loaded = currentPayload((payload) => {
    payload.completedMissionIds = ['sky-check', 'sky-check'];
  });
  assert.equal(loaded.integrity, 'corrupt');
});

test('legacy schema can still canonicalize duplicate ids during migration', () => {
  const legacy = JSON.parse(serializeGuestState(createEmptyGuestState())) as Record<string, unknown>;
  legacy.schemaVersion = 6;
  legacy.completedMissionIds = ['sky-check', 'sky-check'];
  const loaded = loadGuestStateWithStatus(storage(JSON.stringify(legacy)));
  assert.equal(loaded.integrity, 'valid');
  assert.deepEqual(loaded.state.completedMissionIds, ['sky-check']);
});
