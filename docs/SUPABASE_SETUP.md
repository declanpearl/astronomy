# Supabase setup (beginner steps)

Cloud sync is OPTIONAL. The app works fully without it. Progress is always saved on the device first.
Nothing below can be tested by the developer without your account, so please run the checks in step 9.

## 1. Create a free project
1. Go to https://supabase.com and sign up (GitHub login works).
2. Click **New project**. Pick any name, choose a region near you, and set a **database password**. Save it in a password manager. You never type it into the app.
3. Wait about two minutes until the dashboard finishes setting up.

## 2. Create the tables (one copy-paste)
1. In the left sidebar click **SQL Editor**, then **New query**.
2. Open `supabase/migrations/001_progress_sync.sql` from this project, copy ALL of it, paste it in, click **Run**.
3. You should see "Success. No rows returned".
4. Click **Table Editor**: you should see `attempts`, `lesson_progress` and `checklist_progress`, each marked "RLS enabled". (Row Level Security means each signed-in user can only read and write their own rows.)
The script is safe to run again. It never deletes tables or rows.

## 3. Sign-in settings
1. **Authentication** → **Sign In / Providers** (or **Providers**) → make sure **Email** is enabled.
2. "Confirm email": if ON, new accounts must click a link in an email before signing in (Supabase's built-in email sender is heavily rate-limited). For a personal study site, the simplest choice is to turn it OFF. Turning it off means anyone could register with any email address, which is fine for a private progress tracker but your call.

## 4. Allowed web addresses
1. **Authentication** → **URL Configuration**.
2. **Site URL**: your GitHub Pages address, for example `https://YOUR-USERNAME.github.io/astrophysics-academy/`.
3. **Redirect URLs**: add the same address and `http://localhost:5173/` (used for password-reset links).

## 5. Copy the two public values
1. **Project Settings** (gear icon) → **API** (newer dashboards: **API Keys**).
2. Copy **Project URL** (looks like `https://abcdefgh.supabase.co`).
3. Copy the **anon** key, also called the **publishable** key. This key is meant to be public.
4. Do NOT copy `service_role` or any "secret" key. If you paste one by mistake the app will refuse to use it, but never put it in Git or in chat.

## 6. Try it on your own computer
1. In the project folder, copy `.env.example` to a new file named `.env.local` and paste the two values in.
2. Stop and restart `npm run dev` (environment values load only at startup).
3. Open **Settings**: you should see "Cloud sync (optional)". Create an account, then press **Sync now**.

## 7. Put the values on GitHub so the published site can sync
1. GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**.
2. Create `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the two values from step 5.
3. **Settings** → **Pages** → **Build and deployment** → **Source: GitHub Actions**.
4. Push your code. The **Actions** tab shows the deploy; your address appears under Settings → Pages. If you add the secrets after a deploy, push any small change (or re-run the workflow) so the site is rebuilt with them.

## 8. First sync with progress you already have
Before signing in on a device that has progress, open **Settings** → **Export backup** and keep the file. The first sync merges: attempts are combined (no duplicates), and for lessons/checklist the newest change wins. Nothing is deleted from either side.

## 9. Test checklist (please do these once)
- [ ] Laptop: create account, answer a few questions, press Sync now: status says "Synced".
- [ ] Supabase Table Editor → `attempts`: you see rows with your user id.
- [ ] Phone: open the published address, sign in with the same email: attempts, ticks and the mistake notebook appear after a few seconds.
- [ ] Answer a question on the phone, press Sync now, then Sync now on the laptop: it appears there.
- [ ] Turn on airplane mode, answer a question (it is saved locally), turn it off: status returns to Synced.
- [ ] Optional: create a second account and confirm it sees none of the first account's progress.

## Troubleshooting
- "permission denied for table ..." or "relation ... does not exist": step 2 was not run (or ran in a different project).
- "Invalid login credentials": wrong password, or the email was never confirmed (step 3).
- "Failed to fetch": no internet, or the URL in `.env.local` / the GitHub secret has a typo.
- No "Cloud sync" form in Settings: the two values are missing at build time. Locally, restart `npm run dev`; on GitHub, check the secret names exactly and redeploy.
- Published site is blank: Settings → Pages → Source must be "GitHub Actions".

## Using this on competition day
- The published site needs internet. The app has NO offline cache yet. For offline use, run your own copy: `npm run build` then `npm run preview` (works without internet), or `npm run dev`.
- Browser storage belongs to one address: progress at `localhost` is separate from progress at the `github.io` address. Carry progress with cloud sync (needs internet beforehand) or Export/Import backup.
- Follow the event rules about permitted resources and about AI tools; this app contains no AI features.
