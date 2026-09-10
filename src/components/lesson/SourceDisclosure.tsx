import { resolveScienceSources } from '@/content/science-sources';
import { lessonUiCopy } from '@/domain/learning/lesson-ui-copy';
import type { PreferredLocale } from '@/domain/learning/settings';

export function SourceDisclosure({ sourceIds, locale }: { sourceIds: readonly string[]; locale: PreferredLocale }) {
  const sources = resolveScienceSources(sourceIds);
  const copy = lessonUiCopy[locale].sources;
  if (sources.length === 0) return null;

  return (
    <details className="source-disclosure">
      <summary>
        <span>{copy.title.toUpperCase()}</span>
        <small>{sources.length} {sources.length === 1 ? copy.officialSource : copy.officialSources}</small>
      </summary>
      <div className="source-disclosure__body">
        <p>
          {copy.intro}
        </p>
        <ul>
          {sources.map((source) => (
            <li key={source.id}>
              <a href={source.url} target="_blank" rel="noreferrer">
                <span>{source.institution}</span>
                <strong>{source.title}</strong>
                <small>{copy.checked} {source.lastChecked} ↗</small>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
