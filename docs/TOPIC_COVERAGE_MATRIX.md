# SASSA Help Hub — Topic Coverage Matrix & Validated Editorial Backlog

**Owner:** Lucky Cungwa · **Created:** 16 October 2026 · **Last reviewed:** 22 October 2026
**Method:** Coverage mapped against the live site inventory (8 grant pages, 42 guides, 35 updates)
and cross-checked against official SASSA / DSD / National Treasury publications.
**Companion documents:** `docs/EDITORIAL_REGISTER.md` (register + publication log),
`docs/TOPIC_GAP_AUDIT.md` (2026-09-18 crawl), `scripts/validate-content.mjs` (automated checks).

> **Research limitation (stated honestly):** External research for this run was limited to the
> sources already cited in the repository plus a live web check of `sassa.gov.za/newsroom/media-statements`
> on 16 October 2026. Where a gap could not be confirmed against an official source it is marked
> **unverified** and is *not* scheduled for production. No dates, amounts or statistics are invented.

---

## 1. Coverage matrix

Legend — **Status:** ✅ well covered · 🟡 partially covered · 🔴 gap.
**Priority:** P1 = do next · P2 = next · P3 = backlog.

| Topic / area | Existing coverage (by page) | Status | Gap / next action | Priority |
|---|---|---|---|---|
| SRD R370 (amount, eligibility, dates, appeals) | `grants/srd-r370-grant`, guides `micro-business-srd`, `appeal-guide`, `income-source-detected-appeal`, `srd-reapplication`, updates `-028` decline codes, `-038` | ✅ | October SRD confirmed as 22–23 Oct (22 Oct). Keep the November SRD date TBA until announced. | — |
| Older Persons Grant | `grants/old-age-pension`, guides `grant-amounts-history`, `life-certification` | ✅ | Refreshed Sept→Oct/Nov dates (16 Oct). | — |
| Disability Grant | `grants/disability-grant` | ✅ | Current-month date block added (paid 5 Oct; next 2 Nov). | — |
| Child Support Grant | `grants/child-support-grant`, `apply-child-support-grant` | ✅ | Current-month date block added (paid 6 Oct; next 3 Nov). | — |
| Foster Child Grant | `grants/foster-child-grant`, update `-foster-child-1300` (13 Oct) | ✅ | R1,300 from Oct 2026 verified (Gazette 54397); current-month date block added (paid 6 Oct; next 3 Nov). | — |
| Care Dependency Grant | `grants/care-dependency-grant` | ✅ | Date block added and corrected to the children's payment day (paid 6 Oct; next 3 Nov) — the page previously said it was paid with the Disability Grant. Means-test copy still to confirm vs leaflet. | P3 |
| Grant-in-Aid | `grants/grant-in-aid` | 🟡 | Verify top-up amount cross-references canonical fact `grant_in_aid_amount`. | P3 |
| War Veterans Grant | `grants/war-veterans-grant` | ✅ | Date block added — paid with the Older Persons Grant (paid 2 Oct; next 30 Oct). | — |
| Grant reviews / verification | guides `grant-verification-process`, `fourth-payment-day-guide` (refreshed 16 Oct), `sassa-update-information`, `bulk-means-test` | ✅ | Covered well. | — |
| Beneficiary Biometric Enrolment & the review-response timeline (30 + 60 = 90 days to respond; 30 days to apply for restoration; lapse after one month's notice) | guides `biometric-fix-guide`, `grant-verification-process`; statuses `under-review`, `suspended`; update `-sassa-grant-controls` (9 Oct) | ✅ | Published 16 Oct: staged timeline + official sources in one place (guide, both statuses, update); Beneficiary Biometric Enrolment explained in `biometric-fix-guide`. Sources: PMG NW4444/NW4094/NW1941/NW4450; SASSA Grant Booklet 2026. | — |
| Eligibility & means test (income/asset thresholds) | guides `micro-business-srd`, `bulk-means-test`, `alternative-id-grants`; canonical facts (means-test leaflet 01 Apr 2026) | ✅ | Thresholds centralised in `canonical-facts.json`. | — |
| Applications (online & in person) | guides `apply-sassa-grants`, `apply-child-support-grant`, `document-checklist`, `official-sassa-portal-guide` | ✅ | — | — |
| Banking & payments | guides `sassa-payment-methods`, `missing-grant-payment-guide`, `bank-details-pending-fix`, `how-to-open-bank-account-sassa-payments`, `best-bank-accounts-sassa-2026` | ✅ | Update `-payment-method-changes` (7 Oct) covers frequent-change warning. | — |
| Postbank Black Card / Gold Card phase-out | guide `postbank-black-card-guide`, update `-033` | ✅ | Gold Card dead 31 Aug 2026 (canonical fact). | — |
| Appeals & reconsideration | guides `appeal-guide`, `appeal-timeline`, `income-source-detected-appeal`; canonical facts (90-day window) | ✅ | — | — |
| Reinstatement / lapsed grants | guide `guide-reinstate-grant` | ✅ | — | — |
| Fraud & scams | guide `sassa-online-security`, update `-035` (EC officials dismissed) | 🟡 | Add scam-specific alert if a new official warning is issued. | P3 |
| Payment dates & calendar | `/payment-calendar`, `/dates/[month]`, forecast JSON | ✅ | October fully confirmed (SRD 22–23 Oct); November permanent dates 30 Oct, 2, 3, 5 Nov. Governed and validated by `scripts/validate-content.mjs`. | — |
| Deadlines (SRD extension, appeal windows) | canonical facts `srd_extension_date`, `appeal_lodgement_window_days` | ✅ | — | — |
| Policy changes (SRD→BIS, SCA case) | updates `-014`, `-srd-court-sca`; canonical fact `srd_sca_status` | ✅ | Re-checked 16 Oct 2026 — SCA judgment still reserved; no change needed. Re-check after any ruling. | P3 |
| USSD / WhatsApp / Moya / eLife tools | guides `ussd-codes`, `sassa-whatsapp`, `moya-app-sassa`, `elife-certification-troubleshooting`, `biometric-fix-guide` | ✅ | — | — |
| Verification of official channels | guide `official-sassa-portal-guide`, canonical fact URLs | ✅ | — | — |

---

## 2. Validated editorial backlog (this run)

Only items confirmable against an official source are listed. Items that could not be
verified are excluded rather than guessed at.

> **22 Oct 2026 — demand-backed November backlog:** the Google Trends analysis and the prioritised
> November actions (including the "approved but no pay date" and ID-number status-check gaps) now live in
> `docs/NOVEMBER_2026_CONTENT_BACKLOG.md`. It uses relative search interest only and proposes no new
> pages until an existing page has been ruled out.

| # | Opportunity | Type | Official source | Existing pages checked | Decision |
|---|---|---|---|---|---|
| 1 | **Review suspension timeline for non-response** (30 + 60 = 90 days to respond; 30 days to apply for restoration; lapse after one month's notice) | Dated section in `grant-verification-process` | PMG replies NW4444 (17 Sep 2026), NW4094, NW1941, NW4450; SASSA Grant Booklet 2026 | `grant-verification-process`, `status/under-review`, `status/suspended` | **Delivered 16 Oct** — staged timeline published in the guide, both statuses and the update. |
| 2 | **Beneficiary Biometric Enrolment** explained (what it is, who it applies to, what to bring) | New section in `biometric-fix-guide` | PMG NW1941 (18 May 2026); Portfolio Committee meeting, 17 Sep 2026 | `biometric-fix-guide`, `sassa-update-information` | **Delivered 16 Oct** — "What Is SASSA Beneficiary Biometric Enrolment?" section + FAQ added. |
| 3 | Current-month date blocks on the remaining grant pages (Disability, Care Dependency, War Veterans) | Consistency edit | SASSA revised November 2026 dates (14 Oct 2026); DSD-approved 2026/27 schedule | the 3 grant pages | **Delivered 16 Oct** — blocks added to Disability, Care Dependency and War Veterans (plus Child Support and Foster Child). |
| 4 | Re-confirm SCA / BIS status | Verification | Court records / Treasury | `-srd-court-sca`, fact `srd_sca_status` | **Verified 16 Oct** — SCA judgment still reserved; no change needed. |

**Delivered in this run** (see the publication log): the two highest-traffic expired pages
(`grants/srd-r370-grant`, `grants/old-age-pension`) and the two current-cycle guides
(`fourth-payment-day-guide`, `sassa-grant-renewal`) were substantially refreshed to the
October/November 2026 cycle — fixing *expired information* on indexed pages rather than
adding new pages.

---

## 3. Payment-date maintenance model (keep to ≤ 3 routine rounds/month)

| Round | When | What is refreshed | Source that must exist first |
|---|---|---|---|
| **R1 — next cycle confirmed** | Mid-to-late month before (usually ~16th) | Bring the *next* month's permanent dates (Older Persons, Disability, Children's) into the forecast as `confirmed`; set status + governance. | SASSA / DSD announcement or media statement. |
| **R2 — SRD announced** | After the ~20th of the same month | Set that month's SRD row to `confirmed` with the real date(s). | SASSA SRD announcement / official portal. |
| **R3 — fourth payment day** | Late in the month | Confirm the under-review fourth day when SASSA announces it. | SASSA announcement. |

Rules: never publish an unannounced date as official; SRD stays `TBA`/`projected` until announced;
`under_review` stays `TBC` until announced; every change must update `governance.lastVerified`
with a real source URL. `scripts/validate-content.mjs` enforces the structural rules (statuses,
TBA/TBC sentinels, weekday↔date agreement, SRD ≥ 15th, governance presence, verification freshness).


---

## 4. Appeal accuracy correction (23 October 2026)

The appeal cluster was corrected against the live official portal and the SRD appeal rules. This was a
correctness pass, not a new-page expansion.

- **Official route:** `https://srd.sassa.gov.za/appeals/appeal`, using the 13-digit ID, the phone number
  on the SRD application and the 6-digit PIN; outcomes are per declined month.
- **Rules reflected:** 90 days from the decision; no late SRD appeal; tribunal finalises within 90 days
  of receipt; the tribunal reassesses the information SASSA already had.
- **Evidence limit:** the SRD appeal form is a reason-selection flow with no document upload. Bank
  statements, affidavits and clearance letters gathered afterwards cannot be added. Correcting UIF,
  NSFAS, PERSAL or Home Affairs records helps future monthly assessments, not the past appeal.
- **Removed:** the dead `srd-appeals.dsd.gov.za` host, the 30-day reconsideration-first step,
  60-90-day processing claims, back-pay guarantees, third-party appeal reference numbers and the claim
  that Moya can lodge an SRD appeal.
- **Pages/data touched:** `appeals.json`, `decline-reasons.json`, `status-meanings.json`,
  `guides.json`, `updates.json`, `faqs.json`, `canonical-facts.json`, the appeals hub, deadline
  tool/calculator, status and common-problems pages, status-explorer and payment troubleshooter.
- **Open editorial point:** several older updates still mention the historical stokvel example. Their
  appeal mechanics are now accurate; no new page was created.
