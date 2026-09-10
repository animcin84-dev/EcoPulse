import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { createLearningDataExport, resetLearningProgress } from '../src/domain/learning/data-controls.ts';

test('learning data export is explicit, versioned and contains the portable guest snapshot', () => {
  const state = createEmptyGuestState();
  state.xp = 125;
  state.completedMissionIds = ['sky-check'];
  state.missionReflections = { 'sky-check': 'Cloudy and windy today.' };

  const exported = createLearningDataExport(state, new Date('2026-09-10T06:30:00+05:00'));
  assert.equal(exported.product, 'EcoPulse');
  assert.equal(exported.exportVersion, 1);
  assert.equal(exported.exportedAt, '2026-09-10T01:30:00.000Z');
  assert.equal(exported.learningState.xp, 125);
  assert.deepEqual(exported.learningState.completedMissionIds, ['sky-check']);
  assert.equal(exported.learningState.missionReflections['sky-check'], 'Cloudy and windy today.');
});

test('reset learning progress clears learning history but preserves learner preferences', () => {
  const state = createEmptyGuestState();
  state.settings = { preferredLocale: 'kk', motion: 'reduced', media: 'reduced' };
  state.onboarding = { completed: true, level: 'B2', supportLanguage: 'kk', interests: ['water', 'life'] };
  state.xp = 900;
  state.lessonProgress = { atmosphere: { lessonId: 'lesson-atmosphere', currentStepIndex: 4, status: 'completed', xp: 35, attempts: {} } };
  state.masteryStates = { atmosphere: 'STRONG' };
  state.connectedConceptIds = ['atmosphere'];
  state.completedMissionIds = ['sky-check'];
  state.missionReflections = { 'sky-check': 'I noticed strong wind.' };
  state.completedChallengeIds = ['weather-detective'];

  const reset = resetLearningProgress(state);
  assert.equal(reset.xp, 0);
  assert.deepEqual(reset.lessonProgress, {});
  assert.deepEqual(reset.masteryStates, {});
  assert.deepEqual(reset.masteryEvidence, {});
  assert.deepEqual(reset.reviewRecords, {});
  assert.deepEqual(reset.connectedConceptIds, []);
  assert.deepEqual(reset.completedMissionIds, []);
  assert.deepEqual(reset.missionReflections, {});
  assert.deepEqual(reset.completedChallengeIds, []);
  assert.deepEqual(reset.settings, state.settings);
  assert.deepEqual(reset.onboarding, state.onboarding);
});

test('reset returns a new snapshot and never mutates the current guest state', () => {
  const state = createEmptyGuestState();
  state.xp = 42;
  const reset = resetLearningProgress(state);
  assert.notEqual(reset, state);
  assert.equal(state.xp, 42);
  assert.equal(reset.xp, 0);
});

import { existsSync, readFileSync } from 'node:fs';

test('settings exposes export and two-step reset through a dedicated data-controls component', () => {
  assert.equal(existsSync('src/components/settings/DataControlsPanel.tsx'), true);
  const settings = readFileSync('src/components/settings/LearningSettingsPanel.tsx', 'utf8');
  const controls = readFileSync('src/components/settings/DataControlsPanel.tsx', 'utf8');
  assert.match(settings, /DataControlsPanel/);
  assert.match(controls, /createLearningDataExport/);
  assert.match(controls, /resetLearningProgress/);
  assert.match(controls, /confirmReset/);
  assert.match(controls, /Blob/);
  assert.doesNotMatch(controls, /fetch\(|XMLHttpRequest|navigator\.sendBeacon/);
});
