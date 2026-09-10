import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=(p:string)=>fs.readFileSync(p,'utf8');

test('detail experiences expose a shared breadcrumb trail',()=>{
  for (const file of [
    'src/components/learning/TopicLab.tsx',
    'src/components/learning/ClimateChangeModule.tsx',
    'src/components/learning/WorldExperience.tsx',
    'src/components/missions/MissionExperience.tsx',
    'src/components/explore/ConceptDetailView.tsx',
  ]) assert.ok(read(file).includes('ContextBreadcrumbs'), `${file} missing ContextBreadcrumbs`);
});

test('topic and world UI uses plain language for progress and checks',()=>{
  const topic=read('src/components/learning/TopicLab.tsx');
  const world=read('src/components/learning/WorldExperience.tsx');
  for (const phrase of ['SESSION PROGRESS','KEY IDEAS','CONNECTION CHECK']) assert.ok(topic.includes(phrase), phrase);
  for (const phrase of ['YOUR PROGRESS','LESSONS COMPLETE','REASONING CHALLENGE']) assert.ok(world.includes(phrase), phrase);
});

test('breadcrumb system has a compact mobile presentation',()=>{
  const css=read('src/app/awwwards-appwide.css');
  assert.ok(css.includes('.context-breadcrumbs'));
  assert.ok(css.includes('.context-breadcrumbs__current'));
});
