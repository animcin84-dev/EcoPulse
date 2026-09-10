import type { Metadata } from 'next';
import { atmosphereLesson } from '@/content';
import { LessonExperience } from '@/components/lesson/LessonExperience';

export const metadata: Metadata = {
  title: 'Atmosphere Lesson — EcoPulse',
  robots: { index: false, follow: false },
};

export default function AtmosphereLessonPage() {
  return <LessonExperience lesson={atmosphereLesson} />;
}
