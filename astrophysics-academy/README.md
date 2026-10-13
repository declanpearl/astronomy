# Astrophysics Academy: Stellar Evolution

Study app for the Science Olympiad event "Stellar Evolution in Normal and Starburst Galaxies".
Built with Vite + React + TypeScript. **Status: Stage 2 (conversion). Not yet build-tested by the author.**

## What works / what doesn't

**Ported from Stage 1 (expected to work; run the steps below to confirm):**
Navigation (8 tabs), 5 lessons, 12 questions with answer checking, progress saved in your browser, mistake notebook, official rules (verbatim), 41-row checklist with honest coverage, 8-formula reference, 16 object pages.

**Not built yet:** remaining lessons and questions, diagrams, mock competition, daily challenge, spaced-repetition timing, offline/service worker, JSON export/import, sign-in, cloud sync.

**Needs external setup (later):** a free Supabase project; GitHub Pages enabled.

**Sync is NOT implemented.** `src/lib/supabase.ts` only creates a client if you provide keys, and the app says so. `supabase/schema.sql` is an untested starter schema.

## Run it on your computer (beginner steps)

1. Install **Node.js LTS** from https://nodejs.org (click the big LTS button, accept defaults).
2. Download and unzip this project. You should have a folder named `astrophysics-academy`.
3. Open a terminal in that folder.
   - Windows: open the folder, click the address bar, type `cmd`, press Enter.
   - Mac: right-click the folder, choose "New Terminal at Folder".
4. Type `npm install` and press Enter. Wait until it finishes.
5. Type `npm run dev` and press Enter. Open the link it prints (usually http://localhost:5173).
6. To test a production build: `npm run build`. Any error text it prints is what to send me.

## Upload to GitHub (beginner steps)

1. Create a free account at https://github.com, click **New repository**, name it `astrophysics-academy`, leave it empty, click Create.
2. Easiest way: on the new repo page click **uploading an existing file**, drag in the *contents* of the project folder (not `node_modules`, which you shouldn't have uploaded anyway; `.gitignore` handles it with git). Make sure the hidden `.github` folder is included; if your computer hides it, use the git method below.
3. Git method (more reliable): in the project terminal run
   ```
   git init
   git add .
   git commit -m "Stage 2: Vite conversion"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/astrophysics-academy.git
   git push -u origin main
   ```
4. Deploy: repo **Settings → Pages → Source: GitHub Actions**. The included workflow `.github/workflows/deploy.yml` builds and publishes on every push to `main`. Your site appears at `https://YOUR-USERNAME.github.io/astrophysics-academy/`.
5. After your first `npm install`, commit the generated `package-lock.json` too.

## Environment variables (only needed for the sync stage)

Copy `.env.example` to `.env` and fill in your Supabase URL and **anon** key. Never use the service_role key. For deployment, add the same two names as repo secrets: Settings → Secrets and variables → Actions. `.env` is git-ignored.

## Project layout

- `src/data/`: all content (rules, checklist, lessons, questions, formulas, objects). Add content here.
- `src/views/`: one component per tab. `src/components/`: shared pieces.
- `src/lib/`: storage, mastery logic, Supabase client. `src/state/`: progress hook.
- `supabase/schema.sql`: starter database schema with row-level security.

## Mastery rule

Correct answer: box +1. Wrong answer: box resets to 0. Mastered = box 3 or more. Opening a lesson does not count as mastery.

## Next stage

Write real content (lessons and a larger verified question bank), keeping IDs stable. Then add offline caching (service worker + IndexedDB) and Supabase sync, then test with one account on two devices.
