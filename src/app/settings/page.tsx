import type { Metadata } from 'next';
import { AppNav } from '@/components/navigation/AppNav';
import { LearningSettingsPanel } from '@/components/settings/LearningSettingsPanel';
import { PageOrientation } from '@/components/navigation/PageOrientation';


export const metadata: Metadata = {
  title: 'Settings — EcoPulse',
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <main className="product-page">
      <AppNav />
      <PageOrientation kind="settings" />
      <LearningSettingsPanel />
    </main>
  );
}
