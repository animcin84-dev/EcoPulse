'use client';

import { useGuestProgress } from '../progress/GuestProgressProvider';

export function EcoGameReviewIntro() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const kk = locale === 'kk';

  return (
    <div className="section-shell eco-arcade-live__heading">
      <div>
        <p className="eyebrow eyebrow--dark">{kk ? 'ЖАД / АРАЛЫҚ ҚАЙТАЛАУ' : 'LIVE MODE / SPACED REVIEW'}</p>
        <h2 id="eco-live-title">{kk ? 'Сенің есте сақтау кезегің.' : 'Your memory queue.'}</h2>
      </div>
      <p>{kk
        ? 'Негізгі сабақтар review дәлелін жасаған кезде сөздер осында шығады. Кезек бос болса, оқуды жалғастырып, кейін қайта орал.'
        : 'Items appear here when structured lessons have created review evidence. If the queue is clear, keep learning and come back later.'}</p>
    </div>
  );
}
