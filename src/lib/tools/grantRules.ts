import { getFactMeta } from "../canonical-facts";

/**
 * Grant rules for calculators and checkers.
 *
 * This file holds NO hardcoded rand values, thresholds or dates. Rule sets
 * store canonical fact KEYS only; every figure a tool displays is resolved
 * from `public/data/canonical-facts.json` at runtime through `getFactMeta`, so
 * updating the data file updates every tool.
 *
 * Rules:
 * - Use `getFactMeta`, never `getFact`. `getFact` returns a `{{token}}`
 *   placeholder for an unknown key, which must never reach a user-facing string.
 * - A threshold that is not in the data resolves to `null`, never a guess.
 *   Callers treat `null` as "unknown" and say so.
 * - Provenance is per fact. Do not collapse it into a single "verified on"
 *   date, because the underlying facts are not all checked on the same day.
 */

export type GrantId =
  | "srd"
  | "older-persons"
  | "child-support"
  | "disability"
  | "care-dependency"
  | "foster-child"
  | "war-veterans"
  | "grant-in-aid";

export interface FactProvenance {
  key: string;
  label: string;
  value: string;
  effectiveDate: string;
  verifiedDate: string;
  sourceUrl: string;
  verifiedBy: string;
  confidence: string;
}

/**
 * A threshold in both marital states, stored as fact keys. One of the two may be
 * null when the data does not record that case.
 *
 * `basis` matters: income thresholds are a monthly figure, asset thresholds are
 * the TOTAL value of assets held. Converting an asset total to an "annual"
 * figure would invent a number that no source publishes, so the basis is
 * recorded and the helpers refuse to convert across it.
 */
export interface ThresholdFacts {
  singleKey: string | null;
  marriedKey: string | null;
  label: string;
  basis: "monthly" | "total";
}

export interface AmountRule {
  label: string;
  key: string;
}

/** Age limits as fact keys. Null when the data file does not record them. */
export interface AgeRangeFacts {
  minKey: string | null;
  maxKey: string | null;
}

export interface GrantRuleSet {
  id: GrantId;
  label: string;
  guideUrl: string;
  /**
   * Fact key for a flat monthly ceiling on money arriving in the applicant's
   * accounts (the SRD deposit check). Null where no such ceiling exists.
   */
  monthlyIncomeLimitKey: string | null;
  incomeThreshold: ThresholdFacts | null;
  assetThreshold: ThresholdFacts | null;
  amountFacts: AmountRule[];
  ageRange: AgeRangeFacts | null;
  /** Known gaps in the underlying data. Surfaced rather than filled in. */
  dataGaps: string[];
}

