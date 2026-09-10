import type { MasteryState } from './mastery.ts';

export type LearningProfileInput = {
  xp: number;
  masteryStates: Record<string, MasteryState>;
  connectedConceptIds: string[];
  completedScenarioIds: string[];
  completedMissionIds: string[];
};

export type LearningProfileSummary = {
  pulseLevel: number;
  xp: number;
  masteredWords: number;
  strongWords: number;
  learningWords: number;
  seenWords: number;
  connectedConcepts: number;
  completedScenarios: number;
  completedMissions: number;
};

export function calculatePulseLevel(xp: number): number {
  return Math.floor(Math.max(0, xp) / 250) + 1;
}

export function summarizeLearningProfile(input: LearningProfileInput): LearningProfileSummary {
  const values = Object.values(input.masteryStates);
  return {
    pulseLevel: calculatePulseLevel(input.xp),
    xp: Math.max(0, input.xp),
    masteredWords: values.filter((state) => state === 'MASTERED').length,
    strongWords: values.filter((state) => state === 'STRONG').length,
    learningWords: values.filter((state) => state === 'LEARNING').length,
    seenWords: values.filter((state) => state === 'SEEN').length,
    connectedConcepts: new Set(input.connectedConceptIds).size,
    completedScenarios: new Set(input.completedScenarioIds).size,
    completedMissions: new Set(input.completedMissionIds).size,
  };
}
