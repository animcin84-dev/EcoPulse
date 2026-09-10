import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, type GuestState } from '../src/domain/learning/guest-state.ts';
import { mergeProgressSnapshots, syncProgressSnapshot, type ProgressRepository } from '../src/domain/learning/progress-sync.ts';

function withState(patch: Partial<GuestState>): GuestState {
  return { ...createEmptyGuestState(), ...patch };
}

test('initial account merge preserves local learning evidence without inflating XP', () => {
  const local = withState({
    xp: 145,
    completedMissionIds: ['water-watch'],
    connectedConceptIds: ['glacier', 'melt'],
    masteryStates: { GLACIER: 'STRONG' },
    missionReflections: { 'water-watch': 'I noticed a leaking tap.' },
  });

  const merged = mergeProgressSnapshots(local, createEmptyGuestState());
  assert.equal(merged.xp, 145);
  assert.deepEqual(merged.completedMissionIds, ['water-watch']);
  assert.deepEqual(merged.connectedConceptIds, ['glacier', 'melt']);
  assert.equal(merged.masteryStates.GLACIER, 'STRONG');
  assert.equal(merged.missionReflections['water-watch'], 'I noticed a leaking tap.');
});

test('merge keeps completed lesson evidence, stronger mastery and conservative review timing', () => {
  const local = withState({
    xp: 210,
    lessonProgress: {
      glaciers: { lessonId: 'glaciers', currentStepIndex: 3, status: 'in_progress', xp: 20, attempts: {} },
    },
    masteryStates: { GLACIER: 'MASTERED', MELT: 'LEARNING' },
    reviewRecords: {
      GLACIER: { itemId: 'GLACIER', stage: 4, dueAt: '2026-09-20T00:00:00.000Z', mistakes: 0 },
    },
  });
  const remote = withState({
    xp: 180,
    lessonProgress: {
      glaciers: { lessonId: 'glaciers', currentStepIndex: 6, status: 'completed', xp: 35, attempts: {} },
    },
    masteryStates: { GLACIER: 'STRONG', MELT: 'STRONG' },
    reviewRecords: {
      GLACIER: { itemId: 'GLACIER', stage: 2, dueAt: '2026-09-12T00:00:00.000Z', mistakes: 2 },
    },
  });

  const merged = mergeProgressSnapshots(local, remote);
  assert.equal(merged.xp, 210);
  assert.equal(merged.lessonProgress.glaciers?.status, 'completed');
  assert.equal(merged.lessonProgress.glaciers?.xp, 35);
  assert.equal(merged.masteryStates.GLACIER, 'STRONG');
  assert.equal(merged.masteryEvidence.GLACIER?.delayedReview, false);
  assert.equal(merged.masteryStates.MELT, 'STRONG');
  assert.deepEqual(merged.reviewRecords.GLACIER, {
    itemId: 'GLACIER',
    stage: 2,
    dueAt: '2026-09-12T00:00:00.000Z',
    mistakes: 2,
  });
});

test('merge unions completion evidence while remote text/settings win conflicts', () => {
  const local = withState({
    completedMissionIds: ['water-watch'],
    completedChallengeIds: ['weather-detective'],
    completedScenarioIds: ['think-local'],
    connectedConceptIds: ['drought'],
    missionReflections: { 'water-watch': 'local text', 'sky-check': 'local only' },
    onboarding: { completed: true, level: 'A2', supportLanguage: 'kk', interests: ['water'] },
  });
  const remote = withState({
    completedMissionIds: ['sky-check'],
    completedChallengeIds: ['coastal-city'],
    completedScenarioIds: ['think-remote'],
    connectedConceptIds: ['wildfire'],
    missionReflections: { 'water-watch': 'remote text' },
    onboarding: { completed: true, level: 'B2', supportLanguage: 'kk', interests: ['climate'] },
  });

  const merged = mergeProgressSnapshots(local, remote);
  assert.deepEqual(new Set(merged.completedMissionIds), new Set(['water-watch', 'sky-check']));
  assert.deepEqual(new Set(merged.completedChallengeIds), new Set(['weather-detective', 'coastal-city']));
  assert.deepEqual(new Set(merged.completedScenarioIds), new Set(['think-local', 'think-remote']));
  assert.deepEqual(new Set(merged.connectedConceptIds), new Set(['drought', 'wildfire']));
  assert.equal(merged.missionReflections['water-watch'], 'remote text');
  assert.equal(merged.missionReflections['sky-check'], 'local only');
  assert.equal(merged.onboarding.level, 'B2');
});

