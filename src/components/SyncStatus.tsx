import { supabaseConfigured, supabaseConfigProblem } from '../lib/supabase';

export function SyncStatus() {
  return (
    <p className="mu">
      {supabaseConfigured
        ? 'Cloud sync is available: sign in under Settings to share progress between devices. Progress is always saved on this device first.'
        : `${supabaseConfigProblem ?? 'Cloud sync is not configured.'} Progress is saved only in this browser.`}
    </p>
  );
}
