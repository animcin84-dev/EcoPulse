import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('measured filters support local View Transitions and parent card regions expose transition targets', () => {
  const rail = read('src/components/ui/MeasuredFilterRail.tsx');
  const missions = read('src/components/missions/MissionList.tsx');
  const challenges = read('src/components/challenges/WorldChallengeList.tsx');
  assert.match(rail, /flushSync/);
  assert.match(rail, /startViewTransition/);
  assert.match(rail, /transitionName/);
  assert.match(missions, /mission-list__cards/);
  assert.match(missions, /mission-filter/);
  assert.match(challenges, /challenge-filter/);
});

test('filter transitions animate only mission/challenge content regions', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /data-ui-transition='mission-filter'/);
  assert.match(css, /data-ui-transition='challenge-filter'/);
  assert.match(css, /view-transition-name:\s*filtered-cards/);
  assert.match(css, /::view-transition-new\(filtered-cards\)/);
});
