import fs from "fs";
import path from "path";

const BASE_URL = "https://www.sassahelphub.co.za";

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
    ...eaatPages,
  ];

  // Fetch dynamic content
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");

  const updates = JSON.parse(fs.readFileSync(updatesPath, "utf8"));
  const guides = JSON.parse(fs.readFileSync(guidesPath, "utf8"));

  const updateUrls = updates.map((u: any) => `/updates/${u.id}`);
  const guideUrls = guides.map((g: any) => `/guides/${g.id}`);

  // Grant guides
  const grantSlugs = [
    "srd-r370-grant",
    "old-age-pension",
    "child-support-grant",
    "disability-grant",
    "foster-child-grant",
    "care-dependency-grant",
    "grant-in-aid",
    "war-veterans-grant",
  ];
  const grantUrls = grantSlugs.map((s) => `/grants/${s}`);

  // Status meanings
  const statusSlugs = [
    "application-complete", "pending", "bank-details-pending", "identity-verification",
    "referred", "means-test-failed", "approved", "declined", "appeal-pending", "paid",
  ];
  const statusUrls = statusSlugs.map((s) => `/status/${s}`);

  // Province pages
  const provinceSlugs = [
    "eastern-cape", "free-state", "gauteng", "kwazulu-natal", "limpopo",
    "mpumalanga", "north-west", "northern-cape", "western-cape",
  ];
  const provinceUrls = provinceSlugs.map((s) => `/province/${s}`);

  // Decline reason pages
  const declineSlugs = [
    "income-source-detected", "identity-verification-failed", "uif-registered",
    "nsfas-registered", "existing-sassa-grant", "government-payroll",
    "age-outside-range", "deceased-dha-record",
  ];
  const declineUrls = declineSlugs.map((s) => `/decline-reason/${s}`);

  const allPaths = [...staticPages, ...updateUrls, ...guideUrls, ...grantUrls, ...statusUrls, ...provinceUrls, ...declineUrls];

  return allPaths.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: p === "" || p === "/updates" ? "daily" : "weekly",
    priority: p === "" ? 1 : p.startsWith("/grants") || p.startsWith("/status") || p.startsWith("/updates") || p.startsWith("/guides") || p.startsWith("/province") || p.startsWith("/decline-reason") ? 0.8 : 0.5,
  }));
}
