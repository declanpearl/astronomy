import { createClient } from '@supabase/supabase-js';
import { checkConfig } from './supabaseConfig.ts';

// Only the PUBLIC anon/publishable key belongs here. Never put a service_role or secret key in frontend code.
const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const key = ((import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as string | undefined)?.trim();

const check = checkConfig(url, key);
export const supabase = check.ok ? createClient(url as string, key as string) : null;
export const supabaseConfigured = supabase !== null;
export const supabaseConfigProblem = check.ok ? null : check.reason;
export const SYNC_IMPLEMENTED = true;
