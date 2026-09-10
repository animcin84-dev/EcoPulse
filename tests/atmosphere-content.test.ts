import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson } from '../src/domain/content/validate.ts';
import { atmosphereLesson } from '../src/content/lessons/atmosphere.ts';

test('production Atmosphere lesson is valid bilingual versioned content', () => {
  assert.equal(atmosphereLesson.slug, 'atmosphere');
  assert.equal(atmosphereLesson.version, '1.2.0');
  assert.deepEqual(validateLesson(atmosphereLesson), []);
});

test('Atmosphere lesson follows the signature vertical-slice order', () => {
  assert.deepEqual(
    atmosphereLesson.steps.map((step) => step.type),
    ['discover', 'choice', 'connection', 'reading', 'listening', 'think', 'result'],
  );
});

test('meaning question preserves the approved Kazakh correct answer', () => {
  const step = atmosphereLesson.steps[1];
  assert.equal(step?.type, 'choice');
  if (step?.type !== 'choice') return;
  const correct = step.options.find((option) => option.id === step.correctOptionId);
  assert.equal(correct?.label.kk, 'Жерді қоршап тұрған газдар қабаты');
});
