# SASSA Help Hub — Editorial Register & Publication Log

**Owner:** Lucky Cungwa · **Created:** 16 October 2026
**Purpose:** A version-controlled, durable record so editorial decisions persist between runs:
what was researched, which official source it came from, what existing pages were checked, the
gap found, what was created/updated, and what must happen next.

**Conventions**
- Append to the **Publication Log**; never rewrite history. Correct a mistake with a new dated entry.
- Keep dates accurate. **Do not change a page's published/updated date merely to look fresh** — only
  when the content genuinely changed (and then record it here).
- Nothing is "published" until it is in the repo and (if intended) live; record the exact local path
  and the public URL, and mark verification status honestly.
- Every claim must trace to an official source: `sassa.gov.za`, `srd.sassa.gov.za`, `dsd.gov.za`,
  `gov.za` / Government Gazette, or National Treasury. Secondary press is corroboration only.

---

## 1. Living editorial register

| Topic | Official source (pub date) | Existing pages checked | Gap found | Action | Slug | Status | Last review | Next action |
|---|---|---|---|---|---|---|---|---|
| SRD R370 dates (current cycle) | SASSA October 2026 SRD announcement (22 Oct 2026) | `grants/srd-r370-grant`, `/dates/october-2026`, `update-2026-038` | October SRD row still `TBA`/`projected` after SASSA confirmed 22–23 October | Confirmed SRD dates in the forecast, rewrote `update-2026-038`, refreshed the grant page and date guidance | `update-2026-038`, `grants/srd-r370-grant` | Updated 22 Oct 2026 | 2026-10-22 | Confirm the November SRD row when SASSA announces it |
| Older Persons dates (current cycle) | DSD 2026/27 schedule; SASSA Nov revised dates (14 Oct 2026) | `grants/old-age-pension`, `/dates/october-2026`, `/dates/november-2026` | Page pinned to September; missed Nov bring-forward (30 Oct) | Refresh to Oct paid + next 30 Oct | `grants/old-age-pension` | Updated 16 Oct 2026 | 2026-10-16 | None until December cycle |
| Fourth payment day | SASSA statements; forecast JSON | `fourth-payment-day-guide` | Guide FAQ + example pinned to September | Refresh to October; link latest confirmed update | `fourth-payment-day-guide` | Updated 16 Oct 2026 | 2026-10-16 | Re-check each month |
| Monthly reassessment explainer | SRD assessment rules | `sassa-grant-renewal` | Example was Sept→Oct with SRD `TBA` wording | Refreshed to a month-neutral example and the confirmed 22–23 Oct SRD dates | `sassa-grant-renewal` | Updated 22 Oct 2026 | 2026-10-22 | None |
| November content priorities (Google Trends, ZA) | Google Trends export 15–22 Oct 2026 (demand signal only) | All date, status and SRD pages | November demand overtook October; "approved but no pay date", ID-number status checks and festive-season dates rising | Created a prioritised backlog; no new pages approved | `docs/NOVEMBER_2026_CONTENT_BACKLOG.md` | Backlog 22 Oct 2026 | 2026-10-22 | Execute P1 items; re-run Trends mid-November |
| Review suspension & restoration timeline (30 + 60 = 90 days to respond; 30 days to apply for restoration; lapse after 1 month's notice) | PMG replies NW4444 & NW4094 (17 Sep 2026), NW1941 (18 May 2026), NW4450 (17 Sep 2026); SASSA Grant Booklet 2026 | `grant-verification-process`, `status/under-review`, `status/suspended`, `update-2026-sassa-grant-controls` | Site said "suspended in the next payment cycle" (unsupported); the staged 30/60/90-day timeline and the 30-day restoration window were not stated in one place; press was cited where official replies exist | Published the staged timeline + official sources across the guide, both statuses and the update; removed the "next payment cycle" claim; fixed the broken `-028` related link | `grant-verification-process` | Updated 16 Oct 2026 | 2026-10-16 | Re-check if SASSA revises the timelines |
| Beneficiary Biometric Enrolment | PMG NW1941 (18 May 2026); Portfolio Committee meeting (17 Sep 2026) | `biometric-fix-guide`, `sassa-update-information` | Not explained as a named programme | Added a "What Is SASSA Beneficiary Biometric Enrolment?" section + FAQ to `biometric-fix-guide` | `biometric-fix-guide` | Updated 16 Oct 2026 | 2026-10-16 | None |
| Current-month date blocks (Disability, Care Dependency, War Veterans) | SASSA revised November 2026 dates (14 Oct 2026); DSD 2026/27 schedule | `grants/disability-grant`, `grants/care-dependency-grant`, `grants/war-veterans-grant`, `grants/child-support-grant`, `grants/foster-child-grant` | No current-month date block (parity gap) | Applied the older-persons pattern to all five grant pages; corrected Care Dependency grouping (children's day, not disability) | — | Updated 16 Oct 2026 | 2026-10-16 | Re-check each month under the ≤ 3-round model |
| SRD → BIS / SCA case | Court records; National Treasury | `-srd-court-sca`, fact `srd_sca_status` | SCA judgment reserved (25 Aug 2026) | Re-verified 16 Oct 2026 — still reserved; no change | — | Verified 16 Oct 2026 | 2026-10-16 | Re-check after any SCA ruling |

---

## 2. Publication log (append-only)

### 2026-10-16 — Freshness & consistency round (first run of the new model)

**Reason:** Expired September-2026 content was still presented as current on indexed pages;
one stray grant amount contradicted the canonical fact store.

| # | File | Change | Official source / basis |
|---|---|---|---|
| 1 | `public/data/updates.json` | Foster Child amount in the comparison table corrected `R1,290` → `R1,300` per child | Gazette 54397 / GN R.7287 (23 Mar 2026): Foster Child R1,300 from 1 Oct 2026 |
| 2 | `src/app/dates/[month-year]/page.tsx` | Amber banner now names the specific unconfirmed grants instead of a blanket "some dates are projected"; status chip reads "Confirmed" / "Not yet announced" / "Projected" | Forecast `status` + `TBA`/`TBC` sentinels |
| 3 | `public/data/grants/srd-r370-grant.json` | Refreshed payment-date section, FAQ and description to the current cycle; SRD October shown as not-yet-announced; links → `/dates/october-2026`, `/dates/november-2026`, `/payment-calendar`; `last_updated` → 2026-10-16 | SASSA SRD announcement (Sept) + forecast governance |
| 4 | `public/data/grants/old-age-pension.json` | Refreshed amount/payment-date section to Oct paid + next 30 Oct 2026; description + section title de-dated; `last_updated` → 2026-10-16 | DSD 2026/27 schedule; SASSA revised Nov dates (14 Oct 2026) |
| 5 | `public/data/guides.json` (`fourth-payment-day-guide`) | Example + FAQ refreshed to October; links → latest confirmed update; `lastUpdated` → 2026-10-16 | SASSA statements; forecast |
| 6 | `public/data/guides.json` (`sassa-grant-renewal`) | Reassessment example refreshed Sept→Oct; `lastUpdated` → 2026-10-16 | SRD assessment rules; forecast |
| 7 | `scripts/validate-content.mjs` (new) | Pure-Node content validator (no new deps) checking forecast structure/statuses/sentinels/weekday↔date/SRD rules/governance/freshness, canonical-fact integrity, and grant-template key resolution | `package.json` `validate:content` |

**Verification:** `node scripts/validate-content.mjs` → 0 errors, 0 warnings (2026-10-16).
Negative test confirmed the weekday↔date rule fails a deliberately wrong day and exits non-zero.

**Not claimed:** No page is asserted to be re-indexed or live as a result of this commit until the
normal deploy/lint/build workflow runs and the site is checked.

---

### 2026-10-16 — Review-cluster correctness round (timeline, links, sourcing)

**Reason:** The 2026/27 review timeline was described in a way that matched neither official position
("suspended in the next payment cycle"); a related link pointed at the wrong update; and press sources
were cited where official parliamentary replies exist.

| # | File | Change | Official source / basis |
|---|---|---|---|
| 1 | `public/data/guides.json` (`grant-verification-process`) | Replaced the unsupported "suspended in the next payment cycle" text with the staged timeline — 30 days to submit → a further 60 days (up to 90 days total) before suspension → 30 days from suspension to apply for restoration → lapse after one month's notice — plus back-pay on reinstatement; refreshed the 90-day FAQ | PMG NW4444 & NW4094 (17 Sep 2026); NW1941 (18 May 2026); NW4450 (17 Sep 2026); SASSA Grant Booklet 2026 |
| 2 | `public/data/guides.json` (`grant-verification-process`) | Step 2 sourcing moved from press to official: "more than 350,000" (NW4094), "105,508 reviewed in Q1" (NW4444), "259,000 initiated / 201,000 responded / ~60,000 suspension notices" (Portfolio Committee, 17 Sep 2026); removed IOL and BusinessTech attributions; extended `sources` (NW4444, NW1941, Committee meeting 42085, Grant Booklet) | PMG replies and meeting; SASSA Grant Booklet 2026 |
| 3 | `public/data/guides.json` (`grant-verification-process`) | Fixed related link `/updates/update-2026-028` (anchor "…7 August 2026") → `/updates/update-2026-034` and added `/updates/update-2026-010` | Internal link audit (update IDs) |
| 4 | `public/data/status-meanings.json` (`under-review`, `suspended`) | Stated the staged 30+60=90-day response window and the 30-day restoration window; clarified back-pay on reinstatement | PMG NW4444/NW4450; SASSA Grant Booklet 2026 |
| 5 | `public/data/updates.json` (`update-2026-sassa-grant-controls`) | FAQ "How long do I have to respond" rewritten to the staged timeline; added PMG NW4444 to `sources` | PMG NW4444 (17 Sep 2026) |

**Verification:** `npm run validate:content`, `npm run lint` and `npm run build` all pass (2026-10-16).

**Not claimed:** No page is asserted to be re-indexed or live until the deploy workflow runs and the
site is checked. Figures are attributed to their publishing source, not asserted as SASSA's own.

---

### 2026-10-16 — Parity & coverage round (biometric enrolment, date blocks, SCA re-check)

**Reason:** Remaining parity/backlog items from the topic-coverage matrix: grant pages without a
current-month date block, Beneficiary Biometric Enrolment unexplained as a named programme, and the
SCA/BIS status to re-confirm.

| # | File | Change | Official source / basis |
|---|---|---|---|
| 1 | `public/data/guides.json` (`biometric-fix-guide`) | Added a "What Is SASSA Beneficiary Biometric Enrolment?" step + FAQ: what it is, when it applies (from Sep 2025; face-to-face fully rolled out 1 Sep 2026; online system by end Nov 2026), what to bring, and 997,379 verified Sep 2025–Mar 2026 | PMG NW1941 (18 May 2026); Portfolio Committee meeting (17 Sep 2026) |
| 2 | `public/data/grants/*.json` | Added current-month date blocks (October paid + next November date) to Disability (5 Oct → 2 Nov), War Veterans (2 Oct → 30 Oct), Care Dependency (6 Oct → 3 Nov), Child Support (6 Oct → 3 Nov) and Foster Child (6 Oct → 3 Nov); corrected the Care Dependency grouping to the children's payment day | SASSA revised November 2026 dates (14 Oct 2026); DSD 2026/27 schedule |
| 3 | `public/data/canonical-facts.json` (`srd_sca_status`) | No change — re-verified the SCA judgment is still reserved (25 Aug 2026) | SCA cause list / court reporting |

**Verification:** `npm run validate:content`, `npm run lint` and `npm run build` all pass (2026-10-16).

**Not claimed:** No page is asserted to be re-indexed or live until the deploy workflow runs and the
site is checked.

---

### 2026-10-16 — URL hygiene round (legacy guide slug → descriptive slug + 301)

**Reason:** AI-citation analysis (Ahrefs, "Why ChatGPT Cites One Page Over Another") plus TECH-01:
`/guides/guide-001` was the site's one opaque, non-natural-language slug. Natural-language slugs are
cited more often by answer engines. Owner approved a one-off re-slug accepting the URL-age reset.

| # | File | Change | Basis |
|---|---|---|---|
| 1 | `public/data/guides.json` | Guide `id` `guide-001` → `apply-child-support-grant` (the `id` is the URL param); related-link URL updated | TECH-01; L3 of `docs/seo/sassa-ai-citation-analysis.md` |
| 2 | `next.config.js` | Added permanent 301: `/guides/guide-001` → `/guides/apply-child-support-grant` | Preserve the old URL's link equity/age path |
| 3 | `src/lib/entities.ts`, `src/app/common-problems/page.tsx`, `public/data/updates.json`, `scripts/rewrite-thin-guides.mjs` | Updated all internal references to the new slug | Internal-link integrity |

**Verification:** `npm run validate:content`, `npm run lint` and `npm run build` all pass (2026-10-16);
old URL 301s and drops from the live sitemap after deploy.

**Not claimed:** No page is asserted to be re-indexed or live until the deploy workflow runs and the
site is checked.

---

### 2026-10-22 — October SRD confirmed (22–23 October) + November Trends backlog

**Official source:** SASSA official October 2026 SRD R370 payment-dates announcement (verified 22 October 2026;
the supplied SASSA poster states Thursday 22 and Friday 23 October 2026 and confirms the extension to
31 March 2027). Permanent October dates (2, 5, 6 October) were already confirmed on 16 September 2026.

| # | File | Change | Basis |
|---|---|---|---|
| 1 | `public/data/payment-schedule-forecast.json` | October `srd` changed from `TBA`/`projected` to `2026-10-22`/`confirmed`; note and governance rewritten (`lastVerified` 22 Oct 2026) | SASSA announcement; batch/pay-day rule preserved |
| 2 | `public/data/updates.json` (`update-2026-038`) | Rewrote the September article in place as "SASSA SRD R370 Payment Dates for October 2026: 22 and 23 October Confirmed"; date 22 Oct 2026; added `seoTitle` and `metaDescription` | Confirmed dates; same URL avoids a competing page |
| 3 | `src/app/updates/[id]/page.tsx` | Added optional `seoTitle` / `metaDescription` support; absolute title bypasses the brand suffix | 56-char title / 162-char description could not be expressed through `clampTitle`/`clampDescription` |
| 4 | `public/data/grants/srd-r370-grant.json` | Replaced "October not yet announced" wording in the payment-dates section, the October section and the FAQ; `last_updated` 22 Oct 2026 | Removes a direct contradiction with the forecast and article |
| 5 | `public/data/guides.json` | `sassa-grant-renewal` example made month-neutral and refreshed to the confirmed dates; `fourth-payment-day-guide` "as at" date refreshed; both `lastUpdated` 22 Oct 2026 | Accuracy; no new pages |
| 6 | `src/app/payment-calendar/page.tsx` | Metadata description now names the 22–23 October SRD dates | Keeps the hub snippets current |
| 7 | `docs/NOVEMBER_2026_CONTENT_BACKLOG.md` | New Trends-backed November backlog (A–E, P1–P3, do-not list) | Google Trends export 15–22 Oct 2026 (relative interest only) |

**Verification:** `npm run validate:content`, `npx tsc --noEmit`, `npm run lint` and `npm run build` all pass (22 Oct 2026).

**Not claimed:** No page is asserted to be re-indexed or live until the deploy workflow runs and the site is
checked. Trends interest is relative, not search volume.

---

### 2026-10-22 — `/payment-calendar`: November snippet + confirmed block (November P1 #1)

**Official source:** SASSA media statement, 14 October 2026 — "SASSA announces revised November 2026 social grant
payment dates ahead of Local Government Elections". Read as text and verified 22 October 2026: Older Persons Friday
30 October, Disability Monday 2 November, Children's Grants Tuesday 3 November, fourth payment day Thursday
5 November (for grants under review); National Treasury approved the revised dates; SRD R370 not announced.

| # | File | Change | Basis |
|---|---|---|---|
| 1 | `src/app/payment-calendar/page.tsx` | Title → "SASSA Payment Dates for November 2026" (renders at 54 chars; the old title truncated to "— October"); H1 → "SASSA Payment Calendar 2026: November Dates"; description rewritten to lead with November; added a confirmed November block (all four dates, election context, SRD TBA, source link, links to `/dates/november-2026`, `fourth-payment-day-guide`, `/status-check`); three November FAQs; "Payment not reflecting" link | GSC 3 months: 8,786 clicks / 677,533 impressions / 1.30% CTR / position 8.94; November cluster 15,795 impressions at ~0.37% |
| 2 | `docs/NOVEMBER_2026_CONTENT_BACKLOG.md` | P1 reassigned: hub first; ID-number method to `/status-check` only; "approved but no Pay Day" → P2; festive season gated | GSC page/query evidence; `/dates/november-2026` and `/tools/status-explorer` have 0 impressions |

**Verification:** `npm run validate:content` 0 errors, `npx tsc --noEmit` clean, `npm run lint` 0 errors
(103 pre-existing warnings), `npm run build` succeeded (258 prerendered HTML files). Built page: title 54 chars,
description 156 chars, one H1, canonical `/payment-calendar`, FAQ schema present.

**Not claimed:** No indexation, ranking or CTR improvement is asserted. Google has not been asked to recrawl.

---

### 2026-10-23 — Dates metadata, readable date tables, homepage October hold, status ID-number answer

**Official sources:** SASSA October 2026 SRD announcement (22–23 October) and SASSA media statement of 14 October
2026 on revised November dates. No new dates were inferred; December SRD remains TBA.

| # | File | Change | Basis |
|---|---|---|---|
| 1 | `src/lib/payment-schedule.ts`, `public/data/payment-schedule-forecast.json` | Added optional `endDate` to a schedule row and gave October SRD `endDate: 2026-10-23`, so the homepage stays on October through the second SRD batch day instead of rolling to November on 23 October | October SRD is paid 22 **and** 23 October |
| 2 | `src/app/dates/[month-year]/page.tsx` | Title/H1 → "SASSA {Month} 2026 Grant Payment Dates" (no truncated "— All"); compact confirmed summary in the description; readable dates in the payment table (`2 October 2026`, not `2026-10-02`) | Built titles 55–56 chars, descriptions 124–143 chars; raw ISO dates were visible to users |
| 3 | `src/app/sitemap.ts` | `/dates/*` lastmod now comes from each month's own `governance.lastVerified` instead of one shared status date | Per-month verification dates in the forecast |
| 4 | `public/data/updates.json` | `update-2026-038` description shortened to 149 chars | Previous snippet was cut in search results |
| 5 | `src/app/payment-calendar/page.tsx`, `src/app/status-check/page.tsx` | Readable dates on month cards; "SRD R370 date TBA" singular; status-check link text now "SASSA payment calendar" | Copy consistency |
| 6 | `src/app/status-check/page.tsx` | Added "Check your SASSA status with your ID number" steps and an ID-only FAQ; description now leads with the ID-number method | November backlog P1 #2: method query +80% / +40% |
| 7 | `public/data/status-meanings.json` | `/status/approved` title → "SASSA Approved but No Pay Day: Next Steps" (58 rendered), description and opening paragraph now answer the no-pay-date state first | November backlog P2 #4: query +4,700% / +300% on a small base |

**Verification:** `npx tsc --noEmit` clean, `npm run validate:content` 0 errors/0 warnings, `npm run lint` 0 errors
(103 pre-existing warnings), `npm run build` succeeded. Built `/dates/*`: October 55-char title / 125-char
description, November 56 / 143, December 56 / 124; no "Grant Schedule — All" remains; November table renders
"Friday 30 October 2026". Sitemap lastmod: October 2026-10-22, November 2026-10-15, December 2026-09-24.
Homepage build now shows October and the 22–23 October SRD batch. `/status-check` title 52 chars, description 153.
`/status/approved` title 58 chars, description 160, H1 "SASSA Approved but No Pay Day: Next Steps".

**Not claimed:** No indexation, ranking or CTR improvement is asserted. Google has not been asked to recrawl.
Deployment was not performed; the changes are committed locally and not pushed.

---

## 3. Recurring workflow

1. **Research** official sources (`sassa.gov.za/newsroom/media-statements`, `srd.sassa.gov.za`, DSD,
   gov.za/Gazette) → note source + publication date in the register.
2. **Check** existing pages before writing (avoid duplication; `/guides`, `/updates`, grants, `/dates`).
3. **Record** the gap and the decision in the register above.
4. **Draft/edit** in the existing content system; keep internal links and the official portal link.
5. **Validate:** `npm run validate:content` then `npm run lint` and `npm run build`.
6. **Log** the change in the Publication Log with the official source.
7. **Maintain that month's dates** under the ≤ 3-round model (see `docs/TOPIC_COVERAGE_MATRIX.md` §3).
