import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('dynamic lesson and product feedback states use modern entry choreography without JS wrappers', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /@starting-style/);
  assert.match(css, /feedback-panel--resolved/);
  assert.match(css, /arcade-feedback/);
  assert.match(css, /settings-saved/);
  assert.match(css, /mission-complete-mark/);
});

test('mobile resolved actions stay reachable above device chrome and remain reduced-motion safe', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /feedback-panel--resolved[\s\S]*button/);
  assert.match(css, /position:\s*sticky/);
  assert.match(css, /prefers-reduced-motion/);
});
