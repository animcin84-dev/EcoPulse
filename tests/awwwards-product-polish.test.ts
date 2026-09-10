import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const transition = readFileSync('src/components/navigation/NavigationTransitionController.tsx', 'utf8');
const motion = readFileSync('src/components/motion/SiteMotionController.tsx', 'utf8');
const polish = readFileSync('src/app/awwwards-polish.css', 'utf8');
const motionCss = readFileSync('src/app/awwwards-motion.css', 'utf8');

test('lesson-to-lesson navigation selects the lesson transition before generic detail routing', () => {
  const lessonIndex = transition.indexOf("currentPath.startsWith('/lesson/') && nextPath.startsWith('/lesson/')");
  const detailIndex = transition.indexOf('detailPrefixes.some');
  assert.ok(lessonIndex >= 0, 'lesson transition branch must exist');
  assert.ok(detailIndex >= 0, 'detail transition branch must exist');
  assert.ok(lessonIndex < detailIndex, 'lesson-specific branch must be evaluated before generic detail branch');
});

test('global heading orchestration covers page h1 and h2 while filtering signature hero and lesson stages', () => {
  assert.match(motion, /main h1/);
  assert.match(motion, /main h2/);
  assert.match(motion, /!element\.closest\('\.home-hero'\)/);
  assert.match(motion, /!element\.closest\('\.lesson-stage'\)/);
});

test('product surfaces have deliberate editorial layouts instead of only global card recoloring', () => {
  for (const selector of [
    '.learn-orientation__panel',
    '.topic-lab__hero-grid',
    '.eco-arcade-stage__board',
    '.action-cockpit__grid',
    '.world-challenge-list__next',
    '.pulse-focus-compass__grid',
    '.review-shell',
    '.settings-group',
    '.lesson-header',
  ]) assert.ok(polish.includes(selector), `missing deliberate polish for ${selector}`);
});

test('motion layer includes animated language controls, lesson stage continuity and semantic filter feedback', () => {
  assert.match(motionCss, /\.nav-language-toggle::before/);
  assert.match(motionCss, /\.lesson-step-focus/);
  assert.match(motionCss, /aria-pressed='true'/);
  assert.match(motionCss, /focus-visible/);
});
