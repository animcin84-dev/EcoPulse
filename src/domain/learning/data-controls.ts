import { hasConsistentLearningStateReferences } from './state-integrity.ts';
import {
  createEmptyGuestState,
  parseGuestState,
  parseGuestStateStrict,
  serializeGuestState,
  type GuestState,
} from './guest-state.ts';

export type LearningDataExport = {
  product: 'EcoPulse';
  exportVersion: 1;
  exportedAt: string;
  learningState: GuestState;
};

export function createLearningDataExport(state: GuestState, now = new Date()): LearningDataExport {
  const learningState = parseGuestState(serializeGuestState(state));
  return {
    product: 'EcoPulse',
    exportVersion: 1,
    exportedAt: now.toISOString(),
    learningState,
  };
}

export function learningDataExportFilename(now = new Date()): string {
  const day = now.toISOString().slice(0, 10);
  return `ecopulse-learning-data-${day}.json`;
}

export function resetLearningProgress(state: GuestState): GuestState {
  const empty = createEmptyGuestState();
  return {
    ...empty,
    onboarding: {
      ...state.onboarding,
      interests: [...state.onboarding.interests],
    },
    settings: { ...state.settings },
  };
}


export const MAX_LEARNING_DATA_IMPORT_BYTES = 2 * 1024 * 1024;

export type LearningDataImportFailureReason =
  | 'too-large'
  | 'invalid-json'
  | 'wrong-product'
  | 'unsupported-export-version'
  | 'invalid-export-date'
  | 'invalid-learning-state'
  | 'inconsistent-learning-state';

export type LearningDataImportResult =
  | { ok: true; state: GuestState; exportedAt: string }
  | { ok: false; reason: LearningDataImportFailureReason };

export type LearningDataImportSummary = {
  xp: number;
  completedLessons: number;
  masteredWords: number;
  completedMissions: number;
  completedChallenges: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseLearningDataImport(raw: string): LearningDataImportResult {
  if (raw.length > MAX_LEARNING_DATA_IMPORT_BYTES) return { ok: false, reason: 'too-large' };
  if (new TextEncoder().encode(raw).byteLength > MAX_LEARNING_DATA_IMPORT_BYTES) return { ok: false, reason: 'too-large' };

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'invalid-json' };
  }

  if (!isRecord(value) || value.product !== 'EcoPulse') return { ok: false, reason: 'wrong-product' };
  if (value.exportVersion !== 1) return { ok: false, reason: 'unsupported-export-version' };
  if (typeof value.exportedAt !== 'string' || Number.isNaN(Date.parse(value.exportedAt))) {
    return { ok: false, reason: 'invalid-export-date' };
  }
  if (!('learningState' in value)) return { ok: false, reason: 'invalid-learning-state' };

  let serializedState: string;
  try {
    serializedState = JSON.stringify(value.learningState);
  } catch {
    return { ok: false, reason: 'invalid-learning-state' };
  }
  const state = parseGuestStateStrict(serializedState);
  if (!state) return { ok: false, reason: 'invalid-learning-state' };
  if (!hasConsistentLearningStateReferences(state)) return { ok: false, reason: 'inconsistent-learning-state' };

  return { ok: true, state, exportedAt: value.exportedAt };
}



export function summarizeLearningDataImport(state: GuestState): LearningDataImportSummary {
  return {
    xp: state.xp,
    completedLessons: Object.values(state.lessonProgress).filter((record) => record.status === 'completed').length,
    masteredWords: Object.values(state.masteryStates).filter((status) => status === 'MASTERED').length,
    completedMissions: state.completedMissionIds.length,
    completedChallenges: state.completedChallengeIds.length,
  };
}
