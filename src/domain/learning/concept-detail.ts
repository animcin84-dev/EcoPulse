import { knowledgeGraph, type KnowledgeNode } from '../../content/knowledge-graph.ts';
import { resolveScienceSources, type ScienceSource } from '../../content/science-sources.ts';
import { reviewItemsById, type ReviewItem } from '../../content/review-items.ts';
import type { KnowledgeRelation } from '../content/types.ts';
import { computeMasteryState, createMasteryEvidence, type MasteryEvidence } from './mastery.ts';

export type ConceptConnection = {
  relation: KnowledgeRelation;
  other: KnowledgeNode;
  direction: 'outgoing' | 'incoming';
};

export type ConceptDetail = {
  node: KnowledgeNode;
  connections: ConceptConnection[];
  sources: ScienceSource[];
  reviewItem?: ReviewItem;
};

export function resolveConceptDetail(conceptId: string): ConceptDetail | null {
  const node = knowledgeGraph.nodes.find((candidate) => candidate.id === conceptId);
  if (!node) return null;
  const nodeById = new Map(knowledgeGraph.nodes.map((candidate) => [candidate.id, candidate]));
  const connections = knowledgeGraph.relations.flatMap((relation): ConceptConnection[] => {
    if (relation.from === conceptId) {
      const other = nodeById.get(relation.to);
      return other ? [{ relation, other, direction: 'outgoing' }] : [];
    }
    if (relation.to === conceptId) {
      const other = nodeById.get(relation.from);
      return other ? [{ relation, other, direction: 'incoming' }] : [];
    }
    return [];
  });

  return {
    node,
    connections,
    sources: resolveScienceSources(node.sourceIds),
    reviewItem: node.reviewItemId ? reviewItemsById[node.reviewItemId] : undefined,
  };
}


export function summarizeMasteryEvidence(evidence: MasteryEvidence | undefined) {
  const safe = evidence ?? createMasteryEvidence();
  return {
    state: computeMasteryState(safe),
    checks: [
      { id: 'recognition', label: 'Recognize', complete: safe.recognition === true },
      { id: 'recall', label: 'Recall', complete: safe.recall === true },
      { id: 'context', label: 'Context', complete: safe.context === true },
      { id: 'delayedReview', label: 'Delayed review', complete: safe.delayedReview === true },
    ],
  } as const;
}
