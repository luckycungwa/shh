# SASSA Help Hub — Google Policy, AdSense & Indexing Safety Checklist

**Purpose:** A single source of truth for keeping the site protected against Google Search spam/manual actions and AdSense strikes, and for tracking a clean path to AdSense re-approval. Follow from top to bottom.

**Audit date:** 2026-08-31 (initial). **Prior AdSense outcome:** "low value content" rejection — see `audit/adsense-readiness-report.md` (final readiness gate).

---

## 0. Golden rules (never break)

1. **Never fabricate statistics** (grant declines, billion-rand figures, success rates, beneficiary counts). If a number isn't attributable to an official source (Treasury, DSD/SASSA, gov.za), it must be marked "projected / not yet verified" or removed.
2. **Never invent credentials or editorial-process claims** ("expert", "specialist", "peer-reviewed team"). Identity = **"SASSA Help Hub Editorial Team"**, and always say *independent & unofficial*.
3. **Never copy content** from official sources verbatim at scale (scraping = duplicate content risk).
4. **Never bulk-generate thin pages.** A small number of high-quality, interlinked pages beats 1,000 thin ones.
5. **No hidden/injected ads.** Only Google Auto Ads (approved account) — keep `effectivecpm` disabled until after AdSense approval.
6. **Disclose monetization.** No sponsored or paid promotional content without a clear label.
7. **Mark unverified facts in the UI** (amber "not independently verified" callout) rather than deleting important info.

---

## 1. Pre-AdSense-application gate (current state)

Track with [x] — all must be true before (re)applying:

- [ ] **Deploy the exact verified build.** No uncommitted/un-deployed changes that alter indexable URLs.
  - Last verified: live sitemap should be **104 URLs** (matches `audit/build-inventory.mjs`).
  - Live check 2026-08-31: sitemap = **106 URLs**; several of the newest verified pages are NOT live and return 404:
    - `/search`, `/banking`, `/dates/*`, `/sassa-contact`, `/how-much-is-srd-grant`, `/lost-sassa-card-or-id`, `/sassa-retail-collection-points`
  - Action: commit + deploy the full current working tree, then re-verify.
- [ ] **Confirm all merged/removed URLs 301** (not 200). Verified live OK 2026-08-31:
  - `/updates/update-2026-030` → `/guides/grant-verification-process`
  - `/guides/srd-grant` → `/grants/srd-r370-grant`
  - `/guides/change-banking-details` → `/guides/bank-details-pending-fix`
  - `/updates/update-2026-009` → `/updates`
- [ ] **Noindex/thin pages** are excluded from the sitemap (updates `023/024/029`, merged slugs, province thin pages).
- [ ] **No fabricated stats / fake personas** in `public/data/` and `src/` (sweep clean as of 2026-08-31; residual risk only in the non-served `public/content-plan/2026-07-media-brief.md`).
- [ ] **`/authors` uses the Editorial Team byline** (was "Founder & Editor" persona — fixed 2026-08-31).
- [ ] **ads.txt** correct: `google.com, pub-8180440849942257, DIRECT, f08c47fec0942fa0`.
- [ ] **GA4/consent**: analytics + ad personalization denied by default until user grants consent.
- [ ] **14-day fresh-index window** with **no content edits** immediately before applying.

---

## 2. Search Console operations (owner access required)

- [ ] Confirm domain property `https://www.sassahelphub.co.za` (www) is verified.
- [ ] Submit the cleaned `sitemap.xml` (104 URLs).
- [ ] Run **Page indexing** (URL inspection) on all new URLs after deploy.
- [ ] Monitor **Index coverage** for "Soft 404"/"Page with redirect" spikes.
- [ ] Use **"Removals"** only where absolutely required; prefer `noindex`/301 for durable fixes.
- [ ] Watch **"Crawl requests"** — large jumps after a deploy are normal; sustained thousands/day can indicate a crawl trap (verify no 404 loops).

---

## 3. Google Search spam / ranking protection

| Risk | Guard |
|---|---|
| Fabricated stats reappearing | Enforce golden rules §0.1; page-level `unverified` gating |
| Thin/programmatic pages | Review each new page for unique value; never bulk-generate |
| Doorway / redirect abuse | All redirects are explicit, mapped, tested; no SEO-only doorway pages |
| Duplicate content (scraping) | Write original copy; cite + link official sources, don't copy |
| Cloaking / scaled content abuse | Static Next.js pages; no hidden text; no user-agent serving |
| Manual action | Keep the E-E-A-T page set intact (`/about`, `/authors`, editorial & sources policies) and truthful |
| YMYL (grant/finance) inaccuracy | Confirm amounts from `canonical-facts.json` (authoritative sources); mark unverified |

---

## 4. AdSense program-policy checks (before/after approval)

- [ ] **No prohibited content**: no gambling/fraud-encouraging content served with ads. AdSense-safe.
- [ ] **No invalid traffic**: no click-manipulation, no pop-unders, no hidden ad iframes. `effectivecpm` stays disabled until approved.
- [ ] **Ad placement**: Auto Ads only; do not place ads that obscure content/navigation (CLS-safe).
- [ ] **Sensitive pages** (`/scam-alert`, fraud/missing-payment pages): consider per-page ad blocking during early warm-up to avoid perception of monetizing fraud topics.
- [ ] **Disclosure**: no paid/sponsored articles without an explicit label.
- [ ] **`google-adsense-account` meta + `ads.txt`** must remain present (already set).

---

## 5. When a Google action strikes (recovery plan)

1. **Do not edit or hide pages in panic.** Log into Search Console and read the exact manual-action message.
2. **Identify the affected sample** (URLs listed).
3. **Remove or fix the offending content** per the specific policy (usually unverifiable stats/claims or thin pages).
4. **Request review** from Search Console once fixed — actions are reviewable.
5. **For AdSense**: fix the policy breach, wait the fresh-index window, then re-apply. Contact AdSense support with a clear, factual explanation.
6. Never delete the whole site in response — that erases valuable history and can hurt long-term recovery.

---

## 6. Routine maintenance cadence

- **Weekly:** re-verify sitemap URL count matches the built inventory; keep `canonical-facts.json` amounts current; update `payment-schedule-forecast.json` `lastVerified` when SASSA announces.
- **Monthly:** re-sweep for fabricated stats/personas across `public/data/` + `src/`; check Search Console for index coverage anomalies.
- **After any AdSense-approval milestone:** re-run §1 gate and enable `effectivecpm` only after a 30–60 day clean period.

---

*This file is a living checklist — update statuses as work completes. It is not a guarantee of approval or immunity; it encodes the site's own published policies and the readiness report's findings.*
