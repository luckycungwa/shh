# Indexable Page Quality Audit — SASSA Help Hub

Date: 2026-09-23 · Scope: every route that is (or can become) indexable · Status: **AUDIT + IMPLEMENTED REC (final pass 2026-09-23/24).** Implemented in this pass: **P0 `/search` noindex**, **P1 `/province/[slug]` vs `/sassa-offices/[province]` distinctification**, **P1 `/faq` restructure**, office-directory `verification` classification, and the payment-methods guide gap-fill. Not implemented (per brief): template-city-page removal/redirect, `/how-much-is-srd-grant` merge, `/lost-sassa-card-or-id` merge, tool-page word-count expansion, `/dates/[month-year]` restructure, new article clusters.

This document classifies every page/route group on the site for AdSense readiness and records which recommendations were executed. Merges, deletions and `noindex` additions described here were implemented deliberately, route by route, with before/after build validation.

---

## 1. How the inventory was built

- Static routes enumerated from `src/app/sitemap.ts` (`staticPages`) plus all `page.tsx` files under `src/app`.
- Dynamic routes enumerated from their data sources:
  - `/guides/[id]` — `public/data/guides.json` (42)
  - `/updates/[id]` — `public/data/updates.json` (30 after 2026-09-24 follow-up added update-2026-038; 16 redirect-flagged, ~14 in sitemap)
  - `/grants/[slug]` — `public/data/grants/*.json` (8)
  - `/status/[slug]` — `public/data/status-meanings.json` (22)
  - `/decline-reason/[slug]` — `public/data/decline-reasons.json` (12)
  - `/banking/[slug]` — `public/data/banking-methods.json` (10)
  - `/appeals/[step]` — `public/data/appeals.json` (6)
  - `/dates/[month-year]` — `public/data/payment-schedule-forecast.json` (5: sep 2026 → jan 2027, after 2026-09-24 follow-up confirmed October and added January)
  - `/province/[slug]` — `public/data/provinces.json` (9)
  - `/sassa-offices/[province]` — `public/data/provinces.json` (9)
  - `/sassa-offices/[province]/[city]` — 10 curated (`officeCities.json`) + 53 template-derived (provinces.json office rows)
- Indexation state verified against current hard rules:
  - Template-derived city pages are already `noindex, follow` (`src/lib/office-indexation.ts` + `[city]/page.tsx`).
  - Updates flagged `noindex` or tagged `monthly-payment-schedule` are excluded from the sitemap.
  - **`/search` is indexable today and is NOT in the sitemap** — flagged below (highest-priority fix). **ENFORCED 2026-09-23: `/search` now emits `noindex, follow`.**

Total indexable surface (current sitemap): ≈174 URLs. Full route count including noindex/template pages: ≈300.

---

## 2. Classification key

| Class | Meaning |
|---|---|
| **KEEP** | Unique, substantial, healthy as-is |
| **IMPROVE** | Worth keeping; needs copy/schema/dedup work |
| **MERGE** | Overlaps semantically with another page; consolidating is better than parallel pages |
| **NOINDEX** | Should not be in the index (duplicative/thin/system page) |
| **REMOVE** | No residual value; candidate for deletion or redirect long-term |

---

## 3. Route-by-route table

### 3.1 Core money pages

| URL | Current purpose | Classification | Overlaps with | Reason | Recommended action |
|---|---|---|---|---|---|
| `/` | Home — SRD + status + schedules | KEEP | — | Strong entry point | None |
| `/status-check` | SRD status check guide | KEEP | `/status`, `/dates/*` | High-value, unique walkthrough | None |
| `/payment-calendar` | Payment date calendar | KEEP | `/dates/*`, `/status-check` | Primary schedule hub | Keep canonical owner of "payment dates" |
| `/dates/[month-year]` (4) | Per-month confirmed/projected dates | KEEP | `/payment-calendar` | Adds month-specific landing; keep | Ensure every month has a `canonical` to itself and links to `/payment-calendar` |
| `/status` + `/status/[slug]` (22) | Status meanings hub + deep dives | KEEP | `/status-check`, `/decline-reason/*` | Distinct intent | None |
| `/decline-reason/[slug]` (12) | Decline-code deep dives | KEEP | `/status/*`, `srd-r370-grant` | Unique intent (fix-from-here) | Cross-link into `/grants/srd-r370-grant` |

### 3.2 Content hubs & libraries

