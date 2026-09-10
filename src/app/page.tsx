import type { Metadata } from 'next';
import { publicMetadataForPath } from '@/domain/learning/metadata-content';
import { ConnectionPreview } from '@/components/home/ConnectionPreview';
import { Hero } from '@/components/home/Hero';
import { HomeLearningDemo } from '@/components/home/HomeLearningDemo';
import { HomeStorySections } from '@/components/home/HomeStorySections';
import { HomeWelcome } from '@/components/home/HomeWelcome';
import { HomeTopics } from '@/components/home/HomeTopics';
import { HomeProductMap } from '@/components/home/HomeProductMap';


export const metadata: Metadata = publicMetadataForPath('/')!;

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HomeWelcome />
      <HomeProductMap />
      <HomeTopics />
      <ConnectionPreview />
      <HomeLearningDemo />
      <HomeStorySections />
    </main>
  );
}
