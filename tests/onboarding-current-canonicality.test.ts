import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

function currentWithInterests(interests: string[]) {
  const state = createEmptyGuestState();
  state.onboarding = {
    ...state.onboarding,
    interests: interests as typeof state.onboarding.interests,
  };
  return loadGuestStateWithStatus(storage(serializeGuestState(state)));
}

test('current schema rejects duplicate approved onboarding interests instead of silently deduplicating them', () => {
  const loaded = currentWithInterests(['climate', 'climate']);
  assert.equal(loaded.integrity, 'corrupt');
});

test('current schema rejects unknown onboarding interests', () => {
  const loaded = currentWithInterests(['climate', 'not-real']);
  assert.equal(loaded.integrity, 'corrupt');
});

test('current schema accepts unique approved onboarding interests in authored order', () => {
  const loaded = currentWithInterests(['water', 'climate', 'life']);
  assert.equal(loaded.integrity, 'valid');
  assert.deepEqual(loaded.state.onboarding.interests, ['water', 'climate', 'life']);
});

test('legacy v6 onboarding interests remain tolerant and canonicalize duplicates and unknown ids', () => {
  const legacy = JSON.parse(serializeGuestState(createEmptyGuestState())) as Record<string, unknown>;
  legacy.schemaVersion = 6;
  legacy.onboarding = {
    completed: true,
    level: 'B1',
    supportLanguage: 'kk',
    interests: ['climate', 'climate', 'not-real', 'water'],
  };

  const loaded = loadGuestStateWithStatus(storage(JSON.stringify(legacy)));
  assert.equal(loaded.integrity, 'valid');
  assert.deepEqual(loaded.state.onboarding.interests, ['climate', 'water']);
});
