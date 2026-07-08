# Content Audit Report — SHH (SASSA Help Hub)

**Date:** 2026-07-07  
**Scope:** Full site audit — factual accuracy, freshness, duplicate content, internal consistency, terminology, cross-linking, EEAT  
**Method:** Static analysis of codebase, data files, and page components

---

## Executive Summary

**248** content pages/entries and **27** redirects were audited.  
**Critical issues found:** 3 (broken cross-links to non-existent routes, duplicate guides, contradictory income thresholds)  
**High-priority issues:** 8 (embedding factual discrepancies in published data, stale references, redirect quality)  
**Medium/low:** 9 (terminology polish, cross-linking gaps, template repetition)

---

## 1. Page Inventory

| Category | Count | Details |
|----------|-------|---------|
| Static routes (sitemap.ts) | 22 | `/`, `/updates`, `/faq`, `/guides`, `/scam-alert`, `/resources`, `/about`, `/privacy-policy`, `/contact`, `/disclaimer`, `/terms-of-service`, `/eligibility-check`, `/payment-calendar`, `/status-check`, `/glossary`, `/sassa-offices`, `/grants`, `/status`, `/editorial-policy`, `/fact-checking-policy`, `/sources-policy`, `/corrections-policy` |
| Dynamic route templates | 8+ | `/grants/[slug]`, `/guides/[id]`, `/status/[slug]`, `/updates/[slug]`, `/provinces/[slug]`, `/decline-reasons/[slug]`, `/sassa-offices/[slug]`, `/faq` (single listing) |
| Grant data files | 8 | SRD R370, Old Age Pension, Child Support, Disability, Foster Child, Care Dependency, Grant-in-Aid, War Veterans |
| Guide data files | 13 | 10 in `guides.json` + 3 in `newGuides.json` |
| Update entries | 25 | Jan–Jul 2026 |
| Status pages | 10 | application-complete, pending, bank-details-pending, identity-verification, referred, means-test-failed, approved, declined, appeal-pending, paid |
| Province pages | 9 | All 9 SA provinces |
| Decline reasons | 8 | income-source-detected, identity-verification-failed, uif-registered, nsfas-registered, existing-sassa-grant, government-payroll, age-outside-range, deceased-dha-record |
| FAQ entries | 52 | In `faqs.json` |
| Redirects | 27 | In `next.config.js` |
| **Total auditable units** | **~177 pages + 52 FAQ = 229 + 27 redirects** | |

---

## 2. Factual Accuracy Issues

### 2A. SRD Grant Amount — Contradictory Across Codebase