test('sync uploads local snapshot when account has no remote state', async () => {
  let saved: GuestState | null = null;
  const repository: ProgressRepository = {
    load: async () => null,
    save: async (state) => { saved = state; },
  };
  const local = withState({ xp: 90, completedMissionIds: ['sky-check'] });

  const result = await syncProgressSnapshot(local, repository);
  assert.equal(result.mode, 'uploaded-local');
  assert.equal(result.state.xp, 90);
  assert.equal(saved?.xp, 90);
});

test('sync merges and saves an existing account snapshot deterministically', async () => {
  const remote = withState({ xp: 120, completedMissionIds: ['sky-check'] });
  let saved: GuestState | null = null;
  const repository: ProgressRepository = {
    load: async () => remote,
    save: async (state) => { saved = state; },
  };
  const local = withState({ xp: 80, completedMissionIds: ['water-watch'] });

  const first = await syncProgressSnapshot(local, repository);
  const second = mergeProgressSnapshots(first.state, first.state);
  assert.equal(first.mode, 'merged');
  assert.equal(first.state.xp, 120);
  assert.deepEqual(new Set(saved?.completedMissionIds), new Set(['sky-check', 'water-watch']));
  assert.deepEqual(second, first.state);
});

test('lesson progress merge keeps currentStepIndex and currentStepId from the winning snapshot', () => {
  const local = withState({
    lessonProgress: {
      atmosphere: {
        lessonId: 'atmosphere',
        currentStepIndex: 4,
        currentStepId: 'think-no-atmosphere',
        status: 'in_progress',
        xp: 20,
        attempts: {},
      },
    },
  });
  const remote = withState({
    lessonProgress: {
      atmosphere: {
        lessonId: 'atmosphere',
        currentStepIndex: 2,
        currentStepId: 'connection-atmosphere-weather-climate',
        status: 'in_progress',
        xp: 30,
        attempts: {},
      },
    },
  });

  const merged = mergeProgressSnapshots(local, remote);
  assert.equal(merged.lessonProgress.atmosphere?.currentStepIndex, 4);
  assert.equal(merged.lessonProgress.atmosphere?.currentStepId, 'think-no-atmosphere');
  assert.equal(merged.lessonProgress.atmosphere?.xp, 30);
});

test('completed lesson progress wins the resume anchor even when its numeric index is lower', () => {
  const local = withState({
    lessonProgress: {
      glaciers: {
        lessonId: 'glaciers',
        currentStepIndex: 6,
        currentStepId: 'reading-glacier-motion',
        status: 'in_progress',
        xp: 45,
        attempts: {},
      },
    },
  });
  const remote = withState({
    lessonProgress: {
      glaciers: {
        lessonId: 'glaciers',
        currentStepIndex: 5,
        currentStepId: 'result-glaciers',
        status: 'completed',
        xp: 40,
        attempts: {},
      },
    },
  });

  const merged = mergeProgressSnapshots(local, remote);
  assert.equal(merged.lessonProgress.glaciers?.status, 'completed');
  assert.equal(merged.lessonProgress.glaciers?.currentStepIndex, 5);
  assert.equal(merged.lessonProgress.glaciers?.currentStepId, 'result-glaciers');
  assert.equal(merged.lessonProgress.glaciers?.xp, 45);
});
