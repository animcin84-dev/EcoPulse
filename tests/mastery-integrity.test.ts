import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyMasterySignal,
  computeMasteryState,
  createMasteryEvidence,
  type MasteryEvidence,
} from '../src/domain/learning/mastery.ts';
import {
  createEmptyGuestState,
  GUEST_STATE_VERSION,
  parseGuestState,
  serializeGuestState,
} from '../src/domain/learning/guest-state.ts';

test('repeated recognition cannot produce STRONG or MASTERED', () => {
  let evidence = createMasteryEvidence();
  evidence = applyMasterySignal(evidence, 'exposure');
  evidence = applyMasterySignal(evidence, 'recognition');
  evidence = applyMasterySignal(evidence, 'recognition');
  evidence = applyMasterySignal(evidence, 'recognition');

  assert.equal(evidence.recognition, true);
  assert.equal(evidence.recall, false);
  assert.equal(evidence.context, false);
  assert.equal(computeMasteryState(evidence), 'LEARNING');
});

test('distinct recognition recall and context evidence is required for STRONG', () => {
  let evidence = createMasteryEvidence();
  for (const signal of ['exposure', 'recognition', 'recall', 'context'] as const) {
    evidence = applyMasterySignal(evidence, signal);
  }
  assert.equal(computeMasteryState(evidence), 'STRONG');
});

test('MASTERED requires a later delayed-review signal on top of strong evidence', () => {
  let evidence = createMasteryEvidence();
  for (const signal of ['exposure', 'recognition', 'recall', 'context', 'delayedReview'] as const) {
    evidence = applyMasterySignal(evidence, signal);
  }
  assert.equal(computeMasteryState(evidence), 'MASTERED');
});

test('v4 snapshots migrate mastery states into v5 evidence without losing visible mastery', () => {
  const legacy = createEmptyGuestState() as unknown as Record<string, unknown>;
  legacy.schemaVersion = 4;
  legacy.masteryStates = {
    atmosphere: 'LEARNING',
    glacier: 'STRONG',
    habitat: 'MASTERED',
  };
  delete legacy.masteryEvidence;

  const migrated = parseGuestState(JSON.stringify(legacy));
  assert.equal(migrated.schemaVersion, GUEST_STATE_VERSION);
  assert.equal(computeMasteryState(migrated.masteryEvidence.atmosphere as MasteryEvidence), 'LEARNING');
  assert.equal(computeMasteryState(migrated.masteryEvidence.glacier as MasteryEvidence), 'STRONG');
  assert.equal(computeMasteryState(migrated.masteryEvidence.habitat as MasteryEvidence), 'MASTERED');
});

test('v5 mastery evidence round-trips independently from XP', () => {
  const state = createEmptyGuestState();
  state.xp = 900;
  state.masteryEvidence.glacier = applyMasterySignal(
    applyMasterySignal(createMasteryEvidence(), 'exposure'),
    'recall',
  );
  state.masteryStates.glacier = computeMasteryState(state.masteryEvidence.glacier);

  const restored = parseGuestState(serializeGuestState(state));
  assert.equal(restored.xp, 900);
  assert.deepEqual(restored.masteryEvidence.glacier, state.masteryEvidence.glacier);
  assert.equal(restored.masteryStates.glacier, 'LEARNING');
});

import { atmosphereLesson } from '../src/content/lessons/atmosphere.ts';
import { glaciersLesson } from '../src/content/lessons/glaciers.ts';
import { validateLesson } from '../src/domain/content/validate.ts';
import { finalizeLessonInGuestState } from '../src/domain/learning/guest-state.ts';

test('authored vocabulary exercises declare mastery signals for the word they actually test', () => {
  const atmosphereChoice = atmosphereLesson.steps.find((step) => step.id === 'meaning-atmosphere');
  const glacierChoice = glaciersLesson.steps.find((step) => step.id === 'meaning-glacier');
  const meltContext = glaciersLesson.steps.find((step) => step.id === 'fill-melt-context');

  assert.deepEqual(atmosphereChoice && 'masterySignals' in atmosphereChoice ? atmosphereChoice.masterySignals : undefined, [
    { word: 'atmosphere', signal: 'recognition' },
  ]);
  assert.deepEqual(glacierChoice && 'masterySignals' in glacierChoice ? glacierChoice.masterySignals : undefined, [
    { word: 'glacier', signal: 'recognition' },
  ]);
  assert.deepEqual(meltContext && 'masterySignals' in meltContext ? meltContext.masterySignals : undefined, [
    { word: 'melt', signal: 'context' },
  ]);
});

