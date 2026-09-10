import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const home = readFileSync('src/components/home/HomeTopics.tsx', 'utf8');
const learn = readFileSync('src/components/learning/LearnJourney.tsx', 'utf8');
const lab = readFileSync('src/components/learning/TopicLab.tsx', 'utf8');
const climate = readFileSync('src/components/learning/ClimateChangeModule.tsx', 'utf8');
const css = readFileSync('src/app/awwwards-motion.css', 'utf8');

test('topic cards and their destination hero visual share a named view transition', () => {
  assert.match(home, /viewTransitionName/);
  assert.match(home, /topic-\$\{topic\.id\}/);
  assert.match(learn, /viewTransitionName/);
  assert.match(lab, /viewTransitionName/);
  assert.match(lab, /topic-\$\{lab\.id\}/);
  assert.match(climate, /viewTransitionName: 'topic-climate-change'/);
});

test('motion stylesheet defines a dedicated topic-artifact transition group', () => {
  assert.match(css, /::view-transition-group\(topic-/);
  assert.match(css, /ep-topic-artifact/);
});
