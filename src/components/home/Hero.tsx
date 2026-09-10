'use client';

import Link from 'next/link';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { AppNav } from '../navigation/AppNav';
import { EarthLimb } from './EarthLimb';

export function Hero() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].home;
  const titleLines = copy.heroTitle.split('\n');
  const kk = locale === 'kk';

  return (
    <section className="home-hero home-hero--sunlit home-hero--editorial" aria-labelledby="home-title">
      <div className="home-hero__wash" aria-hidden="true" />
      <AppNav />

      <div className="home-hero__editorial-copy">
        <p className="eyebrow eyebrow--dark home-hero__eyebrow">{copy.heroEyebrow}</p>
        <span className="home-hero__pulse-signature" aria-hidden="true"><i /><b /></span>
        <h1 id="home-title">
          {titleLines.map((line, index) => (
            <span className={`home-hero__title-line home-hero__title-line--${index + 1}`} key={`${line}-${index}`}>
              <i>{line}</i>
            </span>
          ))}
        </h1>
        <p className="home-hero__lede">{copy.heroBody}</p>
        <div className="home-hero__actions">
          <Link className="button button--dark button--hero" href="/start" data-magnetic>{copy.heroStart}</Link>
          <Link className="button button--ghost button--hero" href="/game" data-magnetic>{copy.heroSystem}</Link>
        </div>
      </div>

      <div className="home-hero__artifact-stage" aria-label={kk ? 'EcoPulse өнім мүмкіндіктері' : 'EcoPulse product capabilities'}>
        <article className="home-artifact home-artifact--topics" data-motion-depth="0.7">
          <div className="home-artifact__head"><span>{kk ? 'Тақырыптар' : 'Topics'}</span><strong>8</strong></div>
          <div className="home-artifact__topic-list"><span>Climate</span><span>Oceans</span><span>Energy</span><span>Nature</span></div>
          <p>{kk ? 'Бір-бірімен байланысқан экологиялық ағылшын.' : 'Connected environmental English.'}</p>
        </article>

        <article className="home-artifact home-artifact--arcade" data-motion-depth="0.9">
          <span>{kk ? 'Eco Game' : 'Eco Game'}</span>
          <div className="home-artifact__ring"><strong>5</strong><small>{kk ? 'режим' : 'modes'}</small></div>
          <p>{kk ? 'Сөздік · жүйе · шешім' : 'Words · systems · decisions'}</p>
        </article>

        <article className="home-artifact home-artifact--language" data-motion-depth="0.5">
          <span>{kk ? 'Тіл' : 'Language'}</span>
          <strong>EN + ҚАЗ</strong>
          <div className="home-artifact__bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <p>{kk ? 'Оқу, тыңдау және еске түсіру.' : 'Read, listen and recall.'}</p>
        </article>

        <article className="home-artifact home-artifact--access" data-motion-depth="0.65">
          <span>{kk ? 'Қолжетім' : 'Access'}</span>
          <strong>0</strong>
          <p>{kk ? 'Бастау үшін міндетті аккаунт жоқ.' : 'Required accounts to begin.'}</p>
          <Link href="/start">{kk ? 'Қазір бастау' : 'Start now'} →</Link>
        </article>

        <div className="home-artifact home-artifact--earth" data-motion-depth="1" aria-label={kk ? 'Атмосфералық көрініс' : 'Atmosphere visual'}>
          <EarthLimb locale={locale} />
        </div>
      </div>

      <div className="home-hero__footer" aria-hidden="true">
        <span>EcoPulse / EN + ҚАЗ</span>
        <span>{copy.scroll} ↓</span>
      </div>
    </section>
  );
}
