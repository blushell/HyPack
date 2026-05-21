# HyPack

**Build, share, and export Hytale modpacks** — powered by CurseForge discovery and a simple web UI.

HyPack lets players search Hytale mods on CurseForge, assemble modpacks, choose visibility (private, unlisted, or public), and download a ready-to-use ZIP with mod files and a generated `config.json`. Creators can share packs on Explore, collect likes, and manage everything from a personal dashboard.

Live site: [hypack.ca](https://www.hypack.ca)

## Features

### Modpack builder
- **Create & edit modpacks** — name, description, custom icon (JPEG/PNG, max 2 MB)
- **CurseForge mod search** — find and add Hytale mods from the API
- **Visibility** — Private (owner only), Unlisted (link-only), or Public (discoverable on Explore)
- **Export** — download a ZIP with mod files, `config.json`, and a README
- **Duplicate** — fork your own or someone else’s public/unlisted pack

### Community
- **Explore** — browse and search public modpacks
- **Likes** — save favorite packs to **My likes**
- **Creator profiles** — public pages per user (`/users/[userId]`)

### Content (markdown)
- **Blog** — `content/blog/`
- **Changelog** — `content/changelog/`
- **Guides** — `content/guides/` (subfolders become nav categories)

### Auth
- Sign in / sign up via [Clerk](https://clerk.com) (email, Google, GitHub, Discord, etc. — configured in your Clerk dashboard)
- Protected routes for managing your modpacks

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Auth | Clerk |
| Database & storage | Supabase (Postgres + Storage) |
| Mod metadata | [CurseForge API](https://docs.curseforge.com/) |
| Markdown content | gray-matter + react-markdown |

## Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 20+
- A [Clerk](https://dashboard.clerk.com/) application
- A [Supabase](https://supabase.com/dashboard) project
- A [CurseForge API key](https://console.curseforge.com/)

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/blushell/HyPack.git
cd HyPack
bun install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key (server only) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |
| `CURSEFORGE_API_KEY` | CurseForge API token |

Optional:

| Variable | Description |
|----------|-------------|
| `HYPACK_FEATURED_CLERK_USER_ID` | Clerk user ID for homepage featured modpacks (defaults to username `hypack`) |
| `HYTALE_MOD_COUNT_CACHE_SECONDS` | Cache duration for homepage mod count (default `21600`) |

Clerk redirect URLs are documented in `.env.example`. For local dev, use your `pk_test_` / `sk_test_` keys.

### 3. Supabase

1. Create a Supabase project.
2. Run [`supabase/setup.sql`](supabase/setup.sql) in the SQL Editor.
3. See [`supabase/README.md`](supabase/README.md) for details.

### 4. Run locally

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production deployment (Vercel + Clerk)

When deploying to production (e.g. [hypack.ca](https://www.hypack.ca)):

1. **Vercel** — set all env vars for the **Production** environment using `pk_live_` / `sk_live_`, then **redeploy** (required for `NEXT_PUBLIC_*` vars).
2. **Clerk domains** — add `hypack.ca`, `www.hypack.ca`, and complete DNS for the Clerk Frontend API host (e.g. `clerk.hypack.ca`). Without that DNS record, sign-in UI will not load.
3. **OAuth (Google, GitHub, Discord, …)** — configure **Production** social connections separately from Development. Use Clerk’s redirect URI (typically `https://clerk.<your-domain>/v1/oauth_callback`) in each provider’s developer console.

## Project structure

```
HyPack/
├── content/              # Markdown: blog, changelog, guides
├── public/               # Static assets (logo, hero image)
├── src/
│   ├── app/              # Next.js routes & API handlers
│   │   ├── api/          # REST API (modpacks, mods search, …)
│   │   ├── blog/         # Blog listing & posts
│   │   ├── changelog/    # Release notes
│   │   ├── explore/      # Public modpack discovery
│   │   ├── guides/       # Documentation (with categories)
│   │   └── modpacks/     # Creator dashboard & pack pages
│   ├── components/       # React UI
│   └── lib/              # Server logic (CurseForge, modpacks, Clerk, Supabase)
├── supabase/
│   └── setup.sql         # Database schema & storage bucket
└── proxy.ts              # Clerk middleware (protected routes)
```

## Adding content

### Blog or changelog

Add a `.md` file under `content/blog/` or `content/changelog/`:

```md
---
title: Post title
date: 2025-06-01
---

Your markdown content here.
```

The filename (without `.md`) becomes the URL slug.

### Guides (with categories)

- Root file: `content/guides/overview.md` → `/guides/overview`
- Category folder: `content/guides/getting-started/welcome.md` → `/guides/getting-started/welcome`

Subfolders appear in the **Guides** nav dropdown. See [`content/guides/README.md`](content/guides/README.md).

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun run build` | Production build |
| `bun run start` | Run production server locally |
| `bun run lint` | Run ESLint |

## API overview

| Endpoint | Purpose |
|----------|---------|
| `GET/POST /api/modpacks` | List / create modpacks |
| `GET/PATCH/DELETE /api/modpacks/[id]` | Modpack CRUD |
| `POST /api/modpacks/[id]/export` | Export modpack ZIP |
| `POST /api/modpacks/[id]/like` | Toggle like |
| `POST /api/modpacks/[id]/duplicate` | Duplicate modpack |
| `POST /api/modpacks/[id]/icon` | Upload icon |
| `GET /api/mods/search` | CurseForge mod search |

All modpack mutations require an authenticated Clerk session.

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE) (AGPL-3.0).

## Links

- [Repository](https://github.com/blushell/HyPack)
- [Changelog](/changelog) (on the running site)
