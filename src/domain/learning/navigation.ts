import type { GuestState } from './guest-state.ts';
import { selectDueReviewItems } from './review.ts';

type NavigationItem = {
  href: '/' | '/learn' | '/challenges' | '/game' | '/action' | '/pulse';
  label: string;
  description: string;
  badge?: number;
};

export type AppNavigationPresentation = {
  items: NavigationItem[];
};

const labels = {
  en: {
    home: 'Home',
    learn: 'Learn',
    challenges: 'Challenges',
    game: 'Eco Game',
    action: 'Eco Action',
    pulse: 'My Progress',
    descriptions: { home: 'Overview and a clear starting point.', learn: 'Learn new English through Earth systems.', challenges: 'Test your reasoning in unlocked checkpoints.', game: 'Practice words and connections in short games.', action: 'Try a safe action away from the screen.', pulse: 'See progress and your recommended next step.' },
  },
  kk: {
    home: 'Басты бет',
    learn: 'Оқу',
    challenges: 'Сынақтар',
    game: 'Eco Game',
    action: 'Eco Action',
    pulse: 'Менің прогресім',
    descriptions: { home: 'Шолу және түсінікті бастау нүктесі.', learn: 'Жер жүйелері арқылы жаңа ағылшын тілін үйрен.', challenges: 'Ашылған checkpoint-терде ойлауыңды тексер.', game: 'Қысқа ойындарда сөздер мен байланыстарды жаттықтыр.', action: 'Экраннан тыс қауіпсіз әрекет жасап көр.', pulse: 'Прогресті және ұсынылған келесі қадамды көр.' },
  },
} as const;

export function resolveAppNavigationPresentation(state: GuestState, now: Date): AppNavigationPresentation {
  const locale = state.settings.preferredLocale;
  const copy = labels[locale];
  const dueReviewCount = selectDueReviewItems(Object.values(state.reviewRecords), now, 99).length;

  return {
    items: [
      { href: '/', label: copy.home, description: copy.descriptions.home },
      { href: '/learn', label: copy.learn, description: copy.descriptions.learn },
      { href: '/challenges', label: copy.challenges, description: copy.descriptions.challenges },
      { href: '/game', label: copy.game, description: copy.descriptions.game, ...(dueReviewCount > 0 ? { badge: dueReviewCount } : {}) },
      { href: '/action', label: copy.action, description: copy.descriptions.action },
      { href: '/pulse', label: copy.pulse, description: copy.descriptions.pulse },
    ],
  };
}

export type PrimaryNavigationHref = '/' | '/learn' | '/explore' | '/challenges' | '/game' | '/action' | '/pulse';

export function navigationSectionForPath(pathname: string): PrimaryNavigationHref | null {
  if (pathname === '/') return '/';
  if (pathname === '/learn' || pathname.startsWith('/learn/') || pathname.startsWith('/lesson/')) return '/learn';
  if (pathname === '/challenges' || pathname.startsWith('/challenge/')) return '/challenges';
  if (pathname === '/game' || pathname === '/review') return '/game';
  if (pathname === '/action' || pathname.startsWith('/mission/')) return '/action';
  if (pathname === '/pulse' || pathname === '/settings') return '/pulse';
  if (pathname === '/explore' || pathname.startsWith('/concept/')) return '/explore';
  return null;
}
