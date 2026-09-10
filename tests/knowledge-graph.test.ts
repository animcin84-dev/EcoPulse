import test from 'node:test';
import assert from 'node:assert/strict';

import { knowledgeGraph } from '../src/content/knowledge-graph.ts';
import type { RelationType } from '../src/domain/content/types.ts';

const supported: RelationType[] = [
  'causes',
  'contributes_to',
  'affects',
  'part_of',
  'related_to',
  'depends_on',
  'example_of',
  'absorbed_by',
];

test('knowledge graph node ids are unique', () => {
  const ids = knowledgeGraph.nodes.map((node) => node.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every knowledge relation references existing nodes and supported semantics', () => {
  const ids = new Set(knowledgeGraph.nodes.map((node) => node.id));
  for (const relation of knowledgeGraph.relations) {
    assert.ok(ids.has(relation.from), `missing source node ${relation.from}`);
    assert.ok(ids.has(relation.to), `missing target node ${relation.to}`);
    assert.ok(supported.includes(relation.type), `unsupported relation type ${relation.type}`);
  }
});

test('high-risk scientific edges preserve non-deterministic wording', () => {
  const droughtRisk = knowledgeGraph.relations.find(
    (relation) => relation.from === 'drought' && relation.to === 'wildfire-risk',
  );
  assert.equal(droughtRisk?.type, 'contributes_to');

  const landIceSeaLevel = knowledgeGraph.relations.find(
    (relation) => relation.from === 'land-ice-melt' && relation.to === 'sea-level',
  );
  assert.equal(landIceSeaLevel?.type, 'contributes_to');
});

import { lessonSequence } from '../src/content/index.ts';

test('every lesson connection endpoint exists in the authored Explore graph', () => {
  const ids = new Set(knowledgeGraph.nodes.map((node) => node.id));
  for (const lesson of lessonSequence) {
    for (const step of lesson.steps) {
      if (step.type !== 'connection') continue;
      for (const relation of step.relations) {
        assert.ok(ids.has(relation.from), `${lesson.slug}: missing graph node ${relation.from}`);
        assert.ok(ids.has(relation.to), `${lesson.slug}: missing graph node ${relation.to}`);
      }
    }
  }
});
