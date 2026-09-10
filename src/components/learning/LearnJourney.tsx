'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { lessonSequence, missions } from '@/content';
import { worldChallenges } from '@/content/world-challenges';
import { homeTopics } from '@/content/home-topics';
import { worldPresentation } from '@/content/lesson-presentation';
import { findNextIncompleteLesson, isWorldChallengeUnlocked } from '@/domain/learning/curriculum';
import { resolveWorldDetail } from '@/domain/learning/world-detail';
import { resolveNextLearningAction } from '@/domain/learning/next-action';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';

export function LearnJourney() {
  const { state, hydrated } = useGuestProgress();
  const firstIncomplete = findNextIncompleteLesson(lessonSequence, state.lessonProgress);
  const nextAction = resolveNextLearningAction(state, lessonSequence, missions, new Date());
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].learn;
  const worldIds = Object.keys(worldPresentation);

  if (!hydrated) {
    return <section className="learn-next learn-next--loading"><div className="section-shell"><p className="eyebrow eyebrow--dark">{copy.loadingEyebrow.toUpperCase()}</p><h1>{copy.loading}</h1></div></section>;
  }

  const completedLessons = lessonSequence.filter((lesson) => state.lessonProgress[lesson.slug]?.status === 'completed').length;
  const completedWorlds = Object.keys(worldPresentation).filter((worldId) => {
    const detail = resolveWorldDetail(worldId);
    return detail ? detail.lessons.every((lesson) => state.lessonProgress[lesson.slug]?.status === 'completed') : false;
  }).length;

  return (
    <>
      <section className="learn-orientation" aria-labelledby="learn-orientation-title">
        <div className="section-shell learn-orientation__grid">
          <div className="learn-orientation__copy">
            <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'LEARN / PLANET LANGUAGE' : 'ҮЙРЕН / ПЛАНЕТА ТІЛІ'}</p>
            <h1 id="learn-orientation-title">{locale === 'en' ? <>Learn the words.<br /><span>See the system.</span></> : <>Сөздерді үйрен.<br /><span>Жүйені түсін.</span></>}</h1>
            <p>{locale === 'en' ? 'Start with the Climate Change flagship module for the big picture, then use the structured path to prove recognition, recall and context.' : 'Алдымен Climate Change негізгі модулінен жалпы жүйені көр, содан кейін recognition, recall және context дәлелдерін құрылымдалған сабақтарда жина.'}</p>
            <div className="learn-orientation__actions">
              <Link href="/learn/climate-change" className="button button--pulse">{locale === 'en' ? 'Explore Climate Change →' : 'Climate Change ашу →'}</Link>
              <a href="#structured-path" className="button button--ghost">{locale === 'en' ? 'Structured path ↓' : 'Құрылымдалған жол ↓'}</a>
            </div>
          </div>
          <div className="learn-orientation__panel" aria-label={locale === 'en' ? 'Learning journey summary' : 'Оқу жолының қорытындысы'}>
            <div className="learn-orientation__orb" aria-hidden="true"><i /><i /><i /><span>EN ↔ EARTH</span></div>
            <div className="learn-orientation__stats">
              <div><strong>{completedLessons}/{lessonSequence.length}</strong><span>{locale === 'en' ? 'LESSONS CONNECTED' : 'САБАҚ АЯҚТАЛДЫ'}</span></div>
              <div><strong>{completedWorlds}/{Object.keys(worldPresentation).length}</strong><span>{locale === 'en' ? 'WORLDS COMPLETE' : 'ӘЛЕМ АЯҚТАЛДЫ'}</span></div>
              <div><strong>{state.completedChallengeIds.length}</strong><span>{locale === 'en' ? 'CHECKPOINTS' : 'CHECKPOINT'}</span></div>
            </div>
          </div>
        </div>
      </section>

      {nextAction.type === 'review' ? (
        <section className="learn-next" aria-labelledby="next-pulse-title">
          <div className="section-shell learn-next__grid">
            <div>
              <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'RECOMMENDED NEXT STEP / REVIEW' : 'КЕЛЕСІ ҚАДАМ / ҚАЙТАЛАУ'}</p>
              <h1 id="next-pulse-title">{locale === 'en' ? <>Keep your<br />pulse strong.</> : <>Біліміңді<br />нығайт.</>}</h1>
              <p>{nextAction.title[locale].toUpperCase()} · ~3 {locale === 'en' ? 'MIN' : 'МИН'}</p>
              <Link href={nextAction.href} className="button button--dark">{locale === 'en' ? 'Review now →' : 'Қазір қайталау →'}</Link>
            </div>
            <div className="world-orbit" aria-hidden="true"><span>{copy.memoryDue.toUpperCase()}</span><strong>{nextAction.title[locale].toUpperCase()}</strong></div>
          </div>
        </section>
      ) : nextAction.type === 'lesson' && firstIncomplete ? (
        <section className="learn-next" aria-labelledby="next-pulse-title">
          <div className="section-shell learn-next__grid">
            <div>
              <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'RECOMMENDED NEXT STEP' : 'КЕЛЕСІ ҚАДАМ'}</p>
              <h1 id="next-pulse-title">{firstIncomplete.title[locale]}</h1>
              <p>{firstIncomplete.estimatedMinutes} {locale === 'en' ? 'MIN' : 'МИН'} · {firstIncomplete.targetWords.length} {(firstIncomplete.targetWords.length === 1 ? copy.coreWord : copy.coreWords).toUpperCase()}</p>
              <Link href={nextAction.href} className="button button--dark">{locale === 'en' ? 'Continue →' : 'Жалғастыру →'}</Link>
            </div>
            <div className={`world-orbit world-orbit--${firstIncomplete.world}`} aria-hidden="true">
              <span>{worldPresentation[firstIncomplete.world]?.index ?? 'ECOPULSE'}</span>
              <strong>{worldPresentation[firstIncomplete.world]?.name ?? firstIncomplete.world.toUpperCase()}</strong>
            </div>
          </div>
        </section>
      ) : nextAction.type === 'mission' ? (
        <section className="learn-next" aria-labelledby="next-pulse-title">
          <div className="section-shell learn-next__grid">
            <div>
              <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'RECOMMENDED NEXT STEP / ACTION' : 'КЕЛЕСІ ҚАДАМ / ӘРЕКЕТ'}</p>
              <h1 id="next-pulse-title">{locale === 'en' ? <>Take it<br />off-screen.</> : <>Білімді<br />іске асыр.</>}</h1>
              <p>{nextAction.title[locale].toUpperCase()} · {copy.optionalMission.toUpperCase()}</p>
              <Link href={nextAction.href} className="button button--dark">{locale === 'en' ? 'Open mission →' : 'Миссияны ашу →'}</Link>
            </div>
            <div className="world-orbit world-orbit--life" aria-hidden="true"><span>{copy.actOptional.toUpperCase()}</span><strong>{nextAction.title[locale].toUpperCase()}</strong></div>
          </div>
        </section>
      ) : (
        <section className="learn-next learn-next--complete" aria-labelledby="next-pulse-title">
          <div className="section-shell learn-next__grid">
            <div>
              <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'CORE JOURNEY CONNECTED' : 'НЕГІЗГІ ЖОЛ АЯҚТАЛДЫ'}</p>
              <h1 id="next-pulse-title">{locale === 'en' ? <>You learned<br />a system.</> : <>Сен жүйені<br />үйрендің.</>}</h1>
              <p>{locale === 'en' ? 'Core lessons and missions are connected. Explore how the concepts relate.' : 'Негізгі сабақтар мен миссиялар аяқталды. Ұғымдардың байланысын зертте.'}</p>
              <div className="learn-complete-actions"><Link href={nextAction.href} className="button button--dark">{locale === 'en' ? 'Explore →' : 'Зерттеу →'}</Link><Link href="/review" className="text-link text-link--dark">{locale === 'en' ? 'Review memory' : 'Білімді қайталау'}</Link></div>
            </div>
            <div className="world-orbit world-orbit--life" aria-hidden="true"><span>{copy.coreConnected.toUpperCase()}</span><strong>{copy.lessonsConnected.toUpperCase()}</strong></div>
          </div>
        </section>
      )}

      <section className="learn-topic-atlas" aria-labelledby="learn-topic-atlas-title">
        <div className="section-shell">
          <div className="learn-topic-atlas__heading">
            <div><p className="eyebrow eyebrow--dark">08 TOPICS / OPEN EXPLORATION</p><h2 id="learn-topic-atlas-title">{locale === 'en' ? <>Choose the idea.<br />Then connect the system.</> : <>Тақырыпты таңда.<br />Сосын жүйені байланыстыр.</>}</h2></div>
            <p>{locale === 'en' ? 'Topic Labs are fast bilingual orientation experiences. Climate Change is the flagship long-form module; the other seven are compact labs that connect into structured lessons, Eco Game and Eco Action.' : 'Topic Lab — қысқа екітілді танысу тәжірибесі. Climate Change — негізгі толық модуль, ал қалған жетеуі құрылымдалған сабақтарға, Eco Game және Eco Action-ға жалғанатын ықшам lab.'}</p>
          </div>
          <div className="learn-topic-atlas__grid">
            {homeTopics.map((topic) => (
              <Link key={topic.id} href={topic.href} className={`learn-topic-atlas__card learn-topic-atlas__card--${topic.visual}`} style={{ viewTransitionName: `topic-${topic.id}` } as CSSProperties}>
                <span>{topic.index}</span>
                <div><strong lang="en">{topic.title.en}</strong><small lang="kk">{topic.title.kk}</small></div>
                <em>{topic.kicker[locale]}</em>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="learn-worlds" aria-labelledby="learn-worlds-title">
        <div className="section-shell">
          <p className="eyebrow eyebrow--dark">{copy.worldsEyebrow.toUpperCase()}</p>
          <h2 id="learn-worlds-title">{copy.worldsTitle.split('\n').map((line, index, lines) => <span key={line}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2>
          <div className="learn-world-list">
            {worldIds.map((worldId) => {
              const detail = resolveWorldDetail(worldId);
              if (!detail) return null;
              const completed = detail.lessons.filter((lesson) => state.lessonProgress[lesson.slug]?.status === 'completed').length;
              const checkpointComplete = state.completedChallengeIds.includes(detail.challenge.slug);
              const unlocked = checkpointComplete || isWorldChallengeUnlocked(worldId, lessonSequence, state.lessonProgress);
              const status = checkpointComplete ? copy.status.connected : unlocked ? copy.status.checkpointReady : completed > 0 ? copy.status.inProgress : copy.status.explore;
              return (
                <Link href={`/learn/${worldId}`} key={worldId} className={checkpointComplete ? 'learn-world-row learn-world-row--complete' : 'learn-world-row'}>
                  <span>{detail.presentation.index}</span>
                  <div><h3>{detail.presentation.name}</h3><p>{detail.presentation.headline[locale]}</p></div>
                  <strong>{completed}/{detail.lessons.length} {copy.lessons.toUpperCase()}</strong>
                  <em>{status.toUpperCase()}</em>
                  <b aria-hidden="true">→</b>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="learn-journey" id="structured-path" aria-labelledby="journey-title">
        <div className="section-shell">
          <p className="eyebrow eyebrow--dark">{copy.journeyEyebrow.toUpperCase()}</p>
          <h2 id="journey-title">{copy.journeyTitle.split('\n').map((line, index, lines) => <span key={line}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2>
          <ol className="lesson-path">
            {lessonSequence.map((lesson, index) => {
              const status = state.lessonProgress[lesson.slug]?.status;
              const current = firstIncomplete?.slug === lesson.slug;
              const statusLabel = status === 'completed' ? copy.status.connected : current ? copy.status.next : copy.status.available;
              return (
                <li key={lesson.slug} className={status === 'completed' ? 'lesson-path__item lesson-path__item--complete' : current ? 'lesson-path__item lesson-path__item--current' : 'lesson-path__item'}>
                  <span className="lesson-path__index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <Link href={`/learn/${lesson.world}`} className="lesson-path__world">{worldPresentation[lesson.world]?.name ?? lesson.world}</Link>
                    <h3>{lesson.title[locale]}</h3>
                    <p lang="en">{lesson.targetWords.map((word) => word.toUpperCase()).join(' · ')}</p>
                  </div>
                  <span className="lesson-path__status">{statusLabel.toUpperCase()}</span>
                  <Link href={`/lesson/${lesson.slug}`} aria-label={locale === 'en' ? `Open ${lesson.title.en}` : `${lesson.title.kk} сабағын ашу`}>{copy.open}</Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="world-checkpoints" aria-labelledby="world-checkpoints-title">
        <div className="section-shell">
          <p className="eyebrow eyebrow--dark">{copy.checkpointsEyebrow.toUpperCase()}</p>
          <h2 id="world-checkpoints-title">{copy.checkpointsTitle.split('\n').map((line, index, lines) => <span key={line}>{line}{index < lines.length - 1 ? <br /> : null}</span>)}</h2>
          <div className="world-checkpoint-list">
            {worldChallenges.map((challenge) => {
              const complete = state.completedChallengeIds.includes(challenge.slug);
              const unlocked = complete || isWorldChallengeUnlocked(challenge.world, lessonSequence, state.lessonProgress);
              const status = complete ? copy.status.connected : unlocked ? copy.status.available : copy.status.locked;
              return (
                <article key={challenge.slug} className={complete ? 'world-checkpoint world-checkpoint--complete' : unlocked ? 'world-checkpoint' : 'world-checkpoint world-checkpoint--locked'}>
                  <span>{worldPresentation[challenge.world]?.index ?? challenge.world}</span>
                  <h3>{challenge.title[locale]}</h3>
                  <p>{challenge.estimatedMinutes} {locale === 'en' ? 'MIN' : 'МИН'} · {challenge.questions.length} {copy.decisions.toUpperCase()} · +{challenge.xp} XP</p>
                  <strong>{status.toUpperCase()}</strong>
                  {unlocked ? <Link href={`/challenge/${challenge.slug}`}>{complete ? copy.review : copy.enter}</Link> : <span className="world-checkpoint__locked-note">{copy.completeWorldFirst}</span>}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
