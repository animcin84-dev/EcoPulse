import type { Metadata } from 'next';
import { AppNav } from '@/components/navigation/AppNav';
import { ReviewSession } from '@/components/review/ReviewSession';
import { EcoArcadeExperience } from '@/components/game/EcoArcadeExperience';
import { EcoGameHub } from '@/components/game/EcoGameHub';
import { EcoGameReviewIntro } from '@/components/game/EcoGameReviewIntro';
import { PageOrientation } from '@/components/navigation/PageOrientation';

export const metadata: Metadata = {
  title: 'Eco Game — EcoPulse',
  description: 'Practice environmental English with fast interactive recall and connection challenges.',
  robots: { index: false, follow: false },
};



export default function EcoGamePage() {
  return (
    <main className="product-page eco-game-page">
      <AppNav />
      <PageOrientation kind="game" />
      <EcoGameHub />

      <EcoArcadeExperience />

      <section className="eco-arcade-live" id="live-round" aria-labelledby="eco-live-title">
        <EcoGameReviewIntro />
        <ReviewSession />
      </section>
    </main>
  );
}
