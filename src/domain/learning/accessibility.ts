import type { PreferredLocale } from './settings.ts';

export function documentLanguageForLocale(locale: PreferredLocale): 'en' | 'kk' {
  return locale;
}

export function formatLessonProgressText(currentIndex: number, total: number, locale: PreferredLocale): string {
  const safeTotal = Math.max(1, Math.trunc(total));
  const safeIndex = Math.min(Math.max(0, Math.trunc(currentIndex)), safeTotal - 1);
  const current = safeIndex + 1;

  return locale === 'kk'
    ? `Сабақ прогресі: ${safeTotal} қадамның ${current}-қадамы`
    : `Lesson progress: step ${current} of ${safeTotal}`;
}

export function formatLessonStepAnnouncement(
  currentIndex: number,
  total: number,
  title: string,
  locale: PreferredLocale,
): string {
  const safeTotal = Math.max(1, Math.trunc(total));
  const safeIndex = Math.min(Math.max(0, Math.trunc(currentIndex)), safeTotal - 1);
  const current = safeIndex + 1;

  return locale === 'kk'
    ? `${safeTotal} қадамның ${current}-қадамы: ${title}`
    : `Step ${current} of ${safeTotal}: ${title}`;
}

export function formatReviewProgressText(currentIndex: number, total: number, locale: PreferredLocale): string {
  const safeTotal = Math.max(1, Math.trunc(total));
  const safeIndex = Math.min(Math.max(0, Math.trunc(currentIndex)), safeTotal - 1);
  const current = safeIndex + 1;

  return locale === 'kk'
    ? `Қайталау прогресі: ${safeTotal} тапсырманың ${current}-тапсырмасы`
    : `Review progress: item ${current} of ${safeTotal}`;
}

export function formatReviewItemAnnouncement(
  currentIndex: number,
  total: number,
  modeLabel: string,
  word: string,
  locale: PreferredLocale,
): string {
  const safeTotal = Math.max(1, Math.trunc(total));
  const safeIndex = Math.min(Math.max(0, Math.trunc(currentIndex)), safeTotal - 1);
  const current = safeIndex + 1;

  return locale === 'kk'
    ? `${safeTotal} тапсырманың ${current}-тапсырмасы. ${modeLabel}: ${word}`
    : `Review item ${current} of ${safeTotal}. ${modeLabel}: ${word}`;
}
