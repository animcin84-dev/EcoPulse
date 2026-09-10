import test from 'node:test';
import assert from 'node:assert/strict';

import { knowledgeGraph } from '../src/content/knowledge-graph.ts';
import { scienceSourcesById } from '../src/content/science-sources.ts';
import { reviewItemsById } from '../src/content/review-items.ts';
import { lessonSequence } from '../src/content/index.ts';
import { resolveConceptDetail } from '../src/domain/learning/concept-detail.ts';

test('every authored concept has bilingual description and valid metadata references', () => {
  const lessonSlugs = new Set(lessonSequence.map((lesson) => lesson.slug));
  for (const node of knowledgeGraph.nodes) {
    assert.ok(node.description.en.trim(), `${node.id} needs English description`);
    assert.ok(node.description.kk.trim(), `${node.id} needs Kazakh description`);
    assert.ok(node.sourceIds.length > 0, `${node.id} needs at least one source`);
    for (const sourceId of node.sourceIds) assert.ok(scienceSourcesById[sourceId], `${node.id} has invalid source ${sourceId}`);
    if (node.reviewItemId) assert.ok(reviewItemsById[node.reviewItemId], `${node.id} has invalid review item`);
    if (node.lessonSlug) assert.ok(lessonSlugs.has(node.lessonSlug), `${node.id} has invalid lesson slug`);
  }
});

test('concept detail resolves semantic connections, sources and vocabulary mapping', () => {
  const drought = resolveConceptDetail('drought');
  assert.ok(drought);
  assert.equal(drought.node.label.en, 'Drought');
  assert.equal(drought.reviewItem?.id, 'drought');
  assert.ok(drought.sources.some((source) => source.id === 'usgs-fire-drought'));
  assert.ok(drought.connections.some((connection) => connection.other.id === 'wildfire-risk' && connection.relation.type === 'contributes_to'));
  assert.ok(drought.connections.some((connection) => connection.other.id === 'rainfall'));
});

test('unknown concept detail returns null rather than inventing a node', () => {
  assert.equal(resolveConceptDetail('not-a-real-concept'), null);
});

import { summarizeMasteryEvidence } from '../src/domain/learning/concept-detail.ts';

test('concept mastery transparency exposes evidence categories without converting them to a score', () => {
  const summary = summarizeMasteryEvidence({
    exposures: 2,
    recognition: true,
    recall: false,
    context: true,
    delayedReview: false,
  });
  assert.equal(summary.state, 'LEARNING');
  assert.deepEqual(summary.checks, [
    { id: 'recognition', label: 'Recognize', complete: true },
    { id: 'recall', label: 'Recall', complete: false },
    { id: 'context', label: 'Context', complete: true },
    { id: 'delayedReview', label: 'Delayed review', complete: false },
  ]);
  assert.equal('score' in summary, false);
});
