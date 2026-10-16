#!/usr/bin/env node
// Content integrity validator for SASSA Help Hub.
//
// Catches the recurring freshness/consistency defects that have caused problems
// on this site: payment dates that contradict the governed forecast, an
// ungovernanced or expired schedule entry, "confirmed" rows that are not backed
// by a source/verification date, and grant-amount template keys that no longer
// resolve against the canonical fact store.
//
// Pure Node (no dependencies). Run with:  node scripts/validate-content.mjs
// Exits non-zero when any ERROR is found so it can gate a build/CI step.

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "public", "data");
const GRANTS_DIR = join(DATA_DIR, "grants");

const errors = [];
const warnings = [];
const err = (scope, msg) => errors.push(`[${scope}] ${msg}`);
const warn = (scope, msg) => warnings.push(`[${scope}] ${msg}`);

const readJSON = (abs) => JSON.parse(readFileSync(abs, "utf8"));

const now = new Date();
const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
const iso = (d) => d.toISOString().slice(0, 10);
const DAY = 86400000;
const daysBetween = (a, b) => Math.round((b - a) / DAY);

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];
const MONTH_TITLE = MONTHS.map((m) => m[0].toUpperCase() + m.slice(1));

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_OR_MONTH = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/;

function parseISO(value) {
  const m = ISO_DATE.exec(value || "");
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const utc = Date.UTC(y, mo - 1, d);
  const dt = new Date(utc);
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return { y, mo, d, utc, weekday: WEEKDAYS[dt.getUTCDay()] };
}

const PERMANENT_ROWS = ["older_persons", "disability", "children", "under_review"];
const ALL_ROWS = [...PERMANENT_ROWS, "srd"];
const ALLOWED_STATUS = new Set(["confirmed", "projected"]);
const PROJ_SENTINEL = new Set(["TBA", "TBC"]);

