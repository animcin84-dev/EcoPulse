import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

function cssBundle() {
  return ['./globals.css', './sunlit.css', './climate.css', './experiences.css', './continuation.css', './accessibility.css']
    .map((name) => new URL(`../src/app/${name.replace('./', '')}`, import.meta.url))
    .filter((url) => existsSync(url))
    .map((url) => readFileSync(url, 'utf8'))
    .join('\n');
}

test('presentation CSS is split into ordered domain stylesheets', () => {
  const layout = read('../src/app/layout.tsx');
  for (const file of ['sunlit.css', 'climate.css', 'experiences.css', 'accessibility.css']) {
    assert.ok(existsSync(new URL(`../src/app/${file}`, import.meta.url)), `${file} should exist`);
    assert.match(layout, new RegExp(`import ['\"]\\./${file.replace('.', '\\.')}['\"]`));
  }
  assert.ok(read('../src/app/globals.css').length < 170_000, 'globals.css should no longer own the whole presentation layer');
});

test('all seven compact Topic Labs have authored systems depth and checks', async () => {
  assert.ok(existsSync(new URL('../src/content/topic-depth.ts', import.meta.url)));
  const { topicDepth } = await import('../src/content/topic-depth.ts');
  assert.equal(Object.keys(topicDepth).length, 7);
  for (const entry of Object.values(topicDepth) as Array<any>) {
    assert.ok(entry.thesis.en.length > 60 && entry.thesis.kk.length > 60);
    assert.ok(entry.insights.length >= 3);
    assert.ok(entry.checks.length >= 3);
    for (const question of entry.checks) {
      assert.equal(question.options.length, 3);
      assert.ok(question.correct >= 0 && question.correct < 3);
      assert.ok(question.explanation.en && question.explanation.kk);
    }
  }
});

test('Topic Lab exposes sticky learning rail, deeper briefing and keyboard retrieval', () => {
  const topic = read('../src/components/learning/TopicLab.tsx');
  assert.match(topic, /topic-lab__rail/);
  assert.match(topic, /SYSTEM BRIEFING|SYSTEM\/BRIEFING/i);
  assert.match(topic, /topic-lab__system-check/);
  assert.match(topic, /KeyboardEvent/);
  assert.match(topic, /['\"]1['\"].*['\"]2['\"].*['\"]3['\"].*['\"]4['\"]/s);
});

test('Eco Arcade content lives outside the component and contains five localized modes', async () => {
  assert.ok(existsSync(new URL('../src/content/eco-arcade.ts', import.meta.url)));
  const { ecoArcadeModes, ecoDecisions, climateChain } = await import('../src/content/eco-arcade.ts');
  assert.equal(ecoArcadeModes.length, 5);
  assert.ok(ecoDecisions.length >= 3);
  assert.ok(climateChain.length >= 5);
  assert.ok(ecoDecisions.every((item: any) => item.prompt.en && item.prompt.kk));
});

test('Eco Game has five interactive tabs and a transient five-mode session meter', () => {
  const game = read('../src/components/game/EcoArcadeExperience.tsx');
  for (const label of ['WORD PULSE', 'CLIMATE CHAIN', 'ECO DECISION', 'SORT IT RIGHT', 'SIGNAL MATCH']) assert.match(game, new RegExp(label));
  assert.match(game, /arcade-session-meter/);
  assert.match(game, /completedModes/);
  assert.match(game, /role="tabpanel"/);
  assert.doesNotMatch(game, /completeLessonInGuestState|LESSON_COMPLETION_XP|applyMasterySignal/);
});

test('Eco Action supports all, next-up and quick mission filters', () => {
  const missions = read('../src/components/missions/MissionList.tsx');
  const rail = read('../src/components/ui/MeasuredFilterRail.tsx');
  assert.match(missions, /MissionFilter/);
  assert.match(missions, /NEXT UP/);
  assert.match(missions, /≤3 MIN/);
  assert.match(missions, /MeasuredFilterRail/);
  assert.match(rail, /aria-pressed/);
  assert.match(missions, /visibleMissions/);
});

test('Challenges exposes next checkpoint and all-ready-locked filtering', () => {
  const list = read('../src/components/challenges/WorldChallengeList.tsx');
  const rail = read('../src/components/ui/MeasuredFilterRail.tsx');
  assert.match(list, /NEXT CHECKPOINT/);
  assert.match(list, /ChallengeFilter/);
  assert.match(list, /READY/);
  assert.match(list, /LOCKED/);
  assert.match(list, /MeasuredFilterRail/);
  assert.match(rail, /aria-pressed/);
});

test('My Progress exposes a focus compass derived from the weakest lane', () => {
  const pulse = read('../src/components/progress/PulseSummary.tsx');
  assert.match(pulse, /pulse-focus-compass/);
  assert.match(pulse, /FOCUS COMPASS/);
  assert.match(pulse, /focusLane/);
  assert.match(pulse, /Math\.min/);
});

test('Home hero can persistently switch EN and ҚАЗ through the shared editorial navigation', () => {
  const hero = read('../src/components/home/Hero.tsx');
  const nav = read('../src/components/navigation/AppNav.tsx');
  assert.match(hero, /<AppNav \/>/);
  assert.match(nav, /nav-language-toggle/);
  assert.match(nav, /updateLearningSettings/);
  assert.match(nav, /updateState/);
  assert.match(nav, /aria-pressed/);
});

test('each Topic Lab visual has a distinct generated signature', () => {
  const css = cssBundle();
  for (const id of ['recycling', 'ocean-pollution', 'deforestation', 'water-conservation', 'biodiversity', 'renewable-energy', 'sustainable-consumption']) {
    assert.ok(css.includes(`.topic-lab--${id}`), `${id} needs a signature style`);
  }
  for (const animation of ['topic-recycle-loop', 'topic-ocean-drift', 'topic-forest-rise', 'topic-water-ripple', 'topic-biodiversity-pulse', 'topic-energy-ray', 'topic-consumption-cycle']) {
    assert.match(css, new RegExp(`@keyframes\\s+${animation}`));
  }
});

test('accessibility layer covers forced colors, high contrast, coarse pointers and reduced data', () => {
  const css = cssBundle();
  assert.match(css, /@media\s*\(forced-colors:\s*active\)/);
  assert.match(css, /@media\s*\(prefers-contrast:\s*more\)/);
  assert.match(css, /@media\s*\(pointer:\s*coarse\)/);
  assert.match(css, /@media\s*\(prefers-reduced-data:\s*reduce\)/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
});
