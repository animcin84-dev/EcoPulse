import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { applyValidatedGuestStateUpdate } from '../src/domain/learning/runtime-state-update.ts';

test('valid runtime guest-state update is applied and canonicalized', () => {
  const current = createEmptyGuestState();
  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    settings: { ...draft.settings, preferredLocale: 'kk' },
  }));

  assert.equal(result.applied, true);
  assert.equal(result.state.settings.preferredLocale, 'kk');
  assert.equal(current.settings.preferredLocale, 'en');
});

test('runtime update with an unknown authored mission id is rejected', () => {
  const current = createEmptyGuestState();
  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    completedMissionIds: [...draft.completedMissionIds, 'mission-that-does-not-exist'],
  }));

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
  assert.deepEqual(current.completedMissionIds, []);
});

test('mutating updater cannot corrupt the original state when validation rejects it', () => {
  const current = createEmptyGuestState();
  const result = applyValidatedGuestStateUpdate(current, (draft) => {
    draft.completedMissionIds.push('mission-that-does-not-exist');
    return draft;
  });

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
  assert.deepEqual(current.completedMissionIds, []);
});

test('runtime update with contradictory mastery label and evidence is rejected', () => {
  const current = createEmptyGuestState();
  const result = applyValidatedGuestStateUpdate(current, (draft) => ({
    ...draft,
    masteryStates: { atmosphere: 'MASTERED' },
  }));

  assert.equal(result.applied, false);
  assert.equal(result.state, current);
});