test('lesson validation rejects mastery signals for words outside the lesson target vocabulary', () => {
  const invalid = structuredClone(atmosphereLesson);
  const choice = invalid.steps.find((step) => step.type === 'choice');
  assert.ok(choice && choice.type === 'choice');
  choice.masterySignals = [{ word: 'glacier', signal: 'recognition' }];

  const issues = validateLesson(invalid);
  assert.ok(issues.some((issue) => issue.includes('mastery signal word')));
});

test('lesson finalization records only successful authored evidence and never invents recall', () => {
  const state = createEmptyGuestState();
  state.lessonProgress[atmosphereLesson.slug] = {
    lessonId: atmosphereLesson.id,
    currentStepIndex: atmosphereLesson.steps.length - 1,
    status: 'completed',
    xp: 5,
    attempts: {
      'meaning-atmosphere': { count: 1, correct: true, xpAwarded: true },
    },
  };

  const finalized = finalizeLessonInGuestState(state, atmosphereLesson, new Date('2026-09-09T00:00:00.000Z'));
  const evidence = finalized.masteryEvidence.atmosphere;
  assert.equal(evidence.exposures >= 1, true);
  assert.equal(evidence.recognition, true);
  assert.equal(evidence.recall, false);
  assert.equal(evidence.context, false);
  assert.equal(finalized.masteryStates.atmosphere, 'LEARNING');
});

test('incorrect lesson answers do not create positive mastery evidence', () => {
  const state = createEmptyGuestState();
  state.lessonProgress[atmosphereLesson.slug] = {
    lessonId: atmosphereLesson.id,
    currentStepIndex: atmosphereLesson.steps.length - 1,
    status: 'completed',
    xp: 0,
    attempts: {
      'meaning-atmosphere': { count: 2, correct: false, xpAwarded: false },
    },
  };

  const finalized = finalizeLessonInGuestState(state, atmosphereLesson, new Date('2026-09-09T00:00:00.000Z'));
  assert.equal(finalized.masteryEvidence.atmosphere.recognition, false);
  assert.equal(finalized.masteryStates.atmosphere, 'SEEN');
});

import {
  applyReviewEvidence,
  reviewModeForStage,
  reviewSignalForStage,
} from '../src/domain/learning/review-mastery.ts';
import { reviewItems } from '../src/content/review-items.ts';

test('review stages deliberately rotate recall context recognition and delayed recall', () => {
  assert.equal(reviewModeForStage(0), 'recall');
  assert.equal(reviewModeForStage(1), 'context');
  assert.equal(reviewModeForStage(2), 'recognition');
  assert.equal(reviewModeForStage(3), 'delayed_recall');
  assert.equal(reviewModeForStage(4), 'context');
  assert.equal(reviewModeForStage(5), 'recall');
  assert.equal(reviewModeForStage(6), 'recognition');
  assert.equal(reviewModeForStage(7), 'delayed_recall');
  assert.equal(reviewModeForStage(8), 'context');

  assert.equal(reviewSignalForStage(0), 'recall');
  assert.equal(reviewSignalForStage(1), 'context');
  assert.equal(reviewSignalForStage(2), 'recognition');
  assert.equal(reviewSignalForStage(3), 'delayedReview');
  assert.equal(reviewSignalForStage(4), 'delayedReview');
  assert.equal(reviewSignalForStage(9), 'delayedReview');
});

test('staged review builds distinct evidence and delayed review is the only mastery gate', () => {
  let evidence = applyMasterySignal(createMasteryEvidence(), 'exposure');
  evidence = applyReviewEvidence(evidence, 0, true);
  assert.equal(evidence.recall, true);
  assert.equal(computeMasteryState(evidence), 'LEARNING');

  evidence = applyReviewEvidence(evidence, 1, true);
  assert.equal(evidence.context, true);
  assert.equal(computeMasteryState(evidence), 'LEARNING');

  evidence = applyReviewEvidence(evidence, 2, true);
  assert.equal(evidence.recognition, true);
  assert.equal(computeMasteryState(evidence), 'STRONG');

  evidence = applyReviewEvidence(evidence, 3, true);
  assert.equal(evidence.delayedReview, true);
  assert.equal(computeMasteryState(evidence), 'MASTERED');
});

