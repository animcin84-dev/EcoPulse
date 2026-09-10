import type { Metadata } from 'next';
import { AppNav } from '@/components/navigation/AppNav';
import { MissionList } from '@/components/missions/MissionList';
import { EcoActionHero } from '@/components/missions/EcoActionHero';
import { PageOrientation } from '@/components/navigation/PageOrientation';

export const metadata: Metadata = {
  title: 'Eco Action — EcoPulse',
  description: 'Take environmental English off-screen with small, safe and privacy-respecting actions.',
  robots: { index: false, follow: false },
};

export default function EcoActionPage() {
  return (
    <main className="product-page eco-action-page">
      <AppNav />
      <PageOrientation kind="action" />
      <EcoActionHero />
      <section className="challenges-list-section action-mission-section" id="missions"><div className="section-shell"><MissionList /></div></section>
    </main>
  );
}
