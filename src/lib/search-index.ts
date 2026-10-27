import fs from "fs";
import path from "path";
import type { SearchRecord } from "./search";
import { getActiveTools, TOOL_CLUSTERS } from "./tools/registry";

const readJson = (rel: string): any[] => {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), "public/data", rel), "utf8"));
  } catch {
    return [];
  }
};

const clusterLabel = (id: string): string =>
  TOOL_CLUSTERS.find((c) => c.id === id)?.label ?? "Tools";

/** Builds a flat, serializable index of every searchable page across all verticals. */
export function buildSearchIndex(): SearchRecord[] {
  const out: SearchRecord[] = [];

  const staticHubs: SearchRecord[] = [
    { title: "SASSA Contact Numbers & Helpline", description: "Official phone 0800 60 10 11, WhatsApp, USSD *120*69277# and email.", url: "/sassa-contact", category: "Contact SASSA" },
    { title: "How Much Is the SASSA SRD Grant?", description: "R370 per month, R624 income limit, when it changes and who qualifies.", url: "/how-much-is-srd-grant", category: "SRD Grant" },
    { title: "Lost SASSA Card or ID", description: "Report a lost or stolen card, replace it free, protect your grant from fraud.", url: "/lost-sassa-card-or-id", category: "Cards & ID" },
    { title: "SASSA Grant Retail Collection Points", description: "Collect your grant at Shoprite, Checkers, Pick n Pay, Boxer, Usave and Spar.", url: "/sassa-retail-collection-points", category: "Collection Points" },
    { title: "SASSA Help Hub Tools", description: "All free tools in one place: status meanings, missing payments, appeal deadlines and eligibility.", url: "/tools", category: "Tools" },
  ];
  out.push(...staticHubs);

  // Tools, from the registry. Every active tool is searchable, and the category
  // doubles as the cluster so "appeal" or "payment" searches surface the right
  // tool without needing the word "tool" in the title.
  for (const t of getActiveTools()) {
    out.push({
      title: t.title,
      description: t.tagline,
      url: t.path,
      category: clusterLabel(t.cluster),
    });
  }

  // Guides
  for (const g of readJson("guides.json")) {
    out.push({ title: g.title, description: g.description || "", url: `/guides/${g.id}`, category: g.category || "Guides" });
  }

  // Status meanings
  for (const s of readJson("status-meanings.json")) {
    out.push({ title: s.title, description: s.description || "", url: `/status/${s.slug}`, category: "Status Meanings" });
  }

  // Decline reasons
  for (const d of readJson("decline-reasons.json")) {
    out.push({ title: d.title, description: d.description || "", url: `/decline-reason/${d.slug}`, category: "Decline Reasons" });
  }

  // Banking methods
  for (const b of readJson("banking-methods.json")) {
    out.push({ title: b.title, description: b.description || "", url: `/banking/${b.slug}`, category: "Banking & Payments" });
  }

  // Appeals
  for (const a of readJson("appeals.json")) {
    out.push({ title: a.title, description: a.description || "", url: `/appeals/${a.slug}`, category: "Appeals" });
  }

  // Payment dates
  for (const m of readJson("payment-schedule-forecast.json")) {
    out.push({ title: `SASSA Payment Dates — ${m.label}`, description: m.note || "", url: `/dates/${m.month_key}`, category: "Payment Dates" });
  }

  // Grants (files under public/data/grants/*.json)
  const grantsDir = path.join(process.cwd(), "public/data/grants");
  try {
    for (const file of fs.readdirSync(grantsDir)) {
      if (!file.endsWith(".json")) continue;
      const arr = readJson(`grants/${file}`);
      for (const gr of Array.isArray(arr) ? arr : [arr]) {
        out.push({ title: gr.title, description: gr.description || "", url: `/grants/${gr.slug}`, category: "Grants" });
      }
    }
  } catch {
    // ignore
  }

  // FAQ entries
  for (const f of readJson("faqs.json")) {
    out.push({ title: f.question, description: f.answer || "", url: "/faq", category: "FAQs" });
  }

  out.sort((a, b) => a.title.localeCompare(b.title));
  return out;
}