| URL | Current purpose | Classification | Overlaps with | Reason | Recommended action |
|---|---|---|---|---|---|
| `/guides` + `/guides/[id]` (42) | Guide library | KEEP | `/faq`, `/common-problems` | Large, distinct bodies | None |
| `/grants` + `/grants/[slug]` (8) | Grant deep dives | KEEP | `/decline-reason/*` | Distinct intent | None |
| `/updates` (90-day gate) + `/updates/[id]` (~13 in sitemap) | News/updates log | KEEP | `/guides/*` | Time-stamped news; freshness-gated | Keep the 90-day urgency gate; 16 redirect-flagged posts already excluded |
| `/faq` | FAQ hub from `faqs.json` (61) | IMPROVE → **DONE** | `/guides/*` FAQ sections | Hub risk was thin-duplicate of per-guide FAQs | **Implemented 2026-09-24:** normalized to 8 canonical groups (SRD application, SRD status, payments, banking, appeals, eligibility, scams & security, other grants); added per-FAQ links to deeper guides (`linkedPage`, 49/61 items); trimmed 5 guide-duplicative long answers; added 7 genuinely-missing questions (portal-down, reflect-time, monthly-reapply, R370-ending myth, change phone number, appeal declined = judicial review/Legal Aid, Cancelled vs Suspended) |
| `/glossary` | Grant term definitions | KEEP | `/faq` | Unique term-index intent | Consider programmatic term expansion later; fine now |
| `/common-problems` | Cross-guide problem index | KEEP | `/guides/*` | Consolidation page, healthy | None |

### 3.3 Office & province pages

| URL | Current purpose | Classification | Overlaps with | Reason | Recommended action |
|---|---|---|---|---|---|
| `/sassa-offices` | Directory hub | KEEP | `/resources` | Now data-driven (2026-09-23), no hardcoded dupes | None |
| `/sassa-offices/[province]` (9) | Province office guide | KEEP | `/province/[slug]`, `/resources` | Office-specific | **Implemented 2026-09-24:** fixed unguarded district-office cards (unverified address/phone now hidden behind amber guard), added practical visiting-info section, added cross-link to `/province/[slug]`, trimmed About prose duplication with the grants page, articleSchema date → `province.last_updated` |
| `/sassa-offices/[province]/[city]` curated (10) | Curated city profiles | KEEP | `/[province]`, `/resources` | Unique descriptions + tips | Keep; verify unverified flags stay honest |
| `/sassa-offices/[province]/[city]` template-derived (53) | Thin address/phone cards | NOINDEX (already) | curated city pages, `/sassa-offices/[province]` | Template-thin; already `noindex` | **Keep** as-is long-term; optional future REMOVE/redirect into province page when curated content catches up |
| `/province/[slug]` (9) | Province grants + beneficiary page | MERGE → **RESOLVED: KEEP** | `/sassa-offices/[province]` | Two province hierarchies risked competing for the same intent | **Implemented 2026-09-24 (distinctification):** `/province/[slug]` is now grants/eligibility-focused (title `SASSA Grants in {province}`, grants grid → `/grants/*`, eligibility quick-facts from canonical-facts, how-to-apply help cards, regional office card, district chips, office towns as chips + link to office directory). `/sassa-offices/[province]` stays the office directory. Both remain indexable (`index, follow`, own canonicals) with **no** canonical-to-hide-duplicate; internal links connect the two in both directions. Removed from the province page: full main/district address/phone tables and the collection-points grid (owned by offices + retail pages). |
| `/resources` | Office locator + profiles | KEEP | `/sassa-offices/*` | Tool-like search surface; unique | None |

### 3.4 Utility / trust pages

