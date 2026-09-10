import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('all eight Home topics now lead to dedicated topic experiences', async () => {
  const { homeTopics } = await import('../src/content/home-topics.ts');
  assert.equal(homeTopics.length, 8);
  assert.equal(new Set(homeTopics.map((topic: { href: string }) => topic.href)).size, 8);
  assert.deepEqual(homeTopics.map((topic: { href: string }) => topic.href), [
    '/learn/climate-change',
    '/learn/recycling',
    '/learn/ocean-pollution',
    '/learn/deforestation',
    '/learn/water-conservation',
    '/learn/biodiversity',
    '/learn/renewable-energy',
    '/learn/sustainable-consumption',
  ]);

  for (const slug of ['recycling', 'ocean-pollution', 'deforestation', 'water-conservation', 'biodiversity', 'renewable-energy', 'sustainable-consumption']) {
    assert.ok(existsSync(new URL(`../src/app/learn/${slug}/page.tsx`, import.meta.url)), `${slug} route should exist`);
  }
});

test('seven non-flagship topics have authored bilingual micro-learning labs', async () => {
  const { topicLabs } = await import('../src/content/topic-labs.ts');
  assert.equal(Object.keys(topicLabs).length, 7);
  for (const lab of Object.values(topicLabs) as Array<any>) {
    assert.ok(lab.title.en && lab.title.kk);
    assert.ok(lab.overview.en.length > 80);
    assert.ok(lab.overview.kk.length > 80);
    assert.ok(lab.vocabulary.length >= 4);
    assert.ok(lab.connections.length >= 3);
    assert.ok(lab.actionHref.startsWith('/'));
  }
});

test('Eco Game contains real interactive mini-game modes rather than route cards only', () => {
  assert.ok(existsSync(new URL('../src/components/game/EcoArcadeExperience.tsx', import.meta.url)));
  const component = read('../src/components/game/EcoArcadeExperience.tsx');
  const page = read('../src/app/game/page.tsx');
  assert.match(page, /EcoArcadeExperience/);
  assert.match(component, /WORD PULSE/);
  assert.match(component, /CLIMATE CHAIN/);
  assert.match(component, /ECO DECISION/);
  assert.match(component, /aria-live="polite"/);
  assert.match(component, /Move up|MOVE UP/i);
  assert.doesNotMatch(component, /completeLessonInGuestState|LESSON_COMPLETION_XP|applyMasterySignal/);
});

test('Eco Action has a dedicated progress cockpit and mission visual metadata', async () => {
  const { missions } = await import('../src/content/missions.ts');
  assert.ok(missions.every((mission: any) => typeof mission.theme === 'string'));
  assert.ok(missions.every((mission: any) => mission.microSteps.length >= 3));
  const action = read('../src/app/action/page.tsx');
  const actionHero = read('../src/components/missions/EcoActionHero.tsx');
  const list = read('../src/components/missions/MissionList.tsx');
  const focus = read('../src/components/missions/MissionExperience.tsx');
  assert.match(action, /EcoActionHero/);
  assert.match(actionHero, /action-cockpit/);
  assert.match(list, /mission-list__progress/);
  assert.match(list, /mission-card__steps/);
  assert.match(focus, /href="\/action"/);
});

test('My Progress adds system balance and momentum visualization', () => {
  const pulse = read('../src/components/progress/PulseSummary.tsx');
  assert.match(pulse, /pulse-balance/);
  assert.match(pulse, /pulse-momentum/);
  assert.match(pulse, /LANGUAGE|PLANET|THINK|ACT/);
  assert.match(pulse, /completedLessons/);
});

test('bulk visual layer includes topic labs, arcade games, action cockpit and mobile motion polish', () => {
  const css = readPresentationCssBundle();
  for (const selector of ['.topic-lab', '.topic-lab__hero', '.eco-arcade-stage', '.arcade-score', '.action-cockpit', '.pulse-balance', '.pulse-momentum']) {
    assert.ok(css.includes(selector), `${selector} should exist`);
  }
  assert.match(css, /@keyframes\s+topic-orbit-drift/);
  assert.match(css, /@keyframes\s+arcade-score-pop/);
  assert.match(css, /html\[data-motion='reduced'\].*eco-arcade-stage/s);
});

