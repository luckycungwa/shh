# Human Review Simulation — Google AdSense / Search Quality Rater

**Date:** 2026-08-10
**Assumption:** review of the post-merge build for `https://www.sassahelphub.co.za` against AdSense program policies and Google Search Quality Rater Guidelines (YMYL: social grant/benefit information = "Health or safety / Financial"? Primarily **financial + government services** → high E-E-A-T bar).

## Task 1 — Quick/general query, e.g. "sassa srd grant amount 2026"

Rated page: `/grants/srd-r370-grant`.

- **Intent match:** Query → amount + eligibility + application. Page returns R370, R624 threshold, ages 18–59, date ranges, payment dates, application + appeal paths. **High match.**
- **E-E-A-T signals on page:**
  - Entity/author panel (Lucky Cungwa — independent researcher, unofficial), EditorialFooter with "Fact-checked & last verified", updated date.
  - "Official Sources" card (new) links SASSA/DSD/budget pages.
  - Amber callout when a fact is `needs_human_review` — reviewer sees an honest limit notice instead of a bare unverified number.
  - Disclaimers: this is an unofficial resource; official phone 0800 60 10 11 and sassa.gov.za surfaced repeatedly.
- **Fiendish tests:**
  - "No hidden fabricated precision": no invented beneficiary counts, no success rates, no fake processing times (all swept).
  - No deceptive monetization: AdNetworkLoader is downstream of valuable content; no in-content affiliate pressure observed on grant pages.
- **Score: High / Fully satisfying.**

## Task 2 — YMYL informational, "sassa appeal income source detected"

Rated page: `/decline-reason/income-source-detected`.

- Step-by-step appeal path, bank-statement evidence guidance, ITSAA portal link, prevention tips.
- No "best/worst" fabricated numbers; no guaranteed outcomes.
- Cross-links to guide + FAQ. **High / Fully satisfying.**

## Task 3 — Duplicate/thin sampling (what the policy team audits)

- **Sitemap = 104 pages**, down from 128. Thin templates (province ×9, status meanings ×11) remain but are canonical-intent lookup pages with real office data / genuine Q&A, not scraped filler.
- Template leak removed: no raw `{{…}}` tokens anywhere on the site.
- Merged pages 301 to substantive targets — reviewers see consolidation, not a sprawling site.
- **Result:** site is *smaller and stronger*; this is the pattern Google rewards.

## Task 4 — Monetization / ad placement sanity

- Ads render via `AdNetworkLoader` on article-style pages; none on navigation-only utility pages (contact glossed, login absent entirely).
- Ad slots are below/after meaningful content. No cookies-required gating of content.
- Site has full privacy/terms/cookie disclosures in policy set. **Compliant.**

## Task 5 — Trust & reputation cross-check

- About page discloses unofficial status + purpose; funding model disclosed; contact with real channel + clearly-labeled official hotline redirection.
- No scraped copyrighted text: all policy/grant content is authored prose with citations; office/address data is factual directory data.
- No exchange/negative link schemes observed; no doorway or cloaking (server respects robots; noindex only on flagged legacy items).

## Policy red-flags checklist

| Check | Status |
|---|---|
| Misleading / deceptive content | ✅ none found post-sweep |
| Unsupported claims presented as fact | ✅ residual Category-A items removed |
| User-manipulative page design | ✅ none |
| Repetitive/scraped/spun content | ✅ consolidation removed the last thin duplicates |
| Fake scarcity/countdowns | ✅ none |
| Inappropriate ad density ("content farms") | ✅ ads only on article routes |
| Broken/embedded monetization without content | ✅ AdNetworkLoader requires page content |

## Rater verdict summary

> The site is a focused, honest, unofficial help resource for a high-intent YMYL topic. It shows original authorship, cites primary sources, discloses uncertainty on pages that must, and removed its thin/duplicated/fabricated content. Monetization is modest and clearly secondary to content.

## Gate implication

A rational policy reviewer would approve the *content*. The only remaining correctness step is **engineering**: the code that produces this state (merges, noindex, sitemap 104, redirects) is built locally but **not yet deployed**, so the public site still shows the previous 128-page state. Re-apply is therefore gated on deploy + post-deploy verification (Search Console list ready).