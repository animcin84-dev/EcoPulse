import Link from 'next/link';
import { PulseHeart } from '../brand/PulseHeart';
import { formatLessonProgressText } from '@/domain/learning/accessibility';
import type { PreferredLocale } from '@/domain/learning/settings';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';

export function LessonHeader({ current, total, xp, world, locale }: { current: number; total: number; xp: number; world: string; locale: PreferredLocale }) {
  const progressText = formatLessonProgressText(current, total, locale);
  const copy = lessonUiCopy[locale];
  const progressPercent = Math.round(((current + 1) / Math.max(total, 1)) * 100);

  return (
    <header className="lesson-header">
      <Link href="/learn" className="lesson-header__back" aria-label={lessonUiCopy[locale].header.backAria}>← {locale === 'en' ? 'Learn' : 'Оқу'} <span>/ {world}</span></Link>
      <div
        className="lesson-header__progress"
        role="progressbar"
        aria-label={progressText}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
        aria-valuetext={progressText}
      >
        <span className="lesson-header__step-text">{locale === 'en' ? `Step ${current + 1} of ${total}` : `${current + 1}/${total} қадам`}</span>
        <span className="lesson-header__progress-track" aria-hidden="true"><i style={{ width: `${progressPercent}%` }} /></span>
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            className={index <= current ? 'lesson-progress-dot lesson-progress-dot--active' : 'lesson-progress-dot'}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="lesson-header__xp" aria-label={`${xp} ${copy.header.totalXp}`}>
        <PulseHeart size={20} />
        <span>{xp} XP</span>
      </div>
    </header>
  );
}
