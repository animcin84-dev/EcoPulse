import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('compact Topic Labs expose an honest session-only practice pulse and recap', () => {
  const lab = read('../src/components/learning/TopicLab.tsx');
  assert.match(lab, /readingPracticeScore/);
  assert.match(lab, /wordPracticeScore/);
  assert.match(lab, /systemPracticeScore/);
  assert.match(lab, /topic-lab__session-pulse/);
  assert.match(lab, /topic-lab__session-recap/);
  assert.match(lab, /completedPracticeSignals} \/ 03/);
  assert.match(lab, /three practice signals|үш жаттығу сигналы/i);
  assert.match(lab, /canonical mastery|негізгі mastery/i);
});

test('Topic Lab session pulse has responsive and reduced-motion presentation', () => {
  const css = readPresentationCssBundle();
  assert.ok(css.includes('.topic-lab__session-pulse'));
  assert.ok(css.includes('.topic-lab__session-recap'));
  assert.match(css, /html\[data-motion='reduced'\][\s\S]*topic-lab__session-pulse/);
});
