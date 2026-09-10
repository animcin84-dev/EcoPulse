import test from 'node:test';
import assert from 'node:assert/strict';
import { lessonSequence } from '../src/content/index.ts';
import { scienceSources, scienceSourcesById, sourceRequirementsByLesson } from '../src/content/science-sources.ts';

test('science sources declare non-empty claim coverage and current official domains', () => {
  const allowed = ['nasa.gov', 'usgs.gov', 'noaa.gov', 'unep.org', 'fao.org', 'epa.gov', 'ipbes.net', 'iea.org'];
  const checkedAfter = new Date('2026-01-01T00:00:00Z').getTime();
  const today = new Date('2026-09-10T23:59:59Z').getTime();

  for (const source of scienceSources) {
    assert.ok(source.claimTags.length > 0, source.id);
    const hostname = new URL(source.url).hostname;
    assert.ok(allowed.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`)), `${source.id}: ${hostname}`);
    const checked = new Date(`${source.lastChecked}T00:00:00Z`).getTime();
    assert.ok(Number.isFinite(checked) && checked >= checkedAfter && checked <= today, `${source.id}: ${source.lastChecked}`);
  }
});

test('every production lesson has source claim coverage for its scientific focus', () => {
  for (const lesson of lessonSequence) {
    const required = sourceRequirementsByLesson[lesson.slug];
    assert.ok(required?.length, `${lesson.slug}: missing source requirement`);
    const covered = new Set(lesson.sourceIds.flatMap((id) => scienceSourcesById[id]?.claimTags ?? []));
    for (const tag of required) assert.ok(covered.has(tag), `${lesson.slug}: missing ${tag}`);
  }
});

test('adaptive readings have source coverage for the extra scientific detail they introduce', () => {
  assert.ok(sourceRequirementsByLesson.glaciers?.includes('glacier-basics' as never));
  assert.ok(sourceRequirementsByLesson.drought?.includes('drought-basics' as never));
  assert.ok(sourceRequirementsByLesson['sea-level']?.includes('local-sea-level' as never));
});

test('adaptive listenings have explicit source coverage for their scientific focus', async () => {
  const { sourceRequirementsByListening } = await import('../src/content/science-sources.ts');
  for (const lesson of lessonSequence) {
    const listening = lesson.steps.find((step) => step.type === 'listening');
    assert.ok(listening, `${lesson.slug}: missing listening step`);
    const required = sourceRequirementsByListening[lesson.slug];
    assert.ok(required?.length, `${lesson.slug}: missing listening source requirement`);
    const covered = new Set(lesson.sourceIds.flatMap((id) => scienceSourcesById[id]?.claimTags ?? []));
    for (const tag of required) assert.ok(covered.has(tag), `${lesson.slug}: listening missing ${tag}`);
  }
});
