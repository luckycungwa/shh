# SASSA Help Hub — Topic & User-Journey Map (Phase 5 draft)

Research date: **2026-10-16** · Status: seeded from the real site (Phase 1); **completed after queries**.
This map links each journey stage to an **actual** destination URL. Gaps flagged `[GAP?]` are
hypotheses to confirm or drop in Phase 3 against real query evidence.

Legend: ✅ has a destination · 🟡 partial/weak destination · 🔴 no destination yet (candidate `CREATE`/`TOOL`)

---

## 0. Topic pillars (from the live architecture)
- Grants (8): `/grants` + `/grants/[slug]`
- Applications & documents: `/guides/apply-sassa-grants`, `/guides/document-checklist`
- Status & meaning: `/status` + `/status/[slug]`, `/tools/status-explorer`, `/status-check`
- Payments & dates: `/payment-calendar`, `/dates/[month-year]`, `/tools/payment-troubleshooter`, `/guides/missing-grant-payment-guide`
- Banking & payment methods: `/banking` + `/banking/[slug]`
- Appeals: `/appeals` + `/appeals/[step]`, `/tools/appeal-deadline`
- Declines: `/decline-reason/[slug]`
- Reviews / suspension: `/guides/grant-verification-process`, `/status/under-review`, `/status/suspended`
- Safety / scams: `/scam-alert`, `/tools/scam-message-checker`
- Offices / contact: `/sassa-offices`, `/province/[slug]`, `/sassa-contact`
- Reference: `/glossary`, `/faq`, `/how-much-is-srd-grant`

---

## 1. SRD Journey
| Stage | Destination | Status |
|---|---|---|
| What is SRD / how much | `/grants/srd-r370-grant`, `/how-much-is-srd-grant` | ✅ |
| Apply | `/grants/srd-r370-grant` | ✅ |
| Status check (USSD/online) | `/status-check`, `/guides/ussd-codes`, `/guides/official-sassa-portal-guide` | ✅ |
| Status meaning | `/status/[slug]`, `/tools/status-explorer` | ✅ |
| Reapplication | `/guides/srd-reapplication` | ✅ |
| Decline → appeal | `/decline-reason/[slug]`, `/appeals/[step]`, `/tools/appeal-deadline` | ✅ |
| SCA / BIS policy status | `/updates/update-2026-srd-court-sca`, `/updates/update-2026-014` | ✅ |
| Payment / missing payment | `/payment-calendar`, `/tools/payment-troubleshooter` | ✅ |

## 2. Permanent-grant Journey (Older Persons, Disability, CSG, Foster, Care Dependency, GIA, War Veterans)
| Stage | Destination | Status |
|---|---|---|
| Eligibility | `/tools/eligibility-check`, `/tools/means-test-calculator` | ✅ |
| Documents | `/guides/document-checklist` | ✅ |
| Apply | `/guides/apply-sassa-grants`, `/grants/[slug]` | ✅ |
| Medical assessment (Disability) | `/grants/disability-grant`, `/guides/biometric-fix-guide` | 🟡 confirm assessment detail |
| Status | `/status/[slug]` | ✅ |
| Means-test fail / decline | `/decline-reason/means-test-failed`-type pages | ✅ |
| Appeal | `/appeals/[step]` | ✅ |
| Banking / change details | `/banking/[slug]`, `/guides/bank-details-pending-fix` | ✅ |
| Payment date | `/grants/[slug]`, `/payment-calendar`, `/dates/[month-year]` | ✅ |
| Missing payment | `/guides/missing-grant-payment-guide`, `/tools/payment-troubleshooter` | ✅ |
| Review / suspension / reinstatement | `/guides/grant-verification-process`, `/guides/guide-reinstate-grant`, `/status/suspended`, `/status/under-review` | ✅ |

## 3. Payment-date Journey
| Stage | Destination | Status |
|---|---|---|
| This month's dates | `/payment-calendar`, `/dates/october-2026` | ✅ |
| Which day for my grant | `/guides/fourth-payment-day-guide`, `/grants/[slug]` | ✅ |
| Collection methods | `/banking/[slug]`, `/sassa-retail-collection-points`, `/guides/sassa-payment-methods` | ✅ |
| Late/missing | `/tools/payment-troubleshooter`, `/guides/missing-grant-payment-guide` | ✅ |
| Projected next month | `/dates/november-2026` | 🟡 confirm "projected" labelling |

## 4. Review/Suspension Journey
| Stage | Destination | Status |
|---|---|---|
| Got a review notice | `/guides/grant-verification-process` | ✅ |
| What "under review" means | `/status/under-review` | ✅ |
| Suspension & restoration | `/status/suspended`, `/guides/grant-verification-process` | ✅ |
| Biometric enrolment | `/guides/biometric-fix-guide` | ✅ |

## 5. Safety / Scam Journey
| Stage | Destination | Status |
|---|---|---|
| See a suspicious message | `/scam-alert`, `/tools/scam-message-checker` | ✅ |
| Report fraud | `/scam-alert` | ✅ |
| Protect account | `/guides/sassa-online-security` | ✅ |

## 6. Office / Contact Journey
| Stage | Destination | Status |
|---|---|---|
| Find office | `/sassa-offices`, `/province/[slug]`, curated city pages | ✅ |
| Contact channels | `/sassa-contact` | ✅ |
| Lost card/ID | `/lost-sassa-card-or-id` | ✅ |

---

## Dead ends / conflicts to validate in Phase 3 (hypotheses only)
- 🔴/🟡 `[GAP?]` Any high-demand query with **no** destination will be logged here with evidence.
- ✅ `apply-child-support-grant` vs `/grants/child-support-grant` vs `/guides/apply-sassa-grants` — slug fixed 2026-10-16 (was `guide-001`); verify intent overlap in Phase 3.
- 🟡 Multiple review/verification pages (~7) — possible cannibalisation cluster; map one primary intent → one destination.
- 🟡 `/dates` past vs projected months — clarity of confirmed-vs-projected.

> Populate the `[GAP?]` rows only from real query evidence, with the sourcing recorded in
> `docs/seo/sassa-query-inventory.csv`.
