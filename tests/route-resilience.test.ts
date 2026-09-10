import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { lessonSequence } from '../src/content/index.ts';
import { knowledgeGraph } from '../src/content/knowledge-graph.ts';
import { worldChallenges } from '../src/content/world-challenges.ts';
import { worldPresentation } from '../src/content/lesson-presentation.ts';
import { productCopy } from '../src/domain/learning/product-copy.ts';

const lessonSlugs = new Set(lessonSequence.map((lesson) => lesson.slug));
const worldIds = new Set(Object.keys(worldPresentation));

test('authored lesson, concept and checkpoint references resolve to known curriculum routes', () => {
  for (const lesson of lessonSequence) assert.ok(worldIds.has(lesson.world), `lesson world: ${lesson.slug} -> ${lesson.world}`);
  for (const node of knowledgeGraph.nodes) {
    if (node.lessonSlug) assert.ok(lessonSlugs.has(node.lessonSlug), `concept lesson: ${node.id} -> ${node.lessonSlug}`);
    assert.ok(worldIds.has(node.world === 'earth' ? 'earth-atmosphere' : node.world), `concept world: ${node.id} -> ${node.world}`);
  }
  for (const challenge of worldChallenges) assert.ok(worldIds.has(challenge.world), `challenge world: ${challenge.slug} -> ${challenge.world}`);
});

test('world challenge and concept route ids are unique', () => {
  assert.equal(new Set(worldChallenges.map((challenge) => challenge.slug)).size, worldChallenges.length);
  assert.equal(new Set(knowledgeGraph.nodes.map((node) => node.id)).size, knowledgeGraph.nodes.length);
});

test('not-found recovery copy exists in both product locales', () => {
  for (const locale of ['en', 'kk'] as const) {
    const copy = (productCopy[locale] as unknown as Record<string, any>).notFound;
    assert.ok(copy, locale);
    assert.ok(copy.eyebrow.length > 0);
    assert.ok(copy.title.length > 0);
    assert.ok(copy.body.length > 0);
    assert.ok(copy.learn.length > 0);
    assert.ok(copy.home.length > 0);
  }
});

test('App Router has a branded not-found boundary', () => {
  assert.equal(existsSync('src/app/not-found.tsx'), true);
  const source = readFileSync('src/app/not-found.tsx', 'utf8');
  assert.match(source, /NotFoundExperience/);
});

import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

function walkFiles(root: string): string[] {
  return readdirSync(root).flatMap((entry) => {
    const full = join(root, entry);
    return statSync(full).isDirectory() ? walkFiles(full) : [full];
  });
}

function appRoutePattern(pageFile: string): RegExp {
  const relativePath = relative('src/app', pageFile).split(sep).join('/').replace(/\/page\.tsx$/, '');
  if (relativePath === 'page.tsx') return /^\/$/;
  const route = `/${relativePath}`.replace(/\/[[][^/]+[]]/g, '/[^/]+');
  return new RegExp(`^${route}$`);
}

test('literal internal component links resolve to an App Router page', () => {
  const routePatterns = walkFiles('src/app')
    .filter((file) => file.endsWith('page.tsx'))
    .map(appRoutePattern);

  const componentFiles = walkFiles('src/components').filter((file) => file.endsWith('.tsx'));
  for (const file of componentFiles) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/href="(\/[^"?#]*)"/g)) {
      const href = match[1];
      assert.ok(routePatterns.some((pattern) => pattern.test(href)), `${file}: ${href}`);
    }
  }
});

test('runtime error recovery copy exists in both product locales', () => {
  for (const locale of ['en', 'kk'] as const) {
    const copy = (productCopy[locale] as unknown as Record<string, any>).error;
    assert.ok(copy, locale);
    assert.ok(copy.eyebrow.length > 0);
    assert.ok(copy.title.length > 0);
    assert.ok(copy.body.length > 0);
    assert.ok(copy.retry.length > 0);
    assert.ok(copy.home.length > 0);
    assert.ok(copy.loading.length > 0);
  }
});

test('App Router has a safe runtime error boundary that does not expose error details', () => {
  assert.equal(existsSync('src/app/error.tsx'), true);
  assert.equal(existsSync('src/components/navigation/ErrorExperience.tsx'), true);
  const boundary = readFileSync('src/app/error.tsx', 'utf8');
  const experience = readFileSync('src/components/navigation/ErrorExperience.tsx', 'utf8');
  assert.match(boundary, /ErrorExperience/);
  assert.doesNotMatch(experience, /error\.(message|stack|digest)/);
  assert.doesNotMatch(experience, /String\(error\)/);
});

test('root-layout failures have a provider-independent safe global error boundary', () => {
  assert.equal(existsSync('src/app/global-error.tsx'), true);
  const source = readFileSync('src/app/global-error.tsx', 'utf8');
  assert.match(source, /<html lang="en">/);
  assert.match(source, /Try again/);
  assert.match(source, /Қайта көру/);
  assert.doesNotMatch(source, /error\.(message|stack|digest)/);
  assert.doesNotMatch(source, /String\(error\)/);
});


test('App Router has a branded route loading boundary', () => {
  assert.equal(existsSync('src/app/loading.tsx'), true);
  assert.equal(existsSync('src/components/navigation/LoadingExperience.tsx'), true);
  const source = readFileSync('src/components/navigation/LoadingExperience.tsx', 'utf8');
  assert.match(source, /role="status"/);
  assert.match(source, /aria-live="polite"/);
});
