import type { NextStepItem } from "../components/affiliate/NextStepCard";

export type EntityLink = NextStepItem;

class EntityLinkBuilder {
  private links: EntityLink[] = [];
  private seen = new Set<string>();
  add(title: string, url: string, description?: string): this {
    if (!url || this.seen.has(url)) return this;
    this.seen.add(url);
    this.links.push({ title, url, description });
    return this;
  }
  build(): EntityLink[] {
    return this.links;
  }
}

const full = (path: string) => (path.startsWith("/") ? path : `/${path}`);

export const VERTICAL_HUBS: EntityLink[] = [
  { title: "All SASSA Grants", url: "/grants" },
  { title: "SRD Grant Status & Meanings", url: "/status" },
  { title: "Payment Calendar & Dates", url: "/payment-calendar" },
  { title: "Banking & Payment Methods", url: "/banking" },
  { title: "Appeals & Reconsideration", url: "/appeals" },
  { title: "SASSA Offices & Contact", url: "/sassa-offices" },
];

export const GUIDE_HUBS: EntityLink[] = [
  { title: "All Step-by-Step Guides", url: "/guides" },
  { title: "Grant Status Explanations", url: "/status" },
  { title: "Banking & Payment Methods", url: "/banking" },
  { title: "Appeals & Reconsideration", url: "/appeals" },
  { title: "Payment Calendar", url: "/payment-calendar" },
];

/** Prefer each page's own nextSteps (most specific), then fall back to entity-based contextual links. */

