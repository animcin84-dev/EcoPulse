import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('flagship Climate hero uses bilingual editorial sentence case rather than a hard-coded shout', () => {
  const source = read('src/components/learning/ClimateChangeModule.tsx');
  assert.doesNotMatch(source, />CLIMATE<br \/><span>CHANGE\.<\/span>/);
  assert.match(source, /Climate/);
  assert.match(source, /Климат/);
  assert.match(source, /climate-module-title/);
});

test('large journey and loading states avoid hard-coded shouting in display headings', () => {
  const learn = read('src/components/learning/LearnJourney.tsx');
  const onboarding = read('src/components/onboarding/OnboardingExperience.tsx');
  const settings = read('src/components/settings/LearningSettingsPanel.tsx');
  assert.doesNotMatch(learn, /<h1[^>]*>[\s\S]{0,40}KEEP YOUR/);
  assert.doesNotMatch(learn, /<h1[^>]*>[\s\S]{0,40}TAKE IT/);
  assert.doesNotMatch(learn, /<h1[^>]*>[\s\S]{0,40}YOU LEARNED/);
  assert.doesNotMatch(onboarding, /<h1>FINDING YOUR/);
  assert.doesNotMatch(settings, /<h1>LOADING/);
});

test('final app-wide layer gives editorial display headings a calmer responsive rhythm', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /editorial-display-rhythm/);
  assert.match(css, /climate-module__hero h1/);
  assert.match(css, /learn-next h1/);
  assert.match(css, /@media \(max-width: 390px\)/);
});
