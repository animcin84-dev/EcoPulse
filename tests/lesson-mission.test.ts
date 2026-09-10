import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonSequence, missions } from '../src/content/index.ts';
import { resolveLessonMission } from '../src/domain/learning/lesson-mission.ts';

const missionIds = new Set(missions.map((mission) => mission.id));

test('every production lesson resolves to a known optional eco mission', () => {
  for (const lesson of lessonSequence) {
    const mission = resolveLessonMission(lesson.slug);
    assert.ok(mission, lesson.slug);
    assert.ok(missionIds.has(mission.id), `${lesson.slug} -> ${mission.id}`);
    assert.equal(mission.optional, true);
    assert.equal(mission.requiresPhoto, false);
    assert.equal(mission.requiresLocation, false);
  }
});

test('lesson mission mapping is deterministic for the four MVP worlds', () => {
  assert.equal(resolveLessonMission('atmosphere')?.id, 'sky-check');
  assert.equal(resolveLessonMission('weather-climate')?.id, 'sky-check');
  assert.equal(resolveLessonMission('glaciers')?.id, 'water-watch');
  assert.equal(resolveLessonMission('sea-level')?.id, 'water-watch');
  assert.equal(resolveLessonMission('drought')?.id, 'eco-connection');
  assert.equal(resolveLessonMission('wildfire-extreme-weather')?.id, 'eco-connection');
  assert.equal(resolveLessonMission('habitats')?.id, 'habitat-observer');
  assert.equal(resolveLessonMission('ocean-change')?.id, 'habitat-observer');
});

test('unknown lesson slugs do not invent a mission', () => {
  assert.equal(resolveLessonMission('does-not-exist'), null);
});
