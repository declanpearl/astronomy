import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMatrix } from '../src/lib/coverageMatrix.ts';
import { QUESTIONS } from '../src/data/questions.ts';
import { CURRENT_BATCH, PLAN, BATCHES } from '../src/data/curriculumPlan.ts';

test('every checklist item and required object is assigned to a planned batch', () => {
  const unplanned = buildMatrix().filter((r) => r.plan === undefined).map((r) => r.key);
  assert.deepEqual(unplanned, []);
  for (const b of Object.values(PLAN)) assert.ok(BATCHES.some((x) => x.id === b), `unknown batch ${b}`);
});

test('anything planned for a delivered batch is actually covered (no silent gaps)', () => {
  const late = buildMatrix().filter((r) => (r.plan ?? 99) <= CURRENT_BATCH && r.status !== 'covered').map((r) => `${r.key}:${r.status}`);
  assert.deepEqual(late, []);
});

test('no question is tagged with a key outside the matrix', () => {
  const keys = new Set(buildMatrix().map((r) => r.key));
  assert.ok(keys.size >= 41);
  for (const q of QUESTIONS) for (const tag of q.tags) assert.ok(keys.has(tag), `${q.id} uses tag ${tag} that is not a checklist or object key`);
});
