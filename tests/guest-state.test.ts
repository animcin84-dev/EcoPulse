import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createEmptyGuestState,
  parseGuestState,
  serializeGuestState,
  GUEST_STATE_VERSION,
} from '../src/domain/learning/guest-state.ts';
import { evidenceForLegacyMasteryState } from '../src/domain/learning/mastery.ts';


test('guest snapshot round-trips without losing learning state', () => {
  const state = createEmptyGuestState();
  state.xp = 125;
  state.lessonProgress.atmosphere = {
    lessonId: 'lesson-atmosphere',
    currentStepIndex: 4,
    currentStepId: 'result-first-pulse',
    status: 'completed',
    xp: 20,
    attempts: {},
  };
  state.masteryEvidence.atmosphere = evidenceForLegacyMasteryState('LEARNING');
  state.masteryStates.atmosphere = 'LEARNING';
  state.completedMissionIds.push('sky-check');

  const restored = parseGuestState(serializeGuestState(state));
  assert.deepEqual(restored, state);
});

test('malformed guest storage falls back to a clean state', () => {
  assert.deepEqual(parseGuestState('{bad json'), createEmptyGuestState());
  assert.deepEqual(parseGuestState(JSON.stringify({ random: 'shape' })), createEmptyGuestState());
});

test('unsupported snapshot versions fall back rather than mixing incompatible state', () => {
  const raw = JSON.stringify({
    ...createEmptyGuestState(),
    schemaVersion: GUEST_STATE_VERSION + 99,
    xp: 9999,
  });

  const restored = parseGuestState(raw);
  assert.equal(restored.schemaVersion, GUEST_STATE_VERSION);
  assert.equal(restored.xp, 0);
});

test('empty guest state has stable versioned collections', () => {
  const state = createEmptyGuestState();
  assert.equal(state.schemaVersion, GUEST_STATE_VERSION);
  assert.deepEqual(state.lessonProgress, {});
  assert.deepEqual(state.masteryStates, {});
  assert.deepEqual(state.reviewRecords, {});
  assert.deepEqual(state.connectedConceptIds, []);
  assert.deepEqual(state.completedScenarioIds, []);
  assert.deepEqual(state.completedMissionIds, []);
});

import { atmosphereLesson } from '../src/content/lessons/atmosphere.ts';
import { completeLesson, createLessonProgress, recordAnswer } from '../src/domain/learning/progress.ts';
import { upsertLessonProgress, finalizeLessonInGuestState } from '../src/domain/learning/guest-state.ts';


test('upserting lesson progress adds only the XP delta to global guest XP', () => {
  let state = createEmptyGuestState();
  let progress = createLessonProgress(atmosphereLesson.id);
  progress = recordAnswer(progress, 'meaning-atmosphere', true, 5);
  state = upsertLessonProgress(state, atmosphereLesson.slug, progress);
  assert.equal(state.xp, 5);

  state = upsertLessonProgress(state, atmosphereLesson.slug, progress);
  assert.equal(state.xp, 5);

  progress = recordAnswer(progress, 'think-no-atmosphere', true, 15);
  state = upsertLessonProgress(state, atmosphereLesson.slug, progress);
  assert.equal(state.xp, 20);
});

test('finalizing a lesson creates review, exposure, connections and scenario evidence once', () => {
  let state = createEmptyGuestState();
  const completed = completeLesson({ ...createLessonProgress(atmosphereLesson.id), xp: 20 });
  state = upsertLessonProgress(state, atmosphereLesson.slug, completed);
  state = finalizeLessonInGuestState(state, atmosphereLesson, new Date('2026-09-09T12:00:00.000Z'));

  assert.equal(state.masteryStates.atmosphere, 'SEEN');
  assert.equal(state.masteryEvidence.atmosphere?.exposures, 1);
  assert.ok(state.reviewRecords.atmosphere);
  assert.ok(state.connectedConceptIds.includes('weather'));
  assert.ok(state.connectedConceptIds.includes('climate'));
  assert.ok(state.completedScenarioIds.includes('think-no-atmosphere'));

  const second = finalizeLessonInGuestState(state, atmosphereLesson, new Date('2026-09-09T12:00:00.000Z'));
  assert.deepEqual(second, state);
});

test('completing a lesson awards the completion bonus exactly once', () => {
  let state = createEmptyGuestState();
  const inProgress = { ...createLessonProgress(atmosphereLesson.id), xp: 20 };
  state = upsertLessonProgress(state, atmosphereLesson.slug, inProgress);
  assert.equal(state.xp, 20);

  const completed = completeLesson(inProgress);
  state = upsertLessonProgress(state, atmosphereLesson.slug, completed);
  assert.equal(state.xp, 60);

  state = upsertLessonProgress(state, atmosphereLesson.slug, completed);
  assert.equal(state.xp, 60);
});

test('mission completion is idempotent and awards mission XP once', async () => {
  const { completeMissionInGuestState } = await import('../src/domain/learning/guest-state.ts');
  let state = createEmptyGuestState();
  state = completeMissionInGuestState(state, 'water-watch');
  assert.equal(state.xp, 25);
  assert.deepEqual(state.completedMissionIds, ['water-watch']);

  state = completeMissionInGuestState(state, 'water-watch');
  assert.equal(state.xp, 25);
  assert.deepEqual(state.completedMissionIds, ['water-watch']);
});

test('v1 guest snapshots migrate to v2 without losing learning progress', () => {
  const legacy = {
    schemaVersion: 1,
    xp: 77,
    lessonProgress: {
      atmosphere: {
        lessonId: 'lesson-atmosphere',
        currentStepIndex: 4,
        status: 'completed',
        xp: 20,
        attempts: {},
      },
    },
    masteryStates: { atmosphere: 'LEARNING' },
    reviewRecords: {},
    connectedConceptIds: ['atmosphere'],
    completedScenarioIds: ['think-no-atmosphere'],
    completedMissionIds: ['sky-check'],
  };

  const migrated = parseGuestState(JSON.stringify(legacy));
  assert.equal(migrated.schemaVersion, GUEST_STATE_VERSION);
  assert.equal(migrated.xp, 77);
  assert.equal(migrated.lessonProgress.atmosphere?.status, 'completed');
  assert.deepEqual(migrated.completedMissionIds, ['sky-check']);
  assert.equal(migrated.onboarding.completed, false);
  assert.deepEqual(migrated.completedChallengeIds, []);
});

test('guest onboarding preferences round-trip with the versioned snapshot', () => {
  const state = createEmptyGuestState();
  state.onboarding = {
    completed: true,
    level: 'B1',
    supportLanguage: 'kk',
    interests: ['climate', 'water'],
  };

  const restored = parseGuestState(serializeGuestState(state));
  assert.deepEqual(restored.onboarding, state.onboarding);
});

test('v6 snapshots gain a stable currentStepId from the frozen pre-reading lesson sequence', () => {
  const current = createEmptyGuestState();
  const legacyV6 = {
    ...current,
    schemaVersion: 6,
    lessonProgress: {
      atmosphere: {
        lessonId: 'lesson-atmosphere',
        currentStepIndex: 3,
        status: 'in_progress',
        xp: 20,
        attempts: {},
      },
    },
  };

  const migrated = parseGuestState(JSON.stringify(legacyV6));
  assert.equal(migrated.schemaVersion, 7);
  assert.equal(migrated.lessonProgress.atmosphere?.currentStepId, 'think-no-atmosphere');
});
