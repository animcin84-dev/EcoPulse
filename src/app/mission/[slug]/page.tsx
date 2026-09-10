import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppNav } from '@/components/navigation/AppNav';
import { MissionExperience } from '@/components/missions/MissionExperience';
import { missions, missionsById } from '@/content/missions';

export const metadata: Metadata = {
  title: 'Eco Mission — EcoPulse',
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return missions.map((mission) => ({ slug: mission.id }));
}

export default async function MissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = missionsById[slug];
  if (!mission) notFound();

  return (
    <main className="product-page product-page--mission-sunlit">
      <AppNav />
      <MissionExperience mission={mission} />
    </main>
  );
}
