import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
  engines?: Record<string, string>;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

function versionTuple(value: string): [number, number, number] {
  const match = value.match(/(\d+)\.(\d+)\.(\d+)/);
  assert.ok(match, `expected semantic version, got ${value}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function atLeast(actual: [number, number, number], minimum: [number, number, number]) {
  for (let index = 0; index < 3; index += 1) {
    if (actual[index]! > minimum[index]!) return true;
    if (actual[index]! < minimum[index]!) return false;
  }
  return true;
}

test('package declares the Next 16 Node runtime floor explicitly', () => {
  assert.equal(packageJson.engines?.node, '>=20.9.0');
  assert.ok(atLeast(versionTuple(process.versions.node), [20, 9, 0]));
});

test('release verification includes tests full typecheck and the real Next build', () => {
  assert.equal(packageJson.scripts['check:core'], 'npm run test && npm run typecheck:core');
  assert.equal(packageJson.scripts.check, 'npm run test && npm run typecheck');
  assert.equal(packageJson.scripts['verify:release'], 'npm run check && npm run build');
});

test('runtime framework dependencies are exact pins and React versions match', () => {
  assert.match(packageJson.dependencies.next, /^\d+\.\d+\.\d+$/);
  assert.match(packageJson.dependencies.react, /^\d+\.\d+\.\d+$/);
  assert.equal(packageJson.dependencies['react-dom'], packageJson.dependencies.react);
});

test('Tailwind 4 PostCSS wiring is present in config and global CSS', () => {
  assert.ok(packageJson.devDependencies['@tailwindcss/postcss']);
  assert.ok(packageJson.devDependencies.tailwindcss);
  assert.ok(packageJson.devDependencies.postcss);

  const postcss = readFileSync(new URL('../postcss.config.mjs', import.meta.url), 'utf8');
  const globals = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  assert.match(postcss, /["']@tailwindcss\/postcss["']/);
  assert.match(globals, /@import\s+["']tailwindcss["']/);
});
