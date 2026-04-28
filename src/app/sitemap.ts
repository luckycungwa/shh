import fs from "fs";
import path from "path";

const BASE_URL = "https://www.sassahelphub.co.za";

export default async function sitemap() {
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
  ];

  // Fetch dynamic content
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");

  const updates = JSON.parse(fs.readFileSync(updatesPath, "utf8"));
  const guides = JSON.parse(fs.readFileSync(guidesPath, "utf8"));

  const updateUrls = updates.map((u: any) => `/updates/${u.id}`);
  const guideUrls = guides.map((g: any) => `/guides/${g.id}`);

  const allPaths = [...staticPages, ...updateUrls, ...guideUrls];

  return allPaths.map((p) => ({
    url: `${BASE_URL}${p}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: p === "" || p === "/updates" ? "daily" : "weekly",
    priority: p === "" ? 1 : p.startsWith("/updates") || p.startsWith("/guides") ? 0.8 : 0.5,
  }));
}
