import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, serializeGuestState } from '../src/domain/learning/guest-state.ts';
import { applyValidatedGuestStateUpdate } from '../src/domain/learning/runtime-state-update.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string) {
  return { getItem() { return raw; }, setItem() {}, removeItem() {} };
}

test('mission reflection without completed mission is incompatible', () => {
  const state = createEmptyGuestState();
  state.missionReflections['water-watch'] = 'I noticed a leaking tap.';

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'incompatible');
});

test('completed mission remains valid without an optional reflection', () => {
  const state = createEmptyGuestState();
  state.completedMissionIds = ['water-watch'];

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('completed mission with its reflection remains valid', () => {
  const state = createEmptyGuestState();
  state.completedMissionIds = ['water-watch'];
  state.missionReflections['water-watch'] = 'I noticed a leaking tap.';

  const loaded = loadGuestStateWithStatus(storage(serializeGuestState(state)));
  assert.equal(loaded.integrity, 'valid');
});

test('runtime guard rejects removing mission completion while its reflection remains', () => {
  const current = createEmptyGuestState();
  current.completedMissionIds = ['water-watch'];
  current.missionReflections['water-watch'] = 'I noticed a leaking tap.';

  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    completedMissionIds: [],
  }));

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
});
