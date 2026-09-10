import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('root layout mounts one global motion orchestrator and final polish layers', () => {
  const layout = read('src/app/layout.tsx');
  assert.match(layout, /SiteMotionController/);
  assert.match(layout, /awwwards-polish\.css/);
  assert.match(layout, /awwwards-motion\.css/);
});

test('site motion controller batches scroll, in-view and pointer interactions with native APIs', () => {
  const source = read('src/components/motion/SiteMotionController.tsx');
  assert.match(source, /requestAnimationFrame/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /pointermove/);
  assert.match(source, /matchMedia\('\(hover: hover\) and \(pointer: fine\)'\)/);
  assert.match(source, /--page-progress/);
  assert.match(source, /motionHeading/);
  assert.match(source, /motionGroup/);
});

test('navigation transition records click origin and chooses contextual transition kinds', () => {
  const source = read('src/components/navigation/NavigationTransitionController.tsx');
  assert.match(source, /--transition-x/);
  assert.match(source, /--transition-y/);
  assert.match(source, /transitionKindFor/);
  assert.match(source, /dataset\.transitionKind/);
});

test('mobile navigation is focus managed and does not present decorative sequence numbers', () => {
  const source = read('src/components/navigation/AppNav.tsx');
  assert.match(source, /panelRef/);
  assert.match(source, /toggleRef/);
  assert.match(source, /event\.key === 'Tab'/);
  assert.doesNotMatch(source, /String\(index \+ 1\)\.padStart/);
  assert.match(source, /editorial-nav__mobile-kicker/);
});

test('hero uses explicit depth surfaces and restrained primary action hierarchy', () => {
  const source = read('src/components/home/Hero.tsx');
  assert.match(source, /data-motion-depth="/);
  assert.match(source, /data-magnetic/);
  assert.match(source, /button--dark button--hero/);
  assert.match(source, /home-hero__pulse-signature/);
});

test('product hero keeps authored case instead of forcing a decorative uppercase eyebrow', () => {
  const source = read('src/components/navigation/ProductHero.tsx');
  assert.doesNotMatch(source, /toUpperCase\(\)/);
});

test('final motion CSS includes contextual view transitions, pointer depth and orchestrated group reveals', () => {
  const css = read('src/app/awwwards-motion.css');
  assert.match(css, /--motion-ui/);
  assert.match(css, /clip-path:\s*circle/);
  assert.match(css, /data-transition-kind='detail'/);
  assert.match(css, /data-pointer-active/);
  assert.match(css, /data-motion-heading/);
  assert.match(css, /data-motion-group/);
  assert.match(css, /prefers-reduced-motion/);
});
