'use client';

import Link from 'next/link';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';

export function HomeWelcome() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].home;

  return (
    <section className="home-welcome" aria-labelledby="home-welcome-title">
      <div className="section-shell home-welcome__grid">
        <div className="home-welcome__intro">
          <div className="home-welcome__mark" aria-hidden="true"><PulseHeart size={34} /></div>
          <p className="eyebrow eyebrow--dark">{copy.welcomeEyebrow.toUpperCase()}</p>
          <h2 id="home-welcome-title">{copy.welcomeTitle}</h2>
          <p className="home-welcome__subtitle">{copy.welcomeSubtitle}</p>
        </div>
        <div className="home-welcome__path">
          {copy.welcomePoints.map((point, index) => (
            <div className="home-welcome__point" key={point}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <strong>{point}</strong>
            </div>
          ))}
          <Link href="/start" className="home-welcome__cta">{copy.welcomeAction}</Link>
        </div>
      </div>
    </section>
  );
}
