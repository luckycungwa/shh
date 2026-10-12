import React from "react";
import NextLink from "next/link";
import { FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import NextStepCard from "../../affiliate/NextStepCard";
import type { NextStepItem } from "../../affiliate/NextStepCard";

interface ToolShellProps {
  title: string;
  intro: React.ReactNode;
  /** Tool path, used for monetization tracking on the next-step links. */
  path: string;
  /** Rendered above the title. Usually breadcrumb JSON-LD. */
  schema?: React.ReactNode;
  children: React.ReactNode;
  /** Internal links shown after the tool. */
  nextSteps?: NextStepItem[];
  /** Replaces the default estimate disclaimer. */
  disclaimer?: React.ReactNode;
}

/**
 * Shared frame for every tool page: back link, heading, intro, the tool itself,
 * an honest disclaimer, and the internal links that hand the user to the guide
 * that explains the topic in full.
 */
export default function ToolShell({
  title,
  intro,
  path,
  schema,
  children,
  nextSteps,
  disclaimer,
}: ToolShellProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      {schema}

      <NextLink
        href="/tools"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-gold transition-colors"
      >
        <FaArrowLeft /> All tools
      </NextLink>

      <header className="space-y-3">
        <h1 className="text-4xl font-black tracking-tight">{title}</h1>
        <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{intro}</div>
      </header>

      {children}

      {disclaimer ?? (
        <div className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
          <FaInfoCircle className="mt-0.5 flex-shrink-0 text-primary-gold" />
          <p className="leading-relaxed">
            This tool gives you an estimate based on the rules published by SASSA. It is not a
            decision by SASSA and it does not apply for anything on your behalf. Always confirm
            your situation on the official SASSA channels.
          </p>
        </div>
      )}

      {nextSteps && nextSteps.length > 0 && <NextStepCard items={nextSteps} pagePath={path} />}
    </div>
  );
}
