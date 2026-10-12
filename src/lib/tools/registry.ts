/**
 * The single source of truth for SASSA Help Hub tools.
 *
 * Consumers: the /tools hub, the Navbar dropdown, sitemap.ts and the site
 * search index. Adding a tool here is the only edit needed to make it appear in
 * all four — do not hardcode a second tool list anywhere else.
 *
 * Deliberately contains NO grant thresholds, calculator rules or page copy
 * bodies. Those live in `grantRules.ts` (data) and in the tool page itself.
 *
 * Only tools that exist and are indexable belong in this list. A tool that is
 * planned but not built is never added here, because every consumer would then
 * render a link to a 404.
 */

export type ToolStatus = "active" | "planned";

export type ToolCluster =
  | "eligibility"
  | "status"
  | "payments"
  | "appeals"
  | "applications"
  | "banking"
  | "safety";

export interface ToolEntry {
  /** Last path segment. Unique across the registry. */
  slug: string;
  /** Canonical path. The only URL this tool is published at. */
  path: string;
  /** Short label for nav items and cards. */
  title: string;
  /** One useful line for the hub and search. Not marketing copy. */
  tagline: string;
  cluster: ToolCluster;
  status: ToolStatus;
  /** Sitemap priority. */
  priority: number;
  /** Sitemap change frequency. */
  changeFreq: "weekly" | "monthly" | "yearly";
  /**
   * react-icons/fa export name, resolved to a component by the Navbar.
   * A string keeps this module free of JSX so it stays importable from the
   * server (sitemap) and from client components (Navbar) alike.
   */
  icon: string;
}

export const TOOL_CLUSTERS: { id: ToolCluster; label: string; blurb: string }[] = [
  { id: "eligibility", label: "Eligibility", blurb: "Check the requirements for a grant before you apply." },
  { id: "status", label: "Status", blurb: "Work out what your grant or SRD status means." },
  { id: "payments", label: "Payments", blurb: "Find out why a payment is late, missing or not showing." },
  { id: "appeals", label: "Appeals", blurb: "Act on a decline within the right window." },
  { id: "applications", label: "Applications", blurb: "Prepare documents and follow an application." },
  { id: "banking", label: "Banking", blurb: "Fix banking, phone number and payment method problems." },
  { id: "safety", label: "Safety", blurb: "Avoid scams and check messages you receive." },
];

export const TOOLS: ToolEntry[] = [
  {
    slug: "eligibility-check",
    path: "/eligibility-check",
    title: "Grant Eligibility Checker",
    tagline: "Answer a few questions to see which grant requirements you meet.",
    cluster: "eligibility",
    status: "active",
    priority: 0.7,
    changeFreq: "monthly",
    icon: "FaCheckCircle",
  },
  {
    slug: "means-test-calculator",
    path: "/tools/means-test-calculator",
    title: "Means Test Calculator",
    tagline: "Compare your income and assets against a grant's published thresholds.",
    cluster: "eligibility",
    status: "active",
    priority: 0.6,
    changeFreq: "monthly",
    icon: "FaBalanceScale",
  },
  {
    slug: "status-explorer",
    path: "/tools/status-explorer",
    title: "Status Meaning Explorer",
    tagline: "Select your status to get a plain-English meaning and the next step.",
    cluster: "status",
    status: "active",
    priority: 0.6,
    changeFreq: "monthly",
    icon: "FaBookOpen",
  },
  {
    slug: "payment-troubleshooter",
    path: "/tools/payment-troubleshooter",
    title: "Payment Troubleshooter",
    tagline: "Answer a few questions to work out why your payment has not arrived.",
    cluster: "payments",
    status: "active",
    priority: 0.6,
    changeFreq: "monthly",
    icon: "FaSearch",
  },
  {
    slug: "appeal-deadline",
    path: "/tools/appeal-deadline",
    title: "Appeal Deadline Calculator",
    tagline: "Work out how long you have to appeal a decline and when to start.",
    cluster: "appeals",
    status: "active",
    priority: 0.6,
    changeFreq: "monthly",
    icon: "FaCalendarAlt",
  },
  {
    slug: "scam-message-checker",
    path: "/tools/scam-message-checker",
    title: "Scam Message Checker",
    tagline: "Paste a suspicious SASSA message and see the scam patterns it matches.",
    cluster: "safety",
    status: "active",
    priority: 0.6,
    changeFreq: "weekly",
    icon: "FaShieldAlt",
  },
];

/** Tools that exist and may be linked, indexed and submitted to search engines. */
export function getActiveTools(): ToolEntry[] {
  return TOOLS.filter((t) => t.status === "active");
}

export function getTool(path: string): ToolEntry | undefined {
  return TOOLS.find((t) => t.path === path);
}

export function getToolsByCluster(): { cluster: (typeof TOOL_CLUSTERS)[number]; tools: ToolEntry[] }[] {
  return TOOL_CLUSTERS.map((cluster) => ({
    cluster,
    tools: getActiveTools().filter((t) => t.cluster === cluster.id),
  })).filter((group) => group.tools.length > 0);
}
