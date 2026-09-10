import type { Metadata } from 'next';
import { Geologica, Noto_Serif_Display } from 'next/font/google';
import './globals.css';
import './reference-tokens.css';
import './sunlit.css';
import './climate.css';
import './experiences.css';
import './product-polish.css';
import './continuity.css';
import './continuation.css';
import './steep-editorial.css';
import './steep-motion.css';
import './awwwards-polish.css';
import './awwwards-motion.css';
import './awwwards-appwide.css';
import './accessibility.css';
import { GuestProgressProvider } from '@/components/progress/GuestProgressProvider';
import { SkipLink } from '@/components/accessibility/SkipLink';
import { PersistenceNotice } from '@/components/progress/PersistenceNotice';
import { NavigationTransitionController } from '@/components/navigation/NavigationTransitionController';
import { SiteMotionController } from '@/components/motion/SiteMotionController';

const geologica = Geologica({
  variable: '--font-geologica',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const notoSerifDisplay = Noto_Serif_Display({
  variable: '--font-editorial',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EcoPulse — Learn English. Understand Earth.',
  description: 'Learn environmental English through connected systems, critical thinking and real-world action.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geologica.variable} ${notoSerifDisplay.variable}`}>
        <GuestProgressProvider>
          <SkipLink />
          <PersistenceNotice />
          <NavigationTransitionController />
          <SiteMotionController />
          <div id="main-content" tabIndex={-1}>{children}</div>
        </GuestProgressProvider>
      </body>
    </html>
  );
}
