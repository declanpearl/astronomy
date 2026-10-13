import type { SupabaseClient } from '@supabase/supabase-js';
import { mergeStores } from './progressModel.ts';
import type { ProgressStore } from './progressModel.ts';
import { rowsToPush, rowsToStore } from './syncModel.ts';
import type { AttemptRow, ChecklistRow, LessonRow } from './syncModel.ts';

const PAGE = 1000;
const CHUNK = 500;

async function fetchAll<T>(client: SupabaseClient, table: string, columns: string, order: string): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client.from(table).select(columns).order(order, { ascending: true }).range(from, from + PAGE - 1);
    if (error) throw new Error(`Could not read ${table}: ${error.message}`);
    out.push(...((data ?? []) as unknown as T[]));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

async function upsertChunks<T extends object>(client: SupabaseClient, table: string, rows: T[], userId: string, onConflict: string, ignoreDuplicates: boolean): Promise<void> {
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK).map((r) => ({ ...r, user_id: userId }));
    const { error } = await client.from(table).upsert(chunk, { onConflict, ignoreDuplicates });
    if (error) throw new Error(`Could not save ${table}: ${error.message}`);
  }
}

/**
 * Two-way, non-destructive sync: read everything the user has in the cloud, merge it with local progress
 * (attempts are unioned by id; lessons/checklist keep the newest change), upload only what the cloud lacks,
 * and return the merged store. Nothing is ever deleted.
 */
export async function syncStore(client: SupabaseClient, userId: string, local: ProgressStore): Promise<ProgressStore> {
  const [attempts, lessons, checklist] = await Promise.all([
    fetchAll<AttemptRow>(client, 'attempts', 'id,qid,given,ok,at,device,legacy_date', 'at'),
    fetchAll<LessonRow>(client, 'lesson_progress', 'lesson_id,done,updated_at', 'lesson_id'),
    fetchAll<ChecklistRow>(client, 'checklist_progress', 'item_key,checked,updated_at', 'item_key'),
  ]);
  const remote = rowsToStore(local.deviceId, { attempts, lessons, checklist });
  const merged = mergeStores(local, remote);
  const push = rowsToPush(merged, remote);
  await upsertChunks(client, 'attempts', push.attempts, userId, 'user_id,id', true);
  await upsertChunks(client, 'lesson_progress', push.lessons, userId, 'user_id,lesson_id', false);
  await upsertChunks(client, 'checklist_progress', push.checklist, userId, 'user_id,item_key', false);
  return merged;
}
