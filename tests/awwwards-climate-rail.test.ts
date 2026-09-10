import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Climate flagship has an active journey rail across its four learning regions', () => {
  const source = read('src/components/learning/ClimateChangeModule.tsx');
  assert.match(source, /ClimateJourneyRail/);
  assert.match(source, /IntersectionObserver/);
  for (const id of ['story', 'reading-check', 'vocabulary', 'climate-sources']) assert.match(source, new RegExp(id));
  assert.match(source, /aria-current/);
});

test('Climate journey rail is sticky on wide layouts and horizontal on mobile', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /\.climate-journey-rail/);
  assert.match(css, /position:\s*sticky/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*climate-journey-rail/);
  assert.match(css, /overflow-x:\s*auto/);
});
