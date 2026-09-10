import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('desktop nav measures the active link and drives one sliding editorial indicator', () => {
  const source = read('src/components/navigation/AppNav.tsx');
  assert.match(source, /desktopLinksRef/);
  assert.match(source, /--nav-active-x/);
  assert.match(source, /--nav-active-width/);
  assert.match(source, /ResizeObserver/);
  assert.match(source, /editorial-nav__active-glider/);
});

test('route transitions distinguish topic, lesson, game, back and generic page navigation', () => {
  const source = read('src/components/navigation/NavigationTransitionController.tsx');
  assert.match(source, /routeDepth/);
  assert.match(source, /return 'topic'/);
  assert.match(source, /return 'game'/);
  assert.match(source, /return 'back'/);
  assert.match(source, /return 'lesson'/);
});

test('global motion controller classifies meaningful sections instead of applying one reveal to everything', () => {
  const source = read('src/components/motion/SiteMotionController.tsx');
  assert.match(source, /SECTION_SELECTOR/);
  assert.match(source, /sectionKindFor/);
  assert.match(source, /motionSection/);
  assert.match(source, /narrative/);
  assert.match(source, /practice/);
  assert.match(source, /instrument/);
});

test('final app-wide layer is loaded after core awwwards motion and before accessibility overrides', () => {
  const layout = read('src/app/layout.tsx');
  const motionIndex = layout.indexOf("./awwwards-motion.css");
  const appwideIndex = layout.indexOf("./awwwards-appwide.css");
  const a11yIndex = layout.indexOf("./accessibility.css");
  assert.ok(motionIndex >= 0 && appwideIndex > motionIndex && a11yIndex > appwideIndex);
});

test('app-wide CSS has distinct section choreography, active nav glider and route transition families', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /editorial-nav__active-glider/);
  assert.match(css, /data-motion-section='narrative'/);
  assert.match(css, /data-motion-section='practice'/);
  assert.match(css, /data-motion-section='instrument'/);
  assert.match(css, /data-transition-kind='topic'/);
  assert.match(css, /data-transition-kind='back'/);
  assert.match(css, /data-transition-kind='game'/);
});

test('app-wide CSS explicitly polishes all major product experiences', () => {
  const css = read('src/app/awwwards-appwide.css');
  for (const selector of [
    '.learn-orientation',
    '.topic-lab__hero',
    '.climate-module__hero',
    '.eco-arcade-stage__board',
    '.action-cockpit__visual',
    '.world-challenge-list__next',
    '.pulse-focus-compass__grid',
    '.review-item-focus',
    '.settings-group',
    '.lesson-stage__inner',
  ]) assert.ok(css.includes(selector), `missing app-wide polish for ${selector}`);
});

test('mobile quality has deliberate 430, 390 and 360px treatments plus motion/data safeguards', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /max-width:\s*430px/);
  assert.match(css, /max-width:\s*390px/);
  assert.match(css, /max-width:\s*360px/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /pointer:\s*coarse/);
});