| URL | Current purpose | Classification | Overlaps with | Reason | Recommended action |
|---|---|---|---|---|---|
| `/scam-alert` | Scam warnings | KEEP | `/sassa-contact` | Distinct | None |
| `/sassa-contact` | Contact hub | KEEP | `/contact`, `/scam-alert` | Distinct, high-trust | None |
| `/how-much-is-srd-grant` | SRD amount page | KEEP | `/grants/srd-r370-grant` | High-volume precise intent | Consider consolidating into `srd-r370-grant` with redirect (priority: medium) |
| `/lost-sassa-card-or-id` | Card replacement + Black Card guide | KEEP | `/guides/postbank-black-card-guide` | Similar topic, different entry intent | Watch for cannibalization; consider canonical direction |
| `/sassa-retail-collection-points` | Retail collection guide | KEEP | `/payment-calendar` | Distinct | None |
| `/eligibility-check` | Interactive tool | IMPROVE | `/grants/*` | Tool page; add supporting editorial copy | Add how-it-works copy + authority text |
| `/tools/appeal-deadline`, `/tools/payment-troubleshooter`, `/tools/status-explorer` | Interactive tools | IMPROVE | parent guides | Thin, but unique utility | Add surrounding guidance; keep indexable |
| `/search` | Search results | **NOINDEX** | — | System page; indexable today but NOT in sitemap | **High priority:** set `robots: { index: false, follow: true }` |
| `/about`, `/authors`, `/contact` | Trust/E-E-A-T | KEEP | — | Required for E-E-A-T | None |
| `/privacy-policy`, `/terms-of-service`, `/disclaimer` | Legal | KEEP | — | Required | None |
| `/editorial-policy`, `/fact-checking-policy`, `/sources-policy`, `/corrections-policy` | E-E-A-T policies | KEEP | — | Strengthen trust | None |

---

## 4. Summary counts (final, after implementation)

| Classification | Count |
|---|---|
| KEEP | 27 route groups / ≈300 pages (bulk of site) |
| IMPROVE | 8 route groups identified; **2 implemented** (`/faq` restructured, `/province/[slug]` distinctified) — remaining 6 held per brief (tool pages ×3+1, `/how-much-is-srd-grant`, `/lost-sassa-card-or-id`, `/dates/*`) |
| MERGE | 0 (province/offices overlap **resolved** via distinctification instead of merging — two distinct indexable intents) |
| NOINDEX | 54 total (53 template city pages + `/search` — **enforced 2026-09-23**) |
| REMOVE | 0 (held; long-term candidate: 53 template city pages via redirect) |

### Office-directory verification classification (2026-09-23/24, added to all records)

| Dataset | Total | Verified | Partially verified | Unverified | Obsolete (removed) |
|---|---|---|---|---|---|
| `provinces.json` (regional + main + district) | 72 | 18 | 2 (Soweto, Thohoyandou) | 52 | 2 (Bhisho, Centurion) |
| `officeCities.json` (curated city pages) | 10 | 9 | 1 (Soweto) | 0 | — |
| `resources.json` (office profiles) | 10 | 10 | 0 | 0 | — |

Verified records carry `source` + `verified_at: 2026-09-23`. All UI renders hide address/phone for anything other than `verified: true` (amber "confirm with SASSA" guard instead). Note: `officeCities.json` Durban record = verified data but DUPLICATE (KZN regional HQ is in Pietermaritzburg) — flagged for a future dedup decision, not removed this cycle.

---

## 5. Prioritized recommendations (implementation log)

1. **P0 — `/search`: add `noindex, follow`.** **DONE 2026-09-23** — `src/app/search/page.tsx` now merges `buildMetadata(...)` with `robots: { index: false, follow: true }`; build-verified in `.next/server/app/search.html` (`noindex, follow`).
2. **P1 — `/province/[slug]` vs `/sassa-offices/[province]` overlap.** **DONE 2026-09-24** — distinctified (grants page vs offices directory), both indexable, bidirectional internal links, no canonical-hiding.
3. **P1 — `/faq` as a true hub.** **DONE 2026-09-24** — 8 canonical groups, per-FAQ guide links, guide-duplicative answers trimmed, 7 genuine gaps added (61 total).
4. **P2 — `/how-much-is-srd-grant` + `/lost-sassa-card-or-id`:** held per brief (no merging).
5. **P2 — Tool + tool-adjacent pages:** held per brief (no word-count padding added to tools).
6. **P3 — `/dates/[month-year]`:** held per brief (no restructure).

**Deliberately out of scope for implementation right now:** removing the 53 template city pages, merging province hierarchies, redirecting `/how-much-is-srd-grant`. These require traffic data and design review first.

---

## 6. Guardrails

- P0 `/search` `noindex, follow` enforced 2026-09-23; P1 province/FAQ work executed 2026-09-24.
- Any future implementation must: (1) do one route at a time, (2) validate in GSC Search Console trend data, (3) keep user journeys working (internal links updated before redirects), and (4) re-run `npm run lint` + `npm run build`.
- The current safe indexation rules (curated-only city pages, freshness-gated updates, sitemap exclusions for redirect/noindex updates) remain valid and verified.
- No `noindex` was added to any page that was previously indexed and healthy; `/province/[slug]` and `/sassa-offices/[province]` remain `index, follow` with individual canonicals.