import type { LessonProgress } from './progress.ts';
import { applyMasterySignal, computeMasteryState, createMasteryEvidence, evidenceForLegacyMasteryState, type MasteryEvidence, type MasteryState } from './mastery.ts';
import { createReviewRecord, type ReviewRecord } from './review.ts';
import type { Lesson } from '../content/types.ts';
import { createDefaultOnboardingPreferences, normalizeInterests, type LearningLevel, type OnboardingPreferences } from './onboarding.ts';
import { createDefaultLearningSettings, normalizeLearningSettings, parseLearningSettingsStrict, type LearningSettings } from './settings.ts';
import { lessonsBySlug } from '../../content/index.ts';
import { worldChallengesBySlug } from '../../content/world-challenges.ts';
import { isWorldChallengeUnlocked } from './curriculum.ts';

export const GUEST_STATE_VERSION = 7;
export const LESSON_COMPLETION_XP = 40;
export const MISSION_COMPLETION_XP = 25;
export const WORLD_CHALLENGE_COMPLETION_XP = 50;

export type GuestState = {
  schemaVersion: number;
  xp: number;
  lessonProgress: Record<string, LessonProgress>;
  masteryStates: Record<string, MasteryState>;
  masteryEvidence: Record<string, MasteryEvidence>;
  reviewRecords: Record<string, ReviewRecord>;
  connectedConceptIds: string[];
  completedScenarioIds: string[];
  completedMissionIds: string[];
  missionReflections: Record<string, string>;
  completedChallengeIds: string[];
  onboarding: OnboardingPreferences;
  settings: LearningSettings;
};

const masteryStates = new Set<MasteryState>(['NEW', 'SEEN', 'LEARNING', 'STRONG', 'MASTERED']);

export function createEmptyGuestState(): GuestState {
  return {
    schemaVersion: GUEST_STATE_VERSION,
    xp: 0,
    lessonProgress: {},
    masteryStates: {},
    masteryEvidence: {},
    reviewRecords: {},
    connectedConceptIds: [],
    completedScenarioIds: [],
    completedMissionIds: [],
    missionReflections: {},
    completedChallengeIds: [],
    onboarding: createDefaultOnboardingPreferences(),
    settings: createDefaultLearningSettings(),
  };
}

export function serializeGuestState(state: GuestState): string {
  return JSON.stringify(state);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown, strict = false): string[] | null {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) return null;
  const unique = [...new Set(value)];
  if (strict && unique.length !== value.length) return null;
  return unique;
}


function parseAnswerAttempts(value: unknown): LessonProgress['attempts'] | null {
  if (!isRecord(value)) return null;
  const parsed: LessonProgress['attempts'] = {};
  for (const [stepId, raw] of Object.entries(value)) {
    if (!isRecord(raw)) return null;
    if (
      typeof raw.count !== 'number' ||
      !Number.isInteger(raw.count) ||
      raw.count < 1 ||
      typeof raw.correct !== 'boolean' ||
      typeof raw.xpAwarded !== 'boolean' ||
      raw.correct !== raw.xpAwarded
    ) {
      return null;
    }
    parsed[stepId] = {
      count: raw.count,
      correct: raw.correct,
      xpAwarded: raw.xpAwarded,
    };
  }
  return parsed;
}

function parseLessonProgress(value: unknown): Record<string, LessonProgress> | null {
  if (!isRecord(value)) return null;
  const parsed: Record<string, LessonProgress> = {};

  for (const [slug, raw] of Object.entries(value)) {
    if (!isRecord(raw)) return null;
    const { lessonId, currentStepIndex, currentStepId, status, xp, attempts } = raw;
    const parsedAttempts = parseAnswerAttempts(attempts);
    if (
      typeof lessonId !== 'string' ||
      typeof currentStepIndex !== 'number' ||
      (currentStepId !== undefined && typeof currentStepId !== 'string') ||
      !Number.isInteger(currentStepIndex) ||
      currentStepIndex < 0 ||
      (status !== 'in_progress' && status !== 'completed') ||
      typeof xp !== 'number' ||
      !Number.isInteger(xp) ||
      xp < 0 ||
      !parsedAttempts
    ) {
      return null;
    }

    parsed[slug] = {
      lessonId,
      currentStepIndex,
      ...(typeof currentStepId === 'string' && currentStepId.trim() ? { currentStepId } : {}),
      status,
      xp,
      attempts: parsedAttempts,
    };
  }

  return parsed;
}