test('primary navigation adds instant language control and keeps the mobile dock to five visible destinations', () => {
  const nav = read('../src/components/navigation/AppNav.tsx');
  const css = readPresentationCssBundle();
  assert.match(nav, /nav-language-toggle/);
  assert.match(nav, /updateLearningSettings/);
  assert.match(nav, /app-nav__link--challenges/);
  assert.match(css, /max-width:\s*700px[\s\S]*app-nav__link--challenges[\s\S]*display:\s*none/);
});

test('Learn page exposes the eight-topic atlas in addition to the canonical structured path', () => {
  const learn = read('../src/components/learning/LearnJourney.tsx');
  assert.match(learn, /learn-topic-atlas/);
  assert.match(learn, /homeTopics/);
  assert.match(learn, /topic\.href/);
  assert.match(learn, /8 TOPICS|08 TOPICS/);
});

test('arcade mode switch follows accessible tab keyboard semantics', () => {
  const game = read('../src/components/game/EcoArcadeExperience.tsx');
  assert.match(game, /aria-controls=/);
  assert.match(game, /role="tabpanel"/);
  assert.match(game, /ArrowRight/);
  assert.match(game, /ArrowLeft/);
  assert.match(game, /tabIndex=/);
});

test('mission detail shows the same safe three-step field plan as the action board', () => {
  const mission = read('../src/components/missions/MissionExperience.tsx');
  assert.match(mission, /mission-focus__steps/);
  assert.match(mission, /mission\.microSteps\.map/);
  assert.match(mission, /href="\/action"/);
});

test('Challenges overview exposes checkpoint progress before the individual cards', () => {
  const list = read('../src/components/challenges/WorldChallengeList.tsx');
  const css = readPresentationCssBundle();
  assert.match(list, /world-challenge-list__progress/);
  assert.match(list, /completedCount/);
  assert.match(css, /\.world-challenge-list__progress/);
});

test('every Topic Lab includes pronunciation and an interactive quick check without canonical rewards', () => {
  const topic = read('../src/components/learning/TopicLab.tsx');
  assert.match(topic, /PronunciationControl/);
  assert.match(topic, /topic-lab__quick-check/);
  assert.match(topic, /aria-live="polite"/);
  assert.match(topic, /QuickCheck|quick check|QUICK CHECK/i);
  assert.doesNotMatch(topic, /completeLessonInGuestState|LESSON_COMPLETION_XP|applyMasterySignal/);
});

test('route-level transition wrapper provides reduced-motion-safe page continuity', () => {
  assert.ok(existsSync(new URL('../src/app/template.tsx', import.meta.url)));
  const template = read('../src/app/template.tsx');
  const css = readPresentationCssBundle();
  assert.match(template, /route-transition-frame/);
  assert.match(css, /@keyframes\s+route-view-enter/);
  assert.match(css, /html\[data-motion='reduced'\].*route-transition-frame/s);
});

