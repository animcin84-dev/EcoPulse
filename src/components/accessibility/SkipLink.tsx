'use client';

import { useGuestProgress } from '../progress/GuestProgressProvider';

export function SkipLink() {
  const { state } = useGuestProgress();
  const label = state.settings.preferredLocale === 'kk' ? 'Негізгі мазмұнға өту' : 'Skip to main content';

  return <a className="skip-link" href="#main-content">{label}</a>;
}
