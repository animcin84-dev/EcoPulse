import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('all seven compact Topic Labs have three bilingual reading-check questions', async () => {
  const { topicReadingChecks } = await import('../src/content/topic-readings.ts');
  assert.equal(Object.keys(topicReadingChecks).length, 7);
  for (const questions of Object.values(topicReadingChecks) as Array<Array<any>>) {
    assert.equal(questions.length, 3);
    for (const question of questions) {
      assert.ok(question.prompt.en && question.prompt.kk);
      assert.equal(question.options.length, 3);
      assert.ok(question.correct >= 0 && question.correct <= 2);
      assert.ok(question.explanation.en.length > 45);
      assert.ok(question.explanation.kk.length > 35);
    }
  }
});

test('Topic Lab inserts an interactive Reading Check after reading and counts it as a third honest session signal', () => {
  const lab = read('../src/components/learning/TopicLab.tsx');
  assert.match(lab, /TopicLabReadingCheck/);
  assert.match(lab, /readingPracticeScore/);
  assert.match(lab, /id="reading-check"/);
  assert.match(lab, /href="#reading-check"/);
  assert.match(lab, /completedPracticeSignals === 3/);
  assert.match(lab, /aria-valuemax=\{3\}/);
  assert.match(lab, /READING/);
  assert.match(lab, /canonical mastery and XP|негізгі mastery және XP/i);
  const reading = lab.indexOf('id="reading"');
  const check = lab.indexOf('<TopicLabReadingCheck lab={lab}');
  const words = lab.indexOf('id="words"');
  assert.ok(reading >= 0 && check > reading && words > check);
});

test('Reading Check presentation is responsive, keyboard-oriented and reduced-motion safe', () => {
  const lab = read('../src/components/learning/TopicLab.tsx');
  const css = readPresentationCssBundle();
  assert.match(lab, /KEYS 1–3|1–3 ПЕРНЕЛЕРІ/);
  assert.ok(css.includes('.topic-lab__reading-check'));
  assert.ok(css.includes('.topic-lab__reading-check-option'));
  assert.match(css, /@media \(max-width:700px\)[\s\S]*topic-lab__reading-check/);
  assert.match(css, /html\[data-motion='reduced'\][\s\S]*topic-lab__reading-check-option/);
});
