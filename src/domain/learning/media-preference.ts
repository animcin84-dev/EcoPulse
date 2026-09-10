import type { MediaPreference } from './settings.ts';

export function shouldLoadInstitutionalMedia(
  preference: MediaPreference,
  browserSaveData: boolean | null,
): boolean {
  if (preference === 'reduced') return false;
  if (browserSaveData === null) return false;
  return browserSaveData === false;
}
