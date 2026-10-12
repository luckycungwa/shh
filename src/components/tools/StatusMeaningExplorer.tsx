"use client";

import React, { useState } from "react";
import { FaBookOpen, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";

export interface StatusFix {
  title: string;
  content: string;
}

export interface ExplorerStatus {
  slug: string;
  label: string;
  meaning: string;
  fixes: StatusFix[];
}

// Statuses are loaded server-side from status-meanings.json (the same source
// as /status/[slug]) and passed in, so this explorer can never drift from the
// full status guides it links to.
export default function StatusMeaningExplorer({ statuses }: { statuses: ExplorerStatus[] }) {
  const [slug, setSlug] = useState("");
  const selected = statuses.find((s) => s.slug === slug) || null;

  return (
    <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary-gold/10 p-2 rounded-xl">
          <FaBookOpen className="text-primary-gold text-xl" />
        </div>
        <h2 className="text-xl font-black text-gray-900 dark:text-white">What Does My Status Mean?</h2>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        Select the status you see on the SRD portal to get a plain-English explanation and what to do next.
      </p>

      <select
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-gold"
      >
        <option value="">Choose a status…</option>
        {statuses.map((s) => (
          <option key={s.slug} value={s.slug}>
            {s.label}
          </option>
        ))}
      </select>

      {selected && (
        <div className="p-4 rounded-2xl border border-primary-gold/30 bg-primary-gold/5 space-y-3">
          <p className="font-black text-lg text-gray-900 dark:text-white">{selected.label}</p>
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 mb-1">What it means</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selected.meaning}</p>
          </div>
          {selected.fixes.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase text-gray-400 mb-1">What to do</p>
              <ol className="space-y-2">
                {selected.fixes.map((f, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="font-bold text-gray-900 dark:text-white">{i + 1}. {f.title} — </span>
                    {f.content}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <NextLink
            href={`/status/${selected.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-gold hover:underline"
          >
            Full guide for this status <FaArrowRight className="text-xs" />
          </NextLink>
        </div>
      )}

      {selected && (
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <FaCheckCircle /> This tool explains common statuses only. Always confirm your live status on the
          official SRD portal.
        </p>
      )}
    </div>
  );
}
