import type { Lesson, LocalizedText } from '../content/types.ts';
import type { GuestState } from './guest-state.ts';
import { findNextIncompleteLesson } from './curriculum.ts';
import { selectDueReviewItems } from './review.ts';

type MissionCandidate = {
  id: string;
  title: LocalizedText;
};

export type ResolvedNextLearningAction = {
  type: 'review' | 'lesson' | 'mission' | 'none';
  href: string;
  title: LocalizedText;
};

export function resolveNextLearningAction(
  state: GuestState,
  lessons: readonly Lesson[],
  missions: readonly MissionCandidate[],
  now: Date,
): ResolvedNextLearningAction {
  const dueReviewCount = selectDueReviewItems(Object.values(state.reviewRecords), now, 99).length;
  if (dueReviewCount > 0) {
    return {
      type: 'review',
      href: '/review',
      title: {
        en: `Review ${dueReviewCount} ${dueReviewCount === 1 ? 'word' : 'words'}`,
        kk: `${dueReviewCount} сөзді қайталау`,
      },
    };
  }

  const nextLesson = findNextIncompleteLesson(lessons, state.lessonProgress);
  if (nextLesson) {
    return {
      type: 'lesson',
      href: `/lesson/${nextLesson.slug}`,
      title: nextLesson.title,
    };
  }

  const nextMission = missions.find((mission) => !state.completedMissionIds.includes(mission.id));
  if (nextMission) {
    return {
      type: 'mission',
      href: `/mission/${nextMission.id}`,
      title: nextMission.title,
    };
  }

  return {
    type: 'none',
    href: '/explore',
    title: {
      en: 'Explore EcoPulse connections',
      kk: 'EcoPulse байланыстарын зерттеу',
    },
  };
}
