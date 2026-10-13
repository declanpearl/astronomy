// Pure conversion between the local progress store and database rows, plus the "what must be pushed" diff.
import type { Attempt, ProgressStore } from './progressModel.ts';
import { emptyStore } from './progressModel.ts';

export interface AttemptRow { id: string; qid: string; given: string; ok: boolean; at: string; device: string; legacy_date: string | null }
export interface LessonRow { lesson_id: string; done: boolean; updated_at: string }
export interface ChecklistRow { item_key: string; checked: boolean; updated_at: string }
export interface Rows { attempts: AttemptRow[]; lessons: LessonRow[]; checklist: ChecklistRow[] }

/** Database timestamps come back as "...+00:00"; normalize to the app's ISO "...Z" so string comparison stays valid. */
export const iso = (t: string): string => { const d = new Date(t); return Number.isNaN(d.getTime()) ? t : d.toISOString(); };

export function storeToRows(s: ProgressStore): Rows {
  return {
    attempts: s.attempts.map((a) => ({ id: a.id, qid: a.qid, given: a.given.slice(0, 500), ok: a.ok, at: a.at, device: (a.device ?? '').slice(0, 100), legacy_date: a.legacyDate ?? null })),
    lessons: Object.entries(s.lessons).map(([lesson_id, v]) => ({ lesson_id, done: v.done, updated_at: v.updatedAt })),
    checklist: Object.entries(s.checklist).map(([item_key, v]) => ({ item_key, checked: v.checked, updated_at: v.updatedAt })),
  };
}

export function rowsToStore(deviceId: string, r: Rows): ProgressStore {
  const s = emptyStore(deviceId);
  s.attempts = r.attempts.map((a): Attempt => ({ id: a.id, qid: a.qid, given: a.given, ok: a.ok, at: iso(a.at), device: a.device, ...(a.legacy_date ? { legacyDate: a.legacy_date } : {}) }));
  for (const l of r.lessons) s.lessons[l.lesson_id] = { done: l.done, updatedAt: iso(l.updated_at) };
  for (const c of r.checklist) s.checklist[c.item_key] = { checked: c.checked, updatedAt: iso(c.updated_at) };
  return s;
}

/** Rows present in `merged` that the server does not have yet (attempts) or has an older version of (lessons, checklist). */
export function rowsToPush(merged: ProgressStore, remote: ProgressStore): Rows {
  const have = new Set(remote.attempts.map((a) => a.id));
  const m = storeToRows(merged);
  return {
    attempts: m.attempts.filter((a) => !have.has(a.id)),
    lessons: m.lessons.filter((l) => { const r = remote.lessons[l.lesson_id]; return !r || Date.parse(l.updated_at) > Date.parse(r.updatedAt) || (l.updated_at === r.updatedAt && l.done !== r.done); }),
    checklist: m.checklist.filter((c) => { const r = remote.checklist[c.item_key]; return !r || Date.parse(c.updated_at) > Date.parse(r.updatedAt) || (c.updated_at === r.updatedAt && c.checked !== r.checked); }),
  };
}
