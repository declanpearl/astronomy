import test from 'node:test';
import assert from 'node:assert/strict';
import { appendAttempt, derive, emptyStore, mergeStores, migrateV1, parseStore, setLesson } from '../src/lib/progressModel.ts';

const NOW = '2026-10-10T00:00:00.000Z';

test('migrating Stage 1 data reproduces box/att/ok, mistakes, lessons, checklist', () => {
  const v1 = { q: { q1: { box: 2, att: 4, ok: 3 }, q2: { box: 0, att: 2, ok: 1 }, q3: { box: 3, att: 3, ok: 3 } },
    mist: [{ id: 'q1', ans: '9', date: '2026-10-09' }, { id: 'q2', ans: '7', date: '2026-10-08' }],
    les: { L1: true }, chk: { wien: true, hr: false } };
  const d = derive(migrateV1(v1, 'dev', NOW));
  assert.deepEqual(d.q.q1, { box: 2, att: 4, ok: 3 });
  assert.deepEqual(d.q.q2, { box: 0, att: 2, ok: 1 });
  assert.deepEqual(d.q.q3, { box: 3, att: 3, ok: 3 });
  assert.equal(d.mist.length, 2);
  assert.ok(d.mist.some((m) => m.id === 'q1' && m.ans === '9' && m.date === '2026-10-09'));
  assert.equal(d.les.L1, true);
  assert.equal(d.chk.wien, true);
  assert.equal(d.chk.hr, undefined);
});

test('migrating empty or inconsistent data does not crash', () => {
  assert.equal(derive(migrateV1({}, 'dev', NOW)).mist.length, 0);
  const d = derive(migrateV1({ q: { q1: { box: 9, att: 2, ok: 5 } } }, 'dev', NOW));
  assert.equal(d.q.q1.att, 2);
  assert.ok(d.q.q1.ok <= d.q.q1.att);
});

test('correct answers raise the box, a wrong answer resets it and enters the notebook', () => {
  let s = emptyStore('dev');
  const at = (n: number) => new Date(Date.UTC(2026, 9, 10, 0, 0, n)).toISOString();
  s = appendAttempt(s, { id: 'a1', qid: 'q1', given: '1', ok: true, at: at(1), device: 'dev' });
  s = appendAttempt(s, { id: 'a2', qid: 'q1', given: '2', ok: true, at: at(2), device: 'dev' });
  assert.equal(derive(s).q.q1.box, 2);
  s = appendAttempt(s, { id: 'a3', qid: 'q1', given: '3', ok: false, at: at(3), device: 'dev' });
  const d = derive(s);
  assert.equal(d.q.q1.box, 0);
  assert.equal(d.mist.length, 1);
});

test('merge unions attempts from two devices, is idempotent and order-independent', () => {
  const a = appendAttempt(emptyStore('A'), { id: 'x', qid: 'q1', given: '1', ok: true, at: '2026-10-10T01:00:00.000Z', device: 'A' });
  const b = appendAttempt(emptyStore('B'), { id: 'y', qid: 'q1', given: '2', ok: false, at: '2026-10-10T02:00:00.000Z', device: 'B' });
  const ab = mergeStores(a, b);
  assert.equal(ab.attempts.length, 2);
  assert.equal(mergeStores(ab, b).attempts.length, 2);
  assert.deepEqual(derive(mergeStores(a, b)), derive(mergeStores(b, a)));
});

test('lesson/checklist merge keeps the newer change', () => {
  const a = setLesson(emptyStore('A'), 'L1', true, '2026-10-10T01:00:00.000Z');
  const b = setLesson(emptyStore('B'), 'L1', false, '2026-10-10T02:00:00.000Z');
  assert.equal(mergeStores(a, b).lessons.L1.done, false);
  assert.equal(mergeStores(b, a).lessons.L1.done, false);
});

test('parseStore accepts its own output and rejects garbage', () => {
  const s = appendAttempt(emptyStore('A'), { id: 'x', qid: 'q1', given: '1', ok: true, at: NOW, device: 'A' });
  assert.deepEqual(parseStore(JSON.parse(JSON.stringify(s)))?.attempts.length, 1);
  assert.equal(parseStore(null), null);
  assert.equal(parseStore({ version: 1 }), null);
  assert.equal(parseStore({ version: 2, deviceId: 'a', attempts: [{ id: 1 }], lessons: {}, checklist: {} }), null);
});