test('an incorrect delayed review removes mastery gate without erasing prior learning evidence', () => {
  let evidence = createMasteryEvidence();
  for (const signal of ['exposure', 'recall', 'context', 'recognition', 'delayedReview'] as const) {
    evidence = applyMasterySignal(evidence, signal);
  }
  const afterMistake = applyReviewEvidence(evidence, 3, false);
  assert.equal(afterMistake.delayedReview, false);
  assert.equal(afterMistake.exposures > 0, true);
  assert.notEqual(computeMasteryState(afterMistake), 'MASTERED');
  assert.notEqual(computeMasteryState(afterMistake), 'NEW');
});

test('every review item has bilingual contextual recall content with its English word accepted', () => {
  for (const item of reviewItems) {
    assert.ok(item.context.prompt.en.includes('____'), `${item.id} needs an English context blank`);
    assert.ok(item.context.prompt.kk.includes('____'), `${item.id} needs a Kazakh context blank`);
    assert.ok(item.context.acceptedAnswers.some((answer) => answer.toLocaleLowerCase('en') === item.word.toLocaleLowerCase('en')));
  }
});

import { evaluateReviewAnswer } from '../src/domain/learning/review-mastery.ts';

test('review answer evaluation normalizes typed recall/context but keeps recognition ids exact', () => {
  assert.equal(evaluateReviewAnswer('recall', '  Glacier ', { word: 'GLACIER', correctOptionId: 'correct', contextAcceptedAnswers: ['GLACIER'] }), true);
  assert.equal(evaluateReviewAnswer('recall', 'glacier.', { word: 'GLACIER', correctOptionId: 'correct', contextAcceptedAnswers: ['GLACIER'] }), true);
  assert.equal(evaluateReviewAnswer('context', 'sea   level', { word: 'SEA LEVEL', correctOptionId: 'correct', contextAcceptedAnswers: ['SEA LEVEL'] }), true);
  assert.equal(evaluateReviewAnswer('context', 'sea-level!', { word: 'SEA LEVEL', correctOptionId: 'correct', contextAcceptedAnswers: ['SEA LEVEL'] }), true);
  assert.equal(evaluateReviewAnswer('context', 'sea_level', { word: 'SEA LEVEL', correctOptionId: 'correct', contextAcceptedAnswers: ['SEA LEVEL'] }), true);
  assert.equal(evaluateReviewAnswer('recognition', 'correct', { word: 'GLACIER', correctOptionId: 'correct', contextAcceptedAnswers: ['GLACIER'] }), true);
  assert.equal(evaluateReviewAnswer('recognition', 'glacier', { word: 'GLACIER', correctOptionId: 'correct', contextAcceptedAnswers: ['GLACIER'] }), false);
});

test('review normalization never turns spelling mistakes into correct answers', () => {
  const item = { word: 'GLACIER', correctOptionId: 'correct', contextAcceptedAnswers: ['GLACIER'] };
  assert.equal(evaluateReviewAnswer('recall', 'glaciar', item), false);
  assert.equal(evaluateReviewAnswer('recall', 'glacie', item), false);
  assert.equal(evaluateReviewAnswer('recall', 'g l a c i e r', item), false);
});

import { mergeProgressSnapshots } from '../src/domain/learning/progress-sync.ts';

test('account merge reconstructs missing evidence so mastery label and evidence cannot diverge', () => {
  const local = createEmptyGuestState();
  local.masteryStates.glacier = 'STRONG';
  delete local.masteryEvidence.glacier;

  const merged = mergeProgressSnapshots(local, createEmptyGuestState());
  assert.ok(merged.masteryEvidence.glacier);
  assert.equal(computeMasteryState(merged.masteryEvidence.glacier), 'STRONG');
  assert.equal(merged.masteryStates.glacier, 'STRONG');
});
