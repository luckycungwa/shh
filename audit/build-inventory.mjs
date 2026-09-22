// Generator for /audit/url-inventory.csv
// Merges crawl-derived data (content-audit/page-quality-data.csv) with
// structured content metadata from public/data/*.json and the editorial
// classification produced during the AdSense-readiness audit.
//
// Run: node audit/build-inventory.mjs  (outputs audit/url-inventory.csv)

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "audit", "url-inventory.csv");

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));
  } catch {
    return null;
  }
}

// ---- crawl data (content-audit/page-quality-data.csv) ----
// header: url,type,score,grade,title,words,readingTimeMin,dupSim,dupWith,h1,h2,h3,
//         hasFaq,internalLinks,brokenLinks,externalCitations,externalDomains,schemaTypes,
//         lastUpdated,lastUpdatedAgeDays,author,authorByline,images,imagesNoAlt,tables,
//         canonicalOk,metaDescLen,metaDescUnique
function parseCSVText(t) {
  const rows = [];
  let row = [], cur = "", inq = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (inq) {
      if (c === '"') { inq = false; }
      else cur += c;
    } else if (c === '"') { inq = true; }
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && t[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else cur += c;
  }
  return rows;
}
const crawlRows = parseCSVText(fs.readFileSync(path.join(ROOT, "content-audit/page-quality-data.csv"), "utf8")).slice(1);
const CI = { score: 2, title: 4, words: 5, dup: 7, h1: 9, h2: 10, hasFaq: 12, intLinks: 13, extCites: 15, lastUpdated: 18 };
function csvVal(url, key) {
  const row = crawlRows.find((r) => r[0] === url);
  return row ? row[CI[key]] ?? "" : "";
}

// ---- content data ----
const updates = readJson("public/data/updates.json") || [];
const guides = readJson("public/data/guides.json") || [];
const grants = fs.readdirSync(path.join(ROOT, "public/data/grants")).filter((f) => f.endsWith(".json")).map((f) =>
  readJson("public/data/grants/" + f)
);
const declineReasons = readJson("public/data/decline-reasons.json") || [];
const provinces = readJson("public/data/provinces.json") || [];

