import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LessonExperience } from '@/components/lesson/LessonExperience';
import { lessonSequence, lessonsBySlug } from '@/content';


export const metadata: Metadata = {
  title: 'Lesson — EcoPulse',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return lessonSequence.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = lessonsBySlug[slug as keyof typeof lessonsBySlug];
  if (!lesson) notFound();
  return <LessonExperience lesson={lesson} />;
}
