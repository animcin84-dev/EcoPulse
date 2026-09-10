'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { lessonSequence, missions } from '@/content';
import { summarizeLearningProfile } from '@/domain/learning/profile';
import { resolveNextLearningAction } from '@/domain/learning/next-action';
import { productCopy } from '@/domain/learning/product-copy';
import { selectDueReviewItems } from '@/domain/learning/review';
import { useGuestProgress } from './GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';

export function PulseSummary() {
  const { state, hydrated } = useGuestProgress();
  const summary = summarizeLearningProfile({
    xp: state.xp,
    masteryStates: state.masteryStates,
    connectedConceptIds: state.connectedConceptIds,
    completedScenarioIds: state.completedScenarioIds,
    completedMissionIds: state.completedMissionIds,
  });
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].pulse;
  const next = resolveNextLearningAction(state, lessonSequence, missions, new Date());
  const actionHref = next.href;
  const actionTitle = next.title[locale];
  const completedLessons = lessonSequence.filter((lesson) => state.lessonProgress[lesson.slug]?.status === 'completed').length;
  const vocabularyTotal = new Set(lessonSequence.flatMap((lesson) => lesson.targetWords)).size;
  const languageProgress = vocabularyTotal > 0 ? Math.min(100, Math.round(((summary.masteredWords + summary.strongWords) / vocabularyTotal) * 100)) : 0;
  const planetProgress = Math.min(100, Math.round((summary.connectedConcepts / Math.max(1, lessonSequence.length)) * 100));
  const thinkTotal = lessonSequence.length + 4;
  const thinkProgress = Math.min(100, Math.round(((summary.completedScenarios + state.completedChallengeIds.length) / thinkTotal) * 100));
  const actProgress = Math.min(100, Math.round((summary.completedMissions / Math.max(1, missions.length)) * 100));
  const dueReviewCount = selectDueReviewItems(Object.values(state.reviewRecords), new Date(), Number.POSITIVE_INFINITY).length;
  const focusLanes = [
    { id: 'language', label: 'LANGUAGE', value: languageProgress, href: dueReviewCount > 0 ? '/review' : '/learn', title: locale === 'en' ? 'Strengthen the language layer.' : 'Тіл қабатын күшейт.', note: locale === 'en' ? (dueReviewCount > 0 ? `${dueReviewCount} review item${dueReviewCount === 1 ? '' : 's'} are due now.` : 'Continue structured learning to create stronger recall evidence.') : (dueReviewCount > 0 ? `Қазір ${dueReviewCount} review item дайын.` : 'Recall дәлелін күшейту үшін құрылымдалған оқуды жалғастыр.') },
    { id: 'planet', label: 'PLANET', value: planetProgress, href: '/explore', title: locale === 'en' ? 'Connect more of the Earth system.' : 'Earth system байланыстарын көбейт.', note: locale === 'en' ? 'Explore relationships between concepts instead of learning them as isolated facts.' : 'Ұғымдарды бөлек факт емес, өзара байланыс ретінде зертте.' },
    { id: 'think', label: 'THINK', value: thinkProgress, href: '/challenges', title: locale === 'en' ? 'Pressure-test your reasoning.' : 'Ойлауыңды checkpoint арқылы тексер.', note: locale === 'en' ? 'Use a ready checkpoint to explain cause, consequence and uncertainty.' : 'Дайын checkpoint арқылы себеп, салдар және белгісіздікті түсіндір.' },
    { id: 'act', label: 'ACT', value: actProgress, href: '/action', title: locale === 'en' ? 'Take one safe idea off-screen.' : 'Бір қауіпсіз идеяны экраннан тыс орында.', note: locale === 'en' ? 'Eco Actions are optional and record participation, not moral worth or measured environmental impact.' : 'Eco Action міндетті емес және моральдық баға немесе өлшенген экологиялық әсер емес, тек қатысуды көрсетеді.' },
  ] as const;
  const weakestLaneValue = Math.min(...focusLanes.map((lane) => lane.value));
  const focusLane = focusLanes.find((lane) => lane.value === weakestLaneValue) ?? focusLanes[0];

  if (!hydrated) {
    return <section className="pulse-hero"><div className="section-shell"><p className="eyebrow eyebrow--dark">{copy.eyebrow.toUpperCase()}</p><h1>{copy.loading}</h1></div></section>;
  }

  return (
    <div className="pulse-dashboard">
      <section className="pulse-hero" aria-labelledby="pulse-title">
        <div className="section-shell pulse-hero__grid">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.eyebrow.toUpperCase()}</p>
            <h1 id="pulse-title">{copy.title}<br />{summary.pulseLevel}</h1>
            <p>{summary.xp.toLocaleString()} {copy.xpNote}</p>
          </div>
          <div className="pulse-dial" aria-label={`${copy.title} ${summary.pulseLevel}`}>
            <span className="pulse-dial__orbit pulse-dial__orbit--one" aria-hidden="true" />
            <span className="pulse-dial__orbit pulse-dial__orbit--two" aria-hidden="true" />
            <div className="pulse-hero__heart"><PulseHeart size={138} labelled /><span>{copy.heartLabel.toUpperCase()}</span><strong>{summary.pulseLevel}</strong></div>
          </div>
        </div>
      </section>

      <section className="pulse-metrics">
        <div className="section-shell pulse-metrics__grid">
          <article><span>{copy.language.toUpperCase()}</span><strong>{summary.masteredWords}</strong><p>{copy.masteredWords}</p></article>
          <article><span>{copy.strong.toUpperCase()}</span><strong>{summary.strongWords}</strong><p>{copy.strongWords}</p></article>
          <article><span>{copy.planet.toUpperCase()}</span><strong>{summary.connectedConcepts}</strong><p>{copy.connectedConcepts}</p></article>
          <article><span>{copy.think.toUpperCase()}</span><strong>{summary.completedScenarios + state.completedChallengeIds.length}</strong><p>{summary.completedScenarios} {copy.scenarios} · {state.completedChallengeIds.length} {copy.challenges}</p></article>
          <article><span>{copy.act.toUpperCase()}</span><strong>{summary.completedMissions}</strong><p>{copy.missionsCompleted}</p></article>
        </div>
      </section>

      <section className="pulse-balance" aria-labelledby="pulse-balance-title">
        <div className="section-shell">
          <div className="pulse-balance__heading">
            <div><p className="eyebrow eyebrow--dark">{locale === 'en' ? 'Learning progress' : 'Оқу прогресі'}</p><h2 id="pulse-balance-title">{locale === 'en' ? <>Four kinds of evidence.<br />One learning system.</> : <>Дәлелдің төрт түрі.<br />Бір оқу жүйесі.</>}</h2></div>
            <p>{locale === 'en' ? 'These bars describe progress inside EcoPulse only. They are not a measure of intelligence, character or real-world environmental impact.' : 'Бұл жолақтар тек EcoPulse ішіндегі прогресті көрсетеді. Олар интеллект, адамдық қасиет немесе нақты экологиялық әсердің өлшемі емес.'}</p>
          </div>
          <div className="pulse-balance__grid">
            {[
              { label: 'LANGUAGE', value: languageProgress, note: locale === 'en' ? `${summary.masteredWords} mastered · ${summary.strongWords} strong` : `${summary.masteredWords} mastered · ${summary.strongWords} strong` },
              { label: 'PLANET', value: planetProgress, note: locale === 'en' ? `${summary.connectedConcepts} concepts connected` : `${summary.connectedConcepts} ұғым байланысқан` },
              { label: 'THINK', value: thinkProgress, note: locale === 'en' ? `${summary.completedScenarios} scenarios · ${state.completedChallengeIds.length} checkpoints` : `${summary.completedScenarios} сценарий · ${state.completedChallengeIds.length} checkpoint` },
              { label: 'ACT', value: actProgress, note: locale === 'en' ? `${summary.completedMissions} optional actions` : `${summary.completedMissions} қосымша әрекет` },
            ].map((metric) => (
              <article key={metric.label}>
                <div><span>{metric.label}</span><strong>{metric.value}%</strong></div>
                <div className="pulse-balance__track" role="progressbar" aria-label={`${metric.label} ${metric.value}%`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={metric.value}><i style={{ width: `${metric.value}%` }} /></div>
                <p>{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pulse-focus-compass" aria-labelledby="pulse-focus-compass-title">
        <div className="section-shell pulse-focus-compass__grid">
          <div className="pulse-focus-compass__dial" aria-hidden="true">
            <span>LANGUAGE</span><span>PLANET</span><span>THINK</span><span>ACT</span>
            <i style={{ '--focus-turn': `${focusLanes.findIndex((lane) => lane.id === focusLane.id) * 90}deg` } as CSSProperties} />
            <strong>{focusLane.value}%</strong>
          </div>
          <div className="pulse-focus-compass__copy">
            <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'Recommended focus' : 'Ұсынылған фокус'}</p>
            <h2 id="pulse-focus-compass-title">{focusLane.title}</h2>
            <p>{focusLane.note}</p>
            <div className="pulse-focus-compass__meta"><span>{locale === 'en' ? 'LOWEST CURRENT LANE' : 'ҚАЗІРГІ ЕҢ ТӨМЕН LANE'}</span><strong>{focusLane.label} · {focusLane.value}%</strong></div>
            <Link href={focusLane.href} className="button button--dark">{locale === 'en' ? 'FOCUS HERE →' : 'ОСЫ ЖЕРГЕ ФОКУС →'}</Link>
          </div>
        </div>
      </section>

      <section className="pulse-momentum" aria-labelledby="pulse-momentum-title">
        <div className="section-shell pulse-momentum__grid">
          <div className="pulse-momentum__intro"><p className="eyebrow eyebrow--dark">{locale === 'en' ? 'Current activity' : 'Қазіргі белсенділік'}</p><h2 id="pulse-momentum-title">{locale === 'en' ? 'What is moving right now.' : 'Қазір не алға жылжып жатыр.'}</h2></div>
          <article><span>LESSONS</span><strong>{completedLessons}/{lessonSequence.length}</strong><p>{locale === 'en' ? 'structured lessons completed' : 'құрылымдалған сабақ аяқталды'}</p></article>
          <article><span>MEMORY</span><strong>{dueReviewCount}</strong><p>{locale === 'en' ? 'review items due now' : 'қазір қайталау керек сөз'}</p></article>
          <article><span>ACTION</span><strong>{summary.completedMissions}/{missions.length}</strong><p>{locale === 'en' ? 'optional field actions completed' : 'қосымша field action аяқталды'}</p></article>
        </div>
      </section>

      <section className="next-action">
        <div className="section-shell next-action__grid">
          <div><p className="eyebrow">{copy.nextAction.toUpperCase()}</p><h2>{actionTitle}</h2><Link href="/settings" className="pulse-settings-link">{copy.settings}</Link></div>
          <Link href={actionHref} className="button button--pulse">{copy.start}</Link>
        </div>
      </section>

      <section className="pulse-dashboard__routes" aria-label={locale === 'en' ? 'Continue in EcoPulse' : 'EcoPulse ішінде жалғастыру'}>
        <div className="section-shell pulse-dashboard__route-grid">
          <Link href="/learn"><span>01 / LEARN</span><strong>{locale === 'en' ? 'Build new evidence' : 'Жаңа дәлел жина'}</strong><i>→</i></Link>
          <Link href="/game"><span>02 / ECO GAME</span><strong>{locale === 'en' ? 'Strengthen memory' : 'Есте сақтауды нығайт'}</strong><i>→</i></Link>
          <Link href="/action"><span>03 / ECO ACTION</span><strong>{locale === 'en' ? 'Take it off-screen' : 'Экраннан тыс әрекет ет'}</strong><i>→</i></Link>
        </div>
      </section>
    </div>
  );
}

// legacy clarity aliases: SYSTEM BALANCE / FOCUS COMPASS / MOMENTUM
