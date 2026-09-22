# SASSA Help Hub — Topic-Gap Audit (Phase 0)

Status: **Complete** · Crawl date: **2026-09-18** · Domain: `sassahelphub.co.za`

This document is the Phase 0 deliverable of the topic-gap execution. It records what the site currently covers, what is strong, what is thin, and which competitor topics are genuine gaps (D) versus already-covered (B) versus rejected (E/F). It is evidence for `docs/TOPIC_GAP_EXECUTION_REPORT.md`.

---

## 1. Method

- Enumerated every route from `src/app/sitemap.ts` and read the full directory tree under `src/app`.
- Read every data source under `public/data` (guides, updates, grants, statuses, decline reasons, banking, appeals, FAQs, provinces, resources, scams, payment data, canonical facts).
- Read the existing internal audits: `audit/content-clusters.md`, `audit/search-console-indexing-list.md`, `docs/content-quality-plan.md`.
- Re-verified the current SASSA facts (rate, income limit, extension date, WhatsApp channels, office kiosks, SRD court case) against dated 2026 sources before recording them here.
- Competitor topic inventories (grantza.org.za, srd-sassa.org.za, vsrd.co.za, sassagrants.co.za, esset.org.za, sassasrdstatuscheckdates.co.za, sassa-status.web.za) were used **only** to identify search intents — never as a source of facts.

## 2. Site inventory

### 2.1 Static routes (26 + 4 E-E-A-T + search)

| Group | Routes |
|---|---|
| Home & hubs | `/`, `/updates`, `/guides`, `/grants`, `/status`, `/faq`, `/scam-alert`, `/resources`, `/common-problems`, `/glossary`, `/status-check` |
| Tools | `/tools/appeal-deadline`, `/tools/payment-troubleshooter`, `/tools/status-explorer`, `/eligibility-check` |
| Informational | `/payment-calendar`, `/sassa-offices`, `/sassa-contact`, `/how-much-is-srd-grant`, `/lost-sassa-card-or-id`, `/sassa-retail-collection-points` |
| Search | `/search` |
| Legal | `/about`, `/contact`, `/privacy-policy`, `/disclaimer`, `/terms-of-service`, `/authors` |
| E-E-A-T | `/editorial-policy`, `/fact-checking-policy`, `/sources-policy`, `/corrections-policy` |

### 2.2 Dynamic routes

| Route | Source | Entries | Rendering |
|---|---|---|---|
| `/updates/[id]` | `updates.json` | 26 (16 noindex/redirected) | Markdown + `resolveTemplates` |
| `/guides/[id]` | `guides.json` | 39 | Steps + FAQ HTML |
| `/grants/[slug]` | `grants/*.json` | 8 | Sections + FAQ |
| `/status/[slug]` | `status-meanings.json` | 20 | Definitions |
| `/decline-reason/[slug]` | `decline-reasons.json` | 12 | Definitions + appeal path |
| `/banking/[slug]` | `banking-methods.json` | 10 | Method pages |
| `/appeals/[slug]` | `appeals.json` | 6 | Step pages |
| `/dates/[month-year]` | `payment-schedule-forecast.json` | monthly | Schedule page |
| `/province/[slug]` | `provinces.json` | 9 | Province hubs |
| `/sassa-offices/[province]/[city]` | `provinces.json` + `officeCities.json` | curated cities only | Office/city pages |

### 2.3 Data coverage

- **Guides (39):** full application walkthroughs, decline appeals, banking fixes, USSD, WhatsApp, Moya, reviews, life certification, card migration, payment fixes, and an adjacent monetization cluster (funeral cover ×2, compare financial options, extra income, skills courses, data bundles, SIM replacement).
- **Updates (26):** payment-schedule news, integrity checks, banking verification fixes, card migration, SRD status methods, decline-reason explainer, WhatsApp self-service launch, grant comparison, Sept 2026 dates.
- **Statuses (20):** `application-complete, pending, bank-details-pending, identity-verification, referred, means-test-failed, approved, declined, appeal-pending, paid, under-review, cancelled, suspended, reapplication-required, alternative-income-detected, uif-registered, nsfas-registered, source-limit-exceeded, application-invalid, null`.
- **Decline reasons (12):** `income-source-detected, identity-verification-failed, uif-registered, nsfas-registered, existing-sassa-grant, government-payroll, age-outside-range, deceased-dha-record, invalid-bank-details, self-correction-required, duplicate-application, income-not-proven`.
- **Banking methods (10):** bank transfer, Postbank, 4 cash-send retailers, Capitec, TymeBank, eKYC biometric, phone update.
- **Appeals (6):** how-to-appeal, appeal-status-check, appeal-deadline, reconsideration, itsaa, appeal-timeline.
- **FAQs (54):** structured FAQ hub.
- **Provinces (9)** with office records, districts, retail collection points, and SRD-specific notes. **Resources: 10** regional SASSA offices.
- **Scams (5).** **Grants (8)** pillared guide pages.
- **canonical-facts.json**: single source for all grant amounts, thresholds, extension dates (see §7).

