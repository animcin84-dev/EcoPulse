import test from 'node:test';
import assert from 'node:assert/strict';

import { worldChallenges, worldChallengesBySlug } from '../src/content/world-challenges.ts';
import { lessonSequence } from '../src/content/index.ts';
import { completeWorldChallengeInGuestState, createEmptyGuestState } from '../src/domain/learning/guest-state.ts';

const expectedSlugs = ['weather-detective', 'coastal-city', 'dry-season', 'living-network'];

test('MVP exposes four authored bilingual World Challenges', () => {
  assert.deepEqual(worldChallenges.map((challenge) => challenge.slug), expectedSlugs);
  assert.deepEqual(Object.keys(worldChallengesBySlug), expectedSlugs);

  for (const challenge of worldChallenges) {
    assert.ok(challenge.title.en.trim());
    assert.ok(challenge.title.kk.trim());
    assert.ok(challenge.intro.en.trim());
    assert.ok(challenge.intro.kk.trim());
    assert.equal(challenge.xp, 50);
    assert.ok(challenge.questions.length >= 2);
  }
});

test('every World Challenge question has bilingual options and a valid best answer', () => {
  for (const challenge of worldChallenges) {
    for (const question of challenge.questions) {
      const ids = question.options.map((option) => option.id);
      assert.equal(new Set(ids).size, ids.length, `${challenge.slug}/${question.id}: duplicate option ids`);
      assert.ok(ids.includes(question.bestOptionId), `${challenge.slug}/${question.id}: missing best answer`);
      assert.ok(question.prompt.en.trim() && question.prompt.kk.trim());
      assert.ok(question.explanation.en.trim() && question.explanation.kk.trim());
      for (const option of question.options) assert.ok(option.label.en.trim() && option.label.kk.trim());
    }
  }
});

test('World Challenge completion awards +50 XP exactly once', () => {
  let state = createEmptyGuestState();
  for (const lesson of lessonSequence.filter((candidate) => candidate.world === 'earth-atmosphere')) {
    const finalIndex = lesson.steps.length - 1;
    state.lessonProgress[lesson.slug] = {
      lessonId: lesson.id,
      currentStepIndex: finalIndex,
      currentStepId: lesson.steps[finalIndex]!.id,
      status: 'completed',
      xp: 0,
      attempts: {},
    };
  }
  state = completeWorldChallengeInGuestState(state, 'weather-detective');
  assert.equal(state.xp, 50);
  assert.deepEqual(state.completedChallengeIds, ['weather-detective']);

  state = completeWorldChallengeInGuestState(state, 'weather-detective');
  assert.equal(state.xp, 50);
  assert.deepEqual(state.completedChallengeIds, ['weather-detective']);
});
