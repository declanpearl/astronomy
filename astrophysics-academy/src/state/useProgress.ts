import { useCallback, useState } from 'react';
import type { Progress, Question } from '../types';
import { loadProgress, saveProgress } from '../lib/storage';

export function useProgress() {
  const [p, setP] = useState<Progress>(loadProgress);

  const update = useCallback((fn: (draft: Progress) => Progress) => {
    setP((prev) => { const next = fn(prev); saveProgress(next); return next; });
  }, []);

  const recordAnswer = (q: Question, given: string, ok: boolean) =>
    update((s) => {
      const prev = s.q[q.id] ?? { box: 0, att: 0, ok: 0 };
      const stat = { box: ok ? prev.box + 1 : 0, att: prev.att + 1, ok: prev.ok + (ok ? 1 : 0) };
      const mist = ok ? s.mist : [...s.mist, { id: q.id, ans: given, date: new Date().toISOString().slice(0, 10) }];
      return { ...s, q: { ...s.q, [q.id]: stat }, mist };
    });

  const completeLesson = (id: string) => update((s) => ({ ...s, les: { ...s.les, [id]: true } }));
  const setChecked = (key: string, v: boolean) => update((s) => ({ ...s, chk: { ...s.chk, [key]: v } }));

  return { p, recordAnswer, completeLesson, setChecked };
}
