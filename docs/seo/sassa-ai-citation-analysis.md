# SASSA Help Hub — AI Citation / GEO Analysis

Source article: **"Why ChatGPT Cites One Page Over Another (Study of 1.4M Prompts)"**, Ahrefs, Louise Linehan (reviewed by Ryan Law), 15 Apr 2026 — https://ahrefs.com/blog/why-chatgpt-cites-pages/
Analysis date: **2026-10-16** · Site: https://www.sassahelphub.co.za/

> Scope note: this translates a third-party study's findings into **concrete, small, on-brand changes** for our
> site. It uses no invented metrics. It is a strategy appendix to the master audit
> (`sassa-search-opportunity-audit.md`); it is **not** an instruction to publish anything yet (Phase 9 is read-only).

---

## 1. What the study found (as reported)

| Finding | Reported figure | Why it matters to us |
|---|---|---|
| ChatGPT cites only about half of the URLs it retrieves | **49.98% cited** of ~23.4M vs 23.4M not cited | Being retrieved is not enough; a *gatekeeping layer* decides. |
| The `ref_type` (retrieval channel) hierarchy | **search 88.46%** citation rate · news 12.01% · reddit 1.93% · youtube 0.51% · academia 0.40% | ~88% of cited URLs come from the general **search** index — **you must rank to be in the pool**. |
| Reddit's role | **67.8%** of non-cited URLs are Reddit; cited at just 1.93% | Reddit shapes what ChatGPT **understands**, but is almost never given the citation. |
| Snippet / publication-date fields | Not a usable signal (differences were a composition artifact) | Don't chase "snippet" or "pub-date" tricks. |
| **Title ↔ fan-out-query relevance** | prompt-vs-cited-title **0.602** vs non-cited **0.484**; fan-out max-match **0.656** | Titles must match the **sub-questions** ChatGPT generates, not just the seed prompt. |
| **Natural-language URL slugs** | **89.78%** citation rate vs **81.11%** without | Descriptive slugs beat opaque ones. |
| Page age | median cited page **~500 days**; non-cited pages overwhelmingly very young | Within a retrieval set, **established** pages get cited over the freshest — but **relevance does the heavy lifting**. |
| Freshness, for **news** | cited news pages skew younger (~200 vs ~300 days) | For time-sensitive queries, recency is the tie-breaker. |

Reported conclusion: *"the pages that get cited are the ones whose titles and content match the questions
ChatGPT is asking behind the scenes, and that surface through the right retrieval channel."*

---

## 2. What this means for us — six levers

### L1. Rank in the search index (the pool) — highest leverage
88.46% of citations come from the search channel. Everything the master audit does (mapping queries → existing
pages, fixing thin/cannibalised pages, internal links) is the prerequisite. **No GEO trick substitutes for ranking.**
- Keep 194 sitemap URLs clean; **submit new/updated pages** (IndexNow is available in-repo) so search engines recrawl fast.
- Ensure the **status-check + SRD + payment-date** clusters (the top of our query inventory) each resolve to one strong page.

### L2. Make titles, H1s and meta descriptions read like the sub-questions
The strongest *content* signal is title↔fan-out relevance. Turn each page's title/H1/description into the
natural-language question it answers. Examples (wording illustrative, not yet published):
- `/status/under-review` → title/H1 around *"What does 'under review' mean on my SASSA status — and what do I do?"*
- `/status/suspended` → *"My SASSA grant is suspended — how do I get it restored?"*
- SRD page → *"How do I check my SRD R370 status?"* and *"When is SRD paid in November 2026?"*
- Meta description = a one-sentence **answer** (it is one of the gatekeeping fields).
- The query inventory (`sassa-query-inventory.csv`) **is** the fan-out question set — score each page against it in Phases 3–8.

### L3. Fix non-natural-language slugs
NL slugs cite at 89.78% vs 81.11%. Our one opaque slug was **`/guides/guide-001`** (TECH-01).
**Done (2026-10-16):** re-slugged to **`/guides/apply-child-support-grant`** with a permanent 301 —
done **once**, accepting the one-time age reset (see L4). A scan found no other opaque guide slugs.

