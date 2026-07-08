import canonicalFacts from "../../public/data/canonical-facts.json";

type FactMap = Record<string, { value: string; effective_date: string; source_url: string; verified_date: string; verified_by: string; confidence: string }>;

const facts: FactMap = canonicalFacts;

export function getFact(key: string): string {
  const fact = facts[key];
  if (!fact) {
    console.warn(`[canonical-facts] Unknown fact key: ${key}`);
    return `{{${key}}}`;
  }
  return fact.value;
}

export function getFactMeta(key: string) {
  return facts[key] || null;
}

export function resolveTemplates(str: string): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => getFact(key));
}
