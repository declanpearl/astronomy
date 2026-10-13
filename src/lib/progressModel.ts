// Pure, framework-free progress model (no React, no browser APIs except crypto in newId).
// Design: attempts are an APPEND-ONLY log. Mastery, accuracy and the mistake notebook are DERIVED
// from that log. Lessons and checklist items are small records with timestamps (last-writer-wins).
// This is what makes safe merging across devices possible later.
import type { Progress } from '../types';

export interface Attempt {
  id: string; qid: string; given: string; ok: boolean;
  at: string;        // ISO timestamp
  device: string;
  legacyDate?: string; // original date for attempts rebuilt from Stage 1 data
}
export interface ProgressStore {
  version: 2;
  deviceId: string;
  attempts: Attempt[];
  lessons: Record<string, { done: boolean; updatedAt: string }>;
  checklist: Record<string, { checked: boolean; updatedAt: string }>;
}
export interface LegacyV1 {
  q?: Record<string, { box: number; att: number; ok: number }>;
  mist?: { id: string; ans: string; date: string }[];
  chk?: Record<string, boolean>;
  les?: Record<string, boolean>;
}

export function newId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (c?.randomUUID) return c.randomUUID();
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

export const emptyStore = (deviceId: string): ProgressStore =>
  ({ version: 2, deviceId, attempts: [], lessons: {}, checklist: {} });

const byTime = (a: Attempt, b: Attempt) => (a.at < b.at ? -1 : a.at > b.at ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

/** Rebuild the Stage 1 summary (box/att/ok per question + mistakes) so existing views keep working. */
export function derive(s: ProgressStore): Progress {
  const q: Progress['q'] = {};
  const mist: Progress['mist'] = [];
  for (const a of [...s.attempts].sort(byTime)) {
    const r = q[a.qid] ?? (q[a.qid] = { box: 0, att: 0, ok: 0 });
    r.att++;
    if (a.ok) { r.ok++; r.box++; } else { r.box = 0; mist.push({ id: a.qid, ans: a.given, date: a.legacyDate ?? a.at.slice(0, 10) }); }
  }
  const chk: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(s.checklist)) chk[k] = v.checked;
  const les: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(s.lessons)) les[k] = v.done;
  return { q, mist, chk, les, log: [] };
}

/** Convert Stage 1 (aa_v1) data into attempts that reproduce the same box/att/ok and mistakes. */
export function migrateV1(v1: LegacyV1, deviceId: string, nowIso: string): ProgressStore {
  const store = emptyStore(deviceId);
  const mistByQ: Record<string, { ans: string; date: string }[]> = {};
  for (const m of v1.mist ?? []) (mistByQ[m.id] ??= []).push(m);
  const base = Date.UTC(2000, 0, 1);
  let tick = 0;
  const push = (qid: string, ok: boolean, given: string, legacyDate?: string) => {
    store.attempts.push({ id: `legacy:${qid}:${tick}`, qid, ok, given, device: 'legacy', legacyDate,
      at: new Date(base + tick * 1000).toISOString() });
    tick++;
  };
  for (const [qid, st] of Object.entries(v1.q ?? {})) {
    const att = Math.max(0, Math.floor(Number(st.att) || 0));
    const ok = Math.min(att, Math.max(0, Math.floor(Number(st.ok) || 0)));
    const wrong = att - ok;
    const tail = wrong > 0 ? Math.min(ok, Math.max(0, Math.floor(Number(st.box) || 0))) : ok;
    for (let i = 0; i < ok - tail; i++) push(qid, true, '(migrated)');
    for (let i = 0; i < wrong; i++) { const m = mistByQ[qid]?.shift(); push(qid, false, m?.ans ?? '(unknown)', m?.date); }
    for (let i = 0; i < tail; i++) push(qid, true, '(migrated)');
  }
  for (const [k, v] of Object.entries(v1.les ?? {})) if (v) store.lessons[k] = { done: true, updatedAt: nowIso };
  for (const [k, v] of Object.entries(v1.chk ?? {})) if (v) store.checklist[k] = { checked: true, updatedAt: nowIso };
  return store;
}

export const appendAttempt = (s: ProgressStore, a: Attempt): ProgressStore =>
  ({ ...s, attempts: [...s.attempts, a] });
export const setLesson = (s: ProgressStore, id: string, done: boolean, now: string): ProgressStore =>
  ({ ...s, lessons: { ...s.lessons, [id]: { done, updatedAt: now } } });
export const setChecked = (s: ProgressStore, key: string, checked: boolean, now: string): ProgressStore =>
  ({ ...s, checklist: { ...s.checklist, [key]: { checked, updatedAt: now } } });

function mergeStamped<T extends { updatedAt: string }>(a: Record<string, T>, b: Record<string, T>, truthy: (v: T) => boolean) {
  const out: Record<string, T> = { ...a };
  for (const [k, vb] of Object.entries(b)) {
    const va = out[k];
    if (!va || vb.updatedAt > va.updatedAt || (vb.updatedAt === va.updatedAt && truthy(vb))) out[k] = vb;
  }
  return out;
}

/** Non-destructive merge: attempts are unioned by id; other records are last-writer-wins. Idempotent. */
export function mergeStores(a: ProgressStore, b: ProgressStore): ProgressStore {
  const seen = new Map<string, Attempt>();
  for (const x of [...a.attempts, ...b.attempts]) if (!seen.has(x.id)) seen.set(x.id, x);
  return {
    version: 2, deviceId: a.deviceId,
    attempts: [...seen.values()].sort(byTime),
    lessons: mergeStamped(a.lessons, b.lessons, (v) => v.done),
    checklist: mergeStamped(a.checklist, b.checklist, (v) => v.checked),
  };
}

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);

/** Validate untrusted JSON (storage or an imported file). Returns null if it is not a valid v2 store. */
export function parseStore(x: unknown): ProgressStore | null {
  if (!isObj(x) || x.version !== 2 || typeof x.deviceId !== 'string' || !Array.isArray(x.attempts)) return null;
  if (!isObj(x.lessons) || !isObj(x.checklist)) return null;
  const attempts: Attempt[] = [];
  for (const a of x.attempts) {
    if (!isObj(a) || typeof a.id !== 'string' || typeof a.qid !== 'string' || typeof a.given !== 'string'
      || typeof a.ok !== 'boolean' || typeof a.at !== 'string' || typeof a.device !== 'string') return null;
    attempts.push({ id: a.id, qid: a.qid, given: a.given, ok: a.ok, at: a.at, device: a.device,
      legacyDate: typeof a.legacyDate === 'string' ? a.legacyDate : undefined });
  }
  const lessons: ProgressStore['lessons'] = {};
  for (const [k, v] of Object.entries(x.lessons)) {
    if (!isObj(v) || typeof v.done !== 'boolean' || typeof v.updatedAt !== 'string') return null;
    lessons[k] = { done: v.done, updatedAt: v.updatedAt };
  }
  const checklist: ProgressStore['checklist'] = {};
  for (const [k, v] of Object.entries(x.checklist)) {
    if (!isObj(v) || typeof v.checked !== 'boolean' || typeof v.updatedAt !== 'string') return null;
    checklist[k] = { checked: v.checked, updatedAt: v.updatedAt };
  }
  return { version: 2, deviceId: x.deviceId, attempts, lessons, checklist };
}
