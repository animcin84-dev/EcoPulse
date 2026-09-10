import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('Eco Arcade closes a five-mode session with an honest next-step recap', () => {
  const arcade = read('../src/components/game/EcoArcadeExperience.tsx');
  assert.match(arcade, /completedModes\.size === ecoArcadeModes\.length/);
  assert.match(arcade, /arcade-session-recap/);
  assert.match(arcade, /Open mastery review|Mastery review/);
  assert.match(arcade, /Eco Action|Eco Action-ға/);
  assert.match(arcade, /no canonical XP|негізгі XP/i);
});

test('Arcade completion recap has responsive presentation', () => {
  const css = readPresentationCssBundle();
  assert.ok(css.includes('.arcade-session-recap'));
  assert.match(css, /@media \(max-width:700px\)[\s\S]*arcade-session-recap/);
});
