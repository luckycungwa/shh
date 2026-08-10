# Search Console Indexing List — Post-Deploy Verification

**Date:** 2026-08-10
**Prerequisite:** Phase 6 / this list only becomes meaningful AFTER the current merge + fix build is deployed to Vercel. The live sitemap at the time of writing still serves the previous build (128 `<loc>` entries; the merged guides still respond 200 instead of 301).

## 1. Submitted sitemap

- Submit / replace: `https://www.sassahelphub.co.za/sitemap.xml`
- After deploy it should contain **104 `<loc>` entries** (was 128 pre-merge, 118 at last audit). Verify the count in GSC "Sitemaps" immediately after deploy.

## 2. New / changed canonicals to validate (priority 1)

These are the post-merge targets — they absorbed the merged content and should be crawled/re-indexed first:

| Target URL | Absorbed from |
|---|---|
| https://www.sassahelphub.co.za/grants/srd-r370-grant | /guides/srd-grant, /bank-details, /srd-grant-guide |
| https://www.sassahelphub.co.za/guides/bank-details-pending-fix | /guides/change-banking-details |
| https://www.sassahelphub.co.za/guides/biometric-fix-guide | /guides/biometric-verification-guide |
| https://www.sassahelphub.co.za/guides/bulk-means-test | /guides/guide-means-test (+ new threshold step) |
| https://www.sassahelphub.co.za/scam-alert | /guides/guide-report-fraud (+ new report section) |
| https://www.sassahelphub.co.za/guides/postbank-black-card-guide | /guides/postbank-black-card |
| https://www.sassahelphub.co.za/guides/ussd-codes | /guides/status-check-no-phone, /updates/update-2026-025 (+ new step/FAQ) |
| https://www.sassahelphub.co.za/guides/grant-amounts-history | /updates/update-2026-005 |
| https://www.sassahelphub.co.za/grants/child-support-grant | /updates/update-2026-006 (+ top-up section) |
| https://www.sassahelphub.co.za/sassa-offices | /updates/update-2026-007, /updates/update-2026-021 |
| https://www.sassahelphub.co.za/guides/apply-sassa-grants | /updates/update-2026-008 |
| https://www.sassahelphub.co.za/payment-calendar | /updates/update-2026-026 |

## 3. Redirects to confirm in GSC (priority 1)

Use GSC URL Inspection on the OLD URLs — expected result **301 permanent** to the target above:

```
/guides/srd-grant          → /grants/srd-r370-grant
/guides/change-banking-details → /guides/bank-details-pending-fix
/guides/biometric-verification-guide → /guides/biometric-fix-guide
/guides/guide-means-test    → /guides/bulk-means-test
/guides/guide-report-fraud  → /scam-alert
/guides/postbank-black-card → /guides/postbank-black-card-guide
/guides/status-check-no-phone → /guides/ussd-codes
/updates/update-2026-005    → /guides/grant-amounts-history
/updates/update-2026-006    → /grants/child-support-grant
/updates/update-2026-007    → /sassa-offices
/updates/update-2026-008    → /guides/apply-sassa-grants
/updates/update-2026-021    → /sassa-offices
/updates/update-2026-025    → /guides/ussd-codes
/updates/update-2026-026    → /payment-calendar
```
Also re-confirm legacy redirects now landing on final targets (no chains): `/bank-details` and `/srd-grant-guide` → `/grants/srd-r370-grant`.

## 4. URL groups to request re-crawling (priority 2)

- **Grant pillars (9):** `/grants/*` — highest-value pages, re-index after template + callout changes.
- **Guides (32):** `/guides/*` — template-variable leak fixed (raw `{{…}}` no longer on any route).
- **Updates (15):** remaining `/updates/update-2026-*` after 16 redirected out of the index.
- **Status meanings (11) + decline reasons (8):** re-index after claim-hygiene edits.
- **Policy/trust pages:** fact-checking, sources, corrections, editorial, privacy, disclaimer.

## 5. Rooms to watch post-deploy

- **Pages >1 week "Discovered – currently not indexed":** re-inspect; if thin duplicates remain, consider further consolidation.
- **"Crawled – currently not indexed"** on the 301'd old URLs is expected; request re-index only on targets.
- **Search Console errors:** legacy slugs reporting 404 when GSC has stale 200s — expected to clear after recrawl via redirect list.

## 6. Not verifiable from GSC alone (requires Search Console login)

Coverage tab review, enhancement reports, real-user metrics. Access is with the site owner — not runnable from this machine.