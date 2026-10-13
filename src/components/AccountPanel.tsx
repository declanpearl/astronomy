import { useState } from 'react';
import { Card } from './Card';
import { supabase, supabaseConfigProblem } from '../lib/supabase';
import type { SyncState } from '../state/useSync';
import type { Session } from '@supabase/supabase-js';

interface Props { session: Session | null; state: SyncState; error: string; lastSync: string | null; recovery: boolean; clearRecovery: () => void; syncNow: () => Promise<void>; pendingLocal: number }

const LABEL: Record<SyncState, string> = { 'signed-out': 'Not signed in: progress is saved only on this device.', idle: 'Signed in.', syncing: 'Syncing…', ok: 'Synced.', offline: 'Offline: changes are saved on this device and will sync when the connection returns.', error: 'Sync failed. Your progress is still safe on this device.' };

export function AccountPanel({ session, state, error, lastSync, recovery, clearRecovery, syncNow, pendingLocal }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  if (!supabase) {
    return (
      <Card>
        <h3>Cloud sync</h3>
        <p>{supabaseConfigProblem}</p>
        <p className="mu">The app works fully without it. To turn sync on, follow docs/SUPABASE_SETUP.md. Until then, use Export backup below to move progress between devices.</p>
      </Card>
    );
  }
  const client = supabase;
  const run = async (fn: () => Promise<{ error: { message: string } | null }>, ok: string) => {
    setBusy(true); setMsg('');
    try { const { error: e } = await fn(); setMsg(e ? e.message : ok); } catch (e) { setMsg(e instanceof Error ? e.message : 'Something went wrong.'); }
    setBusy(false);
  };

  if (recovery) {
    return (
      <Card>
        <h3>Choose a new password</h3>
        <input type="password" autoComplete="new-password" aria-label="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="b" disabled={busy || password.length < 8} onClick={() => run(async () => { const r = await client.auth.updateUser({ password }); if (!r.error) { clearRecovery(); setPassword(''); } return r; }, 'Password updated.')}>Save new password</button>
        {msg && <p role="status">{msg}</p>}
      </Card>
    );
  }

  if (session) {
    return (
      <Card>
        <h3>Cloud sync</h3>
        <p>Signed in as <b>{session.user.email}</b></p>
        <p role="status">{LABEL[state]}{lastSync ? ` Last sync: ${new Date(lastSync).toLocaleString()}.` : ''}</p>
        {state === 'error' && <p className="bad">{error}</p>}
        {pendingLocal > 0 && state !== 'ok' && <p className="mu">Changes made on this device are queued and will be uploaded by the next sync.</p>}
        <button className="b" disabled={state === 'syncing'} onClick={() => void syncNow()}>{state === 'error' ? 'Retry sync' : 'Sync now'}</button>
        <button className="b" style={{ background: '#9aa8c4' }} onClick={() => void client.auth.signOut()}>Sign out</button>
        <p className="mu">Progress is always saved on this device first. Signing out does not delete local progress.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3>Cloud sync (optional)</h3>
      <p className="mu">{LABEL['signed-out']} Sign in on each device to share progress. Your attempts, lesson completion and checklist ticks are merged, never overwritten.</p>
      <label>Email<input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password (at least 8 characters)<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button className="b" disabled={busy || !email || password.length < 8} onClick={() => run(() => client.auth.signInWithPassword({ email, password }), 'Signed in.')}>Sign in</button>
      <button className="b" disabled={busy || !email || password.length < 8} onClick={() => run(() => client.auth.signUp({ email, password }), 'Account created. If your project requires email confirmation, open the confirmation email, then sign in.')}>Create account</button>
      <button className="b" style={{ background: '#9aa8c4' }} disabled={busy || !email} onClick={() => run(() => client.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + window.location.pathname }), 'If that email has an account, a reset link was sent.')}>Forgot password</button>
      {msg && <p role="status">{msg}</p>}
    </Card>
  );
}
