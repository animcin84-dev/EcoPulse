import test from 'node:test';
import assert from 'node:assert/strict';
import { indexingPolicyForPath } from '../src/domain/learning/indexing.ts';

const privatePaths = [
  '/start',
  '/review',
  '/pulse',
  '/settings',
  '/lesson/atmosphere',
  '/lesson/glaciers',
  '/challenge/weather-detective',
  '/mission/sky-check',
];

const publicPaths = [
  '/',
  '/learn',
  '/learn/earth-atmosphere',
  '/learn/ice-water',
  '/explore',
  '/concept/drought',
  '/challenges',
  '/about',
];

test('private learning and progress routes are noindex', () => {
  for (const path of privatePaths) {
    assert.equal(indexingPolicyForPath(path), 'private', path);
  }
});

test('public discovery routes remain indexable', () => {
  for (const path of publicPaths) {
    assert.equal(indexingPolicyForPath(path), 'public', path);
  }
});

test('route matching is segment-aware instead of prefix-only', () => {
  assert.equal(indexingPolicyForPath('/lessonish'), 'public');
  assert.equal(indexingPolicyForPath('/challenge-zone'), 'public');
  assert.equal(indexingPolicyForPath('/settings-more'), 'public');
});

import { publicMetadataForPath, conceptMetadataForId, worldMetadataForId } from '../src/domain/learning/metadata-content.ts';

test('public static metadata is authored for primary discovery routes', () => {
  for (const path of ['/', '/learn', '/explore', '/challenges']) {
    const metadata = publicMetadataForPath(path);
    assert.ok(metadata, path);
    assert.ok(metadata.title.includes('EcoPulse'), path);
    assert.ok(metadata.description.length >= 40, path);
  }
});

test('dynamic world and concept metadata resolves from authored content', () => {
  const world = worldMetadataForId('ice-water');
  assert.ok(world?.title.includes('ICE & WATER'));
  assert.ok(world?.description.includes('glacier'));

  const concept = conceptMetadataForId('drought');
  assert.equal(concept?.title, 'Drought — EcoPulse');
  assert.ok(concept?.description.toLowerCase().includes('rainfall'));
  assert.equal(conceptMetadataForId('does-not-exist'), null);
  assert.equal(worldMetadataForId('does-not-exist'), null);
});

import { readFileSync } from 'node:fs';

const privateRouteFiles = [
  'src/app/start/page.tsx',
  'src/app/review/page.tsx',
  'src/app/pulse/page.tsx',
  'src/app/settings/page.tsx',
  'src/app/lesson/[slug]/page.tsx',
  'src/app/lesson/atmosphere/page.tsx',
  'src/app/challenge/[slug]/page.tsx',
  'src/app/mission/[slug]/page.tsx',
];

test('every private route module exports explicit noindex metadata', () => {
  for (const file of privateRouteFiles) {
    const source = readFileSync(file, 'utf8');
    assert.match(source, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/, file);
  }
});
