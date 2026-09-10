import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('root layout loads reference tokens and the final editorial redesign layer', () => {
  const layout = read('src/app/layout.tsx');
  assert.match(layout, /reference-tokens\.css/);
  assert.match(layout, /steep-editorial\.css/);
  assert.match(layout, /steep-motion\.css/);
});

test('reference token bridge carries the uploaded Steep neutral system and bilingual font aliases', () => {
  const css = read('src/app/reference-tokens.css');
  assert.match(css, /--color-ink-black:\s*#17191c/);
  assert.match(css, /--color-mist-gray:\s*#f2f2f3/);
  assert.match(css, /--surface-accent-blush:\s*#fbe1d1/);
  assert.match(css, /--radius-cards:\s*24px/);
  assert.match(css, /--radius-buttons:\s*9999px/);
  assert.match(css, /--font-signifier:\s*var\(--font-editorial\)/);
  assert.match(css, /--font-sohne:\s*var\(--font-geologica\)/);
});

test('shared navigation includes a mobile menu sheet and start action', () => {
  const nav = read('src/components/navigation/AppNav.tsx');
  assert.match(nav, /nav-menu-toggle/);
  assert.match(nav, /editorial-nav__mobile-panel/);
  assert.match(nav, /aria-expanded=/);
  assert.match(nav, /href="\/start"/);
});

test('home hero uses real product artifact collage instead of a dominant full-screen earth layout', () => {
  const hero = read('src/components/home/Hero.tsx');
  assert.match(hero, /home-hero__artifact-stage/);
  assert.match(hero, /home-artifact--topics/);
  assert.match(hero, /home-artifact--arcade/);
  assert.match(hero, /home-artifact--language/);
  assert.match(hero, /<EarthLimb/);
  assert.doesNotMatch(hero, /site-nav site-nav--sunlit/);
});

test('editorial CSS contains explicit 430, 390 and 360 mobile tuning plus app-wide product surfaces', () => {
  const css = read('src/app/steep-editorial.css');
  assert.match(css, /@media\s*\(max-width:\s*430px\)/);
  assert.match(css, /@media\s*\(max-width:\s*390px\)/);
  assert.match(css, /@media\s*\(max-width:\s*360px\)/);
  assert.match(css, /\.product-page/);
  assert.match(css, /\.topic-lab/);
  assert.match(css, /\.eco-arcade/);
  assert.match(css, /\.pulse-dashboard/);
  assert.match(css, /\.review-shell/);
  assert.match(css, /\.settings-shell/);
});

test('motion layer adds route view transitions with reduced-motion escape hatch', () => {
  const css = read('src/app/steep-motion.css');
  const controller = read('src/components/navigation/NavigationTransitionController.tsx');
  assert.match(css, /::view-transition-old\(root\)/);
  assert.match(css, /::view-transition-new\(root\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(controller, /startViewTransition/);
  assert.match(controller, /router\.push/);
});
