# Astrophysics Academy: Stellar Evolution (Science Olympiad study app)

React + TypeScript + Vite. 46 lessons, 305 questions (q1–q305), 16 required-object study pages, rules checklist, mistake notebook, JSON backup, and optional Supabase cloud sync.

## Run locally (Windows)
1. Install Node.js LTS from https://nodejs.org
2. In the project folder: `npm install`, then `npm run dev`, and open the address it prints (usually http://localhost:5173).

## Test and build
- `npm test` (unit and content tests), `npm run coverage` (regenerates docs/COVERAGE.md), `npm run build` (type-check + production build), `npm run preview` (serve the built site).

## Progress storage and backup
Progress is saved in your browser first (works offline and without an account). **Settings → Export backup** downloads a JSON file; **Import** merges a backup into current progress without deleting anything. Progress is stored per web address (localhost and github.io are separate).

## Cloud sync (optional, Supabase)
Sign in under **Settings** to share progress between devices. Attempts are merged by id (no duplicates, never deleted); lesson and checklist changes keep the newest version. Tables use Row Level Security so each user can only read and write their own rows. Only the public anon/publishable key is used in the browser; the app refuses secret/service_role keys. Full beginner steps: `docs/SUPABASE_SETUP.md`. SQL: `supabase/migrations/001_progress_sync.sql`. Environment variables: copy `.env.example` to `.env.local` (ignored by Git).

## Deploy to GitHub Pages
1. Push to the `main` branch of your GitHub repository.
2. Settings → Pages → Source: **GitHub Actions**. The workflow in `.github/workflows/deploy.yml` builds and publishes.
3. For sync on the published site, add repository secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Settings → Secrets and variables → Actions).
The site uses relative asset paths (`base: './'`) so it works at `https://USER.github.io/REPO/`.

## Known limitations
- No offline cache/service worker yet: the published site needs internet; run a local copy for offline use.
- Cloud sync code is unit-tested against a simulated server only; test it with your own Supabase project (checklist in docs/SUPABASE_SETUP.md).
- Clock differences between devices can affect "newest wins" for lesson/checklist changes.
- Content: see docs/COVERAGE.md and docs/VERIFICATION.md for what is still thin or unverified. Questions are original practice material, not official event questions.

## Project layout
`src/data` content (lessons, questions, objects, rules) · `src/views` screens · `src/lib` progress model, sync, config checks · `src/state` hooks · `supabase/` SQL · `tests/` · `docs/`.
