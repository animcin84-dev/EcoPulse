import type { ListeningStep } from '../content/types.ts';
import type { LearningLevel } from './onboarding.ts';

export type ListeningPlaybackPlan = {
  text: string;
  lang: 'en-US';
  rate: number;
  audioSrc?: string;
};

const speechRateByLevel: Record<LearningLevel, number> = {
  A2: 0.78,
  B1: 0.88,
  B2: 0.98,
};

export function buildListeningPlaybackPlan(
  step: ListeningStep,
  level: LearningLevel,
): ListeningPlaybackPlan | null {
  const text = step.utterances[level].trim().replace(/\s+/g, ' ');
  if (!text) return null;
  const audioSrc = step.audioSrcByLevel?.[level];
  return {
    text,
    lang: 'en-US',
    rate: speechRateByLevel[level],
    ...(audioSrc ? { audioSrc } : {}),
  };
}
