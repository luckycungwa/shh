export interface SearchRecord {
  title: string;
  description: string;
  url: string;
  category: string;
}

/** Lightweight relevance scoring across title/description/category. Client-safe. */
export function searchIndex(query: string, entries: SearchRecord[]): SearchRecord[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/[\s-]+/).filter((t) => t.length > 1);
  const scored: { rec: SearchRecord; score: number }[] = [];

  for (const rec of entries) {
    const title = rec.title.toLowerCase();
    const desc = rec.description.toLowerCase();
    const cat = rec.category.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (title.includes(t)) score += 8;
      if (desc.includes(t)) score += 3;
      if (cat.includes(t)) score += 4;
    }
    if (score > 0) scored.push({ rec, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.rec).slice(0, 12);
}
