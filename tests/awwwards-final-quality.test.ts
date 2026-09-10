import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('forms and reasoning surfaces expose a shared focus-within treatment instead of relying on field defaults', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /mission-reflection-field:focus-within/);
  assert.match(css, /challenge-reasoning__field:focus-within/);
  assert.match(css, /reasoning-extension:focus-within/);
  assert.match(css, /settings-group:focus-within/);
  assert.match(css, /focus-ring-soft/);
});

test('heavy below-fold product sections use rendering containment without hiding interactive content', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /performance-containment/);
  assert.match(css, /content-visibility:\s*auto/);
  assert.match(css, /contain-intrinsic-size/);
  assert.match(css, /eco-arcade-live/);
  assert.match(css, /pulse-momentum/);
  assert.match(css, /settings-data/);
});

test('coarse pointers keep controls tactile without desktop pointer transforms', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /\(hover:\s*none\).*\(pointer:\s*coarse\)/s);
  assert.match(css, /touch-action:\s*manipulation/);
  assert.match(css, /data-pointer-active/);
});
