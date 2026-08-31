import React from "react";
import { FaArrowRight } from "react-icons/fa";
import NextLink from "next/link";
import type { EntityLink } from "../lib/entities";

interface EntityLinksProps {
  links: EntityLink[];
  title?: string;
  pagePath?: string;
}

/** Reusable contextual cross-linking section. Renders an "Explore related SASSA topics"
 *  block so every vertical page funnels readers to the grant/status/payment/banking/appeal hubs. */
export default function EntityLinks({ links, title = "Explore related SASSA topics", pagePath }: EntityLinksProps) {
  if (!links || links.length === 0) return null;
  return (
    <section className="my-10 rounded-3xl border border-primary-gold/20 bg-primary-gold/5 p-6 space-y-4">
      <h3 className="text-lg font-black flex items-center gap-2 text-gray-900 dark:text-white">
        <span className="w-2 h-6 bg-primary-gold rounded-full" /> {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link, i) => {
          const isInternal = link.url.startsWith("/");
          const content = (
            <>
              <span>
                <span className="block font-bold text-sm text-gray-900 dark:text-white">{link.title}</span>
                {link.description && (
                  <span className="block text-xs text-gray-500 mt-0.5">{link.description}</span>
                )}
              </span>
              <FaArrowRight className="text-primary-gold text-sm group-hover:translate-x-1 transition-transform" />
            </>
          );
          return (
            <li key={i}>
              {isInternal ? (
                <NextLink
                  href={link.url}
                  data-entity-from={pagePath}
                  className="group flex items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-gold/40 transition-colors"
                >
                  {content}
                </NextLink>
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-gold/40 transition-colors"
                >
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
