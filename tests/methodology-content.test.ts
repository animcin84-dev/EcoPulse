import test from 'node:test';
import assert from 'node:assert/strict';
import { methodologyCopy, resolveMethodologySnapshot } from '../src/domain/learning/methodology.ts';
import { lessonSequence } from '../src/content/index.ts';
import { scienceSources } from '../src/content/science-sources.ts';
import { educationalMedia } from '../src/content/media-assets.ts';
import { knowledgeGraph } from '../src/content/knowledge-graph.ts';

const locales = ['en', 'kk'] as const;

const requiredStages = ['learn', 'understand', 'connect', 'think', 'act', 'review', 'master'] as const;
const requiredEvidence = ['recognition', 'recall', 'context', 'delayedReview'] as const;

test('methodology copy is complete in English and Kazakh', () => {
  for (const locale of locales) {
    const copy = methodologyCopy[locale];
    assert.ok(copy.hero.eyebrow.length > 0, locale);
    assert.ok(copy.hero.title.length > 0, locale);
    assert.ok(copy.hero.body.length >= 80, locale);
    assert.ok(copy.flow.title.length > 0, locale);
    assert.deepEqual(copy.flow.stages.map((stage) => stage.id), requiredStages, locale);
    assert.deepEqual(copy.mastery.evidence.map((item) => item.id), requiredEvidence, locale);
    assert.ok(copy.science.title.length > 0, locale);
    assert.ok(copy.privacy.items.length >= 4, locale);
    assert.ok(copy.accessibility.items.length >= 4, locale);
    assert.ok(copy.final.title.length > 0, locale);
  }
});

test('methodology snapshot derives proof numbers from authored production content', () => {
  const snapshot = resolveMethodologySnapshot();
  assert.equal(snapshot.lessons, lessonSequence.length);
  assert.equal(snapshot.worlds, new Set(lessonSequence.map((lesson) => lesson.world)).size);
  assert.equal(snapshot.scienceSources, scienceSources.length);
  assert.equal(snapshot.mediaAssets, educationalMedia.length);
  assert.equal(snapshot.relationTypes, new Set(knowledgeGraph.relations.map((edge) => edge.type)).size);
});

test('methodology makes knowledge evidence distinct from XP activity progression', () => {
  for (const locale of locales) {
    const copy = methodologyCopy[locale];
    assert.match(copy.mastery.body.toLowerCase(), locale === 'en' ? /xp/ : /xp/);
    assert.match(copy.mastery.body.toLowerCase(), locale === 'en' ? /evidence/ : /дәлел/);
  }
});

import { existsSync, readFileSync } from 'node:fs';
import { publicMetadataForPath } from '../src/domain/learning/metadata-content.ts';

test('methodology is a real public route with authored metadata and a Home entry point', () => {
  assert.equal(existsSync('src/app/about/page.tsx'), true);
  const metadata = publicMetadataForPath('/about');
  assert.ok(metadata?.title.includes('EcoPulse'));
  assert.ok((metadata?.description.length ?? 0) >= 40);
  const heroSource = readFileSync('src/components/home/Hero.tsx', 'utf8');
  const navSource = readFileSync('src/components/navigation/AppNav.tsx', 'utf8');
  assert.match(heroSource, /<AppNav \/>/);
  assert.match(navSource, /href=["']\/about["']/);
});
