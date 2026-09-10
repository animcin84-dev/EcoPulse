import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const mediaSource = readFileSync('src/components/media/InstitutionalMedia.tsx', 'utf8');
const heroSource = readFileSync('src/components/home/EarthLimb.tsx', 'utf8');
const discoverSource = readFileSync('src/components/lesson/DiscoverVisual.tsx', 'utf8');

test('institutional media component exposes credit and falls back to authored visual on load failure', () => {
  assert.match(mediaSource, /asset\.credit/);
  assert.match(mediaSource, /asset\.visualNote/);
  assert.match(mediaSource, /asset\.sourcePage/);
  assert.match(mediaSource, /onError/);
  assert.match(mediaSource, /onLoad/);
  assert.match(mediaSource, /loaded/);
  assert.match(mediaSource, /fallback/);
  assert.match(mediaSource, /loading=/);
  assert.match(mediaSource, /referrerPolicy="no-referrer"/);
});

test('home hero and approved lesson visuals resolve media through the shared content contract', () => {
  assert.match(heroSource, /resolveHomeMedia/);
  assert.match(heroSource, /InstitutionalMedia/);
  assert.match(discoverSource, /resolveLessonMedia/);
  assert.match(discoverSource, /InstitutionalMedia/);
});

test('institutional media suppresses remote image requests for reduced-data and browser Save-Data modes', () => {
  assert.match(mediaSource, /shouldLoadInstitutionalMedia/);
  assert.match(mediaSource, /connection/);
  assert.match(mediaSource, /saveData/);
  assert.match(mediaSource, /data-saving/);
});