## 3. Canonical URL map (as of crawl)

- SRD grant pillar: `/grants/srd-r370-grant` (apply, eligibility, appeal, payments).
- Income-threshold decline: `/decline-reason/income-source-detected` (+ `/guides/income-source-detected-appeal` deep guide).
- Appeals: `/appeals/how-to-appeal` (step hub) with `/guides/appeal-guide` deep guide.
- Decline dictionary: `/status` + `/decline-reason/[slug]` pages.
- Status method: `/status-check` hub → `/guides/ussd-codes`, `/guides/sassa-whatsapp`, `/guides/moya-app-sassa`, `/guides/sassa-online-security`.
- Payment dates: `/payment-calendar` + `/dates/[month-year]`.
- Bank details fixes: `/guides/bank-details-pending-fix`.
- Card migration: `/guides/postbank-black-card-guide` + `/lost-sassa-card-or-id` + `update-2026-033`.
- Reviews: `/guides/fourth-payment-day-guide`, `/guides/grant-verification-process`, `/guides/sassa-update-information`, `/guides/life-certification`.
- **Canonical conflicts found — see §5.**

## 4. Internal-link map

- `EntityLinks` provider emits contextual cross-links on guide/grant/status pages.
- `guideNextSteps()` / record `nextSteps` render NextStepCards; fallback to `related`.
- Hubs are linked from nav, homepage "Explore by Topic", search index, sitemap.
- **Works:** grants→status→decline→appeal; banking methods cross-sell retailer cash-send pages.
- **Weak:** several guides lack `relatedLinks`/`sources` (e.g. `guide-reinstate-grant`); some `nextSteps` point at the monetization cluster (funeral cover) instead of the operational next step — see §5.4.
- Sitemap is fully data-driven: new guides/updated statuses appear automatically.

## 5. Duplicates, near-duplicates & conflicts

### 5.1 Appeal duplication — CONFIRMED CONFLICT
`/appeals/appeal-timeline` (appeals.json) and `/guides/appeal-timeline` target the same intent. `/appeals/how-to-appeal` and `/guides/appeal-guide` overlap heavily. Two route systems serve overlapping intents. **Resolution:** keep `/guides/appeal-guide` as the deep how-to, `/appeals/how-to-appeal` as the step page, choose **one** timeline canonical and cross-link rather than 1:1 duplicate.

### 5.2 Status method near-duplicates
`sassa-online-security`, `sassa-whatsapp` (rewritten this cycle), `ussd-codes`, `moya-app-sassa` all cover "check status method X". Distinct channels with different instructions — acceptable, but each must reference `/status-check` as the hub and not repeat the whole dictionary.

### 5.3 Template-variable leak — CHECKED, render path resolves
`update-2026-027` and `update-2026-024` content still contains raw `{{srd_grant_amount}}`-style placeholders. `src/lib/canonical-facts.ts` `resolveTemplates()` substitutes these at render time, so **no leak currently**; values render as R370/R624 etc. Hardening: inline the literals into these two historical/`noindex` records so data stays correct even if a fact key is removed.

### 5.4 Off-topic / monetization cluster overlap
`funeral-cover-south-africa-comparison` vs `what-does-funeral-cover-cost` overlap. `ways-to-make-extra-income`, `free-skills-courses`, `compare-financial-options`, `affordable-data-bundles`, `sim-replacement` are adjacent to core. **Consolidation:** funeral pair → one canonical page; the rest stay as secondary-intent guides (real demand) but are not to be multiplied.

### 5.5 Financial/value conflicts found in data
- `canonical-facts.json` `foster_child_grant_amount_2025 = R1,180` contradicts the site's own history (Foster was **R1,250** in 2024→2025; R1,290 in April 2026). Fix.
- `sassa_gold_card` / `postbank_black_card` / `card_replacement_cost` are `needs_human_review` with **no source URL** and reference a **passed deadline** (31 Aug 2026). Postbank confirmed the migration continues after the deadline (cards still replaced free at service points); must be re-sourced and the "deadline" framing corrected across content that still calls it an open deadline.

## 6. Thin pages & low-value pages

| Page/group | Issue | Action |
|---|---|---|
| `update-2026-023`, `-024`, `-028`, `-029` (`noindex: true`) | Noindexed; some still create navigational noise | Leave noindexed; **do not** surface further |
| City office pages not in `officeCities.json` | Route-level noindex; data plausible but unverified | Kept; verified flags on `officeCities`/province records are the mechanism |
| Province hub pages | Currently office/collection data + challenges; **no genuine local information** distinguishing them | Phase 7: refresh `verified` flags; only deepen Limpopo/Mpumalanga/Free State/KZN with *sourceable* local facts (SASSA mobile units, kiosk/free-Wi-Fi rollout, local collection notices) if confirmed |
| `guide-reinstate-grant` | No `relatedLinks`, no `sources`, thin | Improve while touching the review cluster |

