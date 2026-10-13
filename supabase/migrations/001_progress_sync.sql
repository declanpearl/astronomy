-- Astrophysics Academy: per-user progress sync tables with Row Level Security.
-- SAFE TO RE-RUN: uses "create table if not exists" and re-creates only the policies named below.
-- It never drops tables or deletes rows. Run it once in Supabase: SQL Editor -> New query -> paste -> Run.

-- 1) Attempts: append-only history (one row per answered question). Rows are never updated or deleted by the app.
create table if not exists public.attempts (
  user_id     uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  id          text        not null check (char_length(id) between 1 and 100),
  qid         text        not null check (char_length(qid) between 1 and 50),
  given       text        not null default '' check (char_length(given) <= 500),
  ok          boolean     not null,
  at          timestamptz not null,
  device      text        not null default '' check (char_length(device) <= 100),
  legacy_date text        check (legacy_date is null or char_length(legacy_date) <= 20),
  created_at  timestamptz not null default now(),
  primary key (user_id, id)
);

-- 2) Lesson completion (one row per lesson, latest change wins by updated_at).
create table if not exists public.lesson_progress (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id  text        not null check (char_length(lesson_id) between 1 and 50),
  done       boolean     not null,
  updated_at timestamptz not null,
  primary key (user_id, lesson_id)
);

-- 3) Checklist ticks (one row per checklist item, latest change wins by updated_at).
create table if not exists public.checklist_progress (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  item_key   text        not null check (char_length(item_key) between 1 and 80),
  checked    boolean     not null,
  updated_at timestamptz not null,
  primary key (user_id, item_key)
);

create index if not exists attempts_user_at_idx on public.attempts (user_id, at);

-- Row Level Security: every table is locked down; a signed-in user can only touch rows where user_id = their own id.
alter table public.attempts           enable row level security;
alter table public.lesson_progress    enable row level security;
alter table public.checklist_progress enable row level security;

-- No access at all for anonymous (not signed in) visitors.
revoke all on public.attempts, public.lesson_progress, public.checklist_progress from anon;
grant select, insert         on public.attempts           to authenticated;
grant select, insert, update on public.lesson_progress    to authenticated;
grant select, insert, update on public.checklist_progress to authenticated;

drop policy if exists "attempts_select_own" on public.attempts;
drop policy if exists "attempts_insert_own" on public.attempts;
create policy "attempts_select_own" on public.attempts for select to authenticated using (auth.uid() = user_id);
create policy "attempts_insert_own" on public.attempts for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "lesson_select_own" on public.lesson_progress;
drop policy if exists "lesson_insert_own" on public.lesson_progress;
drop policy if exists "lesson_update_own" on public.lesson_progress;
create policy "lesson_select_own" on public.lesson_progress for select to authenticated using (auth.uid() = user_id);
create policy "lesson_insert_own" on public.lesson_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "lesson_update_own" on public.lesson_progress for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "checklist_select_own" on public.checklist_progress;
drop policy if exists "checklist_insert_own" on public.checklist_progress;
drop policy if exists "checklist_update_own" on public.checklist_progress;
create policy "checklist_select_own" on public.checklist_progress for select to authenticated using (auth.uid() = user_id);
create policy "checklist_insert_own" on public.checklist_progress for insert to authenticated with check (auth.uid() = user_id);
create policy "checklist_update_own" on public.checklist_progress for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
