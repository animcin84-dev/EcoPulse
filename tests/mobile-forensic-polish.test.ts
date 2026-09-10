import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('final polish layer contains separate 430 390 and 360 compositions plus safe-area menu treatment', () => {
  const css = read('src/app/awwwards-polish.css');
  assert.match(css, /@media\s*\(max-width:\s*430px\)/);
  assert.match(css, /@media\s*\(max-width:\s*390px\)/);
  assert.match(css, /@media\s*\(max-width:\s*360px\)/);
  assert.match(css, /env\(safe-area-inset-top\)/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /editorial-nav__mobile-panel/);
  assert.match(css, /home-hero__artifact-stage/);
});

test('touch and reduced-data modes explicitly remove expensive interaction polish', () => {
  const css = read('src/app/awwwards-motion.css');
  assert.match(css, /hover:\s*none/);
  assert.match(css, /pointer:\s*coarse/);
  assert.match(css, /prefers-reduced-data:\s*reduce/);
});
