import type { Metadata } from 'next';
import { publicMetadataForPath } from '@/domain/learning/metadata-content';
import { AppNav } from '@/components/navigation/AppNav';
import { LearnJourney } from '@/components/learning/LearnJourney';
import { PageOrientation } from '@/components/navigation/PageOrientation';


export const metadata: Metadata = publicMetadataForPath('/learn')!;

export default function LearnPage() {
  return (
    <main className="product-page">
      <AppNav />
      <PageOrientation kind="learn" />
      <LearnJourney />
    </main>
  );
}
