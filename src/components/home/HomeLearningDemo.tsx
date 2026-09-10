'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { homeDemo, resolveHomeDemoAttempt, type HomeDemoOutcome } from '@/domain/learning/home-demo';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';

type Locale = 'en' | 'kk';

export function HomeLearningDemo() {
  const { state } = useGuestProgress();
  const [locale, setLocale] = useState<Locale>(state.settings.preferredLocale);
  const copy = productCopy[locale].home;
  const [selected, setSelected] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [outcome, setOutcome] = useState<HomeDemoOutcome | null>(null);

  useEffect(() => { setLocale(state.settings.preferredLocale); }, [state.settings.preferredLocale]);
  const resolved = outcome === 'correct' || outcome === 'reveal';

  function choose(optionId: string) {
    if (resolved) return;
    const nextOutcome = resolveHomeDemoAttempt(homeDemo.correctOptionId, optionId, attempts);
    setSelected(optionId);
    setAttempts((value) => value + 1);
    setOutcome(nextOutcome);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (resolved) return;
      const index = Number(event.key) - 1;
      if (index < 0 || index >= homeDemo.options.length) return;
      const option = homeDemo.options[index];
      if (option) choose(option.id);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [attempts, resolved]);

  const correct = selected === homeDemo.correctOptionId;

  return (
    <section className="home-demo" aria-labelledby="home-demo-title">
      <div className="section-shell home-demo__grid">
        <div className="home-demo__intro">
          <p className="eyebrow eyebrow--dark">{copy.demoEyebrow.toUpperCase()}</p>
          <h2 id="home-demo-title">{copy.demoTitle.split('\n').map((line, index, lines) => <span key={line}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2>
          <p>{copy.demoBody}</p>
          <div className="home-demo__locale" aria-label={copy.demoLanguage}>
            <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
            <button type="button" aria-pressed={locale === 'kk'} onClick={() => setLocale('kk')}>ҚАЗ</button>
          </div>
        </div>

        <div className="home-demo__panel">
          <div className="home-demo__panel-top">
            <span>{copy.liveDemo.toUpperCase()}</span>
            <span>1 / 1</span>
          </div>
          <p className="home-demo__word">{homeDemo.word}</p>
          <h3>{homeDemo.prompt[locale]}</h3>

          <div className="home-demo__answers" role="group" aria-label={homeDemo.prompt[locale]}>
            {homeDemo.options.map((option, index) => {
              const isSelected = selected === option.id;
              const isCorrectOption = option.id === homeDemo.correctOptionId;
              const revealCorrect = outcome === 'reveal' && isCorrectOption;
              const className = [
                'home-demo-answer',
                isSelected && correct ? 'home-demo-answer--correct' : '',
                isSelected && !correct ? 'home-demo-answer--incorrect' : '',
                revealCorrect ? 'home-demo-answer--correct' : '',
              ].filter(Boolean).join(' ');
              return (
                <button key={option.id} type="button" className={className} aria-pressed={isSelected} onClick={() => choose(option.id)} disabled={resolved}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{option.label[locale]}</strong>
                  {revealCorrect && <small>{copy.answer.toUpperCase()}</small>}
                  {isSelected && correct && <small>{copy.correct.toUpperCase()}</small>}
                </button>
              );
            })}
          </div>

          {outcome === 'try_again' && (
            <div className="home-demo__feedback" role="status" aria-live="polite">
              <strong>{locale === 'en' ? 'NOT YET.' : 'ӘЗІР ЕМЕС.'}</strong>
              <p>{homeDemo.hint[locale]}</p>
            </div>
          )}

          {resolved && (
            <div className="home-demo__resolved" role="status" aria-live="polite">
              <div className="home-demo__resolved-title">
                <PulseHeart size={24} />
                <strong>{outcome === 'correct' ? (locale === 'en' ? 'CONNECTION FOUND.' : 'БАЙЛАНЫС ТАБЫЛДЫ.') : (locale === 'en' ? 'ANSWER REVEALED.' : 'ЖАУАП КӨРСЕТІЛДІ.')}</strong>
              </div>
              <p>{homeDemo.explanation[locale]}</p>
              <div className="home-demo__connection" aria-label={locale === 'en' ? 'Glacier connects to melt and sea level' : 'Мұздық еру және теңіз деңгейімен байланысады'}>
                {homeDemo.connection.map((node, index) => (
                  <span key={node}><strong>{node}</strong>{index < homeDemo.connection.length - 1 && <i aria-hidden="true">→</i>}</span>
                ))}
              </div>
              <Link href="/start" className="button button--dark">{locale === 'en' ? 'Continue learning →' : 'Оқуды жалғастыру →'}</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
