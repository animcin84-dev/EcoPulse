import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { createLearningDataExport, parseLearningDataImport } from '../src/domain/learning/data-controls.ts';

function importResult(mutator: (state: ReturnType<typeof createEmptyGuestState>) => void) {
  const state = createEmptyGuestState();
  mutator(state);
  const payload = createLearningDataExport(state, new Date('2026-09-10T09:30:00+05:00'));
  return parseLearningDataImport(JSON.stringify(payload));
}

test('import rejects lesson progress that does not resolve to the current authored lesson identity', () => {
  const result = importResult((state) => {
    state.lessonProgress.atmosphere = {
      lessonId: 'lesson-not-atmosphere', currentStepIndex: 0, currentStepId: 'discover-atmosphere', status: 'in_progress', xp: 0, attempts: {},
    };
  });
  assert.deepEqual(result, { ok: false, reason: 'inconsistent-learning-state' });
});

test('import rejects unknown stable resume steps in a known lesson', () => {
  const result = importResult((state) => {
    state.lessonProgress.atmosphere = {
      lessonId: 'lesson-atmosphere', currentStepIndex: 1, currentStepId: 'deleted-step', status: 'in_progress', xp: 5, attempts: {},
    };
  });
  assert.deepEqual(result, { ok: false, reason: 'inconsistent-learning-state' });
});

test('import rejects review record key/item mismatches and unknown authored ids', () => {
  const mismatched = importResult((state) => {
    state.reviewRecords.atmosphere = { itemId: 'glacier', stage: 1, dueAt: '2026-09-11T00:00:00.000Z', mistakes: 0 };
  });
  assert.deepEqual(mismatched, { ok: false, reason: 'inconsistent-learning-state' });

  const unknownMission = importResult((state) => { state.completedMissionIds = ['not-a-mission']; });
  assert.deepEqual(unknownMission, { ok: false, reason: 'inconsistent-learning-state' });

  const unknownChallenge = importResult((state) => { state.completedChallengeIds = ['not-a-challenge']; });
  assert.deepEqual(unknownChallenge, { ok: false, reason: 'inconsistent-learning-state' });

  const unknownConcept = importResult((state) => { state.connectedConceptIds = ['not-a-concept']; });
  assert.deepEqual(unknownConcept, { ok: false, reason: 'inconsistent-learning-state' });
});
