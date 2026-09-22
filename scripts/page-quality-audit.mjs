import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";

const PORT = 3000;
const BASE = `http://localhost:${PORT}`;
const SITE = "https://www.sassahelphub.co.za";
const OUT_DIR = path.join(process.cwd(), "content-audit");
const NUM_HASHES = 96;
const NOW = new Date();

const WEIGHTS = {
  wordCount: 18,
  duplicate: 13,
  headings: 9,
  faqs: 8,
  internalLinks: 7,
  externalCitations: 7,
  schema: 7,
  lastUpdated: 6,
  author: 5,
  canonical: 5,
  metaDescription: 5,
  images: 5,
  tables: 5,
};

const GRADES = [
  { min: 80, label: "A" },
  { min: 60, label: "B" },
  { min: 40, label: "C" },
  { min: 0, label: "D" },
];

function grade(score) {
  return GRADES.find((g) => score >= g.min).label;
}

function normalizeText(s) {
  return (s || "")
    .replace(/(?:\u00a0|\u200b|\u200c|\u200d|\ufeff)+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(text) {
  const t = normalizeText(text);
  return t ? t.split(" ").length : 0;
}

function parseDate(str) {
  if (!str) return null;
  const s = String(str).trim();
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function ageDays(date) {
  return Math.max(0, Math.floor((NOW - date) / 86400000));
}

function collectTypes(node, out) {
  if (Array.isArray(node)) {
    for (const n of node) collectTypes(n, out);
    return;
  }
  if (node && typeof node === "object") {
    if (node["@type"]) {
      if (Array.isArray(node["@type"])) for (const t of node["@type"]) out.push(t);
      else out.push(node["@type"]);
    }
    if (node["@graph"]) collectTypes(node["@graph"], out);
  }
}

function findAuthor(node) {
  if (Array.isArray(node)) {
    for (const n of node) {
      const a = findAuthor(n);
      if (a) return a;
    }
    return null;
  }
  if (node && typeof node === "object") {
    if (typeof node.author === "string") return node.author;
    if (node.author && typeof node.author === "object" && node.author.name) return node.author.name;
    for (const k of Object.keys(node)) {
      const a = findAuthor(node[k]);
      if (a) return a;
    }
  }
  return null;
}

function findModified(node) {
  if (Array.isArray(node)) {
    for (const n of node) {
      const m = findModified(n);
      if (m) return m;
    }
    return null;
  }
  if (node && typeof node === "object") {
    if (typeof node.dateModified === "string") return node.dateModified;
    if (typeof node.datePublished === "string") return node.datePublished;
    for (const k of Object.keys(node)) {
      const m = findModified(node[k]);
      if (m) return m;
    }
  }
  return null;
}

function extractPageMetrics(url, html) {
  const $ = load(html);
  const main = $("#main-content");
  const mainText = normalizeText(main.text());
  const words = wordCount(mainText);
  const title = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').first().attr("content") || "";
  const canonical = $('link[rel="canonical"]').first().attr("href") || "";
  const h1 = main.find("h1").length;
  const h2 = main.find("h2").length;
  const h3 = main.find("h3").length;
  const images = main.find("img").length;
  const imagesNoAlt = main.find("img:not([alt])").length;
  const tables = main.find("table").length;
  const faqVisible = /frequently asked/i.test(mainText);

  const schemaTypes = [];
  let ldAuthor = null;
  let ldModified = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).html();
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      collectTypes(data, schemaTypes);
      ldAuthor = ldAuthor || findAuthor(data);
      ldModified = ldModified || findModified(data);
    } catch {}
  });
  const pageTypes = new Set(schemaTypes.filter((t) => !["WebSite", "Organization", "Person", "SearchAction"].includes(t)));
  const hasFaq = faqVisible || pageTypes.has("FAQPage");

  const links = [];
  main.find("a[href]").each((_, el) => links.push($(el).attr("href")));
  const internal = [];
  const external = [];
  for (const href of links) {
    if (!href) continue;
    const clean = href.trim().split("#")[0];
    if (!clean || clean.startsWith("mailto:") || clean.startsWith("tel:") || clean.startsWith("javascript:")) continue;
    if (clean.startsWith("/") && !clean.startsWith("//")) internal.push(clean);
    else if (clean.startsWith(SITE)) internal.push(clean.slice(SITE.length));
    else if (/^https?:\/\//.test(clean)) external.push(clean);
  }
  const externalDomains = [...new Set(external.map((u) => new URL(u).hostname))];

  let lastUpdated = null;
  const mVerify = mainText.match(/last verified:\s*([^|]+?)(?:\s|\|)/i) || mainText.match(/last verified:\s*([\d/]+|[\d]{1,2} [A-Za-z]{3,9} \d{4})/i);
  const mUpdated = mainText.match(/updated:\s*([\d/]+|[\d]{1,2} [A-Za-z]{3,9} \d{4})/i);
  const rawDate = (mVerify && mVerify[1]) || (mUpdated && mUpdated[1]) || ldModified || null;
  if (rawDate) {
    const d = parseDate(rawDate);
    if (d) lastUpdated = d.toISOString().slice(0, 10);
  }

  const bylineMatch = mainText.match(/written by\s+([A-Z][A-Za-z '.-]{2,60})/i);
  const author = ldAuthor || (bylineMatch && bylineMatch[1].trim()) || null;
  const authorByline = !!(bylineMatch && bylineMatch[1]);

  const urlPath = new URL(url).pathname;
  const canonicalOk = canonical === `${SITE}${urlPath}` || canonical === `${SITE}${urlPath.replace(/\/$/, "")}` || canonical === url.replace(/\/$/, "");

  return {
    url,
    path: urlPath,
    text: mainText,
    title,
    words,
    h1,
    h2,
    h3,
    hasFaq,
    faqVisible,
    internal,
    external,
    externalDomains,
    schemaTypes: pageTypes,
    lastUpdated,
    lastUpdatedRaw: rawDate,
    author,
    authorByline,
    images,
    imagesNoAlt,
    tables,
    canonical,
    canonicalOk,
    metaDescription,
  };
}

function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function shingleSet(text) {
  const t = text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const set = new Set();
  for (let i = 0; i + 8 <= t.length; i++) set.add(t.slice(i, i + 8));
  return set;
}

const SEEDS = (() => {
  let s = 0x12345678;
  const next = () => (s = (s * 1664525 + 1013904223) >>> 0);
  return Array.from({ length: NUM_HASHES }, next);
})();

function minHashSignature(text) {
  const shingles = shingleSet(text);
  if (shingles.size < 10) return null;
  const sig = [];
  for (let h = 0; h < NUM_HASHES; h++) {
    let min = 0xffffffff;
    for (const sh of shingles) {
      const v = fnv1a(sh + "::" + SEEDS[h]);
      if (v < min) min = v;
    }
    sig.push(min);
  }
  return sig;
}

function minHashSimilarity(a, b) {
  let same = 0;
  for (let i = 0; i < NUM_HASHES; i++) if (a[i] === b[i]) same++;
  return same / NUM_HASHES;
}

function pageType(path) {
  if (path === "/" || path === "/status-check" || path === "/eligibility-check" || path === "/payment-calendar") return "tool";
  if (path.startsWith("/guides/")) return "guide";
  if (path.startsWith("/grants/")) return "grant";
  if (path.startsWith("/status/")) return "status";
  if (path.startsWith("/province/")) return "province";
  if (path.startsWith("/decline-reason/")) return "decline";
  if (path.startsWith("/updates/")) return "update";
  if (path.startsWith("/faq") || path === "/glossary" || path === "/resources" || path === "/sassa-offices" || path === "/common-problems") return "listing";
  if (path === "/updates" || path === "/guides" || path === "/grants" || path === "/status") return "listing";
  return "static";
}

function scoreWordCount(words) {
  if (words >= 1000) return 100;
  if (words >= 600) return 90;
  if (words >= 300) return 70;
  if (words >= 150) return 40;
  return 0;
}

function scoreDuplicate(sim) {
  if (sim === null) return 100;
  if (sim <= 0.2) return 100;
  if (sim <= 0.35) return 60;
  if (sim <= 0.5) return 30;
  return 0;
}

function scoreHeadings(m) {
  if (m.h1 === 1 && m.h2 >= 1) return 100;
  if (m.h1 === 1) return 50;
  return 0;
}

function scoreFaqs(m, type) {
  if (type === "listing" || type === "static" || type === "tool") return 100;
  return m.hasFaq ? 100 : 30;
}

function scoreSchema(m, type) {
  const types = m.schemaTypes;
  if (type === "guide") return types.has("HowTo") ? 100 : 50;
  if (type === "listing" || type === "tool") return types.has("FAQPage") || types.has("WebApplication") || types.has("GovernmentOffice") ? 100 : 50;
  if (types.has("Article") || types.has("NewsArticle") || types.has("HowTo") || types.has("FAQPage") || types.has("GovernmentOffice")) return 100;
  if (types.size > 0) return 50;
  return 0;
}

function scoreLastUpdated(m) {
  if (!m.lastUpdated) return 0;
  const days = ageDays(new Date(m.lastUpdated));
  if (days <= 90) return 100;
  if (days <= 180) return 60;
  return 30;
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length);
  let idx = 0;
  async function run() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

async function fetchHtml(url, timeoutMs = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { redirect: "follow", signal: controller.signal });
    const html = await res.text();
    return { status: res.status, url: res.url, html };
  } finally {
    clearTimeout(timer);
  }
}

async function waitForServer(timeoutMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`${BASE}/sitemap.xml`);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error("Server did not become ready in time");
}

