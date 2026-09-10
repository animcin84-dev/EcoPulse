import type { Metadata } from 'next';
import { publicMetadataForPath } from '@/domain/learning/metadata-content';
import { AppNav } from '@/components/navigation/AppNav';
import { KnowledgeMap } from '@/components/explore/KnowledgeMap';
import { ProductHero } from '@/components/navigation/ProductHero';
import { PageOrientation } from '@/components/navigation/PageOrientation';


export const metadata: Metadata = publicMetadataForPath('/explore')!;

export default function ExplorePage() {
  return (
    <main className="product-page product-page--explore-sunlit">
      <AppNav />
      <PageOrientation kind="explore" />
      <ProductHero kind="explore" />
      <section className="explore-map-section"><div className="section-shell"><KnowledgeMap /></div></section>
    </main>
  );
}
