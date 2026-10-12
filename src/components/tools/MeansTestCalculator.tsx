"use client";

import React, { useState } from "react";
import { FaCalculator, FaInfoCircle } from "react-icons/fa";
import { MoneyInput, ResultPanel, ResultNote, RuleDisclosure } from "./ui";
import {
  GRANT_IDS,
  grantRule,
  evaluateMeansTest,
  type GrantId,
  type MeansTestResult,
} from "../../lib/tools/grantRules";

const toNum = (raw: string): number => {
  const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const VERDICT_WORDS: Record<string, string> = {
  within: "Under the limit",
  over: "Over the limit",
  unknown: "Not checked",
};

const chipClass = (active: boolean): string =>
  `px-4 py-2 rounded-xl text-sm font-bold border transition-colors text-left ${
    active
      ? "bg-primary-black text-white border-primary-black dark:bg-primary-gold dark:text-primary-black dark:border-primary-gold"
      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
  }`;

/**
 * Compares supplied figures against the thresholds in grantRules.ts. Every
 * figure on screen resolves from canonical-facts.json through the rule set, so
 * this component holds no rand values of its own. Output is always two
 * per-test verdicts plus the caveats the engine raises — never an eligibility
 * decision.
 */
export default function MeansTestCalculator() {
  const [grant, setGrant] = useState<GrantId>("srd");
  const [marital, setMarital] = useState<"single" | "married">("single");
  const [income, setIncome] = useState("");
  const [spouseIncome, setSpouseIncome] = useState("");
  const [assets, setAssets] = useState("");
  const [showResult, setShowResult] = useState(false);

  const rule = grantRule(grant);
  const hasAssetTest = rule.assetThreshold !== null;

  const result: MeansTestResult | null =
    showResult && income.trim() !== ""
      ? evaluateMeansTest(grant, {
          maritalStatus: marital,
          monthlyIncome: toNum(income),
          spouseMonthlyIncome: marital === "married" ? toNum(spouseIncome) : 0,
          assets: hasAssetTest && assets.trim() !== "" ? toNum(assets) : null,
        })
      : null;

  const incomeDetail = result
    ? result.income.value !== null
      ? `${result.income.raw ?? ""} per month — ${
          result.incomeBasis === "applicant"
            ? "compared against money coming into your own accounts"
            : "compared against your combined monthly income (yours plus your spouse's)"
        }`
      : "No income threshold could be read from our verified data for this grant."
    : undefined;

  const assetsDetail = result
    ? !hasAssetTest
      ? "This grant has no published asset threshold, so nothing was compared."
      : result.assets.value !== null
        ? `${result.assets.raw ?? ""} total value of assets`
        : "The asset threshold for this grant is not in our verified data."
    : undefined;

  const tone: "check" | "warn" | "info" = result
    ? result.income.verdict === "over" || result.assets.verdict === "over"
      ? "warn"
      : result.income.verdict === "within" && (result.assets.verdict === "within" || !hasAssetTest)
        ? "check"
        : "info"
    : "info";

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary-gold/10 p-2 rounded-xl">
          <FaCalculator className="text-primary-gold text-xl" />
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white">Compare your figures</h2>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-bold text-gray-700 dark:text-gray-300">
          1. Which grant are you checking?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {GRANT_IDS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={grant === id}
              onClick={() => {
                setGrant(id);
                setShowResult(false);
              }}
              className={chipClass(grant === id)}
            >
              {grantRule(id).label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-bold text-gray-700 dark:text-gray-300">2. Are you single or married?</legend>
        <div className="flex flex-wrap gap-2">
          {(["single", "married"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={marital === m}
              onClick={() => {
                setMarital(m);
                setShowResult(false);
              }}
              className={chipClass(marital === m)}
            >
              {m === "single" ? "Single" : "Married (incl. life partner)"}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-4">
        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">3. Your figures</p>
        <MoneyInput
          label="Your total monthly income"
          value={income}
          onChange={(v) => {
            setIncome(v);
            if (showResult && v.trim() === "") setShowResult(false);
          }}
          placeholder="e.g. 3500"
          hint="Everything you receive in a month: salary, part-time work, rentals, regular transfers."
        />
        {marital === "married" && (
          <MoneyInput
            label="Your spouse's monthly income"
            value={spouseIncome}
            onChange={setSpouseIncome}
            placeholder="e.g. 0"
            hint="Leave blank if they have no income."
          />
        )}
        <MoneyInput
          label="Total value of your assets"
          value={assets}
          onChange={setAssets}
          placeholder="e.g. 50000"
          hint={
            hasAssetTest
              ? "Savings, property, vehicles and other assets you own. Some grants do not test assets — the result below will say so."
              : "This grant has no published asset threshold, so you can leave this blank."
          }
        />
      </div>

      <button
        type="button"
        onClick={() => setShowResult(true)}
        disabled={income.trim() === ""}
        className="w-full sm:w-auto bg-primary-black text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Check my figures
      </button>

      {result && (
        <div className="space-y-4">
          <ResultPanel
            tone={tone}
            title={`Your figures against the ${rule.label} means test`}
            body="Two figures compared against published thresholds. SASSA decides eligibility using your age, citizenship, household and documents as well — being under the limit is one requirement, not an approval."
            findings={[
              {
                label: "Income test",
                verdict: VERDICT_WORDS[result.income.verdict],
                detail: incomeDetail,
              },
              {
                label: "Asset test",
                verdict: hasAssetTest ? VERDICT_WORDS[result.assets.verdict] : "Not applicable",
                detail: assetsDetail,
              },
            ]}
          >
            {result.caveats.length > 0 && (
              <ul className="space-y-1">
                {result.caveats.map((c) => (
                  <li key={c} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <FaInfoCircle className="mt-0.5 flex-shrink-0 text-primary-gold" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            )}
          </ResultPanel>

          {rule.dataGaps.map((gap) => (
            <ResultNote key={gap}>{gap}</ResultNote>
          ))}
        </div>
      )}

      <RuleDisclosure grantId={grant} />
    </div>
  );
}