function countWordsInSections(data) {
  let text = (data.title || "") + " " + (data.summary || data.description || "");
  const walk = (o) => {
    if (typeof o === "string") { text += " " + o; return; }
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (o && typeof o === "object") {
      for (const k of Object.keys(o)) {
        if (k === "faqs" || String(k).startsWith("_")) continue;
        walk(o[k]);
      }
    }
  };
  if (data.sections) data.sections.forEach(walk);
  if (data.content) text += " " + data.content;
  if (data.steps) text += " " + JSON.stringify(data.steps);
  if (data.faqs) text += " " + JSON.stringify(data.faqs);
  return text.replace(/[#*`_>\-[]()|]/g, " ").split(/\s+/).filter(Boolean).length;
}

function faqCountOf(data) {
  let n = 0;
  if (Array.isArray(data.sections)) {
    for (const s of data.sections) {
      if (s.type === "faq" && Array.isArray(s.faqs)) n += s.faqs.length;
    }
  }
  if (Array.isArray(data.faqs)) n += data.faqs.length;
  return n;
}

function sourceCountOf(data) {
  let n = 0;
  if (Array.isArray(data.sources)) n += data.sources.length;
  if (Array.isArray(data.references)) n += data.references.length;
  if (Array.isArray(data.sections)) {
    for (const s of data.sections) if (Array.isArray(s.references)) n += s.references.length;
  }
  return n;
}

// ---- Classification rules (from the audit) ----

const ACTIONS = {
  home: "IMPROVE", updates_index: "IMPROVE", payment_calendar: "KEEP", status_check: "IMPROVE",
  faq_index: "IMPROVE", guides_index: "KEEP", grants_index: "KEEP", status_index: "KEEP",
  scam_alert: "IMPROVE", resources: "IMPROVE", about: "IMPROVE", authors: "IMPROVE",
  editorial: "IMPROVE", fact_check: "IMPROVE", sources: "IMPROVE", corrections: "IMPROVE",
  contact: "IMPROVE", privacy: "IMPROVE", disclaimer: "KEEP", terms: "KEEP",
  eligibility: "IMPROVE", glossary: "IMPROVE", sassa_offices: "IMPROVE", common_problems: "KEEP",
};

const GUIDE_ACTIONS = {
  "micro-business-srd": "IMPROVE", "moya-app-sassa": "IMPROVE", "bank-details-pending-fix": "IMPROVE",
  "sassa-online-security": "IMPROVE", "elife-certification-troubleshooting": "IMPROVE",
  "biometric-fix-guide": "IMPROVE", "grant-amounts-history": "IMPROVE", "bulk-means-test": "IMPROVE",
  "srd-grant": "MERGE", "change-banking-details": "MERGE", "biometric-verification-guide": "MERGE",
  "guide-report-fraud": "MERGE", "guide-means-test": "MERGE", "guide-reinstate-grant": "IMPROVE",
  "postbank-black-card": "MERGE", "status-check-no-phone": "MERGE", "ussd-codes": "KEEP",
  "fourth-payment-day-guide": "IMPROVE", "missing-grant-payment-guide": "IMPROVE",
  "sassa-deductions-explained": "IMPROVE",
};
const GUIDE_ACTION_DEFAULTS = {
  Applications: "KEEP", "SRD Grant": "KEEP", Appeals: "KEEP", Banking: "KEEP", Technology: "KEEP",
  "Grant Management": "KEEP", "Scam Alert": "KEEP", "Account Management": "KEEP", Reference: "KEEP",
  Eligibility: "KEEP", "Card Services": "KEEP", "Payment Problems": "KEEP", "Payment Dates": "KEEP",
  "Identity Verification": "KEEP",
};

const UPDATE_ACTIONS = {
  "update-2026-001": "REDIRECT", "update-2026-002": "IMPROVE", "update-2026-003": "IMPROVE",
  "update-2026-004": "IMPROVE", "update-2026-005": "MERGE", "update-2026-006": "MERGE",
  "update-2026-007": "MERGE", "update-2026-008": "MERGE", "update-2026-009": "REMOVE",
  "update-2026-010": "IMPROVE", "update-2026-011": "KEEP", "update-2026-012": "IMPROVE",
  "update-2026-013": "REDIRECT", "update-2026-014": "IMPROVE", "update-2026-015": "REDIRECT",
  "update-2026-016": "KEEP", "update-2026-017": "KEEP", "update-2026-018": "REDIRECT",
  "update-2026-019": "IMPROVE", "update-2026-020": "IMPROVE", "update-2026-021": "MERGE",
  "update-2026-022": "REDIRECT", "update-2026-023": "NOINDEX", "update-2026-024": "NOINDEX",
  "update-2026-025": "MERGE", "update-2026-026": "MERGE", "update-2026-027": "REDIRECT",
  "update-2026-028": "IMPROVE", "update-2026-029": "NOINDEX", "update-2026-030": "REMOVE",
  "update-2026-031": "IMPROVE", "update-2026-032": "REMOVE", "update-2026-033": "KEEP",
  "update-2026-034": "IMPROVE",
};

// Already 301-redirected to /payment-calendar in next.config.js
const REDIRECTED_UPDATES = new Set([
  "update-2026-001", "update-2026-013", "update-2026-015",
  "update-2026-018", "update-2026-022", "update-2026-027",
]);

const GRANT_RISK = {
  "srd-r370-grant": "HIGH", "foster-child-grant": "HIGH", "old-age-pension": "HIGH",
  "care-dependency-grant": "HIGH", "child-support-grant": "MEDIUM", "disability-grant": "MEDIUM",
  "grant-in-aid": "MEDIUM", "war-veterans-grant": "MEDIUM",
};

// ---- URL records ----
const records = [];
const push = (rec) => records.push(rec);

const CANON = (u) => `https://www.sassahelphub.co.za${u === "/" ? "" : u}`;
const CRED = "Independent publisher & editor (no formal qualifications claimed)";

// Static pages
const staticDefs = [
  { url: "/", type: "homepage", titleLabel: "SASSA Help Hub - Your Unofficial SASSA Resource", action: ACTIONS.home, risk: "MEDIUM", sitemap: true, dup: "LOW" },
  { url: "/updates", type: "listing", titleLabel: "SASSA Grant Updates & Information", action: ACTIONS.updates_index, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/payment-calendar", type: "tool", titleLabel: "SASSA Payment Calendar", action: ACTIONS.payment_calendar, risk: "MEDIUM", sitemap: true, dup: "MEDIUM" },
  { url: "/status-check", type: "tool", titleLabel: "SASSA Status Check", action: ACTIONS.status_check, risk: "MEDIUM", sitemap: true, dup: "MEDIUM" },
  { url: "/faq", type: "listing", titleLabel: "SASSA FAQ", action: ACTIONS.faq_index, risk: "MEDIUM", sitemap: true, dup: "LOW" },
  { url: "/guides", type: "listing", titleLabel: "SASSA Guides", action: ACTIONS.guides_index, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/grants", type: "listing", titleLabel: "SASSA Grants", action: ACTIONS.grants_index, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/status", type: "listing", titleLabel: "SASSA Status Meanings", action: ACTIONS.status_index, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/scam-alert", type: "utility", titleLabel: "SASSA Scam Alerts", action: ACTIONS.scam_alert, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/resources", type: "utility", titleLabel: "SASSA Resources & Offices", action: ACTIONS.resources, risk: "HIGH", sitemap: true, dup: "LOW" },
  { url: "/about", type: "trust", titleLabel: "About SASSA Help Hub", action: ACTIONS.about, risk: "MEDIUM", sitemap: true, dup: "LOW" },
  { url: "/authors", type: "trust", titleLabel: "About the Author", action: ACTIONS.authors, risk: "MEDIUM", sitemap: true, dup: "LOW" },
  { url: "/editorial-policy", type: "trust", titleLabel: "Editorial Policy", action: ACTIONS.editorial, risk: "MEDIUM", sitemap: true, dup: "LOW" },
  { url: "/fact-checking-policy", type: "trust", titleLabel: "Fact-Checking Policy", action: ACTIONS.fact_check, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/sources-policy", type: "trust", titleLabel: "Sources Policy", action: ACTIONS.sources, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/corrections-policy", type: "trust", titleLabel: "Corrections Policy", action: ACTIONS.corrections, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/contact", type: "utility", titleLabel: "Contact SASSA Help Hub", action: ACTIONS.contact, risk: "MEDIUM", sitemap: true, dup: "LOW" },
  { url: "/privacy-policy", type: "trust", titleLabel: "Privacy Policy", action: ACTIONS.privacy, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/disclaimer", type: "trust", titleLabel: "Disclaimer", action: ACTIONS.disclaimer, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/terms-of-service", type: "trust", titleLabel: "Terms of Service", action: ACTIONS.terms, risk: "LOW", sitemap: true, dup: "LOW" },
  { url: "/eligibility-check", type: "tool", titleLabel: "SASSA Eligibility Check", action: ACTIONS.eligibility, risk: "LOW", sitemap: true, dup: "MEDIUM" },
  { url: "/glossary", type: "reference", titleLabel: "SASSA Glossary", action: ACTIONS.glossary, risk: "MEDIUM", sitemap: true, dup: "LOW" },
  { url: "/sassa-offices", type: "directory", titleLabel: "SASSA Offices", action: ACTIONS.sassa_offices, risk: "HIGH", sitemap: true, dup: "LOW" },
  { url: "/common-problems", type: "listing", titleLabel: "Common SASSA Problems", action: ACTIONS.common_problems, risk: "LOW", sitemap: true, dup: "LOW" },
];

for (const s of staticDefs) {
  const words = parseInt(csvVal(s.url, "words") || "0", 10);
  push({
    url: s.url, type: s.type,
    title: csvVal(s.url, "title") || s.titleLabel,
    metaDesc: csvVal(s.url, "title") || s.titleLabel,
    canonical: CANON(s.url), words, h1: csvVal(s.url, "h1"), h2: csvVal(s.url, "h2"),
    faqCount: csvVal(s.url, "hasFaq") === "Y" ? 1 : 0, sourceCount: "",
    author: "-", credentials: "-", datePub: "-",
    dateMod: csvVal(s.url, "lastUpdated") || "",
    intLinks: csvVal(s.url, "intLinks"), extSources: csvVal(s.url, "extCites"),
    indexable: true, sitemap: s.sitemap, orphan: "No", dup: s.dup,
    risk: s.risk, score: 0, action: s.action,
  });
}

// Grants
for (const g of grants) {
  const slug = g.slug ? g.slug.replace("grants/", "") : "?";
  const url = `/grants/${slug}`;
  const words = parseInt(csvVal(url, "words") || "0", 10);
  push({
    url, type: "grant", title: csvVal(url, "title") || g.title,
    metaDesc: g.description || "", canonical: CANON(url),
    words, h1: csvVal(url, "h1"), h2: csvVal(url, "h2"),
    faqCount: faqCountOf(g), sourceCount: sourceCountOf(g),
    author: g.author || "Lucky Cungwa", credentials: CRED,
    datePub: g.last_updated || "-", dateMod: g.last_updated || "",
    intLinks: csvVal(url, "intLinks"), extSources: csvVal(url, "extCites"),
    indexable: true, sitemap: true, orphan: "No", dup: parseFloat(csvVal(url, "dup") || "0") >= 0.35 ? "HIGH" : "LOW",
    risk: GRANT_RISK[slug] || "MEDIUM", score: 0,
    action: ["srd-r370-grant", "foster-child-grant", "old-age-pension", "care-dependency-grant"].includes(slug) ? "IMPROVE" : "KEEP",
  });
}

// Guides
for (const g of guides) {
  const url = `/guides/${g.id}`;
  const words = parseInt(csvVal(url, "words") || "0", 10);
  const action = GUIDE_ACTIONS[g.id] || GUIDE_ACTION_DEFAULTS[g.category] || "KEEP";
  const highRisk = ["micro-business-srd", "moya-app-sassa", "bank-details-pending-fix", "sassa-online-security", "elife-certification-troubleshooting", "grant-amounts-history", "best-bank-accounts-sassa-2026", "sassa-deductions-explained"].includes(g.id);
  push({
    url, type: "guide", title: csvVal(url, "title") || g.title,
    metaDesc: g.title || "", canonical: CANON(url),
    words, h1: csvVal(url, "h1"), h2: csvVal(url, "h2"),
    faqCount: faqCountOf(g), sourceCount: sourceCountOf(g),
    author: g.author || "Lucky Cungwa", credentials: CRED,
    datePub: g.lastUpdated || "-", dateMod: g.lastUpdated || "",
    intLinks: csvVal(url, "intLinks"), extSources: csvVal(url, "extCites"),
    indexable: true, sitemap: true, orphan: "No", dup: parseFloat(csvVal(url, "dup") || "0") >= 0.35 ? "HIGH" : "LOW",
    risk: highRisk ? "HIGH" : parseFloat(csvVal(url, "dup") || "0") >= 0.35 ? "MEDIUM" : "LOW",
    score: 0, action,
  });
}

// Updates
for (const u of updates) {
  const url = `/updates/${u.id}`;
  const isSched = u.tag === "monthly-payment-schedule" || REDIRECTED_UPDATES.has(u.id);
  const isIndexable = !u.noindex && !isSched;
  const words = (parseInt(csvVal(url, "words") || "0", 10)) || countWordsInSections(u);
  const action = isSched ? "REDIRECT" : (UPDATE_ACTIONS[u.id] || "KEEP");
  const highRisk = ["update-2026-030", "update-2026-032", "update-2026-009", "update-2026-010", "update-2026-012", "update-2026-020", "update-2026-023", "update-2026-028", "update-2026-018", "update-2026-002", "update-2026-004"].includes(u.id);
  push({
    url, type: "update", title: csvVal(url, "title") || u.title || u.summary || "",
    metaDesc: u.summary || "", canonical: CANON(url),
    words, h1: csvVal(url, "h1"), h2: csvVal(url, "h2"),
    faqCount: Array.isArray(u.faqs) ? u.faqs.length : 0,
    sourceCount: Array.isArray(u.sources) ? u.sources.length : 0,
    author: u.author || "Lucky Cungwa", credentials: CRED,
    datePub: u.date || "-", dateMod: u.date || "",
    intLinks: csvVal(url, "intLinks"), extSources: csvVal(url, "extCites"),
    indexable: isIndexable, sitemap: isIndexable, orphan: "No", dup: parseFloat(csvVal(url, "dup") || "0") >= 0.35 ? "HIGH" : "LOW",
    risk: highRisk ? "HIGH" : "MEDIUM",
    score: 0, action,
  });
}

// Status pages
const statusSlugs = ["application-complete", "pending", "bank-details-pending", "identity-verification", "referred", "means-test-failed", "approved", "declined", "appeal-pending", "paid"];
for (const s of statusSlugs) {
  const url = `/status/${s}`;
  const words = parseInt(csvVal(url, "words") || "0", 10);
  push({
    url, type: "status", title: csvVal(url, "title") || s.replace(/-/g, " "),
    metaDesc: "", canonical: CANON(url),
    words, h1: csvVal(url, "h1"), h2: csvVal(url, "h2"), faqCount: 0,
    sourceCount: "",
    author: "Lucky Cungwa", credentials: CRED,
    datePub: "-", dateMod: csvVal(url, "lastUpdated") || "",
    intLinks: csvVal(url, "intLinks"), extSources: csvVal(url, "extCites"),
    indexable: true, sitemap: true, orphan: "No", dup: parseFloat(csvVal(url, "dup") || "0") >= 0.3 ? "MEDIUM" : "LOW",
    risk: "MEDIUM", score: 0, action: "IMPROVE",
  });
}

// Decline-reason pages
for (const d of declineReasons) {
  const slug = (d.slug || d.id || "").replace("decline-reason/", "");
  const url = `/decline-reason/${slug}`;
  const words = parseInt(csvVal(url, "words") || "0", 10);
  push({
    url, type: "decline", title: csvVal(url, "title") || d.title || slug.replace(/-/g, " "),
    metaDesc: d.description || "", canonical: CANON(url),
    words, h1: csvVal(url, "h1"), h2: csvVal(url, "h2"), faqCount: 0,
    sourceCount: Array.isArray(d.sources) ? d.sources.length : 0,
    author: "Lucky Cungwa", credentials: CRED,
    datePub: d.last_updated || "-", dateMod: d.last_updated || "",
    intLinks: csvVal(url, "intLinks"), extSources: csvVal(url, "extCites"),
    indexable: true, sitemap: true, orphan: "No", dup: parseFloat(csvVal(url, "dup") || "0") >= 0.35 ? "HIGH" : "LOW",
    risk: "HIGH", score: 0, action: "IMPROVE",
  });
}

// Province pages
for (const p of provinces) {
  const slug = (p.slug || p.id || "").replace("province/", "");
  const url = `/province/${slug}`;
  const words = parseInt(csvVal(url, "words") || "0", 10);
  push({
    url, type: "province", title: csvVal(url, "title") || p.title || `${slug.replace(/-/g, " ")} SASSA`,
    metaDesc: "", canonical: CANON(url),
    words, h1: csvVal(url, "h1"), h2: csvVal(url, "h2"), faqCount: 0,
    sourceCount: 0,
    author: "Lucky Cungwa", credentials: CRED,
    datePub: p.last_updated || "-", dateMod: p.last_updated || "",
    intLinks: csvVal(url, "intLinks"), extSources: csvVal(url, "extCites"),
    indexable: true, sitemap: true, orphan: "No", dup: parseFloat(csvVal(url, "dup") || "0") >= 0.3 ? "MEDIUM" : "LOW",
    risk: "HIGH", score: 0, action: "IMPROVE",
  });
}

// ---- content-quality score (0-100) ----
const RISK_PENALTY = { HIGH: 15, MEDIUM: 8, LOW: 0 };
function computeScore(rec) {
  const crawlScore = parseFloat(csvVal(rec.url, "score") || "80");
  let s = crawlScore;
  s -= RISK_PENALTY[rec.risk] || 0;
  if (rec.words > 0 && rec.words < 300) s -= 12;
  if (rec.words > 0 && rec.words < 150) s -= 10;
  if (rec.dup === "HIGH") s -= 8;
  if (rec.action === "MERGE") s -= 5;
  if (rec.action === "REMOVE") s -= 20;
  if (rec.action === "NOINDEX") s -= 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}
for (const r of records) r.score = computeScore(r);

// ---- CSV ----
const header = [
  "URL", "page type", "title", "meta description", "canonical", "word count", "H1",
  "H2 count", "FAQ count", "source/reference count", "author", "author credentials",
  "date published", "date modified", "internal links", "outgoing official-source links",
  "index/noindex status", "sitemap inclusion", "orphan status", "duplicate/similar-page risk",
  "factual-risk level", "content-quality score", "recommended action",
];
function esc(v) {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
const lines = [header.join(",")];
for (const r of records) {
  lines.push([
    r.url, r.type, esc(r.title), esc(r.metaDesc), r.canonical, r.words, esc(r.h1),
    r.h2, r.faqCount, r.sourceCount, r.author, esc(r.credentials), r.datePub, r.dateMod,
    r.intLinks, r.extSources, r.indexable ? "index" : "noindex", r.sitemap ? "yes" : "no",
    r.orphan, r.dup, r.risk, r.score, r.action,
  ].join(","));
}
fs.writeFileSync(OUT, lines.join("\n") + "\n", "utf8");
console.log(`Wrote ${records.length} records to ${OUT}`);
const dist = {};
for (const r of records) dist[r.action] = (dist[r.action] || 0) + 1;
console.log("Actions:", JSON.stringify(dist));