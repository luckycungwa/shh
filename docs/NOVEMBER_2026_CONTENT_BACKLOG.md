# November 2026 Content Backlog — Google Trends Analysis (ZA)

**Owner:** Lucky Cungwa · **Created:** 22 October 2026
**Data source:** Google Trends export, South Africa, 15–22 October 2026
**Files:**
- `H:\website assets\searched_with_top-searches_queries_ZA_20261015-1143_20261022-1143.csv`
- `H:\website assets\searched_with_rising-searches_queries_ZA_20261015-1143_20261022-1143.csv`

**Companion documents:** `docs/EDITORIAL_REGISTER.md` (register + publication log),
`docs/TOPIC_COVERAGE_MATRIX.md` (coverage matrix).

**Status 23 October 2026:** P1 #1 implemented on `/payment-calendar` — metadata title, H1, description and a
confirmed November 2026 block with FAQs. P1 #2 implemented on `/status-check` (ID-number steps + FAQ). Dates-page
metadata and readable date tables fixed 23 October. "Approved but no Pay Day" remains P2.

---

## A. What this export can and cannot tell us

| Point | Detail |
|---|---|
| Geography | South Africa only (`ZA`). |
| Window | 15–22 October 2026 — one week, the week the October SRD dates were confirmed. |
| Metric | **Relative search interest, 0–100**, indexed to the top query in the export. It is *not* monthly search volume and cannot be added up across rows. |
| "Increase percent" | Change against the preceding period as reported by Trends; noisy on small bases. |
| "Breakout" | Trends' label for growth above roughly 5,000% from a very small base. It signals *emerging intent*, not large volume. |
| Attribution | Trends does not show which URL ranks. These are demand signals to map onto existing pages, not proof of a ranking problem. |
| Not available | Absolute volumes, clicks, impressions, positions, conversions. Use Search Console for those. |

**Rule applied below:** no new page is proposed where an existing page can serve the intent. Trends demand is a
prioritisation input, not a publishing instruction.

---

## B. Demand clusters (ranked by relative interest)

### B1. Payment dates — the dominant cluster

| Query | Interest | Change |
|---|---|---|
| payment dates for sassa | 100 | −6% |
| sassa payment dates 2026 | 80 | −1% |
| sassa payment dates for 2026 | 66 | −4% |
| sassa payment dates for november 2026 | 53 | −6% |
| sassa payment dates november 2026 | 52 | +2% |
| sassa november payment dates | 51 | +2% |
| sassa payment dates for november | 39 | 0% |
| november payment dates sassa | 38 | +3% |
| sassa payment dates november | 38 | +3% |
| sassa payment dates for october 2026 | 14 | −20% |
| sassa payment dates for october | 14 | −10% |

**Read:** October demand is already falling (the dates have passed); **November demand is rising and now larger
than October's**. The head terms are generic ("payment dates for sassa") and land on `/payment-calendar` or a
`/dates/[month]` page.

### B2. Status-check cluster

| Query | Interest | Change |
|---|---|---|
| sassa payment status check | 55 | +20% |
| status | 54 | — |
| sassa status | 53 | — |
| sassa check status | 53 | — |
| check sassa status | 53 | — |
| sassa status check payment | 52 | — |
| sassa status check | 52 | — |

**Read:** high, stable demand sitting almost entirely on `/status-check` and `/tools/status-explorer`.
The opportunity is depth (ID-number method, approved-without-pay-date), not another page.

### B3. R350 / R370 / SRD cluster

| Query | Interest | Change |
|---|---|---|
| sassa payment dates r350 | 36 | +30% |
| r350 status check | 33 | +20% |
| sassa payment dates for r350 | 33 | +20% |
| sassa status check for r350 payment dates | 32 | +20% |
| srd | 28 | +20% |
| sassa srd payment dates | 28 | +20% |
| r370 payment dates | 20 | +20% |

**Read:** the old "R350" name still carries the demand and is growing faster than the generic terms.
Users are mixing grant name, status check and payment dates in one query. `/grants/srd-r370-grant` and
`/status-check` already cover this; they need the R350 alias and the date/status answer stated plainly.

### B4. Generic grant cluster

| Query | Interest | Change |
|---|---|---|
| sassa grant payment dates | 16 | +50% |
| sassa grant dates | 16 | +40% |
| sassa grant | 16 | +40% |
| grant | 15 | +40% |
| grant payment dates | 14 | +30% |

**Read:** modest volume but the fastest-growing generic group. `/payment-calendar` should be the single
answer; do not build a second generic dates page.

---

## C. Rising queries — intent and what they really mean

| Query | Interest | Change | Intent |
|---|---|---|---|
| sassa festive season payment dates | Breakout | — | December/January dates + festive-season payout expectation. **No official source yet.** |
| moya app sassa 350 status check for r350 payment dates | Breakout | — | App-based status checking via Moya. |
| srd r350 status check if approved but no pay date | 0 | +4,700% | Approved, no Pay Day — the exact anxiety moment. |
| srd r350 status check if approved | — | +300% | Same moment, earlier phrasing. |
| 370 payment date for october 2026 | — | +170% | Date lookup (now answered). |
| sassa status check for srd r370 payment dates october 2026 | 1 | +90% | Combined status + date lookup (now answered). |
| sassa payment dates for july 2026 r370 | 0 | +90% | Historical lookup — archive/evergreen page. |
| 370 status check using id number | — | +80% | **Method** query: "how do I check with only my ID". |
| srd r350 status check payment date | 3 | +70% | Status → pay date. |
| sassa srd r350 status check 2026 | 3 | +60% | Year-qualified status check. |
| sassa status check for r350 payment date | 4 | +50% | Status + date. |
| sassa 370 status check online | 1 | +50% | Channel query (online vs USSD). |
| srd status check using id number | 1 | +40% | **Method** query. |
| sassa payment dates for october 2026 r370 | 2 | +40% | Date lookup (now answered). |
| srd payment dates for october 2026 | 4 | +40% | Date lookup (now answered). |
| sassa payment dates for october 2026 srd | 4 | +40% | Date lookup (now answered). |
| srd october 2026 payment dates | 4 | +30% | Date lookup (now answered). |
| sassa payment dates for may 2026 r370 | 3 | +30% | Historical lookup. |
| sassa may 2026 payment dates | 4 | +20% | Historical lookup. |
| sassa application for r350 apply online | 0 | +20% | Application intent — low absolute base. |
| sassa status check for r350 payment dates for 2023 | — | +30% | **Stale** — old-year query, do not target. |

