import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
const read=(p:string)=>fs.readFileSync(p,'utf8');
test('challenge runner returns to Challenges while locked state links to required learning',()=>{
 const s=read('src/components/challenges/WorldChallengeExperience.tsx');
 assert.ok(s.includes('href="/challenges"'));
 assert.ok(s.includes('`/learn/${challenge.world}`'));
 assert.ok(s.includes('Open required lessons'));
});
test('lesson header exposes textual step progress in addition to visual dots',()=>{
 const s=read('src/components/lesson/LessonHeader.tsx');
 assert.ok(s.includes('lesson-header__step-text'));
 assert.ok(s.includes('Step ${current + 1} of ${total}'));
});
