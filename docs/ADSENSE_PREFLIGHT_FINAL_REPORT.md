# SASSA Help Hub — AdSense Preflight FINAL REPORT (2 of 2)

Date: **2026-09-24** · Window: 2026-09-23 → 2026-09-24 · Domain: `sassahelphub.co.za`
Supersedes the preflight report (1 of 2) from 2026-09-23. This is the final completion pass per the brief `richtext_converted_to_markdown (16).md`. Prior-cycle results remain valid and are summarized where they still apply.

---

## FINAL STATUS

> **READY FOR ADSENSE SUBMISSION — with the single manual-verification condition in §MANUAL-1 (office contact records) carried as a standing item.** No CRITICAL or HIGH blocking risk remains. All brief-16 tasks closed this pass.

Brief 16 completion map:

| # | Task | Result |
|---|---|---|
| 1 | `/status-check` dynamic date + AlertBanner dormant-branch removal | **No code change needed — verified already clean.** `currentMonthYear` derives from `getCurrentMonthYearKey()` in `src/lib/config.ts` (fully `new Date()`-based, no hardcode); the hardcoded "September 2026" strings at `status-check/page.tsx` are the *confirmed* Sept schedule copy, not the variable. `src/components/Layout/AlertBanner.tsx` renders only the info-only "Independent Resource" variant — the pre-31-Aug urgent branch is gone from render and from source. Repo search confirms no live `must migrate / before 31 August` urgent framing. |
| 2 | Office directory classification | **Implemented.** `verification` field added to all records (counts below). Unverified address/phone never rendered (amber guard instead); verified records carry `source` + `verified_at`. 2 obsolete records (Bhisho, Centurion) already absent from data. |
| 3 | Province-page decision (distinctify, don't merge) | **Implemented.** `/province/[slug]` = grants/eligibility page; `/sassa-offices/[province]` = office directory. Both `index, follow`, own canonicals, no canonical-hiding; bidirectional links; duplicate tables removed. |
| 4 | `/FAQ` real resource | **Implemented.** 8 canonical groups, per-FAQ guide links, over-long guide-duplicative answers trimmed, 7 genuine gap FAQs added (54 → 61). |
| 5 | Content gaps on FAQ/news/guides vs competitors | **Closed within existing architecture.** See §Gaps. No new clusters or thin pages. |
| 6 | Current-state sweep | **Clean.** See §Current-state sweep. |
| 7 | AdSense 8-question quality check | **Passed.** See §AdSense quality. |
| 8 | Validation (build/lint/routes/sitemap/canonicals/noindex/render) | **All pass.** See §Validation. |
| 9 | Reports | This report + updated `docs/INDEXABLE_PAGE_QUALITY_AUDIT.md`. |

---

## OFFICE DIRECTORY — exact classification counts

Classification rule: `verified:true` → **verified**; `verified:false` with address/phone → **unverified**; `verified:false` with no address/phone → **partially_verified**. Obsolete = removed from data (not present).

| Dataset | Total | Verified | Partially verified | Unverified | Obsolete removed |
|---|---|---|---|---|---|
| `provinces.json` (9 regional + 35 main + 28 district = **72**) | 72 | **18** | **2** (Soweto, Thohoyandou) | **52** | **2** (Bhisho, Centurion) |
| `officeCities.json` (curated city pages) | 10 | **9** | **1** (Soweto) | 0 | — |
| `resources.json` (office profiles) | 10 | **10** | 0 | 0 | — |
| **Totals** | **92 records** | **37** | **3** | **52** | **2** |

- All `verified` records carry a genuine source + `verified_at: 2026-09-23`. No address/phone was invented; nothing was sourced from unofficial directories.
- Unsupported fields are either removed or labelled. Every render now guards on `verified === true` before showing an address/phone.
- Note for owner: `officeCities.json` Durban record = verified data but a **duplicate** of the KZN regional HQ (Pietermaritzburg) entry — flagged for a future dedup decision, **not removed** this cycle.

---

## INDEXABLE PAGES

| Metric | Count |
|---|---|
| Full route surface (incl. noindex/template) | ≈300 |
| Indexable (current sitemap) | ≈174 URLs |
| KEEP | 27 route groups / ≈300 pages |
| IMPROVE | 8 groups identified; 2 implemented (`/faq`, `/province/[slug]`); 6 held per brief (tool pages, `/how-much-is-srd-grant`, `/lost-sassa-card-or-id`, `/dates/*`) |
| MERGE | 0 (province/offices overlap **resolved** by distinctification) |
| NOINDEX | 54 (53 template city pages + `/search`) |
| REMOVE | 0 (held; long-term candidate = 53 template city pages via redirect) |

No previously-indexed, healthy page was noindexed this cycle. `/province/[slug]` (9) + `/sassa-offices/[province]` (9) both verified `index, follow` with self-canonical URLs; `/faq` canonical intact; `/search` verified `noindex, follow`.

---

## REMAINING RISKS

- **CRITICAL — none.**
- **HIGH — none.**
- **MEDIUM**
  1. **Office unverified data (52 of 72 in `provinces.json`).** Mitigated (never rendered; amber guard; verified-fields only). Fully cleared only by a human re-check of those 52 records against the current SASSA directory → §MANUAL-1.
  2. **`officeCities.json` Durban duplicate** (KZN HQ in Pietermaritzburg mislabelled "Durban"). Verified data but redundant row; decide dedup/rename later.
- **LOW**
  3. ~104 pre-existing lint warnings (unused imports, `any` types) — housekeeping only, 3 cleaned this cycle.
  4. Unsplash-hosted image URLs (third-party hotlinking) — availability risk, not policy.
  5. Shortcodes `*134*7737#` / SMS `32555` remain unverified entries in `canonical-facts.json` — correctly flagged and **never presented as official** anywhere (grep-verified); site uses `*120*69277#` (USSD SRD), `*120*3210#` (Postbank balance), WhatsApp `082 601 0111` / `082 046 8553`.

---

## Current-state sweep (brief 16 §6) — result: CLEAN

- **September 2026 / October 2026:** Sept dates confirmed & current (SRD batch 23 & 25 Sep); Oct = projected & labelled via `payment-schedule-forecast.json` governance fields. `/status-check` copy is the confirmed-September schedule (correct today); `getCurrentMonthYearKey()` is dynamic so nothing drifts on rollover.
- **latest / current / confirmed / TBC / urgent:** all `TBC` instances are governance comments, forecast projection rows (labelled), or schema fallbacks — never presented as confirmed fact. "urgent" appears only in legitimate advisory/helpline or scam-warning contexts.
- **`*134*7737#`, `32555`:** present only in `canonical-facts.json` marked **unverified/deprecated** (never presented as official); guides label `*134*7737#` "Old … (Unverified)". No accidental propagation.
- **Old WhatsApp numbers:** `082 046 8553` presented as the older-but-official SRD WhatsApp line (verified, both channels documented) — not stale.
- **Old payment dates:** all historical references are dated archive items (allowed); no stale date presented as current.
- Legitimate historical references were preserved unchanged.

---

## Content gaps vs competitors (FAQ/news/guides) — action log

Competitors reviewed: vsrd.co.za (2.79k kw), sassagrants.co.za (3.71k), sassasrdstatuscheckdates.co.za (1.72k), sassa-status.web.za, sassa.gov.za, srd-sassa.org.za, grantza.org.za.

- **FAQ gaps closed** (7 added, grounded, each linking to an existing deeper guide): SRD portal not loading; how long until payment reflects (2–3 business days bank / same-or-next Cash Send / release-day Black Card); do I reapply monthly; is the SRD ending or rising to R400/R700 (false; R370 to 31 Mar 2027; SCA appeal pending); how to change phone number; appeal declined → judicial review / Legal Aid SA 0800 110 110; Cancelled vs Suspended meaning. Existing status-meaning coverage (Pending/Referred/Bank Details Pending/No Record Found etc. → `/status/[slug]`) confirmed sufficient.
- **Guide gap closed:** `sassa-payment-methods` — added a "How Long Until Your Grant Reflects?" step and corrected a self-contradictory same-day/next-day tip to the standard 2–3-business-day guidance.
- **News:** after review, the only notable competitor topic not covered (late-August SRD portal outage) is a *concluded historical event* with no verifiable primary source on our end — per the accuracy rule it was **not** published. Our Sep SRD payment update (update-2026-037, 22 Sep), digital-services addendum update (18 Sep) and SCA court update cover the current news landscape.
- **Deliberate no-actions (recorded, not implemented):** jobs & vacancies pages, bursaries coverage, an SRD means-test calculator tool, and "SRD dispute/legal" clusters — all would be new thin page-clusters that risk AdSense/GSC quality flags. Flagged as future opportunities only.

---

## AdSense 8-question quality check

| # | Question | Verdict |
|---|---|---|
| 1 | Is the content accurate? | Yes — claims trace to `canonical-facts.json` (source + verified_date) or dated updates; no invented facts |
| 2 | Is it fresh? | Yes — dynamic dates, confirmed Sept schedule, governance-flagged projections, freshness-gated updates |
| 3 | Is it trustworthy (E-E-A-T)? | Yes — independent disclaimer, About/Authors/Sources/Corrections/Fact-Checking/Editorial policies present |
| 4 | Is it useful for users? | Yes — restructured FAQ, distinct province intents, improved payments guide, tools + status pages |
| 5 | Is it duplicated elsewhere? | No new duplication; `/faq` trimmed, province/offices distinctified, no over-lapping title matches introduced |
| 6 | Is the office directory accurate & honest? | Improved — verified/partially/unverified labelling with no unsupported data rendered (37/3/52) |
| 7 | Is historical content clearly past? | Yes — dated news kept as archive; shortcodes labelled legacy/unverified |
| 8 | Is indexation clean? | Yes — no accidental noindex; canonicals correct; sitemap data-driven; `/search` noindex enforced |

---

## FILES CHANGED (this final pass)

| File | Change |
|---|---|
| `public/data/faqs.json` | 8 canonical groups; `linkedPage` on 49 items; 5 answers trimmed; 7 gap FAQs added (54 → 61); new FAQ dates 2026-09-23 |
| `src/app/faq/page.tsx` | Canonical category order + display labels; renders `linkedPage` guide links; removed unused `FaInfoCircle` import |
| `src/app/province/[slug]/page.tsx` | **Rewritten** as grants/eligibility page (grants grid → `/grants/*`, eligibility facts via `getFact`, how-to-apply cards, regional office card, district chips, office towns + directory link; removed office address/phone tables + collection-points grid) |
| `src/app/sassa-offices/[province]/page.tsx` | Fixed unguarded district-office cards (verified guard); added visiting-info section; About simplified w/ cross-link; CTA cross-links to `/province/[slug]`; `articleSchema` date → `last_updated`; removed unused `FaClock`/`allOffices` |
| `public/data/guides.json` | `sassa-payment-methods`: added "How Long Until Your Grant Reflects?" step; fixed contradictory tip |
| `public/data/provinces.json`, `officeCities.json`, `resources.json` | `verification` classification field added to every record (no data invented) |
| `docs/INDEXABLE_PAGE_QUALITY_AUDIT.md` | Implemented-recs status, office counts, final summary |

### Follow-up pass (2026-09-24): official October 2026 payment-date confirmation

SASSA confirmed the **October 2026 permanent grant dates on 16 September 2026** (Older Persons **Fri 2 Oct**, Disability **Mon 5 Oct**, Children's **Tue 6 Oct**), reported by EWN. This closed a genuine news/data gap missed at brief-16 time (we were still showing October as projected). Changes:

| File | Change |
|---|---|
| `public/data/payment-schedule-forecast.json` | October permanent grants → `confirmed` (SASSA, verified 2026-09-24); November + December permanent grants → `confirmed` per the DSD-approved 2026/27 schedule; **January 2027 added** (forecast now Sep-2026 → Jan-2027, 5 months); SRD R370 and fourth-payment-day stay `projected`/TBA for all unconfirmed months |
| `src/lib/payment-schedule.ts` | **New.** Encodes the confirmation rhythm: permanent-grant dates confirm in advance; SRD R370 dates change monthly and are only announced after ~the 20th → `srdDisplay()` renders **TBA** for any month whose SRD is not yet `confirmed`, so no page can contradict the displayed month |
| `src/lib/config.ts` | Added `getCurrentMonthKey()`; DATE GOVERNANCE comment updated to the confirmation-rhythm rule |
| `src/app/page.tsx` | Homepage "Payment Schedule" strip now driven by the forecast for the displayed month (was a static `paymentDates.json` hardcoded to September — this was the contradiction); supporting paragraph is data-driven (confirmed permanent dates + TBA SRD line + unconfirmed fourth-day line) |
| `src/app/payment-calendar/page.tsx` | Metadata: "Confirmed October, November & December Dates"; SRD card + under-review rows use the shared TBA/TBC display logic; schema now iterates all 5 grant rows |
| `src/app/dates/[month-year]/page.tsx` | SRD/under-review rows use shared display logic; editorial dates now use per-month `governance.lastVerified` |
| `public/data/updates.json` | **update-2026-038** "SASSA Confirms October 2026 Payment Dates — Older Persons Paid 2 October" (news, 2026-09-24, indexable) |

Validation of follow-up pass: JSON parse OK (forecast 5 months; updates 30); `npm run lint` **0 errors**; `npm run build` **PASS**; prerendered HTML checks — October page shows 2/5/6 October as Confirmed + TBA SRD, homepage strip shows October 2/5/6 + SRD TBA + data-driven paragraph, `/payment-calendar` shows confirmed months + TBA, update-2026-038 renders. `paymentDates.json` is now orphaned (docs reference only; left in tree, harmless).

Prior-cycle changes (1 of 2) still in tree: `src/app/search/page.tsx` (`noindex, follow`), `src/lib/config.ts` cleanup, `public/data/guides.json` biometric-fix softening, `src/app/updates/page.tsx` 90-day gate, freshness/date fixes on retail + offices pages, `docs/ADSENSE_PREFLIGHT_FINAL_REPORT_2.md` (A–H preflight), `docs/INDEXABLE_PAGE_QUALITY_AUDIT.md`.

---

## VALIDATION (2026-09-24)

- **Build:** `npm run build` → **PASS** (Next.js 14.2.35, "Compiled successfully", 0 errors). All 9 `/province/[slug]` + 9 `/sassa-offices/[province]` pages prerendered; `/faq` renders all 61 items incl. JSON-LD.
- **Lint:** `npm run lint` → **PASS**, **0 errors**, 104 warnings (down from 107; 3 cleaned). No warnings from edited files.
- **Routes:** build manifest verified; province/offices/FAQ route counts unchanged (no accidental route add/removal).
- **Sitemap:** on-demand route-handler (0 B at build by design); data sources unchanged in count → URL inventory stable.
- **Canonicals:** `/province/gauteng` → `…/province/gauteng`; `/faq` → `…/faq`; offices pages canonical present. No canonical-hiding.
- **No accidental noindex:** `/province/*` `robots: index, follow`; `/sassa-offices/*` `index, follow`; `/search` remains `noindex, follow` (intended).
- **Render checks (prerendered HTML):** grants grid + office-directory link present on province page; amber "not independently verified" guard present on unverified office cards; FAQ category labels + guide links + new questions present; stale tokens sweep clean.

---

## MANUAL ACTIONS FOR OWNER

1. **MANUAL-1 (standing, the only manual condition):** re-verify the **52 unverified** office records in `provinces.json` against the current SASSA office directory and set `verified: true` + source where confirmed. Until then the amber guards render (AdSense-safe).
2. Optional: decide Durban vs Pietermaritzburg naming for the KZN regional HQ row in `officeCities.json`.
3. Standing from prior cycle: GSC **Request Indexing** for `/status`, `/status/approved`, `/status/pending`, `/status/bank-details-pending`, `/dates/september-2026` (and optionally the 9 `/province/*` + 9 `/sassa-offices/*` pages after this pass).
4. Deploy this build; then re-submit `/sitemap.xml` unchanged in Google Search Console if it was previously flagged.

No further content sprint or audit is proposed — brief 16 is complete.