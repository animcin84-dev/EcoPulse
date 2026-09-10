import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(path, 'utf8');

test('navigation exposes plain-language descriptions for every primary destination', () => {
  const source = read('src/domain/learning/navigation.ts');
  for (const phrase of ['Learn new English', 'Practice words', 'Test your reasoning', 'Try a safe action', 'See progress']) {
    assert.ok(source.includes(phrase), `missing nav explanation: ${phrase}`);
  }
});

test('major product pages render a shared orientation strip', () => {
  const pages = [
    'src/app/learn/page.tsx',
    'src/app/game/page.tsx',
    'src/app/action/page.tsx',
    'src/app/challenges/page.tsx',
    'src/app/pulse/page.tsx',
    'src/app/review/page.tsx',
    'src/app/settings/page.tsx',
    'src/app/explore/page.tsx',
  ];
  for (const page of pages) {
    assert.ok(read(page).includes('PageOrientation'), `${page} should use PageOrientation`);
  }
});

test('orientation component explains purpose, next action and progress effect', () => {
  const source = read('src/components/navigation/PageOrientation.tsx');
  for (const phrase of ['What this is', 'Do this now', 'Progress effect', 'Learn → Practice → Think → Act → Progress']) {
    assert.ok(source.includes(phrase), `missing clarity phrase: ${phrase}`);
  }
});

test('progress page uses plain-language headings instead of unexplained internal labels', () => {
  const source = read('src/components/progress/PulseSummary.tsx');
  for (const phrase of ['Learning progress', 'Recommended focus', 'Current activity']) {
    assert.ok(source.includes(phrase), `missing plain-language heading: ${phrase}`);
  }
});

test('clarity styles include compact mobile orientation layout', () => {
  const source = read('src/app/awwwards-appwide.css');
  assert.ok(source.includes('.page-orientation'));
  assert.ok(source.includes('@media (max-width: 430px)'));
  assert.ok(source.includes('.page-orientation__journey'));
});
