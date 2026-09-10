import {
  parseGuestStateStrict,
  serializeGuestState,
  type GuestState,
} from './guest-state.ts';
import { hasConsistentLearningStateReferences } from './state-integrity.ts';

export type ValidatedGuestStateUpdateResult = {
  state: GuestState;
  applied: boolean;
};

function canonicalGuestState(state: GuestState): GuestState | null {
  const parsed = parseGuestStateStrict(serializeGuestState(state));
  if (!parsed || !hasConsistentLearningStateReferences(parsed)) return null;
  return parsed;
}

export function applyValidatedGuestStateUpdate(
  current: GuestState,
  updater: (draft: GuestState) => GuestState,
): ValidatedGuestStateUpdateResult {
  const draft = canonicalGuestState(current);
  if (!draft) return { state: current, applied: false };

  const candidate = updater(draft);
  const validated = canonicalGuestState(candidate);
  if (!validated) return { state: current, applied: false };

  return { state: validated, applied: true };
}
