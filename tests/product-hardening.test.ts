import test from 'node:test';
import assert from 'node:assert/strict';
import { productCopy, relationLabels } from '../src/domain/learning/product-copy.ts';
import { navigationSectionForPath } from '../src/domain/learning/navigation.ts';

const locales = ['en', 'kk'] as const;

test('production chrome copy is complete in English and Kazakh', () => {
  for (const locale of locales) {
    const copy = productCopy[locale];
    assert.ok(copy.review.loading.length > 0);
    assert.ok(copy.review.clearTitle.length > 0);
    assert.ok(copy.review.completeTitle.length > 0);
    assert.ok(copy.pulse.title.length > 0);
    assert.ok(copy.pulse.nextAction.length > 0);
    assert.ok(copy.explore.title.length > 0);
    assert.ok(copy.challenges.title.length > 0);
    assert.ok(copy.challengeRun.lockedTitle.length > 0);
    assert.ok(copy.missions.noPhoto.length > 0);
    assert.ok(copy.concept.sources.length > 0);
    assert.ok(copy.concept.evidenceLabels.delayedReview.length > 0);
  }
});

test('semantic relation labels are bilingual for every authored relation type', () => {
  const expected = ['causes', 'contributes_to', 'affects', 'part_of', 'related_to', 'depends_on', 'example_of', 'absorbed_by'];
  for (const type of expected) {
    assert.ok(relationLabels[type as keyof typeof relationLabels].en.length > 0);
    assert.ok(relationLabels[type as keyof typeof relationLabels].kk.length > 0);
  }
});

test('navigation route ownership maps nested routes to the right primary destination', () => {
  assert.equal(navigationSectionForPath('/learn'), '/learn');
  assert.equal(navigationSectionForPath('/learn/ice-water'), '/learn');
  assert.equal(navigationSectionForPath('/lesson/glaciers'), '/learn');
  assert.equal(navigationSectionForPath('/explore'), '/explore');
  assert.equal(navigationSectionForPath('/concept/drought'), '/explore');
  assert.equal(navigationSectionForPath('/challenges'), '/challenges');
  assert.equal(navigationSectionForPath('/challenge/weather-detective'), '/challenges');
  assert.equal(navigationSectionForPath('/mission/sky-check'), '/action');
  assert.equal(navigationSectionForPath('/action'), '/action');
  assert.equal(navigationSectionForPath('/game'), '/game');
  assert.equal(navigationSectionForPath('/review'), '/game');
  assert.equal(navigationSectionForPath('/pulse'), '/pulse');
  assert.equal(navigationSectionForPath('/settings'), '/pulse');
  assert.equal(navigationSectionForPath('/'), '/');
});
