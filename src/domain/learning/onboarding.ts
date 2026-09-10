export type LearningLevel = 'A2' | 'B1' | 'B2';
export type SupportLanguage = 'kk';

export const onboardingInterestIds = ['climate', 'water', 'life', 'cities', 'energy'] as const;
export type OnboardingInterest = (typeof onboardingInterestIds)[number];

export type OnboardingPreferences = {
  completed: boolean;
  level: LearningLevel | null;
  supportLanguage: SupportLanguage;
  interests: OnboardingInterest[];
};

const approvedInterests = new Set<string>(onboardingInterestIds);

export function createDefaultOnboardingPreferences(): OnboardingPreferences {
  return {
    completed: false,
    level: null,
    supportLanguage: 'kk',
    interests: [],
  };
}

export function inferDiagnosticLevel(results: readonly boolean[]): LearningLevel {
  const correct = results.filter(Boolean).length;
  if (correct <= 1) return 'A2';
  if (correct === 2) return 'B1';
  return 'B2';
}

export function normalizeInterests(values: readonly string[]): OnboardingInterest[] {
  const result: OnboardingInterest[] = [];
  for (const value of values) {
    if (!approvedInterests.has(value) || result.includes(value as OnboardingInterest)) continue;
    result.push(value as OnboardingInterest);
  }
  return result;
}
