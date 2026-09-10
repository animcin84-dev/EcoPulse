import type { Lesson } from '../content/types.ts';
import type { LessonProgress } from './progress.ts';

export function findNextIncompleteLesson(
  lessons: readonly Lesson[],
  progressBySlug: Record<string, LessonProgress>,
): Lesson | null {
  return lessons.find((lesson) => progressBySlug[lesson.slug]?.status !== 'completed') ?? null;
}


export function isWorldChallengeUnlocked(
  world: string,
  lessons: readonly Lesson[],
  progressBySlug: Record<string, LessonProgress>,
): boolean {
  const worldLessons = lessons.filter((lesson) => lesson.world === world);
  return worldLessons.length > 0 && worldLessons.every((lesson) => progressBySlug[lesson.slug]?.status === 'completed');
}
