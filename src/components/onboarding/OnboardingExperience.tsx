'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  inferDiagnosticLevel,
  normalizeInterests,
  onboardingInterestIds,
  type LearningLevel,
} from '@/domain/learning/onboarding';
import { updateLearningSettings } from '@/domain/learning/settings';
import { onboardingContent } from '@/content/onboarding';
import { lessonSequence, missions } from '@/content';
import { resolveNextLearningAction } from '@/domain/learning/next-action';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';

type Screen = 'level' | 'diagnostic' | 'interests' | 'result';

function MultilineTitle({ value }: { value: string }) {
  const lines = value.split('\n');
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</>;
}

export function OnboardingExperience() {
  const { state, hydrated, updateState } = useGuestProgress();
  const [screen, setScreen] = useState<Screen>('level');
  const [level, setLevel] = useState<LearningLevel | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [diagnosticIndex, setDiagnosticIndex] = useState(0);
  const [diagnosticResults, setDiagnosticResults] = useState<boolean[]>([]);

  const locale = state.settings.preferredLocale;
  const copy = onboardingContent.copy;
  const diagnostic = onboardingContent.diagnostic;
  const nextAction = resolveNextLearningAction(state, lessonSequence, missions, new Date());

  if (!hydrated) {
    return (
      <main className="onboarding-shell onboarding-shell--loading">
        <PulseHeart size={54} labelled />
        <p className="eyebrow">ECOPULSE / START</p>
        <h1>Finding your<br />starting pulse…</h1>
      </main>
    );
  }

  if (state.onboarding.completed) {
    return (
      <main className="onboarding-shell onboarding-shell--returning">
        <PulseHeart size={72} labelled />
        <p className="eyebrow">{locale === 'en' ? 'WELCOME BACK' : 'ҚАЙТА ОРАЛДЫҢЫЗ'}</p>
        <h1>{locale === 'en' ? <>Your next<br />pulse is ready.</> : <>Келесі<br />қадам дайын.</>}</h1>
        <p className="onboarding-lede">{locale === 'en' ? `Level ${state.onboarding.level ?? 'B1'} · next: ${nextAction.title.en}.` : `Деңгей ${state.onboarding.level ?? 'B1'} · келесі қадам: ${nextAction.title.kk}.`}</p>
        <Link href={nextAction.href} className="button button--pulse">{locale === 'en' ? 'Start next pulse →' : 'Келесі қадамды бастау →'}</Link>
        <Link href="/" className="text-link">{locale === 'en' ? 'Back home' : 'Басты бетке'}</Link>
      </main>
    );
  }

  function setLocale(nextLocale: 'en' | 'kk') {
    updateState((current) => ({
      ...current,
      settings: updateLearningSettings(current.settings, { preferredLocale: nextLocale }),
    }));
  }

  function chooseLevel(choice: LearningLevel | 'not-sure') {
    if (choice === 'not-sure') {
      setDiagnosticIndex(0);
      setDiagnosticResults([]);
      setScreen('diagnostic');
      return;
    }
    setLevel(choice);
    setScreen('interests');
  }

  function answerDiagnostic(optionIndex: number) {
    const question = diagnostic[diagnosticIndex]!;
    const nextResults = [...diagnosticResults, optionIndex === question.correct];
    setDiagnosticResults(nextResults);
    if (diagnosticIndex === diagnostic.length - 1) {
      setLevel(inferDiagnosticLevel(nextResults));
      setScreen('interests');
      return;
    }
    setDiagnosticIndex((value) => value + 1);
  }

  function toggleInterest(id: string) {
    setInterests((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function finishOnboarding() {
    const finalLevel = level ?? 'B1';
    updateState((current) => ({
      ...current,
      onboarding: {
        completed: true,
        level: finalLevel,
        supportLanguage: 'kk',
        interests: normalizeInterests(interests.length ? interests : onboardingInterestIds),
      },
    }));
  }

  const progressText = screen === 'level'
    ? '01 / 03'
    : screen === 'diagnostic'
      ? `${locale === 'en' ? 'CHECK' : 'ТЕКСЕРУ'} ${diagnosticIndex + 1} / ${diagnostic.length}`
      : screen === 'interests'
        ? '02 / 03'
        : '03 / 03';

  return (
    <main className="onboarding-shell">
      <header className="onboarding-header">
        <Link href="/" className="brand-lockup" aria-label={locale === 'en' ? 'EcoPulse home' : 'EcoPulse басты беті'}><span>EcoPulse</span><PulseHeart size={22} /></Link>
        <div className="onboarding-header__tools">
          <span>{progressText}</span>
          <div className="onboarding-language" aria-label={copy.languageLabel[locale]}>
            <button type="button" aria-pressed={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
            <button type="button" aria-pressed={locale === 'kk'} onClick={() => setLocale('kk')}>ҚАЗ</button>
          </div>
        </div>
      </header>

      {screen === 'level' && (
        <section className="onboarding-panel" aria-labelledby="onboarding-level-title">
          <p className="eyebrow">{copy.levelEyebrow[locale]}</p>
          <h1 id="onboarding-level-title"><MultilineTitle value={copy.levelTitle[locale]} /></h1>
          <div className="onboarding-options">
            {onboardingContent.levelOptions.map((option) => (
              <button type="button" key={option.id} onClick={() => chooseLevel(option.id)}>
                <span>{option.id === 'not-sure' ? 'AUTO' : option.id}</span>
                <strong>{option.title[locale]}</strong>
                <small>{option.detail[locale]}</small>
              </button>
            ))}
          </div>
        </section>
      )}

      {screen === 'diagnostic' && (
        <section className="onboarding-panel onboarding-panel--narrow" aria-labelledby="diagnostic-title">
          <p className="eyebrow">{copy.diagnosticEyebrow[locale]}</p>
          <h1 id="diagnostic-title">{diagnostic[diagnosticIndex]!.prompt[locale]}</h1>
          <div className="onboarding-answer-list">
            {diagnostic[diagnosticIndex]!.options.map((option, index) => (
              <button type="button" key={`${diagnosticIndex}-${index}`} onClick={() => answerDiagnostic(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span><b lang="en">{option.en}</b>
              </button>
            ))}
          </div>
          <p className="onboarding-note">{copy.diagnosticNote[locale]}</p>
        </section>
      )}

      {screen === 'interests' && (
        <section className="onboarding-panel" aria-labelledby="interests-title">
          <p className="eyebrow">{copy.interestsEyebrow[locale]}</p>
          <h1 id="interests-title"><MultilineTitle value={copy.interestsTitle[locale]} /></h1>
          <div className="interest-grid">
            {onboardingInterestIds.map((id, index) => {
              const active = interests.includes(id);
              return (
                <button type="button" className={active ? 'interest-option interest-option--active' : 'interest-option'} key={id} onClick={() => toggleInterest(id)} aria-pressed={active}>
                  <span>{String(index + 1).padStart(2, '0')}</span><strong>{onboardingContent.interestLabels[id][locale]}</strong>
                </button>
              );
            })}
          </div>
          <div className="onboarding-actions">
            <button type="button" className="button button--pulse" onClick={() => setScreen('result')}>{interests.length ? copy.continue[locale] : copy.everything[locale]}</button>
            <button type="button" className="text-button" onClick={() => setScreen('level')}>{copy.changeLevel[locale]}</button>
          </div>
        </section>
      )}

      {screen === 'result' && (
        <section className="onboarding-panel onboarding-panel--result" aria-labelledby="result-title">
          <PulseHeart size={82} labelled />
          <p className="eyebrow">{copy.resultEyebrow[locale]}</p>
          <h1 id="result-title">{level ?? 'B1'}<br /><span>{level === 'A2' ? 'SEED' : level === 'B2' ? 'IMPACT' : 'GROW'}</span></h1>
          <p className="onboarding-lede">{copy.resultLede[locale]}</p>
          <Link href="/lesson/atmosphere" className="button button--pulse" onClick={finishOnboarding}>{copy.startEarth[locale]}</Link>
        </section>
      )}
    </main>
  );
}
