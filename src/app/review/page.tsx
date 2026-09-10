import type { Metadata } from 'next';
import { AppNav } from '@/components/navigation/AppNav';
import { ReviewSession } from '@/components/review/ReviewSession';
import { PageOrientation } from '@/components/navigation/PageOrientation';


export const metadata: Metadata = {
  title: 'Review — EcoPulse',
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return <main className="product-page"><AppNav /><ReviewSession /></main>;
}
