import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createDefaultLearningSettings,
  normalizeLearningSettings,
  updateLearningSettings,
} from '../src/domain/learning/settings.ts';
import {
  createEmptyGuestState,
  GUEST_STATE_VERSION,
  parseGuestState,
  serializeGuestState,
} from '../src/domain/learning/guest-state.ts';

test('learning settings default to English, system motion and automatic media loading', () => {
  assert.deepEqual(createDefaultLearningSettings(), {
    preferredLocale: 'en',
    motion: 'system',
    media: 'auto',
  });
});

test('learning settings normalize invalid persisted values without collecting new data', () => {
  assert.deepEqual(normalizeLearningSettings({ preferredLocale: 'kk', motion: 'reduced', media: 'reduced' }), {
    preferredLocale: 'kk',
    motion: 'reduced',
    media: 'reduced',
  });
  assert.deepEqual(normalizeLearningSettings({ preferredLocale: 'ru', motion: 'spin', media: 'huge' }), {
    preferredLocale: 'en',
    motion: 'system',
    media: 'auto',
  });
  assert.deepEqual(normalizeLearningSettings(null), createDefaultLearningSettings());
});

test('learning setting updates preserve untouched preferences', () => {
  const current = { preferredLocale: 'en' as const, motion: 'system' as const, media: 'auto' as const };
  assert.deepEqual(updateLearningSettings(current, { preferredLocale: 'kk' }), {
    preferredLocale: 'kk',
    motion: 'system',
    media: 'auto',
  });
  assert.deepEqual(updateLearningSettings(current, { motion: 'reduced' }), {
    preferredLocale: 'en',
    motion: 'reduced',
    media: 'auto',
  });
});

test('v3 guest snapshots migrate to v4 with default learning settings and no lost progress', () => {
  const current = createEmptyGuestState() as unknown as Record<string, unknown>;
  current.schemaVersion = 3;
  current.xp = 320;
  current.completedMissionIds = ['water-watch'];
  current.missionReflections = { 'water-watch': 'I noticed a leaking tap.' };
  delete current.settings;

  const migrated = parseGuestState(JSON.stringify(current));
  assert.equal(migrated.schemaVersion, GUEST_STATE_VERSION);
  assert.equal(migrated.xp, 320);
  assert.deepEqual(migrated.completedMissionIds, ['water-watch']);
  assert.equal(migrated.missionReflections['water-watch'], 'I noticed a leaking tap.');
  assert.deepEqual(migrated.settings, createDefaultLearningSettings());
});

test('v4 learning settings round-trip while malformed settings fall back without erasing progress', () => {
  const state = createEmptyGuestState();
  state.xp = 205;
  state.settings = { preferredLocale: 'kk', motion: 'reduced', media: 'reduced' };

  const restored = parseGuestState(serializeGuestState(state));
  assert.deepEqual(restored.settings, state.settings);

  const malformed = JSON.parse(serializeGuestState(state)) as Record<string, unknown>;
  malformed.schemaVersion = 4;
  malformed.settings = { preferredLocale: 'xx', motion: 'instant', media: 'maximum' };
  const safe = parseGuestState(JSON.stringify(malformed));
  assert.equal(safe.xp, 205);
  assert.deepEqual(safe.settings, createDefaultLearningSettings());
});


test('v5 guest snapshots migrate to the current schema with automatic media loading', () => {
  const current = createEmptyGuestState() as unknown as Record<string, unknown>;
  current.schemaVersion = 5;
  current.xp = 411;
  current.settings = { preferredLocale: 'kk', motion: 'reduced' };

  const migrated = parseGuestState(JSON.stringify(current));
  assert.equal(migrated.schemaVersion, GUEST_STATE_VERSION);
  assert.equal(migrated.xp, 411);
  assert.deepEqual(migrated.settings, { preferredLocale: 'kk', motion: 'reduced', media: 'auto' });
});
