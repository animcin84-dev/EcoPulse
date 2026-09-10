'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { homeTopics } from '@/content/home-topics';
import { productCopy } from '@/domain/learning/product-copy';
import { useGuestProgress } from '../progress/GuestProgressProvider';

type TopicVisualProps = { visual: (typeof homeTopics)[number]['visual'] };

function TopicVisual({ visual }: TopicVisualProps) {
  return (
    <div className={`topic-visual topic-visual--${visual}`} aria-hidden="true">
      <span className="topic-visual__orb topic-visual__orb--one" />
      <span className="topic-visual__orb topic-visual__orb--two" />
      <span className="topic-visual__line" />
      <span className="topic-visual__dot" />
    </div>
  );
}

export function HomeTopics() {
  const { state } = useGuestProgress();
  const locale = state.settings.preferredLocale;
  const copy = productCopy[locale].home;

  return (
    <section className="home-topics" id="topics" aria-labelledby="home-topics-title">
      <div className="section-shell">
        <div className="home-topics__heading">
          <div>
            <p className="eyebrow eyebrow--dark">{copy.topicsEyebrow.toUpperCase()}</p>
            <h2 id="home-topics-title">{copy.topicsTitle}</h2>
          </div>
          <p>{copy.topicsBody}</p>
        </div>

        <div className="home-topics__grid">
          {homeTopics.map((topic) => (
            <Link
              className={`topic-card topic-card--${topic.visual}`}
              href={topic.href}
              key={topic.id}
              aria-label={`${topic.title.en} — ${topic.title.kk}`}
              style={{ viewTransitionName: `topic-${topic.id}` } as CSSProperties}
            >
              <div className="topic-card__top">
                <span>{topic.index}</span>
                <span>{topic.kicker[locale]}</span>
              </div>
              <TopicVisual visual={topic.visual} />
              <div className="topic-card__copy">
                <h3 lang="en">{topic.title.en}</h3>
                <p lang="kk">{topic.title.kk}</p>
              </div>
              <span className="topic-card__action">{copy.topicsAction}<i aria-hidden="true">↗</i></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
