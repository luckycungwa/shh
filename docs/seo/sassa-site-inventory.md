# SASSA Help Hub — Site Inventory (Phase 1)

Research date: **2026-10-16**
Site: https://www.sassahelphub.co.za/
Repository: `H:\2026\SHH\shh` (inspected read-only)
Method: repository source inspection + live `robots.txt` and `sitemap.xml` fetch (2026-10-16).

> This is the Phase 1 factual inventory. It is the destination for **what actually exists**,
> verified in the repo and live site. Query-based gap analysis (Phases 3–8) happens only after
> `ALL QUERIES SUBMITTED — RUN THE AUDIT`.
>
> Related existing docs (reuse, do not duplicate):
> `docs/TOPIC_GAP_AUDIT.md`, `docs/TOPIC_COVERAGE_MATRIX.md`, `docs/INDEXABLE_PAGE_QUALITY_AUDIT.md`,
> `docs/content-quality-plan.md`, `docs/google-compliance-checklist.md`.

---

## 1. Stack, build and deployment

| Item | Value |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| UI | NextUI, Tailwind CSS, framer-motion, lucide-react, react-icons |
| Content rendering | `react-markdown` + `rehype-slug` (updates only) |
| Content store | **File-based JSON** in `public/data/*.json` — read at build time with `fs.readFileSync`. No CMS, no DB, no API. |
| Build | `npm run build` (`next build`) — mostly static prerender (`○ Static`, `● SSG`), middleware dynamic |
| Validation | `npm run validate:content` (`scripts/validate-content.mjs`), `npm run lint` (eslint) |
| Dev | `npm run dev` → `next dev -H 127.0.0.1 -p 4000` |
| Host canonicalisation | `src/middleware.ts` 301 → `https://www.{host}` (forces `www` + HTTPS for all non-localhost) |

### Rendering rules that affect content edits (verified)
- `guides.json` `content` → **raw HTML** (`dangerouslySetInnerHTML`). `faqs` answers and `tips` → **plain text**.
- `status-meanings.json` `what_it_means` → **plain text**.
- `updates.json` `content` → **markdown**.
- `src/lib/canonical-facts.ts` `resolveTemplates()` resolves `{{token}}` facts only (not markdown).

---

## 2. Crawl and indexation infrastructure

| File | Role |
|---|---|
| `public/robots.txt` | `User-agent: *` / `Allow: /` / `Sitemap: …/sitemap.xml`. Live matches repo. |
| `src/app/sitemap.ts` | Generates `/sitemap.xml`. **Live count: 194 URLs** (2026-10-16). |
| `next.config.js` → `redirects()` | ~60 static 301s (blog→updates, legacy guide slugs, superseded `update-2026-0xx`, `/grants/older-persons-grant`→`/grants/old-age-pension`, etc.). |
| `src/lib/updates.ts` | `REDIRECTED_UPDATE_IDS` (16 ids) + `isIndexableUpdate()` — shared by sitemap and `/updates` hub so they can never disagree. Also excludes `tag === "monthly-payment-schedule"` and `noindex: true`. |
| `src/lib/office-indexation.ts` | City page indexable **only** with a curated `officeCities.json` record; province-derived template pages are `noindex`. |
| `public/llms.txt` | Curated AI/GEO summary (essential pages, statuses, key facts, policies). Static — not generated. |

### Per-page robots / canonical (verified in source)
- Canonical set per route via `generateMetadata` (`alternates.canonical`) or `src/lib/seo.ts` `buildMetadata`.
- Root layout sets site-level `alternates.canonical` + `WebSite`/`Organization` JSON-LD.
- `robots: { index: true }` explicit on grants, guides, status, appeals, banking, decline-reason, dates, province, offices (indexable branch), updates (indexable branch).
- `robots: { index: false }` on: `/search`, `not-found` (→ canonical `/404`), non-curated office city pages, and any `updates.json` entry with `noindex: true`.

### Structured data (via `src/components/JsonLd.tsx` + `src/lib/schema.ts`)
`Article`, `FAQPage`, `BreadcrumbList`, `HowTo`, `governmentOfficeSchema`, plus layout-level `WebSite` and `Organization`.
Coverage is broad (grants, guides, appeals, banking, decline reasons, dates, province, offices, tools, hubs).

---

## 3. Content inventory (by type)

Counts read directly from `public/data` (2026-10-16):

