# Content Clusters — sassahelphub.co.za

**Audit date:** 2026-08-10 · Identifies pages competing for the same search intent, the canonical resource for each cluster, and supporting action.

Every cluster below should resolve to **ONE canonical resource** plus optional supporting news/update pages. Temporary updates must link to the canonical resource, not duplicate its explanation.

---

## Cluster 1 — SRD grant application & eligibility

| Pages | Role |
|---|---|
| `/grants/srd-r370-grant` | **CANONICAL** grant pillar |
| `/guides/srd-grant` | Thin (412 w) duplicate of pillar → **MERGE** into pillar + 301 |
| `/guides/apply-sassa-grants` | Supporting: how to apply any grant (keep, improve sourcing) |
| `/updates/update-2026-029` (SRD vs CSG) | `noindex`, links to pillar → keep as supporting update |
| `/guides/grant-comparison-overview` | Supporting comparison guide (keep) |

**Actions:** Merge `/guides/srd-grant` into `/grants/srd-r370-grant`; fix pillar factual issues (9-million stat, July payment-window contradiction, "monitor all deposits" phrasing); wire `/guides/srd-grant` redirect.

---

## Cluster 2 — SRD decline reasons & appeals (income source detected)

| Pages | Role |
|---|---|
| `/decline-reason/income-source-detected` | **CANONICAL** decline explainer |
| `/guides/income-source-detected-appeal` | Supporting in-depth guide (keep, strip stats) |
| `/guides/stokvel-e-wallet` | Supporting (keep, strip "thousands" claim) |
| `/guides/appeal-guide` | **CANONICAL** for the appeal process |
| `/guides/appeal-timeline` | Supporting (keep) |
| `/updates/update-2026-016` (stokvel) | Keep (supporting news, well sourced) |
| `/updates/update-2026-020` (1.2M declined) | IMPROVE — remove fabricated stat + % table |
| `/updates/update-2026-023` (income source) | `noindex` merge into canonical decline guide |
| `/updates/update-2026-028` (8 decline codes) | Promote to canonical decline-reasons doc (goes with Cluster 1/decline hub); remove "1.2 million" + % table |

**Actions:** Remove all "1.2 million / 700,000 / 1 million per month" decline statistics and the fake `~60%/~15%...` breakdown. Remove `success_rate` claims from `decline-reasons.json`. Keep mechanics, which are valuable.

---

## Cluster 3 — Payment dates / monthly schedule

| Pages | Role |
|---|---|
| `/payment-calendar` | **CANONICAL** (already used as redirect target) |
| `/updates/update-2026-001/013/015/018/022/027` | Already 301 → `/payment-calendar` (REDIRECT, correct) |
| `/guides/fourth-payment-day-guide` | Supporting (keep, re-source the 7-August date or remove the hardcoded date) |
| `/pages/payment-calendar` data (`payments.json`, `paymentDates.json`) | Data source of truth; keep in sync with `CONFIRMED_SCHEDULE` in `src/lib/config.ts` |

**Actions:** Ensure the "Grants Under Review / fourth payment day" is sourced or presented as unverified. Do not create new per-month articles.

---

## Cluster 4 — Postbank card migration (Gold → Black card)

| Pages | Role |
|---|---|
| `/guides/postbank-black-card-guide` | **CANONICAL** (longer, FAQ 4) |
| `/guides/postbank-black-card` | Near-duplicate → **MERGE** into canonical (or keep differentiated, but not both "31 Aug 2026" guides) |
| `/updates/update-2026-033` | Supporting update (keep; add cite for the deadline) |
| `/grants/old-age-pension` | References card collection — must note Gold Card phase-out |

**Actions:** Merge the two card guides; add a dated Postbank/DSD source for the 31 Aug 2026 deadline or label the deadline as "reported / check Postbank"; remove the unsourced "2.9 million / 600,000" figures.

---

## Cluster 5 — Status checks (USSD, WhatsApp, Moya, without internet)

| Pages | Role |
|---|---|
| `/guides/ussd-codes` | **CANONICAL** for USSD/status-without-internet |
| `/guides/status-check-no-phone` | Near-duplicate of `ussd-codes` → **MERGE** |
| `/guides/sassa-whatsapp` | Supporting (keep) |
| `/guides/moya-app-sassa` | Supporting (keep, but remove "officially partnered … only Moya" absolute claims) |
| `/updates/update-2026-003` | Keep (how-to); reconcile USSD `*120*3227#` vs `*120*69277#` |
| `/updates/update-2026-025` | MERGE content into `ussd-codes` |

**Actions:** Unify USSD codes to one authoritative value (or label both "reported"); remove the "ONLY official WhatsApp number" and Moya "officially partnered" absolutes.

---

## Cluster 6 — eLife / biometric / life certification 2026 review

| Pages | Role |
|---|---|
| `/guides/biometric-fix-guide` | **CANONICAL** biometric troubleshooting |
| `/guides/biometric-verification-guide` | Thin (86 w) → **MERGE** into biometric-fix-guide |
| `/guides/life-certification` | Supporting (keep) |
| `/guides/elife-certification-troubleshooting` | Supporting (keep; remove 88% / 7,779 complaints stats) |
| `/updates/update-2026-019` | Supporting; source the "launch" claim or soften |
| `/updates/update-2026-002` | Supporting; soften "mandatory for all beneficiaries from Jan 2026" |

