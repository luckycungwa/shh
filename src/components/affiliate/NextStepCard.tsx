"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";
import { trackMonetizationEvent } from "../../lib/affiliate";

export interface NextStepItem {
  title: string;
  url: string;
  description?: string;
}

interface NextStepCardProps {
  items: NextStepItem[];
  pagePath: string;
}

// Contextual "what to do next" component. Drives the internal-link funnel from
// high-traffic SASSA pages (calendar, status, phone, SRD) to commercial-aware
// content. Only renders when items are provided.
export default function NextStepCard({ items, pagePath }: NextStepCardProps) {
  if (!items || items.length === 0) return null;
  return (
    <section className="my-10 rounded-3xl border border-primary-gold/20 bg-primary-gold/5 p-6 space-y-4">
      <h3 className="text-lg font-black flex items-center gap-2 text-gray-900 dark:text-white">
        <span className="w-2 h-6 bg-primary-gold rounded-full" /> What to do next
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => {
          const isInternal = item.url.startsWith("/");
          const onClick = () =>
            trackMonetizationEvent("internal_commercial_click", {
              page_path: pagePath,
              target: item.url,
            });
          return (
            <li key={i}>
              {isInternal ? (
                <NextLink
                  href={item.url}
                  onClick={onClick}
                  className="group flex items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-gold/40 transition-colors"
                >
                  <span>
                    <span className="block font-bold text-sm text-gray-900 dark:text-white">{item.title}</span>
                    {item.description && (
                      <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
                    )}
                  </span>
                  <FaArrowRight className="text-primary-gold text-sm group-hover:translate-x-1 transition-transform" />
                </NextLink>
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClick}
                  className="group flex items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-gold/40 transition-colors"
                >
                  <span>
                    <span className="block font-bold text-sm text-gray-900 dark:text-white">{item.title}</span>
                    {item.description && (
                      <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
                    )}
                  </span>
                  <FaArrowRight className="text-primary-gold text-sm group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
