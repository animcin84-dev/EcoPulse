import type { Metadata } from 'next';
import { AppNav } from '@/components/navigation/AppNav';
import { ClimateChangeModule } from '@/components/learning/ClimateChangeModule';

export const metadata: Metadata = {
  title: 'Climate Change — EcoPulse',
  description: 'Learn climate-change English through an evidence-backed reading, comprehension check and bilingual vocabulary practice.',
};

export default function ClimateChangePage() {
  return (
    <main className="product-page climate-module-page">
      <AppNav />
      <ClimateChangeModule />
    </main>
  );
}
