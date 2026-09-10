import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence, lessonsBySlug, missions } from '../src/content/index.ts';
import { validateLesson } from '../src/domain/content/validate.ts';

const expectedSlugs = [
  'atmosphere',
  'weather-climate',
  'glaciers',
  'sea-level',
  'drought',
  'wildfire-extreme-weather',
  'habitats',
  'ocean-change',
];

test('phase 2 curriculum exposes the authored lesson sequence', () => {
  assert.deepEqual(lessonSequence.map((lesson) => lesson.slug), expectedSlugs);
  assert.deepEqual(Object.keys(lessonsBySlug), expectedSlugs);
});

test('every production lesson is bilingual, versioned and valid', () => {
  for (const lesson of lessonSequence) {
    assert.match(lesson.version, /^\d+\.\d+\.\d+$/);
    assert.equal(validateLesson(lesson).length, 0, `${lesson.slug} should validate`);
  }
});

test('weather vs climate explicitly teaches short-term vs long-term distinction', () => {
  const lesson = lessonsBySlug['weather-climate'];
  const combinedEnglish = JSON.stringify(lesson.steps.map((step) => step)).toLowerCase();
  assert.match(combinedEnglish, /short[- ]term|short period/);
  assert.match(combinedEnglish, /long[- ]term|long period/);
});

test('sea-level lesson attributes added ocean water to land-ice melt', () => {
  const lesson = lessonsBySlug['sea-level'];
  const relationSteps = lesson.steps.filter((step) => step.type === 'connection');
  const relations = relationSteps.flatMap((step) => step.relations);

  assert.ok(
    relations.some(
      (relation) =>
        relation.from === 'land-ice-melt' &&
        relation.to === 'sea-level' &&
        relation.type === 'contributes_to',
    ),
  );

  const combinedEnglish = JSON.stringify(lesson.steps).toLowerCase();
  assert.match(combinedEnglish, /land ice/);
});

test('drought-wildfire lesson models increased risk, not deterministic causation', () => {
  const lesson = lessonsBySlug['wildfire-extreme-weather'];
  const relationSteps = lesson.steps.filter((step) => step.type === 'connection');
  const relations = relationSteps.flatMap((step) => step.relations);

  assert.ok(
    relations.some(
      (relation) =>
        relation.from === 'drought' &&
        relation.to === 'wildfire-risk' &&
        relation.type === 'contributes_to',
    ),
  );
  assert.equal(
    relations.some(
      (relation) =>
        relation.from === 'drought' && relation.to === 'wildfire-risk' && relation.type === 'causes',
    ),
    false,
  );
});


test('habitats lesson connects habitat to ecosystem without claiming a simple causal chain', () => {
  const lesson = lessonsBySlug['habitats'];
  const relations = lesson.steps.filter((step) => step.type === 'connection').flatMap((step) => step.relations);
  assert.ok(relations.some((relation) => relation.from === 'habitat' && relation.to === 'ecosystem' && relation.type === 'part_of'));
});

test('ocean-change lesson says seawater becomes more acidic rather than becoming literal acid', () => {
  const lesson = lessonsBySlug['ocean-change'];
  const combinedEnglish = JSON.stringify(lesson.steps).toLowerCase();
  assert.match(combinedEnglish, /more acidic/);
  assert.match(combinedEnglish, /does not mean|not mean/);
  assert.doesNotMatch(combinedEnglish, /ocean becomes acid[.\"]/);
});

test('missions are safe, optional and require neither photo nor location', () => {
  assert.ok(missions.length >= 4);
  for (const mission of missions) {
    assert.equal(mission.optional, true);
    assert.equal(mission.requiresPhoto, false);
    assert.equal(mission.requiresLocation, false);
    assert.ok(mission.title.en.trim());
    assert.ok(mission.title.kk.trim());
  }
});
