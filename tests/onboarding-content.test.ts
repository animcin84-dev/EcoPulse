import test from 'node:test';
import assert from 'node:assert/strict';

import { onboardingInterestIds } from '../src/domain/learning/onboarding.ts';
import { onboardingContent } from '../src/content/onboarding.ts';

function assertBilingual(value: { en: string; kk: string }) {
  assert.ok(value.en.trim().length > 0);
  assert.ok(value.kk.trim().length > 0);
}

test('onboarding level choices and core screen copy are bilingual', () => {
  assert.equal(onboardingContent.levelOptions.length, 4);
  for (const option of onboardingContent.levelOptions) {
    assertBilingual(option.title);
    assertBilingual(option.detail);
  }

  assertBilingual(onboardingContent.copy.levelEyebrow);
  assertBilingual(onboardingContent.copy.levelTitle);
  assertBilingual(onboardingContent.copy.interestsTitle);
  assertBilingual(onboardingContent.copy.resultLede);
});

test('onboarding interests cover every approved interest in both languages', () => {
  assert.deepEqual(Object.keys(onboardingContent.interestLabels).sort(), [...onboardingInterestIds].sort());
  for (const id of onboardingInterestIds) assertBilingual(onboardingContent.interestLabels[id]);
});

test('diagnostic questions are bilingual while testing authored English options', () => {
  assert.equal(onboardingContent.diagnostic.length, 3);
  for (const question of onboardingContent.diagnostic) {
    assertBilingual(question.prompt);
    assert.ok(question.options.length >= 2);
    assert.ok(question.correct >= 0 && question.correct < question.options.length);
    for (const option of question.options) {
      assert.equal(option.en, option.kk);
      assert.ok(option.en.trim().length > 0);
    }
  }
});
