import test from 'node:test';
import assert from 'node:assert/strict';

import { calculatePulseLevel, summarizeLearningProfile } from '../src/domain/learning/profile.ts';


test('Pulse Level depends only on cumulative XP', () => {
  assert.equal(calculatePulseLevel(0), 1);
  assert.equal(calculatePulseLevel(249), 1);
  assert.equal(calculatePulseLevel(250), 2);
  assert.equal(calculatePulseLevel(1250), 6);
});

test('learning summary keeps XP and mastery counts separate', () => {
  const summary = summarizeLearningProfile({
    xp: 800,
    masteryStates: {
      atmosphere: 'MASTERED',
      glacier: 'STRONG',
      drought: 'LEARNING',
      habitat: 'SEEN',
      ocean: 'NEW',
    },
    connectedConceptIds: ['atmosphere', 'weather', 'climate', 'glacier'],
    completedScenarioIds: ['think-1', 'think-2'],
    completedMissionIds: ['sky-check'],
  });

  assert.equal(summary.pulseLevel, 4);
  assert.equal(summary.xp, 800);
  assert.equal(summary.masteredWords, 1);
  assert.equal(summary.strongWords, 1);
  assert.equal(summary.learningWords, 1);
  assert.equal(summary.connectedConcepts, 4);
  assert.equal(summary.completedScenarios, 2);
  assert.equal(summary.completedMissions, 1);
});
