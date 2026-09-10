import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const provider = readFileSync('src/components/progress/GuestProgressProvider.tsx', 'utf8');
const notice = readFileSync('src/components/progress/PersistenceNotice.tsx', 'utf8');

test('provider maps corrupt, incompatible and unsupported load integrity to protected persistence states', () => {
  assert.match(provider, /['"]corrupt['"]/);
  assert.match(provider, /['"]unsupported['"]/);
  assert.match(provider, /['"]incompatible['"]/);
  assert.match(provider, /loaded\.integrity/);
  assert.match(provider, /setRecoveryRaw\(loaded\.raw\)/);
});

test('provider never auto-saves over quarantined raw snapshots', () => {
  assert.match(provider, /persistenceStatus === ['"]corrupt['"]/);
  assert.match(provider, /persistenceStatus === ['"]unsupported['"]/);
  assert.match(provider, /persistenceStatus === ['"]incompatible['"]/);
});

test('recovery notice can download quarantined raw bytes before explicit start-fresh reset', () => {
  assert.match(notice, /recoveryRaw/);
  assert.match(notice, /Blob/);
  assert.match(notice, /URL\.createObjectURL/);
  assert.match(notice, /clearGuestState/);
  assert.match(notice, /confirmFresh/);
  assert.match(notice, /window\.location\.reload\(\)/);
});

test('corrupt, incompatible and unsupported recovery messaging exists in both EN and Kazakh', () => {
  assert.match(notice, /CORRUPT|RECOVERY|DAMAGED/i);
  assert.match(notice, /NEWER|UNSUPPORTED|VERSION/i);
  assert.match(notice, /OLDER CONTENT|CONTENT STRUCTURE|CURRICULUM|OLDER LEARNING/i);
  assert.match(notice, /ҚАЛПЫНА|БҮЛІН|ЗАҚЫМ|НҰСҚА/i);
});
