import { useCallback, useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { syncStore } from '../lib/sync';
import type { ProgressStore } from '../lib/progressModel';

export type SyncState = 'signed-out' | 'idle' | 'syncing' | 'ok' | 'offline' | 'error';

export function useSync(store: ProgressStore, version: number, absorb: (s: ProgressStore) => void) {
  const [session, setSession] = useState<Session | null>(null);
  const [state, setState] = useState<SyncState>('signed-out');
  const [error, setError] = useState('');
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [recovery, setRecovery] = useState(false);
  const storeRef = useRef(store);
  storeRef.current = store;
  const running = useRef(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session)).catch(() => setSession(null));
    const { data } = supabase.auth.onAuthStateChange((event, s) => { setSession(s); if (event === 'PASSWORD_RECOVERY') setRecovery(true); });
    return () => data.subscription.unsubscribe();
  }, []);

  const syncNow = useCallback(async () => {
    if (!supabase || !session || running.current) return;
    if (typeof navigator !== 'undefined' && navigator.onLine === false) { setState('offline'); return; }
    running.current = true; setState('syncing'); setError('');
    try {
      const merged = await syncStore(supabase, session.user.id, storeRef.current);
      absorb(merged);
      setLastSync(new Date().toISOString()); setState('ok');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sync failed.'); setState('error');
    } finally { running.current = false; }
  }, [session, absorb]);

  // Sync when signing in / opening the app signed in, and again shortly after the user's own changes.
  useEffect(() => { if (session) void syncNow(); else setState('signed-out'); }, [session?.user.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!session || version === 0) return;
    const t = setTimeout(() => void syncNow(), 4000);
    return () => clearTimeout(t);
  }, [version]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const on = () => void syncNow();
    window.addEventListener('online', on);
    return () => window.removeEventListener('online', on);
  }, [syncNow]);

  return { session, state, error, lastSync, recovery, clearRecovery: () => setRecovery(false), syncNow };
}