/** Parses a canonical money string such as "R1,234" into 1234. */
export function parseRand(value: string | null | undefined): number | null {
  if (!value) return null;
  const n = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

/** Formats a rand amount with commas. Locale-independent so output is stable. */
export function formatRand(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  return sign + "R" + String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Reads a canonical fact together with its provenance. Returns null when the
 * key does not exist, so callers must handle unknown data explicitly.
 */
export function readFact(key: string, label: string): FactProvenance | null {
  const meta = getFactMeta(key);
  if (!meta) return null;
  return {
    key,
    label,
    value: meta.value,
    effectiveDate: meta.effective_date,
    verifiedDate: meta.verified_date,
    sourceUrl: meta.source_url,
    verifiedBy: meta.verified_by,
    confidence: meta.confidence,
  };
}

const threshold = (
  label: string,
  basis: "monthly" | "total",
  singleKey: string | null,
  marriedKey: string | null
): ThresholdFacts => ({
  label,
  basis,
  singleKey,
  marriedKey,
});

/**
 * The single rule set per grant. Fact keys only — no values, so nothing here
 * can drift from canonical-facts.json.
 */
export const GRANT_RULES: Record<GrantId, GrantRuleSet> = {
  srd: {
    id: "srd",
    label: "SRD R370 Grant",
    guideUrl: "/grants/srd-r370-grant",
    monthlyIncomeLimitKey: "srd_income_limit",
    incomeThreshold: null,
    assetThreshold: null,
    amountFacts: [{ label: "Monthly amount", key: "srd_grant_amount" }],
    ageRange: { minKey: "srd_age_range_min", maxKey: "srd_age_range_max" },
    dataGaps: [],
  },

  "older-persons": {
    id: "older-persons",
    label: "Older Persons Grant",
    guideUrl: "/grants/old-age-pension",
    monthlyIncomeLimitKey: null,
    incomeThreshold: threshold(
      "Income threshold",
      "monthly",
      "old_age_income_threshold_single",
      "old_age_income_threshold_married"
    ),
    assetThreshold: threshold(
      "Asset threshold",
      "total",
      "old_age_asset_threshold_single",
      "old_age_asset_threshold_married"
    ),
    amountFacts: [
      { label: "Monthly amount, under 75", key: "old_age_pension_amount_under75" },
      { label: "Monthly amount, 75 and older", key: "old_age_pension_amount_over75" },
    ],
    ageRange: { minKey: "older_persons_min_age", maxKey: null },
    dataGaps: [],
  },

  "child-support": {
    id: "child-support",
    label: "Child Support Grant",
    guideUrl: "/grants/child-support-grant",
    monthlyIncomeLimitKey: null,
    incomeThreshold: threshold(
      "Income threshold",
      "monthly",
      "child_support_income_threshold_single",
      "child_support_income_threshold_married"
    ),
    assetThreshold: null,
    amountFacts: [{ label: "Monthly amount per qualifying child", key: "child_support_grant_amount" }],
    ageRange: null,
    dataGaps: ["No asset threshold is published for the Child Support Grant."],
  },

  disability: {
    id: "disability",
    label: "Disability Grant",
    guideUrl: "/grants/disability-grant",
    monthlyIncomeLimitKey: null,
    incomeThreshold: threshold(
      "Income threshold",
      "monthly",
      "disability_income_threshold_single",
      "disability_income_threshold_married"
    ),
    assetThreshold: threshold(
      "Asset threshold",
      "total",
      "disability_asset_threshold_single",
      "disability_asset_threshold_married"
    ),
    amountFacts: [{ label: "Monthly amount", key: "disability_grant_amount" }],
    ageRange: null,
    dataGaps: [],
  },

  "care-dependency": {
    id: "care-dependency",
    label: "Care Dependency Grant",
    guideUrl: "/grants/care-dependency-grant",
    monthlyIncomeLimitKey: null,
    incomeThreshold: threshold(
      "Income threshold",
      "monthly",
      "care_dependency_income_threshold_single",
      "care_dependency_income_threshold_married"
    ),
    assetThreshold: null,
    amountFacts: [{ label: "Monthly amount", key: "care_dependency_grant_amount" }],
    ageRange: null,
    dataGaps: ["The official means-test leaflet records no asset threshold for the Care Dependency Grant (shown as N/A)."],
  },

  "foster-child": {
    id: "foster-child",
    label: "Foster Child Grant",
    guideUrl: "/grants/foster-child-grant",
    monthlyIncomeLimitKey: null,
    incomeThreshold: null,
    assetThreshold: null,
    // No means test applies to this grant — the official means-test leaflet
    // records N/A in every means column — so both thresholds stay null.
    // Amount versioning lives in canonical-facts.json: foster_child_grant_amount
    // (current cycle) and foster_child_grant_amount_2025 (previous cycle).
    amountFacts: [{ label: "Monthly amount", key: "foster_child_grant_amount" }],
    ageRange: null,
    dataGaps: [],
  },

  "war-veterans": {
    id: "war-veterans",
    label: "War Veterans Grant",
    guideUrl: "/grants/war-veterans-grant",
    monthlyIncomeLimitKey: null,
    incomeThreshold: threshold(
      "Income threshold",
      "monthly",
      "war_veterans_income_threshold_single",
      "war_veterans_income_threshold_married"
    ),
    assetThreshold: threshold(
      "Asset threshold",
      "total",
      "war_veterans_asset_threshold_single",
      "war_veterans_asset_threshold_married"
    ),
    amountFacts: [{ label: "Monthly amount", key: "war_veterans_grant_amount" }],
    ageRange: null,
    dataGaps: [],
  },

  "grant-in-aid": {
    id: "grant-in-aid",
    label: "Grant-in-Aid",
    guideUrl: "/grants/grant-in-aid",
    monthlyIncomeLimitKey: null,
    // Grant-in-Aid tops up a grant the applicant already qualifies for, so it
    // runs no income or asset test of its own.
    incomeThreshold: null,
    assetThreshold: null,
    amountFacts: [{ label: "Monthly top-up", key: "grant_in_aid_amount" }],
    ageRange: null,
    dataGaps: [],
  },
};

export const GRANT_IDS = Object.keys(GRANT_RULES) as GrantId[];

export function grantRule(id: GrantId): GrantRuleSet {
  return GRANT_RULES[id];
}

/** Every canonical fact a rule set depends on, with per-fact provenance. */
export function grantProvenance(id: GrantId): FactProvenance[] {
  const rule = GRANT_RULES[id];
  if (!rule) return [];

  const entries: { key: string; label: string }[] = [];
  if (rule.monthlyIncomeLimitKey) {
    entries.push({ key: rule.monthlyIncomeLimitKey, label: "Monthly income limit" });
  }
  for (const t of [rule.incomeThreshold, rule.assetThreshold]) {
    if (!t) continue;
    if (t.singleKey) entries.push({ key: t.singleKey, label: `${t.label}, single` });
    if (t.marriedKey) entries.push({ key: t.marriedKey, label: `${t.label}, married` });
  }
  for (const a of rule.amountFacts) entries.push({ key: a.key, label: a.label });
  if (rule.ageRange) {
    if (rule.ageRange.minKey) entries.push({ key: rule.ageRange.minKey, label: "Minimum age" });
    if (rule.ageRange.maxKey) entries.push({ key: rule.ageRange.maxKey, label: "Maximum age" });
  }

  return entries
    .map((e) => readFact(e.key, e.label))
    .filter((f): f is FactProvenance => f !== null);
}

/**
 * The spread of verification dates behind a set of facts. Shown instead of a
 * single date, because the facts are not all checked on the same day.
 */
export function verifiedRange(facts: FactProvenance[]): { earliest: string; latest: string } | null {
  const dates = facts.map((f) => f.verifiedDate).filter(Boolean).sort();
  if (dates.length === 0) return null;
  return { earliest: dates[0], latest: dates[dates.length - 1] };
}

export interface ResolvedThreshold {
  /** The figure exactly as published, rand symbol and separators included. */
  raw: string | null;
  /** The published figure as a number, regardless of basis. */
  value: number | null;
  /** Monthly figures only. Null for a total-value threshold such as assets. */
  monthly: number | null;
  /** Derived from the monthly figure. Null for a total-value threshold. */
  annual: number | null;
  basis: "monthly" | "total" | null;
}

/**
 * Picks the single or married threshold and returns it with its provenance-free
 * value. An annual figure is derived ONLY from a monthly threshold: multiplying
 * an asset total by twelve would publish a number no source states, so it is
 * left null instead.
 */
export function thresholdFor(
  thresholdFacts: ThresholdFacts | null,
  maritalStatus: "single" | "married"
): ResolvedThreshold {
  const empty: ResolvedThreshold = {
    raw: null,
    value: null,
    monthly: null,
    annual: null,
    basis: null,
  };
  if (thresholdFacts === null) return empty;

  const key =
    maritalStatus === "married" ? thresholdFacts.marriedKey : thresholdFacts.singleKey;
  const raw = key ? readFact(key, thresholdFacts.label)?.value ?? null : null;
  const value = parseRand(raw);
  const isMonthly = thresholdFacts.basis === "monthly";

  return {
    raw,
    value,
    monthly: isMonthly ? value : null,
    annual: isMonthly && value !== null ? value * 12 : null,
    basis: thresholdFacts.basis,
  };
}

export type ThresholdVerdict = "within" | "over" | "unknown";

export interface MeansTestInput {
  maritalStatus: "single" | "married";
  /** Applicant's own monthly income in rand. */
  monthlyIncome: number;
  /** Spouse's monthly income in rand. 0 when single or not applicable. */
  spouseMonthlyIncome: number;
  /** Total assets in rand, or null when no figure was supplied. */
  assets: number | null;
}

export interface MeansTestResult {
  grantId: GrantId;
  monthlyIncomeTotal: number;
  income: ResolvedThreshold & { verdict: ThresholdVerdict };
  /**
   * Which income figure the verdict compared: "household" adds the spouse's
   * income, "applicant" compares the applicant's own income only (the SRD
   * deposit ceiling, which is checked against money arriving in the
   * applicant's own accounts). Null when no income figure could be compared.
   */
  incomeBasis: "household" | "applicant" | null;
  assets: ResolvedThreshold & { verdict: ThresholdVerdict };
  caveats: string[];
}

/**
 * Compares supplied figures against a grant's published thresholds.
 *
 * Returns per-test verdicts only, never an eligibility decision. "within" means
 * one figure sits under a published threshold, which is one requirement of
 * several and not a SASSA outcome.
 */
export function evaluateMeansTest(id: GrantId, input: MeansTestInput): MeansTestResult {
  const rule = GRANT_RULES[id];
  const caveats: string[] = [];

  // A flat monthly ceiling (the SRD deposit check) is a different rule from a
  // marital income threshold: it applies to money arriving in the applicant's
  // own accounts, so it resolves from monthlyIncomeLimitKey when no marital
  // income threshold exists. Both keys being present never happens today.
  const depositCeiling =
    rule.incomeThreshold === null && rule.monthlyIncomeLimitKey !== null
      ? thresholdFor(
          {
            label: "Monthly income limit",
            basis: "monthly",
            singleKey: rule.monthlyIncomeLimitKey,
            marriedKey: rule.monthlyIncomeLimitKey,
          },
          input.maritalStatus
        )
      : null;

  const income =
    rule.incomeThreshold !== null
      ? thresholdFor(rule.incomeThreshold, input.maritalStatus)
      : depositCeiling ?? thresholdFor(null, input.maritalStatus);
  const assets = thresholdFor(rule.assetThreshold, input.maritalStatus);

  const totalIncome = Math.max(0, input.monthlyIncome) + Math.max(0, input.spouseMonthlyIncome);
  const incomeBasis: MeansTestResult["incomeBasis"] =
    rule.incomeThreshold !== null ? "household" : depositCeiling !== null ? "applicant" : null;

  if (input.maritalStatus === "single" && input.spouseMonthlyIncome > 0) {
    caveats.push("You entered a spouse income but selected single. Both incomes are included.");
  }

  const incomeVerdict: ThresholdVerdict =
    income.value === null
      ? "unknown"
      : (incomeBasis === "applicant" ? input.monthlyIncome : totalIncome) < income.value
        ? "within"
        : "over";

  if (incomeBasis === "applicant" && input.maritalStatus === "married" && input.spouseMonthlyIncome > 0) {
    caveats.push(
      "This limit is checked against money coming into your own accounts, so the spouse income you entered was not part of this comparison."
    );
  }

  // No published asset threshold means there is nothing to compare, so the asset
  // verdict stays "unknown" and the tool says so rather than guessing. The same
  // applies when a threshold is published but missing from the data file: a
  // figure we cannot read is not evidence that an applicant is over the limit.
  let assetsVerdict: ThresholdVerdict = "unknown";
  if (rule.assetThreshold !== null) {
    if (input.assets === null) {
      caveats.push("Add your assets to check the asset threshold.");
    } else if (assets.value === null) {
      caveats.push("The asset threshold for this grant is not in our verified data, so it was not compared.");
    } else {
      assetsVerdict = input.assets < assets.value ? "within" : "over";
    }
  }

  if (
    rule.incomeThreshold === null &&
    rule.assetThreshold === null &&
    rule.monthlyIncomeLimitKey === null
  ) {
    caveats.push("This grant runs no income or asset test of its own.");
  }

  return {
    grantId: id,
    monthlyIncomeTotal: totalIncome,
    income: { ...income, verdict: incomeVerdict },
    incomeBasis: income.value === null ? null : incomeBasis,
    assets: { ...assets, verdict: assetsVerdict },
    caveats,
  };
}

/** The published age limits for a grant, or null where they are not recorded. */
export function ageRangeFor(
  id: GrantId
): { min: number | null; max: number | null; facts: FactProvenance[] } {
  const range = GRANT_RULES[id]?.ageRange ?? null;
  if (range === null) return { min: null, max: null, facts: [] };

  const minFact = range.minKey ? readFact(range.minKey, "Minimum age") : null;
  const maxFact = range.maxKey ? readFact(range.maxKey, "Maximum age") : null;

  return {
    min: parseAge(minFact?.value),
    max: parseAge(maxFact?.value),
    facts: [minFact, maxFact].filter((f): f is FactProvenance => f !== null),
  };
}

/** Age facts are plain numbers ("18"), not rand amounts. */
function parseAge(value: string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(String(value).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : null;
}
