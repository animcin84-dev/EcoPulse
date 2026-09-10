import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { worldChallenges } from '../src/content/world-challenges.ts';
import { worldPresentation } from '../src/content/lesson-presentation.ts';
import { createLessonProgress, completeLesson } from '../src/domain/learning/progress.ts';
import { resolveWorldDetail, resolveWorldNextAction } from '../src/domain/learning/world-detail.ts';

const worldIds = ['earth-atmosphere', 'ice-water', 'extremes', 'life'] as const;

test('every curriculum world resolves complete bilingual world detail', () => {
  for (const worldId of worldIds) {
    const detail = resolveWorldDetail(worldId);
    assert.ok(detail, `${worldId}: expected world detail`);
    assert.equal(detail.id, worldId);
    assert.equal(detail.presentation, worldPresentation[worldId]);
    assert.ok(detail.presentation.headline.en.trim());
    assert.ok(detail.presentation.headline.kk.trim());
    assert.ok(detail.presentation.description.en.trim());
    assert.ok(detail.presentation.description.kk.trim());
    assert.ok(detail.lessons.length > 0);
    assert.ok(detail.totalMinutes > 0);
    assert.ok(detail.targetWords.length > 0);
    assert.equal(new Set(detail.targetWords).size, detail.targetWords.length);
  }
});

test('world detail contains only lessons and checkpoint authored for that world', () => {
  for (const worldId of worldIds) {
    const detail = resolveWorldDetail(worldId)!;
    assert.ok(detail.lessons.every((lesson) => lesson.world === worldId));
    assert.equal(detail.challenge.world, worldId);
    assert.equal(detail.challenge, worldChallenges.find((challenge) => challenge.world === worldId));
  }
});

test('world relation preview is authored from connection steps and contains valid endpoints', () => {
  for (const worldId of worldIds) {
    const detail = resolveWorldDetail(worldId)!;
    assert.ok(detail.relations.length > 0, `${worldId}: expected at least one connection`);
    for (const relation of detail.relations) {
      assert.ok(relation.from.trim());
      assert.ok(relation.to.trim());
      assert.notEqual(relation.from, relation.to);
    }
    const signatures = detail.relations.map((relation) => `${relation.from}:${relation.type}:${relation.to}`);
    assert.equal(new Set(signatures).size, signatures.length, `${worldId}: duplicate relation preview`);
  }
});

test('unknown world resolves to null', () => {
  assert.equal(resolveWorldDetail('not-a-world'), null);
});

test('world next action points to the first incomplete lesson', () => {
  const detail = resolveWorldDetail('earth-atmosphere')!;
  const progress = {
    [detail.lessons[0]!.slug]: completeLesson(createLessonProgress(detail.lessons[0]!.id)),
  };

  assert.deepEqual(resolveWorldNextAction('earth-atmosphere', progress, []), {
    type: 'lesson',
    slug: detail.lessons[1]!.slug,
  });
});

test('world next action becomes checkpoint after all world lessons are complete', () => {
  const detail = resolveWorldDetail('ice-water')!;
  const progress = Object.fromEntries(
    detail.lessons.map((lesson) => [lesson.slug, completeLesson(createLessonProgress(lesson.id))]),
  );

  assert.deepEqual(resolveWorldNextAction('ice-water', progress, []), {
    type: 'challenge',
    slug: detail.challenge.slug,
  });
});

test('world next action becomes complete after lessons and checkpoint are complete', () => {
  const detail = resolveWorldDetail('life')!;
  const progress = Object.fromEntries(
    detail.lessons.map((lesson) => [lesson.slug, completeLesson(createLessonProgress(lesson.id))]),
  );

  assert.deepEqual(resolveWorldNextAction('life', progress, [detail.challenge.slug]), { type: 'complete' });
});