const legacyStepIdsBySlug: Readonly<Record<string, readonly string[]>> = {
  atmosphere: ['discover-atmosphere', 'meaning-atmosphere', 'connection-atmosphere-weather-climate', 'think-no-atmosphere', 'result-first-pulse'],
  'weather-climate': ['discover-weather-climate', 'weather-or-climate-choice', 'fact-myth-cold-day', 'connection-weather-climate', 'think-cold-day', 'result-weather-climate'],
  glaciers: ['discover-glacier', 'meaning-glacier', 'fill-melt-context', 'connection-glacier-melt', 'think-melt', 'result-glaciers'],
  'sea-level': ['discover-sea-level', 'meaning-sea-level', 'connection-land-ice-sea-level', 'order-land-ice-system', 'think-coastal-planning', 'result-sea-level'],
  drought: ['discover-drought', 'meaning-drought', 'connection-rainfall-drought', 'think-drought-duration', 'result-drought'],
  'wildfire-extreme-weather': ['discover-wildfire', 'meaning-wildfire', 'connection-drought-wildfire-risk', 'think-extreme-weather', 'result-wildfire-extreme'],
  habitats: ['discover-habitat', 'meaning-habitat', 'match-life-concepts', 'connection-habitat-ecosystem', 'think-wetland', 'result-habitats'],
  'ocean-change': ['discover-acidic', 'meaning-acidic', 'connection-ocean-acidification', 'think-ocean-wording', 'result-ocean-change'],
};

function addStableLessonStepIds(progressBySlug: Record<string, LessonProgress>): Record<string, LessonProgress> {
  return Object.fromEntries(Object.entries(progressBySlug).map(([slug, progress]) => {
    let stepId = progress.currentStepId;
    if (!stepId) {
      const legacySteps = legacyStepIdsBySlug[slug];
      if (!legacySteps?.length) return [slug, progress];
      const legacyIndex = Math.min(progress.currentStepIndex, legacySteps.length - 1);
      stepId = legacySteps[legacyIndex];
    }

    const currentLesson = lessonsBySlug[slug as keyof typeof lessonsBySlug];
    const currentIndex = currentLesson?.steps.findIndex((step) => step.id === stepId) ?? -1;
    if (currentIndex < 0) return [slug, { ...progress, currentStepId: stepId }];
    return [slug, { ...progress, currentStepIndex: currentIndex, currentStepId: stepId }];
  }));
}

function parseMastery(value: unknown): Record<string, MasteryState> | null {
  if (!isRecord(value)) return null;
  const parsed: Record<string, MasteryState> = {};
  for (const [word, state] of Object.entries(value)) {
    if (typeof state !== 'string' || !masteryStates.has(state as MasteryState)) return null;
    parsed[word] = state as MasteryState;
  }
  return parsed;
}


function parseMasteryEvidence(value: unknown): Record<string, MasteryEvidence> | null {
  if (!isRecord(value)) return null;
  const parsed: Record<string, MasteryEvidence> = {};
  for (const [word, raw] of Object.entries(value)) {
    if (!isRecord(raw)) return null;
    if (typeof raw.exposures !== 'number' || !Number.isInteger(raw.exposures) || raw.exposures < 0) return null;
    for (const key of ['recognition', 'recall', 'context', 'delayedReview'] as const) {
      if (raw[key] !== undefined && typeof raw[key] !== 'boolean') return null;
    }
    parsed[word] = {
      exposures: raw.exposures,
      recognition: raw.recognition === true,
      recall: raw.recall === true,
      context: raw.context === true,
      delayedReview: raw.delayedReview === true,
    };
  }
  return parsed;
}

function evidenceFromLegacyMastery(states: Record<string, MasteryState>): Record<string, MasteryEvidence> {
  return Object.fromEntries(Object.entries(states).map(([word, state]) => [word, evidenceForLegacyMasteryState(state)]));
}

