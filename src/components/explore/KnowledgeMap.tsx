'use client';

import Link from 'next/link';
import { knowledgeGraph } from '@/content/knowledge-graph';
import { productCopy, relationLabels } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';

const worldClass: Record<string, string> = {
  earth: 'knowledge-node--earth',
  'ice-water': 'knowledge-node--ice',
  extremes: 'knowledge-node--extremes',
  life: 'knowledge-node--life',
};

export function KnowledgeMap() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const nodeById = new Map(knowledgeGraph.nodes.map((node) => [node.id, node]));

  return (
    <>
      <div className="knowledge-map" aria-hidden="true">
        <svg viewBox="0 0 1000 700" role="presentation">
          <g className="knowledge-map__edges">
            {knowledgeGraph.relations.map((relation) => {
              const from = nodeById.get(relation.from)!;
              const to = nodeById.get(relation.to)!;
              return <line key={`${relation.from}-${relation.to}`} x1={from.x * 10} y1={from.y * 7} x2={to.x * 10} y2={to.y * 7} />;
            })}
          </g>
          <g className="knowledge-map__nodes">
            {knowledgeGraph.nodes.map((node) => (
              <a href={`/concept/${node.id}`} key={node.id} className="knowledge-node-link">
                <g className={`knowledge-node ${worldClass[node.world] ?? ''}`} transform={`translate(${node.x * 10} ${node.y * 7})`}>
                  <circle r="8" />
                  <text x="15" y="5">{node.label[locale].toUpperCase()}</text>
                </g>
              </a>
            ))}
          </g>
        </svg>
      </div>

      <div className="knowledge-list" aria-label={productCopy[locale].concept.semanticConnections}>
        {knowledgeGraph.nodes.map((node) => {
          const connected = knowledgeGraph.relations.filter((relation) => relation.from === node.id || relation.to === node.id);
          return (
            <Link href={`/concept/${node.id}`} key={node.id} className="knowledge-list__link">
              <article>
                <span>{node.world.toUpperCase()}</span>
                <h3>{node.label[locale]}</h3>
                <ul>
                  {connected.slice(0, 4).map((relation) => {
                    const otherId = relation.from === node.id ? relation.to : relation.from;
                    const other = nodeById.get(otherId)!;
                    return <li key={`${relation.from}-${relation.to}`}>{relationLabels[relation.type][locale]} · {other.label[locale]}</li>;
                  })}
                </ul>
              </article>
            </Link>
          );
        })}
      </div>
    </>
  );
}
