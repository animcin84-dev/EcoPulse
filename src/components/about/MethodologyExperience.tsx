'use client';

import Link from 'next/link';
import { methodologyCopy, resolveMethodologySnapshot } from '@/domain/learning/methodology';
import { relationLabels } from '@/domain/learning/product-copy';
import { updateLearningSettings } from '@/domain/learning/settings';
import { scienceSources } from '@/content/science-sources';
import { educationalMedia } from '@/content/media-assets';
import { AppNav } from '@/components/navigation/AppNav';
import { PulseHeart } from '@/components/brand/PulseHeart';
import { useGuestProgress } from '@/components/progress/GuestProgressProvider';
import { MethodologyDistributionControls } from './MethodologyDistributionControls';

const relationKeys = ['causes', 'contributes_to', 'affects', 'part_of', 'related_to', 'depends_on', 'example_of', 'absorbed_by'] as const;

function Multiline({ text }: { text: string }) {
  const lines = text.split('\n');
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line.toUpperCase()}{index < lines.length - 1 ? <br /> : null}</span>)}</>;
}

export function MethodologyExperience() {
  const { state, updateState } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = methodologyCopy[locale];
  const snapshot = resolveMethodologySnapshot();

  const setLocale = (preferredLocale: 'en' | 'kk') => {
    updateState((current) => ({
      ...current,
      settings: updateLearningSettings(current.settings, { preferredLocale }),
    }));
  };

  const proof = [
    [snapshot.worlds, copy.proof.worlds],
    [snapshot.lessons, copy.proof.lessons],
    [snapshot.relationTypes, copy.proof.relations],
    [snapshot.scienceSources, copy.proof.sources],
    [snapshot.mediaAssets, copy.proof.media],
  ] as const;

  return (
    <main className="method-page">
      <section className="method-hero" aria-labelledby="method-title">
        <AppNav inverse />
        <div className="section-shell method-hero__grid">
          <div>
            <p className="eyebrow">{copy.hero.eyebrow.toUpperCase()}</p>
            <h1 id="method-title"><Multiline text={copy.hero.title} /></h1>
            <p className="method-hero__lede">{copy.hero.body}</p>
            <div className="method-actions">
              <Link className="button button--pulse" href="/start">{copy.hero.primary}</Link>
              <Link className="text-link" href="/explore">{copy.hero.secondary}</Link>
            </div>
            <MethodologyDistributionControls locale={locale} />
          </div>
          <div className="method-hero__signal" aria-label={locale === 'kk' ? 'EcoPulse оқу жүйесінің белгісі' : 'EcoPulse learning-system signal'}>
            <PulseHeart size={110} labelled />
            <div className="method-locale" aria-label={locale === 'kk' ? 'Интерфейс тілі' : 'Interface language'}>
              {(['en', 'kk'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={locale === option}
                  className={locale === option ? 'method-locale__button method-locale__button--active' : 'method-locale__button'}
                  onClick={() => setLocale(option)}
                >
                  {option === 'en' ? 'EN' : 'ҚАЗ'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="method-proof" aria-labelledby="method-proof-title">
        <div className="section-shell">
          <p className="eyebrow eyebrow--dark" id="method-proof-title">{copy.proof.eyebrow.toUpperCase()}</p>
          <div className="method-proof__rail">
            {proof.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="method-flow" aria-labelledby="method-flow-title">
        <div className="section-shell">
          <div className="method-section-intro">
            <div>
              <p className="eyebrow eyebrow--dark">{copy.flow.eyebrow.toUpperCase()}</p>
              <h2 id="method-flow-title"><Multiline text={copy.flow.title} /></h2>
            </div>
            <p>{copy.flow.body}</p>
          </div>
          <ol className="method-flow__list">
            {copy.flow.stages.map((stage, index) => (
              <li key={stage.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{stage.title.toUpperCase()}</h3>
                <p>{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="method-mastery" aria-labelledby="method-mastery-title">
        <div className="section-shell method-mastery__grid">
          <div>
            <p className="eyebrow">{copy.mastery.eyebrow.toUpperCase()}</p>
            <h2 id="method-mastery-title"><Multiline text={copy.mastery.title} /></h2>
            <p className="method-copy-muted">{copy.mastery.body}</p>
            <p className="method-mastery__note">{copy.mastery.note}</p>
          </div>
          <div className="method-evidence" aria-label={locale === 'kk' ? 'Mastery дәлелдері' : 'Mastery evidence'}>
            {copy.mastery.evidence.map((item, index) => (
              <article key={item.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title.toUpperCase()}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-science" aria-labelledby="method-science-title">
        <div className="section-shell">
          <div className="method-section-intro">
            <div>
              <p className="eyebrow eyebrow--dark">{copy.science.eyebrow.toUpperCase()}</p>
              <h2 id="method-science-title"><Multiline text={copy.science.title} /></h2>
            </div>
            <p>{copy.science.body}</p>
          </div>

          <div className="method-relations" aria-label={locale === 'kk' ? 'Байланыс түрлері' : 'Relationship types'}>
            {relationKeys.map((key) => (
              <span key={key}>{relationLabels[key][locale].toUpperCase()}</span>
            ))}
          </div>

          <div className="method-science__grid">
            <div>
              <h3>{copy.science.sourceTitle.toUpperCase()}</h3>
              <ul className="method-bullet-list">
                {copy.science.sourceItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="method-source-list">
              {scienceSources.map((source) => (
                <article key={source.id}>
                  <div>
                    <span>{source.institution}</span>
                    <strong>{source.title}</strong>
                  </div>
                  <div>
                    <span>{copy.science.checked.toUpperCase()} · {source.lastChecked}</span>
                    <a href={source.url} target="_blank" rel="noreferrer" aria-label={`${locale === 'kk' ? 'Дереккөзді ашу' : 'Open source'}: ${source.institution} — ${source.title}`}>SOURCE ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="method-privacy" aria-labelledby="method-privacy-title">
        <div className="section-shell method-trust-grid">
          <div>
            <p className="eyebrow">{copy.privacy.eyebrow.toUpperCase()}</p>
            <h2 id="method-privacy-title"><Multiline text={copy.privacy.title} /></h2>
            <p className="method-copy-muted">{copy.privacy.body}</p>
          </div>
          <ul className="method-principles">
            {copy.privacy.items.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="method-accessibility" aria-labelledby="method-accessibility-title">
        <div className="section-shell method-trust-grid">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.accessibility.eyebrow.toUpperCase()}</p>
            <h2 id="method-accessibility-title"><Multiline text={copy.accessibility.title} /></h2>
            <p>{copy.accessibility.body}</p>
          </div>
          <ul className="method-principles method-principles--light">
            {copy.accessibility.items.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></li>
            ))}
          </ul>
        </div>

        <div className="section-shell method-media-credits">
          <p className="eyebrow eyebrow--dark">MEDIA / CREDITS</p>
          {educationalMedia.map((asset) => (
            <article key={asset.id}>
              <div>
                <strong>{asset.title}</strong>
                <span>{asset.institution}</span>
              </div>
              <p>{asset.credit}</p>
              <a href={asset.sourcePage} target="_blank" rel="noreferrer" aria-label={`${locale === 'kk' ? 'Медиа дереккөзін ашу' : 'Open media source'}: ${asset.title}`}>SOURCE ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="method-final">
        <div className="section-shell method-final__inner">
          <PulseHeart size={74} labelled />
          <p className="eyebrow">{copy.final.eyebrow.toUpperCase()}</p>
          <h2><Multiline text={copy.final.title} /></h2>
          <p>{copy.final.body}</p>
          <div className="method-actions">
            <Link className="button button--pulse" href="/start">{copy.final.primary}</Link>
            <Link className="text-link" href="/explore">{copy.final.secondary}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
