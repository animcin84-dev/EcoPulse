import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('Eco Game spaced-review intro follows the persisted locale', () => {
  assert.ok(existsSync(new URL('../src/components/game/EcoGameReviewIntro.tsx', import.meta.url)));
  const intro = read('../src/components/game/EcoGameReviewIntro.tsx');
  const page = read('../src/app/game/page.tsx');
  assert.match(intro, /useGuestProgress/);
  assert.match(intro, /preferredLocale/);
  assert.match(intro, /ЖАД|ҚАЙТАЛАУ|ЕСТЕ/i);
  assert.match(page, /<EcoGameReviewIntro\s*\/>/);
});

test('world lesson status and timing labels localize instead of leaking English utility text into Kazakh mode', () => {
  const world = read('../src/components/learning/WorldExperience.tsx');
  assert.match(world, /locale === 'en' \? 'CONNECTED'/);
  assert.match(world, /locale === 'en' \? 'NEXT'/);
  assert.match(world, /locale === 'en' \? 'AVAILABLE'/);
  assert.match(world, /locale === 'en' \? 'MIN' : 'МИН'/);
});

test('concept detail finishes on a light action surface while preserving the dark connection instrument', () => {
  const css = readPresentationCssBundle();
  assert.match(css, /\.concept-actions\s*\{[^}]*background:\s*linear-gradient[^}]*color:\s*var\(--ink\)/s);
  assert.match(css, /\.concept-connections\s*\{[^}]*background:\s*var\(--carbon\)/s);
});
