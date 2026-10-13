// Pure configuration checks (no Supabase import) so they can be unit-tested.
// Only the PUBLIC anon/publishable key may be used in the browser. Secret keys are refused.

function jwtRole(key: string): string | null {
  const parts = key.split('.');
  if (parts.length !== 3) return null;
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
    const role = (JSON.parse(json) as { role?: unknown }).role;
    return typeof role === 'string' ? role : null;
  } catch { return null; }
}

/** True for service-role JWTs and for new-style secret keys (sb_secret_...). */
export function isSecretKey(key: string): boolean {
  return key.startsWith('sb_secret_') || jwtRole(key) === 'service_role';
}

export type ConfigCheck = { ok: true } | { ok: false; reason: string };

export function checkConfig(url: string | undefined, key: string | undefined): ConfigCheck {
  if (!url && !key) return { ok: false, reason: 'Cloud sync is not configured (no Supabase URL or key).' };
  if (!url || !key) return { ok: false, reason: 'Supabase configuration is incomplete: both the project URL and the public key are required.' };
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)\/?$/i.test(url.trim())) return { ok: false, reason: 'The Supabase URL looks wrong. It should look like https://your-project-ref.supabase.co' };
  if (isSecretKey(key.trim())) return { ok: false, reason: 'A SECRET Supabase key was provided. Refusing to use it in the browser. Use the public anon/publishable key instead and rotate the secret key.' };
  if (key.trim().length < 20) return { ok: false, reason: 'The Supabase public key looks too short.' };
  return { ok: true };
}
