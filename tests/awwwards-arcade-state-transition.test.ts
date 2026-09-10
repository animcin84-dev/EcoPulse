import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Eco Arcade mode changes use a local directional View Transition when available', () => {
  const source = read('src/components/game/EcoArcadeExperience.tsx');
  assert.match(source, /flushSync/);
  assert.match(source, /startViewTransition/);
  assert.match(source, /dataUiTransition|uiTransition/);
  assert.match(source, /--arcade-direction/);
  assert.match(source, /changeMode/);
});

test('Arcade transition animates the board only and keeps the page root stable', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /view-transition-name:\s*arcade-board/);
  assert.match(css, /data-ui-transition='arcade'/);
  assert.match(css, /::view-transition-old\(arcade-board\)/);
  assert.match(css, /::view-transition-new\(arcade-board\)/);
});
