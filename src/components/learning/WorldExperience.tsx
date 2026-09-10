'use client';

import Link from 'next/link';
import { resolveWorldDetail, resolveWorldNextAction } from '@/domain/learning/world-detail';
import { knowledgeGraph } from '@/content/knowledge-graph';
import { useGuestProgress } from '../progress/GuestProgressProvider';
import { PulseHeart } from '../brand/PulseHeart';
import { ContextBreadcrumbs } from '../navigation/ContextBreadcrumbs';

const relationCopy = {
  causes: { en: 'causes', kk: 'себеп болады' },
  contributes_to: { en: 'contributes to', kk: 'үлес қосады' },
  affects: { en: 'affects', kk: 'әсер етеді' },
  part_of: { en: 'part of', kk: 'бөлігі' },
  related_to: { en: 'related to', kk: 'байланысты' },
  depends_on: { en: 'depends on', kk: 'тәуелді' },
  example_of: { en: 'example of', kk: 'мысалы' },
  absorbed_by: { en: 'absorbed by', kk: 'сіңіріледі' },
} as const;

const conceptLabels = new Map(knowledgeGraph.nodes.map((node) => [node.id, node.label]));

export function WorldExperience({ worldId }: { worldId: string }) {
  const { state, hydrated } = useGuestProgress();
  const detail = resolveWorldDetail(worldId);
  if (!detail) return null;

  const locale = state.settings.preferredLocale;
  const completedLessons = detail.lessons.filter((lesson) => state.lessonProgress[lesson.slug]?.status === 'completed').length;
  const checkpointComplete = state.completedChallengeIds.includes(detail.challenge.slug);
  const nextAction = resolveWorldNextAction(worldId, state.lessonProgress, state.completedChallengeIds);
  const progressPercent = Math.round((completedLessons / detail.lessons.length) * 100);

  if (!hydrated) {
    return (
      <section className="world-detail-loading">
        <div className="section-shell">
          <p className="eyebrow">{detail.presentation.index}</p>
          <h1>LOADING<br />WORLD…</h1>
        </div>
      </section>
    );
  }

  const nextLesson = nextAction?.type === 'lesson' ? detail.lessons.find((lesson) => lesson.slug === nextAction.slug) : null;

  return (
    <>
      <ContextBreadcrumbs ariaLabel={locale === 'en' ? 'Learning location' : 'Оқу орны'} items={[{ href: '/', label: locale === 'en' ? 'Home' : 'Басты бет' }, { href: '/learn', label: locale === 'en' ? 'Learn' : 'Оқу' }, { label: detail.presentation.name }]} />
      <section className={`world-detail-hero world-detail-hero--${worldId}`} aria-labelledby="world-title">
        <div className="section-shell world-detail-hero__grid">
          <div>
            <p className="eyebrow">{detail.presentation.index} / {detail.presentation.name}</p>
            <h1 id="world-title">{detail.presentation.headline[locale]}</h1>
          </div>
          <div className="world-detail-hero__aside">
            <p>{detail.presentation.description[locale]}</p>
            <div className="world-detail-meta" aria-label="World overview">
              <span>{detail.lessons.length} {locale === 'en' ? 'LESSONS' : 'САБАҚ'}</span>
              <span>{detail.totalMinutes} {locale === 'en' ? 'MIN' : 'МИН'}</span>
              <span>{detail.targetWords.length} {locale === 'en' ? 'CORE WORDS' : 'НЕГІЗГІ СӨЗ'}</span>
            </div>
          </div>
        </div>
        <div className="world-detail-signal" aria-hidden="true"><PulseHeart size={54} /><span>{completedLessons}/{detail.lessons.length}</span></div>
      </section>

      <section className="world-detail-progress" aria-labelledby="world-progress-title">
        <div className="section-shell world-detail-progress__grid">
          <div>
            <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'YOUR PROGRESS' : 'ӘЛЕМДЕГІ ПРОГРЕСС'}</p>
            <h2 id="world-progress-title">{completedLessons}/{detail.lessons.length}<br />{locale === 'en' ? 'LESSONS COMPLETE.' : 'САБАҚ БАЙЛАНЫСТЫ.'}</h2>
          </div>
          <div>
            <div className="world-progress-track" aria-label={`${progressPercent}% complete`}>
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <p>{checkpointComplete ? (locale === 'en' ? 'Checkpoint connected.' : 'Бақылау кезеңі аяқталды.') : completedLessons === detail.lessons.length ? (locale === 'en' ? 'Lessons complete. Checkpoint is ready.' : 'Сабақтар аяқталды. Бақылау кезеңі дайын.') : (locale === 'en' ? 'Keep following the authored learning path.' : 'Құрастырылған оқу жолымен жалғастыр.')}</p>
            {nextAction?.type === 'lesson' && nextLesson && <Link href={`/lesson/${nextLesson.slug}`} className="button button--dark">{locale === 'en' ? `Continue: ${nextLesson.title.en} →` : `Жалғастыру: ${nextLesson.title.kk} →`}</Link>}
            {nextAction?.type === 'challenge' && <Link href={`/challenge/${nextAction.slug}`} className="button button--dark">{locale === 'en' ? 'Enter world checkpoint →' : 'Әлем бақылауына өту →'}</Link>}
            {nextAction?.type === 'complete' && <Link href="/explore" className="button button--dark">{locale === 'en' ? 'Explore connected concepts →' : 'Байланысқан ұғымдарды зерттеу →'}</Link>}
          </div>
        </div>
      </section>

      <section className="world-detail-connections" aria-labelledby="world-connections-title">
        <div className="section-shell">
          <p className="eyebrow">{locale === 'en' ? 'CONNECTION PREVIEW' : 'БАЙЛАНЫСТАР'}</p>
          <h2 id="world-connections-title">{locale === 'en' ? <>SEE THE<br />SYSTEM FIRST.</> : <>ӘУЕЛІ ЖҮЙЕНІ<br />КӨР.</>}</h2>
          <ol className="world-relation-list">
            {detail.relations.map((relation, index) => (
              <li key={`${relation.from}-${relation.type}-${relation.to}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{(conceptLabels.get(relation.from)?.[locale] ?? relation.from.replaceAll('-', ' ')).toUpperCase()}</strong>
                <em>{relation.label?.[locale] ?? relationCopy[relation.type][locale]}</em>
                <strong>{(conceptLabels.get(relation.to)?.[locale] ?? relation.to.replaceAll('-', ' ')).toUpperCase()}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="world-detail-lessons" aria-labelledby="world-lessons-title">
        <div className="section-shell">
          <p className="eyebrow eyebrow--dark">{locale === 'en' ? 'LEARNING PATH' : 'ОҚУ ЖОЛЫ'}</p>
          <h2 id="world-lessons-title">{locale === 'en' ? <>LEARN THE WORDS.<br />BUILD THE CONNECTION.</> : <>СӨЗДЕРДІ ҮЙРЕН.<br />БАЙЛАНЫСТЫ ҚҰР.</>}</h2>
          <ol className="world-lesson-list">
            {detail.lessons.map((lesson, index) => {
              const complete = state.lessonProgress[lesson.slug]?.status === 'completed';
              const isNext = nextAction?.type === 'lesson' && nextAction.slug === lesson.slug;
              return (
                <li key={lesson.slug} className={complete ? 'world-lesson-row world-lesson-row--complete' : isNext ? 'world-lesson-row world-lesson-row--next' : 'world-lesson-row'}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{lesson.title[locale]}</h3>
                    <p>{lesson.targetWords.map((word) => word.toUpperCase()).join(' · ')}</p>
                  </div>
                  <small>{complete ? (locale === 'en' ? 'COMPLETE' : 'БАЙЛАНЫСТЫ') : isNext ? (locale === 'en' ? 'NEXT' : 'КЕЛЕСІ') : (locale === 'en' ? 'AVAILABLE' : 'ҚОЛЖЕТІМДІ')}</small>
                  <Link href={`/lesson/${lesson.slug}`}>{complete ? (locale === 'en' ? 'Review →' : 'Қайталау →') : (locale === 'en' ? 'Open →' : 'Ашу →')}</Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={checkpointComplete ? 'world-detail-checkpoint world-detail-checkpoint--complete' : 'world-detail-checkpoint'} aria-labelledby="world-checkpoint-title">
        <div className="section-shell world-detail-checkpoint__grid">
          <div>
            <p className="eyebrow">{locale === 'en' ? 'REASONING CHALLENGE' : 'ӘЛЕМ БАҚЫЛАУЫ'}</p>
            <h2 id="world-checkpoint-title">{detail.challenge.title[locale]}</h2>
          </div>
          <div>
            <p>{detail.challenge.intro[locale]}</p>
            <div className="world-detail-meta"><span>{detail.challenge.estimatedMinutes} {locale === 'en' ? 'MIN' : 'МИН'}</span><span>{detail.challenge.questions.length} {locale === 'en' ? 'DECISIONS' : 'ШЕШІМ'}</span><span>+{detail.challenge.xp} XP</span></div>
            {completedLessons < detail.lessons.length && !checkpointComplete ? <strong className="world-checkpoint-lock">{locale === 'en' ? 'Complete this world to unlock.' : 'Ашу үшін осы әлемді аяқта.'}</strong> : <Link href={`/challenge/${detail.challenge.slug}`} className="button button--pulse">{checkpointComplete ? (locale === 'en' ? 'Review checkpoint →' : 'Бақылауды қайталау →') : (locale === 'en' ? 'Enter checkpoint →' : 'Бақылауға өту →')}</Link>}
          </div>
        </div>
      </section>

      <section className="world-detail-footer">
        <div className="section-shell world-detail-footer__grid">
          <p>{detail.presentation.index}</p>
          <Link href="/learn">← {locale === 'en' ? 'Back to all worlds' : 'Барлық әлемге оралу'}</Link>
        </div>
      </section>
    </>
  );
}

// legacy UI aliases: WORLD PROGRESS / LESSONS CONNECTED / WORLD CHECKPOINT / CONNECTED

// compatibility phrase: locale === 'en' ? 'CONNECTED' : localized-complete
