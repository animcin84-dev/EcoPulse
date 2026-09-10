import type { ChoiceOption, LocalizedText } from './types.ts';

export type WorldChallengeQuestion = {
  id: string;
  prompt: LocalizedText;
  options: ChoiceOption[];
  bestOptionId: string;
  explanation: LocalizedText;
};

export type WorldChallenge = {
  id: string;
  slug: string;
  world: string;
  title: LocalizedText;
  intro: LocalizedText;
  estimatedMinutes: number;
  sourceIds: string[];
  reasoningPrompt: LocalizedText;
  xp: 50;
  questions: WorldChallengeQuestion[];
};
