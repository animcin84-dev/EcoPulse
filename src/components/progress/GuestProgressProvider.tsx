'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createEmptyGuestState, type GuestState } from '@/domain/learning/guest-state';
import { documentLanguageForLocale } from '@/domain/learning/accessibility';
import { applyValidatedGuestStateUpdate } from '@/domain/learning/runtime-state-update';
import {
  GUEST_PROGRESS_STORAGE_KEY,
  flushGuestStateBeforeExit,
  getBrowserStorage,
  loadGuestStateWithStatus,
  saveGuestState,
  storageEventAffectsGuestProgress,
  type GuestPersistenceStatus,
} from '@/lib/guest-progress';

export type PersistenceStatus = GuestPersistenceStatus;

type GuestProgressContextValue = {
  state: GuestState;
  hydrated: boolean;
  persistenceStatus: PersistenceStatus;
  recoveryRaw: string | null;
  updateState: (updater: (current: GuestState) => GuestState) => void;
};

const GuestProgressContext = createContext<GuestProgressContextValue | null>(null);

export function GuestProgressProvider({ children }: { children?: ReactNode }) {
  const [state, setState] = useState<GuestState>(() => createEmptyGuestState());
  const [hydrated, setHydrated] = useState(false);
  const [persistenceStatus, setPersistenceStatus] = useState<PersistenceStatus>('checking');
  const [recoveryRaw, setRecoveryRaw] = useState<string | null>(null);
  const stateRef = useRef<GuestState>(state);
  const persistenceStatusRef = useRef<PersistenceStatus>(persistenceStatus);
  stateRef.current = state;
  persistenceStatusRef.current = persistenceStatus;

  useEffect(() => {
    const loaded = loadGuestStateWithStatus(getBrowserStorage(window));
    setState(loaded.state);
    if (loaded.integrity === 'corrupt' || loaded.integrity === 'incompatible' || loaded.integrity === 'unsupported') setRecoveryRaw(loaded.raw);
    else setRecoveryRaw(null);
    if (!loaded.available) setPersistenceStatus('unavailable');
    else if (loaded.integrity === 'corrupt') setPersistenceStatus('corrupt');
    else if (loaded.integrity === 'incompatible') setPersistenceStatus('incompatible');
    else if (loaded.integrity === 'unsupported') setPersistenceStatus('unsupported');
    else setPersistenceStatus('saved');
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || persistenceStatus === 'conflict' || persistenceStatus === 'corrupt' || persistenceStatus === 'incompatible' || persistenceStatus === 'unsupported') return;
    const saved = saveGuestState(state, getBrowserStorage(window));
    setPersistenceStatus(saved ? 'saved' : 'unavailable');
  }, [hydrated, persistenceStatus, state]);

  useEffect(() => {
    if (!hydrated) return;

    function handleStorage(event: StorageEvent) {
      if (!storageEventAffectsGuestProgress(event.key)) return;
      const browserStorage = getBrowserStorage(window);
      if (event.storageArea && browserStorage && event.storageArea !== browserStorage) return;
      if (persistenceStatus === 'corrupt' || persistenceStatus === 'incompatible' || persistenceStatus === 'unsupported') return;
      setPersistenceStatus('conflict');
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [hydrated, persistenceStatus]);

  useEffect(() => {
    if (!hydrated) return;

    function flushLatestState() {
      flushGuestStateBeforeExit(
        stateRef.current,
        persistenceStatusRef.current,
        getBrowserStorage(window),
      );
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') flushLatestState();
    }

    window.addEventListener('pagehide', flushLatestState);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.removeEventListener('pagehide', flushLatestState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.lang = documentLanguageForLocale(state.settings.preferredLocale);
    if (state.settings.motion === 'reduced') root.dataset.motion = 'reduced';
    else root.removeAttribute('data-motion');
  }, [hydrated, state.settings.motion, state.settings.preferredLocale]);

  const updateState = useCallback((updater: (current: GuestState) => GuestState) => {
    setState((current) => {
      const result = applyValidatedGuestStateUpdate(current, updater);
      if (!result.applied) return current;
      stateRef.current = result.state;
      return result.state;
    });
  }, []);

  const value = useMemo(
    () => ({ state, hydrated, persistenceStatus, recoveryRaw, updateState }),
    [state, hydrated, persistenceStatus, recoveryRaw, updateState],
  );
  return <GuestProgressContext.Provider value={value}>{children}</GuestProgressContext.Provider>;
}

export function useGuestProgress() {
  const context = useContext(GuestProgressContext);
  if (!context) throw new Error('useGuestProgress must be used inside GuestProgressProvider');
  return context;
}
