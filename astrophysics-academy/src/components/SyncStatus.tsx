import { supabaseConfigured, SYNC_IMPLEMENTED } from '../lib/supabase';

export function SyncStatus() {
  let msg = 'Cloud sync is not configured. Progress is saved only in this browser.';
  if (supabaseConfigured && !SYNC_IMPLEMENTED) {
    msg = 'Supabase keys detected, but sign-in and sync are not implemented yet. Progress is saved only in this browser.';
  }
  return <p className="mu">{msg}</p>;
}