// ---------------------------------------------------------------------------
// 1. payment-schedule-forecast.json — the single governed source of dates.
// ---------------------------------------------------------------------------
function validateForecast() {
  const scope = "forecast";
  const file = join(DATA_DIR, "payment-schedule-forecast.json");
  let months;
  try {
    months = readJSON(file);
  } catch (e) {
    err(scope, `cannot read/parse payment-schedule-forecast.json: ${e.message}`);
    return;
  }
  if (!Array.isArray(months) || months.length === 0) {
    err(scope, "expected a non-empty array of months");
    return;
  }

  const seen = new Set();
  let prev = null;

  for (const m of months) {
    const id = m.month_key || "(no month_key)";

    if (!m.month_key) err(scope, "a month entry is missing month_key");
    if (seen.has(m.month_key)) err(scope, `duplicate month_key "${id}"`);
    seen.add(m.month_key);

    const expectedKey = typeof m.year === "number" && m.month
      ? `${MONTHS[m.month - 1]}-${m.year}`
      : null;
    if (expectedKey && expectedKey !== m.month_key) {
      err(scope, `${id}: month_key does not match year/month (expected "${expectedKey}")`);
    }
    const expectedLabel = typeof m.year === "number" && m.month
      ? `${MONTH_TITLE[m.month - 1]} ${m.year}`
      : null;
    if (expectedLabel && m.label !== expectedLabel) {
      warn(scope, `${id}: label "${m.label}" does not match "${expectedLabel}"`);
    }

    // chronological order
    if (prev && !(m.year > prev.year || (m.year === prev.year && m.month > prev.month))) {
      warn(scope, `months are not in chronological order near "${id}"`);
    }
    prev = m;

    const monthStart = Date.UTC(m.year, m.month - 1, 1);
    const monthEnd = Date.UTC(m.year, m.month - 1, new Date(Date.UTC(m.year, m.month, 0)).getUTCDate());
    const confirmedDates = [];

    for (const row of ALL_ROWS) {
      const r = m[row];
      if (!r || typeof r !== "object") {
        err(scope, `${id}: missing "${row}" row`);
        continue;
      }
      if (!ALLOWED_STATUS.has(r.status)) {
        err(scope, `${id}.${row}: status must be "confirmed" or "projected" (got "${r.status}")`);
      }

      if (r.status === "projected") {
        if (!PROJ_SENTINEL.has(r.date)) {
          err(scope, `${id}.${row}: projected rows must use TBA/TBC, not "${r.date}" (never a guessed date)`);
        }
        if (row === "under_review" && r.date !== "TBC") {
          warn(scope, `${id}.${row}: under-review placeholder is normally "TBC"`);
        }
        continue;
      }

      // confirmed
      const parsed = parseISO(r.date);
      if (!parsed) {
        err(scope, `${id}.${row}: confirmed row has an invalid date "${r.date}"`);
        continue;
      }
      if (r.day && parseISO(r.date) && parsed.weekday !== r.day && !r.day.includes("&")) {
        err(scope, `${id}.${row}: day "${r.day}" does not match the date ${r.date} (${parsed.weekday})`);
      }

      if (row === "srd") {
        if (parsed.mo !== m.month) {
          err(scope, `${id}.${row}: SRD payment date ${r.date} is outside the month it belongs to`);
        }
        if (parsed.d < 15) {
          err(scope, `${id}.${row}: SRD dates are announced after mid-month; ${r.date} looks too early`);
        } else if (parsed.d < 20) {
          warn(scope, `${id}.${row}: SRD date ${r.date} is earlier than the usual last-week window`);
        }
      } else {
        // permanent grants (Older Persons may be pulled into the prior month, e.g. Nov cycle paid 30 Oct)
        if (parsed.utc < monthStart - 7 * DAY || parsed.utc > monthEnd) {
          err(scope, `${id}.${row}: confirmed date ${r.date} is too far from its month`);
        }
        confirmedDates.push(r.date);
      }
    }

    const dupes = confirmedDates.filter((d, i) => confirmedDates.indexOf(d) !== i);
    if (dupes.length) {
      warn(scope, `${id}: duplicate confirmed payment dates (${[...new Set(dupes)].join(", ")})`);
    }

    const g = m.governance;
    if (!g || typeof g !== "object") {
      err(scope, `${id}: missing governance block { source, sourceURL, lastVerified, notes }`);
    } else {
      if (!g.source) err(scope, `${id}.governance: missing source`);
      if (!/^https?:\/\//.test(g.sourceURL || "")) err(scope, `${id}.governance: sourceURL must be an http(s) URL`);
      if (!g.notes) err(scope, `${id}.governance: missing notes`);
      const lv = parseISO(g.lastVerified);
      if (!lv) {
        err(scope, `${id}.governance: lastVerified must be a valid ISO date`);
      } else {
        if (lv.utc > todayUTC) err(scope, `${id}.governance: lastVerified ${g.lastVerified} is in the future`);
        const age = daysBetween(lv.utc, todayUTC);
        if (age > 35) warn(scope, `${id}.governance: lastVerified is ${age} days old — re-verify the dates`);
      }
    }
  }

  // The cycle currently being displayed must exist (after the 20th, next month).
  const target = now.getDate() > 20
    ? new Date(now.getFullYear(), now.getMonth() + 1, 1)
    : new Date(now.getFullYear(), now.getMonth(), 1);
  const currentKey = `${MONTHS[target.getMonth()]}-${target.getFullYear()}`;
  const next = new Date(target.getFullYear(), target.getMonth() + 1, 1);
  const nextKey = `${MONTHS[next.getMonth()]}-${next.getFullYear()}`;
  if (!seen.has(currentKey)) warn(scope, `displayed cycle "${currentKey}" is missing from the forecast`);
  if (!seen.has(nextKey)) warn(scope, `upcoming cycle "${nextKey}" is missing from the forecast`);
}

// ---------------------------------------------------------------------------
// 2. canonical-facts.json — every fact must carry a confidence and, when
//    confirmed, a source and verification.
// ---------------------------------------------------------------------------
function validateCanonicalFacts() {
  const scope = "facts";
  const file = join(DATA_DIR, "canonical-facts.json");
  let facts;
  try {
    facts = readJSON(file);
  } catch (e) {
    err(scope, `cannot read/parse canonical-facts.json: ${e.message}`);
    return null;
  }
  const ALLOWED_CONF = new Set(["confirmed", "reported", "unverified"]);

  for (const [key, f] of Object.entries(facts)) {
    if (!f || typeof f !== "object") {
      err(scope, `${key}: value must be an object`);
      continue;
    }
    if (typeof f.value !== "string" || !f.value.trim()) err(scope, `${key}: missing value`);
    if (!ALLOWED_CONF.has(f.confidence)) {
      err(scope, `${key}: confidence must be one of ${[...ALLOWED_CONF].join(", ")} (got "${f.confidence}")`);
    }
    if (f.confidence === "confirmed") {
      if (!/^https?:\/\//.test(f.source_url || "")) err(scope, `${key}: confirmed fact needs an http(s) source_url`);
      if (!f.verified_by) err(scope, `${key}: confirmed fact needs verified_by`);
      if (!parseISO(f.verified_date)) err(scope, `${key}: confirmed fact needs a valid ISO verified_date`);
    }
    if (f.verified_date) {
      const vd = parseISO(f.verified_date);
      if (!vd) warn(scope, `${key}: verified_date "${f.verified_date}" is not a full ISO date`);
      else if (vd.utc > todayUTC) err(scope, `${key}: verified_date ${f.verified_date} is in the future`);
    }
    if (f.effective_date && !ISO_OR_MONTH.test(f.effective_date)) {
      warn(scope, `${key}: effective_date "${f.effective_date}" is not ISO (YYYY-MM or YYYY-MM-DD)`);
    }
  }
  return facts;
}

// ---------------------------------------------------------------------------
// 3. Grant pages — every {{template}} token must resolve to a canonical fact.
// ---------------------------------------------------------------------------
function collectTokens(node, out) {
  if (typeof node === "string") {
    const re = /\{\{(\w+)\}\}/g;
    let m;
    while ((m = re.exec(node))) out.add(m[1]);
  } else if (Array.isArray(node)) {
    for (const v of node) collectTokens(v, out);
  } else if (node && typeof node === "object") {
    for (const v of Object.values(node)) collectTokens(v, out);
  }
  return out;
}

function validateGrantTemplates(facts) {
  const scope = "grants";
  if (!facts) return;
  let files;
  try {
    files = readdirSync(GRANTS_DIR).filter((f) => f.endsWith(".json"));
  } catch (e) {
    err(scope, `cannot list grants dir: ${e.message}`);
    return;
  }
  for (const f of files) {
    let doc;
    try {
      doc = readJSON(join(GRANTS_DIR, f));
    } catch (e) {
      err(scope, `${f}: cannot read/parse: ${e.message}`);
      continue;
    }
    const tokens = collectTokens(doc, new Set());
    for (const t of tokens) {
      if (!(t in facts)) {
        err(scope, `${f}: template {{${t}}} has no canonical fact — it will render literally on the page`);
      }
    }
    if (doc.last_updated && !parseISO(doc.last_updated)) {
      warn(scope, `${f}: last_updated "${doc.last_updated}" is not an ISO date`);
    }
  }
}

// ---------------------------------------------------------------------------
// 4. updates.json / guides.json — light structural + freshness checks.
// ---------------------------------------------------------------------------
function validateList(relPath, scope, dateField, idField = "id") {
  const file = join(DATA_DIR, relPath);
  let list;
  try {
    list = readJSON(file);
  } catch (e) {
    err(scope, `cannot read/parse ${relPath}: ${e.message}`);
    return;
  }
  if (!Array.isArray(list)) {
    err(scope, `${relPath} must be an array`);
    return;
  }
  const seen = new Set();
  for (const item of list) {
    const id = item[idField];
    if (!id) { err(scope, `${relPath}: an entry is missing "${idField}"`); continue; }
    if (seen.has(id)) err(scope, `${relPath}: duplicate ${idField} "${id}"`);
    seen.add(id);
    if (!item.title) warn(scope, `${relPath} ${id}: missing title`);
    const raw = item[dateField];
    if (raw) {
      const p = parseISO(raw);
      if (!p) warn(scope, `${relPath} ${id}: ${dateField} "${raw}" is not a full ISO date`);
      else if (p.utc > todayUTC + 1 * DAY) warn(scope, `${relPath} ${id}: ${dateField} ${raw} is in the future`);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. Structured-data safety — every forecast date that flows into the
//    paymentScheduleSchema Event markup must be either a real ISO 8601 date or
//    one of the known placeholders. A bare non-ISO value here is what produced
//    the Google Search Console error "Date/time not in ISO 8601 format in field
//    startDate". Anything unexpected must fail loudly, not leak or vanish.
// ---------------------------------------------------------------------------
function validateSchemaDates() {
  const scope = "schema";
  let months;
  try {
    months = readJSON(join(DATA_DIR, "payment-schedule-forecast.json"));
  } catch {
    return; // forecast read errors are already reported by validateForecast
  }
  for (const m of months) {
    const id = m.month_key || "(no month_key)";
    for (const row of ALL_ROWS) {
      const r = m[row];
      if (!r || typeof r.date !== "string") continue;
      const isIso = ISO_DATE.test(r.date);
      const isSentinel = PROJ_SENTINEL.has(r.date);
      if (!isIso && !isSentinel) {
        err(scope, `${id}.${row}: date "${r.date}" is neither ISO 8601 (YYYY-MM-DD) nor TBA/TBC — Event.startDate would be invalid`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
try {
  validateForecast();
  const facts = validateCanonicalFacts();
  validateGrantTemplates(facts);
  validateList("updates.json", "updates", "date");
  validateList("guides.json", "guides", "lastUpdated");
  validateSchemaDates();
} catch (e) {
  err("validator", `unexpected failure: ${e.stack || e.message}`);
}

for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(
  `\nContent validation: ${errors.length} error(s), ${warnings.length} warning(s). ` +
  `(${iso(now)})`
);
process.exit(errors.length ? 1 : 0);
