import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { resolveScienceSources, scienceSources, scienceSourcesById } from '../src/content/science-sources.ts';
import { validateLesson } from '../src/domain/content/validate.ts';

test('science source registry has unique ids and official HTTPS links', () => {
  assert.equal(new Set(scienceSources.map((source) => source.id)).size, scienceSources.length);
  for (const source of scienceSources) {
    assert.match(source.url, /^https:\/\//);
    assert.ok(source.institution.trim());
    assert.ok(source.title.trim());
    assert.ok(!Number.isNaN(Date.parse(source.lastChecked)));
  }
});

test('every MVP lesson references at least one existing science source', () => {
  for (const lesson of lessonSequence) {
    assert.ok(lesson.sourceIds.length > 0, `${lesson.slug} needs a source`);
    for (const sourceId of lesson.sourceIds) assert.ok(scienceSourcesById[sourceId], `${lesson.slug}: ${sourceId}`);
  }
});

test('lesson validation rejects duplicate and blank source references', () => {
  const lesson = structuredClone(lessonSequence[0]!);
  lesson.sourceIds = ['', 'nasa-atmosphere', 'nasa-atmosphere'];
  const errors = validateLesson(lesson);
  assert.ok(errors.some((error) => error.includes('sourceIds must be unique')));
  assert.ok(errors.some((error) => error.includes('sourceIds must not contain blank ids')));
});


test('source resolver preserves lesson order and ignores unknown ids', () => {
  const resolved = resolveScienceSources(['nasa-weather-climate', 'missing-source', 'nasa-atmosphere']);
  assert.deepEqual(resolved.map((source) => source.id), ['nasa-weather-climate', 'nasa-atmosphere']);
});
