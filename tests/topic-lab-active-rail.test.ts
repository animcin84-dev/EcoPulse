import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('Topic Lab rail tracks the active section and exposes aria-current', () => {
  const lab = read('../src/components/learning/TopicLab.tsx');
  assert.match(lab, /IntersectionObserver/);
  assert.match(lab, /activeSection/);
  assert.match(lab, /aria-current/);
  assert.match(lab, /rootMargin/);
  assert.match(lab, /scrollIntoView/);
  assert.match(lab, /prefers-reduced-motion/);
});

test('active Topic Lab rail item has a distinct light-system state and reduced-motion guard', () => {
  const css = readPresentationCssBundle();
  assert.ok(css.includes('.topic-lab__rail a[aria-current=\'step\']'));
  assert.match(css, /html\[data-motion='reduced'\][\s\S]*topic-lab__rail/);
});
