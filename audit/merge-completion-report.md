# Merge Completion Report — SASSA Help Hub

**Date:** 2026-08-10
**Scope:** All 14 `MERGE` actions from `audit/url-inventory.csv` (7 guide pages + 7 update pages).
**Goal:** Consolidate thin/overlapping pages into a smaller, stronger, fully trustworthy index. No page was deleted — every unique fact was preserved into its canonical target, and all old URLs now serve a permanent 301 to the target.

## Result at a glance

| Metric | Before | After |
|---|---|---|
| Indexable pages (sitemap `<loc>`) | 118 | 104 |
| Guide pages | 38 | 31 |
| Update pages | 31 | 24 |
| Redirect rows in `next.config.js` | legacy set | + 14 (16 merge rows incl. 7+7) |
| Internal links to removed URLs | 35 | 0 |
| `{{template}}` variables leaking to users | 6 guide pages with raw `{{…}}` | 0 |

## Merge rows

| # | Old URL (301 source) | Target URL | Reason | Content preserved into target |
|---|---|---|---|---|
| 1 | `/guides/srd-grant` | `/grants/srd-r370-grant` | Duplicate of pillar | Pillar already covers eligibility, application, WhatsApp, status check; no unique facts lost |
| 2 | `/guides/change-banking-details` | `/guides/bank-details-pending-fix` | Duplicate (same SMS-link flow) | Already in canonical step 2 — "change bank details via SMS link", name-matching requirement |
| 3 | `/guides/biometric-verification-guide` | `/guides/biometric-fix-guide` | Overlap | Already in canonical Fix 1 / Fix 5 (verify SMS, re-enroll) |
| 4 | `/guides/guide-means-test` | `/guides/bulk-means-test` | Thin, duplicated | **Add: "Standard Means Test — Income and Asset Thresholds" step** (full threshold table with 2026 figures) |
| 5 | `/guides/guide-report-fraud` | `/scam-alert` | Duplicate of fraud hub | **Add: "How to Report SASSA Fraud" section** — 0800 60 10 11 hotline, SASSA office visit, SAPS, anonymous reporting, moneylender scenario |
| 6 | `/guides/postbank-black-card` | `/guides/postbank-black-card-guide` | Duplicate | **Add: FAQ "What benefits does the Postbank Black Card give me?"** (honestly hedged — no unverifiable fee table) |
| 7 | `/guides/status-check-no-phone` | `/guides/ussd-codes` | Overlap | **Add: "Other Ways to Check Your Status Without a Smartphone" step** (0800 60 10 11, WhatsApp 082 046 8553, trusted helper, office/mobile unit) + **FAQ "Can I check someone else's status?"** |
| 8 | `/updates/update-2026-005` | `/guides/grant-amounts-history` | Thin (~43 words), duplicate | No unique facts; target already has "Future SASSA Grant Increases" step |
| 9 | `/updates/update-2026-006` | `/grants/child-support-grant` | Thin, one stale figure (R780 top-up total) | **Add: "Child Support Grant Top-Up for Orphaned Children" section** — stale R780 total removed, honest wording ("amount varies by financial year — confirm with SASSA") |
| 10 | `/updates/update-2026-007` | `/sassa-offices` | Duplicate of office directory | No unique facts beyond directory |
| 11 | `/updates/update-2026-008` | `/guides/apply-sassa-grants` | Duplicate (application channels) | Already in canonical (online vs in-person application paths) |
| 12 | `/updates/update-2026-021` | `/sassa-offices` | Duplicate of office directory | No unique facts beyond directory |
| 13 | `/updates/update-2026-025` | `/guides/ussd-codes` | Thin, duplicate of USSD/status guide | Folded into target via merge #7 step + FAQ |
| 14 | `/updates/update-2026-026` | `/payment-calendar` | Thin (~43 words), date-guide duplicate | No unique facts; canonical payment calendar is authoritative |

## Verification

- **Redirects (REDIRECT VERIFIED):** All 16 merge/update 301 rows present in `next.config.js` and confirmed serving against the production build (`next start`, permanent redirect observed for `/guides/srd-grant`, `/guides/postbank-black-card`, `/guides/status-check-no-phone`, `/updates/update-2026-026`, `/updates/update-2026-005`, `/updates/update-2026-009`, `/guides/change-banking-details`). Two legacy chains (`/bank-details`, `/srd-grant-guide`) were repointed directly at `/grants/srd-r370-grant` to avoid double-hop redirects.
- **Sitemap (SITEMAP VERIFIED):** Built `sitemap.xml.body` re-checked — zero occurrences of any merged guide slug or redirected update id; total `<loc>` = 104. `sitemap.ts` `redirectedUpdates` set includes all 16.
- **Internal links (INTERNAL LINKS UPDATED):** 35 old-URL references rewired across 15 source/data files; post-merge grep confirms zero references outside the sitemap exclusion list.
- **JSON integrity:** `guides.json`, `updates.json`, `scamPrevention.json`, `grants/child-support-grant.json` all re-validated post-edit.
- **Build:** `npm run build` passes (compiled successfully) after all merge + template changes.

## Related integrity fixes delivered in this pass

1. **Template-variable leak fixed:** guide pages were rendering raw `{{srd_amount}}`-style tokens. The merge-resolve step substituted every variable in all 31 kept guides from `canonical-facts.json` (0 leftovers).
2. **Canonical facts UI gating:** grant pages now flag facts marked `needs_human_review` with an amber "not independently verified" callout (driven by `getFactMeta`) and display an "Official Sources" card pulled from `data.sources`, so every unverified claim on a grant route is visible disclosure.
3. **Unsupported decline-distribution stats removed:** `update-2026-028` contained unsourced "~15% / ~10% / ~8% / ~5% / ~3% / ~2% of declines" allocations; replaced with hedged, honest descriptions.
4. **Unverified beneficiary-count removed:** Gauteng "over 7 million social grant recipients" softened to "several million".
5. **Unverified 2026 Budget claim removed:** SRD "3.6% increase / no increase confirmed" FAQ answer replaced with honest "confirm current rates" guidance.
6. **Scam-alert page deepened:** now a full fraud-reporting resource (hotline, SASSA offices, SAPS, anonymous channel).

## Files changed

- `public/data/guides.json` (31 kept, templates resolved)
- `public/data/updates.json` (24 kept, 028 declaiming fixed)
- `public/data/grants/child-support-grant.json` (top-up section)
- `src/app/scam-alert/page.tsx` (fraud-reporting section)
- `src/app/grants/[slug]/page.tsx` (verification callout + official sources)
- `src/app/sassa-offices/page.tsx` (beneficiary-count claim)
- `src/app/sitemap.ts` (redirectedUpdates = 16)
- `next.config.js` (16 merge + legacy repoints)

## Recommendation

Merge work is complete and verified locally. A post-deploy crawl (phase 6) should re-confirm the 301s and sitemap on the live domain before any AdSense re-application.