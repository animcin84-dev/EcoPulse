'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { lessonSequence } from '@/content';
import { worldChallenges } from '@/content/world-challenges';
import { isWorldChallengeUnlocked } from '@/domain/learning/curriculum';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { MeasuredFilterRail } from '../ui/MeasuredFilterRail';

type ChallengeFilter = 'all' | 'ready' | 'locked';

export function WorldChallengeList() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const [filter, setFilter] = useState<ChallengeFilter>('all');

  const entries = useMemo(() => worldChallenges.map((challenge, index) => {
    const complete = state.completedChallengeIds.includes(challenge.slug);
    const unlocked = complete || isWorldChallengeUnlocked(challenge.world, lessonSequence, state.lessonProgress);
    return { challenge, index, complete, unlocked };
  }), [state.completedChallengeIds, state.lessonProgress]);

  const completedCount = entries.filter((entry) => entry.complete).length;
  const readyCount = entries.filter((entry) => entry.unlocked).length;
  const progress = Math.round((completedCount / worldChallenges.length) * 100);
  const nextCheckpoint = entries.find((entry) => entry.unlocked && !entry.complete) ?? entries.find((entry) => !entry.complete) ?? null;
  const visibleChallenges = entries.filter((entry) => {
    if (filter === 'ready') return entry.unlocked && !entry.complete;
    if (filter === 'locked') return !entry.unlocked;
    return true;
  });

  return (
    <div className="world-challenge-list">
      <div className="world-challenge-list__progress">
        <div><span>{locale === 'en' ? 'CHALLENGE PROGRESS' : 'CHECKPOINT КАРТАСЫ'}</span><strong>{completedCount}/{worldChallenges.length}</strong></div>
        <div className="world-challenge-list__progress-track" role="progressbar" aria-label={locale === 'en' ? 'Completed world checkpoints' : 'Аяқталған world checkpoint'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><i style={{ width: `${progress}%` }} /></div>
        <p>{locale === 'en' ? `${readyCount} of ${worldChallenges.length} checkpoints are currently ready or already connected. Finish each world’s lessons to unlock its reasoning checkpoint.` : `${worldChallenges.length} checkpoint ішінен ${readyCount} қазір ашық немесе аяқталған. Әр world checkpoint-ін ашу үшін сол әлемнің сабақтарын аяқта.`}</p>
      </div>

      <div className="world-challenge-list__status-key" aria-label={locale === 'en' ? 'Challenge status guide' : 'Challenge күйінің түсіндірмесі'}>
        <span><strong>{locale === 'en' ? 'Ready' : 'Дайын'}</strong>{locale === 'en' ? 'Ready = start now' : 'Дайын = қазір бастауға болады'}</span>
        <span><strong>{locale === 'en' ? 'Locked' : 'Жабық'}</strong>{locale === 'en' ? 'Locked = finish the related lessons first' : 'Жабық = алдымен байланысты сабақтарды аяқта'}</span>
        <span><strong>{locale === 'en' ? 'Complete' : 'Аяқталды'}</strong>{locale === 'en' ? 'Complete = already finished' : 'Аяқталды = бұрын біткен'}</span>
      </div>

      <div className="world-challenge-list__control-deck">
        <article className="world-challenge-list__next">
          <span>{locale === 'en' ? 'NEXT CHALLENGE' : 'КЕЛЕСІ CHECKPOINT'}</span>
          {nextCheckpoint ? <>
            <strong>{nextCheckpoint.challenge.title[locale]}</strong>
            <p>{nextCheckpoint.unlocked ? (locale === 'en' ? 'Ready now — test the connections you built in this world.' : 'Қазір дайын — осы әлемдегі байланыстарды тексер.') : (locale === 'en' ? 'Locked for now — complete this world’s lessons first.' : 'Әзірге жабық — алдымен осы әлемнің сабақтарын аяқта.')}</p>
            <Link href={nextCheckpoint.unlocked ? `/challenge/${nextCheckpoint.challenge.slug}` : `/learn/${nextCheckpoint.challenge.world}`}>{nextCheckpoint.unlocked ? (locale === 'en' ? 'START CHALLENGE →' : 'CHECKPOINT-КЕ КІР →') : (locale === 'en' ? 'OPEN WORLD →' : 'WORLD АШУ →')}</Link>
          </> : <><strong>{locale === 'en' ? 'All checkpoints connected.' : 'Барлық checkpoint аяқталды.'}</strong><p>{locale === 'en' ? 'Use Review or Explore to strengthen and connect what you learned.' : 'Үйренгеніңді нығайту үшін Review немесе Explore қолдан.'}</p><Link href="/review">{locale === 'en' ? 'OPEN REVIEW →' : 'REVIEW АШУ →'}</Link></>}
        </article>

        <MeasuredFilterRail<ChallengeFilter>
          className="world-challenge-list__filters"
          ariaLabel={locale === 'en' ? 'Filter checkpoints' : 'Checkpoint сүзгісі'}
          label={locale === 'en' ? 'QUEUE' : 'КЕЗЕК'}
          value={filter}
          onChange={setFilter}
          transitionName="challenge-filter"
          options={[
            { value: 'all', label: locale === 'en' ? 'ALL' : 'БАРЛЫҒЫ' },
            { value: 'ready', label: locale === 'en' ? 'READY' : 'ДАЙЫН' },
            { value: 'locked', label: locale === 'en' ? 'LOCKED' : 'ЖАБЫҚ' },
          ]}
        />
      </div>

      <div className="world-challenge-list__cards" aria-live="polite">
        {visibleChallenges.length === 0 ? <p className="world-challenge-list__empty">{locale === 'en' ? 'No checkpoints in this queue.' : 'Бұл кезекте checkpoint жоқ.'}</p> : null}
        {visibleChallenges.map(({ challenge, index, complete, unlocked }) => (
          <article className={complete ? 'world-challenge-card world-challenge-card--complete' : unlocked ? 'world-challenge-card world-challenge-card--ready' : 'world-challenge-card world-challenge-card--locked'} key={challenge.slug}>
            <div className="world-challenge-card__index">{String(index + 1).padStart(2, '0')}</div>
            <div className="world-challenge-card__content">
              <span className="world-challenge-card__status">{complete ? (locale === 'en' ? 'Complete' : 'Байланысты') : unlocked ? (locale === 'en' ? 'Ready' : 'Дайын') : (locale === 'en' ? 'Locked' : 'Жабық')}</span>
              <h2>{challenge.title[locale]}</h2>
              <p>{challenge.intro[locale]}</p>
              <div className="world-challenge-card__meta"><span>~{challenge.estimatedMinutes} {locale === 'en' ? 'MIN' : 'МИН'}</span><span>{challenge.questions.length} {locale === 'en' ? 'DECISIONS' : 'ШЕШІМ'}</span><span>+{challenge.xp} XP</span></div>
            </div>
            <div className="world-challenge-card__action">
              {unlocked ? <Link href={`/challenge/${challenge.slug}`}>{complete ? (locale === 'en' ? 'Review →' : 'Қайталау →') : (locale === 'en' ? 'Enter →' : 'Кіру →')}</Link> : <Link href={`/learn/${challenge.world}`}>{locale === 'en' ? 'Complete world first →' : 'Алдымен әлемді аяқта →'}</Link>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// legacy UI aliases: CHECKPOINT MAP / NEXT CHECKPOINT / ENTER CHECKPOINT / Connected
