# SASSA Help Hub: Internal Linking Strategy (2026)

This strategy is designed to boost Domain Authority (DA) through topic clusters and reduce bounce rates by guiding users through logical "next steps" in their grant journey.

---

## 1. Primary Pillar Page: Status Check
**URL:** `/status-check`
**Role:** High-intent entry point.
**Outbound Internal Links:**
- `/payment-calendar` (Anchor: "August 2026 payment dates")
- `/guides/appeal-guide` (Anchor: "lodge a SASSA appeal")
- `/guides/change-banking-details` (Anchor: "update bank account details")
- `/scam-alert` (Anchor: "avoid SASSA scams")

---

## 2. Topic Cluster: SRD R370 Management
**Pillar:** `/guides/srd-grant`
**Supporting Pages:**
- `/guides/change-banking-details`
- `/guides/biometric-verification-guide`
- `/guides/appeal-guide`
**Linking Strategy:**
- Each supporting page must link back to the `/status-check` page using the anchor text "check SASSA SRD status".
- Supporting pages should cross-link where relevant (e.g., Biometrics links to Appeal guide if verification fails).

---

## 3. Topic Cluster: Permanent Grants
**Pillar:** `/guides`
**Supporting Pages:**
- `/guides/guide-001` (Child Support)
- `/eligibility-check`
**Linking Strategy:**
- Transition users from SRD to permanent grants.
- Anchor: "switch from SRD to Child Support grant".

---

## 4. Anchor Text Optimization Map

| Target Page | Recommended Anchor Text |
|-------------|-------------------------|
| `/status-check` | "SASSA status check August 2026", "check SRD approval", "SASSA status online" |
| `/payment-calendar` | "SASSA payment dates", "grant payment schedule 2026", "when is my next pay day" |
| `/guides/appeal-guide` | "appeal declined SASSA grant", "ITSAA portal guide", "fix rejected SRD" |
| `/eligibility-check` | "SASSA grant qualifier", "do I qualify for SASSA", "grant eligibility tool" |

---

## 5. Related Page Clusters (Sidebar/Footer Implementation)

### Cluster A: Payment Issues
- Payment Calendar
- Change Banking Details
- Status Check

### Cluster B: Application Help
- SRD R370 Guide
- Eligibility Checker
- SASSA Offices Locator

### Cluster C: Security & Safety
- Scam Alert
- Biometric Troubleshooting
- Terms of Service

---

## 6. Implementation Checklist
- [ ] Ensure all 404 links from legacy Vite site are redirected (Done in next.config.js).
- [ ] Use Breadcrumbs on all sub-pages (Implemented in `GuidePage` and `UpdatePage`).
- [ ] Maintain a 3-click depth for any article on the site.
