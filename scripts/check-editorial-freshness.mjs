#!/usr/bin/env node
/**
 * Isolated Editorial Freshness & Integrity Validator for SASSA Help Hub
 *
 * Verifies editorial content (guides, updates, faqs) independently
 * of payment-date forecasts and production deployment workflows.
 *
 * Run with: node scripts/check-editorial-freshness.mjs
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "public", "data");

const errors = [];
const warnings = [];

const err = (scope, msg) => errors.push(`[${scope}] ${msg}`);
const warn = (scope, msg) => warnings.push(`[${scope}] ${msg}`);

const readJSON = (abs) => JSON.parse(readFileSync(abs, "utf8"));

const now = new Date();
const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
const DAY = 86400000;

function parseISO(value) {
  if (!value || typeof value !== "string") return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const utc = Date.UTC(y, mo - 1, d);
  const dt = new Date(utc);
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return { y, mo, d, utc };
}

// 1. Validate Guides
function validateGuides() {
  const scope = "guides";
  const file = join(DATA_DIR, "guides.json");
  let guides;
  try {
    guides = readJSON(file);
  } catch (e) {
    err(scope, `Cannot read/parse guides.json: ${e.message}`);
    return;
  }

  if (!Array.isArray(guides)) {
    err(scope, "guides.json must be an array");
    return;
  }

  const seenIds = new Set();

  for (const guide of guides) {
    const id = guide.id || "(missing id)";
    if (!guide.id) err(scope, "Guide is missing ID");
    if (seenIds.has(guide.id)) err(scope, `Duplicate guide ID "${guide.id}"`);
    seenIds.add(guide.id);

    if (!guide.title || typeof guide.title !== "string") err(scope, `Guide ${id}: missing title`);
    if (!guide.description || typeof guide.description !== "string") err(scope, `Guide ${id}: missing description`);
    if (!guide.category || typeof guide.category !== "string") err(scope, `Guide ${id}: missing category`);
    if (!guide.author || typeof guide.author !== "string") err(scope, `Guide ${id}: missing author`);

    const dt = parseISO(guide.lastUpdated);
    if (!dt) {
      err(scope, `Guide ${id}: invalid lastUpdated date "${guide.lastUpdated}"`);
    } else {
      if (dt.utc > todayUTC + DAY) err(scope, `Guide ${id}: lastUpdated ${guide.lastUpdated} is in the future`);
    }

    if (!Array.isArray(guide.steps) || guide.steps.length === 0) {
      err(scope, `Guide ${id}: expected at least one step in steps array`);
    } else {
      guide.steps.forEach((step, idx) => {
        if (!step.title) err(scope, `Guide ${id} step ${idx + 1}: missing title`);
        if (!step.content) err(scope, `Guide ${id} step ${idx + 1}: missing content`);
      });
    }

    if (guide.sources) {
      if (!Array.isArray(guide.sources)) {
        err(scope, `Guide ${id}: sources must be an array`);
      } else {
        guide.sources.forEach((s, idx) => {
          const url = typeof s === "string" ? s : s.url || s.link;
          if (!/^https?:\/\//.test(url || "")) err(scope, `Guide ${id} source ${idx + 1}: invalid URL "${url}"`);
        });
      }
    }
  }

  console.log(`[guides] Checked ${guides.length} guides in guides.json.`);
}

// 2. Validate Updates
function validateUpdates() {
  const scope = "updates";
  const file = join(DATA_DIR, "updates.json");
  let updates;
  try {
    updates = readJSON(file);
  } catch (e) {
    err(scope, `Cannot read/parse updates.json: ${e.message}`);
    return;
  }

  if (!Array.isArray(updates)) {
    err(scope, "updates.json must be an array");
    return;
  }

  const seenIds = new Set();

  for (const update of updates) {
    const id = update.id || "(missing id)";
    if (!update.id) err(scope, "Update is missing ID");
    if (seenIds.has(update.id)) err(scope, `Duplicate update ID "${update.id}"`);
    seenIds.add(update.id);

    if (!update.title) err(scope, `Update ${id}: missing title`);
    if (!update.summary && !update.excerpt) warn(scope, `Update ${id}: missing summary or excerpt`);
    if (!update.content) err(scope, `Update ${id}: missing content`);

    const dt = parseISO(update.date);
    if (!dt) {
      err(scope, `Update ${id}: invalid date "${update.date}"`);
    } else if (dt.utc > todayUTC + DAY) {
      warn(scope, `Update ${id}: date ${update.date} is in the future`);
    }

    if (update.sources) {
      if (!Array.isArray(update.sources)) {
        err(scope, `Update ${id}: sources must be an array`);
      } else {
        update.sources.forEach((s, idx) => {
          const url = typeof s === "string" ? s : s.url || s.link;
          if (!/^https?:\/\//.test(url || "")) err(scope, `Update ${id} source ${idx + 1}: invalid URL "${url}"`);
        });
      }
    }
  }

  console.log(`[updates] Checked ${updates.length} updates in updates.json.`);
}

// 3. Validate FAQs
function validateFaqs() {
  const scope = "faqs";
  const file = join(DATA_DIR, "faqs.json");
  let faqs;
  try {
    faqs = readJSON(file);
  } catch (e) {
    err(scope, `Cannot read/parse faqs.json: ${e.message}`);
    return;
  }

  if (!Array.isArray(faqs)) {
    err(scope, "faqs.json must be an array");
    return;
  }

  faqs.forEach((faq, idx) => {
    const q = faq.question || faq.q;
    const a = faq.answer || faq.a;
    if (!q || !q.trim()) err(scope, `FAQ #${idx + 1}: missing question`);
    if (!a || !a.trim()) err(scope, `FAQ #${idx + 1}: missing answer`);
  });

  console.log(`[faqs] Checked ${faqs.length} FAQs in faqs.json.`);
}

// Execute checks
console.log("=== Editorial Freshness & Integrity Check ===");
validateGuides();
validateUpdates();
validateFaqs();

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);

console.log(`\nEditorial validation finished: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