| Type | Route | Source file(s) | Count | Notes |
|---|---|---|---|---|
| Grants | `/grants/[slug]` | `grants/*.json` | 8 | srd-r370, old-age-pension, child-support, disability, foster-child, care-dependency, grant-in-aid, war-veterans |
| Guides | `/guides/[id]` | `guides.json` | 42 | ids now all natural-language (former legacy numeric `guide-001` re-slugged to `apply-child-support-grant`, 2026-10-16); remaining prefix-style ids like `guide-reinstate-grant`, `guide-means-test` are legacy aliases handled by 301s |
| Status meanings | `/status/[slug]` | `status-meanings.json` | 22 | incl. under-review, suspended, cancelled, no-status, alternative-income-detected |
| Declines | `/decline-reason/[slug]` | `decline-reasons.json` | 12 | |
| Banking | `/banking/[slug]` | `banking-methods.json` | 10 | + `/banking` hub |
| Appeals | `/appeals/[step]` | `appeals.json` | 6 | + `/appeals` hub |
| Updates | `/updates/[id]` | `updates.json` | 35 (≈19 indexable) | rest redirected or `noindex` |
| Payment dates | `/dates/[month-year]` | `payment-schedule-forecast.json` | 5 | sep-2026 … jan-2027 |
| Provinces | `/province/[slug]` | `provinces.json` | 9 | |
| Offices | `/sassa-offices/[province]/[city]` | `provinces.json` + `officeCities.json` | 9 hubs + 10 curated cities | curated cities only are indexable |
| FAQs (aggregate) | `/faq` | `faqs.json` | 61 | |
| Tools | `/tools`, `/eligibility-check` | `src/lib/tools/registry.ts` | 6 active | eligibility-check, means-test-calculator, status-explorer, payment-troubleshooter, appeal-deadline, scam-message-checker |
| Static/legal | — | inline | ~25 | home, faq, glossary, about, authors, sassa-contact, common-problems, how-much-is-srd-grant, lost-sassa-card-or-id, sassa-retail-collection-points, resources, scam-alert, policies, disclaimer, terms |

### Payment / date data sources (dependency map for Phase 6)
- **Single source of truth: `public/data/payment-schedule-forecast.json`** — consumed by `src/lib/payment-schedule.ts`, `src/lib/config.ts`, `src/lib/search-index.ts`, `src/app/sitemap.ts`, and the `/dates` + `/payment-calendar` routes. This is the correct pattern.
- **Unused / stale (NOT referenced anywhere in `src/`):**
  - `public/data/paymentDates.json` — hardcoded **September 2026** dates. Dead file; latent risk if re-wired.
  - `public/data/payments.json` — historical monthly table to Aug 2026. Dead file.
  - `public/data/payment-schedule-history.json` — check before relying on it (not referenced in `src/`).
- **Fact layer: `public/data/canonical-facts.json`** → `src/lib/canonical-facts.ts` `getFact()` / `resolveTemplates()`. Grants, tools and guides read shared figures from here (good single-source design).

### Unused / non-indexable assets (observed)
- `public/data/i18n/{en,xh,zu}.json` — present, but **no locale routing and no `hreflang`** anywhere in `src/`. Not wired up.
- `public/Updates.txt` — internal dev note, not used by the app.

---

## 4. Navigation and internal linking
- Global `Navbar` (tool dropdown driven by `tools/registry.ts`) + `Footer` in `src/app/layout.tsx`.
- Hubs: `/grants`, `/guides`, `/status`, `/payment-calendar`, `/dates/[month]`, `/tools`, `/updates`, `/resources`, `/sassa-offices`, `/province/[slug]`.
- Cross-link patterns: guides → status meanings + related guides; grants → guides + canonical facts; updates → guides (some legacy links historically mis-pointed — corrected 16 Oct 2026 for the review cluster).
- `src/lib/search-index.ts` builds the in-site search index (feeds `/search`, which is `noindex`).

---

## 5. Known content/technical problems observed in the repo (Phase 1, pre-query)
> Full detail and severity in `docs/seo/sassa-technical-and-factual-issues.md`.

1. ~~**Legacy numeric guide slug** `guide-001`~~ — **Resolved 2026-10-16:** re-slugged to `apply-child-support-grant` with a 301. Intent overlap with `child-support-grant` / `apply-sassa-grants` still to verify in Phase 3.
2. **Dead stale date files** (`paymentDates.json`, `payments.json`) — Sept 2026 dates and old amounts sitting in the repo, unreferenced. Risk if re-consumed.
3. **`/dates` spans a past month and far-future projections** (`september-2026` … `january-2027`) — must clearly separate confirmed vs projected (Phase 6).
4. **Mojibake** (`—` rendered as `�?"`) in `src/app/search/page.tsx` strings (page is `noindex`, low impact).
5. **`Organization` JSON-LD is thin** — no `logo`, `sameAs`, `contactPoint`, or `foundingDate`; limited entity signal for AI/GEO.
6. **`llms.txt` is static and manually curated** — can drift from live facts; no generation from `canonical-facts.json`.

---

## 6. Live-vs-repo disagreements / things to verify live
- Live sitemap (194) includes `/eligibility-check` (registry-owned) and current `/dates` months — consistent with `sitemap.ts`.
- Repo `public/robots.txt` matches live exactly.
- All canonical hosts resolve to `https://www.sassahelphub.co.za` via middleware (verify with a live redirect spot-check during Phase 4/6).
- Live sitemap `lastmod` values are derived from JSON `last_updated`/`date` fields — confirm the newest edits (16 Oct 2026) are reflected after the next deploy.

---

## 7. Inventory method & limitations
- Enumerated routes from `src/app/**/page.tsx` (46 route files) and cross-checked against the live sitemap.
- Counts are from the JSON data files at build time, not from rendered pages.
- No live rank, search-volume or click data was used here (none available in-repo).
- Page-level intent/quality classification is deferred to Phases 3–8 once queries are supplied.
- This audit made **no** changes to production content, redirects, canonicals or robots directives.
