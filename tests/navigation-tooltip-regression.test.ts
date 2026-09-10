import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/app/awwwards-appwide.css', import.meta.url), 'utf8');

test('desktop nav description tooltip does not reuse the active underline pseudo-element', () => {
  assert.match(css, /\.editorial-nav__desktop-links a::before\s*\{[\s\S]*content:\s*attr\(data-description\)/);
  assert.match(css, /\.editorial-nav__desktop-links a:hover::before,[\s\S]*a:focus-visible::before/);
  assert.doesNotMatch(css, /\.editorial-nav__desktop-links a::after\s*\{[\s\S]{0,220}content:\s*attr\(data-description\)/);
});

test('desktop nav keeps a separate active glider for the current route', () => {
  assert.match(css, /\.editorial-nav__active-glider\s*\{/);
  assert.match(css, /background:\s*var\(--ep-green\)/);
});
