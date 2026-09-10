import { educationalMediaById, type EducationalMediaAsset } from './media-assets.ts';

const lessonMediaIds: Record<string, string> = {
  atmosphere: 'atmosphere-limb',
  glaciers: 'easton-glacier',
  habitats: 'tidal-wetland-habitat',
};

export function resolveHomeMedia(): EducationalMediaAsset | null {
  return educationalMediaById['atmosphere-limb'] ?? null;
}

export function resolveLessonMedia(lessonSlug: string): EducationalMediaAsset | null {
  const mediaId = lessonMediaIds[lessonSlug];
  return mediaId ? educationalMediaById[mediaId] ?? null : null;
}
