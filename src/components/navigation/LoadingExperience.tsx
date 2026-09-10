'use client';

import { PulseHeart } from '@/components/brand/PulseHeart';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '@/components/progress/GuestProgressProvider';

export function LoadingExperience() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].error;

  return (
    <main className="runtime-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="runtime-loading__inner">
        <div className="runtime-loading__mark" aria-hidden="true"><PulseHeart size={42} /></div>
        <p className="eyebrow">ECOPULSE / {locale === 'kk' ? 'БАЙЛАНЫС' : 'CONNECTION'}</p>
        <p className="runtime-loading__copy">{copy.loading}</p>
      </div>
    </main>
  );
}
