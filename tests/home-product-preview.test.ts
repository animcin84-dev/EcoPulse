import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('Home previews the real five-mode Eco Game and links into Eco Action', () => {
  const story = read('../src/components/home/HomeStorySections.tsx');
  assert.match(story, /ecoArcadeModes/);
  assert.match(story, /home-arcade-preview/);
  assert.match(story, /href="\/game"/);
  assert.match(story, /href="\/action"/);
  assert.match(story, /Five practice modes|Бес жаттығу режимі/);
});

test('Home arcade preview participates in the sunlit responsive motion system', () => {
  const css = readPresentationCssBundle();
  assert.ok(css.includes('.home-arcade-preview'));
  assert.match(css, /@media \(max-width:700px\)[\s\S]*home-arcade-preview/);
  assert.match(css, /html\[data-motion='reduced'\][\s\S]*home-arcade-preview/);
});
