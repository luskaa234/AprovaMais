# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**VemAprovar** is a Brazilian public-exam (concurso público) and OAB (bar exam) preparation platform. It offers question banks, AI-generated study plans, mock exams, flashcards, mind maps, legislation reading, error notebooks, physical test prep (TAF), and an AI tutor — all in one SPA.

Stack: React 19 + Vite, Tailwind CSS v4, Supabase (Postgres + Auth + RLS + Edge Functions), Zustand for client state, OpenRouter (via Edge Function) for AI, Mercado Pago for payments, deployed on Vercel.

## Commands

```bash
npm run dev          # local dev server (also starts /api/create-checkout middleware)
npm run build        # production build
npm run lint         # ESLint (JS/JSX only)
npm run preview      # preview production build locally

# Content miners (run with tsx, need .env configured)
npm run miner:oab
npm run miner:pci-militar
npm run miner:leis

# Test Supabase Edge Function locally
supabase functions serve ia-aprova --env-file .env
```

No test runner is configured. There are no unit or integration tests.

## Environment variables

Copy `.env.example` to `.env`. Key variables:

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (public) |
| `VITE_MP_PUBLIC_KEY` | Mercado Pago public key |
| `VITE_CHECKOUT_ESSENCIAL_URL` | Checkout URL for Essencial plan |
| `VITE_CHECKOUT_PRO_URL` | Checkout URL for Pro plan |
| `VITE_PAYMENT_CHECKOUT_ENDPOINT` | API endpoint for checkout (defaults to `/api/create-checkout` in dev) |
| `VITE_API_URL` | Base URL for the API (Vercel serverless or local) |

Secrets that must **never** go in the frontend live only in Supabase secrets:
```bash
supabase secrets set OPENROUTER_API_KEY=sk-or-...
supabase secrets set MP_ACCESS_TOKEN=...
```

## Architecture

### Routing — internal SPA router, not React Router

The app uses a **custom internal router** (`src/contexts/RouterContext.jsx`) rather than URL-based routing for the authenticated area. `navigate(key)` pushes a string key (e.g. `"questoes"`, `"dashboard"`) and `AppShell` renders the matching lazy-loaded page from the `views` map in `src/pages/InternalApp.jsx`.

Public pages (landing, login, register) use React Router DOM with a single route (`/`) that renders `UnifiedApp`, which switches between `<Home>` (landing) and `<InternalApp>` based on auth state.

### State — Zustand stores with localStorage persistence

All client-side study state lives in `src/stores/index.js` as Zustand `persist` stores:

- `useUserStore` — local user profile (fallback when Supabase not configured)
- `useQuestoesStore` — questions, attempts, saved, error notebook (`caderno`)
- `useSimuladosStore` — mock exam sessions and results
- `useFlashcardsStore` — decks, cards, SM-2 spaced repetition
- `usePlanoStore` — study plan activities
- `useRevisaoStore` — scheduled reviews (SM-2 algorithm via `src/utils/`)
- `useTafStore` — physical test training logs
- `useLeisStore` — legislation with highlights, bookmarks, notes
- `useRedacaoStore` — essay drafts
- `useNotificacoesStore` — in-app notifications
- `useRankingStore` — gamification points

All stores have versioned migrations (`version` + `migrate`). When adding fields to a store, increment the version.

### Auth and user merging

`src/contexts/UserContext.jsx` merges two sources into a single `user` object:
1. **Supabase auth + `profiles` table** — authoritative when `isSupabaseConfigured` is true
2. **Zustand `useUserStore`** — fallback for local demo mode (no Supabase keys)

The app runs fully without Supabase configured — all features work with mock/seed data. `isSupabaseConfigured` (from `src/lib/supabase.js`) gates every real API call.

### Access control

`hasActiveAccess(user)` in `InternalApp.jsx` checks `user.planoAtivo` and `user.planoExpiraEm`. When expired, a paywall (`TrialExpiredGate`) replaces the app. Access is granted by the Mercado Pago webhook (`supabase/functions/webhook-mercadopago`) setting `plano_ativo = true` in the `profiles` table — **never** by the frontend.

### Services layer

`src/services/` contains one file per domain (e.g. `questoesService.js`, `oabService.js`). Each service calls Supabase or falls back to the Zustand store when Supabase is unavailable. Keep this pattern — never call `supabase` directly from page components.

### AI

The AI tutor (`supabase/functions/ia-aprova/`) calls OpenRouter with free-tier models, cycling through up to 3 at a time. It authenticates callers via Supabase JWT. The frontend sends requests through `src/services/aiService.js`, which invokes the Edge Function — AI keys never touch the browser.

### Admin panel

Accessible at route key `"admin"` for users with `role = "admin"`. The admin panel (`src/admin/AdminLayout.jsx`) calls `adminService` functions, which invoke Edge Functions prefixed `admin-*`. Maintenance mode is stored in the `configuracoes` table and polled on each page load.

### Content miners

`scripts/content-miner/*.ts` are standalone Node scripts (run via `tsx`) that scrape official exam PDFs and APIs, then output structured JSON to `public/questoes/`. They use `better-sqlite3`, `pdf-parse`, `cheerio`, and `axios`. They are independent of the app build.

## Key conventions

- **Portuguese everywhere** — UI text, variable names in domain context (e.g. `materia`, `banca`, `concurso`), database columns. Keep this convention.
- **Tailwind v4** — uses the `@tailwindcss/vite` plugin, not PostCSS. Class utilities are available without a config file.
- **Path alias** — `@/` resolves to `src/` (configured in `vite.config.js`).
- **No TypeScript in the frontend** — only `.js`/`.jsx`. TypeScript is used only in `scripts/` and `supabase/functions/`.
- **`cx()` utility** — imported from `src/components`, wraps `clsx` + `tailwind-merge`. Use it for conditional class merging.
- **Component exports** — UI primitives (`Button`, `Input`, `Card`, `Avatar`, etc.) are re-exported from `src/components/index.js`. Import from `"../components"`, not from individual files.
- **OAB-specific routing** — pages/views gated behind `isOabFocus(user)` check (reads `user.objective` or `user.targetContest`). The `oab` route is only shown to users whose target is the OAB exam.
