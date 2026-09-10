import type { Metadata } from 'next';
import { AppNav } from '@/components/navigation/AppNav';
import { PulseSummary } from '@/components/progress/PulseSummary';
import { PageOrientation } from '@/components/navigation/PageOrientation';


export const metadata: Metadata = {
  title: 'My Pulse — EcoPulse',
  robots: { index: false, follow: false },
};

export default function PulsePage() {
  return <main className="product-page"><AppNav /><PulseSummary /></main>;
}
