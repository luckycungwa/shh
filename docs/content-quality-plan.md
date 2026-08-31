# SASSA Help Hub — Content Quality & SEO Plan

Status: All phases A, B & C complete & build-verified · Domain stays `sassahelphub.co.za` (no rebrand)

## Context & constraints
- **Domain**: keep `sassahelphub.co.za` everywhere (canonicals, sitemap, JSON-LD, `SITE_CONFIG`). No rebrand. Ignore the "SassaGrantGuide" reference — prompt residue from another site.
- **KPI** = useful search intents satisfied better than competitors, NOT page count. 242 excellent interlinked pages > 1000 thin pages.
- **No fabricating data.** If info is unconfirmed, mark it "projected" / "not yet verified."
- Validation via `next build` (must pass).

## Audit findings (verified from code/data)

### Entity graph
SASSA → Grants (SRD/Older Persons/Disability/Children's) → Application → Eligibility → Status (20 meanings, 12 decline reasons) → Payment (calendar / 13 dates, 10 banking) → Appeals (6 steps) → Offices (9 provinces × 65 cities, 102 office records) → Trust (scams, editorial policies)

### Scorecard (~242 pages)
| Vertical | Pages | Cross-link | NextStep | FAQs | Data gov. | Grade |
|---|---|---|---|---|---|---|
| Grants/status/decline | ~40 | Good | moderate | strong | good | A- |
| Guides | 40 | Weak (0 → banking/appeals/payment; 12/40 nextSteps) | weak | strong | good | C+ |
| Banking | 10 | Good related | 0 nextSteps | strong | sources cited | B- |
| Appeals | 6 | Good related | 0 nextSteps | strong | portal tagged | B |
| Payment dates | 13 | Built-in nextSteps | good | good | no source/lastVerified fields | C |
| Offices | 74 | sibling chips | n/a | city FAQs | unverified data risk | C+ |

### Key gaps confirmed
1. Vertical silos — guides have zero links to banking/appeals/payment hubs; grant↔status↔payment↔banking↔appeal progression missing.
2. Guides orphaned — 19 messy categories (filter "Card Services" has no guides); only 12/40 have nextSteps; 0 guides link to banking/appeals.
3. Payment-date governance incomplete — forecast JSON lacks explicit source / sourceURL / lastVerified / notes per record.
4. Stale TODO(recheck) in config.ts for Sep 2026 SRD/fourth-payment dates.
5. Office data — addresses/phones plausible but no verified flag.
6. No site-wide search (only office locator). GA4 exists (consent-gated); do not add more analytics.

## Phase A — Foundation [DONE & build-verified]
1. `src/lib/entities.ts` (entity map) + `src/components/EntityLinks.tsx` contextual cross-linking provider.
2. Every guide/banking/appeal/status page now renders contextual next-steps via `guideNextSteps()` / `nextStepsFor()` (explicit data nextSteps take precedence), falling back to the record's own `related`.
3. Vertical cross-links wired in grants, guides, banking, appeals, status, decline-reason, and dates templates.
4. `payment-schedule-forecast.json` gained per-month `governance { source, sourceURL, lastVerified, notes }`; the `/dates/[month-year]` template renders source + last-verified and keeps the amber "projected" warning. Stale `TODO(recheck)` in config.ts replaced with a current governance note.
5. Guide categories consolidated 19 → 9; `/guides` hub now has real server-side `?cat=` filtering (removed orphan "Card Services" filter).
6. Office records gained `verified` flags (officeCities = true; province main/district offices default false) and the city template renders an inline "not yet independently verified" notice where unconfirmed.
Validation: `next build` + `tsc --noEmit` pass.

## Phase B — UX / Trust [DONE & build-verified]
1. **Site-wide search** — new `/search` page + `SearchBox` client component indexing all guides, statuses, decline reasons, banking, appeals, payment dates, grants and FAQs via `src/lib/search-index.ts` / `src/lib/search.ts`; added to nav (desktop icon + mobile item). Homepage gained a problem-first "What do you need help with?" band.
2. **Homepage entity-hub** — expanded with the problem-first quick-links section across all verticals.
3. **Structured data** — added `paymentScheduleSchema` (Event-based) and wired it into `/dates/[month-year]` and `/payment-calendar`; `articleSchema` already defaults `dateModified` to published with optional override.
Validation: `next build` + `tsc --noEmit` pass; `/search` renders as a static route.

## Phase C — Content [DONE & build-verified]
Filled the top high-demand missing-intent pages as high-quality static pages (JSON-LD article + FAQPage + breadcrumb, NextStepCard, cross-linked into nav/sitemap/homepage/search):
1. `/sassa-contact` — official SASSA contact hub (0800 60 10 11, WhatsApp 082 601 0111, USSD *120*69277#, email, fraud hotline 0800 701 701) with scam warnings.
2. `/how-much-is-srd-grant` — verified R370 amount + R624 income limit + `srd_extension_date`, sourced from `canonical-facts`.
3. `/lost-sassa-card-or-id` — report/block/replace a lost card free, Gold Card → Postbank Black Card migration, ID-theft protection.
4. `/sassa-retail-collection-points` — collection at Shoprite/Checkers/Pick n Pay/Boxer/Usave/Spar, SMS codes, ID rules, safety tips.
All four are in the sitemap `staticPages`, the homepage "Explore by Topic" grid, and the `/search` index. Validation: `next build` + `tsc --noEmit` pass; all render as static routes.

## Phase D — Ongoing (whenever needed)
- Keep payment/schedule governance current in `payment-schedule-forecast.json`; update `lastVerified` as SASSA announces dates.
- Add more missing-intent pages one at a time as demand dictates (e.g. specific grant-vs-grant comparisons, per-province application nuances) — but never bulk-generate thin pages.
- Re-verify with `next build` after every change.
