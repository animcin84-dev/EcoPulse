import test from 'node:test';
import assert from 'node:assert/strict';
import nextConfig from '../next.config.ts';

test('Next config disables framework disclosure', () => {
  assert.equal(nextConfig.poweredByHeader, false);
});

test('all page responses receive the approved baseline security and privacy headers', async () => {
  assert.equal(typeof nextConfig.headers, 'function');
  const rules = await nextConfig.headers!();
  const catchAll = rules.find((rule) => rule.source === '/:path*');
  assert.ok(catchAll, 'missing catch-all security header rule');
  const headers = new Map(catchAll.headers.map((header) => [header.key.toLowerCase(), header.value]));

  assert.equal(headers.get('x-content-type-options'), 'nosniff');
  assert.equal(headers.get('x-frame-options'), 'DENY');
  assert.equal(headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  assert.equal(headers.get('permissions-policy'), 'camera=(), microphone=(), geolocation=()');
});

test('CSP is not guessed before dependency-backed runtime verification', async () => {
  const rules = await nextConfig.headers!();
  const names = rules.flatMap((rule) => rule.headers.map((header) => header.key.toLowerCase()));
  assert.equal(names.includes('content-security-policy'), false);
});
