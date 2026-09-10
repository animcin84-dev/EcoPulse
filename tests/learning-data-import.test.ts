import test from 'node:test';
import assert from 'node:assert/strict';

import { createEmptyGuestState, GUEST_STATE_VERSION } from '../src/domain/learning/guest-state.ts';
import { evidenceForLegacyMasteryState } from '../src/domain/learning/mastery.ts';
import { createReviewRecord } from '../src/domain/learning/review.ts';
import {
  createLearningDataExport,
  parseLearningDataImport,
  summarizeLearningDataImport,
} from '../src/domain/learning/data-controls.ts';

test('a native EcoPulse export round-trips through strict local import validation', () => {
  const state = createEmptyGuestState();
  state.xp = 180;
  state.completedMissionIds = ['sky-check'];
  state.masteryEvidence = { atmosphere: evidenceForLegacyMasteryState('MASTERED') };
  state.masteryStates = { atmosphere: 'MASTERED' };
  state.reviewRecords = { atmosphere: { ...createReviewRecord('atmosphere', new Date('2026-09-10T08:30:00+05:00')), stage: 4 } };
  state.lessonProgress = {
    atmosphere: { lessonId: 'lesson-atmosphere', currentStepIndex: 6, currentStepId: 'result-first-pulse', status: 'completed', xp: 40, attempts: {} },
  };
  const payload = createLearningDataExport(state, new Date('2026-09-10T08:30:00+05:00'));

  const result = parseLearningDataImport(JSON.stringify(payload));
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.state.xp, 180);
  assert.deepEqual(result.state.completedMissionIds, ['sky-check']);
  assert.equal(result.exportedAt, payload.exportedAt);

  const summary = summarizeLearningDataImport(result.state);
  assert.deepEqual(summary, { xp: 180, completedLessons: 1, masteredWords: 1, completedMissions: 1, completedChallenges: 0 });
});

test('import rejects malformed JSON and non-EcoPulse payloads without a fallback state', () => {
  assert.deepEqual(parseLearningDataImport('{broken'), { ok: false, reason: 'invalid-json' });
  assert.deepEqual(parseLearningDataImport(JSON.stringify({ product: 'Other', exportVersion: 1, exportedAt: new Date().toISOString(), learningState: createEmptyGuestState() })), { ok: false, reason: 'wrong-product' });
});

test('import rejects unsupported export versions and invalid timestamps', () => {
  const base = createLearningDataExport(createEmptyGuestState(), new Date('2026-09-10T08:30:00+05:00'));
  assert.deepEqual(parseLearningDataImport(JSON.stringify({ ...base, exportVersion: 2 })), { ok: false, reason: 'unsupported-export-version' });
  assert.deepEqual(parseLearningDataImport(JSON.stringify({ ...base, exportedAt: 'not-a-date' })), { ok: false, reason: 'invalid-export-date' });
});

test('import rejects damaged or future-schema learning state instead of silently resetting it', () => {
  const base = createLearningDataExport(createEmptyGuestState(), new Date('2026-09-10T08:30:00+05:00'));
  assert.deepEqual(parseLearningDataImport(JSON.stringify({ ...base, learningState: { ...base.learningState, xp: -1 } })), { ok: false, reason: 'invalid-learning-state' });
  assert.deepEqual(parseLearningDataImport(JSON.stringify({ ...base, learningState: { ...base.learningState, schemaVersion: GUEST_STATE_VERSION + 1 } })), { ok: false, reason: 'invalid-learning-state' });
});
