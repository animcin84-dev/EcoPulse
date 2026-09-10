import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('all seven Topic Labs expose current official science/resource source references', async () => {
  const { topicLabs } = await import('../src/content/topic-labs.ts');
  const { scienceSourcesById } = await import('../src/content/science-sources.ts');
  assert.equal(Object.keys(topicLabs).length, 7);
  for (const lab of Object.values(topicLabs) as Array<any>) {
    assert.ok(Array.isArray(lab.sourceIds) && lab.sourceIds.length >= 1, `${lab.id} should declare a source`);
    for (const sourceId of lab.sourceIds) {
      const source = scienceSourcesById[sourceId];
      assert.ok(source, `${lab.id} source ${sourceId} should resolve`);
      assert.equal(source.lastChecked, '2026-09-10');
      assert.match(source.url, /^https:\/\//);
    }
  }
});

test('Topic Lab renders the shared official source disclosure before its system check', () => {
  const topic = read('../src/components/learning/TopicLab.tsx');
  assert.match(topic, /SourceDisclosure/);
  assert.match(topic, /sourceIds=\{lab\.sourceIds\}/);
  assert.match(topic, /topic-lab__sources/);
  assert.ok(topic.indexOf('topic-lab__sources') < topic.indexOf('<TopicLabSystemCheck'));
});
