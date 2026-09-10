import Link from 'next/link';
import type { Lesson, ResultStep } from '@/domain/content/types';
import type { EcoMission } from '@/content/missions';
import { PulseHeart } from '../brand/PulseHeart';
import { SourceDisclosure } from './SourceDisclosure';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

export function ResultPanel({
  lesson,
  step,
  lessonXp,
  totalXp,
  locale,
  nextLesson,
  mission,
  missionCompleted,
}: {
  lesson: Lesson;
  step: ResultStep;
  lessonXp: number;
  totalXp: number;
  locale: 'en' | 'kk';
  nextLesson?: Lesson;
  mission: EcoMission | null;
  missionCompleted: boolean;
}) {
  const copy = lessonUiCopy[locale];
  return (
    <section className="lesson-stage lesson-stage--result" aria-labelledby="result-title">
      <div className="lesson-stage__inner lesson-stage__inner--result">
        <PulseHeart size={72} labelled />
        <p className="eyebrow eyebrow--dark">{lesson.world.toUpperCase()} / {lesson.version}</p>
        <h1 id="result-title">{step.title[locale]}</h1>
        {step.body && <p className="result-lede">{step.body[locale]}</p>}
        <div className="result-stats">
          <div><strong>{lesson.targetWords.length}</strong><span>{copy.result.targetWords.toUpperCase()}</span></div>
          <div><strong>+{lessonXp}</strong><span>{copy.result.lessonXp.toUpperCase()}</span></div>
          <div><strong>{totalXp}</strong><span>{copy.result.totalXp.toUpperCase()}</span></div>
        </div>
        <SourceDisclosure sourceIds={lesson.sourceIds} locale={locale} />
        {mission && (
          <aside className={missionCompleted ? 'result-mission result-mission--complete' : 'result-mission'} aria-labelledby="result-mission-title">
            <span>{copy.result.missionOptional.toUpperCase()}</span>
            <h2 id="result-mission-title">{mission.title[locale]}</h2>
            <p>{mission.description[locale]}</p>
            <div className="result-mission__meta">
              <span>~{mission.estimatedMinutes} {copy.result.minutes.toUpperCase()}</span>
              <span>{copy.result.noPhoto.toUpperCase()}</span>
              <span>{copy.result.noLocation.toUpperCase()}</span>
            </div>
            {missionCompleted ? (
              <div className="result-mission__actions">
                <strong>{copy.result.missionComplete}</strong>
                <Link className="button button--pulse" href="/pulse">{copy.result.seePulse}</Link>
              </div>
            ) : (
              <Link className="button button--pulse" href={`/mission/${mission.id}`}>{copy.result.takeMission}</Link>
            )}
          </aside>
        )}
        <div className="result-next">
          <span>{copy.result.nextPulse.toUpperCase()}</span>
          <strong>{nextLesson?.title[locale] ?? copy.result.learningMap}</strong>
          <Link className="button button--dark" href={nextLesson ? `/lesson/${nextLesson.slug}` : '/learn'}>
            {nextLesson ? copy.result.nextLesson : copy.result.returnToLearn}
          </Link>
        </div>
      </div>
    </section>
  );
}
