# SASSA Help Hub — Master Search Opportunity & Gap Audit

Site: https://www.sassahelphub.co.za/ · Repo: `H:\2026\SHH\shh`
Audit opened: **2026-10-16** · Phase 1 (inventory): **complete** · Phases 3–8: **awaiting queries**
Gate: do **not** run the comparative audit until the instruction `ALL QUERIES SUBMITTED — RUN THE AUDIT`.

---

## 0. Status at a glance
| Phase | State |
|---|---|
| 1 — Inventory the actual site | ✅ Done → `sassa-site-inventory.md` |
| 2 — Ingest search queries | 🟡 2 batches received (100 rows) → `sassa-query-inventory.csv`; awaiting further batches / gate |
| 3 — Compare queries vs content | ⏳ Blocked on Phase 2 |
| 4 — Competitor / results gap | ⏳ Blocked on Phase 2 |
| 5 — Topic & journey gaps | 🟡 Seeded → `sassa-topic-and-user-journey-map.md` |
| 6 — Freshness / factual audit | 🟡 Started → `sassa-technical-and-factual-issues.md` |
| 7 — Prioritisation | ⏳ Blocked on Phase 2 |
| 8 — Opportunity register | 🟡 Header ready → `sassa-search-opportunity-register.csv` |
| 9 — Implementation (read-only → approved) | ⏳ Not started |

## 1. Deliverables (this folder)
| File | Purpose | State |
|---|---|---|
| `sassa-site-inventory.md` | Verified inventory of the real site/repo | ✅ |
| `sassa-query-inventory.csv` | Cumulative query intake (preserves original wording) | 🟡 100 rows |
| `sassa-search-opportunity-register.csv` | Actionable opportunity register | 🟡 empty |
| `sassa-topic-and-user-journey-map.md` | Topic map + user journeys to real URLs | 🟡 seeded |
| `sassa-technical-and-factual-issues.md` | Technical + factual defect worklist | 🟡 started |
| `sassa-ai-citation-analysis.md` | Item-1: AI-citation/GEO takeaways mapped to real URLs | ✅ |
| `sassa-search-opportunity-audit.md` | This master, decision-oriented doc | 🟡 live |

Related pre-existing docs (reused, not duplicated): `docs/TOPIC_GAP_AUDIT.md`,
`docs/TOPIC_COVERAGE_MATRIX.md`, `docs/INDEXABLE_PAGE_QUALITY_AUDIT.md`, `docs/content-quality-plan.md`.

---

## 2. Scope and guardrails
**In scope:** identify every realistic opportunity to cover SASSA search intent better — satisfied,
under-served, missing, mis-targeted, cannibalised, technical, freshness, seasonal/current.
**Out of scope (Phase 9 read-only):** publishing, deploying, changing live payment dates, editing
canonicals/robots, deleting/renaming/redirecting URLs, mass rewrites, paid services, new backend,
near-duplicate page generation, fabricated claims or invented verification dates.

**Honesty rules applied throughout:**
- No invented search volumes, keyword difficulty, rankings, CTRs or competitor weaknesses.
- Google related-query lists reveal *topic relationships*, not *measured demand* — labelled as hypotheses.
- Official SASSA/DSD/PMG sources validate policy; competitor pages only inform intent/coverage.
- Classifications without metrics are marked **qualitative / hypothesis**.

---

## 3. Phase 2 — Query intake protocol
- The user supplied queries ("People who searched for Sassa also searched for…") arrive in one or more batches.
- **Batch rule:** on each batch → append to `sassa-query-inventory.csv`, keep originals verbatim,
  update running counts here; **do not** rebuild the full analysis between batches.
- Only after `ALL QUERIES SUBMITTED — RUN THE AUDIT` → run Phases 3–8 over the complete inventory.
- If a batch cannot be persisted to the repo, this doc will say so explicitly rather than imply success.

**Query taxonomy:** A–Y groups as specified in the brief (general; SRD eligibility; SRD status;
SRD dates; permanent-grant dates; each grant; amounts; applications; appeals; suspended/reviewed;
banking; lost phone; OTP/biometrics; fraud; offices/contact; online/USSD; news/policy; FAQ/edge;
emerging). Queries are not forced into the wrong group; ambiguity is recorded.