const BANKING_NEXT: Record<string, EntityLink[]> = {
  "bank-transfer": [
    { title: "View the payment calendar", url: "/payment-calendar" },
    { title: "SRD payment not received — what to do", url: "/guides/missing-grant-payment-guide" },
    { title: "How to check your SRD status", url: "/status-check" },
    { title: "Compare other payment methods", url: "/banking" },
  ],
  postbank: [
    { title: "Postbank black card guide", url: "/guides/postbank-black-card-guide" },
    { title: "Payment calendar & dates", url: "/payment-calendar" },
    { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
    { title: "Compare other payment methods", url: "/banking" },
  ],
  "cash-send-shoprite": [
    { title: "Other ways to collect cash", url: "/banking" },
    { title: "Payment calendar & dates", url: "/payment-calendar" },
    { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
  ],
  "cash-send-checkers": [
    { title: "Other ways to collect cash", url: "/banking" },
    { title: "Payment calendar & dates", url: "/payment-calendar" },
    { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
  ],
  "cash-send-pick-n-pay": [
    { title: "Other ways to collect cash", url: "/banking" },
    { title: "Payment calendar & dates", url: "/payment-calendar" },
    { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
  ],
  "cash-send-boxer": [
    { title: "Other ways to collect cash", url: "/banking" },
    { title: "Payment calendar & dates", url: "/payment-calendar" },
    { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
  ],
  capitec: [
    { title: "Compare low-fee bank accounts", url: "/guides/best-bank-accounts-sassa-2026" },
    { title: "Banking payment methods", url: "/banking" },
    { title: "Payment calendar & dates", url: "/payment-calendar" },
  ],
  tymebank: [
    { title: "Compare low-fee bank accounts", url: "/guides/best-bank-accounts-sassa-2026" },
    { title: "Banking payment methods", url: "/banking" },
    { title: "Payment calendar & dates", url: "/payment-calendar" },
  ],
  "ekyc-biometric": [
    { title: "Fix biometric verification problems", url: "/guides/biometric-fix-guide" },
    { title: "Update your banking details", url: "/banking/update-phone-number" },
    { title: "Banking payment methods", url: "/banking" },
  ],
  "update-phone-number": [
    { title: "Lost or changed your SASSA phone number", url: "/guides/lost-phone-number" },
    { title: "How to check your SRD status", url: "/status-check" },
    { title: "Banking payment methods", url: "/banking" },
  ],
};

const APPEAL_NEXT: Record<string, EntityLink[]> = {
  "how-to-appeal": [
    { title: "Check your appeal status", url: "/appeals/appeal-status-check" },
    { title: "Common decline reasons & fixes", url: "/status/declined" },
    { title: "Appeal timeline explained", url: "/appeals/appeal-timeline" },
  ],
  "appeal-status-check": [
    { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
    { title: "Reconsideration explained", url: "/appeals/reconsideration" },
    { title: "Status meanings", url: "/status" },
  ],
  "appeal-deadline": [
    { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
    { title: "Appeal timeline explained", url: "/appeals/appeal-timeline" },
    { title: "Common decline reasons", url: "/status/declined" },
  ],
  reconsideration: [
    { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
    { title: "The ITSAA appeal portal", url: "/appeals/itsaa" },
    { title: "Status meanings", url: "/status" },
  ],
  itsaa: [
    { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
    { title: "Check your appeal status", url: "/appeals/appeal-status-check" },
    { title: "Reconsideration explained", url: "/appeals/reconsideration" },
  ],
  "appeal-timeline": [
    { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
    { title: "Appeal deadline", url: "/appeals/appeal-deadline" },
    { title: "Check your appeal status", url: "/appeals/appeal-status-check" },
  ],
};

const STATUS_NEXT: Record<string, EntityLink[]> = {
  approved: [
    { title: "When you'll be paid — payment calendar", url: "/payment-calendar" },
    { title: "Choose your payment method", url: "/banking" },
    { title: "Why your payment might be 'paid' but not received", url: "/status/paid" },
  ],
  declined: [
    { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
    { title: "Common decline reasons & fixes", url: "/status/declined" },
    { title: "Reconsideration explained", url: "/appeals/reconsideration" },
  ],
  pending: [
    { title: "What 'Pending' means & when to check again", url: "/status/pending" },
    { title: "How to check your SRD status", url: "/status-check" },
    { title: "Application status meanings", url: "/status" },
  ],
  under_review: [
    { title: "What 'Under Review' means", url: "/status/under-review" },
    { title: "How to check your SRD status", url: "/status-check" },
    { title: "Fourth payment day guide", url: "/guides/fourth-payment-day-guide" },
  ],
  paid: [
    { title: "Payment calendar & dates", url: "/payment-calendar" },
    { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
    { title: "Choose your payment method", url: "/banking" },
  ],
  "bank-details-pending": [
    { title: "Fix bank details pending", url: "/guides/bank-details-pending-fix" },
    { title: "Update your banking details", url: "/banking/update-phone-number" },
    { title: "Banking payment methods", url: "/banking" },
  ],
  "identity-verification": [
    { title: "Fix biometric verification problems", url: "/guides/biometric-fix-guide" },
    { title: "Update your banking details", url: "/banking/update-phone-number" },
    { title: "How to check your SRD status", url: "/status-check" },
  ],
};

export function nextStepsFor(
  kind: "banking" | "appeal" | "status",
  slug: string
): EntityLink[] | undefined {
  if (kind === "banking") return BANKING_NEXT[slug];
  if (kind === "appeal") return APPEAL_NEXT[slug];
  if (kind === "status") return STATUS_NEXT[slug];
  return undefined;
}

export function guideNextSteps(guide: {
  id: string;
  category?: string;
}): EntityLink[] {
  const b = new EntityLinkBuilder();
  const id = guide.id;
  const cat = guide.category || "";

  if (id === "apply-sassa-grants") {
    return [
      { title: "Document checklist for your grant", url: "/guides/document-checklist" },
      { title: "Grant status meanings", url: "/status" },
      { title: "How to check your grant status", url: "/status-check" },
      { title: "All SASSA grants at a glance", url: "/grants" },
    ];
  }
  if (id === "appeal-guide") {
    return [
      { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
      { title: "Appeal timeline explained", url: "/appeals/appeal-timeline" },
      { title: "Common decline reasons & fixes", url: "/status/declined" },
    ];
  }
  if (id === "guide-001") {
    return [
      { title: "Child Support Grant overview", url: "/grants/child-support-grant" },
      { title: "Document checklist for your grant", url: "/guides/document-checklist" },
      { title: "Grant status meanings", url: "/status" },
    ];
  }
  if (id === "guide-reinstate-grant") {
    return [
      { title: "Grant status meanings", url: "/status" },
      { title: "Why your grant was cancelled or suspended", url: "/status/cancelled" },
      { title: "All SASSA grants at a glance", url: "/grants" },
    ];
  }
  if (id === "lost-phone-number") {
    return [
      { title: "Update your phone number / banking details", url: "/banking/update-phone-number" },
      { title: "How to check your SRD status", url: "/status-check" },
      { title: "Banking & payment methods", url: "/banking" },
    ];
  }
  if (id === "moya-app-sassa") {
    return [
      { title: "How to check your SRD status", url: "/status-check" },
      { title: "Update your phone number / banking details", url: "/banking/update-phone-number" },
      { title: "SRD status meanings", url: "/status" },
    ];
  }
  if (id === "ussd-codes") {
    return [
      { title: "How to check your SRD status", url: "/status-check" },
      { title: "SASSA WhatsApp guide", url: "/guides/sassa-whatsapp" },
      { title: "SRD status meanings", url: "/status" },
    ];
  }
  if (id === "sassa-whatsapp") {
    return [
      { title: "How to check your SRD status", url: "/status-check" },
      { title: "USSD codes guide", url: "/guides/ussd-codes" },
      { title: "SRD status meanings", url: "/status" },
    ];
  }
  if (id === "grant-amounts-history") {
    return [
      { title: "All SASSA grants at a glance", url: "/grants" },
      { title: "Payment calendar & dates", url: "/payment-calendar" },
      { title: "Types of SASSA grants", url: "/guides/grant-comparison-overview" },
    ];
  }
  if (id === "stokvel-e-wallet") {
    return [
      { title: "Banking & payment methods", url: "/banking" },
      { title: "SASSA SRD R370 grant", url: "/grants/srd-r370-grant" },
      { title: "Compare financial options", url: "/guides/compare-financial-options-south-africa" },
    ];
  }
  if (id === "appeal-timeline") {
    return [
      { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
      { title: "Appeal deadline", url: "/appeals/appeal-deadline" },
      { title: "Check your appeal status", url: "/appeals/appeal-status-check" },
    ];
  }
  if (id === "sassa-grant-renewal") {
    return [
      { title: "Grant status meanings", url: "/status" },
      { title: "All SASSA grants at a glance", url: "/grants" },
      { title: "How to reinstate a lapsed grant", url: "/guides/guide-reinstate-grant" },
    ];
  }
  if (id === "grant-comparison-overview") {
    return [
      { title: "All SASSA grants at a glance", url: "/grants" },
      { title: "SRD R370 grant", url: "/grants/srd-r370-grant" },
      { title: "Payment calendar & dates", url: "/payment-calendar" },
    ];
  }
  if (id === "sassa-online-security") {
    return [
      { title: "How to spot SASSA scams", url: "/guides/sassa-online-security" },
      { title: "SASSA scams & fraud protection", url: "/scam-alert" },
      { title: "How to check your SRD status safely", url: "/status-check" },
    ];
  }
  if (id === "life-certification") {
    return [
      { title: "Life certification troubleshooting", url: "/guides/elife-certification-troubleshooting" },
      { title: "Grant status meanings", url: "/status" },
      { title: "All SASSA grants at a glance", url: "/grants" },
    ];
  }
  if (id === "document-checklist") {
    return [
      { title: "How to apply for SASSA grants", url: "/guides/apply-sassa-grants" },
      { title: "All SASSA grants at a glance", url: "/grants" },
      { title: "How to check your grant status", url: "/status-check" },
    ];
  }
  if (id === "sassa-payment-methods") {
    return [
      { title: "Banking payment methods", url: "/banking" },
      { title: "Payment calendar & dates", url: "/payment-calendar" },
      { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
    ];
  }
  if (id === "bank-details-pending-fix") {
    return [
      { title: "Update your phone number / banking details", url: "/banking/update-phone-number" },
      { title: "What 'Bank Details Pending' means", url: "/status/bank-details-pending" },
      { title: "Banking payment methods", url: "/banking" },
    ];
  }
  if (id === "biometric-fix-guide") {
    return [
      { title: "What 'Identity Verification' means", url: "/status/identity-verification" },
      { title: "Update your phone number / banking details", url: "/banking/update-phone-number" },
      { title: "How to check your SRD status", url: "/status-check" },
    ];
  }
  if (id === "micro-business-srd") {
    return [
      { title: "SRD R370 grant", url: "/grants/srd-r370-grant" },
      { title: "Income source detected — why your grant stopped", url: "/decline-reason/income-source-detected" },
      { title: "Ways to make extra income", url: "/guides/ways-to-make-extra-income-south-africa" },
    ];
  }
  if (id === "income-source-detected-appeal") {
    return [
      { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
      { title: "Income source detected decline reason", url: "/decline-reason/income-source-detected" },
      { title: "Reconsideration explained", url: "/appeals/reconsideration" },
    ];
  }
  if (id === "bulk-means-test") {
    return [
      { title: "Means test failed — why your grant was declined", url: "/decline-reason/income-source-detected" },
      { title: "SRD R370 grant", url: "/grants/srd-r370-grant" },
      { title: "Grant status meanings", url: "/status" },
    ];
  }
  if (id === "alternative-id-grants") {
    return [
      { title: "Document checklist for your grant", url: "/guides/document-checklist" },
      { title: "How to apply for SASSA grants", url: "/guides/apply-sassa-grants" },
      { title: "All SASSA grants at a glance", url: "/grants" },
    ];
  }
  if (id === "grant-verification-process") {
    return [
      { title: "Grant status meanings", url: "/status" },
      { title: "How to check your grant status", url: "/status-check" },
      { title: "SASSA online security & scams", url: "/guides/sassa-online-security" },
    ];
  }
  if (id === "sassa-update-information") {
    return [
      { title: "Update your phone number / banking details", url: "/banking/update-phone-number" },
      { title: "How to check your SRD status", url: "/status-check" },
      { title: "Lost or changed your SASSA phone number", url: "/guides/lost-phone-number" },
    ];
  }
  if (id === "best-bank-accounts-sassa-2026") {
    return [
      { title: "Compare low-fee bank accounts", url: "/guides/best-bank-accounts-sassa-2026" },
      { title: "Banking payment methods", url: "/banking" },
      { title: "How to open a bank account for SASSA", url: "/guides/how-to-open-bank-account-sassa-payments" },
    ];
  }
  if (id === "missing-grant-payment-guide") {
    return [
      { title: "Payment calendar & dates", url: "/payment-calendar" },
      { title: "What 'Paid' means & when your money arrives", url: "/status/paid" },
      { title: "Banking payment methods", url: "/banking" },
    ];
  }
  if (id === "postbank-black-card-guide") {
    return [
      { title: "Postbank payment method", url: "/banking/postbank" },
      { title: "Banking payment methods", url: "/banking" },
      { title: "Payment calendar & dates", url: "/payment-calendar" },
    ];
  }
  if (id === "fourth-payment-day-guide") {
    return [
      { title: "What 'Under Review' means", url: "/status/under-review" },
      { title: "Payment calendar & dates", url: "/payment-calendar" },
      { title: "How to appeal a declined grant", url: "/appeals/how-to-appeal" },
    ];
  }
  if (id === "elife-certification-troubleshooting") {
    return [
      { title: "Life certification guide", url: "/guides/life-certification" },
      { title: "Grant status meanings", url: "/status" },
      { title: "All SASSA grants at a glance", url: "/grants" },
    ];
  }
  if (id === "sassa-deductions-explained") {
    return [
      { title: "Payment calendar & dates", url: "/payment-calendar" },
      { title: "Missing payment — what to do", url: "/guides/missing-grant-payment-guide" },
      { title: "Banking payment methods", url: "/banking" },
    ];
  }
  if (id === "how-to-open-bank-account-sassa-payments") {
    return [
      { title: "Banking payment methods", url: "/banking" },
      { title: "Compare low-fee bank accounts", url: "/guides/best-bank-accounts-sassa-2026" },
      { title: "Payment calendar & dates", url: "/payment-calendar" },
    ];
  }
  if (id === "sim-replacement-south-africa") {
    return [
      { title: "Lost or changed your SASSA phone number", url: "/guides/lost-phone-number" },
      { title: "Update your phone number / banking details", url: "/banking/update-phone-number" },
      { title: "SASSA WhatsApp guide", url: "/guides/sassa-whatsapp" },
    ];
  }
  if (id === "affordable-data-bundles-south-africa") {
    return [
      { title: "How to use the Moya app for SASSA", url: "/guides/moya-app-sassa" },
      { title: "SASSA WhatsApp guide", url: "/guides/sassa-whatsapp" },
      { title: "How to check your SRD status", url: "/status-check" },
    ];
  }
  if (id === "ways-to-make-extra-income-south-africa") {
    return [
      { title: "Free skills courses", url: "/guides/free-skills-courses-south-africa" },
      { title: "SRD R370 grant rules", url: "/grants/srd-r370-grant" },
      { title: "Income source detected decline reason", url: "/decline-reason/income-source-detected" },
    ];
  }
  if (id === "free-skills-courses-south-africa") {
    return [
      { title: "Ways to make extra income", url: "/guides/ways-to-make-extra-income-south-africa" },
      { title: "Compare financial options", url: "/guides/compare-financial-options-south-africa" },
      { title: "SRD R370 grant", url: "/grants/srd-r370-grant" },
    ];
  }
  if (id === "funeral-cover-south-africa-comparison") {
    return [
      { title: "What does funeral cover cost?", url: "/guides/what-does-funeral-cover-cost" },
      { title: "Compare financial options", url: "/guides/compare-financial-options-south-africa" },
      { title: "SRD R370 grant", url: "/grants/srd-r370-grant" },
    ];
  }
  if (id === "what-does-funeral-cover-cost") {
    return [
      { title: "Funeral cover comparison", url: "/guides/funeral-cover-south-africa-comparison" },
      { title: "Compare financial options", url: "/guides/compare-financial-options-south-africa" },
      { title: "SRD R370 grant", url: "/grants/srd-r370-grant" },
    ];
  }
  if (id === "compare-financial-options-south-africa") {
    return [
      { title: "Funeral cover comparison", url: "/guides/funeral-cover-south-africa-comparison" },
      { title: "Ways to make extra income", url: "/guides/ways-to-make-extra-income-south-africa" },
      { title: "SRD R370 grant", url: "/grants/srd-r370-grant" },
    ];
  }

  // Generic fallback by category — still contextual to the guide's vertical.
  switch (cat) {
    case "Applications":
      b.add("How to apply for SASSA grants", full("/guides/apply-sassa-grants"));
      b.add("Document checklist for your grant", full("/guides/document-checklist"));
      b.add("How to check your grant status", full("/status-check"));
      break;
    case "Appeals":
      b.add("How to appeal a declined grant", full("/appeals/how-to-appeal"));
      b.add("Reconsideration explained", full("/appeals/reconsideration"));
      break;
    case "Banking":
      b.add("Banking & payment methods", full("/banking"));
      b.add("Payment calendar & dates", full("/payment-calendar"));
      break;
    case "Payment Problems":
      b.add("Missing payment — what to do", full("/guides/missing-grant-payment-guide"));
      b.add("Payment calendar & dates", full("/payment-calendar"));
      break;
    case "Payment Dates":
      b.add("Payment calendar & dates", full("/payment-calendar"));
      b.add("What 'Under Review' means", full("/status/under-review"));
      break;
    case "Technology":
    case "Mobile & Data":
    case "Account & SIM":
      b.add("How to check your SRD status", full("/status-check"));
      b.add("SASSA WhatsApp guide", full("/guides/sassa-whatsapp"));
      break;
    case "Scam Alert":
      b.add("How to spot SASSA scams", full("/guides/sassa-online-security"));
      b.add("SASSA scams & fraud protection", full("/scam-alert"));
      break;
    case "Eligibility":
      b.add("All SASSA grants at a glance", full("/grants"));
      b.add("SRD R370 grant", full("/grants/srd-r370-grant"));
      break;
    case "Identity Verification":
      b.add("What 'Identity Verification' means", full("/status/identity-verification"));
      b.add("Fix biometric verification problems", full("/guides/biometric-fix-guide"));
      break;
    case "Insurance":
    case "Money & Finance":
      b.add("Compare financial options", full("/guides/compare-financial-options-south-africa"));
      b.add("SRD R370 grant", full("/grants/srd-r370-grant"));
      break;
    case "Income & Jobs":
      b.add("Ways to make extra income", full("/guides/ways-to-make-extra-income-south-africa"));
      b.add("Free skills courses", full("/guides/free-skills-courses-south-africa"));
      break;
    case "Education & Skills":
      b.add("Free skills courses", full("/guides/free-skills-courses-south-africa"));
      b.add("Ways to make extra income", full("/guides/ways-to-make-extra-income-south-africa"));
      break;
    case "SRD Grant":
      b.add("SRD R370 grant", full("/grants/srd-r370-grant"));
      b.add("SRD status meanings", full("/status"));
      break;
    case "Grant Management":
      b.add("Grant status meanings", full("/status"));
      b.add("How to reinstate a lapsed grant", full("/guides/guide-reinstate-grant"));
      break;
    case "Account Management":
      b.add("Update your phone number / banking details", full("/banking/update-phone-number"));
      b.add("How to check your SRD status", full("/status-check"));
      break;
    default:
      b.add("All SASSA grants", full("/grants"));
      b.add("Grant status meanings", full("/status"));
      b.add("How to check your grant status", full("/status-check"));
  }
  return b.build();
}
