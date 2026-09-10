import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppNav } from '@/components/navigation/AppNav';
import { WorldExperience } from '@/components/learning/WorldExperience';
import { worldPresentation } from '@/content/lesson-presentation';
import { resolveWorldDetail } from '@/domain/learning/world-detail';
import { worldMetadataForId } from '@/domain/learning/metadata-content';

export function generateStaticParams() {
  return Object.keys(worldPresentation).map((world) => ({ world }));
}

export async function generateMetadata({ params }: { params: Promise<{ world: string }> }): Promise<Metadata> {
  const { world } = await params;
  const content = worldMetadataForId(world);
  if (!content) return { title: 'World — EcoPulse', robots: { index: false, follow: false } };
  return content;
}

export default async function WorldPage({ params }: { params: Promise<{ world: string }> }) {
  const { world } = await params;
  if (!resolveWorldDetail(world)) notFound();

  return (
    <main className="product-page product-page--world-sunlit">
      <AppNav />
      <WorldExperience worldId={world} />
    </main>
  );
}