**Three real opportunities hide in this list:**

1. **"Approved but no pay date"** — +4,700% and +300% are the same user moment. High emotional urgency and low
   competition, and we already own `/status/approved` — but the measured base is only 9 clicks / 153 impressions,
   so this is a P2 visibility fix, not the first move.
2. **"Status check using ID number"** — a *method* question (+80%, +40%), not a page we have answered directly.
3. **"Festive season payment dates"** — Breakout, but **unverifiable today**. It must wait for an official
   December/January announcement; publishing a guessed festive date would break the site's accuracy rule.

---

## D. Mapping to existing pages (avoid cannibalisation)

| Demand cluster | Page that should answer it | Current state | Action |
|---|---|---|---|
| Generic payment dates | `/payment-calendar` | Hub page, confirmed dates, FAQ | Optimise title/H1/FAQ only |
| November dates | `/payment-calendar` (hub) → `/dates/november-2026` | Hub holds the demand but its snippet truncated to "October"; the month page has 0 GSC impressions | **Done 22 Oct:** hub title/H1/description rewritten around November, confirmed block added. **Done 23 Oct:** month-page title/description shortened and readable date tables |
| October dates | `/dates/october-2026`, `update-2026-038` | Now fully confirmed (SRD 22–23 Oct) | No further work this cycle |
| Status check | `/status-check`, `/tools/status-explorer` | Strong; covers status meanings | **Done 23 Oct:** ID-number steps + FAQ added; approved/no-date section left to P2 |
| Approved, no Pay Day | `/status/approved` | Exists, partly covered | Expand the answer at the top of the page |
| R350/R370 alias + dates | `/grants/srd-r370-grant` | Refreshed 22 Oct | Add "R350 is now R370" once, plus date/status answer |
| Moya app | `/guides/moya-app-sassa` | Exists | Add a payment-dates/status section |
| Historical months | `/dates/may-2026`, `/dates/july-2026` | Exist | Verify accuracy + indexability only |
| Festive season | `/payment-calendar` + `/dates/december-2026` | No official source yet | **Hold** until SASSA/DSD announces |

---

## E. Prioritised November 2026 backlog

### P1 — do first

| # | Opportunity | Target page(s) | Why now | Guardrail |
|---|---|---|---|---|
| 1 | Win "November payment dates" | `/payment-calendar` first, then `/dates/november-2026` | Hub has 677,533 impressions at 1.30% CTR; month page has 0 impressions, so the hub must answer first | **Done 22 Oct** on the hub. Do not restate SRD as confirmed — it is still TBA |
| 2 | Answer "status check using ID number" | `/status-check` only | **Done 23 Oct 2026.** Method query growing +80% / +40%; page ranks around position 13 | Exact steps + what each result means; no third-party portals. `/tools/status-explorer` unchanged — it is a meaning lookup with 0 impressions |
| 3 | Festive-season dates (conditional) | `/payment-calendar`, `/dates/december-2026` | Breakout demand | **Only after** an official announcement; December SRD is still TBA, so no page change |

### P2 — next

| # | Opportunity | Target page(s) | Why now |
|---|---|---|---|
| 4 | Answer "approved but no Pay Day" | `/status/approved` | High intent (+4,700% / +300%) but a small measured base — 9 clicks / 153 impressions — so it follows the visibility work |
| 5 | Generic "SASSA grant payment dates" | `/payment-calendar` | Fastest-growing generic cluster (+30% to +50%); served by the 22 Oct hub rewrite |
| 6 | Moya app status/date checking | `/guides/moya-app-sassa` | Breakout query combining app + status + dates |
| 7 | R350 vs R370 clarity | `/grants/srd-r370-grant`, `/status-check` | R350 terms grow faster (+20% to +30%) than R370 |

### P3 — backlog / monitoring

| # | Opportunity | Target page(s) | Note |
|---|---|---|---|
| 8 | Historical May/July 2026 lookups | `/dates/may-2026`, `/dates/july-2026` | Verify accuracy; keep indexed only if the content is genuinely useful |

### Do not build

- A new October SRD article — `update-2026-038` now serves it.
- A new generic "SASSA payment dates 2026" page — `/payment-calendar` is the hub.
- A new status-check article — `/status-check` and `/tools/status-explorer` already rank for the cluster.
- A new "approved but no pay date" article — expand `/status/approved` instead.
- A new Moya app article — extend the existing guide.
- Anything targeting "R350 payment dates for 2023" — stale intent.

### Measurement

Judge these changes in Search Console (queries + pages), not in Trends. Trends only told us where to look;
it cannot tell us whether the page won. Re-run the export in mid-November to see whether the November cluster
holds and whether "festive season" becomes answerable.
