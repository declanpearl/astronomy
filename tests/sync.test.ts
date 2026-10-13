import test from 'node:test';
import assert from 'node:assert/strict';
import { checkConfig, isSecretKey } from '../src/lib/supabaseConfig.ts';
import { iso, rowsToPush, rowsToStore, storeToRows } from '../src/lib/syncModel.ts';
import { syncStore } from '../src/lib/sync.ts';
import { appendAttempt, derive, emptyStore, mergeStores, setChecked, setLesson } from '../src/lib/progressModel.ts';
import type { ProgressStore } from '../src/lib/progressModel.ts';

const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
const jwt = (role: string) => `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ role, iss: 'supabase' })}.signature-signature-signature`;

test('configuration check refuses secret keys and bad URLs, and accepts a public key', () => {
  assert.equal(isSecretKey(jwt('service_role')), true);
  assert.equal(isSecretKey('sb_secret_abcdefghijklmnop'), true);
  assert.equal(isSecretKey(jwt('anon')), false);
  assert.equal(checkConfig('https://abcdefghij.supabase.co', jwt('anon')).ok, true);
  assert.equal(checkConfig('https://abcdefghij.supabase.co', jwt('service_role')).ok, false);
  assert.equal(checkConfig('https://abcdefghij.supabase.co', 'sb_secret_abcdefghijklmnopqrstuvwxyz').ok, false);
  assert.equal(checkConfig(undefined, undefined).ok, false);
  assert.equal(checkConfig('https://abcdefghij.supabase.co', undefined).ok, false);
  assert.equal(checkConfig('http://evil.example.com', jwt('anon')).ok, false);
  assert.equal(checkConfig('abcdefghij.supabase.co', jwt('anon')).ok, false);
});

const A = (id: string, ok: boolean, at: string) => ({ id, qid: 'q1', given: 'x', ok, at, device: 'd' });

test('rows round-trip and database timestamps are normalized', () => {
  let s = appendAttempt(emptyStore('dev'), A('a1', true, '2026-10-10T01:00:00.000Z'));
  s = setLesson(s, 'L1', true, '2026-10-10T02:00:00.000Z');
  s = setChecked(s, 'wien', true, '2026-10-10T03:00:00.000Z');
  const back = rowsToStore('dev', storeToRows(s));
  assert.deepEqual(back.attempts, s.attempts.map((a) => ({ ...a })));
  assert.deepEqual(back.lessons, s.lessons);
  assert.equal(iso('2026-10-10T02:00:00+00:00'), '2026-10-10T02:00:00.000Z');
  assert.equal(rowsToStore('dev', { attempts: [], lessons: [{ lesson_id: 'L1', done: true, updated_at: '2026-10-10T02:00:00+00:00' }], checklist: [] }).lessons.L1.updatedAt, '2026-10-10T02:00:00.000Z');
});

test('push diff sends only what the server lacks or has older', () => {
  const remote = setLesson(appendAttempt(emptyStore('r'), A('a1', true, '2026-10-10T01:00:00.000Z')), 'L1', true, '2026-10-10T02:00:00.000Z');
  let merged = mergeStores(remote, appendAttempt(emptyStore('l'), A('a2', false, '2026-10-10T01:30:00.000Z')));
  merged = setLesson(merged, 'L1', false, '2026-10-10T05:00:00.000Z');
  merged = setChecked(merged, 'hr', true, '2026-10-10T05:00:00.000Z');
  const p = rowsToPush(merged, remote);
  assert.deepEqual(p.attempts.map((a) => a.id), ['a2']);
  assert.equal(p.lessons.length, 1);
  assert.equal(p.lessons[0].done, false);
  assert.equal(p.checklist.length, 1);
  assert.equal(rowsToPush(remote, remote).attempts.length + rowsToPush(remote, remote).lessons.length, 0);
});

// ---- a tiny in-memory stand-in for the Supabase client (no network is available in tests)
type Row = Record<string, unknown>;
function fakeClient(tables: Record<string, Row[]>) {
  const keyOf: Record<string, string[]> = { attempts: ['user_id', 'id'], lesson_progress: ['user_id', 'lesson_id'], checklist_progress: ['user_id', 'item_key'] };
  return {
    from(name: string) {
      return {
        select() { const q = { order() { return q; }, range(a: number, b: number) { return Promise.resolve({ data: tables[name].slice(a, b + 1), error: null }); } }; return q; },
        upsert(rows: Row[], opts: { ignoreDuplicates?: boolean }) {
          for (const r of rows) {
            const same = (x: Row) => keyOf[name].every((k) => x[k] === r[k]);
            const i = tables[name].findIndex(same);
            if (i === -1) tables[name].push({ ...r }); else if (!opts.ignoreDuplicates) tables[name][i] = { ...r };
          }
          return Promise.resolve({ error: null });
        },
      };
    },
  };
}

test('syncStore merges two devices, keeps everything, paginates and is idempotent', async () => {
  const tables: Record<string, Row[]> = { attempts: [], lesson_progress: [], checklist_progress: [] };
  const client = fakeClient(tables) as never;
  // Device 1 has 2,300 attempts (forces multiple pages) and a lesson
  let d1: ProgressStore = emptyStore('d1');
  for (let i = 0; i < 2300; i++) d1 = appendAttempt(d1, A('p' + i, i % 2 === 0, new Date(Date.UTC(2026, 9, 1, 0, 0, i)).toISOString()));
  d1 = setLesson(d1, 'L1', true, '2026-10-10T01:00:00.000Z');
  const m1 = await syncStore(client, 'user-1', d1);
  assert.equal(tables.attempts.length, 2300);
  // Device 2 (fresh) answers one question and ticks a checklist item, then syncs
  let d2 = appendAttempt(emptyStore('d2'), A('phone-1', false, '2026-10-11T00:00:00.000Z'));
  d2 = setChecked(d2, 'wien', true, '2026-10-11T00:00:00.000Z');
  const m2 = await syncStore(client, 'user-1', d2);
  assert.equal(m2.attempts.length, 2301);
  assert.equal(m2.lessons.L1.done, true);
  assert.equal(tables.attempts.length, 2301);
  assert.equal(tables.attempts.every((r) => r.user_id === 'user-1'), true);
  // Device 1 syncs again and receives the phone's data; nothing duplicated
  const m1b = await syncStore(client, 'user-1', m1);
  assert.equal(m1b.attempts.length, 2301);
  assert.equal(m1b.checklist.wien.checked, true);
  assert.equal(tables.attempts.length, 2301);
  // Mistake notebook content (derived) is the same on both devices
  assert.deepEqual(derive(m1b).mist.length, derive(m2).mist.length);
  // Running sync again changes nothing
  const before = JSON.stringify(tables);
  await syncStore(client, 'user-1', m1b);
  assert.equal(JSON.stringify(tables), before);
});

test('a failing server never loses local progress', async () => {
  const bad = { from() { return { select() { const q = { order() { return q; }, range() { return Promise.resolve({ data: null, error: { message: 'network down' } }); } }; return q; } }; } } as never;
  const local = appendAttempt(emptyStore('d1'), A('x1', true, '2026-10-10T00:00:00.000Z'));
  await assert.rejects(() => syncStore(bad, 'u', local), /network down/);
  assert.equal(local.attempts.length, 1);
});
