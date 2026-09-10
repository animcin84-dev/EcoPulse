'use client';

import Link from 'next/link';
import { productCopy } from '@/domain/learning/product-copy';
import { ecoArcadeModes } from '@/content/eco-arcade';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';

function Multiline({ text }: { text: string }) {
  const lines = text.split('\n');
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line.toUpperCase()}{index < lines.length - 1 ? <br /> : null}</span>)}</>;
}

export function HomeStorySections() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].home;

  return (
    <>
      <section className="learning-loop" id="learn" aria-labelledby="learning-loop-title">
        <div className="section-shell">
          <p className="eyebrow eyebrow--dark">{copy.loopEyebrow.toUpperCase()}</p>
          <h2 id="learning-loop-title"><Multiline text={copy.loopTitle} /></h2>
          <div className="learning-loop__grid">
            {copy.loopItems.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title.toUpperCase()}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-arcade-preview" aria-labelledby="home-arcade-preview-title">
        <div className="section-shell home-arcade-preview__grid">
          <div className="home-arcade-preview__copy">
            <p className="eyebrow eyebrow--dark">ECO GAME / 05 MODES</p>
            <h2 id="home-arcade-preview-title">{locale === 'en' ? <>Five practice modes.<br />One connected system.</> : <>Бес жаттығу режимі.<br />Бір байланысқан жүйе.</>}</h2>
            <p>{locale === 'en' ? 'Switch from vocabulary recall to cause-and-effect, decisions, material strategy and system signals — without confusing practice with real mastery.' : 'Сөзді еске түсіруден себеп-салдарға, шешімдерге, материал стратегиясына және жүйелік белгілерге ауыс — жаттығуды негізгі mastery-мен шатастырмай.'}</p>
            <Link className="button button--dark" href="/game">{locale === 'en' ? 'Open Eco Game →' : 'Eco Game ашу →'}</Link>
          </div>
          <div className="home-arcade-preview__modes" aria-label={locale === 'en' ? 'Five Eco Game practice modes' : 'Eco Game бес жаттығу режимі'}>
            {ecoArcadeModes.map((mode) => (
              <article key={mode.id} className={`home-arcade-preview__mode home-arcade-preview__mode--${mode.id}`}>
                <span>{mode.index}</span>
                <div><strong>{mode.label}</strong><p>{mode.title[locale]}</p></div>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="action-section" id="action" aria-labelledby="action-title">
        <div className="section-shell action-section__grid">
          <div>
            <p className="eyebrow">{copy.actionEyebrow.toUpperCase()}</p>
            <h2 id="action-title"><Multiline text={copy.actionTitle} /></h2>
          </div>
          <Link href="/action" className="mission-preview mission-preview--link">
            <span>{copy.waterWatch.toUpperCase()}</span>
            <p>{copy.waterWatchBody}</p>
            <div className="mission-preview__meta"><span>~5 {copy.minutes.toUpperCase()}</span><span>{copy.noPhoto.toUpperCase()}</span><span>{copy.noLocation.toUpperCase()}</span></div>
            <strong className="mission-preview__cta">{locale === 'en' ? 'OPEN ECO ACTION →' : 'ECO ACTION АШУ →'}</strong>
          </Link>
        </div>
      </section>

      <section className="home-final-cta">
        <PulseHeart size={72} labelled />
        <p className="eyebrow">{copy.finalEyebrow.toUpperCase()}</p>
        <h2><Multiline text={copy.finalTitle} /></h2>
        <Link className="button button--pulse" href="/start">{copy.finalAction}</Link>
        <Link className="text-link home-final-cta__method" href="/about">{copy.nav.method} →</Link>
      </section>
    </>
  );
}
