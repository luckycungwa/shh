import fs from "fs";
import path from "path";

// Indexation rule for /sassa-offices/[province]/[city] pages (AdSense readiness):
//
// A city page is indexable ONLY when a curated officeCities.json record exists
// for that exact province + city slug. Curated records carry a unique
// description, visitor tips, and a verified flag. Province-derived pages built
// from bare provinces.json town rows (address + phone only, verified: false)
// are template-thin and must not be indexed — but they still render for users
// arriving via hub navigation, with the on-page "not yet independently
// verified" warning.
//
// The rule is deterministic and maintainable: adding a curated record to
// officeCities.json automatically makes the page indexable here, in
// generateMetadata ([city]/page.tsx), and in the sitemap (sitemap.ts).

const PROVINCE_NAMES: Record<string, string> = {
  "eastern-cape": "Eastern Cape",
  "free-state": "Free State",
  "gauteng": "Gauteng",
  "kwazulu-natal": "KwaZulu-Natal",
  "limpopo": "Limpopo",
  "mpumalanga": "Mpumalanga",
  "north-west": "North West",
  "northern-cape": "Northern Cape",
  "western-cape": "Western Cape",
};

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Single source of truth for city URL slugs. Office towns often carry a
// parenthetical former name ("Mbombela (Nelspruit)"), which must be dropped so
// that hub links, generated params, curated records and the sitemap all agree.
// Divergent copies of this rule previously produced 404 city links.
export function officeCitySlug(city: string): string {
  return slugify(city.replace(/\s*\(.*?\)\s*/g, " ").trim());
}

function readOfficeCities(): any[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data/officeCities.json"), "utf8"));
  } catch {
    return [];
  }
}

export function isCuratedOfficeCity(provinceSlug: string, citySlug: string): boolean {
  const provinceName = PROVINCE_NAMES[provinceSlug];
  if (!provinceName) return false;
  return readOfficeCities().some(
    (c: any) => c.province === provinceName && officeCitySlug(String(c.city || "")) === citySlug
  );
}
