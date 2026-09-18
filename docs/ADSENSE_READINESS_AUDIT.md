# AdSense Readiness Audit — sassahelphub.co.za

**Audit date:** 2026-09-18 (repo state; production not re-crawled)
**Auditor method:** Static inspection of the current codebase (`H:\2026\SHH\shh`). No code changed, no content created.
**Context:** Re-application for Google AdSense after a previous **Low Value Content** rejection.
**Prior internal materials consulted (evidence only, not taken at face value):** `audit/adsense-readiness-report.md`, `docs/google-compliance-checklist.md` (states live sitemap was 106 URLs on 2026-08-31 with newest pages 404ing in production), `content-audit/*` (2026-07-07 and 2026-08-04 crawls — now partially stale vs current data files).

> Every conclusion below cites the exact file/path/URL it is based on. Where production behaviour could not be observed from the repo, this is stated explicitly.

---

## 0. Implementation status (repo verified 2026-09-18 — production NOT yet verified)

All 12 required fixes were implemented in the repo and verified in a local production build (`tsc --noEmit` clean, `npm run build` success, built `sitemap.xml` + rendered robots meta inspected). Status per fix:

| # | Required fix (§18-B) | Status | Evidence |
|---|---|---|---|
| 1 | Contact channel placebo | **FIXED** | `src/app/contact/ContactContent.tsx` — fake `setTimeout` success replaced with `mailto:` compose flow + truthful "nothing is sent automatically" copy and modal; built HTML contains "Send via Email", no "received" claim |
| 2 | Wrong appeals-portal URL (4 places) | **FIXED** | `src/app/tools/appeal-deadline/page.tsx:19,47-48`, `src/app/common-problems/page.tsx:188`, `src/components/tools/PaymentTroubleshooter.tsx:32` → `srd-appeals.dsd.gov.za`; repo-wide grep for `srd.sassa.gov.za/appeals` returns zero live hits |
| 3 | Contradictory appeal windows | **FIXED** | One coherent standard applied everywhere — "up to 90 days, act within the first 30 days" (already the status-check page's formulation): `tools/appeal-deadline` FAQs/header/footer, `AppealDeadlineCalculator.tsx` (now computes 90-day deadline + 30-day recommended date), `PaymentTroubleshooter.tsx`, `StatusMeaningExplorer.tsx`, `tools/status-explorer` FAQ, `common-problems` schema, `updates.json` update-2026-003. Residual grep finds only the intentional recommendation line |
| 4 | Duplicate bank guides | **FIXED** | Kept `/guides/best-bank-accounts-sassa-2026` (7 specific steps, comparison table, 4→5 FAQs); merged loser's sources/nextSteps/monetization/2 relatedLinks/1 distinct FAQ into it; removed `best-bank-accounts-sassa-beneficiaries` from `guides.json` (40→39 guides); 301 added in `next.config.js`; inbound links repointed (`how-to-open-bank-account-sassa-payments` ×2, `grants/srd-r370-grant.json` ×1, `entities.ts:360` simplified). Sitemap + search index update automatically (both read `guides.json`) |
| 5 | Fraud hotline conflict | **FIXED (consensus-aligned)** | `src/app/sassa-contact/page.tsx:41,128`: `0800 701 701` → `0800 60 10 11`. No in-repo authoritative source distinguishes a separate fraud line; aligned to site-wide consensus (40+ occurrences incl. `/scam-alert` fraud page + FAQ-008). Owner should confirm against SASSA's published fraud line post-deploy |
| 6 | FAQ `relatedLinks` `/` targets | **FIXED** | `public/data/faqs.json` (5 answers) → `/status-check` |
| 7 | Stale update links + retired USSD | **FIXED** | `public/data/updates.json`: all `](/)` status links → `/status-check`; `guide-001` mis-target → `/status-check`; `*120*3227#` → `*120*69277#` (matches `src/lib/config.ts` retirement note) |
| 8 | `/scams` canonicalisation | **FIXED** | `src/lib/entities.ts:279,490` → `/scam-alert` (existing 301 in `next.config.js` retained as safety net) |
| 9 | "Tools.ico" nav typo | **FIXED** | `src/components/Layout/Navbar.tsx:118` → "Tools" |
| 10 | `/common-problems` labels/anchors/schema | **FIXED** | "All 10 …" → number-free label; `/faq#scams` → `/faq#fraud-scams`; `src/app/faq/page.tsx` sections now carry slug `id`s + `scroll-mt-24` so all four `/faq#` anchors resolve; schema portal + window aligned per #2/#3 |
| 11 | Reflection-time copy | **FIXED** | Site standard "1 to 3 business days" applied: `PaymentTroubleshooter.tsx` (incl. `<3` threshold + header comment), `StatusMeaningExplorer.tsx` paid action, `tools/payment-troubleshooter` FAQ + footer, `common-problems` desc ("after 3 business days") |
| 12 | Deploy + re-verify | **NEEDS PRODUCTION VERIFICATION** | Owner handles deployment (out of scope for this pass) |

Additional fix applied during implementation (same defect family, Priority 5): removed the legacy `{ source: '/appeals', destination: '/guides/appeal-guide' }` 301 in `next.config.js`, which shadowed the real `/appeals` hub route while the sitemap listed `/appeals` as canonical.

P2 indexation rule — **FIXED** as specified: `src/lib/office-indexation.ts` (`isCuratedOfficeCity`: indexable iff a `public/data/officeCities.json` record exists for the province+city slug) is consumed by (a) `sassa-offices/[province]/[city]` `generateMetadata` (conditional `robots`), and (b) `src/app/sitemap.ts` (only hubs + curated cities emitted). Built-output verification: sitemap 176 URLs (was ~231), 10/10 city URLs curated, 0 redirected URLs present; rendered HTML: 55/55 province-derived city pages `noindex, follow`, 10/10 curated city pages `index, follow`. Hub internal links to city pages intentionally retained for UX; robots governs indexation.

Validation: `tsc --noEmit` clean. `npm run build` success (all routes prerendered). `npm run lint` / flat-config `eslint` not runnable in this environment (pre-existing: `next lint` prompts for setup; `eslint.config.js` references uninstalled `eslint-plugin-react-refresh`) — unchanged by this pass, no new lint risk introduced (no tests exist in repo; none removed).

Non-blocking recommendations (§18-C): **not implemented** (per instruction), still documented for a later pass.

---

## 1. Executive summary

The site is a **Next.js 14 (App Router) statically-generated** independent SASSA information hub with file-based JSON content, strong SEO plumbing (canonicals, sitemap, schema, robots), pervasive independence disclaimers, consent-gated analytics/ads, and a genuinely useful core: 40 long-form guides, 8 grant hubs, 20 status explainers, 12 decline-reason fix guides, 10 banking-method guides, 6 appeal-step guides, 3 interactive client-side tools, and a governed payment-date system with confirmed/projected labelling.

**The previous "Low Value Content" profile is substantially — but not fully — resolved.** The old failure modes (duplicate guide sets, thin guides, broken cross-links, stale facts) have largely been cleaned up since the July/August internal audits. What remains is a **smaller set of concrete defects**, four of which are blocker-grade:

1. **The contact form is a placebo** — `src/app/contact/ContactContent.tsx` shows a "Success! … We have received your message" modal after a 600 ms `setTimeout`; nothing is ever sent (the `@emailjs/browser` dependency in `package.json` is not even imported). A trust/transparency page that deceives users is an AdSense risk.
2. **Wrong official appeals-portal URL in 4 places** — `srd.sassa.gov.za/appeals(/appeal)` is not the ITSAA portal; the correct host used everywhere else is `srd-appeals.dsd.gov.za` (`src/app/tools/appeal-deadline/page.tsx` ×2, `src/app/common-problems/page.tsx` FAQ schema, `src/components/tools/PaymentTroubleshooter.tsx`).
3. **Contradictory appeal-window statements** — "30 days" (tools pages, troubleshooter, status-explorer FAQ, common-problems schema) vs "90 days" (`src/app/appeals/page.tsx`) vs the two-step "30-day reconsideration + 90-day ITSAA appeal" (`public/data/guides.json` → `appeal-guide`). YMYL-adjacent deadline advice must be consistent.
4. **A near-duplicate guide pair** — `/guides/best-bank-accounts-sassa-2026` vs `/guides/best-bank-accounts-sassa-beneficiaries` (near-identical titles/descriptions, same intent).

Secondary required fixes: fraud-hotline number inconsistency (`/sassa-contact` says 0800 701 701, rest of site 0800 60 10 11); stale `/`-root internal links labelled as status-tracking pages; a retired USSD code in an indexed update; `/scams` links that should point at canonical `/scam-alert`; a visible "Tools.ico" nav typo; stale labels/anchors on `/common-problems`; payment-reflection timeframe inconsistency; and — structurally — a **~70-URL programmatic office-city layer** in the sitemap whose province-derived pages are template-thin with explicitly unverified phone numbers.

**Decision: READY AFTER REQUIRED FIXES** (not ready to apply today; ready once the numbered required fixes are deployed and verified — no new content needed).

---

## 2. Current architecture

| Concern | Finding (evidence) |
|---|---|
| Framework | Next.js 14 (`package.json`: `"next": "^14.2.13"`), React 18, TypeScript, Tailwind, `@nextui-org/react` UI kit |
| Routing | App Router file-system routes. 45 `page.tsx` files found under `src/app` (glob `src/app/**/page.tsx`), incl. dynamic `[slug]`/`[id]`/`[month-year]`/`[province]/[city]`/`[step]` segments and `src/app/not-found.tsx` (custom 404 exists) |
| Rendering | Full static generation: every dynamic template implements `generateStaticParams()` reading local JSON (grants, guides, updates, status, decline-reason, banking, appeals, province, dates, sassa-offices). No CMS, no server DB. Content reads use `fs.readFileSync` on `public/data/*.json` at build time |
| Data source / CMS | None external. Content store = `public/data/`: `guides.json` (40 guides), `updates.json` (26 updates), `faqs.json` (54 FAQs), `status-meanings.json` (20), `decline-reasons.json` (12), `banking-methods.json` (10), `appeals.json` (6), `provinces.json` (9, 74 `"town"` entries), `officeCities.json` (10 curated cities), `grants/` (8 files), `resources.json` (10 regional offices), `payment-schedule-forecast.json` (4 future months with governance blocks), `payment-schedule-history.json`, `payments.json`, `paymentDates.json`, `canonical-facts.json`, `scams.json`, `newScams.json`, `scamPrevention.json`, `i18n/{en,zu,xh}.json` (no language switcher found in `Navbar.tsx` — effectively unused) |
| Fact governance | `src/lib/canonical-facts.ts` (`resolveTemplates`) + `public/data/canonical-facts.json`: amounts/thresholds injected via `{{fact_key}}` placeholders so figures are single-sourced. Facts with `confidence: "needs_human_review"` trigger an on-page amber warning (verified in `src/app/grants/[slug]/page.tsx` lines 103–163) |
| Sitemap | `src/app/sitemap.ts` — code-generated from the same JSON + hardcoded grant/province slugs; excludes `noindex` updates, tag `monthly-payment-schedule`, and 16 redirected update IDs. Emits `/province/*` and ~70 `/sassa-offices/*/*` programmatic URLs (see §8) |
| robots.txt | `public/robots.txt`: `Allow: /`, sitemap declared. No disallows |
| Metadata | Per-page `generateMetadata` or `buildMetadata()` (`src/lib/seo.ts`): title, description, self-canonical, OG + Twitter, `robots: index/follow` default; `noindex` honoured per update (`src/app/updates/[id]/page.tsx` line 52) |
| Canonical | Self-referencing canonical on every audited template; no cross-domain canonicals; no canonical chains observed |
| Structured data | `src/lib/schema.ts` + `src/components/JsonLd.tsx`: Article/HowTo/FAQPage/BreadcrumbList/DefinedTermSet/GovernmentOffice/Event-wrapped payment schedule. FAQ schema is used heavily (also where it later causes wrong-URL issues — §10) |
| Internal linking | Three systems: `EntityLinks` hub-funnel block, `NextStepCard` contextual next-steps (data-driven via `src/lib/entities.ts` incl. per-guide/slug maps), and content `relatedLinks`. Strong overall; specific stale targets found (§9) |
| Indexation controls | `noindex` flag on 4 updates (023, 024, 028, 029); 16 legacy update IDs 301-redirected (`next.config.js` lines 65–89 + `sitemap.ts` lines 78–84 exclusion list, both lists match); `/search` route exists but is **not** in the sitemap (correct) |
| Redirects | ~50 entries in `next.config.js` `redirects()`: legacy guide slugs → canonical guides, `/blog/*` → `/updates`, category stubs → `/guides`, `/scams` + `/fraud-prevention` → `/scam-alert`, old grant slugs → new. All sampled destinations exist as routes or data records |
| 404 handling | `src/app/not-found.tsx` exists; unknown slugs call `notFound()` in every dynamic template |
| Analytics / Search Console | GA4 loads only if `NEXT_PUBLIC_GA_ID` set (`layout.tsx` lines 132–152); Search Console verification meta present (`layout.tsx` lines 31–33); consent defaults deny ad/analytics storage until user grants (`layout.tsx` lines 105–125 + `CookieConsent.tsx`) |
| AdSense present? | **Yes — installed, not merely planned.** `layout.tsx` lines 126–131 load `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8180440849942257`; `layout.tsx` line 35 sets `google-adsense-account: ca-pub-8180440849942257`; `public/ads.txt` = `google.com, pub-8180440849942257, DIRECT, f08c47fec0942fa0` |
| Other monetisation | `AdNetworkLoader.tsx` (Adsterra/effectivecpm) is **disabled by default**, gated on `NEXT_PUBLIC_ENABLE_EFFECTIVECPM=true` AND cookie consent (lines 10–11, 32, 43). Affiliate system (`src/lib/affiliate.ts`, `AffiliateCTA.tsx`, `ComparisonTable.tsx`) renders **nothing clickable** unless env-configured URLs exist (placeholder boxes / "—" cells). `.env.example` confirms all affiliate slots blank by policy |
| Generated-content systems | No AI bulk-generation pipeline in the repo. `scripts/` contains `page-quality-audit.mjs` and `rewrite-thin-guides.mjs` (audit/rewrite tooling, not a live generator). `@google/generative-ai` in `package.json` has no observable wired usage in `src/` content paths |

**Production-lag caveat (evidence: `docs/google-compliance-checklist.md` §1):** on 2026-08-31 the live sitemap served **106 URLs** while several repo pages (`/search`, `/banking`, `/dates/*`, `/sassa-contact`, `/how-much-is-srd-grant`, `/lost-sassa-card-or-id`, `/sassa-retail-collection-points`) 404'd in production. The current repo sitemap generates **~225–235 URLs** (§8). The pre-application checklist (§20-G) therefore requires deploy-then-verify; this audit covers repo state.

---

## 3. URL/indexation inventory

### 3.1 Route inventory (from `src/app/**/page.tsx` glob + `sitemap.ts` + data files)

**A. Core utility (9):** `/`, `/status-check`, `/payment-calendar`, `/search` (not in sitemap — correct), `/common-problems`, `/glossary`, `/tools/status-explorer`, `/tools/payment-troubleshooter`, `/tools/appeal-deadline`
**B. Grants (9):** `/grants` + 8 `/grants/*` (`srd-r370-grant`, `old-age-pension`, `child-support-grant`, `disability-grant`, `foster-child-grant`, `care-dependency-grant`, `grant-in-aid`, `war-veterans-grant`)
**C. Status (21):** `/status` + 20 `/status/*` (data-driven from `status-meanings.json`)
**D. Guides (41):** `/guides` + 40 `/guides/*` (data-driven from `guides.json`)
**E. FAQ (1):** `/faq` (single listing of 54 FAQs; no per-FAQ URLs — correct, avoids thin splinter pages)
**F. Updates (~17 indexable):** `/updates` + 26 records, of which 16 legacy IDs redirect, 4 carry `noindex` → **~16 indexed** (`010, 011, 012, 002, 003, 004, 014, 016, 017, 019, 020, 031, 033, 034, 035, 036`)
**G. Scam/security (2 + data):** `/scam-alert` (renders `scams.json`), `/guides/sassa-online-security`; `newScams.json`/`scamPrevention.json` appear unused by the template (dead data or used elsewhere — low risk either way)
**H. Resources/offices (~85):** `/resources` (10 curated offices), `/sassa-offices` (hub), 9 `/sassa-offices/[province]`, ~60–65 `/sassa-offices/[province]/[city]`, 9 `/province/*` guides
**I. Eligibility/tools (2):** `/eligibility-check`, `/how-much-is-srd-grant`
**J. Banking/appeals/dates (22):** `/banking` + 10 `/banking/*`, `/appeals` + 6 `/appeals/*`, `/payment-calendar` + 4 `/dates/*`
**K. Decline reasons (12):** 12 `/decline-reason/*`
**L. Legal/trust (9):** `/about`, `/authors`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/disclaimer`, `/editorial-policy`, `/fact-checking-policy`, `/sources-policy`, `/corrections-policy` (10 incl. corrections)
**M. Other indexed singles (3):** `/sassa-contact`, `/lost-sassa-card-or-id`, `/sassa-retail-collection-points`

Estimated current sitemap output: **~225–235 URLs** (30 static + ~16 updates + 40 guides + 8 grants + 20 status + 9 province + 12 decline + 11 banking + 7 appeals + 4 dates + ~70 office paths).

### 3.2 Flags

| Flag | URLs / evidence |
|---|---|
| Duplicate intent (confirmed) | `/guides/best-bank-accounts-sassa-2026` ("…Low Fees & ATM Access Compared") vs `/guides/best-bank-accounts-sassa-beneficiaries` ("…(Low-Fee Options Compared)"); descriptions both promise a low-fee bank comparison (Capitec/TymeBank/FNB/Nedbank/Postbank). `src/lib/entities.ts` line 360 treats them as two pages |
| Duplicate intent (structural, needs editorial call) | `/guides/appeal-timeline` vs `/appeals/appeal-timeline`; `/tools/appeal-deadline` vs `/appeals/appeal-deadline`; `/guides/income-source-detected-appeal` vs `/decline-reason/income-source-detected` (the last pair is mitigated: update-2026-023 duplicating it is already `noindex`) |
| Near-duplicate programmatic layer | ~60–65 `/sassa-offices/[province]/[city]` pages built from `provinces.json` town rows: identical template, only address/phone swapped, generic fallback summary (`[city]/page.tsx` line 130), phones explicitly `verified: false` in data. Only the 10 `officeCities.json` entries carry unique descriptions + local tips. City template itself shows an "independently verified" amber warning (lines 170–175) — honest, but confirms the data weakness |
| Thin pages (legitimate utility — keep indexed) | `/contact` (~78 words per prior crawl; form page), `/privacy-policy` (~117 words), `/terms-of-service`, `/disclaimer` — short by nature, not low-value signals |
| Thin pages (quality concern) | 9 `/province/*` (~242–315 words each, template-heavy; prior crawl dup-sim 0.28–0.36 across pairs); province-derived city pages (address + phone + 3 templated FAQs) |
| Obsolete/removed (correctly handled) | Old thin guides (`guide-means-test`, `change-banking-details`, `srd-grant`, `biometric-verification-guide`, `status-check-no-phone`, `guide-report-fraud`) no longer in `guides.json`; all covered by 301s in `next.config.js`. 16 legacy update IDs redirect + are excluded from sitemap. No dead dynamic routes found |
| Should probably not be indexed (recommendation) | Province-derived `/sassa-offices/[province]/[city]` pages (keep the 10 curated `officeCities` ones if strengthened, or noindex the whole city layer — §18-F). `/search` already excluded (correct) |
| Orphan risk | Low: `EntityLinks` + `NextStepCard` + breadcrumbs sitewide; footer links to all hubs; `/province/*` reachable from `/common-problems` + sitemap; `/dates/*` from `/payment-calendar`; no orphan indexable page found. (`/search` is nav-linked; fine.) |

---

## 4. Content quality audit

**Strengths (evidence):** 40 guides are genuinely long-form and task-oriented (prior crawl: 1,100–3,600 words on flagships; HowTo + FAQPage schema; per-guide `sources[]` with official URLs; `relatedLinks`). The SRD hub (`grants/srd-r370-grant.json`, 246 lines) covers eligibility/income-limits/documents/steps/payments/appeals with template-resolved current figures. Status/decline/banking/appeals records each contain meaning → triggers → fix-steps → contacts → sources. Interactive tools (`StatusMeaningExplorer`, `PaymentTroubleshooter`, `AppealDeadlineCalculator`, `StatusCheckForm`) are client-side, privacy-preserving differentiators.

**Concerns:**
- **Template-heavy layers:** status (20), decline (12), banking cash-send (4 near-identical retailer variants), province (9), office-city (~65) share scaffolding; differentiation rests on the data payload, which is strong for status/decline/banking but weak for offices/provinces.
- **Cash-send ×4** (`cash-send-shoprite/checkers/pick-n-pay/boxer`): same 4-step skeleton with retailer noun swapped. Each is short and serves a distinct navigational query ("collect at X"), so this is acceptable; keep.
- **Generic writing risk:** update articles follow a recurring "payment-table + collection-tips + check-your-status" shape (prior crawl dup-sim 0.32–0.41 across monthly payment posts). Mitigations in place: legacy month-posts redirect to `/payment-calendar`, 4 overlapping updates are `noindex`, newest posts (035 fraud-reporting with 3 news sources, 036 governed September dates) are differentiated. Residual risk is moderate, not critical.
- **First-hand value:** strongest on status/decline/banking troubleshooting (exact portal paths, USSD/WhatsApp fallbacks, timelines, "what NOT to do" blocks); weakest on province/office pages (directory data without verification).

---

## 5. Low Value Content risk assessment (the central question)

| Risk | Verdict | Evidence |
|---|---|---|
| A. Thin content | **Potential low-value signal, localised** | Office-city layer (~60 template pages), 9 province pages (242–315 words), `/scam-alert` listing (272 words, cards without the `indicators`/`prevention` detail present in `scams.json` — the template renders only title/description/type/date, `scam-alert/page.tsx` lines 67–89) |
| B. Repetitive content | **AdSense risk, one confirmed pair** | Duplicate bank-account guides (§3.2). Otherwise repetition is hub-vs-spoke (acceptable) |
| C. Template-heavy | **Quality concern, offices layer** | City pages differ only by address/phone/FAQ nouns; province pages share section scaffolding |
| D. Search-first | **Needs improvement, mild** | `/how-much-is-srd-grant` + `/grants/srd-r370-grant` + homepage SRD editorial overlap is defensible (question-answering page vs hub); finance-adjacent guides (data bundles, funeral cover, extra income) are audience-legitimate and carry honest non-promotional copy — but combined with affiliate placeholders they need the disclosure posture kept exactly as-is |
| E. Programmatic/scaled | **AdSense risk, offices layer** | ~70 sitemap URLs from two JSON files; the layer most resembling scaled thin content. Recommend de-indexing the weak tail (§18-F) |
| F. Generic AI-style writing | **Low residual risk** | No generator in repo; content carries specific portal paths, codes, timelines, and governance labels inconsistent with bulk AI filler. Monthly update phrasing is formulaic but fact-bearing |
| G. Lack of useful guidance | **Not found on core pages** | Every status/decline/guide page ends in an action (portal step, USSD code, appeal path, office visit). Gaps are factual-accuracy items (§10), not usefulness gaps |
| H. Weak differentiation | **Needs improvement, offices/provinces** | Status/decline/appeal/state-specific troubleshooting (stokvels, e-wallet, UIF/NSFAS deregistration paths) is clearly differentiated from official sources. Office/province pages mostly repackage unverified directory data — weakest "reason to exist" on the site |

**Bottom line:** the site no longer looks like a scaled-thin-content site at its core; the residual Low-Value profile is concentrated in the offices/province indexation footprint plus the fixable defects in §18-B.

---

## 6. Section-by-section assessment

| Section | User problem solved? | Genuinely useful? | Differentiated? | Thin/repetitive? | Index? |
|---|---|---|---|---|---|
| `/updates` (+`/[id]`) | Stay current on dates, policy, scams | Yes for 035/036/033/034/014/019/020; legacy month-posts correctly redirect | Partially (035 cites 3 news sources; most cite only sassa.gov.za) | Legacy pattern retired via redirects + 4 `noindex` | List yes; legacy redirected IDs no; keep 4 `noindex` |
| `/faq` | Quick answers (54) | Yes; but `relatedLinks` mis-point to `/` (§9) | Summaries of deeper pages — fine as FAQ | No (9,885 words per prior crawl) | Yes, single page |
| `/guides` (+40) | Task completion | Yes — strongest section | Yes (portal mechanics, timelines, anti-patterns) | One dup pair (§3.2) | Yes, minus dup after merge |
| `/scam-alert` | Fraud protection | Partially — cards omit `indicators`/`prevention`/`examples` present in `scams.json` | Weak vs `/guides/sassa-online-security` (overlap, no cross-link from scam page to it) | 272-word listing | Yes, but enrich cards (recommended, §18-C) |
| `/resources` + `/sassa-offices` + `/province` | Find offices / local help | Directory + province SRD-challenge notes useful; phones unverified | Weak — three overlapping systems | Yes (thin/template) | Hub pages yes; city layer no (§18-F); add verification labelling on province pages |
| `/eligibility-check` | "Do I qualify?" | Interactive checker (client component) | Yes | No | Yes |
| `/payment-calendar` + `/dates/*` | When am I paid? | Yes + governed confirmed/projected labels + per-month source/lastVerified | Yes (governance transparency exceeds official clarity) | 4 date pages are intentionally near-identical in shape; data differs; acceptable | Yes |
| `/status-check` | Check SRD status safely | Yes — privacy-preserving pre-portal form (`StatusCheckForm.tsx`: masking, "never leaves browser" notices, no fake lookup) + 15-FAQ schema + situation-finder grid | Yes | No (~2,500 words) | Yes |
| `/status` (+20) | "What does my status mean?" | Yes — each has fix-steps, timelines, contacts, sources | Yes | Template-shared but payload-unique | Yes |
| `/grants` (+8) | Which grant / how to apply | Yes; canonical-facts + unverified-amount warnings | Yes | No | Yes |
| `/common-problems` | Problem-first router (74 internal links) | Yes — best discovery page | Yes | Contains stale labels + wrong portal URL (§9/§10 — required fixes) | Yes |

---

## 7. Grant page assessment (`public/data/grants/*.json` via `src/app/grants/[slug]/page.tsx`)

- Structure consistent (intro/eligibility/documents/steps/FAQ/references) with per-grant payloads; no copied-description issue found (spot-checked SRD + Child Support; amounts injected from `canonical-facts.json`: R370/R2,400/R2,420/R580/R1,290 verified `2026-07-07`–`2026-08-20` against Treasury/DSD/gov.za source URLs).
- Eligibility, documents, application steps, payment info, troubleshooting links, and official `sources[]` present on sampled pages; `related[]` cross-links valid.
- **Staleness watch (needs verification, not asserted as wrong):** SRD page references "August 2026 … 24–26" and September-2026 TBC passages — correct at time of writing, will need rolling refresh; `last_updated: 2026-08-20` on sampled files is ~4 weeks old at audit date (acceptable, but refresh after September confirmation).
- Card-migration facts (`sassa_gold_card`, `postbank_black_card`, `card_replacement_cost`) carry `confidence: "needs_human_review"` and render the amber unverified banner — correct handling; verify against Postbank/SASSA before AdSense application (§18-G).
- No unsupported statistics found in sampled grant content (compliance with `docs/google-compliance-checklist.md` golden rule §0.1).

---

## 8. Update/article assessment (`public/data/updates.json`, `src/app/updates/[id]/page.tsx`)

- System: file-based records with `date`, `type`, `urgent`, optional `noindex`; template renders Article + Breadcrumb JSON-LD, TOC, sources block, related articles. `noindex` honoured in metadata (line 52) and sitemap exclusion (line 84). `monthly-payment-schedule` tag redirects to `/payment-calendar` (lines 81–84).
- Dates are real ISO dates spanning 2026-01-23 → 2026-08-20; titles match content on sampled records.
- Overlap with evergreen guides is actively managed: 023 (income-source), 024 (grant comparison), 028 (decline codes), 029 (SRD-vs-CSG) are `noindex` — correct canonical-adjacent treatment. Legacy month posts (001/005/006/007/008/009/013/015/018/021/022/025/026/027/030/032) 301 away — correct.
- **Stale/harmful details in still-indexed posts (required fixes, §18-B):** update-2026-003 prescribes retired USSD `*120*3227#` (repo note in `src/lib/config.ts` lines 33–35 confirms retirement; correct code `*120*69277#`); several old posts link status checks to `/` and to `/guides/guide-001` (a Child Support application guide — wrong target).
- Old-post treatment recommendation: **update in place** (003's USSD + `/` links), not delete — they carry internal links and history; no `noindex` needed beyond the existing four.

---

## 9. Internal linking audit

**Working well:** `EntityLinks` hub funnel, per-slug `nextStepsFor`/`guideNextSteps` maps (`src/lib/entities.ts`), breadcrumbs + JSON-LD sitewide, footer hub links, `/common-problems` router (74 links), zero broken internal links in the August crawl. **No `/srd-status-check` references remain** in `src/` (previous issue resolved — verified by grep).

**Defects found (all required fixes):**

| # | Location | Problem | Correct target |
|---|---|---|---|
| 1 | `src/lib/entities.ts:279,490` | Links to `/scams` (only works via 301 → `/scam-alert`) | `/scam-alert` |
| 2 | `public/data/faqs.json` faq-004/014/021/023 (+ guides refs) | `relatedLinks` `url: "/"` labelled "status tracking page" — homepage is not a status tracker | `/status-check` |
| 3 | `public/data/updates.json` (001, 003, 013 + similar) | `[SASSA status](/)`, `[Check Status](/)`, `[Read our Guide to Status Checks](/guides/guide-001)` | `/status-check` |
| 4 | `src/app/common-problems/page.tsx:168-171` | `/faq#payments`, `/faq#applications`, `/faq#biometrics`, `/faq#scams` anchors — `src/app/faq/page.tsx` renders `<section key={category}>` with **no `id` attributes**, so anchors resolve nowhere | Add `id` per category or drop fragments |
| 5 | `src/app/common-problems/page.tsx:45` | "All 10 Grant Status Meanings Explained" — there are 20 statuses | "All 20 …" (or dynamic count) |
| 6 | `src/app/common-problems/page.tsx:188` (+ §10) | FAQ schema appeals portal `srd.sassa.gov.za/appeals/appeal` + "within 30 days" | `https://srd-appeals.dsd.gov.za` + aligned window |
| 7 | `src/components/Layout/Navbar.tsx:118` | Dropdown label renders literally as **"Tools.ico"** | "Tools" |

---

## 10. Technical SEO audit (issues actually found — no generic checklist)

- **Present and correct:** self-canonicals, OG/Twitter, sitemap + robots, 301 map, custom 404, per-page titles/descriptions, heading hierarchy (single H1 per template), alt text on guide images, BreadcrumbList/Article/HowTo/FAQPage/GovernmentOffice/Event schema, `en-ZA` locale, www+https canonicalisation (`src/middleware.ts`), security headers (`next.config.js`).
- **Wrong official URLs in FAQPage schema (required):** `src/app/tools/appeal-deadline/page.tsx:19,48`, `src/app/common-problems/page.tsx:188`, `src/components/tools/PaymentTroubleshooter.tsx:32` cite `srd.sassa.gov.za/appeals(/appeal)` — an incorrect host/path. Canonical official portal used elsewhere: `https://srd-appeals.dsd.gov.za`.
- **Contradictory deadline schema/content (required):** "30 days" (`tools/appeal-deadline` FAQs + calculator copy, `status-explorer` FAQ "appeal within 30 days", troubleshooter body) vs "90 days" (`appeals/page.tsx:35,71`) vs two-step framing (`appeal-guide` in `guides.json`). Schema and visible copy must agree.
- **Reflection-time inconsistency (required):** troubleshooter says "2–5 business days… wait at least 5" (`payment-troubleshooter/page.tsx:18,47-48`) vs site standard "1 to 3 business days" (status pages, `/status-check`, SRD grant page "48 business hours").
- **Fraud-hotline inconsistency (required — verify then align):** `src/app/sassa-contact/page.tsx:41` says "SASSA Fraud Hotline on **0800 701 701**"; `faqs.json` faq-008 and sitewide copy say **0800 60 10 11**. Do not guess — verify against an official source, then uniformise.
- **No other technical blockers:** meta descriptions present per prior crawl (0 missing, 0 duplicated); canonicals valid; images `loading="lazy"` on guide art; AdSense script `strategy="afterInteractive"` + consent defaults (no policy-relevant perf sabotage observed).

---

## 11. Trust/transparency audit

**Strong:** `/about` names publisher (Lucky Cungwa), independence, methodology, review date; `/authors` documents the Editorial Team identity + verification process (note: bylines say "Lucky Cungwa" while authors page fronts the team — minor alignment item, §18-C); 4 policy pages + per-page `EditorialMeta`/`EditorialFooter` with last-verified dates; footer + contact page direct grant seekers to official channels; `support@sassahelphub.co.za` + Johannesburg location published; affiliate disclosure sitewide (footer compact + full component).

**BLOCKER — contact form deceives users (`src/app/contact/ContactContent.tsx:27-40,179-195`):** `handleSubmit` runs a honeypot/rate check then fakes success with `setTimeout(…, 600)` + "We have received your message" modal. No network call exists; `@emailjs/browser` (in `package.json`) is never imported. Users are told a message was received when it was discarded. Fix: wire to EmailJS (or any real endpoint) or replace the form with `mailto:` + response-time note. Do not ship a placebo contact channel into an AdSense review.

---

## 12. UX audit (from code; desktop + mobile)

- No popups/interstitials beyond a dismissible cookie-consent card (`CookieConsent.tsx`, bottom-fixed, Accept/Essential-only) and a dismissible alert banner (`AlertBanner.tsx`, localStorage-gated; correctly flips from the 31-Aug-2026 card deadline to a generic independence notice after the deadline — good freshness behaviour).
- Skip-to-content link, `aria-current` nav states, labelled form inputs with inline errors, masked ID/phone display — solid accessibility posture.
- No fake government UI: `StatusCheckForm` explicitly states it performs no lookup and routes users to the official portal; no SASSA logo/branding copied (own `logo.png` brand mark).
- Content hierarchy is consistent (H1 → sections → FAQs → sources → next-steps).
- Issues: "Tools.ico" nav typo (§9.7); `/faq#` dead anchors (§9.4); affiliate placeholders render dashed-border boxes with no action on every monetised page — honest but visually unfinished; acceptable for review, revisit post-approval (§18-C). Homepage payment strip hardcodes a September-2026 explanation (`page.tsx:151-153`) under a dynamic month label — will read stale in October without an edit (maintenance, §18-C). `/status-check` hardcodes `currentMonthYear = "September 2026"` (line 12) — same monthly-maintenance note.

---

## 13. Monetisation audit

- **AdSense installed and correctly attributed:** script + `google-adsense-account` meta (`layout.tsx:35,126-131`) + `ads.txt` DIRECT line. No ad iframes/pop-unders/click-manipulation surfaces found.
- **Third-party ad network neutralised for review:** `AdNetworkLoader` renders `null` unless env-enabled AND consented.
- **Affiliate posture is review-safe:** no hardcoded links/IDs; CTAs render neutral editorial notes and "—" table cells when unconfigured; `rel="sponsored"` wired for when links exist; footer disclosure present. No sponsored posts found.
- **Sensitive-topic note:** `/scam-alert` and fraud/appeal pages carry no special ad handling; consider AdSense "sensitive content" placement review post-approval (non-blocking).
- Verdict: monetisation does not interfere with UX; nothing to remove before applying.

---

## 14. SASSA independence/branding audit

- **No impersonation found.** No SASSA/government logo usage (brand mark is own `logo.png`); `/disclaimer` carries an explicit "NOT SASSA … NOT affiliated" banner; independence stated in layout metadata, homepage trust callout, footer copyright line ("Unofficial independent resource, not affiliated with SASSA or the South African government"), FAQ editorial note, `EditorialFooter` on every content page, and the post-deadline alert banner.
- Status form never implies it performs official lookups; all portals link out to `.gov.za` hosts.
- Contacts published are official SASSA channels, labelled as such (footer: "Not us — these are SASSA's official contacts").
- **One verification item:** fraud-hotline number conflict (§10) must be resolved so the site never misattributes an official number. Otherwise no clarification pages needed.

---

## 15. Freshness/source audit

- **Governance system (strong):** `payment-schedule-forecast.json` per-month `status: confirmed|projected` + `governance {source, sourceURL, lastVerified, notes}`; `/dates/*` and `/payment-calendar` render confirmed/projected chips, amber TBC warnings, and per-month source lines. September 2026 correctly shows permanent dates confirmed + SRD/fourth-day TBC.
- **Sources:** guides/status/decline/banking records carry official `sources[]`; update-2026-035 cites 3 news outlets; canonical facts pin Treasury/DSD/gov.za URLs with verified dates.
- **Definitely outdated (fix):** retired USSD `*120*3227#` in update-2026-003 (config confirms `*120*69277#`); `/`-root and `/guides/guide-001` status-check links in old updates.
- **Needs verification (do not guess):** September SRD/fourth-day dates (correctly labelled TBC — keep); Postbank Black Card deadline facts (`needs_human_review` — re-verify post-31-Aug); fraud-hotline 0800 701 701 vs 0800 60 10 11; province office phones (all `verified: false`); city-page `lastUpdated` hardcodes "2026-08-31" while underlying data is 2026-07-07.
- **Maintenance debt:** hardcoded "September 2026" strings (`status-check/page.tsx:12`, homepage strip) require a monthly edit pass; add to routine cadence.

---

## 16. Performance findings

**Not verified from production** — no Lighthouse/PageSpeed/Core Web Vitals data in the repo, and none is claimed. Code-level observations only:

- Static generation + `loading="lazy"` guide images + `afterInteractive` third-party scripts + consent-gated loading are favourable.
- Watch items (non-blocking): `@nextui-org/react` + `framer-motion` client-side weight on every page; Google Fonts (`Inter`) render-blocking in `layout.tsx`; multiple JSON-LD blocks per page (valid but verbose); Google Maps iframe on province pages is `loading="lazy"` (good).
- No crawlability blockers: no client-only routes for content, no `robots` disallows, sitemap + canonicals coherent, 404 + redirects sane.

---

## 17. Readiness scorecard

| Area | Status | Evidence | Required action |
|---|---|---|---|
| Original/useful content | READY WITH MINOR FIXES | 40 deep guides, 20 status + 12 decline fix-guides, 3 tools; dup bank pair | Merge bank guides (§18-B.4) |
| Thin content | NEEDS WORK | Office-city layer, 9 province pages (242–315 words), thin-but-legitimate legal pages (acceptable) | De-index weak office tail (§18-F); enrich `/scam-alert` cards (recommended) |
| Duplicate/repetitive content | NEEDS WORK | Confirmed bank-guide dup; appeal timeline/deadline hub overlaps; monthly-update pattern already retired via redirects + noindex | Merge dup; align appeal pages (recommended: canonical cross-links, keep both only if differentiated) |
| Scaled/programmatic content risk | NEEDS WORK | ~70 office URLs from 2 JSON files; province-derived pages template-only | Noindex city layer (except 10 curated or strengthen) |
| Site structure | READY WITH MINOR FIXES | Clear hubs; triple office systems overlap (resources/sassa-offices/province) | Consolidate messaging; keep hubs |
| Navigation | READY WITH MINOR FIXES | Full nav + footer + breadcrumbs | Fix "Tools.ico" typo |
| Internal linking | READY WITH MINOR FIXES | Entity systems strong; 7 defects found | Fix §9 table |
| Indexation | NEEDS WORK | Good noindex/redirect discipline; sitemap over-broad (office tail); production lags repo (106 vs ~230 URLs) | §18-F actions + deploy-verify |
| Technical SEO | READY | Canonicals/schema/robots/404/redirects verified | None structural; fix wrong URLs in schema (§10) |
| Trust/transparency | **BLOCKER** | Contact-form placebo | Wire or remove form (§18-B.1) |
| Content freshness | READY WITH MINOR FIXES | Governance + lastVerified pervasive; monthly hardcoded strings | Monthly maintenance pass |
| Source quality | READY WITH MINOR FIXES | Official sources listed; wrong portal URLs; fraud-number conflict | Fix §10 items |
| Mobile UX | READY | Responsive, consent, dismissible banner, a11y basics | None |
| Performance | READY WITH MINOR FIXES | No metrics; code posture favourable | Measure post-deploy (non-blocking) |
| Monetisation readiness | READY | AdSense + ads.txt + consent gating + honest placeholders | None |
| SASSA independence/clarity | READY | Disclaimers pervasive; no brand impersonation | Resolve fraud-number attribution |

---

## 18. Final decision framework

### A. Current status

**READY AFTER REQUIRED FIXES**

Rationale: the core site (guides, grants, status/decline/appeal content, tools, trust pages, SEO plumbing, monetisation posture) is observably prepared for review. The gaps are bounded, enumerated, and fixable without new content — but the contact-form deception, wrong official URLs, contradictory deadline advice, and duplicate bank guides must not go into a review.

### B. Required before application

1. **Fix the contact channel** — `src/app/contact/ContactContent.tsx`: wire the form to a real endpoint (EmailJS dependency already in `package.json`) or replace it with `mailto:support@sassahelphub.co.za` + honesty copy. Never show "received" for an unsent message.
2. **Correct the appeals-portal URL in 4 places** — `src/app/tools/appeal-deadline/page.tsx:19,48`, `src/app/common-problems/page.tsx:188`, `src/components/tools/PaymentTroubleshooter.tsx:32`: `srd.sassa.gov.za/appeals(/appeal)` → `https://srd-appeals.dsd.gov.za`.
3. **Align the appeal window everywhere** to the two-step framing already in `appeal-guide` (reconsideration promptly after decline; ITSAA appeal within 90 days of the decision): fix `tools/appeal-deadline` FAQs + calculator copy, `status-explorer` FAQ ("appeal within 30 days"), troubleshooter body, `common-problems` schema ("within 30 days").
4. **Merge the duplicate bank guides** — keep one of `/guides/best-bank-accounts-sassa-2026` vs `/guides/best-bank-accounts-sassa-beneficiaries` (recommend the 8-bank comparison), 301-redirect the loser in `next.config.js`, exclude it from sitemap (automatic via `guides.json` removal), and update `entities.ts:360` + any inbound links.
5. **Verify and uniformise the fraud hotline** — `/sassa-contact` (0800 701 701) vs sitewide (0800 60 10 11): check official source, use one number everywhere.
6. **Fix FAQ `relatedLinks`** — `public/data/faqs.json` faq-004/014/021/023 (and any identical): `"/"` labelled as status-tracking → `/status-check`.
7. **Fix stale update links + retired USSD** — `public/data/updates.json`: `/`-root status links → `/status-check`; `/guides/guide-001` status-check references → `/status-check`; update-2026-003 `*120*3227#` → `*120*69277#`.
8. **Canonicalise `/scams` links** — `src/lib/entities.ts:279,490` → `/scam-alert` (redirect exists; point at canonical).
9. **Fix nav typo** — `src/components/Layout/Navbar.tsx:118` "Tools.ico" → "Tools".
10. **Fix `/common-problems` labels/anchors/schema** — "All 10 …" → "All 20 …"; add `id`s for `#payments/#applications/#biometrics/#scams` or drop fragments; schema portal + window per items 2–3.
11. **Align payment-reflection copy** — `tools/payment-troubleshooter` ("2–5 days / wait 5") → site standard "1–3 business days".
12. **Deploy production and re-verify** — per `docs/google-compliance-checklist.md` §1, live lags the repo (newest pages 404'd on 2026-08-31; live sitemap 106 vs repo ~230). Deploy, confirm live sitemap count, Search-Console-inspect new URLs, and hold the 14-day no-edit window the checklist prescribes.

### C. Recommended but not blocking

- Enrich `/scam-alert` cards with the `indicators`/`prevention`/`examples` already in `scams.json`; cross-link `/guides/sassa-online-security`.
- Reconcile bylines: `/authors` fronts "Editorial Team" while pages sign "Lucky Cungwa" — one-line alignment note on `/authors`.
- Parameterise the monthly hardcoded strings (`status-check` month label, homepage September strip) or calendarise the edit.
- Differentiate or cross-canonicalise `/guides/appeal-timeline` vs `/appeals/appeal-timeline` and `/tools/appeal-deadline` vs `/appeals/appeal-deadline` (tools = interactive calculators with brief context; hubs = full guides — make that division explicit in copy).
- Measure Core Web Vitals post-deploy; review AdSense sensitive-content placement on scam/fraud pages after approval.
- Add verification labelling to `/province/*` phone blocks (as the city template already does) or verify the numbers.

### D. Do not change

- AdSense script, `google-adsense-account` meta, `ads.txt` — correct and required.
- Consent gating (denied-by-default analytics/ads, `CookieConsent`, `AdNetworkLoader` disabled) — keep exactly as-is through review.
- Affiliate placeholder behaviour (no fake links, "—" cells, footer disclosure) — keep; do not configure affiliate URLs before approval.
- The 4 `noindex` updates, 16 update redirects, legacy guide redirects, `/search` sitemap exclusion — correct governance, leave alone.
- Canonical-facts system + amber unverified warnings — keep; extend, don't remove.
- Homepage editorial, guide depth, status/decline/banking/appeal content, trust pages, disclaimers — already acceptable; avoid churn (the 14-day stability window matters).

### E. Content action plan (exact URLs)

| URL | Problem | Action | Why |
|---|---|---|---|
| `/contact` | Form fakes successful submission | Wire to real endpoint or replace with mailto | Deceptive trust-page behaviour = AdSense risk |
| `/tools/appeal-deadline` | Wrong portal URL; flat "30 days" framing | Correct portal; two-step window copy | YMYL deadline advice must be accurate + consistent |
| `/guides/best-bank-accounts-sassa-beneficiaries` (or `-2026`) | Near-duplicate of sibling guide | Keep one; 301 the other | Duplicate intent / cannibalisation |
| `/sassa-contact` | Fraud hotline 0800 701 701 conflicts with 0800 60 10 11 | Verify official source; uniformise | Never misattribute official numbers |
| `/faq` (data-level) | `relatedLinks` "/" mislabelled as status tracking | Point to `/status-check` | Wrong internal target on 4+ FAQs |
| `/updates/update-2026-003` (+old posts) | Retired USSD; `/` + wrong-guide status links | Update USSD/links in place | Indexed page giving stale instructions |
| `/common-problems` | Stale count, dead anchors, wrong schema portal/window | Fix labels, ids, schema | High-traffic router must be exact |
| `/status/*` ×3 spots + troubleshooter | "30 days" appeal + "2–5/5 days" reflection vs site standards | Align to 90-day two-step + 1–3 days | Consistency across YMYL advice |
| `/province/*` (9) | Template-thin, unverified phones, no verification note | Add verification labelling; verify numbers | Trust + thin-content risk |
| `/scam-alert` | Cards omit available indicators/prevention detail | Enrich from `scams.json` (recommended) | Strongest anti-fraud page should be complete |

### F. Indexation action plan

- **Keep indexed:** `/`, `/status-check`, `/payment-calendar`, `/dates/*` (4, governed), `/grants` + 8, `/status` + 20, `/guides` + 39 (post-merge), `/decline-reason/*` (12), `/banking` + 10, `/appeals` + 6, `/faq`, `/updates` + 16 current, `/common-problems`, `/eligibility-check`, `/how-much-is-srd-grant`, `/glossary`, `/resources`, `/sassa-offices`, `/province/*` (9, with improvements), `/sassa-contact`, `/lost-sassa-card-or-id`, `/sassa-retail-collection-points`, `/scam-alert`, `/tools/*` (3), all 10 legal/trust pages.
- **Noindex (new):** `/sassa-offices/[province]/[city]` province-derived pages (~55–60 template pages). Keep indexed only the 10 curated `officeCities.json` city pages if strengthened with unique local content; otherwise noindex the entire city layer and let `/sassa-offices/[province]` + `/province/*` + `/resources` serve office intent.
- **Redirect (new):** losing bank-guide slug → winner (301 in `next.config.js`).
- **Canonicalised:** `/scams` → `/scam-alert` already 301s; update internal links to point at canonical directly.
- **Remove from index:** nothing else. Do not delete historical updates; the 4 overlapping ones are already `noindex`, legacy ones already redirect.

### G. Final pre-application checklist

- [ ] Items B.1–B.11 implemented in code/data and reviewed in a staging build.
- [ ] Production deployed; live `sitemap.xml` count reconciled with repo expectation (~225–235, or lower if the city layer is noindexed).
- [ ] Spot-check live: `/contact` sends (or is mailto-only), appeals links resolve to `srd-appeals.dsd.gov.za`, no "Tools.ico", `/faq#` anchors land, bank-guide loser 301s, city-layer URLs return `noindex` (if applied).
- [ ] Search Console: sitemap submitted, new/changed URLs inspected, no Soft-404/coverage spikes.
- [ ] September 2026 SRD/fourth-day dates refreshed if SASSA confirms; `canonical-facts.json` + forecast `lastVerified` current.
- [ ] 14-day content-stability window observed (per `docs/google-compliance-checklist.md` §1) before submitting.
- [ ] `ads.txt` + `google-adsense-account` meta still present; effectivecpm still disabled; affiliate slots still blank.

---

*End of audit. No site code or content was modified. The only file created is this report.*
