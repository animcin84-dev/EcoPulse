import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

import { productCopy } from '../src/domain/learning/product-copy.ts';
import { createEmptyGuestState } from '../src/domain/learning/guest-state.ts';
import { navigationSectionForPath, resolveAppNavigationPresentation } from '../src/domain/learning/navigation.ts';

test('home uses the approved EcoPulse learning / Earth / action slogan in both locales', () => {
  assert.equal(productCopy.en.home.heroTitle, 'Learn English.\nUnderstand Earth.\nMake a difference.');
  assert.equal(productCopy.kk.home.heroTitle.split('\n').length, 3);
  assert.equal(productCopy.en.home.heroStart, 'Start learning');
  assert.equal(productCopy.en.home.heroSystem, 'Test your eco-knowledge');
  assert.match(productCopy.en.home.welcomeTitle, /Welcome to EcoPulse/);
  assert.match(productCopy.en.home.topicsTitle, /What do you want to learn about/);
});

test('home exposes exactly eight bilingual environmental topic entry points', async () => {
  const path = new URL('../src/content/home-topics.ts', import.meta.url);
  assert.ok(existsSync(path), 'src/content/home-topics.ts should exist');
  const { homeTopics } = await import('../src/content/home-topics.ts');
  assert.equal(homeTopics.length, 8);
  assert.deepEqual(homeTopics.map((topic) => topic.id), [
    'climate-change',
    'recycling',
    'ocean-pollution',
    'deforestation',
    'water-conservation',
    'biodiversity',
    'renewable-energy',
    'sustainable-consumption',
  ]);
  for (const topic of homeTopics) {
    assert.ok(topic.title.en.length > 0);
    assert.ok(topic.title.kk.length > 0);
    assert.match(topic.href, /^\/learn/);
  }
});

test('primary navigation exposes the approved six-item IA and maps legacy routes correctly', () => {
  const state = createEmptyGuestState();
  const items = resolveAppNavigationPresentation(state, new Date('2026-09-10T00:00:00Z')).items;
  assert.deepEqual(items.map((item) => [item.href, item.label]), [
    ['/', 'Home'],
    ['/learn', 'Learn'],
    ['/challenges', 'Challenges'],
    ['/game', 'Eco Game'],
    ['/action', 'Eco Action'],
    ['/pulse', 'My Progress'],
  ]);
  assert.equal(navigationSectionForPath('/review'), '/game');
  assert.equal(navigationSectionForPath('/mission/water-watch'), '/action');
  assert.equal(navigationSectionForPath('/settings'), '/pulse');
});

test('new Home sections and dedicated game/action routes are present in the page composition', () => {
  const expectedFiles = [
    '../src/components/home/HomeWelcome.tsx',
    '../src/components/home/HomeTopics.tsx',
    '../src/app/game/page.tsx',
    '../src/app/action/page.tsx',
  ];
  for (const relative of expectedFiles) {
    const path = new URL(relative, import.meta.url);
    assert.ok(existsSync(path), `${relative} should exist`);
  }

  const page = readFileSync(new URL('../src/app/page.tsx', import.meta.url), 'utf8');
  const welcomeIndex = page.indexOf('<HomeWelcome');
  const topicsIndex = page.indexOf('<HomeTopics');
  const connectionIndex = page.indexOf('<ConnectionPreview');
  assert.ok(welcomeIndex > -1 && topicsIndex > welcomeIndex && connectionIndex > topicsIndex);
});

test('sunlit design tokens, hero motion and reduced-motion fallbacks are part of global CSS', () => {
  const css = readPresentationCssBundle();
  for (const token of ['--canvas:', '--surface:', '--mint:', '--sky:', '--warm:']) {
    assert.ok(css.includes(token), `${token} should be defined`);
  }
  assert.match(css, /\.home-topics\b/);
  assert.match(css, /\.home-welcome\b/);
  assert.match(css, /@keyframes\s+hero-line-rise/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /html\[data-motion='reduced'\]/);
});

test('Challenges and Eco Action are distinct product surfaces', () => {
  const challengeListPath = new URL('../src/components/challenges/WorldChallengeList.tsx', import.meta.url);
  assert.ok(existsSync(challengeListPath), 'WorldChallengeList should exist');
  const challengesPage = readFileSync(new URL('../src/app/challenges/page.tsx', import.meta.url), 'utf8');
  const actionPage = readFileSync(new URL('../src/app/action/page.tsx', import.meta.url), 'utf8');
  assert.match(challengesPage, /WorldChallengeList/);
  assert.doesNotMatch(challengesPage, /MissionList/);
  assert.match(actionPage, /MissionList/);
});
