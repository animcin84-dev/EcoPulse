'use client';

import Link from 'next/link';
import { resolveConceptDetail, summarizeMasteryEvidence } from '@/domain/learning/concept-detail';
import { productCopy, relationLabels } from '@/domain/learning/product-copy';
import { useGuestProgress } from '@/components/progress/GuestProgressProvider';
import { ContextBreadcrumbs } from '../navigation/ContextBreadcrumbs';

export function ConceptDetailView({ conceptId }: { conceptId: string }) {
  const { state, hydrated } = useGuestProgress();
  const detail = resolveConceptDetail(conceptId);
  if (!detail) return null;

  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].concept;
  const evidence = detail.reviewItem ? state.masteryEvidence[detail.reviewItem.id] : undefined;
  const mastery = summarizeMasteryEvidence(evidence);
  const connected = state.connectedConceptIds.includes(detail.node.id);

  return (
    <>
      <ContextBreadcrumbs ariaLabel={locale === 'en' ? 'Concept location' : 'Ұғым орны'} items={[{ href: '/', label: locale === 'en' ? 'Home' : 'Басты бет' }, { href: '/explore', label: locale === 'en' ? 'Explore' : 'Зерттеу' }, { label: detail.node.label[locale] }]} />
      <section className="concept-hero" aria-labelledby="concept-title">
        <div className="section-shell concept-hero__grid">
          <div>
            <p className="eyebrow">{copy.concept.toUpperCase()} / {detail.node.world.toUpperCase()}</p>
            <h1 id="concept-title">{detail.node.label[locale]}</h1>
          </div>
          <div className="concept-hero__copy">
            <p>{detail.node.description[locale]}</p>
            <span>{(connected ? copy.discovered : copy.notDiscovered).toUpperCase()}</span>
          </div>
        </div>
      </section>

      {detail.reviewItem && (
        <section className="concept-mastery" aria-labelledby="concept-mastery-title">
          <div className="section-shell concept-mastery__grid">
            <div>
              <p className="eyebrow eyebrow--dark">{copy.mastery.toUpperCase()}</p>
              <h2 id="concept-mastery-title">{hydrated ? mastery.state : copy.loading.toUpperCase()}</h2>
              <p>{copy.masteryBody}</p>
            </div>
            <ol className="mastery-evidence-list">
              {mastery.checks.map((check, index) => (
                <li key={check.id} className={check.complete ? 'mastery-evidence--complete' : ''}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{copy.evidenceLabels[check.id]}</strong>
                  <em>{(check.complete ? copy.evidenceFound : copy.stillToProve).toUpperCase()}</em>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="concept-connections" aria-labelledby="concept-connections-title">
        <div className="section-shell">
          <p className="eyebrow">{copy.semanticConnections.toUpperCase()}</p>
          <h2 id="concept-connections-title">{copy.connectionsTitle.split('\n').map((line, index, lines) => <span key={line}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2>
          <div className="concept-connection-list">
            {detail.connections.map(({ relation, other, direction }) => {
              const relationText = relationLabels[relation.type][locale];
              return (
                <Link href={`/concept/${other.id}`} key={`${relation.from}-${relation.to}`} className="concept-connection-row">
                  <span>{direction === 'outgoing' ? '→' : '←'} {relationText}</span>
                  <strong>{other.label[locale]}</strong>
                  <p>{relation.label?.[locale] ?? `${detail.node.label[locale]} ${relationText} ${other.label[locale]}`}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="concept-trust" aria-labelledby="concept-trust-title">
        <div className="section-shell concept-trust__grid">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.sources.toUpperCase()}</p>
            <h2 id="concept-trust-title">{copy.sourceTitle.split('\n').map((line, index, lines) => <span key={line}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2>
          </div>
          <div className="concept-source-list">
            {detail.sources.map((source) => (
              <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
                <span>{source.institution}</span>
                <strong>{source.title}</strong>
                <small>{copy.checked} {source.lastChecked} ↗</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="concept-actions">
        <div className="section-shell concept-actions__grid">
          <div><p className="eyebrow">{copy.nextConnection.toUpperCase()}</p><h2>{copy.keepMoving.split('\n').map((line, index, lines) => <span key={line}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2></div>
          <div className="concept-actions__buttons">
            {detail.node.lessonSlug && <Link href={`/lesson/${detail.node.lessonSlug}`} className="button button--pulse">{copy.openLesson}</Link>}
            {detail.reviewItem && <Link href="/review" className="button button--ghost">{copy.reviewVocabulary}</Link>}
            <Link href="/explore" className="button button--ghost">{copy.backExplore}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
