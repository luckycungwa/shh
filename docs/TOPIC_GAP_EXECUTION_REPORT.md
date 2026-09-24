# SASSA Help Hub - Topic-Gap Execution Report (Phase 0-1)

Status: **Complete** · Execution window: **2026-09-18** · Domain: `sassahelphub.co.za`

This is the execution report that closes the loop on `docs/TOPIC_GAP_AUDIT.md` (Phase 0). It records the actions taken against every audit finding, the content created, the facts re-verified, and the gate results. Steps map to the audit's "Next steps (confirmed in execution plan)" section.

---

## 1. What was executed

| Step | Audit item | Status |
|---|---|---|
| 1 | Write the topic-gap audit | Done -> `docs/TOPIC_GAP_AUDIT.md` |
| 2 | Apply Section 7.3 data corrections | Done and re-verified (see 2) |
| 3 | Create D-class content (6 items) | Done (see 3) |
| 4 | Apply B-class rewrites and strengthening (6 items) | Done (see 4) |
| 5 | Add status meanings | Done (2 added) |
| 6 | Consolidate appeals and funeral-cover pair (Sections 5.1, 5.4) | Done (see 5) |
| 7 | Province audit and depth check | Done (see 6) |
| 8 | Write this execution report | Done |
| 9 | Production build + typecheck | Result in `src/app` (see 7) |
| 10 | No-AI-slop/humanizer + AdSense quality gate | Result in `docs/ADSENSE_READINESS_AUDIT.md` (see 8) |

## 2. Fact corrections (audit Section 7.3) - verified in place

Re-checked `public/data/canonical-facts.json` on completion:

- `foster_child_grant_amount_2025` -> **R1,250**, confidence `confirmed`, sourced to `gov.za` (Foster Child Grant service page).
- `sassa_gold_card` -> phased out; gold cards stopped working **31 August 2026**; payments continue into the account, accessed with the Postbank Black Card. Sourced to the gov.za media statement.
- `postbank_black_card` -> free, works immediately, no office visit or forms, balance carries over; available at Shoprite, Checkers, Usave, Pick n Pay, Boxer, Spar sites that remained open after the deadline; **locate a site with `*120*355#`**.
- `card_replacement_cost` -> **free**, including after the deadline; ID or temporary ID required; any payment demand is a scam.
- `srd_grant_amount` R370, `srd_income_limit` R624, `srd_extension_date` 31 March 2027 - all `confirmed` with sources.

The "deadline framing" the audit flagged was corrected: `update-2026-033`, `lost-sassa-card-or-id`, `ussd-codes`, and province copy now present the migration as continuing post-deadline rather than expiring.

## 3. D-class gaps created (6 items)

Status meaning additions (`status-meanings.json`, 20 -> 22):

- `self-exclusion` - "Self-Exclusion Response Found" meaning, database checks, 90-day appeal.
- `application-not-found` - what the status means, check the applied-with number and ID, reapply path, SIM-swap in-person case.

Guides (`guides.json`, 39 -> 42):

- `official-sassa-portal-guide` - the four official surfaces (sassa.gov.za, srd.sassa.gov.za, services.sassa.gov.za, srd-appeals.dsd.gov.za) and phishing lookalikes.
- `srd-reapplication` - when reapplication is genuinely required (lapsed / "Reapplication Pending" / timed out) vs. a monthly decline, which is an appeal matter.
- `sassa-balance-check` - verified balance-check channels (Postbank SMS `BAL` to 32302, bank USSD codes with verification caveats, WhatsApp, helpline) and scam warnings.

Dated updates (`updates.json`, 26 -> 28):

- `update-2026-sassa-digital-services` - 18 Sep 2026 SASSA digital-services breakout: WhatsApp channels (SRD, grant enquiries, review-status), office kiosks, free Wi-Fi, app in planning, advanced kiosks targeted 2027/28.
- `update-2026-srd-court-sca` - SCA hearing 25 Aug 2026, judgment reserved. High Court Jan 2025 finding (online-only application, R624 threshold, R370 amount) presented as the ruling under appeal, **not** as in-force; no value changes.

