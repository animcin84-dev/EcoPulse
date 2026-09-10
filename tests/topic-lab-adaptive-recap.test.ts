import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getTopicLabSessionFocus } from '../src/domain/learning/topic-lab-session.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('Topic Lab session focus points to the weakest normalized practice signal', () => {
  assert.equal(getTopicLabSessionFocus({ reading: 1, words: 4, system: 3 }).id, 'reading');
  assert.equal(getTopicLabSessionFocus({ reading: 3, words: 1, system: 3 }).id, 'words');
  assert.equal(getTopicLabSessionFocus({ reading: 3, words: 4, system: 1 }).id, 'system');
});

test('perfect Topic Lab session advances to Eco Game instead of inventing more remediation', () => {
  const focus = getTopicLabSessionFocus({ reading: 3, words: 4, system: 3 });
  assert.equal(focus.id, 'advance');
  assert.equal(focus.href, '/game');
});

test('Topic Lab recap renders the adaptive next best move without claiming canonical mastery', () => {
  const lab = read('../src/components/learning/TopicLab.tsx');
  assert.match(lab, /getTopicLabSessionFocus/);
  assert.match(lab, /sessionFocus/);
  assert.match(lab, /NEXT BEST MOVE/);
  assert.match(lab, /sessionFocus\.href/);
  assert.match(lab, /canonical mastery and XP|негізгі mastery және XP/i);
});
