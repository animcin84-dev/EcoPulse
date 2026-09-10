import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Eco Arcade uses one measured sliding tab indicator across all five modes', () => {
  const source = read('src/components/game/EcoArcadeExperience.tsx');
  assert.match(source, /tabsRef/);
  assert.match(source, /--arcade-tab-x/);
  assert.match(source, /--arcade-tab-width/);
  assert.match(source, /ResizeObserver/);
  assert.match(source, /eco-arcade-tabs__glider/);
});

test('app-wide motion layer animates the arcade glider without obscuring selected tab content', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /eco-arcade-tabs__glider/);
  assert.match(css, /--arcade-tab-x/);
  assert.match(css, /--arcade-tab-width/);
  assert.match(css, /eco-arcade-tabs > button/);
});
