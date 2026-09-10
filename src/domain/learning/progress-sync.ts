import { GUEST_STATE_VERSION, type GuestState } from './guest-state.ts';
import { computeMasteryState, evidenceForLegacyMasteryState, type MasteryEvidence, type MasteryState } from './mastery.ts';
import type { AnswerAttempt, LessonProgress } from './progress.ts';
import type { ReviewRecord } from './review.ts';

const masteryRank: Record<MasteryState, number> = {
  NEW: 0,
  SEEN: 1,
  LEARNING: 2,
  STRONG: 3,
  MASTERED: 4,
};

function unionStrings(remote: readonly string[], local: readonly string[]): string[] {
  return [...new Set([...remote, ...local])];
}

function mergeAttempt(local: AnswerAttempt | undefined, remote: AnswerAttempt | undefined): AnswerAttempt | undefined {
  if (!local) return remote;
  if (!remote) return local;
  return {
    count: Math.max(local.count, remote.count),
    correct: local.correct || remote.correct,
    xpAwarded: local.xpAwarded || remote.xpAwarded,
  };
}

function winningLessonProgress(local: LessonProgress, remote: LessonProgress): LessonProgress {
  if (local.status !== remote.status) {
    return remote.status === 'completed' ? remote : local;
  }
  if (local.currentStepIndex !== remote.currentStepIndex) {
    return remote.currentStepIndex > local.currentStepIndex ? remote : local;
  }
  return remote;
}

function mergeLessonProgress(local: LessonProgress | undefined, remote: LessonProgress | undefined): LessonProgress | undefined {
  if (!local) return remote;
  if (!remote) return local;

  const attemptIds = new Set([...Object.keys(local.attempts), ...Object.keys(remote.attempts)]);
  const attempts: LessonProgress['attempts'] = {};
  for (const id of attemptIds) {
    const merged = mergeAttempt(local.attempts[id], remote.attempts[id]);
    if (merged) attempts[id] = merged;
  }

  const winner = winningLessonProgress(local, remote);
  return {
    lessonId: winner.lessonId,
    currentStepIndex: winner.currentStepIndex,
    currentStepId: winner.currentStepId,
    status: local.status === 'completed' || remote.status === 'completed' ? 'completed' : 'in_progress',
    xp: Math.max(local.xp, remote.xp),
    attempts,
  };
}

function mergeMastery(local: MasteryState | undefined, remote: MasteryState | undefined): MasteryState | undefined {
  if (!local) return remote;
  if (!remote) return local;
  return masteryRank[local] >= masteryRank[remote] ? local : remote;
}


function mergeMasteryEvidence(local: MasteryEvidence | undefined, remote: MasteryEvidence | undefined): MasteryEvidence | undefined {
  if (!local) return remote;
  if (!remote) return local;
  return {
    exposures: Math.max(local.exposures, remote.exposures),
    recognition: (local.recognition ?? false) || (remote.recognition ?? false),
    recall: (local.recall ?? false) || (remote.recall ?? false),
    context: (local.context ?? false) || (remote.context ?? false),
    delayedReview: (local.delayedReview ?? false) || (remote.delayedReview ?? false),
  };
}

function mergeReviewRecord(local: ReviewRecord | undefined, remote: ReviewRecord | undefined): ReviewRecord | undefined {
  if (!local) return remote;
  if (!remote) return local;

  const localDue = new Date(local.dueAt).getTime();
  const remoteDue = new Date(remote.dueAt).getTime();
  return {
    itemId: remote.itemId || local.itemId,
    stage: Math.min(local.stage, remote.stage),
    dueAt: localDue <= remoteDue ? local.dueAt : remote.dueAt,
    mistakes: Math.max(local.mistakes, remote.mistakes),
  };
}

export function mergeProgressSnapshots(local: GuestState, remote: GuestState): GuestState {
  const lessonProgress: GuestState['lessonProgress'] = {};
  for (const slug of new Set([...Object.keys(local.lessonProgress), ...Object.keys(remote.lessonProgress)])) {
    const merged = mergeLessonProgress(local.lessonProgress[slug], remote.lessonProgress[slug]);
    if (merged) lessonProgress[slug] = merged;
  }

  const masteryEvidence: GuestState['masteryEvidence'] = {};
  const evidenceWords = new Set([
    ...Object.keys(local.masteryEvidence),
    ...Object.keys(remote.masteryEvidence),
    ...Object.keys(local.masteryStates),
    ...Object.keys(remote.masteryStates),
  ]);
  for (const word of evidenceWords) {
    const localEvidence = local.masteryEvidence[word]
      ?? (local.masteryStates[word] ? evidenceForLegacyMasteryState(local.masteryStates[word]) : undefined);
    const remoteEvidence = remote.masteryEvidence[word]
      ?? (remote.masteryStates[word] ? evidenceForLegacyMasteryState(remote.masteryStates[word]) : undefined);
    const merged = mergeMasteryEvidence(localEvidence, remoteEvidence);
    if (merged) masteryEvidence[word] = merged;
  }

  const reviewRecords: GuestState['reviewRecords'] = {};
  for (const itemId of new Set([...Object.keys(local.reviewRecords), ...Object.keys(remote.reviewRecords)])) {
    const merged = mergeReviewRecord(local.reviewRecords[itemId], remote.reviewRecords[itemId]);
    if (merged) reviewRecords[itemId] = merged;
  }

  for (const [itemId, record] of Object.entries(reviewRecords)) {
    const evidence = masteryEvidence[itemId];
    if (evidence?.delayedReview && record.stage < 4) {
      masteryEvidence[itemId] = { ...evidence, delayedReview: false };
    }
  }

  const masteryStates: GuestState['masteryStates'] = {};
  for (const [word, evidence] of Object.entries(masteryEvidence)) {
    masteryStates[word] = computeMasteryState(evidence);
  }

  const onboarding = remote.onboarding.completed
    ? remote.onboarding
    : local.onboarding.completed
      ? local.onboarding
      : remote.onboarding;

  return {
    schemaVersion: GUEST_STATE_VERSION,
    xp: Math.max(local.xp, remote.xp),
    lessonProgress,
    masteryStates,
    masteryEvidence,
    reviewRecords,
    connectedConceptIds: unionStrings(remote.connectedConceptIds, local.connectedConceptIds),
    completedScenarioIds: unionStrings(remote.completedScenarioIds, local.completedScenarioIds),
    completedMissionIds: unionStrings(remote.completedMissionIds, local.completedMissionIds),
    missionReflections: { ...local.missionReflections, ...remote.missionReflections },
    completedChallengeIds: unionStrings(remote.completedChallengeIds, local.completedChallengeIds),
    onboarding,
    settings: remote.settings,
  };
}

export type ProgressRepository = {
  load(): Promise<GuestState | null>;
  save(state: GuestState): Promise<void>;
};

export type SyncProgressResult = {
  mode: 'uploaded-local' | 'merged';
  state: GuestState;
};

export async function syncProgressSnapshot(
  local: GuestState,
  repository: ProgressRepository,
): Promise<SyncProgressResult> {
  const remote = await repository.load();
  if (!remote) {
    await repository.save(local);
    return { mode: 'uploaded-local', state: local };
  }

  const merged = mergeProgressSnapshots(local, remote);
  await repository.save(merged);
  return { mode: 'merged', state: merged };
}
