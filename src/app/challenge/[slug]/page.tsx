import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { worldChallenges, worldChallengesBySlug } from '@/content/world-challenges';
import { WorldChallengeExperience } from '@/components/challenges/WorldChallengeExperience';


export const metadata: Metadata = {
  title: 'World Challenge — EcoPulse',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return worldChallenges.map((challenge) => ({ slug: challenge.slug }));
}

export default async function WorldChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = worldChallengesBySlug[slug];
  if (!challenge) notFound();
  return <WorldChallengeExperience challenge={challenge} />;
}
