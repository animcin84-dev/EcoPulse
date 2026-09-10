import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { loadGuestStateWithStatus } from '../src/lib/guest-progress.ts';

function storage(raw: string | null) {
  return {
    getItem() { return raw; },
    setItem() {},
    removeItem() {},
  };
}

function legacySnapshot(version: number): Record<string, unknown> {
  const current = createEmptyGuestState();
  const base: Record<string, unknown> = {
    schemaVersion: version,
    xp: 0,
    lessonProgress: {},
    masteryStates: {},
    reviewRecords: {},
    connectedConceptIds: [],
    completedScenarioIds: [],
    completedMissionIds: [],
  };

  if (version >= 2) {
    base.completedChallengeIds = [];
    base.onboarding = current.onboarding;
  }
  if (version >= 3) base.missionReflections = {};
  if (version >= 4) base.settings = current.settings;
  if (version >= 5) base.masteryEvidence = {};
  return base;
}

test('valid empty legacy snapshots v1-v6 migrate without being quarantined', () => {
  for (let version = 1; version <= 6; version += 1) {
    const raw = JSON.stringify(legacySnapshot(version));
    const result = loadGuestStateWithStatus(storage(raw));
    assert.equal(result.integrity, 'valid', `schema v${version}`);
    assert.equal(result.state.schemaVersion, 7, `schema v${version}`);
    assert.equal(result.raw, raw, `schema v${version}`);
  }
});

test('malformed legacy snapshots are quarantined instead of being treated as valid empty migrations', () => {
  for (let version = 1; version <= 6; version += 1) {
    const snapshot = legacySnapshot(version);
    snapshot.xp = -1;
    const raw = JSON.stringify(snapshot);
    const result = loadGuestStateWithStatus(storage(raw));
    assert.equal(result.integrity, 'corrupt', `schema v${version}`);
    assert.equal(result.raw, raw, `schema v${version}`);
    assert.equal(result.state.xp, 0, `schema v${version}`);
  }
});

test('legacy snapshots with version-required fields missing are quarantined', () => {
  const v2 = legacySnapshot(2);
  delete v2.onboarding;
  const v5 = legacySnapshot(5);
  delete v5.masteryEvidence;

  for (const snapshot of [v2, v5]) {
    const raw = JSON.stringify(snapshot);
    const result = loadGuestStateWithStatus(storage(raw));
    assert.equal(result.integrity, 'corrupt');
    assert.equal(result.raw, raw);
  }
});
