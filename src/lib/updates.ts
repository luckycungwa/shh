/**
 * Shared rules for which SASSA updates are live, canonical, indexable pages.
 *
 * This is the single source of truth consumed by both the sitemap
 * (src/app/sitemap.ts) and the /updates hub listing (src/app/updates/page.tsx),
 * so a URL can never be excluded from the sitemap yet still be linked from the
 * hub (or vice versa).
 */

export interface UpdateRecord {
  id: string;
  title?: string;
  summary?: string;
  date?: string;
  type?: string;
  urgent?: boolean;
  noindex?: boolean;
  tag?: string;
}

/**
 * Updates that 301-redirect to a newer destination. Keep this list in sync with
 * the `update-*` redirects in next.config.js; linking to a redirect wastes crawl
 * budget and splits signals, so these are never listed or sitemapped.
 */
export const REDIRECTED_UPDATE_IDS: string[] = [
  "update-2026-001",
  "update-2026-005",
  "update-2026-006",
  "update-2026-007",
  "update-2026-008",
  "update-2026-009",
  "update-2026-013",
  "update-2026-015",
  "update-2026-018",
  "update-2026-021",
  "update-2026-022",
  "update-2026-025",
  "update-2026-026",
  "update-2026-027",
  "update-2026-030",
  "update-2026-032",
];

const REDIRECTED = new Set(REDIRECTED_UPDATE_IDS);

/**
 * True when an update is a live, canonical, indexable page worth listing in the
 * sitemap and on the /updates hub.
 */
export function isIndexableUpdate(
  update: Pick<UpdateRecord, "id" | "noindex" | "tag">,
): boolean {
  if (!update || !update.id) return false;
  if (update.tag === "monthly-payment-schedule") return false;
  if (update.noindex) return false;
  if (REDIRECTED.has(update.id)) return false;
  return true;
}