## 4. B-class rewrites and strengthening (6 items)

- `sassa-whatsapp` - fully rewritten around the **two verified channels** (`082 601 0111` self-service - Social Grants + review/proof-of-life flow; `082 046 8553` SRD line), channel-specific flow tables, Android status check, iOS portal fallback, and the `082-060-1011` / `082-045-1006` scam-number distinction.
- `ussd-codes` - rewritten: `*120*69277#` SRD status (verified), `*120*355#` Postbank site locator (verified), Postbank SMS balance to 32302 (~R1, account number not card number), `*134*7737#` and `*120*3210#` and `*120*69#` explicitly marked **unverified**; no fabricated codes retained.
- Review cluster - `fourth-payment-day-guide` gained a verified "check review status on WhatsApp" step (proof-of-life option, 082 601 0111) plus a matching FAQ; `life-certification` already routes through the same WhatsApp review path.
- `how-much-is-srd-grant` - new R350 vs R370 FAQ (same grant, renamed in Apr 2024; R350-claim scams), date refreshed.
- `srd-r370-grant` - September payment window **24-30 September (reported, not SASSA-published)** added to the payment-date sections and September FAQ; reapplication section rewritten: decline -> appeal, reapply only when the status requests it, portal-only reapplication, cross-links to `appeal-guide` and `srd-reapplication`.
- `update-2026-033` - rewritten post-deadline: gold cards stopped 31 Aug 2026, replacement still free, `*120*355#` locator, SMS fraud warning.

## 5. Consolidation (audit Sections 5.1, 5.4)

- **Appeals:** kept `/guides/appeal-guide` as the deep how-to and `/appeals/*` as step pages, aligned the hub FAQs with the verified two-step process (reconsideration on srd.sassa.gov.za, then ITSAA within 90 days of the reconsideration outcome), added a reconsideration CTA alongside the ITSAA portal CTA, and linked the deep guide from the hub. `appeal-guide` gained `nextSteps` (deadline calculator, appeals hub, income-source-detected appeal, reapplication) and a monetization vertical.
- **Funeral-cover pair:** comparison layer (payout vs premium, waiting periods, exclusions) and cost layer (price drivers, quotes) kept as the two distinct search intents; both cross-link each other, both assert SASSA does not require cover and a payout does not affect a grant (verified consistent), both tagged `insurance` vertical. No contradiction found between the pair.

## 6. Province audit

- All **9 province hubs** have regional office + coordinates, >=3 main offices, district offices, district list, retail collection points, `srd_challenges`, and `payment_collection`.
- No stale framing anywhere: zero hits for `gold` (active tense), `r350`, `covid`, `2025`, `green card` across `provinces.json`.
- Provincial copy already routes to verified channels (`*120*69277#`, WhatsApp 082 601 0111) and references the Postbank Black Card.
- Office address/phone data remains flagged as office-listing data (verify-in-office mechanism), consistent with the audit's stance that province hubs carry sourceable local facts only.

## 7. Build and typecheck

`npx tsc --noEmit` and `npx next build` both pass clean. Three defects were found and fixed during the gate:

- `canonical-facts.json`: 13 facts (incl. `sassa_whatsapp_number`, `sassa_whatsapp_srd_number`, `sassa_review_status_whatsapp`, portal URLs, USSD facts, `srd_sca_status`, `srd_sept_2026_payment_window`) were missing the `effective_date` field required by the `FactMap` index signature -> `effective_date` added to all.
- `guides.json`: `appeal-guide` had `monetization: { vertical: "appeal" }`, but `ctaCopyFor` in `src/lib/affiliate.ts` only supports `banking | mobile | education | insurance | finance`, which crashed prerendering of `/guides/appeal-guide` -> invalid vertical removed (appeals carry no affiliate slot).
- Removed the audit line's `/appeals` -> `/guides/appeal-guide` redirect note (already handled in the AdSense pass).

