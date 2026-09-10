'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { WorldChallenge } from '@/domain/content/challenge-types';
import { completeWorldChallengeInGuestState } from '@/domain/learning/guest-state';
import { productCopy } from '@/domain/learning/product-copy';
import { updateLearningSettings } from '@/domain/learning/settings';
import { worldPresentation } from '@/content/lesson-presentation';
import { lessonSequence } from '@/content';
import { isWorldChallengeUnlocked } from '@/domain/learning/curriculum';
import { isReasoningResponseReady } from '@/domain/learning/adaptive-support';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { ChoiceQuestion } from '../lesson/ChoiceQuestion';
import { PulseHeart } from '../brand/PulseHeart';
import { SourceDisclosure } from '../lesson/SourceDisclosure';

export function WorldChallengeExperience({ challenge }: { challenge: WorldChallenge }) {
  const { state, hydrated, updateState } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].challengeRun;
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [awaitingReasoning, setAwaitingReasoning] = useState(false);
  const [reasoning, setReasoning] = useState('');
  const alreadyComplete = state.completedChallengeIds.includes(challenge.slug);
  const unlocked = alreadyComplete || isWorldChallengeUnlocked(challenge.world, lessonSequence, state.lessonProgress);

  function setLocale(nextLocale: 'en' | 'kk') {
    updateState((current) => ({ ...current, settings: updateLearningSettings(current.settings, { preferredLocale: nextLocale }) }));
  }

  const languageControls = (
    <div className="lesson-tools challenge-language" aria-label={copy.languageControls}>
      <button type="button" aria-pressed={locale === 'en'} className={locale === 'en' ? 'language-chip language-chip--active' : 'language-chip'} onClick={() => setLocale('en')}>EN</button>
      <button type="button" aria-pressed={locale === 'kk'} className={locale === 'kk' ? 'language-chip language-chip--active' : 'language-chip'} onClick={() => setLocale('kk')}>ҚАЗ</button>
    </div>
  );

  if (!hydrated) {
    return <main className="challenge-shell challenge-shell--center"><p className="eyebrow">{copy.eyebrow.toUpperCase()}</p><h1>{copy.loading}</h1></main>;
  }

  if (!unlocked) {
    return (
      <main className="challenge-shell challenge-shell--center">
        <p className="eyebrow">{copy.lockedEyebrow.toUpperCase()}</p>
        <h1>{copy.lockedTitle}</h1>
        <p className="challenge-lede">{copy.lockedBody}</p>
        <div className="challenge-actions"><Link href={`/learn/${challenge.world}`} className="button button--pulse">{locale === 'en' ? 'Open required lessons →' : 'Қажетті сабақтарды ашу →'}</Link><Link href="/challenges" className="text-link">{locale === 'en' ? 'Back to Challenges' : 'Challenges-ке оралу'}</Link></div>
      </main>
    );
  }

  if (alreadyComplete || finished) {
    return (
      <main className="challenge-shell challenge-shell--center">
        <PulseHeart size={78} labelled />
        <p className="eyebrow">{copy.connected.toUpperCase()}</p>
        <h1>{challenge.title[locale]}</h1>
        <p className="challenge-lede">{copy.completeBody}</p>
        <div className="challenge-actions"><div className="challenge-actions"><Link href={`/learn/${challenge.world}`} className="button button--pulse">{locale === 'en' ? 'Open required lessons →' : 'Қажетті сабақтарды ашу →'}</Link><Link href="/challenges" className="text-link">{locale === 'en' ? 'Back to Challenges' : 'Challenges-ке оралу'}</Link></div><Link href="/explore" className="text-link">{copy.explore}</Link></div>
      </main>
    );
  }

  if (awaitingReasoning) {
    const ready = isReasoningResponseReady(reasoning);
    return (
      <main className="challenge-shell">
        <header className="challenge-header"><Link href="/challenges">← {locale === 'en' ? 'Challenges' : 'Сынақтар'}</Link><span>{copy.reasoningEyebrow.toUpperCase()}</span><span>{state.xp} XP</span></header>
        {languageControls}
        <section className="challenge-reasoning" aria-labelledby="challenge-reasoning-title">
          <div className="challenge-reasoning__inner">
            <p className="eyebrow eyebrow--dark">{copy.reasoningEyebrow.toUpperCase()}</p>
            <h1 id="challenge-reasoning-title">{copy.reasoningTitle}</h1>
            <p className="challenge-reasoning__prompt">{challenge.reasoningPrompt[locale]}</p>
            <p className="challenge-reasoning__support">{copy.reasoningBody}</p>
            <label className="challenge-reasoning__field">
              <span>{copy.reasoningMinimum}</span>
              <textarea
                lang="en"
                rows={4}
                maxLength={280}
                value={reasoning}
                placeholder={copy.reasoningPlaceholder}
                onChange={(event: { currentTarget: { value: string } }) => setReasoning(event.currentTarget.value)}
              />
              <small aria-live="polite">{ready ? copy.reasoningReady : copy.reasoningMinimum}</small>
            </label>
            <SourceDisclosure sourceIds={challenge.sourceIds} locale={locale} />
            <button
              type="button"
              className="button button--dark"
              disabled={!ready}
              onClick={() => {
                updateState((current) => completeWorldChallengeInGuestState(current, challenge.slug));
                setFinished(true);
                setAwaitingReasoning(false);
              }}
            >
              {copy.completeCheckpoint}
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="challenge-shell challenge-shell--intro">
        <header className="challenge-header"><Link href="/challenges">← {locale === 'en' ? 'Challenges' : 'Сынақтар'}</Link><span>{worldPresentation[challenge.world]?.index ?? challenge.world.toUpperCase()}</span><span>{state.xp} XP</span></header>
        <section className="challenge-intro">
          <p className="eyebrow">{copy.eyebrow.toUpperCase()}</p>
          <h1>{challenge.title[locale]}</h1>
          <p className="challenge-lede">{challenge.intro[locale]}</p>
          <div className="challenge-meta"><span>{challenge.estimatedMinutes} {copy.minutes.toUpperCase()}</span><span>{challenge.questions.length} {copy.decisions.toUpperCase()}</span><span>+{challenge.xp} XP</span></div>
          <button type="button" className="button button--pulse" onClick={() => setStarted(true)}>{copy.begin}</button>
          {languageControls}
        </section>
      </main>
    );
  }

  const question = challenge.questions[index]!;

  function next() {
    if (index < challenge.questions.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    setAwaitingReasoning(true);
  }

  return (
    <main className="challenge-shell">
      <header className="challenge-header"><Link href="/challenges">← {locale === 'en' ? 'Challenges' : 'Сынақтар'}</Link><span>{String(index + 1).padStart(2, '0')} / {String(challenge.questions.length).padStart(2, '0')}</span><span>{state.xp} XP</span></header>
      {languageControls}
      <ChoiceQuestion
        key={question.id}
        label={`${copy.eyebrow.toUpperCase()} / ${String(index + 1).padStart(2, '0')}`}
        prompt={question.prompt}
        options={question.options}
        correctOptionId={question.bestOptionId}
        explanation={question.explanation}
        locale={locale}
        onAttempt={() => {}}
        onContinue={next}
      />
    </main>
  );
}
