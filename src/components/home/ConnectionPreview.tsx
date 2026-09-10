'use client';

import Link from 'next/link';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';

const nodes = ['GLACIER', 'MELT', 'SEA LEVEL'];

export function ConnectionPreview() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].home;
  const titleLines = copy.connectionTitle.split('\n');

  return (
    <section className="connection-preview" id="connections" aria-labelledby="connection-title">
      <div className="section-shell connection-preview__intro">
        <p className="eyebrow eyebrow--dark">{copy.connectionEyebrow.toUpperCase()}</p>
        <h2 id="connection-title">{titleLines.map((line, index) => <span key={line}>{line}{index < titleLines.length - 1 ? <br /> : null}</span>)}</h2>
        <p>{copy.connectionBody}</p>
      </div>
      <div className="connection-preview__chain" aria-label={locale === 'en' ? 'Glacier connects to melt and sea level' : 'Мұздық еру және теңіз деңгейімен байланысады'}>
        {nodes.map((node, index) => (
          <div className="connection-preview__node-wrap" key={node}>
            <span className="connection-preview__node" lang="en">{node}</span>
            {index < nodes.length - 1 && <span className="connection-preview__line" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="section-shell connection-preview__cta">
        <p>{copy.connectionCta}</p>
        <Link href="/start" className="text-link text-link--dark">{copy.firstLesson}</Link>
      </div>
    </section>
  );
}