All 253 static routes prerender; new updates, guides, and status pages are generated in the build output.

## 8. Quality gates

- No-AI-slop / humanizer pass performed on all new and rewritten copy (channels, codes, "what to do", scam warnings, dates). Percentage-claims, urgency-guilt nonsense, and invented codes removed. New records (`official-sassa-portal-guide`, `srd-reapplication`, `sassa-balance-check`, the two dated updates, the two status meanings) contain zero em-dash crutches and no generic filler phrases.
- De-slop sweep on indexed legacy updates: removed the formulaic lines "officially released the latest SASSA news 2026", "knowing these dates is crucial for financial planning" (x2), and "Crucially, the Budget confirmed..." from `updates.json` records 001, 004, 014 - factual content untouched.
- AdSense readiness: full checklist in `docs/content-quality-plan.md` and `docs/ADSENSE_READINESS_AUDIT.md`. All 12 required fixes from the AdSense gate are implemented and repo-verified: `tsc --noEmit` clean, `npm run build` success, 253 routes prerendered. Monetisation posture unchanged (no configured affiliate slots, consent-gated ads, `ads.txt` intact). Post-deploy production re-verification remains the owner's step (per audit item B.12).

## 9. Final state (as of 2026-09-18)

- `updates.json`: **28** records (`4` noindex).
- `guides.json`: **42** records.
- `status-meanings.json`: **22** records.
- Two verification surfaces remain intentional: SMS `STATUS {ID}` -> 32555 and GovChat-as-method are recorded as **unverified / not official** and are never published as methods.

All actions in this report were completed against dated 2026 sources (gov.za, sassa.gov.za, srd.sassa.gov.za, srd-appeals.dsd.gov.za, postbank.co.za, treasury.gov.za, plus dated reporting from IOL, EWN, Citizen, Daily Maverick, GroundUp, TimesLIVE, The South African, bizcommunity). No competitor site was used as a source of fact.
---

## 10. Phase 2 - Indexation diagnosis & status-intent fixes (2026-09-22)

Diagnostic (GSC 3-month + live URL inspections) confirmed the **status cluster works but is mostly unindexed**:
- Sitemap is correct (184 URLs; all 22 `/status/[slug]` + 4 `/dates/[month-year]` present). All template routes render HTTP 200 with proper titles/metadata/canonicals.
- Google has indexed only 3 of 22 status pages (`declined`, `appeal-pending` `referred`) and **none** of the `/dates/*` pages; `/status` hub was "URL unknown to Google". Root cause: crawl/indexation priority, not a technical defect.
- Cannibalisation confirmed: `/payment-calendar` (8,083 clicks) absorbs status-intent queries (e.g. `srd status check` pos 12.3, `sassa status check` pos 21.3) that should land on `/status-check`.

Executed in code (build + lint clean):
1. **`/payment-calendar`** - added a "What does each SASSA status mean?" link block deep-linking the `/status` hub + `approved`/`pending`/`paid`/`declined`/`bank-details-pending` (feeds crawl equity from an indexed, high-traffic page into the unindexed cluster).
2. **`/status-check`** - added `/status` hub link card ("What does my status mean?") to the post-check situations grid.
3. **`/payment-calendar` metadata** - retitled to "SASSA Payment Calendar September & October 2026 - SRD R370 & All Grant Dates" with month-fresh meta (601K-impression page, 1.3% CTR).

Out-of-code actions recorded for the site owner:
- Use GSC URL Inspection to **Request Indexing** on `/status` hub + priority status pages (`approved`, `pending`, `bank-details-pending`) and `/dates/september-2026`.
- GSC flags `/guides/bank-details-pending-fix` as 404 - **stale record**; live verification returns 200 (confirmed 2026-09-22).