function isCurrentMasteryEvidenceCoherent(evidence: MasteryEvidence): boolean {
  const recognition = evidence.recognition === true;
  const recall = evidence.recall === true;
  const context = evidence.context === true;
  const delayedReview = evidence.delayedReview === true;
  const hasAnySignal = recognition || recall || context || delayedReview;

  if (evidence.exposures === 0 && hasAnySignal) return false;
  if (delayedReview && !(recognition && recall && context)) return false;
  return true;
}

function parseReviewRecords(value: unknown): Record<string, ReviewRecord> | null {
  if (!isRecord(value)) return null;
  const parsed: Record<string, ReviewRecord> = {};
  for (const [itemId, raw] of Object.entries(value)) {
    if (!isRecord(raw)) return null;
    if (
      typeof raw.itemId !== 'string' ||
      typeof raw.stage !== 'number' ||
      !Number.isInteger(raw.stage) ||
      raw.stage < 0 ||
      typeof raw.dueAt !== 'string' ||
      Number.isNaN(Date.parse(raw.dueAt)) ||
      typeof raw.mistakes !== 'number' ||
      !Number.isInteger(raw.mistakes) ||
      raw.mistakes < 0
    ) {
      return null;
    }
    parsed[itemId] = {
      itemId: raw.itemId,
      stage: raw.stage,
      dueAt: raw.dueAt,
      mistakes: raw.mistakes,
    };
  }
  return parsed;
}

function parseOnboarding(value: unknown, strictCurrent = false): OnboardingPreferences | null {
  if (!isRecord(value)) return null;
  if (typeof value.completed !== 'boolean') return null;
  if (value.level !== null && value.level !== 'A2' && value.level !== 'B1' && value.level !== 'B2') return null;
  if (value.supportLanguage !== 'kk') return null;
  if (!Array.isArray(value.interests) || value.interests.some((item) => typeof item !== 'string')) return null;
  const rawInterests = value.interests as string[];
  const interests = normalizeInterests(rawInterests);
  if (strictCurrent && (interests.length !== rawInterests.length || interests.some((interest, index) => interest !== rawInterests[index]))) return null;
  return {
    completed: value.completed,
    level: value.level as LearningLevel | null,
    supportLanguage: 'kk',
    interests,
  };
}

function parseMissionReflections(value: unknown, strict = false): Record<string, string> | null {
  if (!isRecord(value)) return null;
  const parsed: Record<string, string> = {};
  for (const [missionId, reflection] of Object.entries(value)) {
    if (typeof reflection !== 'string') return null;
    const trimmed = reflection.trim();
    if (strict && (trimmed !== reflection || trimmed.length === 0 || reflection.length > 280)) return null;
    const normalized = trimmed.slice(0, 280);
    if (normalized) parsed[missionId] = normalized;
  }
  return parsed;
}