test('canonical lessons expose a compact linear progress rail for small screens', () => {
  const header = read('../src/components/lesson/LessonHeader.tsx');
  const css = readPresentationCssBundle();
  assert.match(header, /lesson-header__progress-track/);
  assert.match(header, /width:\s*`?\$\{.*%/s);
  assert.match(css, /\.lesson-header__progress-track/);
  assert.match(css, /max-width:\s*700px[\s\S]*lesson-header__progress-track/);
});

test('mission and challenge detail surfaces continue the sunlit product direction', () => {
  const missionPage = read('../src/app/mission/[slug]/page.tsx');
  const challengeCss = readPresentationCssBundle();
  assert.match(missionPage, /product-page--mission-sunlit/);
  assert.doesNotMatch(missionPage, /<AppNav inverse/);
  assert.match(challengeCss, /\.challenge-shell\s*\{[^}]*background:\s*linear-gradient/s);
  assert.match(challengeCss, /\.product-page--mission-sunlit/);
});

test('heavy below-the-fold experience sections opt into browser rendering containment', () => {
  const css = readPresentationCssBundle();
  assert.match(css, /content-visibility:\s*auto/);
  assert.match(css, /contain-intrinsic-size:/);
});

test('topic route metadata uses authored English topic titles instead of slug formatting', () => {
  for (const slug of ['recycling', 'ocean-pollution', 'deforestation', 'water-conservation', 'biodiversity', 'renewable-energy', 'sustainable-consumption']) {
    const page = read(`../src/app/learn/${slug}/page.tsx`);
    assert.match(page, /lab\.title\.en/);
  }
});

test('mobile navigation keeps Challenges reachable without adding a sixth dock cell', () => {
  const nav = read('../src/components/navigation/AppNav.tsx');
  const css = readPresentationCssBundle();
  assert.match(nav, /app-nav__challenge-shortcut/);
  assert.match(nav, /item\.href === '\/challenges'/);
  assert.match(css, /\.app-nav__challenge-shortcut\s*\{[^}]*display:\s*none/s);
  assert.match(css, /max-width:\s*700px[\s\S]*app-nav__challenge-shortcut[\s\S]*display:\s*(?:grid|flex|inline-flex)/);
});

test('canonical world pages use a predominantly sunlit detail treatment', () => {
  const page = read('../src/app/learn/[world]/page.tsx');
  const css = readPresentationCssBundle();
  assert.match(page, /product-page--world-sunlit/);
  assert.doesNotMatch(page, /<AppNav inverse/);
  assert.match(css, /\.product-page--world-sunlit \.world-detail-hero/);
  assert.match(css, /\.product-page--world-sunlit \.world-detail-connections/);
  assert.match(css, /\.product-page--world-sunlit \.world-detail-checkpoint/);
});

test('supported browsers get progressive scroll-entry choreography without making motion mandatory', () => {
  const css = readPresentationCssBundle();
  assert.match(css, /@supports\s*\(animation-timeline:\s*view\(\)\)/);
  assert.match(css, /animation-timeline:\s*view\(\)/);
  assert.match(css, /@keyframes\s+ecopulse-view-reveal/);
});

test('onboarding and recovery states follow the light visual system instead of reverting to black', () => {
  const css = readPresentationCssBundle();
  const globalError = read('../src/app/global-error.tsx');
  assert.match(css, /\.onboarding-shell\s*\{[^}]*background:\s*linear-gradient/s);
  assert.match(css, /\.not-found-page\s*\{[^}]*background:\s*linear-gradient/s);
  assert.match(css, /\.runtime-loading\s*\{[^}]*background:\s*linear-gradient/s);
  assert.doesNotMatch(globalError, /#070A08/i);
  assert.match(globalError, /#F7FAF5/i);
});

test('Explore uses a light editorial shell while preserving the graph as a focused dark instrument', () => {
  const page = read('../src/app/explore/page.tsx');
  const css = readPresentationCssBundle();
  assert.match(page, /product-page--explore-sunlit/);
  assert.doesNotMatch(page, /<AppNav inverse/);
  assert.match(css, /\.product-page--explore-sunlit \.explore-hero/);
  assert.match(css, /\.product-page--explore-sunlit \.knowledge-map/);
  assert.match(css, /\.product-page--explore-sunlit \.knowledge-list/);
});

test('Eco Arcade word and decision rounds support pronunciation and fast number-key play', () => {
  const game = read('../src/components/game/EcoArcadeExperience.tsx');
  assert.match(game, /PronunciationControl/);
  assert.match(game, /keydown/);
  assert.match(game, /event\.key/);
  assert.match(game, /['"]1['"].*['"]2['"].*['"]3['"]/s);
});

test('My Progress finishing surfaces stay light instead of ending in two black slabs', () => {
  const css = readPresentationCssBundle();
  assert.match(css, /\.pulse-dashboard \.next-action\s*\{[^}]*background:\s*linear-gradient/s);
  assert.match(css, /\.pulse-dashboard__routes\s*\{[^}]*background:\s*linear-gradient/s);
});
