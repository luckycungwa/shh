import fs from "fs";
import path from "path";
import { getActiveTools } from "../lib/tools/registry";
import { isIndexableUpdate } from "../lib/updates";

const BASE_URL = "https://www.sassahelphub.co.za";

function mostRecentDate(dates: string[]): string {
  return dates.filter(Boolean).sort().reverse()[0] || new Date().toISOString().split("T")[0];
}

function readJson(filePath: string): any[] {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const eaatPages = [
    "/editorial-policy",
    "/fact-checking-policy",
    "/sources-policy",
    "/corrections-policy",
  ];

  const staticPages = [
    { path: "", priority: 1, changeFreq: "daily" as const },
    { path: "/updates", priority: 0.9, changeFreq: "daily" as const },
    { path: "/payment-calendar", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/status-check", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/faq", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/guides", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/grants", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/status", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/scam-alert", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/resources", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/tools", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/about", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/contact", priority: 0.5, changeFreq: "monthly" as const },
    { path: "/disclaimer", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/terms-of-service", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/glossary", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/sassa-offices", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/common-problems", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/sassa-contact", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/how-much-is-srd-grant", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/lost-sassa-card-or-id", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/sassa-retail-collection-points", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/authors", priority: 0.5, changeFreq: "monthly" as const },
    ...eaatPages.map((p) => ({ path: p, priority: 0.5 as const, changeFreq: "yearly" as const })),
  ];

  const updates = readJson(path.join(process.cwd(), "public/data/updates.json"));
  const guides = readJson(path.join(process.cwd(), "public/data/guides.json"));
  const grantsDir = path.join(process.cwd(), "public/data/grants");
  let grantFiles: string[] = [];
  try { grantFiles = fs.readdirSync(grantsDir).filter((f) => f.endsWith(".json")); } catch { grantFiles = []; }

  const faqs = readJson(path.join(process.cwd(), "public/data/faqs.json"));

  const updateDates = updates.map((u: any) => u.date).filter(Boolean);
  const guideDates = guides.map((g: any) => g.lastUpdated).filter(Boolean);
  const grantDates = grantFiles.map((f: string) => {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(grantsDir, f), "utf8"));
      return d.last_updated;
    } catch { return null; }
  }).filter(Boolean);
  const faqDates = faqs.map((f: any) => f.lastUpdated).filter(Boolean);
  const updateListDate = mostRecentDate(updateDates);
  const guideListDate = mostRecentDate(guideDates);
  const allContentDates = [...updateDates, ...guideDates, ...grantDates, ...faqDates];

  // Indexability rules are shared with the /updates hub so the two never
  // disagree about which updates are live, canonical pages. See src/lib/updates.ts.
  const updateUrls = updates.filter((u: any) => isIndexableUpdate(u)).map((u: any) => ({ path: `/updates/${u.id}`, lastMod: u.date || updateListDate, priority: 0.7, changeFreq: "monthly" as const }));
  const guideUrls = guides.map((g: any) => ({ path: `/guides/${g.id}`, lastMod: g.lastUpdated || guideListDate, priority: 0.8, changeFreq: "monthly" as const }));

  const grantSlugs = [
    "srd-r370-grant", "old-age-pension", "child-support-grant", "disability-grant",
    "foster-child-grant", "care-dependency-grant", "grant-in-aid", "war-veterans-grant",
  ];
  const grantMods: Record<string, string> = {};
  grantFiles.forEach((f) => {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(grantsDir, f), "utf8"));
      if (d.last_updated) grantMods[d.slug?.replace("grants/", "") || f.replace(".json", "")] = d.last_updated;
    } catch {}
  });
  const grantUrls = grantSlugs.map((s) => ({
    path: `/grants/${s}`,
    lastMod: grantMods[s] || mostRecentDate(grantDates),
    priority: 0.8,
    changeFreq: "monthly" as const,
  }));

  const statusData = readJson(path.join(process.cwd(), "public/data/status-meanings.json"));
  const statusSlugs = statusData.length
    ? statusData.map((s: any) => s.slug)
    : ["application-complete", "pending", "bank-details-pending", "identity-verification", "referred", "means-test-failed", "approved", "declined", "appeal-pending", "paid"];
  const statusDate = statusData.filter((s: any) => s.last_updated).map((s: any) => s.last_updated);
  const statusMod = statusDate.length ? mostRecentDate(statusDate) : mostRecentDate(allContentDates);

  const provinceSlugs = [
    "eastern-cape", "free-state", "gauteng", "kwazulu-natal", "limpopo",
    "mpumalanga", "north-west", "northern-cape", "western-cape",
  ];
  let provinceMod = statusMod;
  try {
    const provinces = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
    const pDates = provinces.map((p: any) => p.last_updated).filter(Boolean);
    if (pDates.length) provinceMod = mostRecentDate(pDates);
  } catch {}

  const declineData = readJson(path.join(process.cwd(), "public/data/decline-reasons.json"));
  const declineSlugs = declineData.length
    ? declineData.map((d: any) => d.slug)
    : ["income-source-detected", "identity-verification-failed", "uif-registered", "nsfas-registered", "existing-sassa-grant", "government-payroll", "age-outside-range", "deceased-dha-record"];

  const bankingData = readJson(path.join(process.cwd(), "public/data/banking-methods.json"));
  const bankingSlugs = bankingData.map((b: any) => b.slug).filter(Boolean);
  const bankingMod = bankingData.filter((b: any) => b.last_updated).map((b: any) => b.last_updated);
  const bankingLastMod = bankingMod.length ? mostRecentDate(bankingMod) : statusMod;

  const appealsData = readJson(path.join(process.cwd(), "public/data/appeals.json"));
  const appealSlugs = appealsData.map((a: any) => a.slug).filter(Boolean);
  const appealMod = appealsData.filter((a: any) => a.last_updated).map((a: any) => a.last_updated);
  const appealLastMod = appealMod.length ? mostRecentDate(appealMod) : statusMod;

  const scheduleData = readJson(path.join(process.cwd(), "public/data/payment-schedule-forecast.json"));
  const scheduleKeys = scheduleData.map((s: any) => s.month_key).filter(Boolean);
  // Each month's page reflects that month's verified schedule, so use its own
  // lastVerified date rather than one shared status date.
  const scheduleMods: Record<string, string> = {};
  for (const s of scheduleData) {
    if (s.month_key && s.governance?.lastVerified) scheduleMods[s.month_key] = s.governance.lastVerified;
  }

  const officeCities = readJson(path.join(process.cwd(), "public/data/officeCities.json"));
  const provinceNameToSlug: Record<string, string> = {
    "Eastern Cape": "eastern-cape", "Free State": "free-state", "Gauteng": "gauteng",
    "KwaZulu-Natal": "kwazulu-natal", "Limpopo": "limpopo", "Mpumalanga": "mpumalanga",
    "North West": "north-west", "Northern Cape": "northern-cape", "Western Cape": "western-cape",
  };
  const slugifyCity = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const citySlugStrip = (c: string) => c.replace(/\s*\(.*?\)\s*/g, " ").trim();

  // Indexation rule (see src/lib/office-indexation.ts): the sitemap contains
  // province hub pages plus ONLY curated city pages (officeCities.json
  // records with unique descriptions/tips). Template-only province-derived
  // city pages are noindexed at the route level and excluded here.
  const curatedCityPaths = new Set<string>();
  const officePaths = new Set<string>();
  for (const c of officeCities) {
    const pSlug = provinceNameToSlug[c.province];
    if (pSlug) {
      const cityPath = `/sassa-offices/${pSlug}/${slugifyCity(c.city)}`;
      curatedCityPaths.add(cityPath);
      officePaths.add(cityPath);
    }
  }
  for (const p of provinceSlugs) {
    try {
      const provinces = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/provinces.json"), "utf8"));
      const prov = provinces.find((x: any) => x.slug === p);
      if (prov) {
        officePaths.add(`/sassa-offices/${p}`);
        [...(prov.main_offices || []), ...(prov.district_offices || [])].forEach((o: any) => {
          const cityPath = `/sassa-offices/${p}/${slugifyCity(citySlugStrip(o.town))}`;
          if (curatedCityPaths.has(cityPath)) officePaths.add(cityPath);
        });
      }
    } catch {}
  }

  const staticUrls = staticPages.map((p) => {
    let lastMod = mostRecentDate(allContentDates);
    if (p.path === "/updates" && updateListDate) lastMod = updateListDate;
    else if (p.path === "/guides" && guideListDate) lastMod = guideListDate;
    return { path: p.path, lastMod, priority: p.priority, changeFreq: p.changeFreq };
  });

  // Tool URLs come from the tool registry, which only lists tools that exist.
  // /eligibility-check is no longer listed here: the registry owns that URL so
  // there is exactly one place where a tool's canonical path is defined.
  const toolUrls = getActiveTools().map((t) => ({
    path: t.path,
    lastMod: mostRecentDate(allContentDates),
    priority: t.priority,
    changeFreq: t.changeFreq,
  }));

  const allEntries = [
    ...staticUrls,
    ...toolUrls,
    ...updateUrls,
    ...guideUrls,
    ...grantUrls,
    ...statusSlugs.map((s) => ({ path: `/status/${s}`, lastMod: statusMod, priority: 0.7, changeFreq: "monthly" as const })),
    ...provinceSlugs.map((s) => ({ path: `/province/${s}`, lastMod: provinceMod, priority: 0.6, changeFreq: "monthly" as const })),
    ...declineSlugs.map((s) => ({ path: `/decline-reason/${s}`, lastMod: statusMod, priority: 0.7, changeFreq: "monthly" as const })),
    ...(bankingSlugs.length ? [{ path: "/banking", lastMod: bankingLastMod, priority: 0.7, changeFreq: "monthly" as const }] : []),
    ...bankingSlugs.map((s) => ({ path: `/banking/${s}`, lastMod: bankingLastMod, priority: 0.7, changeFreq: "monthly" as const })),
    ...(appealSlugs.length ? [{ path: "/appeals", lastMod: appealLastMod, priority: 0.7, changeFreq: "monthly" as const }] : []),
    ...appealSlugs.map((s) => ({ path: `/appeals/${s}`, lastMod: appealLastMod, priority: 0.7, changeFreq: "monthly" as const })),
    ...scheduleKeys.map((s) => ({ path: `/dates/${s}`, lastMod: scheduleMods[s] || statusMod, priority: 0.7, changeFreq: "monthly" as const })),
    ...Array.from(officePaths).map((p) => ({ path: p, lastMod: provinceMod, priority: 0.6, changeFreq: "monthly" as const })),
  ];

  // Guard against a path being emitted twice (e.g. a tool also listed as a static
  // page). First entry wins so the curated static definition is kept.
  const seenPaths = new Set<string>();
  return allEntries
    .filter(({ path: p }) => {
      if (seenPaths.has(p)) return false;
      seenPaths.add(p);
      return true;
    })
    .map(({ path: p, lastMod, priority, changeFreq }) => ({
      url: `${BASE_URL}${p}`,
      lastModified: lastMod,
      changeFrequency: changeFreq,
      priority,
    }));
}