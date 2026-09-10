import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonSequence } from '../src/content/index.ts';

function words(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test('every MVP lesson includes one adaptive micro-reading before Think', () => {
  for (const lesson of lessonSequence) {
    const readings = lesson.steps.filter((step) => step.type === 'reading');
    assert.equal(readings.length, 1, lesson.slug);
    const readingIndex = lesson.steps.findIndex((step) => step.type === 'reading');
    const thinkIndex = lesson.steps.findIndex((step) => step.type === 'think');
    assert.ok(readingIndex >= 0 && thinkIndex >= 0 && readingIndex < thinkIndex, lesson.slug);
  }
});

test('reading passages scale English complexity without changing the comprehension truth', () => {
  for (const lesson of lessonSequence) {
    const reading = lesson.steps.find((step) => step.type === 'reading');
    assert.ok(reading && reading.type === 'reading', lesson.slug);
    assert.ok(words(reading.passages.A2) >= 25 && words(reading.passages.A2) <= 60, `${lesson.slug} A2`);
    assert.ok(words(reading.passages.B1) >= 40 && words(reading.passages.B1) <= 95, `${lesson.slug} B1`);
    assert.ok(words(reading.passages.B2) >= 55 && words(reading.passages.B2) <= 125, `${lesson.slug} B2`);
    assert.ok(words(reading.passages.A2) <= words(reading.passages.B1), lesson.slug);
    assert.ok(words(reading.passages.B1) <= words(reading.passages.B2), lesson.slug);
    assert.ok(reading.question.trim().length > 0, lesson.slug);
    assert.ok(reading.answers.length >= 2, lesson.slug);
    assert.ok(reading.answers.some((answer) => answer.id === reading.correctAnswerId), lesson.slug);
    assert.ok(reading.explanation.en.trim() && reading.explanation.kk.trim(), lesson.slug);
    assert.ok(reading.masterySignals?.every((signal) => signal.signal === 'context'), lesson.slug);
  }
});

test('each reading keeps at least one lesson target word visible in every level passage', () => {
  for (const lesson of lessonSequence) {
    const reading = lesson.steps.find((step) => step.type === 'reading');
    assert.ok(reading && reading.type === 'reading', lesson.slug);
    for (const level of ['A2', 'B1', 'B2'] as const) {
      const passage = reading.passages[level].toLocaleLowerCase('en');
      assert.ok(lesson.targetWords.some((word) => passage.includes(word.toLocaleLowerCase('en'))), `${lesson.slug} ${level}`);
    }
  }
});

import { validateLesson } from '../src/domain/content/validate.ts';

test('lesson validation rejects malformed adaptive reading content', () => {
  const broken = {
    id: 'broken-reading',
    slug: 'broken-reading',
    version: '1.0.0',
    world: 'earth-atmosphere',
    title: { en: 'Broken', kk: 'Қате' },
    estimatedMinutes: 5,
    targetWords: ['atmosphere'],
    sourceIds: ['nasa-atmosphere'],
    steps: [{
      id: 'reading-broken',
      type: 'reading',
      title: { en: 'Read', kk: 'Оқы' },
      passages: { A2: '', B1: '', B2: '' },
      question: '',
      answers: [{ id: 'same', text: '' }, { id: 'same', text: 'Other' }],
      correctAnswerId: 'missing',
      explanation: { en: 'Explanation', kk: 'Түсіндірме' },
      masterySignals: [{ word: 'atmosphere', signal: 'context' }],
      xp: 10,
    }],
  } as never;

  const issues = validateLesson(broken);
  for (const expected of [
    'lesson.steps[0].passages.A2 is required',
    'lesson.steps[0].passages.B1 is required',
    'lesson.steps[0].passages.B2 is required',
    'lesson.steps[0].question is required',
    'lesson.steps[0].answers ids must be unique',
    'lesson.steps[0].answers[0].text is required',
    'lesson.steps[0].correctAnswerId must reference an answer',
  ]) assert.ok(issues.includes(expected), expected);
});