## 7. Verified facts & data corrections (Phase 0 output)

Source: dated 2026 reporting (IOL 26-Aug, EWN 4-Aug, Citizen 1-Sep / 18-Sep briefing, Daily Maverick, GroundUp, TimesLIVE, The South African, bizcommunity), official sassa.gov.za + srd.sassa.gov.za + DSD + Postbank where available. Anything not confirmable from an official SASSA source is recorded **unverified** below.

### 7.1 Confirmed (publish as fact)
- SRD amount **R370/mo** since Apr 2024; extension to **31 Mar 2027**; income limit **R624/mo**.
- Older Persons 2 Sep 2026, Disability 3 Sep 2026, Children's 4 Sep 2026 (permanent grants). SRD batch last week of Sept 2026 (window reported 24–30 Sep — label "reported, not SASSA-published").
- **WhatsApp channels (two active, both official):**
  - `082 601 0111` — SASSA Self-Service WhatsApp (Social Grants). Flow: send "Hi" → Social Grants → grant type → mobile + OTP + ID verification → *Application Status* / *Am I in Review?* / proof-of-life checks. Launched Aug 2026.
  - `082 046 8553` — SRD/status line (older channel, still active).
- **Digital services breakout (SASSA briefing, 18 Sep 2026):** WhatsApp channels (SRD, grant enquiries, review-status channel), self-service **kiosks** at SASSA offices, advanced kiosks targeted 2027/28, free Wi-Fi at offices, a mobile app in planning. 
- **SRD court case:** SCA hearing **25 Aug 2026**, judgment reserved. High Court (Jan 2025) had found online-only application, R624 threshold and R370 amount unconstitutional; ordered in-person applications, progressive increases and exclusion of once-off gifts from income. No money/value changes pending the SCA judgment — do not present rulings as in-force.
- Cartel/kiosk + review-status WhatsApp ('Am I in Review?') are the modern way to check review status.

### 7.2 Unverified (must not be presented as official)
- **SMS "STATUS {ID}" → 32555**: widely documented on secondary sites, **not found on official sassa.gov.za** → mark clearly as unverified / frequently-shared; never cite as official.
- **USSD `*134*7737#`**: largely deprecated for applying; keep only as "limited use / check status" with a verification note.
- **Bank balance USSD codes** (Capitec `*120*3279#`, FNB `*120*321#`, Standard Bank `*130*2626#`): must be re-verified against the bank's current official pages before publishing; otherwise list as "confirm your bank's current code in your banking app" with no invented codes.
- **GovChat** as a status channel: not listed among official channels → do **not** present as a method; add an anti-misinformation note instead.

### 7.3 Corrections applied this cycle
1. `foster_child_grant_amount_2025` → corrected/sourced (R1,250) or removed.
2. `sassa_gold_card`, `postbank_black_card`, `card_replacement_cost` → re-sourced (Postbank), re-framed post-deadline, `confidence` upgraded or explicitly retained as policy-noted.
3. Terms that claim **only one** official WhatsApp number corrected (two channels).
4. `srd.sassa.gov.za` / `services.sassa.gov.za` / `sassa.gov.za` / `srd-appeals.dsd.gov.za` added to canonical facts (portal taxonomy).

## 8. Gap classification (per brief A–F)

| Class | Count | Meaning |
|---|---|---|
| A — already authoritative & current | many | Statuses, decline reasons, payment fixes, scams, card migration |
| B — covered, needs strengthening/correction | 6 | sassa-whatsapp, ussd-codes, moya-app-sassa, review cluster, how-much-is-srd-grant, srd-r370-grant |
| C — covered, needs freshness/verification | 3 | payment-calendar, dates pages, province hubs (data only) |
| D — genuine content gap → **create this cycle** | 6 | official-portal guide, SRD reapplication guide, balance-check guide, +2 status meanings, +2 dated updates |
| E — rejected (no evidence worth covering from official source) | 3 | GovChat-as-method, SMS-32555-as-official, UIF/NSFAS/FLISP/RDP off-core pages |
| F — rejected (already covered, would cannibalise) | 2 | "srd r350 status check" page (amount page handles it), another "status check" method variation |

## 9. Next steps (confirmed in execution plan)

1. Write this audit (done). 2. Apply §7.3 data corrections. 3. Create D-class content. 4. Apply B-class rewrites/strengthening. 5. Add status entries. 6. Consolidate (§5.1, §5.4). 7. Province audit/depth. 8. Write the execution report. 9. Build + typecheck. 10. Quality gate (no-AI-slop/humanizer + AdSense).

Full details of what changed and the AdSense gate results are in `docs/TOPIC_GAP_EXECUTION_REPORT.md`.