function startServer() {
  const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: process.cwd(),
    stdio: "ignore",
  });
  return child;
}

function csvEscape(v) {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function buildCsv(pages, metaCounts) {
  const header = [
    "url", "type", "score", "grade", "title", "words", "readingTimeMin",
    "dupSim", "dupWith", "h1", "h2", "h3", "hasFaq", "internalLinks", "brokenLinks",
    "externalCitations", "externalDomains", "schemaTypes", "lastUpdated", "lastUpdatedAgeDays",
    "author", "authorByline", "images", "imagesNoAlt", "tables", "canonicalOk",
    "metaDescLen", "metaDescUnique",
  ];
  const rows = pages.map((p) => [
    p.path || "/", p.type, p.score, p.grade, p.title, p.words, p.readingTime,
    p.dupSim === null ? "" : p.dupSim.toFixed(3), p.dupWith || "", p.h1, p.h2, p.h3,
    p.hasFaq ? "Y" : "N", p.internal.length, p.brokenCount,
    p.external.length, p.externalDomains.join("|"), [...p.schemaTypes].join("|"),
    p.lastUpdated || "", p.lastUpdatedAgeDays,
    p.author || "", p.authorByline ? "Y" : "N", p.images, p.imagesNoAlt, p.tables,
    p.canonicalOk ? "Y" : "N", p.metaDescription.length, metaCounts[p.metaDescription] > 1 ? "N" : "Y",
  ]);
  return [header, ...rows].map((r) => r.map(csvEscape).join(",")).join("\n");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`[audit] checking server at ${BASE}...`);
  let spawned = null;
  try {
    const res = await fetch(`${BASE}/sitemap.xml`);
    if (!res.ok) throw new Error("not ready");
  } catch {
    console.log("[audit] server not running - starting next start...");
    spawned = startServer();
    await waitForServer();
  }

  console.log("[audit] fetching sitemap...");
  const sm = await fetchHtml(`${BASE}/sitemap.xml`);
  const locs = [...sm.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, BASE));
  console.log(`[audit] sitemap entries: ${locs.length}`);

  console.log("[audit] crawling pages...");
  const fetched = await pool(locs, async (url) => {
    try {
      const f = await fetchHtml(url);
      const metrics = extractPageMetrics(url, f.html);
      return { url, status: f.status, finalUrl: f.url, metrics };
    } catch (e) {
      return { url, status: 0, finalUrl: url, error: e.message, metrics: null };
    }
  }, 6);

  const realPages = fetched.filter((f) => f.metrics && f.status === 200 && f.finalUrl.replace(/\/$/, "") === f.url.replace(/\/$/, ""));
  const redirects = fetched.filter((f) => !(f.metrics && f.status === 200 && f.finalUrl.replace(/\/$/, "") === f.url.replace(/\/$/, "")));

  console.log(`[audit] scoring ${realPages.length} pages, ${redirects.length} redirects/skip`);

  const metaCounts = {};
  for (const p of realPages) {
    const d = p.metrics.metaDescription;
    if (d) metaCounts[d] = (metaCounts[d] || 0) + 1;
  }

  const sigs = realPages.map((p) => ({ page: p, sig: minHashSignature(p.metrics && p.metrics.words >= 20 ? p.metrics.text : "") }));

  for (let i = 0; i < realPages.length; i++) {
    const p = realPages[i];
    const m = p.metrics;
    m.type = pageType(m.path);
    m.readingTime = (m.words / 200).toFixed(1);
    m.lastUpdatedAgeDays = m.lastUpdated ? ageDays(new Date(m.lastUpdated)) : null;
    m.metaUnique = metaCounts[m.metaDescription] <= 1;

    let dupSim = null;
    let dupWith = "";
    if (sigs[i].sig) {
      let best = 0;
      for (let j = 0; j < realPages.length; j++) {
        if (i === j || !sigs[j].sig) continue;
        const s = minHashSimilarity(sigs[i].sig, sigs[j].sig);
        if (s > best) {
          best = s;
          dupWith = realPages[j].path;
        }
      }
      dupSim = best;
    }
    m.dupSim = dupSim;
    m.dupWith = dupWith;
  }

  console.log("[audit] validating internal links...");
  const allInternal = [...new Set(realPages.flatMap((p) => p.metrics.internal))];
  const linkResults = await pool(allInternal, async (href) => {
    const clean = href.split("?")[0].split("#")[0] || "/";
    const url = `${BASE}${clean}`;
    try {
      const f = await fetchHtml(url, 20000);
      return { href: clean, status: f.status };
    } catch {
      return { href: clean, status: 0 };
    }
  }, 10);
  const linkStatus = new Map(linkResults.map((r) => [r.href, r.status]));
  const broken = new Set(linkResults.filter((r) => r.status === 404 || r.status === 0).map((r) => r.href));
  for (const p of realPages) {
    p.metrics.brokenCount = p.metrics.internal.filter((h) => broken.has(h.split("#")[0]) || broken.has(h.split("?")[0].split("#")[0])).length;
  }

  for (const p of realPages) {
    const m = p.metrics;
    const t = m.type;
    const scores = {
      wordCount: scoreWordCount(m.words),
      duplicate: scoreDuplicate(m.dupSim),
      headings: scoreHeadings(m),
      faqs: scoreFaqs(m, t),
      internalLinks: m.internal.length >= 3 && m.internal.length <= 10 ? 100 : m.internal.length > 10 ? 90 : Math.round(m.internal.length * 20),
      externalCitations: m.external.length >= 1 ? 100 : 30,
      schema: scoreSchema(m, t),
      lastUpdated: scoreLastUpdated(m),
      author: m.author ? 100 : 0,
      canonical: m.canonicalOk ? 100 : m.canonical ? 50 : 0,
      metaDescription: m.metaDescription.length >= 50 && m.metaDescription.length <= 160 ? 100 : m.metaDescription.length > 0 ? 50 : 0,
      images: m.images >= 1 && m.imagesNoAlt === 0 ? 100 : m.images >= 1 ? 50 : 0,
      tables: m.tables >= 1 ? 100 : t === "grant" || t === "listing" || t === "tool" ? 60 : 100,
    };
    let total = 0;
    for (const [k, w] of Object.entries(WEIGHTS)) total += w * scores[k];
    total = total / 100;
    if (m.brokenCount > 0) total = Math.max(0, total - m.brokenCount * 4);
    m.scores = scores;
    m.score = Math.round(total);
    m.grade = grade(total);
  }

  const sorted = [...realPages].sort((a, b) => b.metrics.score - a.metrics.score || a.url.localeCompare(b.url));

  const reportLines = [];
  reportLines.push("# Page Quality Scorecard — sassahelphub.co.za");
  reportLines.push("");
  reportLines.push(`**Audit date:** ${NOW.toISOString().slice(0, 10)}`);
  reportLines.push(`**Pages scored:** ${realPages.length} · **Redirects/skips:** ${redirects.length} · **Broken links found:** ${broken.size}`);
  reportLines.push("");
  reportLines.push("## Scores by page");
  reportLines.push("");
  reportLines.push("| # | Grade | Score | Type | Words | Rd | Dup | H1/H2 | FAQ | Int | Ext | Schema | Upd | Auth | Img | Tbl | Canon | Meta | Page |");
  reportLines.push("|---|-------|-------|------|------:|----:|----:|-------|-----|----:|----:|--------|-----|------|----:|----:|-------|------|------|");
  sorted.forEach((p, i) => {
    const m = p.metrics;
    reportLines.push(`| ${i + 1} | **${m.grade}** | ${m.score} | ${m.type} | ${m.words} | ${m.readingTime} | ${m.dupSim === null ? "-" : m.dupSim.toFixed(2)} | ${m.h1}/${m.h2} | ${m.hasFaq ? "Y" : "N"} | ${m.internal.length} | ${m.external.length} | ${[...m.schemaTypes].join(",") || "-"} | ${m.lastUpdated || "-"} | ${m.author || "-"} | ${m.images} | ${m.tables} | ${m.canonicalOk ? "Y" : "N"} | ${m.metaDescription.length} | ${m.path || "/"} |`);
  });

  reportLines.push("");
  reportLines.push("## Lowest-scoring pages (priority fixes)");
  reportLines.push("");
  for (const p of sorted.filter((p) => p.metrics.score < 60)) {
    const m = p.metrics;
    reportLines.push(`- **${m.score} (${m.grade})** \`${m.path || "/"}\` — words:${m.words}, dup:${m.dupSim === null ? "-" : m.dupSim.toFixed(2)}${m.dupWith ? ` (vs ${m.dupWith})` : ""}, faq:${m.hasFaq ? "Y" : "N"}, author:${m.author ? "Y" : "N"}, canonical:${m.canonicalOk ? "Y" : "N"}, meta:${m.metaDescription.length}ch, broken:${m.brokenCount}`);
  }

  reportLines.push("");
  reportLines.push("## Near-duplicate page pairs (similarity > 0.35)");
  reportLines.push("");
  const seenPairs = new Set();
  for (let i = 0; i < realPages.length; i++) {
    if (!sigs[i].sig) continue;
    for (let j = i + 1; j < realPages.length; j++) {
      if (!sigs[j].sig) continue;
      const s = minHashSimilarity(sigs[i].sig, sigs[j].sig);
      if (s > 0.35) {
        const key = [realPages[i].url, realPages[j].url].sort().join("|");
        if (!seenPairs.has(key)) {
          seenPairs.add(key);
          const a = realPages[i].metrics.path || "/";
          const b = realPages[j].metrics.path || "/";
          reportLines.push(`- ${(s * 100).toFixed(0)}% — \`${a}\` ↔ \`${b}\``);
        }
      }
    }
  }

  fs.writeFileSync(path.join(OUT_DIR, "page-quality-data.csv"), "\ufeff" + buildCsv(sorted.map((p) => p.metrics), metaCounts), "utf8");
  fs.writeFileSync(path.join(OUT_DIR, "page-quality-scorecard.md"), reportLines.join("\n"), "utf8");

  const gradesDist = {};
  for (const p of realPages) gradesDist[p.metrics.grade] = (gradesDist[p.metrics.grade] || 0) + 1;

  const avgWords = Math.round(realPages.reduce((a, p) => a + p.metrics.words, 0) / realPages.length);
  const thin = realPages.filter((p) => p.metrics.words < 300).length;
  const noAuthor = realPages.filter((p) => !p.metrics.author).length;
  const noCanonical = realPages.filter((p) => !p.metrics.canonicalOk).length;
  const noMeta = realPages.filter((p) => !p.metrics.metaDescription).length;
  const dupMeta = realPages.filter((p) => !p.metrics.metaUnique).length;
  const noFaq = realPages.filter((p) => ["guide", "grant", "update", "status", "decline", "province"].includes(p.metrics.type) && !p.metrics.hasFaq).length;

  const summary = [];
  summary.push("# Page Quality Summary — sassahelphub.co.za");
  summary.push("");
  summary.push(`**Date:** ${NOW.toISOString().slice(0, 10)} · **Pages scored:** ${realPages.length}`);
  summary.push("");
  summary.push(`## Grade distribution`);
  summary.push("");
  summary.push(`| Grade | Count |`);
  summary.push(`|-------|-------|`);
  for (const g of ["A", "B", "C", "D"]) summary.push(`| ${g} | ${gradesDist[g] || 0} |`);
  summary.push("");
  summary.push(`## Site-wide averages`);
  summary.push("");
  summary.push(`- Average main-content word count: **${avgWords}**`);
  summary.push(`- Pages under 300 words (thin): **${thin}**`);
  summary.push(`- Content pages missing FAQs: **${noFaq}**`);
  summary.push(`- Pages without an author attribution: **${noAuthor}**`);
  summary.push(`- Pages without a valid self canonical: **${noCanonical}**`);
  summary.push(`- Pages missing a meta description: **${noMeta}**`);
  summary.push(`- Pages with a duplicate meta description: **${dupMeta}**`);
  summary.push(`- Broken internal links found: **${broken.size}**`);
  if (broken.size) summary.push("");
  if (broken.size) summary.push(`### Broken links`);
  if (broken.size) summary.push("");
  for (const b of broken) summary.push(`- \`${b}\``);
  summary.push("");
  summary.push(`## What to fix first (AdSense priority)`);
  summary.push("");
  summary.push(`1. **Thin pages (<300 words):** rewrite or consolidate — list in scorecard below score 60.`);
  summary.push(`2. **Near-duplicates (>35%):** differentiate or noindex — list in scorecard.`);
  summary.push(`3. **E-E-A-T:** add author bylines, verify freshness, cite sources.`);
  summary.push(`4. **Technical:** fix broken links, add canonicals/meta descriptions where missing.`);
  summary.push("");
  summary.push("See `page-quality-scorecard.md` for the full per-page table.");

  fs.writeFileSync(path.join(OUT_DIR, "page-quality-summary.md"), summary.join("\n"), "utf8");

  console.log("");
  console.log(`[audit] DONE. Reports written to ${OUT_DIR}/`);
  console.log(`[audit] grades: ${JSON.stringify(gradesDist)}`);
  console.log(`[audit] thin(<300w): ${thin} | noAuthor: ${noAuthor} | noCanonical: ${noCanonical} | noMeta: ${noMeta} | dupMeta: ${dupMeta} | noFaq: ${noFaq} | broken: ${broken.size}`);

  if (spawned) spawned.kill();
  process.exit(0);
}

main().catch((e) => {
  console.error("[audit] ERROR:", e.message);
  process.exit(1);
});
