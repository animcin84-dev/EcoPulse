'use client';

import { useState } from 'react';
import { methodologySharePayload } from '@/domain/learning/methodology-sharing';
import type { PreferredLocale } from '@/domain/learning/settings';

const copy = {
  en: {
    print: 'Print / Save PDF',
    share: 'Share method',
    copied: 'Link copied.',
    shared: 'Share sheet opened.',
    fallback: 'Could not share automatically. Copy the page address from your browser.',
    controls: 'Methodology document controls',
  },
  kk: {
    print: 'Басып шығару / PDF сақтау',
    share: 'Әдісті бөлісу',
    copied: 'Сілтеме көшірілді.',
    shared: 'Бөлісу терезесі ашылды.',
    fallback: 'Автоматты бөлісу мүмкін болмады. Браузердегі бет мекенжайын көшір.',
    controls: 'Әдістеме құжатының басқару элементтері',
  },
} as const;

export function MethodologyDistributionControls({ locale }: { locale: PreferredLocale }) {
  const [status, setStatus] = useState('');
  const labels = copy[locale];

  const share = async () => {
    const payload = methodologySharePayload(locale, window.location.href);
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setStatus(labels.shared);
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(payload.url);
        setStatus(labels.copied);
        return;
      }
      setStatus(labels.fallback);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setStatus(labels.fallback);
    }
  };

  return (
    <div className="method-distribution-controls" aria-label={labels.controls}>
      <button type="button" onClick={() => window.print()}>{labels.print}</button>
      <button type="button" onClick={share}>{labels.share}</button>
      <span className="method-distribution-controls__status" role="status" aria-live="polite">{status}</span>
    </div>
  );
}
