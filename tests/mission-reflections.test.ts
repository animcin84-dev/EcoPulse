import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createEmptyGuestState,
  parseGuestState,
  saveMissionReflectionInGuestState,
  serializeGuestState,
} from '../src/domain/learning/guest-state.ts';

test('new guest state stores mission reflections separately from completion ids', () => {
  const state = createEmptyGuestState();
  assert.deepEqual(state.missionReflections, {});
});

test('mission reflection is trimmed, capped at 280 characters and round-trips', () => {
  const state = saveMissionReflectionInGuestState(createEmptyGuestState(), 'water-watch', `  ${'x'.repeat(400)}  `);
  assert.equal(state.missionReflections['water-watch']?.length, 280);
  assert.equal(parseGuestState(serializeGuestState(state)).missionReflections['water-watch']?.length, 280);
});

test('blank mission reflection removes an existing local reflection', () => {
  const withReflection = saveMissionReflectionInGuestState(createEmptyGuestState(), 'water-watch', 'I noticed a leaking tap.');
  const cleared = saveMissionReflectionInGuestState(withReflection, 'water-watch', '   ');
  assert.equal(cleared.missionReflections['water-watch'], undefined);
});

test('v2 guest snapshot migrates to the new schema without losing XP or completed missions', () => {
  const oldSnapshot = JSON.stringify({
    schemaVersion: 2,
    xp: 25,
    lessonProgress: {},
    masteryStates: {},
    reviewRecords: {},
    connectedConceptIds: [],
    completedScenarioIds: [],
    completedMissionIds: ['sky-check'],
    completedChallengeIds: [],
    onboarding: { completed: true, level: 'B1', supportLanguage: 'kk', interests: ['climate'] },
  });
  const migrated = parseGuestState(oldSnapshot);
  assert.equal(migrated.xp, 25);
  assert.deepEqual(migrated.completedMissionIds, ['sky-check']);
  assert.deepEqual(migrated.missionReflections, {});
});
