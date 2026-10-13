import { emptyStore, migrateV1, newId, parseStore } from './progressModel';
import type { ProgressStore } from './progressModel';

const KEY_V2 = 'aa_v2';
const KEY_V1 = 'aa_v1'; // Stage 1 data. Never modified or deleted by the app: it stays as a backup.

export function saveStore(s: ProgressStore): void {
  try { localStorage.setItem(KEY_V2, JSON.stringify(s)); } catch { /* storage full or blocked */ }
}

export function loadStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(KEY_V2);
    if (raw) { const s = parseStore(JSON.parse(raw)); if (s) return s; }
    const old = localStorage.getItem(KEY_V1);
    if (old) {
      const s = migrateV1(JSON.parse(old), newId(), new Date().toISOString());
      saveStore(s);
      return s;
    }
  } catch { /* fall through to an empty store */ }
  return emptyStore(newId());
}
