import type { Progress } from '../types';

// Same key as the Stage 1 page, so existing browser progress carries over.
const KEY = 'aa_v1';
export const emptyProgress = (): Progress => ({ q: {}, mist: [], chk: {}, les: {}, log: [] });

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...emptyProgress(), ...JSON.parse(raw) };
  } catch { /* storage unavailable: start empty */ }
  return emptyProgress();
}

export function saveProgress(p: Progress): void {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ignore */ }
}
