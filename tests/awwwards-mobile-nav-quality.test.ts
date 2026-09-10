import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('mobile navigation locks the viewport without losing the user scroll position', () => {
  const source = read('src/components/navigation/AppNav.tsx');
  assert.match(source, /window\.scrollY/);
  assert.match(source, /body\.style\.position/);
  assert.match(source, /body\.style\.top/);
  assert.match(source, /window\.scrollTo/);
});

test('mobile nav composition accounts for top and horizontal safe areas and dynamic viewport height', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /safe-area-inset-top/);
  assert.match(css, /safe-area-inset-left/);
  assert.match(css, /safe-area-inset-right/);
  assert.match(css, /100dvh/);
  assert.match(css, /editorial-nav__mobile-footer/);
});
