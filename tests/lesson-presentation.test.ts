import test from 'node:test';
import assert from 'node:assert/strict';

import { lessonSequence } from '../src/content/index.ts';
import { lessonPresentationBySlug, worldPresentation } from '../src/content/lesson-presentation.ts';

test('every curriculum lesson has complete presentation metadata', () => {
  for (const lesson of lessonSequence) {
    const presentation = lessonPresentationBySlug[lesson.slug];
    assert.ok(presentation, `${lesson.slug}: missing presentation metadata`);
    assert.ok(presentation.pronunciation.trim(), `${lesson.slug}: pronunciation is required`);
    assert.ok(presentation.visualMode.trim(), `${lesson.slug}: visual mode is required`);
  }
});

test('every curriculum world has a stable learner-facing label', () => {
  const worlds = new Set(lessonSequence.map((lesson) => lesson.world));
  for (const world of worlds) {
    const presentation = worldPresentation[world];
    assert.ok(presentation, `${world}: missing world presentation`);
    assert.match(presentation.index, /^WORLD 0\d$/);
    assert.ok(presentation.name.trim());
    assert.ok(presentation.short.trim());
  }
});
