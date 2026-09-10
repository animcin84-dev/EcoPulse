import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const climateContentUrl = new URL('../src/content/climate-change-module.ts', import.meta.url);
const climateComponentUrl = new URL('../src/components/learning/ClimateChangeModule.tsx', import.meta.url);
const climatePageUrl = new URL('../src/app/learn/climate-change/page.tsx', import.meta.url);

test('Climate Change flagship content model exists with the supplied learning contract', async () => {
  assert.ok(existsSync(climateContentUrl), 'climate-change-module.ts should exist');
  const { climateChangeModule } = await import('../src/content/climate-change-module.ts');
  assert.equal(climateChangeModule.readingCheck.length, 5);
  assert.equal(climateChangeModule.vocabulary.length, 10);
  assert.deepEqual(climateChangeModule.vocabulary.map((item: { term: string }) => item.term), [
    'GREENHOUSE GAS',
    'ATMOSPHERE',
    'GLACIER',
    'MELT',
    'DROUGHT',
    'WILDFIRE',
    'SEA LEVEL',
    'ACIDIC',
    'EXTREME WEATHER',
    'HABITAT',
  ]);
  assert.equal(climateChangeModule.dataCards[0].value, '429');
  assert.match(climateChangeModule.dataCards[0].context.en, /July 2026/i);
  assert.ok(climateChangeModule.chapters.length >= 5);
});

test('first Home topic enters the dedicated Climate Change flagship route', async () => {
  const { homeTopics } = await import('../src/content/home-topics.ts');
  assert.equal(homeTopics[0]?.id, 'climate-change');
  assert.equal(homeTopics[0]?.href, '/learn/climate-change');
});

test('Climate Change source layer contains official dated NASA and NOAA evidence', async () => {
  const { scienceSourcesById } = await import('../src/content/science-sources.ts');
  for (const id of ['nasa-co2-indicator', 'nasa-global-temperature-indicator', 'nasa-ice-sheets-indicator', 'nasa-sea-level-indicator']) {
    const source = scienceSourcesById[id];
    assert.ok(source, `${id} should exist`);
    assert.equal(source.institution, 'NASA');
    assert.match(source.url, /^https:\/\/science\.nasa\.gov\//);
    assert.equal(source.lastChecked, '2026-09-10');
  }
  assert.ok(scienceSourcesById['noaa-ocean-acidification']);
});

test('Climate Change route renders immersive reading and vocabulary practice without fake canonical rewards', () => {
  assert.ok(existsSync(climatePageUrl), 'Climate Change route should exist');
  assert.ok(existsSync(climateComponentUrl), 'ClimateChangeModule component should exist');
  const component = readFileSync(climateComponentUrl, 'utf8');
  assert.match(component, /climate-reading-check/);
  assert.match(component, /climate-module__scroll-progress/);
  assert.match(component, /climate-vocabulary-practice/);
  assert.match(component, /role="progressbar"/);
  assert.match(component, /aria-keyshortcuts/);
  assert.match(component, /PronunciationControl/);
  assert.match(component, /\/lesson\/atmosphere/);
  assert.doesNotMatch(component, /LESSON_COMPLETION_XP|applyMasterySignal|finalizeLessonInGuestState/);
});

test('Learn, Eco Game and My Progress receive the Phase 70 orientation layer', () => {
  const learn = readFileSync(new URL('../src/components/learning/LearnJourney.tsx', import.meta.url), 'utf8');
  const game = readFileSync(new URL('../src/app/game/page.tsx', import.meta.url), 'utf8');
  const gameHub = readFileSync(new URL('../src/components/game/EcoGameHub.tsx', import.meta.url), 'utf8');
  const gameReview = readFileSync(new URL('../src/components/game/EcoGameReviewIntro.tsx', import.meta.url), 'utf8');
  const pulse = readFileSync(new URL('../src/components/progress/PulseSummary.tsx', import.meta.url), 'utf8');
  assert.match(learn, /learn-orientation/);
  assert.match(learn, /\/learn\/climate-change/);
  assert.match(game, /EcoGameHub/);
  assert.match(gameHub, /eco-arcade-hub/);
  assert.match(game, /EcoGameReviewIntro/);
  assert.match(gameReview, /SPACED REVIEW/i);
  assert.match(pulse, /pulse-dashboard/);
  assert.match(pulse, /pulse-dial/);
});

test('Phase 70 CSS includes immersive climate, feedback motion and reduced-motion fallbacks', () => {
  const css = readPresentationCssBundle();
  for (const selector of ['.climate-module', '.climate-reading-check', '.climate-vocabulary-practice', '.learn-orientation', '.eco-arcade-hub', '.pulse-dashboard', '.pulse-dial']) {
    assert.ok(css.includes(selector), `${selector} should exist`);
  }
  assert.match(css, /@keyframes\s+climate-data-breathe/);
  assert.match(css, /@keyframes\s+lesson-stage-enter/);
  assert.match(css, /@keyframes\s+climate-scroll-progress/);
  assert.match(css, /animation-timeline:\s*scroll\(root block\)/);
  assert.match(css, /html\[data-motion='reduced'\].*climate-module/s);
});
