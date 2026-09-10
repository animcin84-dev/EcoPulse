import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { indexingPolicyForPath } from '../src/domain/learning/indexing.ts';

test('focused mission routes are private learning surfaces', () => {
  assert.equal(indexingPolicyForPath('/mission/sky-check'), 'private');
  assert.equal(indexingPolicyForPath('/mission/habitat-observer'), 'private');
  assert.equal(indexingPolicyForPath('/missionary'), 'public');
});

test('dedicated mission route is static-param aware, noindex, and recovers unknown slugs', () => {
  const route = 'src/app/mission/[slug]/page.tsx';
  assert.equal(existsSync(route), true, route);
  const source = readFileSync(route, 'utf8');
  assert.match(source, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  assert.match(source, /generateStaticParams/);
  assert.match(source, /notFound\(\)/);
  assert.match(source, /MissionExperience/);
});
