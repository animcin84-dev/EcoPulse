import {
  createEmptyGuestState,
  GUEST_STATE_VERSION,
  parseGuestState,
  parseGuestStateStrict,
  serializeGuestState,
  type GuestState,
} from '../domain/learning/guest-state.ts';
import { hasConsistentLearningStateReferences } from '../domain/learning/state-integrity.ts';

export const GUEST_PROGRESS_STORAGE_KEY = 'ecopulse:guest-progress:v1';

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

type StorageSource = { readonly localStorage: StorageLike };

export type GuestPersistenceStatus = 'checking' | 'saved' | 'unavailable' | 'conflict' | 'corrupt' | 'incompatible' | 'unsupported';

export function getBrowserStorage(source?: StorageSource): StorageLike | undefined {
  if (!source) return undefined;
  try {
    return source.localStorage;
  } catch {
    return undefined;
  }
}


export function storageEventAffectsGuestProgress(key: string | null): boolean {
  return key === null || key === GUEST_PROGRESS_STORAGE_KEY;
}

export type GuestSnapshotIntegrity = 'unavailable' | 'empty' | 'valid' | 'corrupt' | 'incompatible' | 'unsupported';

export type GuestStateLoadResult = {
  state: GuestState;
  available: boolean;
  integrity: GuestSnapshotIntegrity;
  raw: string | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function loadGuestStateWithStatus(storage?: StorageLike): GuestStateLoadResult {
  if (!storage) {
    return { state: createEmptyGuestState(), available: false, integrity: 'unavailable', raw: null };
  }

  let raw: string | null;
  try {
    raw = storage.getItem(GUEST_PROGRESS_STORAGE_KEY);
  } catch {
    return { state: createEmptyGuestState(), available: false, integrity: 'unavailable', raw: null };
  }

  if (raw === null) {
    return { state: createEmptyGuestState(), available: true, integrity: 'empty', raw: null };
  }

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { state: createEmptyGuestState(), available: true, integrity: 'corrupt', raw };
  }

  if (!isRecord(value)) {
    return { state: createEmptyGuestState(), available: true, integrity: 'corrupt', raw };
  }

  const schemaVersion = value.schemaVersion;
  if (typeof schemaVersion !== 'number' || !Number.isInteger(schemaVersion)) {
    return { state: createEmptyGuestState(), available: true, integrity: 'corrupt', raw };
  }
  if (schemaVersion < 1 || schemaVersion > GUEST_STATE_VERSION) {
    return { state: createEmptyGuestState(), available: true, integrity: 'unsupported', raw };
  }

  const strictState = parseGuestStateStrict(raw);
  if (!strictState) {
    return { state: createEmptyGuestState(), available: true, integrity: 'corrupt', raw };
  }
  if (!hasConsistentLearningStateReferences(strictState)) {
    return { state: createEmptyGuestState(), available: true, integrity: 'incompatible', raw };
  }

  return { state: strictState, available: true, integrity: 'valid', raw };
}

export function loadGuestState(storage?: StorageLike): GuestState {
  return loadGuestStateWithStatus(storage).state;
}

export function saveGuestState(state: GuestState, storage?: StorageLike): boolean {
  if (!storage) return false;
  try {
    storage.setItem(GUEST_PROGRESS_STORAGE_KEY, serializeGuestState(state));
    return true;
  } catch {
    return false;
  }
}

export function flushGuestStateBeforeExit(
  state: GuestState,
  status: GuestPersistenceStatus,
  storage?: StorageLike,
): boolean {
  if (status !== 'saved' && status !== 'unavailable') return false;
  return saveGuestState(state, storage);
}

export function clearGuestState(storage?: StorageLike): boolean {
  if (!storage) return false;
  try {
    storage.removeItem(GUEST_PROGRESS_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
