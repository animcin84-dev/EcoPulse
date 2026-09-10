import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('root layout imports every split stylesheet exactly once', () => {
  const layout = read('../src/app/layout.tsx');
  for (const name of ['globals.css', 'sunlit.css', 'climate.css', 'experiences.css', 'accessibility.css']) {
    const matches = layout.match(new RegExp(`import './${name.replace('.', '\\.')}'`, 'g')) ?? [];
    assert.equal(matches.length, 1, `${name} should be imported once`);
  }
});

test('Eco Game hero is localized from persisted learning settings and exposes all five arcade modes', () => {
  const path = new URL('../src/components/game/EcoGameHub.tsx', import.meta.url);
  assert.ok(existsSync(path), 'EcoGameHub should exist');
  const hub = read('../src/components/game/EcoGameHub.tsx');
  const page = read('../src/app/game/page.tsx');
  assert.match(hub, /useGuestProgress/);
  assert.match(hub, /preferredLocale/);
  assert.match(hub, /ecoArcadeModes/);
  assert.match(hub, /locale === 'kk'/);
  assert.match(hub, /#arcade-stage/);
  assert.match(page, /<EcoGameHub\s*\/>/);
});

test('Eco Action hero follows persisted EN / Kazakh language instead of fixed English copy', () => {
  const path = new URL('../src/components/missions/EcoActionHero.tsx', import.meta.url);
  assert.ok(existsSync(path), 'EcoActionHero should exist');
  const hero = read('../src/components/missions/EcoActionHero.tsx');
  const page = read('../src/app/action/page.tsx');
  assert.match(hero, /useGuestProgress/);
  assert.match(hero, /preferredLocale/);
  assert.match(hero, /ҚАУІПСІЗ|ӘРЕКЕТ|БАҚЫЛА/i);
  assert.match(page, /<EcoActionHero\s*\/>/);
});

test('Home keeps its language switch reachable on small screens while prioritizing it over the redundant Start nav CTA', () => {
  const css = readPresentationCssBundle();
  const mobile = css.match(/@media\s*\(max-width:\s*700px\)[\s\S]*$/)?.[0] ?? '';
  assert.match(mobile, /\.home-language-toggle\s*\{[^}]*display:\s*(?:grid|flex|inline-flex)/s);
  assert.match(mobile, /\.site-nav__compact-cta\s*\{[^}]*display:\s*none/s);
});

test('new interactive hubs expose stable anchor targets and focus-visible affordances', () => {
  const game = read('../src/components/game/EcoArcadeExperience.tsx');
  const css = readPresentationCssBundle();
  assert.match(game, /id="arcade-stage"/);
  assert.match(css, /home-language-toggle[^}]*button:focus-visible|home-language-toggle button:focus-visible/s);
  assert.match(css, /eco-arcade-tabs[^}]*button:focus-visible|eco-arcade-tabs button:focus-visible/s);
});
