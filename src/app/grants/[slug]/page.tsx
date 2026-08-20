import fs from "fs";
import path from "path";
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardBody, Chip, Divider, Link } from "@nextui-org/react";
import { FaCheckCircle, FaExternalLinkAlt, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import NextLink from "next/link";
import JsonLd from "../../../components/JsonLd";
import EditorialFooter from "../../../components/EditorialFooter";
import EditorialMeta from "../../../components/EditorialMeta";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import { breadcrumbSchema, articleSchema, faqPageSchema } from "../../../lib/schema";
import { resolveTemplates, getFactMeta } from "../../../lib/canonical-facts";

interface GrantFaq {
  q: string;
  a: string;
}

interface GrantStep {
  title: string;
  content: string;
}

interface GrantSection {
  type: string;
  title?: string;
  content?: string;
  steps?: GrantStep[];
  faqs?: GrantFaq[];
  references?: { title: string; url: string }[];
}

interface GrantData {
  title: string;
  description: string;
  slug: string;
  last_updated: string;
  reviewed_by: string;
  author: string;
  sources: string[];
  related: string[];
  sections: GrantSection[];
}

export async function generateStaticParams() {
  const grantsDir = path.join(process.cwd(), "public/data/grants");
  const files = fs.readdirSync(grantsDir).filter((f) => f.endsWith(".json"));
  return files.map((f) => ({ slug: f.replace(".json", "") }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const filePath = path.join(process.cwd(), "public/data/grants", `${params.slug}.json`);
    const data: GrantData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const url = `https://www.sassahelphub.co.za/grants/${params.slug}`;
    const title = resolveTemplates(data.title);
    const description = resolveTemplates(data.description);
    return {
      title,
      description,
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title,
        description,
        url,
        type: "article",
        siteName: "SASSA Help Hub",
        locale: "en_ZA",
        images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["https://www.sassahelphub.co.za/logo.png"],
      },
    };
  } catch {
    return { title: "Grant Guide Not Found" };
  }
}

export default function GrantGuidePage({ params }: { params: { slug: string } }) {
  let data: GrantData;
  try {
    const filePath = path.join(process.cwd(), "public/data/grants", `${params.slug}.json`);
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    notFound();
  }

  const rawSectionText = data.sections.map((s) => JSON.stringify(s)).join(" ") + " " + data.title + " " + data.description;
  const usedFactKeys = Array.from(new Set(Array.from(rawSectionText.matchAll(/\{\{(\w+)\}\}/g), (m) => m[1])));
  const unverifiedFacts = usedFactKeys
    .map((k) => ({ k, meta: getFactMeta(k) }))
    .filter((x) => x.meta && x.meta.confidence === "needs_human_review")
    .map((x) => x.k);

  data = {
    ...data,
    title: resolveTemplates(data.title),
    description: resolveTemplates(data.description),
    sections: data.sections.map((s) => ({
      ...s,
      content: s.content ? resolveTemplates(s.content) : s.content,
      steps: s.steps ? s.steps.map((st) => ({ ...st, content: resolveTemplates(st.content) })) : s.steps,
      faqs: s.faqs ? s.faqs.map((f) => ({ ...f, q: resolveTemplates(f.q), a: resolveTemplates(f.a) })) : s.faqs,
    })),
  };

  const allFaqs = data.sections.filter((s) => s.type === "faq" && s.faqs).flatMap((s) => s.faqs || []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={articleSchema(data.title, data.description, `/grants/${data.slug}`, data.author, data.last_updated)} />
      {allFaqs.length > 0 && (
        <JsonLd data={faqPageSchema(allFaqs)} />
      )}
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Grants", slug: "/grants" },
        { name: data.title, slug: `/grants/${data.slug}` },
      ])} />

      <nav className="text-sm text-gray-500 mb-8 flex gap-2">
        <NextLink href="/" className="hover:text-primary-gold">Home</NextLink>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate max-w-[300px]">{data.title}</span>
      </nav>

      <article className="space-y-12">
        <header className="space-y-6">
          <Chip color="primary" variant="flat" className="font-bold uppercase text-xs">
            Grant Guide
          </Chip>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {resolveTemplates(data.title)}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {resolveTemplates(data.description)}
          </p>
          <EditorialMeta lastVerified={data.last_updated} author={data.author} />
          {unverifiedFacts.length > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 text-sm text-amber-800 dark:text-amber-200">
              <FaInfoCircle className="text-amber-500 mt-0.5 shrink-0" />
              <p>
                Some amounts on this page have not been independently verified against an official source and
                may change. Always confirm current figures with SASSA, Postbank, or the National Treasury before
                acting on them.
              </p>
            </div>
          )}
        </header>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 p-4 rounded-2xl shadow-sm lg:hidden mb-8">
          <p className="font-bold text-sm mb-2">On this page:</p>
          <div className="flex flex-wrap gap-2">
            {data.sections.filter((s) => s.title).map((s, i) => (
              <a key={i} href={`#section-${i}`} className="text-xs font-bold text-gray-500 hover:text-primary-gold px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-full">
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {data.sections.map((section, index) => {
              switch (section.type) {
                case "intro":
                  return (
                    <section key={index} id={`section-${index}`} className="scroll-mt-24">
                      <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: resolveTemplates(section.content || "") }} />
                    </section>
                  );
                case "eligibility":
                case "text":
                case "info":
                case "documents":
                  return (
                    <section key={index} id={`section-${index}`} className="scroll-mt-24">
                      <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: resolveTemplates(section.content || "") }} />
                    </section>
                  );
                case "steps":
                  return (
                    <section key={index} id={`section-${index}`} className="scroll-mt-24">
                      <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                      <div className="space-y-8">
                        {(section.steps || []).map((step, si) => (
                          <div key={si} className="relative pl-12 border-l-2 border-gray-100 dark:border-gray-800 pb-6 last:pb-0">
                            <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-lg">
                              {si + 1}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{resolveTemplates(step.content)}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                case "faq":
                  return (
                    <section key={index} id={`section-${index}`} className="scroll-mt-24">
                      <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                      <div className="space-y-4">
                        {(section.faqs || []).map((faq, fi) => (
                          <details key={fi} className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                            <summary className="flex items-center gap-3 p-4 cursor-pointer list-none font-bold hover:bg-gray-50 dark:hover:bg-gray-800/50 [&::-webkit-details-marker]:hidden">
                              <FaQuestionCircle className="text-primary-gold flex-shrink-0" />
                              <span>{faq.q}</span>
                            </summary>
                            <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
                              <p className="text-gray-600 dark:text-gray-400">{resolveTemplates(faq.a)}</p>
                            </div>
                          </details>
                        ))}
                      </div>
                    </section>
                  );
                case "references":
                  return (
                    <section key={index} id={`section-${index}`} className="scroll-mt-24">
                      <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                      <div className="space-y-3">
                        {(section.references || []).map((ref, ri) => (
                          <div key={ri} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                            <span className="font-medium">{ref.title}</span>
                            <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-primary-gold font-bold text-sm flex items-center gap-1">
                              Visit <FaExternalLinkAlt className="text-xs" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                default:
                  return null;
              }
            })}
          </div>

          <AdNetworkLoader />

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 hidden lg:block space-y-8">
              <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="font-bold text-lg mb-4">On this page</p>
                <div className="flex flex-col gap-3">
                  {data.sections.filter((s) => s.title).map((s, i) => (
                    <a key={i} href={`#section-${i}`} className="text-sm font-medium text-gray-500 hover:text-primary-gold transition-colors">
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>

              {data.related.length > 0 && (
                <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
                  <p className="font-bold text-lg mb-4">Related</p>
                  <div className="flex flex-col gap-3">
                    {data.related.map((slug, i) => (
                      <NextLink key={i} href={slug} className="text-sm font-medium text-primary-gold hover:underline">
                        {slug.split("/").pop()?.replace(/-/g, " ") || slug}
                      </NextLink>
                    ))}
                  </div>
                </div>
              )}

              {data.sources.length > 0 && (
                <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
                  <p className="font-bold text-lg mb-4">Official Sources</p>
                  <div className="flex flex-col gap-3">
                    {data.sources.map((src: string, i: number) => (
                      <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary-gold hover:underline break-all flex items-center gap-1">
                        {src.replace(/^https?:\/\//, "")} <FaExternalLinkAlt className="text-xs" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        <Divider />
        <EditorialFooter lastUpdated={data.last_updated} author={data.reviewed_by} />
      </article>
    </div>
  );
}
