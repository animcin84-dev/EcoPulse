export type PreferredLocale = 'en' | 'kk';
export type MotionPreference = 'system' | 'reduced';
export type MediaPreference = 'auto' | 'reduced';

export type LearningSettings = {
  preferredLocale: PreferredLocale;
  motion: MotionPreference;
  media: MediaPreference;
};

export function createDefaultLearningSettings(): LearningSettings {
  return {
    preferredLocale: 'en',
    motion: 'system',
    media: 'auto',
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseLearningSettingsStrict(value: unknown): LearningSettings | null {
  if (!isRecord(value)) return null;
  if (value.preferredLocale !== 'en' && value.preferredLocale !== 'kk') return null;
  if (value.motion !== 'system' && value.motion !== 'reduced') return null;
  if (value.media !== 'auto' && value.media !== 'reduced') return null;
  return {
    preferredLocale: value.preferredLocale,
    motion: value.motion,
    media: value.media,
  };
}

export function normalizeLearningSettings(value: unknown): LearningSettings {
  const defaults = createDefaultLearningSettings();
  if (!isRecord(value)) return defaults;
  return {
    preferredLocale: value.preferredLocale === 'kk' || value.preferredLocale === 'en'
      ? value.preferredLocale
      : defaults.preferredLocale,
    motion: value.motion === 'reduced' || value.motion === 'system'
      ? value.motion
      : defaults.motion,
    media: value.media === 'reduced' || value.media === 'auto'
      ? value.media
      : defaults.media,
  };
}

export function updateLearningSettings(
  current: LearningSettings,
  patch: Partial<LearningSettings>,
): LearningSettings {
  return normalizeLearningSettings({ ...current, ...patch });
}