export function parseGuestStateStrict(raw: string | null | undefined): GuestState | null {
  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value)) return null;
    if (value.schemaVersion !== 1 && value.schemaVersion !== 2 && value.schemaVersion !== 3 && value.schemaVersion !== 4 && value.schemaVersion !== 5 && value.schemaVersion !== 6 && value.schemaVersion !== GUEST_STATE_VERSION) return null;
    if (typeof value.xp !== 'number' || !Number.isInteger(value.xp) || value.xp < 0) return null;

    const isCurrentSchema = value.schemaVersion === GUEST_STATE_VERSION;
    const parsedLessonProgress = parseLessonProgress(value.lessonProgress);
    const lessonProgress = parsedLessonProgress
      ? value.schemaVersion === GUEST_STATE_VERSION
        ? parsedLessonProgress
        : addStableLessonStepIds(parsedLessonProgress)
      : null;
    const mastery = parseMastery(value.masteryStates);
    const reviewRecords = parseReviewRecords(value.reviewRecords);
    const connectedConceptIds = stringArray(value.connectedConceptIds, isCurrentSchema);
    const completedScenarioIds = stringArray(value.completedScenarioIds, isCurrentSchema);
    const completedMissionIds = stringArray(value.completedMissionIds, isCurrentSchema);

    if (
      !lessonProgress ||
      !mastery ||
      !reviewRecords ||
      !connectedConceptIds ||
      !completedScenarioIds ||
      !completedMissionIds
    ) {
      return null;
    }

    if (value.schemaVersion === 1) {
      return {
        schemaVersion: GUEST_STATE_VERSION,
        xp: value.xp,
        lessonProgress,
        masteryStates: mastery,
        masteryEvidence: evidenceFromLegacyMastery(mastery),
        reviewRecords,
        connectedConceptIds,
        completedScenarioIds,
        completedMissionIds,
        missionReflections: {},
        completedChallengeIds: [],
        onboarding: createDefaultOnboardingPreferences(),
        settings: createDefaultLearningSettings(),
      };
    }

    const completedChallengeIds = stringArray(value.completedChallengeIds, isCurrentSchema);
    const onboarding = parseOnboarding(value.onboarding, isCurrentSchema);
    if (!completedChallengeIds || !onboarding) return null;

    if (value.schemaVersion === 2) {
      return {
        schemaVersion: GUEST_STATE_VERSION,
        xp: value.xp,
        lessonProgress,
        masteryStates: mastery,
        masteryEvidence: evidenceFromLegacyMastery(mastery),
        reviewRecords,
        connectedConceptIds,
        completedScenarioIds,
        completedMissionIds,
        missionReflections: {},
        completedChallengeIds,
        onboarding,
        settings: createDefaultLearningSettings(),
      };
    }

    const missionReflections = parseMissionReflections(value.missionReflections, isCurrentSchema);
    if (!missionReflections) return null;

    if (value.schemaVersion === 3) {
      return {
        schemaVersion: GUEST_STATE_VERSION,
        xp: value.xp,
        lessonProgress,
        masteryStates: mastery,
        masteryEvidence: evidenceFromLegacyMastery(mastery),
        reviewRecords,
        connectedConceptIds,
        completedScenarioIds,
        completedMissionIds,
        missionReflections,
        completedChallengeIds,
        onboarding,
        settings: createDefaultLearningSettings(),
      };
    }

    if (value.schemaVersion === 4) {
      return {
        schemaVersion: GUEST_STATE_VERSION,
        xp: value.xp,
        lessonProgress,
        masteryStates: mastery,
        masteryEvidence: evidenceFromLegacyMastery(mastery),
        reviewRecords,
        connectedConceptIds,
        completedScenarioIds,
        completedMissionIds,
        missionReflections,
        completedChallengeIds,
        onboarding,
        settings: normalizeLearningSettings(value.settings),
      };
    }

    const parsedMasteryEvidence = parseMasteryEvidence(value.masteryEvidence);
    if (!parsedMasteryEvidence) return null;

    const masteryEvidence = { ...parsedMasteryEvidence };
    if (value.schemaVersion !== GUEST_STATE_VERSION) {
      for (const [word, state] of Object.entries(mastery)) {
        if (!masteryEvidence[word]) masteryEvidence[word] = evidenceForLegacyMasteryState(state);
      }
    }

    const masteryWords = new Set([...Object.keys(mastery), ...Object.keys(masteryEvidence)]);
    if (value.schemaVersion === GUEST_STATE_VERSION) {
      if (Object.keys(mastery).length !== Object.keys(masteryEvidence).length) return null;
      for (const word of masteryWords) {
        const evidence = masteryEvidence[word];
        if (!evidence || !isCurrentMasteryEvidenceCoherent(evidence) || mastery[word] !== computeMasteryState(evidence)) return null;
      }
    }

    const derivedMasteryStates: Record<string, MasteryState> = {};
    for (const [word, evidence] of Object.entries(masteryEvidence)) {
      derivedMasteryStates[word] = computeMasteryState(evidence);
    }

    const settings = isCurrentSchema
      ? parseLearningSettingsStrict(value.settings)
      : normalizeLearningSettings(value.settings);
    if (!settings) return null;

    return {
      schemaVersion: GUEST_STATE_VERSION,
      xp: value.xp,
      lessonProgress,
      masteryStates: derivedMasteryStates,
      masteryEvidence,
      reviewRecords,
      connectedConceptIds,
      completedScenarioIds,
      completedMissionIds,
      missionReflections,
      completedChallengeIds,
      onboarding,
      settings,
    };
  } catch {
    return null;
  }
}


