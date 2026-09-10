import type { Metadata } from 'next';
import { publicMetadataForPath } from '@/domain/learning/metadata-content';
import { AppNav } from '@/components/navigation/AppNav';
import { WorldChallengeList } from '@/components/challenges/WorldChallengeList';
import { ProductHero } from '@/components/navigation/ProductHero';
import { PageOrientation } from '@/components/navigation/PageOrientation';


export const metadata: Metadata = publicMetadataForPath('/challenges')!;

export default function ChallengesPage() {
  return (
    <main className="product-page challenges-overview-page">
      <AppNav />
      <PageOrientation kind="challenges" />
      <ProductHero kind="challenges" />
      <section className="challenges-list-section"><div className="section-shell"><WorldChallengeList /></div></section>
    </main>
  );
}
