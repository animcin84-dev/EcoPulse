import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLesson } from '../src/domain/content/validate.ts';
import type { Lesson } from '../src/domain/content/types.ts';

const validLesson: Lesson = {
  id: 'lesson-atmosphere',
  slug: 'atmosphere',
  version: '1.0.0',
  world: 'earth-atmosphere',
  title: { en: 'The Air Around Us', kk: 'Бізді қоршаған ауа' },
  estimatedMinutes: 7,
  targetWords: ['atmosphere'],
  sourceIds: ['nasa-atmosphere'],
  steps: [
    {
      id: 'discover-atmosphere',
      type: 'discover',
      title: { en: 'Atmosphere', kk: 'Атмосфера' },
      body: { en: 'The layer of gases surrounding Earth.', kk: 'Жерді қоршап тұрған газдар қабаты.' },
    },
    {
      id: 'connect-weather',
      type: 'connection',
      title: { en: 'A connection', kk: 'Байланыс' },
      relations: [
        {
          from: 'atmosphere',
          to: 'weather',
          type: 'related_to',
          label: { en: 'weather happens in', kk: 'ауа райы осы қабатта болады' },
        },
      ],
    },
  ],
};

test('valid bilingual lesson passes validation', () => {
  assert.deepEqual(validateLesson(validLesson), []);
});

test('reports missing ids and missing Kazakh translations', () => {
  const broken = structuredClone(validLesson);
  broken.id = '';
  broken.title.kk = '';
  broken.steps[0]!.id = '';
  broken.steps[0]!.body!.kk = '';

  const errors = validateLesson(broken);
  assert.ok(errors.includes('lesson.id is required'));
  assert.ok(errors.includes('lesson.title.kk is required'));
  assert.ok(errors.includes('lesson.steps[0].id is required'));
  assert.ok(errors.includes('lesson.steps[0].body.kk is required'));
});

test('reports unsupported relation types', () => {
  const broken = structuredClone(validLesson) as Lesson;
  const relation = broken.steps[1]!.relations![0]!;
  relation.type = 'definitely_causes' as never;

  const errors = validateLesson(broken);
  assert.ok(errors.includes('lesson.steps[1].relations[0].type is invalid'));
});

test('reports invalid answer references and duplicate option ids', () => {
  const broken: Lesson = {
    ...structuredClone(validLesson),
    steps: [
      {
        id: 'choice-broken',
        type: 'choice',
        title: { en: 'Question', kk: 'Сұрақ' },
        prompt: { en: 'Pick one', kk: 'Біреуін таңда' },
        options: [
          { id: 'same', label: { en: 'One', kk: 'Бір' } },
          { id: 'same', label: { en: 'Two', kk: 'Екі' } },
        ],
        correctOptionId: 'missing',
        explanation: { en: 'Explanation', kk: 'Түсіндірме' },
        xp: 5,
      },
      {
        id: 'think-broken',
        type: 'think',
        title: { en: 'Think', kk: 'Ойлан' },
        prompt: { en: 'Pick one', kk: 'Біреуін таңда' },
        options: [{ id: 'available', label: { en: 'One', kk: 'Бір' } }],
        bestOptionId: 'missing',
        explanation: { en: 'Explanation', kk: 'Түсіндірме' },
        xp: 15,
      },
    ],
  };

  const errors = validateLesson(broken);
  assert.ok(errors.includes('lesson.steps[0].options ids must be unique'));
  assert.ok(errors.includes('lesson.steps[0].correctOptionId must reference an option'));
  assert.ok(errors.includes('lesson.steps[1].bestOptionId must reference an option'));
});

test('reports duplicate step ids, invalid xp and empty connections', () => {
  const broken: Lesson = {
    ...structuredClone(validLesson),
    targetWords: ['atmosphere', 'atmosphere'],
    steps: [
      {
        id: 'duplicate',
        type: 'choice',
        title: { en: 'Question', kk: 'Сұрақ' },
        prompt: { en: 'Pick one', kk: 'Біреуін таңда' },
        options: [{ id: 'one', label: { en: 'One', kk: 'Бір' } }],
        correctOptionId: 'one',
        explanation: { en: 'Explanation', kk: 'Түсіндірме' },
        xp: -1,
      },
      {
        id: 'duplicate',
        type: 'connection',
        title: { en: 'Connect', kk: 'Байланыстыр' },
        relations: [],
      },
    ],
  };

  const errors = validateLesson(broken);
  assert.ok(errors.includes('lesson.targetWords must be unique'));
  assert.ok(errors.includes('lesson.steps ids must be unique'));
  assert.ok(errors.includes('lesson.steps[0].xp must be 0 or greater'));
  assert.ok(errors.includes('lesson.steps[1].relations must not be empty'));
});
