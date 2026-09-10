import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { resolveAdaptiveSupport } from '../src/domain/learning/adaptive-support.ts';

test('A2 uses guided bilingual scaffolding without adding a harder production gate', () => {
  assert.deepEqual(resolveAdaptiveSupport('A2'), {
    level: 'A2',
    mode: 'guided',
    autoShowKazakhMeaning: true,
    showBilingualChoiceSupport: true,
    showHintBeforeAttempt: true,
    showHintAfterFirstAttempt: true,
    requireThinkReasoning: false,
  });
});

test('B1 remains the standard learning experience', () => {
  assert.deepEqual(resolveAdaptiveSupport('B1'), {
    level: 'B1',
    mode: 'standard',
    autoShowKazakhMeaning: false,
    showBilingualChoiceSupport: false,
    showHintBeforeAttempt: false,
    showHintAfterFirstAttempt: true,
    requireThinkReasoning: false,
  });
});

test('B2 reduces hinting and requires Think reasoning production', () => {
  assert.deepEqual(resolveAdaptiveSupport('B2'), {
    level: 'B2',
    mode: 'impact',
    autoShowKazakhMeaning: false,
    showBilingualChoiceSupport: false,
    showHintBeforeAttempt: false,
    showHintAfterFirstAttempt: false,
    requireThinkReasoning: true,
  });
});

test('missing onboarding level safely defaults to B1 support rather than guessing beginner or advanced', () => {
  assert.equal(resolveAdaptiveSupport(null).level, 'B1');
  assert.equal(resolveAdaptiveSupport(null).mode, 'standard');
});

test('every production Think step has an authored bilingual B2 reasoning extension', () => {
  const thinkSteps = lessonSequence.flatMap((lesson) => lesson.steps.filter((step) => step.type === 'think'));
  assert.equal(thinkSteps.length, lessonSequence.length);
  for (const step of thinkSteps) {
    assert.ok(step.type === 'think');
    assert.ok(step.extensionPrompt?.en.trim(), `${step.id}: English extension prompt required`);
    assert.ok(step.extensionPrompt?.kk.trim(), `${step.id}: Kazakh extension prompt required`);
  }
});

test('B2 reasoning gate requires a short meaningful attempt without grading its opinion', async () => {
  const { isReasoningResponseReady } = await import('../src/domain/learning/adaptive-support.ts');
  assert.equal(isReasoningResponseReady(''), false);
  assert.equal(isReasoningResponseReady('because climate'), false);
  assert.equal(isReasoningResponseReady('Because climate uses long-term evidence.'), true);
});

test('lesson validation rejects an incomplete bilingual B2 extension prompt', async () => {
  const { validateLesson } = await import('../src/domain/content/validate.ts');
  const lesson = structuredClone(lessonSequence[0]!);
  const think = lesson.steps.find((step) => step.type === 'think');
  assert.ok(think?.type === 'think');
  think.extensionPrompt = { en: 'Explain your reasoning.', kk: '' };
  const index = lesson.steps.findIndex((step) => step.id === think.id);
  assert.ok(validateLesson(lesson).includes(`lesson.steps[${index}].extensionPrompt.kk is required`));
});
