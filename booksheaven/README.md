# BooksHeaven

BooksHeaven is a human-curated book discovery platform with a curated D1 core and an Open Library long-tail fallback. It deliberately contains no AI/LLM features and does not host copyrighted books or audiobooks.

## Stack

- Next.js App Router
- Cloudflare Workers via `@opennextjs/cloudflare`
- D1 for catalog/content
- KV and R2 bindings prepared for caching/covers
- Cloudflare Cron trigger placeholder
- Cloudflare Zero Trust Access for `/admin`

> Cloudflare's current documentation (2026-08-25) recommends Vinext for new Next.js projects and documents OpenNext as the maintenance path. This repository follows your requested OpenNext architecture, so reassess the adapter choice before production deployment.

## MVP included

- Homepage
- Curated book pages
- Search API: D1 first, Open Library fallback
- Genre and author pages
- Rule-based discovery
- Curated list pages
- Public-domain safety gate / reader placeholder
- Audiobook outbound-link section
- Admin dashboard + basic human editorial editor
- Curation priority sorted by views
- Link-health summary
- SEO metadata, robots and sitemap
- D1 schema + seed data

## Setup

1. Install Node.js 22+.
2. Run `npm install`.
3. Create D1: `npx wrangler d1 create booksheaven`.
4. Replace the D1 ID in `wrangler.jsonc`.
5. Create a KV namespace and replace its ID, or remove the KV binding until you implement cache-aside storage.
6. Create the R2 bucket `booksheaven-covers`, or remove the binding until cover mirroring is implemented.
7. Apply local schema and seed:
   - `npx wrangler d1 execute booksheaven --local --file=db/schema.sql`
   - `npx wrangler d1 execute booksheaven --local --file=db/seed.sql`
8. Start: `npm run dev`.
9. Worker-runtime preview: `npm run preview`.
10. Deploy: `npm run deploy`.

## Cloudflare Access

Create a Zero Trust Access application for `booksheaven.com/admin/*` and allow only your chosen identity. The app intentionally does not include password storage or custom login code.

## Important production work still required

- Implement true cache-aside persistence of Open Library / Google Books responses into D1.
- Add R2 cover mirroring with source/license checks.
- Add Google Books fallback and source-specific rate limiting.
- Add robust slug collision handling for long-tail books.
- Add edit flows for authors, genres, tags, links and curated list ordering.
- Add authenticated admin identity/audit attribution from Cloudflare Access headers.
- Add scheduled Cron Worker logic for trends, stale cache, and link checks.
- Add real public-domain text ingestion only after jurisdiction/source verification.
- Add affiliate disclosure and Amazon link management; never generate fake purchase URLs.
- Add analytics events and Search Console.
- Add account-backed reading tracker in a later phase.

## Data policy

Only human-written editorial fields belong in curated content. External metadata should remain clearly marked as external/cached metadata. Before caching source data, review the current terms for Open Library, Google Books, Project Gutenberg and LibriVox.
