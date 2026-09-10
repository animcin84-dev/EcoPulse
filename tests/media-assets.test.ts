import assert from 'node:assert/strict';
import test from 'node:test';
import { educationalMedia } from '../src/content/media-assets.ts';

test('institutional educational media has complete bilingual credit metadata', () => {
  assert.equal(educationalMedia.length, 3);
  const ids = new Set<string>();
  const srcs = new Set<string>();

  for (const asset of educationalMedia) {
    assert.ok(asset.id.trim());
    assert.equal(ids.has(asset.id), false, `duplicate media id: ${asset.id}`);
    ids.add(asset.id);

    assert.equal(srcs.has(asset.renderSrc), false, `duplicate render source: ${asset.renderSrc}`);
    srcs.add(asset.renderSrc);

    assert.ok(asset.alt.en.trim().length >= 20);
    assert.ok(asset.alt.kk.trim().length >= 20);
    assert.ok(asset.credit.trim().length >= 12);
    assert.ok(asset.title.trim());
    assert.ok(asset.sourcePage.startsWith('https://science.nasa.gov/'));
    assert.match(asset.renderSrc, /^https:\/\/(assets\.science\.nasa\.gov|science\.nasa\.gov)\//);
    assert.equal(asset.institution, 'NASA Earth Observatory');
    assert.equal(asset.delivery, 'remote-institutional');
    assert.equal(asset.fallback, 'authored-diagram');
    assert.match(asset.checkedAt, /^2026-09-10$/);
  }
});

test('remote institutional media stays within the authored pixel budget', () => {
  for (const asset of educationalMedia) {
    assert.ok(asset.width >= 640, `${asset.id} is too small for the intended educational surface`);
    assert.ok(asset.height >= 500, `${asset.id} is too small for the intended educational surface`);
    assert.ok(asset.width <= 1300, `${asset.id} exceeds the 1300px remote-media width budget`);
    assert.ok(asset.height <= 900, `${asset.id} exceeds the 900px remote-media height budget`);
  }
});

test('media usage stays intentionally narrow and maps to authored learning surfaces', () => {
  const usage = Object.fromEntries(educationalMedia.map((asset) => [asset.id, asset.usage]));
  assert.deepEqual(usage['atmosphere-limb'], ['home', 'lesson:atmosphere']);
  assert.deepEqual(usage['easton-glacier'], ['lesson:glaciers']);
  assert.deepEqual(usage['tidal-wetland-habitat'], ['lesson:habitats']);
});

test('false-color institutional imagery discloses its rendering to learners', () => {
  const wetland = educationalMedia.find((asset) => asset.id === 'tidal-wetland-habitat');
  assert.ok(wetland);
  assert.ok(wetland.visualNote?.en.toLowerCase().includes('false-color'));
  assert.ok(wetland.visualNote?.kk.toLowerCase().includes('жалған түсті'));
});
