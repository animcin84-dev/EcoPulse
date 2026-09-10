import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { readPresentationCssBundle } from './css-bundle.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('all seven compact Topic Labs have a three-chapter bilingual reading layer', async () => {
  assert.ok(existsSync(new URL('../src/content/topic-readings.ts', import.meta.url)));
  const { topicReadings } = await import('../src/content/topic-readings.ts');
  assert.equal(Object.keys(topicReadings).length, 7);
  for (const chapters of Object.values(topicReadings) as Array<Array<any>>) {
    assert.equal(chapters.length, 3);
    for (const chapter of chapters) {
      assert.ok(chapter.title.en && chapter.title.kk);
      assert.ok(chapter.body.en.length > 180);
      assert.ok(chapter.body.kk.length > 150);
    }
  }
});

test('Topic Lab renders Reading between briefing and vocabulary and exposes it in the rail', () => {
  const lab = read('../src/components/learning/TopicLab.tsx');
  assert.match(lab, /topicReadings/);
  assert.match(lab, /id="reading"/);
  assert.match(lab, /topic-lab__reading/);
  assert.match(lab, /href="#reading"/);
  const briefing = lab.indexOf('id="briefing"');
  const reading = lab.indexOf('id="reading"');
  const words = lab.indexOf('id="words"');
  assert.ok(briefing >= 0 && reading > briefing && words > reading);
});

test('Topic reading layer has responsive, light and reduced-motion presentation', () => {
  const css = readPresentationCssBundle();
  assert.ok(css.includes('.topic-lab__reading'));
  assert.ok(css.includes('.topic-lab__reading-card'));
  assert.match(css, /@media \(max-width:700px\)[\s\S]*topic-lab__reading/);
  assert.match(css, /html\[data-motion='reduced'\][\s\S]*topic-lab__reading-card/);
});
