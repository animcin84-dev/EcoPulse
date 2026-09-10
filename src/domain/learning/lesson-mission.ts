import { missionsById, type EcoMission } from '../../content/missions.ts';

export const missionIdByLessonSlug = {
  atmosphere: 'sky-check',
  'weather-climate': 'sky-check',
  glaciers: 'water-watch',
  'sea-level': 'water-watch',
  drought: 'eco-connection',
  'wildfire-extreme-weather': 'eco-connection',
  habitats: 'habitat-observer',
  'ocean-change': 'habitat-observer',
} as const;

export function resolveLessonMission(lessonSlug: string): EcoMission | null {
  const missionId = missionIdByLessonSlug[lessonSlug as keyof typeof missionIdByLessonSlug];
  if (!missionId) return null;
  return missionsById[missionId] ?? null;
}
