# Core Page Final Review — SASSA Help Hub

**Date:** 2026-08-10
**Scope:** Walk through the pages that determine first impression, trust (E-E-A-T), and AdSense suitability: home, about, authors, contact, the three policies (fact-checking, sources, corrections), scam-alert, resources, and the grant pillars. Part of phase 5 of the AdSense readiness gate.

## Method

- For each page: read rendered content, check for (1) false/precise-inventing claims, (2) missing honesty disclosures, (3) thinness, (4) orphan/broken links, (5) missing trust signals.
- Claim hygiene was validated repo-wide by a separate stat sweep (see `merge-completion-report.md` §"Related integrity fixes" and the phase-5 scan results).

## Verdict per page

| Page | Score (inventory) | Review outcome | Notes |
|---|---|---|---|
| `/` (home) | KEEP | ✅ Pass | Clear unofficial-helper positioning, links to pillars + scam alert; no fabricated claims. |
| `/about` | KEEP | ✅ Pass | Purpose, funding disclosure, official-help disclaimer present. |
| `/authors` | 57 (IMPROVE) | ✅ Pass | Author identity + "Independent Grant Researcher" ethos documented; Editorial byline fixed site-wide. Optional B: add credentials/verification links. |
| `/contact` | 21 (IMPROVE) | ✅ Pass | Honest channel (support@sassahelphub.co.za), bot protections (honeypot + 3s rate-limit), redirects official matters to SASSA 0800 60 10 11. Low word count is fine for a utility page. |
| `/fact-checking-policy` | 53 | ✅ Pass | Methodology, verification levels, correction timeline documented — key E-E-A-T signal. |
| `/sources-policy` | 58 | ✅ Pass | Names primary sources (sassa.gov.za, dsd.gov.za, National Treasury Budget, courts). |
| `/corrections-policy` | 53 | ✅ Pass | Correction + retraction workflow documented. |
| `/scam-alert` | 46 | ✅ Pass (upgraded) | Now includes "How to Report SASSA Fraud" — hotline 0800 60 10 11, SASSA office, SAPS, anonymous channels; retains the official WhatsApp/report-identity-fraud guidance. |
| `/resources` | 56 | ✅ Pass | Curated official source list; no invented content. |
| `/sassa-offices` | 52 | ✅ Pass (upgraded) | Beneficiary-count claim softened ("several million"); office directory + provinces remain the single canonical office source of truth after the 14 merges. |
| Grant pillars (8) | 70–83 | ✅ Pass (upgraded) | Every `{{template}}` var now resolves; a canonical "Official Sources" card + amber "not independently verified" callout now appear whenever a `needs_human_review` fact is used on the page. |
| `/status-check` + decline-reason pages | 38–59 | ✅ Pass | Status meanings and all 8 decline reasons use honest, actionable guidance; no success/approval rates remain; distribution stats in the umbrella update (028) removed. |

## Issues found and fixed during this review

1. **`update-2026-028`** carried unsourced decline-reason allocations ("~15% / ~10% / ~8% / ~5% / ~3% / ~2% of declines") → replaced with hedged, honest descriptions ("a very common decline reason", "common", "rare").
2. **`update-2026-003`** summary claimed checking status is "the most frequent action performed by millions … every month" → replaced with honest framing ("something most applicants need to do regularly").
3. **`/sassa-offices`** claimed "over 7 million social grant recipients" in Gauteng → softened to "several million".
4. **guides SRD FAQ** stated "The 2026 Budget confirmed … permanent grants received a 3.6% increase" → replaced with "grant amounts are adjusted annually — confirm current rates" guidance (removes an unverifiable static claim).
5. **elife FAQ** "status updates within 24 hours" → hedged ("usually … within 24 hours").
6. **Grant pages** — templates were leaking (raw `{{srd_amount}}`) and confidence status was invisible; verified-fact callout + sources card now close the gap (phase 3 gating).

## Re-check after fixes

- `npm run build` → **compiled successfully**.
- Claim sweep re-run → remaining matches are benign (R370 argument arithmetic, the legal 33.3% deduction cap, "up to 11%" savings-rate ad copy, and R370 amount matches).

## Residual (no AdSense blocker)

- `best-bank-accounts-…` / `bank-details-pending-fix` quote specific bank fees (R1 SMS, R10/month, R0 fee). These are current, promotional-but-hedged marketing figures; flagged Category B — add "fees change — confirm with the bank" copy when next edited.
- Province pages are template-thin by design (office lookup intent) but carry no fabricated figures; Case B for richer intros over time.

## Conclusion

Core trust and money pages satisfy the honesty/accuracy bar. No Core Web Vitals or ad-placement hazards observed. Remaining IMPROVE work is quality polish (Category B), not correctness (Category A).