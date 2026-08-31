import fs from "fs";
import path from "path";
import React from "react";
import { Metadata } from "next";
import { Card, CardHeader, CardBody, Divider, Button, Breadcrumbs, BreadcrumbItem, Chip, Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import Image from "next/image";
import { FaClock, FaCalendarAlt, FaExternalLinkAlt, FaThumbsUp, FaThumbsDown, FaListUl, FaLink, FaLightbulb, FaQuestionCircle, FaMobileAlt } from "react-icons/fa";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import EditorialMeta from "../../../components/EditorialMeta";
import AdNetworkLoader from "../../../components/AdNetworkLoader";
import AffiliateCTA from "../../../components/affiliate/AffiliateCTA";
import NextStepCard from "../../../components/affiliate/NextStepCard";
import EntityLinks from "../../../components/EntityLinks";
import { howToSchema, faqPageSchema, breadcrumbSchema } from "../../../lib/schema";
import { SITE_CONFIG } from "../../../lib/config";
import { resolveTemplates } from "../../../lib/canonical-facts";
import { type AffiliateVertical, ctaCopyFor } from "../../../lib/affiliate";
import { type NextStepItem } from "../../../components/affiliate/NextStepCard";
import { guideNextSteps } from "../../../lib/entities";

interface GuideStep {
  title: string;
  content: string;
  tips?: string[];
}

interface GuideFaq {
  q: string;
  a: string;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  steps: GuideStep[];
  faqs?: GuideFaq[];
  image?: string;
  imageAlt?: string;
  tags: string[];
  lastUpdated: string;
  author: string;
  relatedLinks?: { title: string; url: string; isExternal: boolean }[];
  sources?: { title: string; url: string }[];
  monetization?: { vertical: AffiliateVertical };
  nextSteps?: NextStepItem[];
}

export async function generateStaticParams() {
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");
  const guides: Guide[] = JSON.parse(fs.readFileSync(guidesPath, "utf8"));
  return guides.map((guide) => ({ id: guide.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");
  const guides: Guide[] = JSON.parse(fs.readFileSync(guidesPath, "utf8"));
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  const url = `https://www.sassahelphub.co.za/guides/${id}`;
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      type: "article",
      siteName: "SASSA Help Hub",
      locale: "en_ZA",
      authors: [guide.author],
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default async function GuidePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const guidesPath = path.join(process.cwd(), "public/data/guides.json");
  const guides: Guide[] = JSON.parse(fs.readFileSync(guidesPath, "utf8"));
  const guide = guides.find((g) => g.id === id);

  if (!guide) notFound();

  const contextualNext = guide.nextSteps && guide.nextSteps.length ? guide.nextSteps : guideNextSteps(guide);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={howToSchema(guide.title, resolveTemplates(guide.description),
        guide.steps.map(s => ({ title: s.title, text: resolveTemplates(s.content) }))
      )} />
      {guide.faqs && guide.faqs.length > 0 && (
        <JsonLd data={faqPageSchema(guide.faqs.map(f => ({ q: resolveTemplates(f.q), a: resolveTemplates(f.a) })))} />
      )}
      <JsonLd data={breadcrumbSchema([
        { name: "Home", slug: "/" },
        { name: "Guides", slug: "/guides" },
        { name: guide.title, slug: `/guides/${guide.id}` },
      ])} />
      <Breadcrumbs className="mb-8">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/guides">Guides</BreadcrumbItem>
        <BreadcrumbItem>{guide.title}</BreadcrumbItem>
      </Breadcrumbs>

      <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
           <header className="space-y-6">
              <Chip color="secondary" variant="flat" className="font-bold uppercase text-xs">
                 {guide.category}
              </Chip>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                 {guide.title}
              </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic">
                   {resolveTemplates(guide.description)}
                </p>

                {guide.image && (
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
                    <Image
                      src={guide.image}
                      alt={guide.imageAlt || guide.title}
                      width={1200}
                      height={400}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

               <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-gray-100 py-6">
                 <div className="flex items-center gap-3">
                    <Avatar name="ZA" size="sm" className="bg-primary-gold text-primary-black font-bold" />
                    <div>
                        <NextLink href="/authors" className="font-bold text-gray-900 hover:text-primary-gold transition-colors">{guide.author}</NextLink>
                       <p className="text-xs">SASSA Help Hub — Independent Unofficial Resource</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary-gold" />
                    <span>Updated: {new Date(guide.lastUpdated).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <FaClock className="text-primary-gold" />
                    <span>{guide.estimatedTime}</span>
                 </div>
              </div>
            </header>

            <EditorialMeta lastVerified={guide.lastUpdated} author={guide.author} />

            {guide.steps.length > 0 && (
             <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 p-8 shadow-2xl rounded-[2rem] lg:hidden mb-12">
                <CardBody className="p-0 space-y-6">
                   <p className="font-black text-xl flex items-center gap-3"><FaListUl className="text-primary-gold" /> Guide Contents</p>
                   <div className="flex flex-col gap-4">
                      {guide.steps.map((step, i) => (
                        <a key={i} href={`#step-${i + 1}`} className="text-sm font-bold text-gray-500 hover:text-primary-gold transition-all flex items-center gap-2 group">
                           <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-primary-gold group-hover:w-4 transition-all"></span>
                           {step.title}
                        </a>
                      ))}
                   </div>
                </CardBody>
             </Card>
           )}

           <section className="space-y-8">
              <h2 className="text-3xl font-black flex items-center gap-3">
                 <FaListUl className="text-primary-gold" /> Step-by-Step Instructions
              </h2>

              <div className="space-y-12">
                 {guide.steps.map((step, index) => (
                    <div key={index} id={`step-${index + 1}`} className="relative pl-12 border-l-2 border-gray-100 dark:border-gray-800 pb-8 last:pb-0 scroll-mt-32">
                       <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-primary-gold text-primary-black flex items-center justify-center font-black shadow-lg">
                          {index + 1}
                       </div>
                       <div className="space-y-4">
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                            <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: resolveTemplates(step.content) }} />
                          {step.tips && step.tips.length > 0 && (
                              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl flex items-start gap-4">
                                <FaLightbulb className="text-blue-500 mt-1 flex-shrink-0" />
                                <div>
                                   <p className="font-bold text-blue-900 dark:text-blue-400 mb-1">Pro Tip</p>
                                   <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                                      {step.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                                   </ul>
                                </div>
                             </div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </section>

            {guide.faqs && guide.faqs.length > 0 && (
               <section className="space-y-4">
                  <h2 className="text-3xl font-black flex items-center gap-3">
                     <FaQuestionCircle className="text-primary-gold" /> Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                     {guide.faqs.map((faq, fi) => (
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
            )}

            {guide.sources && guide.sources.length > 0 ? (
               <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                      <FaLink className="text-primary-gold" /> Sources & References
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                     This guide was researched and verified against the following official sources:
                  </p>
                  <ul className="space-y-4">
                     {guide.sources.map((source, i) => (
                        <li key={i} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                           <span>{source.title}</span>
                           <Button as="a" href={source.url} target="_blank" rel="noopener noreferrer" size="sm" variant="flat" color="primary">
                              Visit Website <FaExternalLinkAlt className="ml-2 text-xs" />
                           </Button>
                        </li>
                     ))}
                  </ul>
               </section>
            ) : (
               <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                      <FaLink className="text-primary-gold" /> Sources & References
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                     This guide was researched and verified against the following official sources:
                  </p>
                  <ul className="space-y-4">
                     <li className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                        <span>Official SASSA Website</span>
                        <Button as="a" href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" size="sm" variant="flat" color="primary">
                           Visit Website <FaExternalLinkAlt className="ml-2 text-xs" />
                        </Button>
                     </li>
                     <li className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                        <span>SRD Grant Official Portal</span>
                        <Button as="a" href="https://srd.sassa.gov.za" target="_blank" rel="noopener noreferrer" size="sm" variant="flat" color="primary">
                           Visit Website <FaExternalLinkAlt className="ml-2 text-xs" />
                        </Button>
                     </li>
                     <li className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                        <span>Department of Social Development</span>
                        <Button as="a" href="https://www.dsd.gov.za" target="_blank" rel="noopener noreferrer" size="sm" variant="flat" color="primary">
                           Visit Website <FaExternalLinkAlt className="ml-2 text-xs" />
                        </Button>
                     </li>
                  </ul>
               </section>
            )}

            <AdNetworkLoader />

            {guide.monetization && (() => {
              const copy = ctaCopyFor(guide.monetization!.vertical);
              return (
                <AffiliateCTA
                  vertical={guide.monetization!.vertical}
                  pagePath={`/guides/${id}`}
                  title={copy.title}
                  description={copy.description}
                  ctaLabel={copy.ctaLabel}
                  placement="in_content"
                />
              );
            })()}

            {contextualNext && (
              <NextStepCard items={contextualNext} pagePath={`/guides/${id}`} />
            )}

            <EntityLinks
              links={[
                { title: "Compare all SASSA grants", url: "/grants" },
                { title: "Grant status meanings", url: "/status" },
                { title: "How to check your grant status", url: "/status-check" },
              ]}
              title="Keep exploring"
              pagePath={`/guides/${id}`}
            />

            {guide.relatedLinks && (
               <section className="bg-primary-gold/5 p-8 rounded-3xl border border-primary-gold/10 space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                      <FaLink className="text-primary-gold" /> Related Resources
                  </h3>
                 <ul className="space-y-4">
                    {guide.relatedLinks.map((link, i) => (
                       <li key={i} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                          <span>{link.title}</span>
                          <Button as={NextLink} href={link.url} target="_blank" size="sm" variant="flat" color="primary">
                             Visit Website <FaExternalLinkAlt className="ml-2 text-xs" />
                          </Button>
                       </li>
                    ))}
                 </ul>
              </section>
           )}

           <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl gap-6">
              <p className="font-bold text-lg">Was this guide helpful?</p>
              <div className="flex gap-4">
                 <Button color="success" variant="flat" startContent={<FaThumbsUp />}>Yes, thanks!</Button>
                 <Button color="danger" variant="flat" startContent={<FaThumbsDown />}>Not really</Button>
              </div>
           </div>
        </div>

        <aside className="lg:col-span-4 space-y-12">
           {guide.steps.length > 0 && (
             <div className="hidden lg:block space-y-8">
                <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                   <p className="font-black text-2xl mb-8 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primary-gold rounded-full"></span>
                      On this page
                   </p>
                   <div className="flex flex-col gap-6">
                      {guide.steps.map((step, i) => (
                        <a key={i} href={`#step-${i + 1}`} className="text-sm font-bold text-gray-500 hover:text-primary-gold transition-all flex items-center gap-3 group">
                           <span className="w-2 h-2 rounded-full border-2 border-gray-200 group-hover:bg-primary-gold group-hover:border-primary-gold transition-all"></span>
                           {step.title}
                        </a>
                      ))}
                   </div>
                </div>
             </div>
           )}

           <Card className="p-8 bg-primary-black text-white border-none shadow-2xl rounded-[2.5rem] relative overflow-hidden group">
              <CardBody className="p-0 space-y-6">
                 <h3 className="text-2xl font-black text-primary-gold">Need Help?</h3>
                 <p className="text-sm text-secondary-gray">If you're still unsure about this process, you can contact me or the official SASSA helpline.</p>
                 <Button as={NextLink} href="/contact" fullWidth color="primary" className="font-bold">
                    Get in Touch
                 </Button>
              </CardBody>
           </Card>

           <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-3xl space-y-4">
              <h4 className="font-bold">Related Guides</h4>
              <div className="space-y-4">
                 {guides.filter(g => g.id !== id).slice(0, 3).map(rel => (
                    <NextLink key={rel.id} href={`/guides/${rel.id}`} className="block group">
                       <p className="text-xs font-bold text-gray-400 group-hover:text-primary-gold transition-colors uppercase">{rel.category}</p>
                       <p className="font-bold text-sm leading-tight mt-1">{rel.title}</p>
                    </NextLink>
                 ))}
              </div>
           </div>
        </aside>
      </article>
    </div>
  );
}
