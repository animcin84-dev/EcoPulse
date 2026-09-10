import { lessonSequence } from '../../content/index.ts';
import { worldChallenges } from '../../content/world-challenges.ts';
import { worldPresentation, type WorldPresentation } from '../../content/lesson-presentation.ts';
import type { KnowledgeRelation, Lesson } from '../content/types.ts';
import type { WorldChallenge } from '../content/challenge-types.ts';
import type { LessonProgress } from './progress.ts';

export type WorldDetail = {
  id: string;
  presentation: WorldPresentation;
  lessons: Lesson[];
  challenge: WorldChallenge;
  totalMinutes: number;
  targetWords: string[];
  relations: KnowledgeRelation[];
};

export type WorldNextAction =
  | { type: 'lesson'; slug: string }
  | { type: 'challenge'; slug: string }
  | { type: 'complete' };

function uniqueRelations(lessons: readonly Lesson[]): KnowledgeRelation[] {
  const result: KnowledgeRelation[] = [];
  const seen = new Set<string>();

  for (const lesson of lessons) {
    for (const step of lesson.steps) {
      if (step.type !== 'connection') continue;
      for (const relation of step.relations) {
        const signature = `${relation.from}:${relation.type}:${relation.to}`;
        if (seen.has(signature)) continue;
        seen.add(signature);
        result.push(relation);
      }
    }
  }

  return result;
}

export function resolveWorldDetail(worldId: string): WorldDetail | null {
  const presentation = worldPresentation[worldId];
  if (!presentation) return null;

  const lessons = lessonSequence.filter((lesson) => lesson.world === worldId) as Lesson[];
  const challenge = worldChallenges.find((item) => item.world === worldId);
  if (lessons.length === 0 || !challenge) return null;

  const targetWords = [...new Set(lessons.flatMap((lesson) => lesson.targetWords))];

  return {
    id: worldId,
    presentation,
    lessons,
    challenge,
    totalMinutes: lessons.reduce((total, lesson) => total + lesson.estimatedMinutes, 0),
    targetWords,
    relations: uniqueRelations(lessons),
  };
}

export function resolveWorldNextAction(
  worldId: string,
  lessonProgress: Record<string, LessonProgress>,
  completedChallengeIds: readonly string[],
): WorldNextAction | null {
  const detail = resolveWorldDetail(worldId);
  if (!detail) return null;

  const nextLesson = detail.lessons.find((lesson) => lessonProgress[lesson.slug]?.status !== 'completed');
  if (nextLesson) return { type: 'lesson', slug: nextLesson.slug };
  if (!completedChallengeIds.includes(detail.challenge.slug)) return { type: 'challenge', slug: detail.challenge.slug };
  return { type: 'complete' };
}