**Actions:** Remove the fabricated precision statistics (90% failures due to lighting, 88% success, 7,779 complaints, "system does NOT store your photo", POPIA compliance claim). Keep the practical troubleshooting steps.

---

## Cluster 7 — Grant reviews / verification / integrity rollout (Aug 2026)

| Pages | Role |
|---|---|
| `/guides/grant-verification-process` | **CANONICAL** (longest, most complete) |
| `/guides/sassa-update-information` | Supporting (keep; remove "invented sample SMS") |
| `/guides/sassa-grant-renewal` | Supporting (keep; strip "1.2 million in February" stat) |
| `/guides/bulk-means-test` | Supporting (keep; source the "May 2025 SASSA statement") |
| `/guides/alternative-id-grants` | Supporting (keep; source "May 2025" claim) |
| `/guides/fourth-payment-day-guide` | Supporting (see Cluster 3) |
| `/updates/update-2026-034` | Supporting update; needs a cited SASSA date release |
| `/updates/update-2026-010` | IMPROVE — remove "over 70,000 suspended" unsourced stat |
| `/updates/update-2026-030` | **REMOVE** (fabricated R40m overhaul / wrong minister) |
| `/updates/update-2026-032` | **REMOVE** (unverifiable event, cites fabricated 030) |

**Actions:** Delete/rewrite `030`/`032`; give every "review" claim an official source or label it as guidance.

---

## Cluster 8 — Means test / thresholds (canonical facts)

| Pages | Role |
|---|---|
| `/guides/bulk-means-test` | **CANONICAL** (in-depth) |
| `/guides/guide-means-test` | Thin (298 w) → MERGE content into bulk-means-test (or remove) |
| `public/data/canonical-facts.json` | Source of truth for all amounts/thresholds |

**Actions:** Verify every "User confirmed" fact against a named primary source or remove. Only `srd_grant_amount`, `srd_age_range_*`, `srd_income_limit`, `srd_extension_date`, and the 7 DSD-sourced amounts have real provenance.

---

## Cluster 9 — Grant amounts history & comparison

| Pages | Role |
|---|---|
| `/guides/grant-amounts-history` | **CANONICAL** |
| `/guides/grant-comparison-overview` | Supporting (keep) |
| `/updates/update-2026-014` (Budget) | IMPROVE — fix Foster amount to R1,295, cite Treasury |
| `/updates/update-2026-005` (increases) | MERGE into history guide; remove false "two increases a year" claim |
| `/glossary` | Reference; add dates to amount definitions |

---

## Cluster 10 — Banking details & payment methods

| Pages | Role |
|---|---|
| `/guides/bank-details-pending-fix` | **CANONICAL** for banking-details fixes |
| `/guides/change-banking-details` | Thin (127 w) → **MERGE** into bank-details-pending-fix |
| `/guides/sassa-payment-methods` | Supporting (keep) |
| `/guides/best-bank-accounts-sassa-2026` | Supporting (keep; source bank fee claims) |
| `/guides/sassa-deductions-explained` | Supporting (keep; source 33.3% cap, lenders) |
| `/guides/missing-grant-payment-guide` | Supporting (keep; source 2-3 day waits) |

---

## Cluster 11 — Scams & fraud

| Pages | Role |
|---|---|
| `/scam-alert` | **CANONICAL** |
| `/guides/sassa-online-security` | Supporting (keep; remove "90% of scams" stat) |
| `/guides/guide-report-fraud` | Thin (169 w) → **MERGE** into scam-alert or online-security |
| `/resources` | Office/scam resource page; fix schema, verify data |

---

## Cluster 12 — SASSA offices (province directory)

| Pages | Role |
|---|---|
| `/sassa-offices` | **CANONICAL** directory |
| `/province/*` (9) | **IMPROVE** — template-thin (~60-90 unique words), office data unverified/contradictory, unsourced population figures. Improve or NOINDEX. |
| `/updates/update-2026-021` | MERGE content into /sassa-offices; remove province beneficiary-count stats |
| `/updates/update-2026-007` (mobile units) | MERGE into /sassa-offices; drop month-specific claims |

---

## Cluster 13 — Status meanings (status/[slug])

| Pages | Role |
|---|---|
| `/status` | **CANONICAL** hub |
| `/status/*` (10 pages) | Keep. Thin (~330-400 w) but answer real questions; improve with dated info |
| `/decline-reason/*` (8) | Keep. Strip fabricated stats/success rates; pair each with appeal guidance |

---

## Cluster 14 — Child / family grants

| Pages | Role |
|---|---|
| `/grants/child-support-grant` | **CANONICAL** CSG pillar |
| `/guides/guide-001` | Supporting how-to (keep) |
| `/grants/foster-child-grant` | **IMPROVE** — fix R1,290 vs R1,295 amount conflict site-wide (canonical fact = R1,295) |
| `/grants/care-dependency-grant` | **IMPROVE** — reconcile processing days, payment day, CDG amount R2,400 vs disability par |
| `/updates/update-2026-006` (CSG top-up) | MERGE into CSG pillar; fix stale R530/R250/R780 amounts |

---

## Cluster 15 — Trust / editorial / utility pages

| Pages | Role |
|---|---|
| `/about` `/authors` `/editorial-policy` `/fact-checking-policy` `/sources-policy` `/corrections-policy` `/contact` `/privacy-policy` `/disclaimer` `/terms-of-service` | Trust pages. Not SEO traffic pages — keep out of the sitemap as traffic boosters (they are already linked from the footer). Fix all fabricated "team" and credential claims before reapplying to AdSense. |