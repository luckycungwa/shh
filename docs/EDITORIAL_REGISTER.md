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
| SRD R370 dates (current cycle) | SASSA SRD announcement (Sept: 22 Sep 2026) | `grants/srd-r370-grant`, `/dates/october-2026` | Page still advertised "September 2026" as current in October | Refresh dates to current cycle; SRD stays TBA/projected | `grants/srd-r370-grant` | Updated 16 Oct 2026 | 2026-10-16 | Set SRD row to `confirmed` when SASSA announces |
| Older Persons dates (current cycle) | DSD 2026/27 schedule; SASSA Nov revised dates (14 Oct 2026) | `grants/old-age-pension`, `/dates/october-2026`, `/dates/november-2026` | Page pinned to September; missed Nov bring-forward (30 Oct) | Refresh to Oct paid + next 30 Oct | `grants/old-age-pension` | Updated 16 Oct 2026 | 2026-10-16 | None until December cycle |
| Fourth payment day | SASSA statements; forecast JSON | `fourth-payment-day-guide` | Guide FAQ + example pinned to September | Refresh to October; link latest confirmed update | `fourth-payment-day-guide` | Updated 16 Oct 2026 | 2026-10-16 | Re-check each month |
| Monthly reassessment explainer | SRD assessment rules | `sassa-grant-renewal` | Example used Aug→Sept | Refresh to Sept→Oct; SRD TBA wording | `sassa-grant-renewal` | Updated 16 Oct 2026 | 2026-10-16 | None |
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

## 3. Recurring workflow

1. **Research** official sources (`sassa.gov.za/newsroom/media-statements`, `srd.sassa.gov.za`, DSD,
   gov.za/Gazette) → note source + publication date in the register.
2. **Check** existing pages before writing (avoid duplication; `/guides`, `/updates`, grants, `/dates`).
3. **Record** the gap and the decision in the register above.
4. **Draft/edit** in the existing content system; keep internal links and the official portal link.
5. **Validate:** `npm run validate:content` then `npm run lint` and `npm run build`.
6. **Log** the change in the Publication Log with the official source.
7. **Maintain that month's dates** under the ≤ 3-round model (see `docs/TOPIC_COVERAGE_MATRIX.md` §3).
