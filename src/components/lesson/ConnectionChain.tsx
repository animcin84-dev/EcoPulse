import type { ConnectionStep } from '@/domain/content/types';
import { knowledgeGraph } from '@/content/knowledge-graph';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

function nodeLabel(id: string, locale: 'en' | 'kk') {
  return knowledgeGraph.nodes.find((node) => node.id === id)?.label[locale] ?? id.replaceAll('-', ' ');
}

export function ConnectionChain({ step, locale, onContinue }: { step: ConnectionStep; locale: 'en' | 'kk'; onContinue: () => void }) {
  const copy = lessonUiCopy[locale];
  const ordered: string[] = [];
  for (const relation of step.relations) {
    if (!ordered.includes(relation.from)) ordered.push(relation.from);
    if (!ordered.includes(relation.to)) ordered.push(relation.to);
  }

  return (
    <section className="lesson-stage lesson-stage--connection" aria-labelledby="connection-stage-title">
      <div className="lesson-stage__inner lesson-stage__inner--connection">
        <p className="eyebrow">{copy.connection.eyebrow.toUpperCase()}</p>
        <h1 id="connection-stage-title">{step.title[locale]}</h1>
        <div className="lesson-connection-chain" role="list" aria-label={copy.connection.chainLabel}>
          {ordered.map((node, index) => (
            <div role="listitem" className="lesson-connection-chain__item" key={node}>
              <span>{nodeLabel(node, locale).toUpperCase()}</span>
              {index < ordered.length - 1 && <span className="lesson-connection-chain__pulse" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <div className="relation-notes" aria-label={copy.connection.meaningsLabel}>
          {step.relations.map((relation) => (
            <span key={`${relation.from}-${relation.to}`}>{relation.label?.[locale] ?? relation.type.replaceAll('_', ' ')}</span>
          ))}
        </div>
        {step.body && <p className="lesson-stage__explanation">{step.body[locale]}</p>}
        <button type="button" className="button button--pulse" onClick={onContinue}>{copy.common.continue}</button>
      </div>
    </section>
  );
}
