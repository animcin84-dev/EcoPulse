'use client';

import Link from 'next/link';
import { PulseHeart } from '@/components/brand/PulseHeart';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '@/components/progress/GuestProgressProvider';

export function ErrorExperience({ reset }: { reset: () => void }) {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].error;
  const lines = copy.title.split('\n');

  return (
    <main className="not-found-page not-found-page--error">
      <Link href="/" className="brand-lockup" aria-label={copy.home}>
        <span>EcoPulse</span>
        <PulseHeart size={22} />
      </Link>

      <section className="not-found-page__content" aria-labelledby="runtime-error-title" role="alert">
        <div className="not-found-page__mark" aria-hidden="true"><PulseHeart size={58} /></div>
        <p className="eyebrow">{copy.eyebrow.toUpperCase()}</p>
        <h1 id="runtime-error-title">
          {lines.map((line, index) => (
            <span key={line}>{line.toUpperCase()}{index < lines.length - 1 ? <br /> : null}</span>
          ))}
        </h1>
        <p>{copy.body}</p>
        <div className="not-found-page__actions">
          <button type="button" className="button button--pulse" onClick={reset}>{copy.retry}</button>
          <Link href="/" className="text-link">{copy.home}</Link>
        </div>
      </section>
    </main>
  );
}
