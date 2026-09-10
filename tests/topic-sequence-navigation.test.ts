import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('all eight environmental topics share a sequential previous-next navigator', () => {
  assert.ok(existsSync(new URL('../src/components/learning/TopicSequenceNav.tsx', import.meta.url)));
  const nav = read('../src/components/learning/TopicSequenceNav.tsx');
  assert.match(nav, /homeTopics/);
  assert.match(nav, /aria-label/);
  assert.match(nav, /PREVIOUS|АЛДЫҢҒЫ/);
  assert.match(nav, /NEXT TOPIC|КЕЛЕСІ ТАҚЫРЫП/);
  assert.match(nav, /8/);
  assert.match(nav, /role="progressbar"/);
  assert.match(nav, /aria-valuenow=\{index \+ 1\}/);
  assert.match(nav, /aria-valuemax=\{homeTopics\.length\}/);
});

test('flagship Climate and compact Topic Labs both render the shared topic navigator', () => {
  const climate = read('../src/components/learning/ClimateChangeModule.tsx');
  const lab = read('../src/components/learning/TopicLab.tsx');
  assert.match(climate, /<TopicSequenceNav currentId="climate-change"/);
  assert.match(lab, /<TopicSequenceNav currentId=\{lab\.id\}/);
});
