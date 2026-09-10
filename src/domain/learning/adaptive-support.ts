import type { LearningLevel } from './onboarding.ts';

export type AdaptiveSupportMode = 'guided' | 'standard' | 'impact';

export type AdaptiveSupportProfile = {
  level: LearningLevel;
  mode: AdaptiveSupportMode;
  autoShowKazakhMeaning: boolean;
  showBilingualChoiceSupport: boolean;
  showHintBeforeAttempt: boolean;
  showHintAfterFirstAttempt: boolean;
  requireThinkReasoning: boolean;
};

export function resolveAdaptiveSupport(level: LearningLevel | null): AdaptiveSupportProfile {
  if (level === 'A2') {
    return {
      level: 'A2',
      mode: 'guided',
      autoShowKazakhMeaning: true,
      showBilingualChoiceSupport: true,
      showHintBeforeAttempt: true,
      showHintAfterFirstAttempt: true,
      requireThinkReasoning: false,
    };
  }

  if (level === 'B2') {
    return {
      level: 'B2',
      mode: 'impact',
      autoShowKazakhMeaning: false,
      showBilingualChoiceSupport: false,
      showHintBeforeAttempt: false,
      showHintAfterFirstAttempt: false,
      requireThinkReasoning: true,
    };
  }

  return {
    level: 'B1',
    mode: 'standard',
    autoShowKazakhMeaning: false,
    showBilingualChoiceSupport: false,
    showHintBeforeAttempt: false,
    showHintAfterFirstAttempt: true,
    requireThinkReasoning: false,
  };
}

export function isReasoningResponseReady(value: string): boolean {
  const words = value.trim().split(/\s+/).filter(Boolean);
  return words.length >= 3;
}
