# SASSA Help Hub: Internal Linking Strategy (2026)

This strategy boosts topical authority through topic clusters and reduces bounce rates by guiding users through logical "next steps" in their grant journey.

---

## 1. Primary Entry Point: Status Check
**URL:** `/status-check`
**Role:** Highest-intent entry point — most users arrive here from search.
**Outbound Internal Links:**
- `/payment-calendar` (Anchor: "September 2026 payment dates")
- `/status/approved` (Anchor: "Approved but no Pay Day?")
- `/guides/missing-grant-payment-guide` (Anchor: "Pay Day today but no money")
- `/guides/appeal-guide` (Anchor: "lodge a SASSA appeal")
- `/guides/bank-details-pending-fix` (Anchor: "update your bank details")
- `/guides/ussd-codes` (Anchor: "USSD codes — no data needed")
- `/guides/sassa-whatsapp` (Anchor: "WhatsApp guide")
- `/guides/moya-app-sassa` (Anchor: "Moya App — free data")
- `/scam-alert` (Anchor: "avoid SASSA scams")

---

## 2. Topic Cluster: SRD Payment Journey
**Pillar:** `/grants/srd-r370-grant`
**Supporting Pages:**
- `/status-check`
- `/status/approved` (Approved without Pay Day)
- `/status/pending`
- `/status/paid` (Pay Day passed, money not received)
- `/guides/missing-grant-payment-guide`
- `/guides/bank-details-pending-fix`
- `/guides/sassa-payment-methods`
- `/guides/lost-phone-number`

**Linking Strategy (the payment journey):**
```
STATUS CHECK
  ↓
Approved without Pay Day (/status/approved)
  ↓
Pay Day today but no money (/guides/missing-grant-payment-guide)
  ↓
Payment methods (/guides/sassa-payment-methods)
  ↓
Bank details (/guides/bank-details-pending-fix)
  ↓
Changed or lost phone number (/guides/lost-phone-number)
```

- Each supporting page must link back to `/status-check` using anchor text like "check your SRD status".
- Supporting pages cross-link where relevant (e.g., missing payment guide links to bank details fix).

---

## 3. Topic Cluster: Status & Appeals
**Supporting Pages:**
- `/status/pending`
- `/status/declined`
- `/decline-reason/income-source-detected` (+ other decline reasons)
- `/guides/appeal-guide`
- `/guides/appeal-timeline`

**Linking Strategy:**
```
STATUS CHECK
  ↓
Pending (/status/pending)
  ↓
Declined (/status/declined)
  ↓
Decline reason pages (/decline-reason/[slug])
  ↓
Reconsideration & appeal (/guides/appeal-guide)
  ↓
Appeal timeline (/guides/appeal-timeline)
```

---

## 4. Topic Cluster: Payment Calendar
**Pillar:** `/payment-calendar`
**Supporting Pages:**
- `/status-check`
- `/status/approved`
- `/guides/fourth-payment-day-guide`
- `/guides/missing-grant-payment-guide`

**Linking Strategy:**
```
PAYMENT CALENDAR
  ↓
SRD batch window explained
  ↓
Status check (/status-check)
  ↓
Payment problems (/guides/missing-grant-payment-guide)
```

- The calendar FAQ section answers "date changed / TBC" questions and links to `/status/approved`.

---

## 5. Topic Cluster: Permanent Grants
**Pillar:** `/grants`
**Supporting Pages:**
- `/grants/child-support-grant`
- `/guides/apply-child-support-grant` (Child Support application)
- `/eligibility-check`
**Linking Strategy:**
- Transition users from SRD to permanent grants.
- Anchor: "switch from SRD to Child Support grant".

---

## 6. Anchor Text Optimization Map

| Target Page | Recommended Anchor Text |
|-------------|-------------------------|
| `/status-check` | "check SASSA SRD status", "SASSA status online", "check your status" |
| `/payment-calendar` | "SASSA payment dates", "grant payment schedule", "when is my next Pay Day" |
| `/status/approved` | "approved but no Pay Day", "what Approved means" |
| `/status/pending` | "stuck on Pending", "Pending status meaning" |
| `/status/paid` | "paid but no money received" |
| `/guides/appeal-guide` | "appeal a declined SASSA grant", "ITSAA portal guide" |
| `/guides/missing-grant-payment-guide` | "grant approved but not paid", "missing SASSA payment" |
| `/guides/bank-details-pending-fix` | "fix Bank Details Pending", "change your banking details" |
| `/eligibility-check` | "do I qualify for SASSA", "grant eligibility checker" |

Never use generic anchors such as "click here".

---

## 7. Related Page Clusters (Sidebar/Footer Implementation)

### Cluster A: Payment Issues
- Payment Calendar
- Status Check
- Missing Grant Payment Guide
- Bank Details Pending Fix

### Cluster B: Application Help
- SRD R370 Guide (`/grants/srd-r370-grant`)
- Eligibility Checker
- SASSA Offices Locator (`/resources`)

### Cluster C: Security & Safety
- Scam Alert
- Biometric Fix Guide (`/guides/biometric-fix-guide`)
- Online Security Guide

---

## 8. Implementation Checklist
- [x] All legacy URLs redirected in `next.config.js`.
- [x] Breadcrumbs on all sub-pages (schema + visual).
- [ ] Maintain a 3-click depth for any article on the site.
- [ ] Every new guide must link back to its cluster pillar.
