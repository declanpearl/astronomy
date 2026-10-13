-- STARTER schema (untested). Run in Supabase: SQL Editor -> New query -> paste -> Run.
-- One row per user holding their whole progress document. A fuller per-table
-- schema (attempts, notes, mistakes, reviews) is planned for the sync stage.
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.user_progress enable row level security;
create policy "own row select" on public.user_progress for select using (auth.uid() = user_id);
create policy "own row insert" on public.user_progress for insert with check (auth.uid() = user_id);
create policy "own row update" on public.user_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own row delete" on public.user_progress for delete using (auth.uid() = user_id);
