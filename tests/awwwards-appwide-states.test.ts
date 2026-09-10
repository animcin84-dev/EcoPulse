import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('shared product hero includes a kind-specific floating artifact instead of text-only composition', () => {
  const source = read('src/components/navigation/ProductHero.tsx');
  assert.match(source, /product-hero__artifact/);
  assert.match(source, /product-hero__artifact--explore/);
  assert.match(source, /product-hero__artifact--challenge/);
  assert.match(source, /data-motion-depth/);
  assert.match(source, /viewTransitionName/);
});

test('app-wide layer animates meaningful completion and validation states', () => {
  const css = read('src/app/awwwards-appwide.css');
  for (const selector of [
    '.mission-card--complete',
    '.world-challenge-card--complete',
    '.world-challenge-card--ready',
    '.arcade-session-meter',
    '.review-option--correct',
    '.review-option--incorrect',
    '.settings-saved',
  ]) assert.ok(css.includes(selector), `missing state polish for ${selector}`);
});

test('product hero artifacts have separate explore/challenge visual languages and mobile collapse', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /product-hero__artifact--explore/);
  assert.match(css, /product-hero__artifact--challenge/);
  assert.match(css, /product-hero__nodes/);
  assert.match(css, /product-hero__checkpoint/);
  assert.match(css, /max-width:\s*760px[\s\S]*product-hero__artifact/);
});
