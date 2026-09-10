export type MasteryState = 'NEW' | 'SEEN' | 'LEARNING' | 'STRONG' | 'MASTERED';

export type MasteryEvidence = {
  exposures: number;
  recognition?: boolean;
  recall?: boolean;
  context?: boolean;
  delayedReview?: boolean;
};

export type MasterySignal = 'exposure' | 'recognition' | 'recall' | 'context' | 'delayedReview';

export function createMasteryEvidence(): MasteryEvidence {
  return {
    exposures: 0,
    recognition: false,
    recall: false,
    context: false,
    delayedReview: false,
  };
}

export function applyMasterySignal(evidence: MasteryEvidence, signal: MasterySignal): MasteryEvidence {
  const normalized: MasteryEvidence = {
    exposures: Math.max(0, evidence.exposures),
    recognition: evidence.recognition ?? false,
    recall: evidence.recall ?? false,
    context: evidence.context ?? false,
    delayedReview: evidence.delayedReview ?? false,
  };

  if (signal === 'exposure') {
    return { ...normalized, exposures: normalized.exposures + 1 };
  }

  return {
    ...normalized,
    exposures: Math.max(1, normalized.exposures),
    [signal]: true,
  };
}

export function evidenceForLegacyMasteryState(state: MasteryState): MasteryEvidence {
  const evidence = createMasteryEvidence();
  if (state === 'NEW') return evidence;
  if (state === 'SEEN') return applyMasterySignal(evidence, 'exposure');

  let migrated = applyMasterySignal(evidence, 'exposure');
  migrated = applyMasterySignal(migrated, 'recognition');
  if (state === 'LEARNING') return migrated;

  migrated = applyMasterySignal(migrated, 'recall');
  migrated = applyMasterySignal(migrated, 'context');
  if (state === 'STRONG') return migrated;

  return applyMasterySignal(migrated, 'delayedReview');
}

export function computeMasteryState(evidence: MasteryEvidence): MasteryState {
  if (evidence.exposures <= 0) return 'NEW';

  const { recognition = false, recall = false, context = false, delayedReview = false } = evidence;

  if (recognition && recall && context && delayedReview) return 'MASTERED';
  if (recognition && recall && context) return 'STRONG';
  if (recognition || recall || context) return 'LEARNING';
  return 'SEEN';
}

export function progressMasteryAfterReview(state: MasteryState, correct: boolean): MasteryState {
  if (!correct) {
    if (state === 'MASTERED' || state === 'STRONG' || state === 'LEARNING') return 'LEARNING';
    return state;
  }

  if (state === 'MASTERED') return 'MASTERED';
  if (state === 'STRONG') return 'MASTERED';
  if (state === 'LEARNING' || state === 'SEEN') return 'STRONG';
  return 'SEEN';
}
