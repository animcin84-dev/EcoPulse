import test from 'node:test'; import assert from 'node:assert/strict'; import fs from 'node:fs';
const read=(p:string)=>fs.readFileSync(p,'utf8');
test('Home explains the five product areas before the user has to explore them',()=>{
 const page=read('src/app/page.tsx'); const map=read('src/components/home/HomeProductMap.tsx');
 assert.ok(page.includes('HomeProductMap'));
 for(const phrase of ['Learn new English','Practice what you learned','Test your reasoning','Try a safe real-world action','See progress and what to do next']) assert.ok(map.includes(phrase), phrase);
});
test('Challenges explains Ready Locked Complete states',()=>{
 const source=read('src/components/challenges/WorldChallengeList.tsx');
 for(const phrase of ['Ready = start now','Locked = finish the related lessons first','Complete = already finished']) assert.ok(source.includes(phrase), phrase);
});
