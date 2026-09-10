import test from 'node:test';
import assert from 'node:assert/strict';
import { productCopy } from '../src/domain/learning/product-copy.ts';

for (const locale of ['en', 'kk'] as const) {
  test(`home and learn product chrome is complete for ${locale}`, () => {
    const copy = productCopy[locale];
    assert.ok(copy.home.heroTitle.length > 0);
    assert.ok(copy.home.loopTitle.length > 0);
    assert.ok(copy.home.demoTitle.length > 0);
    assert.equal(copy.home.loopItems.length, 4);
    assert.ok(copy.home.finalAction.length > 0);
    assert.ok(copy.learn.loading.length > 0);
    assert.ok(copy.learn.worldsTitle.length > 0);
    assert.ok(copy.learn.journeyTitle.length > 0);
    assert.ok(copy.learn.checkpointsTitle.length > 0);
    assert.ok(copy.learn.status.connected.length > 0);
    assert.ok(copy.learn.open.length > 0);
  });
}
