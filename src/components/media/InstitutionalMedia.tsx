'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { EducationalMediaAsset } from '@/content/media-assets';
import { useGuestProgress } from '@/components/progress/GuestProgressProvider';
import { shouldLoadInstitutionalMedia } from '@/domain/learning/media-preference';
import type { PreferredLocale } from '@/domain/learning/settings';

export function InstitutionalMedia({
  asset,
  locale,
  fallback,
  loading = 'lazy',
  decorative = false,
  className = '',
}: {
  asset: EducationalMediaAsset;
  locale: PreferredLocale;
  fallback: ReactNode;
  loading?: 'eager' | 'lazy';
  decorative?: boolean;
  className?: string;
}) {
  const { state, hydrated } = useGuestProgress();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [browserSaveData, setBrowserSaveData] = useState<boolean | null>(null);

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        addEventListener?: (type: 'change', listener: () => void) => void;
        removeEventListener?: (type: 'change', listener: () => void) => void;
      };
    }).connection;

    const sync = () => setBrowserSaveData(connection?.saveData === true);
    sync();
    connection?.addEventListener?.('change', sync);
    return () => connection?.removeEventListener?.('change', sync);
  }, []);

  const shouldLoad = hydrated && shouldLoadInstitutionalMedia(state.settings.media, browserSaveData);
  const dataSaving = hydrated && !shouldLoad && (state.settings.media === 'reduced' || browserSaveData === true);

  return (
    <figure className={`institutional-media ${className}`.trim()}>
      <div className="institutional-media__fallback" aria-hidden={loaded && shouldLoad}>
        {fallback}
      </div>
      {shouldLoad && !failed && (
        <img
          className={loaded ? 'institutional-media__image institutional-media__image--loaded' : 'institutional-media__image'}
          src={asset.renderSrc}
          width={asset.width}
          height={asset.height}
          alt={decorative ? '' : asset.alt[locale]}
          aria-hidden={decorative || !loaded}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {loaded && shouldLoad ? (
        <figcaption className="institutional-media__credit">
          <span className="institutional-media__credit-copy">
            <span>{asset.credit}</span>
            {asset.visualNote ? (
              <span className="institutional-media__visual-note" lang={locale === 'kk' ? 'kk' : 'en'}>
                {asset.visualNote[locale]}
              </span>
            ) : null}
          </span>
          <a href={asset.sourcePage} target="_blank" rel="noreferrer">
            {locale === 'en' ? 'NASA source ↗' : 'NASA дереккөзі ↗'}
          </a>
        </figcaption>
      ) : dataSaving ? (
        <figcaption className="institutional-media__data-saving">
          {locale === 'en' ? 'DATA-SAVING · AUTHORED DIAGRAM' : 'ДЕРЕКТІ ҮНЕМДЕУ · АВТОРЛЫҚ ДИАГРАММА'}
        </figcaption>
      ) : failed ? (
        <figcaption className="institutional-media__data-saving">
          {locale === 'en' ? 'IMAGE UNAVAILABLE · DIAGRAM SHOWN' : 'КЕСКІН ҚОЛЖЕТІМСІЗ · ДИАГРАММА КӨРСЕТІЛДІ'}
        </figcaption>
      ) : null}
    </figure>
  );
}
