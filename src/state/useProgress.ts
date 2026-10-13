import { useCallback, useMemo, useState } from 'react';
import type { Question } from '../types';
import { loadStore, saveStore } from '../lib/storage';
import { appendAttempt, derive, mergeStores, newId, setChecked as setCheckedRec, setLesson } from '../lib/progressModel';
import type { ProgressStore } from '../lib/progressModel';

export function useProgress() {
  const [store, setStore] = useState<ProgressStore>(loadStore);
  /** Counts LOCAL changes only (not cloud merges), so cloud sync is triggered by the user's own activity and never loops. */
  const [version, setVersion] = useState(0);

  const apply = useCallback((fn: (s: ProgressStore) => ProgressStore) => {
    setStore((prev) => { const next = fn(prev); saveStore(next); return next; });
    setVersion((v) => v + 1);
  }, []);

  /** Merge progress that arrived from the cloud into local state without losing newer local changes made meanwhile. */
  const absorb = useCallback((incoming: ProgressStore) => {
    setStore((prev) => { const next = mergeStores(prev, incoming); saveStore(next); return next; });
  }, []);

  // Legacy-shaped summary so the existing views are unchanged.
  const p = useMemo(() => derive(store), [store]);

  const recordAnswer = (q: Question, given: string, ok: boolean) => {
    const attempt = { id: newId(), qid: q.id, given, ok, at: new Date().toISOString(), device: store.deviceId };
    apply((s) => appendAttempt(s, attempt));
  };
  const completeLesson = (id: string) => { const now = new Date().toISOString(); apply((s) => setLesson(s, id, true, now)); };
  const setChecked = (key: string, v: boolean) => { const now = new Date().toISOString(); apply((s) => setCheckedRec(s, key, v, now)); };
  const importMerge = (incoming: ProgressStore) => apply((s) => mergeStores(s, incoming));

  return { p, store, version, absorb, recordAnswer, completeLesson, setChecked, importMerge };
}
