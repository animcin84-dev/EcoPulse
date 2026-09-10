import test from 'node:test';
import assert from 'node:assert/strict';

import { glaciersLesson, habitatsLesson, weatherClimateLesson } from '../src/content/index.ts';
import type { Lesson } from '../src/domain/content/types.ts';
import { isAcceptedFillBlankAnswer, isMatchingAnswerCorrect, normalizeTypedAnswer } from '../src/domain/learning/exercise-evaluation.ts';
import { validateLesson } from '../src/domain/content/validate.ts';

test('typed answer normalization is case-insensitive and collapses surrounding/internal whitespace', () => {
  assert.equal(normalizeTypedAnswer('  Sea   Level  '), 'sea level');
  assert.ok(isAcceptedFillBlankAnswer('  MELT ', ['melt']));
  assert.equal(isAcceptedFillBlankAnswer('freeze', ['melt']), false);
});

test('matching evaluation requires every authored left concept to map to its correct right pair', () => {
  const pairIds = ['habitat', 'species', 'ecosystem'];
  assert.ok(isMatchingAnswerCorrect(pairIds, { habitat: 'habitat', species: 'species', ecosystem: 'ecosystem' }));
  assert.equal(isMatchingAnswerCorrect(pairIds, { habitat: 'ecosystem', species: 'species', ecosystem: 'habitat' }), false);
  assert.equal(isMatchingAnswerCorrect(pairIds, { habitat: 'habitat' }), false);
});

test('MVP lessons include the three richer exercise types in pedagogically relevant worlds', () => {
  assert.ok(weatherClimateLesson.steps.some((step) => step.type === 'fact_myth'));
  assert.ok(glaciersLesson.steps.some((step) => step.type === 'fill_blank'));
  assert.ok(habitatsLesson.steps.some((step) => step.type === 'matching'));
});

test('lesson validator rejects malformed fill blank and matching exercises', () => {
  const lesson = structuredClone(weatherClimateLesson) as Lesson;
  lesson.steps.splice(1, 0,
    {
      id: 'bad-fill',
      type: 'fill_blank',
      title: { en: 'Fill', kk: 'Толтыр' },
      prompt: { en: 'Ice can ____.', kk: 'Мұз ____ алады.' },
      acceptedAnswers: [' ', 'melt', 'MELT'],
      explanation: { en: 'Melt.', kk: 'Еру.' },
      xp: 5,
    },
    {
      id: 'bad-match',
      type: 'matching',
      title: { en: 'Match', kk: 'Сәйкестендір' },
      prompt: { en: 'Match.', kk: 'Сәйкестендір.' },
      pairs: [
        { id: 'same', left: { en: 'A', kk: 'A' }, right: { en: 'B', kk: 'B' } },
        { id: 'same', left: { en: 'C', kk: 'C' }, right: { en: 'D', kk: 'D' } },
      ],
      explanation: { en: 'Explanation.', kk: 'Түсіндіру.' },
      xp: 5,
    },
  );

  const errors = validateLesson(lesson);
  assert.ok(errors.some((error) => error.includes('acceptedAnswers must not contain blank answers')));
  assert.ok(errors.some((error) => error.includes('acceptedAnswers must be unique after normalization')));
  assert.ok(errors.some((error) => error.includes('pairs ids must be unique')));
});


test('lesson validator requires bilingual fact-or-myth statements', () => {
  const lesson = structuredClone(weatherClimateLesson) as Lesson;
  const factMyth = lesson.steps.find((step) => step.type === 'fact_myth');
  assert.ok(factMyth && factMyth.type === 'fact_myth');
  factMyth.statement.kk = ' ';
  const errors = validateLesson(lesson);
  assert.ok(errors.some((error) => error.includes('.statement.kk is required')));
});
