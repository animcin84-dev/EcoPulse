import type { Metadata } from 'next';
import { OnboardingExperience } from '@/components/onboarding/OnboardingExperience';


export const metadata: Metadata = {
  title: 'Start Your Pulse — EcoPulse',
  robots: { index: false, follow: false },
};

export default function StartPage() {
  return <OnboardingExperience />;
}
