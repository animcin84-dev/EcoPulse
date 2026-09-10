import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveHomeMedia, resolveLessonMedia } from '../src/content/media-resolver.ts';

test('home and authored lessons resolve only their approved institutional media', () => {
  assert.equal(resolveHomeMedia()?.id, 'atmosphere-limb');
  assert.equal(resolveLessonMedia('atmosphere')?.id, 'atmosphere-limb');
  assert.equal(resolveLessonMedia('glaciers')?.id, 'easton-glacier');
  assert.equal(resolveLessonMedia('habitats')?.id, 'tidal-wetland-habitat');
});

test('lessons without approved photography keep their authored diagram instead of borrowing unrelated media', () => {
  assert.equal(resolveLessonMedia('weather-climate'), null);
  assert.equal(resolveLessonMedia('sea-level'), null);
  assert.equal(resolveLessonMedia('drought'), null);
  assert.equal(resolveLessonMedia('wildfire-extreme-weather'), null);
  assert.equal(resolveLessonMedia('ocean-change'), null);
  assert.equal(resolveLessonMedia('not-a-lesson'), null);
});