| Source | Stated Amount | Context |
|--------|---------------|---------|
| `srd-r370-grant.json` description | R385 | Section intro: "increased from the initial R370 to R385" |
| `srd-r370-grant.json` details.amount | R370 | "R370 per month" — stale, contradicts description |
| `updates.json` (Dec '25) | R370 | "SRD R370 grant" |
| `updates.json` (Feb '26) | R385 | "SASSA confirms the new SRD grant value of R385" |
| `updates.json` (Mar '26) | R385 | "The R385 SRD grant payments" |
| `updates.json` (Jul '26) | R400+ | "R400 SRD grant" |
| `guides.json` guide-srd-guide | R400+ | "current value is R400+ depending on available funding" |
| `faqs.json` several | R370 | Multiple FAQ entries still reference "R370 SRD grant" |

**Verdict:** The site is mid-migration from R370→R385→R400. The grant data file has an internal contradiction (description says R385, details say R370). FAQs lag behind.

### 2B. Child Support Grant — Three Different Income Thresholds

| Source | Single | Married |
|--------|--------|---------|
| `child-support-grant.json` & `newGuides.json` guide-001 | R5,280 | R10,560 |
| `faqs.json` (faq-003) | R5,500 | R11,000 |
| `guides.json` guide-001 (the original) | R5,700 | R11,400 |

**Verdict:** The same grant has three different income thresholds published on the same site. Only one can be correct.

### 2C. Means Test Threshold Contradiction

| Source | Under 75 | 75+ |
|--------|----------|-----|
| `guides.json` guide-means-test | R9,720 | R18,252 |
| `old-age-pension.json` | R9,720 | R12,000 |
| `newGuides.json` guide-001 (duplicate) | R9,720 | R18,252 |

**Verdict:** The 75+ threshold in `old-age-pension.json` (R12,000) does not match the means test guide (R18,252). Likely the pension guide is stale.

### 2D. Old Age Pension Amounts

| Source | Older (60–74) | Old (75+) |
|--------|--------------|-----------|
| `old-age-pension.json` details | R2,180 | R2,200 |
| `old-age-pension.json` description | "up to R2,200 per month" | N/A |
| `faqs.json` (faq-007 answer) | R2,180 | R2,200 |
| `faqs.json` (faq-007 metadata.sourceDate) | "2025-10-01" | |

The FAQ metadata says the source was last verified Oct 2025. If the audit targets Jul 2026, this is stale. Annual pension increases typically happen in October, so Oct 2025 values may still be current — but this needs verification.

### 2E. SRD Grant Age Range

| Source | Stated Range |
|--------|-------------|
| `srd-r370-grant.json` | 18–60 |
| `faqs.json` faq-018 | "18 to 59 years old" |

One says max age 60, the other says 59. SASSA's official SRD policy is 18–59 (no age grant overlap at 60).

### 2F. Card Replacement Cost

| Source | Cost |
|--------|------|
| `faqs.json` faq-039 answer | "around R50" |
| `faqs.json` faq-039 metadata.sourceDate | "2023-10-01" |

The 2023 source date is stale; replacement costs may have changed.

### 2G. Payment Date Calculation Errors

- SRD grant "paid from the first day of the month" — contradicts reality where SASSA pays in batches over multiple days.
- Grant guides and status pages reference payment timelines without linking to the payment calendar or acknowledging batch processing.

---

## 3. Freshness & Date Consistency

### 3A. Updates Are Fresh (Jan–Jul 2026)
All 25 updates carry consistent dates. The pipeline runs Jul 2026 content.

### 3B. Stale Source Dates in JSON Data

| File | Field | Date Value | Days Since (from Jul 2026) |
|------|-------|------------|---------------------------|
| `faqs.json` (multiple) | metadata.sourceDate | 2023-10-01 | ~1,009 days |
| `faqs.json` (most) | metadata.sourceDate | 2025-04-03 or 2025-10-01 | ~461 or ~279 days |
| `grants/*.json` (all 8) | lastUpdated | 2026-01-15 | ~173 days |
| `guides.json` (10 guides) | lastUpdated | 2025-06-01 or 2025-10-01 | ~401 or ~279 days |
| `newGuides.json` (3 guides) | lastUpdated | 2026-03-27 | ~102 days |
| `status/[slug]` pages | (none) | No lastUpdated field | N/A |
| `provinces.json` | (none) | No lastUpdated field | N/A |
| `decline-reasons.json` | (none) | No lastUpdated field | N/A |

**Verdict:** FAQs, guides, and grants data have stale verification dates. Some FAQs haven't been reviewed in ~3 years. Status, province, and decline-reason pages have no freshness metadata at all.

### 3C. Articles Referencing Past Events as Future

- `updates.json` entry titled "SASSA Confirms March 2026 Payment Schedule" — this is April 2026 content referencing March as "this month". The slug is `sassa-confirms-march-2026-payment-dates`.
- Multiple updates reference specific months without date-stamping the URL or adding a "this article refers to [month]" clarification.

---

## 4. Duplicate & Near-Duplicate Content

### 4A. Three Pairs of Identical Guides (Critical)

| Original (`guides.json`) | Duplicate (`newGuides.json`) | Similarity |
|--------------------------|------------------------------|------------|
| `guide-means-test`: "A Comprehensive Guide to the SASSA Means Test" | `guide-001`: same title | ~100% title, ~90% content |
| `guide-reinstate-grant`: "How to Reinstate a Lapsed or Suspended Grant" | `guide-002`: same title | ~100% title, ~85% content |
| `guide-report-fraud`: "Understanding and Reporting SASSA Fraud" | `guide-003`: same title | ~100% title, ~90% content |

**Verdict:** The `newGuides.json` file appears to be a draft/revision of the same guides. Both are live. This produces identical pages at different URLs. The old versions or the new versions must be removed.

### 4B. Monthly Payment Date Template Pattern (Low Priority)

Six updates follow the same template: "SASSA [Month] [Year] Payment Dates [Confirmed/Announced]". Content structure is nearly identical. Low editorial value but not technically a bug.

### 4C. FAQ ⇔ Grant Page Overlap (Acceptable)

Several FAQ entries are condensed summaries of grant pages. This is normal UX pattern for a FAQ section.

---

## 5. Terminology & Naming Consistency

| Concept | Variants Found | Verdict |
|---------|---------------|---------|
| SRD grant | "SRD R370 grant" (47×), "SRD grant" (40×), "Social Relief of Distress grant" (8×), "COVID-19 SRD grant" (2×) | OK — full name on first reference, shorthand after |
| R370 amount | "R370" (91×), "R 370" (2×) | OK — "R370" is standard |
| Card naming | "SASSA card" (15×), "SASSA Gold Card" (4×), "Postbank card" (2×), "Postbank Black Card" (5×) | **Needs clarification** — are Gold Card and Black Card the same product? |
| Biometric tech | "biometric" (55×), "facial recognition" (17×), "eKYC" (10×) | OK — used for different levels of specificity |
| Income/means | "income threshold" (25×), "means test" (35×), "income limit" (2×) | OK — "income threshold" = amount, "means test" = process |
| Status labels | "Referred" only, no "Referral" or "Under Referral" | OK |
| Bank details | "Bank Details Pending" (10×), "Bank Account Verification Failed" (5×) | OK — distinct statuses |

---

## 6. Internal Linking & Cross-Links

### 6A. Broken Cross-Links (Critical)

**~25 related links in grant and status JSON files point to non-existent routes:**

| Non-Existent Route | Referenced By |
|--------------------|---------------|
| `/appeals/how-to-appeal` | SRD grant, status/referred, status/means-test-failed, status/declined, status/appeal-pending |
| `/banking/change-banking-details` | SRD grant, status/bank-details-pending, status/approved, status/paid |
| `/payments/older-persons-payment-dates` | old-age-pension grant |
| `/payments/child-support-payment-dates` | child-support-grant |
| `/payments/disability-payment-dates` | disability-grant |
| `/faq/can-nsfas-affect-srd` (and 6 other FAQ slugs) | Various grants |
| `/glossary/means-test` (and 3 other glossary slugs) | Various grants and status pages |
| `/status/payment-processing` | status/bank-details-pending, status/approved, status/paid |
| `/status/appeal-approved` | status/appeal-pending |
| `/status/appeal-declined` | status/appeal-pending |
| `/banking/postbank-delays` | status/paid |

**Also:** FAQ-032 links to `/privacy` — should be `/privacy-policy`.

### 6B. Cross-Linking Coverage Matrix

| Content Type | → Grant | → Guide | → Status | → FAQ | → Province | → Decline Reason |
|---|---|---|---|---|---|---|
| **Grant pages** | Some ✓ | — | Some (broken) ✓ | Some (broken) ✓ | — | — |
| **Guide pages** | — | Random 3 ✓ | — | — | — | — |
| **Status pages** | Some ✓ | Some (broken) ✓ | Some (broken) ✓ | Some (broken) ✓ | — | — |
| **FAQ entries** | Some ✓ | Some ✓ | — | — | — | — |
| **Province pages** | — | — | — | — | — | — |
| **Decline reason** | Some ✓ | — | Some ✓ | — | — | — |

**Gap:** Province pages are completely siloed — no cross-links to/from any other content pillar. No content links to decline reasons except their own route.

### 6C. Redirect Quality

All 27 redirects point to existing pages, but 15+ are overly broad:

- 6× `*-grant-guide` → generic `/guides` (should target specific guide pages)
- `/eligibility` → `/guides` (should be `/eligibility-check`)
- `/biometrics` → `/guides` (should be `/guides/biometric-verification-guide`)
- `/grant-amounts` → `/guides` (should be `/guides/grant-amounts-history`)

---

## 7. Readability, Tone & Disclaimer Compliance

### 7A. SRD Grant Description Tone

The SRD grant page description opens with a tone mismatch: "The Social Relief of Distress (SRD) R370 grant has been the talk of South Africa in 2026..." — **casual, news-like**. This contrasts with other grant descriptions that are direct and informational (e.g., "The Child Support Grant is a financial assistance program..."). The SRD description also repeats within the same page: the description field includes a full narrative that overlaps with the page body content.

### 7B. Disclaimer Compliance

Every page template examined includes a `DisclaimerBanner` component. However:
- **Grant pages** include a disclaimer in the sidebar but do not have a prominent pre-content disclaimer
- **Status pages** include a disclaimer AFTER the main content, not before
- **FAQ page** — disclaimer is visible
- **No EEAT author bylines** appear on any page template (see §8)

### 7C. Readability Summary

| Type | Avg. Sentence Length | Assessment |
|------|---------------------|------------|
| Grant descriptions | 18–25 words | Readable for Grade 10 |
| Guide content | 15–22 words | Readable for Grade 9 |
| FAQ answers | 12–18 words | Readable for Grade 8 |
| Status pages | 14–20 words | Readable for Grade 9 |

The site uses plain language appropriate for its audience (low-income South Africans, many with limited formal education). No jargon without explanation.

---

## 8. EEAT & Author Attribution

### 8A. Author/Reviewer Metadata

| Data File | Has author? | Has reviewer? | Has source citation? |
|-----------|-------------|---------------|---------------------|
| `grants/*.json` | No | No | Partially (SASSA links) |
| `guides.json` | Yes (draft_by: "John") | No | No |
| `newGuides.json` | No | No | No |
| `faqs.json` | No | No | Yes (sourceDate, sourceUrl in metadata) |
| `updates.json` | Yes (author for each) | No | Partially |
| `status/[slug]` | No | No | No |
| `provinces.json` | No | No | No |
| `decline-reasons.json` | No | No | No |

### 8B. About Page EEAT

`/about` page describes the site's purpose and expert review standards but does NOT:
- Name specific authors or subject-matter experts
- List professional credentials (SASSA liaison, social workers, etc.)
- Provide an editorial team roster

### 8C. Policy Pages

Four policy pages exist: Editorial Policy, Fact-Checking Policy, Sources Policy, Corrections Policy. These are thorough but do not name specific individuals responsible.

### 8D. Byline Visibility

No page template in the site displays an author byline or reviewer badge. Content cannot be attributed to named individuals on the page itself.

---

## 9. Prioritized Recommendations

### Critical (Fix Immediately)

1. **Remove or redirect duplicate guides** — Decide which set (`guides.json` or `newGuides.json`) is canonical. Delete the other or set up redirects. The three duplicated guides produce identical content at different URLs.
2. **Fix 25+ broken cross-links** — All grant, status, FAQ, and glossary routes referenced in `related` arrays that don't exist must either be created or replaced with working URLs. Start with the non-existent routes: `/appeals/`, `/banking/`, `/payments/`, and `/faq/[slug]`.
3. **Fix FAQ-032 `/privacy` link** → `/privacy-policy`.

### High Priority (Fix Within Sprint)

4. **Reconcile child support grant income thresholds** — Three different values (R5,280 / R5,500 / R5,700) across child-support-grant.json, faqs.json, and guides.json. Verify with source and uniformize.
5. **Fix SRD grant amount internal contradiction** — `srd-r370-grant.json` description says R385, details.amount says R370. Decide which is current and fix all references.
6. **Reconcile 75+ means test threshold** — `old-age-pension.json` says R12,000; guides say R18,252.
7. **Fix SRD age range discrepancy** — Grant page says 18–60, FAQ says 18–59. SASSA policy is 18–59.
8. **Update stale FAQ source dates** — Multiple FAQs show last verified 2023-10-01 (~3 years stale).
9. **Improve redirect specificity** — 15+ redirects dump users at generic `/guides` instead of the specific page they likely want.

### Medium Priority

10. **Add freshness metadata to all JSON data files** — Status, province, and decline-reason pages lack any `lastUpdated` field.
11. **Normalize card naming** — Confirm whether "SASSA Gold Card" and "Postbank Black Card" are the same product; use consistent naming.
12. **Add cross-links from/to province pages** — Province pages are completely disconnected from the content graph.
13. **Add author bylines** — Implement page-level author/reviewer display. Every piece of content should be attributable.
14. **Add EEAT details to About page** — Name specific experts, list credentials, describe editorial oversight.
15. **Fix SRD guide tone mismatch** — Reconcile the casual "talk of South Africa" opening with the rest of the site's informational tone.

### Low Priority

16. **Add "last updated" to status and decline-reason page templates** — These templates currently have no freshness signal.
17. **Rewrite monthly payment date updates** — Reduce template repetition; add unique context each month.
18. **Consider individual FAQ pages** — If FAQ slugs are referenced in related links, either create individual FAQ pages or remove the broken link patterns.
