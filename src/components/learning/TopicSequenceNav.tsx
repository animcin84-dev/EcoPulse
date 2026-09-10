import Link from 'next/link';
import { homeTopics } from '@/content/home-topics';

type Locale = 'en' | 'kk';

export function TopicSequenceNav({ currentId, locale }: { currentId: string; locale: Locale }) {
  const index = homeTopics.findIndex((topic) => topic.id === currentId);
  if (index < 0) return null;
  const previous = index > 0 ? homeTopics[index - 1] : null;
  const next = index < homeTopics.length - 1 ? homeTopics[index + 1] : null;
  const current = homeTopics[index]!;
  const kk = locale === 'kk';

  return (
    <nav className="topic-sequence-nav" aria-label={kk ? 'Экологиялық тақырыптар реті' : 'Environmental topic sequence'}>
      <div className="section-shell topic-sequence-nav__shell">
        <div className="topic-sequence-nav__progress">
          <span>{kk ? 'ТАҚЫРЫПТАР АТЛАСЫ' : 'TOPIC ATLAS'}</span>
          <strong>{String(index + 1).padStart(2, '0')} / 08</strong>
          <div
            role="progressbar"
            aria-label={kk ? 'Тақырыптар атласындағы ілгерілеу' : 'Topic atlas progress'}
            aria-valuemin={1}
            aria-valuenow={index + 1}
            aria-valuemax={homeTopics.length}
            aria-valuetext={`${current.title[locale]} — ${index + 1} / ${homeTopics.length}`}
          >
            <i aria-hidden="true" style={{ width: `${((index + 1) / homeTopics.length) * 100}%` }} />
          </div>
          <p>{current.title[locale]}</p>
        </div>
        <div className="topic-sequence-nav__links">
          {previous ? (
            <Link href={previous.href} className="topic-sequence-nav__link topic-sequence-nav__link--previous">
              <span>← {kk ? 'АЛДЫҢҒЫ' : 'PREVIOUS'}</span>
              <strong>{previous.title[locale]}</strong>
            </Link>
          ) : <span className="topic-sequence-nav__edge">{kk ? 'БІРІНШІ ТАҚЫРЫП' : 'FIRST TOPIC'}</span>}
          {next ? (
            <Link href={next.href} className="topic-sequence-nav__link topic-sequence-nav__link--next">
              <span>{kk ? 'КЕЛЕСІ ТАҚЫРЫП' : 'NEXT TOPIC'} →</span>
              <strong>{next.title[locale]}</strong>
            </Link>
          ) : <Link href="/learn" className="topic-sequence-nav__link topic-sequence-nav__link--next"><span>{kk ? 'АТЛАСҚА ҚАЙТУ' : 'RETURN TO ATLAS'} →</span><strong>{kk ? 'Барлық 8 тақырып' : 'All 8 topics'}</strong></Link>}
        </div>
      </div>
    </nav>
  );
}
