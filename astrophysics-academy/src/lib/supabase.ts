import { createClient } from '@supabase/supabase-js';

// Only the PUBLIC anon key belongs here. Never use the service_role key in frontend code.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = url && key ? createClient(url, key) : null;
export const supabaseConfigured = supabase !== null;
// Sign-in and sync are NOT implemented yet. See README "Next stage".
export const SYNC_IMPLEMENTED = false;