**Per-query fields** (columns in `sassa-query-inventory.csv`): original query · normalised query ·
topic/entity · intent · grant/service · user problem/outcome · urgency/seasonality · event class
(current/recurring/evergreen) · existing site URL · competitor URLs · evidence source · collection
date · metrics-available? · preliminary classification · next action.

**Batch log** (running):
| # | Received | Source | Rows | Window | Notes |
|---|---|---|---|---|---|
| 1 | 2026-10-16 | `searched_with_top-searches_queries_ZA_20260916-1704_20261016-1704.csv` | 50 | 16 Sep–16 Oct 2026 | Relative interest index + % change. Dominated by status-check + SRD. |
| 2 | 2026-10-16 | `searched_with_rising-searches_queries_ZA_20260916-1704_20261016-1704.csv` | 50 | 16 Sep–16 Oct 2026 | Relative interest + increase % (incl. Breakout). Dominated by Oct/Nov payment-date + reviews/suspensions + news. |

**Running totals:** 100 rows ingested · **duplicates across batches:** `sassa october 2026`, `sassa dates october 2026` (both preserved verbatim, flagged in-row). No absolute volume/difficulty/ranking data supplied. **Not yet analysed** (Phases 3–8 pending the gate).

---

## 4. Phase 7 — Prioritisation model (documented now, scored later)
100-point model — a **prioritisation aid, not a predicted ranking score**:
- Search-demand evidence — 0–25
- User need & practical usefulness — 0–20
- Relevance to SASSA Help Hub — 0–15
- Evidence of an under-served intent — 0–15
- Strategic fit (existing content + internal links) — 0–10
- Timeliness / seasonality — 0–10
- Confidence in available evidence — 0–5

Where demand data is missing, uncertainty is recorded and guesses are **not** treated as measured demand.
Separately flagged: critical factual/technical defects (scored irrespective of points); low-cost/high-value
quick wins; opportunities dependent on official announcements; items needing more evidence;
low-priority/speculative; and **do-not-pursue** topics.

Horizons: **Immediate** (corrections, existing-page improvements, high-confidence gaps) ·
**Near-term** (new pages, tools, clusters, internal links) · **Longer-term** (broader coverage,
advanced tools, evidence-dependent). Effort: **S / M / L**, with dependencies recorded.

---

## 5. Findings (populated after the audit gate)
### A. 10 most important actions to take next
_Pending — Phase 8._

### B. Existing pages to improve first
_Seeded candidates from Phase 1 (to be scored against queries):_ `/guides/apply-child-support-grant`
(formerly `guide-001` — re-slugged + 301, 2026-10-16), `/dates/*` (confirmed-vs-projected clarity),
`status/under-review` + `status/suspended` (timeline consistency), `layout.tsx` Organization schema (entity/GEO).

### C. New pages that are genuinely justified
_Pending — each must carry a search-intent justification and a defined architectural role._

### D. Topics we should NOT create separate pages for
_Pending — e.g. minor wording variants; anything redundant with an existing strong page._

### E. Biggest technical or factual risks
See `sassa-technical-and-factual-issues.md` → FACT-01 (dead stale date files), FACT-02 (`/dates`
past + projected), FACT-03 (review timeline consistency), TECH-01 (✅ resolved — `guide-001`
re-slugged), TECH-06 (scam data split).

### F. Additional evidence needed to improve confidence
- Actual demand/volume/trend data for the supplied queries (none available in-repo).
- Live SERP inspection for the top clusters (Phase 4).
- Owner confirmation on the open questions in `sassa-technical-and-factual-issues.md` §D.

### G. Exact next steps to approve
1. Supply any further batches of related queries (Phase 2), then send the gate instruction.
2. ~~Confirm whether `guide-001` is intentionally distinct from `child-support-grant`.~~ **Done:** re-slugged to `apply-child-support-grant` + 301 (2026-10-16).
3. Confirm `i18n/*` is parked vs planned (affects multilingual roadmap).
4. (Item 1 of the request) Article received → analysis in `sassa-ai-citation-analysis.md`.

---

## 6. Coverage limitations & sources
- Inventory from repo source + live `robots.txt`/`sitemap.xml` fetched 2026-10-16; no crawl-tool quota used.
- No third-party SEO metrics consumed; all metric claims deferred to supplied evidence.
- Official-source set for verification: SASSA (sassa.gov.za), DSD, PMG (parliamentary replies),
  gov.za gazettes; these validate policy only.
