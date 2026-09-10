import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path: string) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Action and Challenge filters share one measured physical pill rail', () => {
  const shared = read('src/components/ui/MeasuredFilterRail.tsx');
  const missions = read('src/components/missions/MissionList.tsx');
  const challenges = read('src/components/challenges/WorldChallengeList.tsx');
  assert.match(shared, /ResizeObserver/);
  assert.match(shared, /--filter-glider-x/);
  assert.match(shared, /--filter-glider-width/);
  assert.match(shared, /measured-filter-rail__glider/);
  assert.match(missions, /MeasuredFilterRail/);
  assert.match(challenges, /MeasuredFilterRail/);
});

test('shared filter rail is styled as one quiet control and collapses cleanly on mobile', () => {
  const css = read('src/app/awwwards-appwide.css');
  assert.match(css, /\.measured-filter-rail__glider/);
  assert.match(css, /--filter-glider-x/);
  assert.match(css, /--filter-glider-width/);
  assert.match(css, /@media \(max-width: 430px\)[\s\S]*measured-filter-rail/);
});
