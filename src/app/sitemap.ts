import fs from "fs";
import path from "path";

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
    "",
    "/updates",
    "/faq",
    "/guides",
    "/scam-alert",
    "/resources",
    "/about",
    "/privacy-policy",
    "/contact",
    "/disclaimer",
    "/terms-of-service",
    "/eligibility-check",
    "/payment-calendar",
    "/status-check",
    "/glossary",
    "/sassa-offices",
    "/grants",
    "/status",
    "/common-problems",
    "/authors",
    ...eaatPages,
  ];

  const updates = readJson(path.join(process.cwd(), "public/data/updates.json"));
  const guides = readJson(path.join(process.cwd(), "public/data/guides.json"));
  const grantsDir = path.join(process.cwd(), "public/data/grants");
  let grantFiles: string[] = [];
  try { grantFiles = fs.readdirSync(grantsDir).filter((f) => f.endsWith(".json")); } catch { grantFiles = []; }

  // Extract lastmod dates from data
  const updateDates = updates.map((u: any) => u.date).filter(Boolean);
  const guideDates = guides.map((g: any) => g.lastUpdated).filter(Boolean);
  const grantDates = grantFiles.map((f: string) => {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(grantsDir, f), "utf8"));
      return d.last_updated;
    } catch { return null; }
  }).filter(Boolean);
  const updateListDate = mostRecentDate(updateDates);
  const guideListDate = mostRecentDate(guideDates);
  const allContentDates = [...updateDates, ...guideDates, ...grantDates];

  const updateUrls = updates.map((u: any) => ({ path: `/updates/${u.id}`, lastMod: u.date || updateListDate }));
  const guideUrls = guides.map((g: any) => ({ path: `/guides/${g.id}`, lastMod: g.lastUpdated || guideListDate }));

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
  }));

  const statusSlugs = [
    "application-complete", "pending", "bank-details-pending", "identity-verification",
    "referred", "means-test-failed", "approved", "declined", "appeal-pending", "paid",
  ];
  const statusMod = mostRecentDate(allContentDates);

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

  const declineSlugs = [
    "income-source-detected", "identity-verification-failed", "uif-registered",
    "nsfas-registered", "existing-sassa-grant", "government-payroll",
    "age-outside-range", "deceased-dha-record",
  ];

  // Build final URL list with lastmod
  const staticUrls = staticPages.map((p) => {
    let lastMod = mostRecentDate(allContentDates);
    if (p === "/updates" && updateListDate) lastMod = updateListDate;
    else if (p === "/guides" && guideListDate) lastMod = guideListDate;
    return { path: p, lastMod };
  });

  const allEntries = [
    ...staticUrls,
    ...updateUrls,
    ...guideUrls,
    ...grantUrls,
    ...statusSlugs.map((s) => ({ path: `/status/${s}`, lastMod: statusMod })),
    ...provinceSlugs.map((s) => ({ path: `/province/${s}`, lastMod: provinceMod })),
    ...declineSlugs.map((s) => ({ path: `/decline-reason/${s}`, lastMod: statusMod })),
  ];

  return allEntries.map(({ path: p, lastMod }) => ({
    url: `${BASE_URL}${p}`,
    lastModified: lastMod,
    changeFrequency: p === "" || p === "/updates" ? "daily" : "weekly",
    priority: p === "" ? 1 : p.startsWith("/grants") || p.startsWith("/status") || p.startsWith("/updates") || p.startsWith("/guides") || p.startsWith("/province") || p.startsWith("/decline-reason") ? 0.8 : 0.5,
  }));
}
