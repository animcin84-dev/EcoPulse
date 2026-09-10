import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('every long Topic Lab destination accounts for sticky navigation and skips offscreen rendering safely', () => {
  const css = read('../src/app/continuation.css');
  assert.match(css, /topic-lab__reading,[\s\S]*topic-lab__reading-check,[\s\S]*topic-lab__sources[\s\S]*scroll-margin-top:\s*110px/);
  assert.match(css, /topic-lab__deferred-section[\s\S]*content-visibility:\s*auto/);
  assert.match(css, /contain-intrinsic-size:\s*1px\s+900px/);
});

test('new reading layers participate in reduced-data and forced-colors fallbacks', () => {
  const accessibility = read('../src/app/accessibility.css');
  const bundle = readPresentationCssBundle();
  assert.match(accessibility, /prefers-reduced-data:[\s\S]*topic-lab__reading::after/);
  assert.match(accessibility, /forced-colors:[\s\S]*topic-lab__reading[\s\S]*topic-lab__reading-check/);
  assert.ok(bundle.includes('.topic-lab__deferred-section'));
});

test('Topic Lab marks expensive lower sections as deferred presentation regions', () => {
  const lab = read('../src/components/learning/TopicLab.tsx');
  for (const id of ['reading', 'reading-check', 'words', 'connections', 'sources', 'system-check']) {
    const pattern = new RegExp(`className="[^"]*topic-lab__deferred-section[^"]*"[^>]*id="${id}"|id="${id}"[^>]*className="[^"]*topic-lab__deferred-section`);
    assert.match(lab, pattern, `${id} should opt into deferred rendering`);
  }
});
