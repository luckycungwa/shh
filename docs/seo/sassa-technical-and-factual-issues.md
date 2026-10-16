# SASSA Help Hub — Technical & Factual Issues (Phase 1 / Phase 6 intake)

Research date: **2026-10-16** · Status: **read-only audit** (no fixes applied)
Scope note: Phase 1 findings verified in the repo/live site. The full Phase 6 freshness sweep runs
after queries are supplied; this file is the live worklist and is updated cumulatively.

Severity key: **P0** = trust/legal/factual risk · **P1** = SEO/UX risk · **P2** = polish.

---

## A. Factual / consistency risks

| ID | Severity | Issue | Evidence | Recommended action | Verify by |
|---|---|---|---|---|---|
| FACT-01 | P1 | **Dead stale date files** in repo: `public/data/paymentDates.json` hardcodes **September 2026** dates; `public/data/payments.json` holds pre-Apr amounts (R2315/R560). Neither is referenced in `src/`, but they can be re-wired by mistake. | grep of `src/` shows no consumer | Remove, or move to an `archive/` folder with a header comment stating "not consumed; kept for history". | `npm run validate:content` + grep confirm zero consumers |
| FACT-02 | P1 | **`/dates/*` spans past + far-future months** (`september-2026` … `january-2027`). Past months and projected months must be visually and textually distinguished as *confirmed vs projected*; must never present a projection as a confirmed date. | `payment-schedule-forecast.json` (5 months); `/dates/[month-year]/page.tsx` | Confirm each month carries a governance/confirmed flag; render "projected" labelling for future months; ensure past months are dated/historical, not "upcoming". | Manual review of each `/dates` page + `governance` fields in the JSON |
| FACT-03 | P1 | **Review-cluster timeline** — historically the site stated a "2-month suspension rule"; the official position (Sept 2026 NW4444) is staged **30 + 60 = 90 days**, then suspension, then **30-day restoration window**, then lapse after one month's notice. | Cross-checked 16 Oct 2026 across guide + statuses + update (see `docs/EDITORIAL_REGISTER.md` log) | Already corrected 16 Oct 2026 — keep the staged timeline in sync across `grant-verification-process`, `status/under-review`, `status/suspended`, `update-2026-sassa-grant-controls`. | Re-read all four; confirm identical staged figures + sources |
| FACT-04 | P2 | **`Organization` JSON-LD is thin** — no `logo`, `sameAs`, `contactPoint`, `foundingDate`. Weak entity signal (also a GEO/AI-citation loss). | `src/app/layout.tsx` L95–103 | Add `logo`, `url`, `contactPoint` (SASSA helpline), and any owned `sameAs` profiles. | Re-render page; validate JSON-LD |
| FACT-05 | P2 | **`llms.txt` is static/manually curated** and can drift from live facts. | `public/llms.txt` | Generate from `canonical-facts.json` + active routes at build, or add a maintainer note + review cadence. | Compare `llms.txt` key facts against `canonical-facts.json` |

## B. Technical / SEO infrastructure issues

| ID | Severity | Issue | Evidence | Recommended action | Verify by |
|---|---|---|---|---|---|
| TECH-01 | ✅ Resolved (2026-10-16) | **Legacy numeric guide URL** `guide-001` ("How to Apply for the SASSA Child Support Grant in 2026"). Non-descriptive slug + possible intent overlap with `/grants/child-support-grant` and `/guides/apply-sassa-grants`. | `guides.json`; live sitemap `/guides/guide-001` | **Fixed:** `id` → `apply-child-support-grant`; 301 added (`/guides/guide-001` → `/guides/apply-child-support-grant` in `next.config.js`); internal links updated (`entities.ts`, `common-problems`, `updates.json`, guides relatedLink). Cannibalisation to be assessed in Phase 3. | Done — verify 301 post-deploy; old URL drops from sitemap |
| TECH-02 | P1 | **`/dates/september-2026` is a past-month page still sitemapped.** | live sitemap | Confirm it reads as historical; consider dropping past months from the sitemap or keeping only a rolling window. | Sitemap review |
| TECH-03 | P2 | **Mojibake in source strings** — `—` appears as `�?"` (e.g. `src/app/search/page.tsx`). Page is `noindex`, so low impact. | `src/app/search/page.tsx` L16, L21 | Fix encoding (write UTF-8) when editing that file. | Visual check |
| TECH-04 | P2 | **`i18n/*.json` present but unused** — no locale routes, no `hreflang`. Implies an unfinished multilingual plan. | `public/data/i18n/{en,xh,zu}.json`; no locale routing in `src/` | Decide: either wire up (`/af`, `/zu`, `/xh` + `hreflang`) as a deliberate project, or document as parked. Do not half-implement. | Routing + `hreflang` present or docs updated |
| TECH-05 | P2 | **Duplicate payment-data files** count as a maintenance hazard (`paymentDates.json`, `payments.json`, `payment-schedule-history.json`, `payment-schedule-forecast.json`, plus `canonical-facts.json`). One is authoritative; the rest are dead. | `public/data/*` | Document the single source of truth (`payment-schedule-forecast.json` + `canonical-facts.json`) in `CONTENT_GUIDELINES.md`; archive the rest. | Docs updated; zero stray consumers |
| TECH-06 | P2 | **Scam data split across three files** (`scams.json`, `newScams.json`, `scamPrevention.json`) consumed by two different pages. | `src/app/scam-alert/page.tsx`, `src/app/tools/scam-message-checker/page.tsx` | Consider consolidating or document the split so scams are not reported in one place but missing from the other. | Cross-check both pages list the same current scams |

## C. Trust / E-E-A-T (existing strengths to preserve)
- Four policy pages present: `editorial-policy`, `fact-checking-policy`, `sources-policy`, `corrections-policy`.
- `canonical-facts.json` single-source design for grants/amounts/tools.
- `ffc/editorial-register` + publication log maintained (see `docs/EDITORIAL_REGISTER.md`).
- No indexable thin duplicates for office cities (curation gate) or superseded updates (redirect gate).

## D. Open questions (require live/owner confirmation)
1. Is `/dates` projection vs confirmation explicitly labelled on every month?
2. ~~Is `guide-001` intentionally separate from `child-support-grant`?~~ **Answered (2026-10-16):** owner approved re-slug; it is a distinct apply-steps page → now `/guides/apply-child-support-grant` with a 301.
3. Are the three scam files producing consistent current-scam lists on both pages?
4. Was multilingual (`i18n/*`) abandoned, or is it planned? (Do not build until decided.)
5. Post-deploy: does the live sitemap reflect the 16 Oct 2026 `lastmod` changes?
