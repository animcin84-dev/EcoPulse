import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonSequence } from '../src/content/index.ts';
import { validateLesson } from '../src/domain/content/validate.ts';

function words(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test('every MVP lesson includes one adaptive listening step after Reading and before Think', () => {
  for (const lesson of lessonSequence) {
    const listenings = lesson.steps.filter((step) => step.type === 'listening');
    assert.equal(listenings.length, 1, lesson.slug);
    const readingIndex = lesson.steps.findIndex((step) => step.type === 'reading');
    const listeningIndex = lesson.steps.findIndex((step) => step.type === 'listening');
    const thinkIndex = lesson.steps.findIndex((step) => step.type === 'think');
    assert.ok(readingIndex >= 0 && listeningIndex > readingIndex && thinkIndex > listeningIndex, lesson.slug);
  }
});

test('listening utterances scale delivery complexity without changing the comprehension truth', () => {
  for (const lesson of lessonSequence) {
    const listening = lesson.steps.find((step) => step.type === 'listening') as any;
    assert.ok(listening, lesson.slug);
    assert.equal(listening.type, 'listening', lesson.slug);
    assert.ok(words(listening.utterances.A2) >= 7 && words(listening.utterances.A2) <= 24, `${lesson.slug} A2`);
    assert.ok(words(listening.utterances.B1) >= 12 && words(listening.utterances.B1) <= 36, `${lesson.slug} B1`);
    assert.ok(words(listening.utterances.B2) >= 18 && words(listening.utterances.B2) <= 52, `${lesson.slug} B2`);
    assert.ok(words(listening.utterances.A2) <= words(listening.utterances.B1), lesson.slug);
    assert.ok(words(listening.utterances.B1) <= words(listening.utterances.B2), lesson.slug);
    assert.ok(listening.question.trim().length > 0, lesson.slug);
    assert.ok(listening.answers.length >= 2, lesson.slug);
    assert.ok(listening.answers.some((answer: { id: string }) => answer.id === listening.correctAnswerId), lesson.slug);
    assert.ok(listening.explanation.en.trim() && listening.explanation.kk.trim(), lesson.slug);
    assert.ok(listening.masterySignals?.every((signal: { signal: string }) => signal.signal === 'context'), lesson.slug);
  }
});

test('lesson validation rejects malformed adaptive listening content', () => {
  const broken = {
    id: 'broken-listening',
    slug: 'broken-listening',
    version: '1.0.0',
    world: 'earth-atmosphere',
    title: { en: 'Broken', kk: 'Қате' },
    estimatedMinutes: 5,
    targetWords: ['atmosphere'],
    sourceIds: ['nasa-atmosphere'],
    steps: [{
      id: 'listening-broken',
      type: 'listening',
      title: { en: 'Listen', kk: 'Тыңда' },
      utterances: { A2: '', B1: '', B2: '' },
      question: '',
      answers: [{ id: 'same', text: '' }, { id: 'same', text: 'Other' }],
      correctAnswerId: 'missing',
      audioSrcByLevel: { A2: 'not-a-url' },
      explanation: { en: 'Explanation', kk: 'Түсіндірме' },
      masterySignals: [{ word: 'atmosphere', signal: 'recognition' }],
      xp: 10,
    }],
  } as never;

  const issues = validateLesson(broken);
  for (const expected of [
    'lesson.steps[0].utterances.A2 is required',
    'lesson.steps[0].utterances.B1 is required',
    'lesson.steps[0].utterances.B2 is required',
    'lesson.steps[0].question is required',
    'lesson.steps[0].answers ids must be unique',
    'lesson.steps[0].answers[0].text is required',
    'lesson.steps[0].correctAnswerId must reference an answer',
    'lesson.steps[0].audioSrcByLevel.A2 must be an HTTPS URL',
    'lesson.steps[0].masterySignals must use context evidence',
  ]) assert.ok(issues.includes(expected), `${expected}\n${issues.join('\n')}`);
});