### L4. Don't churn pages; keep URLs stable and established
Cited pages skew ~500 days old; the freshest are the most likely to be discarded. Practical rules:
- **Preserve URLs.** Every rename/delete resets the age clock for the replacement URL.
- Prefer **updating in place** over creating near-duplicates.
- For the former `guide-001`: **done** (re-slugged + 301) — weigh choice was slug clarity vs. losing accumulated age; accepted once.
- Past-month `/dates/*` pages (e.g. September 2026): **keep** them (historical value) but make historical status explicit rather than deleting (also FACT-02).

### L5. Freshness where it counts — our `/dates/*` and `/updates/*` surface
The rising-searches batch is **dominated by time-sensitive month queries** (October/November 2026 dates,
review/suspension news). For these, recency is the tie-breaker:
- `/dates/october-2026` and `/dates/november-2026` must be **genuinely current** (confirmed dates, and the **revised November pre-election schedule** we already verified).
- Publish/refresh **updates** promptly around official announcements (payment dates, review wave, Auditor-General findings) — this is where a new page *can* win if it matches the sub-questions.

### L6. Entity clarity and third-party representation
- **Schema:** our `Organization` JSON-LD is thin (no `logo`/`sameAs`/`contactPoint`) — strengthen it (also inventory issue). Clear entity signals help the "search" channel resolve us as a source.
- **`llms.txt`** already exists — keep it curated with our best answer pages.
- **Reddit caution/opportunity:** Reddit heavily shapes ChatGPT's *understanding* of SASSA but is rarely cited. Being **accurately represented** there matters for what the AI says about the topic — but this is **advisory and human-only**: participate authentically, never astroturf, never manipulate votes (per the AI-search guidance). We do **not** run this.
- **Methodology caution for our own audit (Phase 4):** any "cited vs non-cited" competitor comparison can be distorted by source composition (the Reddit artifact). Compare like-for-like channels.

---

## 3. Concrete, low-risk actions (candidates for the audit's Phase 8)

| # | Action | Lever | Effort | Risk | Notes |
|---|---|---|---|---|---|
| 1 | Rewrite per-page title/H1/meta to match sub-questions | L2 | M | Low | Do across the top clusters first (status, SRD, dates). |
| 2 | ~~Give `guide-001` a descriptive slug + 301~~ **DONE (2026-10-16)** → `apply-child-support-grant` | L3 | S | Med | One-off; age reset accepted. |
| 3 | Audit every slug for natural-language style | L3 | S | Low | Done — no other opaque slugs. |
| 4 | Keep `/dates/*` and `/updates/*` current; publish on announcements | L5 | ongoing | Low | Already the practice; ensure Nov = revised dates. |
| 5 | Strengthen `Organization` schema (logo/sameAs/contactPoint) | L6 | S | Low | In `layout.tsx` / `schema.ts`. |
| 6 | Keep `llms.txt` curated to answer pages | L6 | S | Low | Static file, manual. |
| 7 | Submit changed URLs via IndexNow | L1 | S | Low | Available in-repo. |
| 8 | Score each page against the query inventory | L2 | M | Low | This is Phases 3–8 — gated. |

**Explicitly NOT recommended:** snippet/pub-date gimmicks (no signal); mass new near-duplicate pages (L4);
Reddit astroturfing (ethics + guidance); deleting past-month date pages (loses age + history).

---

## 4. How item 1 connects to item 2
The article's strongest lever (title/content relevance to **fan-out sub-questions**) is exactly what the
master audit measures: the query inventory is our best available proxy for ChatGPT's sub-questions. So the
audit's Phases 3–8 should, per page, answer: *which fan-out questions does this page already match, and which does it miss?*

## 5. Sources
- Ahrefs study (primary): https://ahrefs.com/blog/why-chatgpt-cites-pages/
- Referenced within it (not independently verified here): Dan Petrovic / Dejan Marketing GPT-search study; David McSweeney (queryburst) on ChatGPT retrieval; Ahrefs freshness study (17M citations).
- Our own infra referenced: `public/llms.txt`, `src/lib/schema.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `next.config.js` (301s).
