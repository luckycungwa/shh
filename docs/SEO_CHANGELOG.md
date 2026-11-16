# SEO changelog

A short record of on-site changes made for search visibility, so future sessions can
see what changed, why, and what the numbers looked like at the time. Nothing here
records a ranking result — only the change made and the evidence behind it.

## 2026-11-16 — /status-check: restore last-known-ranking version (PR 1)

- **Commits:** `33be090` (page restore), `e242a44` (metadata restored byte-for-byte)
- **Reason:** the page lost almost all impressions within 24h of the 12 Nov deploy.
  Restore the page body and the title/description that were live while it ranked,
  without touching anything else.
- **Baseline (Google Search Console, page filter `/status-check`, 3 months):**
  92.6k clicks, 6.31M impressions, average position 9.44. 87.7k of those clicks were
  mobile. ~90% of impressions sat at position 8–10.
- **Burst 1:** 17–30 Aug 2026 (~125k then ~93k weekly impressions), then near zero from
  31 Aug — the day `ba8a9ef` landed (64 files: status-check page, layout, sitemap, navbar).
- **Burst 2:** 17 Oct – 11 Nov 2026 (up to 14.5k clicks/day, 1.0–2.5M weekly impressions,
  position 8–10). Collapse from 12 Nov: impressions 125,865 (11 Nov) → 10,792 → 4,380 →
  617 (14 Nov); average position 9.3 → 19.5. 27 commits landed on 12 Nov, including build
  fixes `a5445ea`, `7dee7f6`, `56769bd`, the title/description rewrite (`8393ef0`,
  `a5b6ade`), and a body restructure from `0df0f16` onward.
- **Confounder:** Google's November 2026 core update started 10 Nov and may run to ~24 Nov.
  The cause is not established; this is a controlled recovery attempt, not a proven fix.
- **Change:**
  - `src/app/status-check/page.tsx` restored to `257830c~1` (the version live before the
    12 Nov commits), including the "Checked your status? Now find your situation." section.
  - Metadata is byte-identical to what was live before 12 Nov. The source strings are
    the original ones, unchanged, with `noTemplate` removed so `clampTitle` +
    the root layout's `%s | SASSA Help Hub` template produce the same strings again
    (verified by building `257830c~1` in a scratch worktree and diffing the bytes).
  - `<title>` — **12 Nov (collapsed):** `SASSA SRD Status Check November 2026 | R370 & Pay Day`
    (53 chars) → **now, as before 12 Nov:** `SASSA SRD Status Check November 2026 | SASSA Help Hub`
    (53 chars; `clampTitle` keeps `SASSA SRD Status Check November 2026` and the layout
    appends the brand).
  - `<meta name="description">` — **12 Nov:** `Check your SASSA SRD R370 status for November
    2026. See what Approved, Pending or Declined means, fix common problems and check your
    Pay Day.` (141) → **now, as before 12 Nov:** `Check your SASSA SRD status for November
    2026 with your ID number. Step-by-step guide for R370 approval, biometrics, bank
    verification, and payment dates.` (154, `clampDescription` drops the final sentence
    "Free independent help." at the sentence boundary).
  - `og:title` / `og:description` also match the pre-12 Nov output (36 and 154 chars).
  - Kept: JSON-LD, `revalidate = 900`, canonical, all data sources (`payment-schedule-forecast.json`),
    and the two NextStepCard links from `001163f` (`/guides/lost-phone-number`,
    `/guides/bank-details-pending-fix` — both verified 200).
- **Not changed:** ads/AdSense, `ads.txt`, `robots.txt`, canonical logic, `middleware.ts`,
  redirects, sitemap logic, and every other page.
- **Verified:** `npm run build` and `npm run lint` pass (0 errors, 85 pre-existing warnings);
  `/status-check` renders the title/description/og strings above byte-for-byte against the
  `257830c~1` build, canonical `https://www.sassahelphub.co.za/status-check`, robots
  `index, follow`; all 44 internal links on the page return 200 with no redirect;
  no month overflows (rendered titles run 48–54 chars, descriptions 149–155).