export function parseGuestState(raw: string | null | undefined): GuestState {
  return parseGuestStateStrict(raw) ?? createEmptyGuestState();
}


export function upsertLessonProgress(
  state: GuestState,
  lessonSlug: string,
  progress: LessonProgress,
): GuestState {
  const previous = state.lessonProgress[lessonSlug];
  const previousXp = previous?.xp ?? 0;
  const delta = Math.max(0, progress.xp - previousXp);
  const completionBonus = progress.status === 'completed' && previous?.status !== 'completed'
    ? LESSON_COMPLETION_XP
    : 0;

  return {
    ...state,
    xp: state.xp + delta + completionBonus,
    lessonProgress: {
      ...state.lessonProgress,
      [lessonSlug]: progress,
    },
  };
}


export function saveMissionReflectionInGuestState(
  state: GuestState,
  missionId: string,
  reflection: string,
): GuestState {
  const id = missionId.trim();
  if (!id) return state;
  const normalized = reflection.trim().slice(0, 280);
  const missionReflections = { ...state.missionReflections };
  if (normalized) missionReflections[id] = normalized;
  else delete missionReflections[id];
  return { ...state, missionReflections };
}

export function completeMissionInGuestState(
  state: GuestState,
  missionId: string,
): GuestState {
  if (state.completedMissionIds.includes(missionId)) return state;
  return {
    ...state,
    xp: state.xp + MISSION_COMPLETION_XP,
    completedMissionIds: [...state.completedMissionIds, missionId],
  };
}

export function completeWorldChallengeInGuestState(
  state: GuestState,
  challengeId: string,
): GuestState {
  if (state.completedChallengeIds.includes(challengeId)) return state;
  const challenge = worldChallengesBySlug[challengeId];
  if (!challenge) return state;
  if (!isWorldChallengeUnlocked(challenge.world, Object.values(lessonsBySlug), state.lessonProgress)) return state;
  return {
    ...state,
    xp: state.xp + WORLD_CHALLENGE_COMPLETION_XP,
    completedChallengeIds: [...state.completedChallengeIds, challengeId],
  };
}

export function finalizeLessonInGuestState(
  state: GuestState,
  lesson: Lesson,
  now: Date,
): GuestState {
  const progress = state.lessonProgress[lesson.slug];
  if (!progress || progress.status !== 'completed') return state;

  const masteryStates = { ...state.masteryStates };
  const masteryEvidence = { ...state.masteryEvidence };
  const reviewRecords = { ...state.reviewRecords };

  for (const word of lesson.targetWords) {
    const currentEvidence = masteryEvidence[word] ?? createMasteryEvidence();
    masteryEvidence[word] = currentEvidence.exposures > 0
      ? currentEvidence
      : applyMasterySignal(currentEvidence, 'exposure');
    if (!reviewRecords[word]) reviewRecords[word] = createReviewRecord(word, now);
  }

  for (const step of lesson.steps) {
    if (!('masterySignals' in step) || !step.masterySignals?.length) continue;
    if (!progress.attempts[step.id]?.correct) continue;
    for (const signalRef of step.masterySignals) {
      const currentEvidence = masteryEvidence[signalRef.word] ?? createMasteryEvidence();
      masteryEvidence[signalRef.word] = applyMasterySignal(currentEvidence, signalRef.signal);
    }
  }

  for (const word of lesson.targetWords) {
    masteryStates[word] = computeMasteryState(masteryEvidence[word] ?? createMasteryEvidence());
  }

  const connectedConceptIds = new Set(state.connectedConceptIds);
  const completedScenarioIds = new Set(state.completedScenarioIds);

  for (const step of lesson.steps) {
    if (step.type === 'connection') {
      for (const relation of step.relations) {
        connectedConceptIds.add(relation.from);
        connectedConceptIds.add(relation.to);
      }
    }
    if (step.type === 'think') completedScenarioIds.add(step.id);
  }

  return {
    ...state,
    masteryStates,
    masteryEvidence,
    reviewRecords,
    connectedConceptIds: [...connectedConceptIds],
    completedScenarioIds: [...completedScenarioIds],
  };
}
