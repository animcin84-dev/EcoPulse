import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('pointer depth respects authored data-motion-depth strength instead of moving every surface equally', () => {
  const source = read('src/components/motion/SiteMotionController.tsx');
  assert.match(source, /dataset\.motionDepth/);
  assert.match(source, /surfaceDepth/);
  assert.match(source, /product-hero__artifact/);
});

test('mobile nav keeps the sheet mounted for an authored closing animation', () => {
  const source = read('src/components/navigation/AppNav.tsx');
  assert.match(source, /menuClosing/);
  assert.match(source, /closeMenu/);
  assert.match(source, /editorial-nav__mobile-panel--closing/);
  assert.match(source, /window\.setTimeout/);
});

test('app-wide CSS defines exit choreography and product artifact shared transitions', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /editorial-nav__mobile-panel--closing/);
  assert.match(css, /ep-mobile-sheet-out/);
  assert.match(css, /view-transition-group\(ecopulse-explore-artifact\)/);
  assert.match(css, /view-transition-group\(ecopulse-challenge-artifact\)/);
  assert.match(css, /data-motion-depth/);
});
