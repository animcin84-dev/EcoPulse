export type AnswerAttempt = {
  count: number;
  correct: boolean;
  xpAwarded: boolean;
};

export type LessonProgress = {
  lessonId: string;
  currentStepIndex: number;
  currentStepId?: string;
  status: 'in_progress' | 'completed';
  xp: number;
  attempts: Record<string, AnswerAttempt>;
};

export function createLessonProgress(lessonId: string, firstStepId?: string): LessonProgress {
  return {
    lessonId,
    currentStepIndex: 0,
    ...(firstStepId ? { currentStepId: firstStepId } : {}),
    status: 'in_progress',
    xp: 0,
    attempts: {},
  };
}

export function resolveLessonStepIndex(progress: LessonProgress, stepIds: readonly string[]): number {
  if (stepIds.length === 0) return 0;
  if (progress.currentStepId) {
    const stableIndex = stepIds.indexOf(progress.currentStepId);
    if (stableIndex >= 0) return stableIndex;
  }
  return Math.min(Math.max(0, progress.currentStepIndex), stepIds.length - 1);
}

export function advanceLesson(progress: LessonProgress, steps: number | readonly string[]): LessonProgress {
  const totalSteps = typeof steps === 'number' ? steps : steps.length;
  if (progress.status === 'completed' || totalSteps <= 0) return progress;

  const currentIndex = typeof steps === 'number' ? progress.currentStepIndex : resolveLessonStepIndex(progress, steps);
  if (currentIndex >= totalSteps - 1) {
    return { ...progress, currentStepIndex: currentIndex, status: 'completed' };
  }

  const nextIndex = currentIndex + 1;
  return {
    ...progress,
    currentStepIndex: nextIndex,
    ...(typeof steps === 'number' ? {} : { currentStepId: steps[nextIndex] }),
  };
}


export function completeLesson(progress: LessonProgress): LessonProgress {
  if (progress.status === 'completed') return progress;
  return { ...progress, status: 'completed' };
}

export function recordAnswer(
  progress: LessonProgress,
  stepId: string,
  correct: boolean,
  xpReward: number,
): LessonProgress {
  const previous = progress.attempts[stepId];
  const alreadyAwarded = previous?.xpAwarded ?? false;
  const shouldAward = correct && !alreadyAwarded;

  return {
    ...progress,
    xp: progress.xp + (shouldAward ? xpReward : 0),
    attempts: {
      ...progress.attempts,
      [stepId]: {
        count: (previous?.count ?? 0) + 1,
        correct: (previous?.correct ?? false) || correct,
        xpAwarded: alreadyAwarded || shouldAward,
      },
    },
  };
}
