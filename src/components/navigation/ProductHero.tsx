'use client';

import type { CSSProperties } from 'react';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';

export function ProductHero({ kind }: { kind: 'explore' | 'challenges' }) {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale][kind];
  const lines = copy.title.split('\n');
  const kk = locale === 'kk';

  return (
    <section className={kind === 'explore' ? 'explore-hero product-hero' : 'challenges-hero product-hero'}>
      <div className="section-shell product-hero__grid">
        <div className="product-hero__copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{lines.map((line, index) => <span key={`${kind}-${line}`}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h1>
          <p>{copy.body}</p>
        </div>

        {kind === 'explore' ? (
          <div
            className="product-hero__artifact product-hero__artifact--explore"
            data-motion-depth="0.8"
            aria-hidden="true"
            style={{ viewTransitionName: 'ecopulse-explore-artifact' } as CSSProperties}
          >
            <div className="product-hero__artifact-head"><span>{kk ? 'Жүйе картасы' : 'System map'}</span><strong>22</strong></div>
            <div className="product-hero__nodes">
              <i className="product-hero__node product-hero__node--a" />
              <i className="product-hero__node product-hero__node--b" />
              <i className="product-hero__node product-hero__node--c" />
              <i className="product-hero__node product-hero__node--d" />
              <i className="product-hero__node product-hero__node--e" />
              <b className="product-hero__line product-hero__line--a" />
              <b className="product-hero__line product-hero__line--b" />
              <b className="product-hero__line product-hero__line--c" />
              <b className="product-hero__line product-hero__line--d" />
            </div>
            <p>{kk ? 'Ұғымдар арасындағы байланыстар' : 'Connections between concepts'}</p>
          </div>
        ) : (
          <div
            className="product-hero__artifact product-hero__artifact--challenge"
            data-motion-depth="0.8"
            aria-hidden="true"
            style={{ viewTransitionName: 'ecopulse-challenge-artifact' } as CSSProperties}
          >
            <div className="product-hero__artifact-head"><span>{kk ? 'Бақылау нүктелері' : 'Checkpoints'}</span><strong>4</strong></div>
            <div className="product-hero__checkpoint-list">
              {[0, 1, 2, 3].map((index) => (
                <span className="product-hero__checkpoint" key={index}>
                  <i />
                  <b>{String(index + 1).padStart(2, '0')}</b>
                </span>
              ))}
            </div>
            <p>{kk ? 'Оқу → дәлел → пайымдау' : 'Learn → evidence → reasoning'}</p>
          </div>
        )}
      </div>
    </section>
  );
}
