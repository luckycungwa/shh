import fs from "fs";
import path from "path";
import React from "react";
import { Metadata } from "next";
import { Avatar, Card, CardBody, Divider, Button, Breadcrumbs, BreadcrumbItem, Chip, Accordion, AccordionItem } from "@nextui-org/react";
import { FaClock, FaCalendarAlt, FaUserEdit, FaExternalLinkAlt, FaThumbsUp, FaThumbsDown, FaArrowLeft, FaListUl, FaLink } from "react-icons/fa";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { faqPageSchema } from "../../../lib/schema";
import { resolveTemplates } from "../../../lib/canonical-facts";
import AdNetworkLoader from "../../../components/AdNetworkLoader";

interface Update {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  type: string;
  urgent: boolean;
  noindex?: boolean;
  author?: string;
  sources?: { title: string; url: string }[];
  faqs?: { q: string; a: string }[];
}

export async function generateStaticParams() {
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const updates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8"));
  return updates.map((update) => ({ id: update.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const updates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8"));
  const update = updates.find((u) => u.id === id);

  if (!update) {
    return {
      title: "Update Not Found",
    };
  }

  const url = `https://www.sassahelphub.co.za/updates/${id}`;
  return {
    title: update.title,
    description: update.summary,
    alternates: { canonical: url },
    robots: update.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: update.title,
      description: update.summary,
      url,
      type: "article",
      siteName: "SASSA Help Hub",
      locale: "en_ZA",
      publishedTime: update.date,
      authors: [update.author || "Lucky Cungwa"],
      images: [{ url: "https://www.sassahelphub.co.za/logo.png", width: 790, height: 790 }],
    },
    twitter: {
      card: "summary_large_image",
      title: update.title,
      description: update.summary,
      images: ["https://www.sassahelphub.co.za/logo.png"],
    },
  };
}

export default async function UpdatePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const updatesPath = path.join(process.cwd(), "public/data/updates.json");
  const updates: Update[] = JSON.parse(fs.readFileSync(updatesPath, "utf8"));
  const update = updates.find((u) => u.id === id);

  if (!update) notFound();

  if ((update as any).tag === "monthly-payment-schedule") {
    const { redirect } = await import("next/navigation");
    redirect("/payment-calendar");
  }

  const readingTime = Math.ceil(update.content.split(/\s+/).length / 200);

  // Extract TOC (H2s)
  const headings = update.content.match(/^##\s+(.*)$/gm) || [];
  const toc = headings.map(h => h.replace(/^##\s+/, ''));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": update.title,
    "description": update.summary,
    "datePublished": update.date,
    "dateModified": update.date,
    "author": {
      "@type": "Person",
      "name": update.author || "Lucky Cungwa"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SASSA Help Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.sassahelphub.co.za/logo.png"
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.sassahelphub.co.za"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Grant Updates",
        "item": "https://www.sassahelphub.co.za/updates"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": update.title,
        "item": `https://www.sassahelphub.co.za/updates/${update.id}`
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {update.faqs && update.faqs.length > 0 && (
        <JsonLd data={faqPageSchema(update.faqs)} />
      )}
      <Breadcrumbs className="mb-8">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/updates">Grant Updates</BreadcrumbItem>
        <BreadcrumbItem>{update.title}</BreadcrumbItem>
      </Breadcrumbs>

      <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           <header className="space-y-6">
              <Chip color={update.type === "alert" ? "danger" : "primary"} variant="flat" className="font-bold uppercase text-xs">
                  {update.type === "alert" ? "Alert" : update.type === "news" ? "Update" : update.type}
              </Chip>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                 {update.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-gray-100 py-6">
                 <div className="flex items-center gap-3">
                    <Avatar name="SHH" size="sm" className="bg-primary-gold text-primary-black font-bold" />
                    <div>
                       <p className="font-bold text-gray-900">By SASSA Help Hub Team</p>
                       <p className="text-xs">Independent Unofficial Resource</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary-gold" />
                    <span>Published: {new Date(update.date).toLocaleDateString()}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <FaClock className="text-primary-gold" />
                    <span>{readingTime} min read</span>
                 </div>
              </div>
           </header>

           {toc.length > 0 && (
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 p-8 shadow-2xl rounded-[2rem] lg:hidden mb-12">
                <CardBody className="p-0 space-y-6">
                   <p className="font-black text-xl flex items-center gap-3"><FaListUl className="text-primary-gold" /> In this article</p>
                   <div className="flex flex-col gap-4">
                      {toc.map((item, i) => {
                        const id = item.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return (
                          <a key={i} href={`#${id}`} className="text-sm font-bold text-gray-500 hover:text-primary-gold transition-all flex items-center gap-2 group">
                             <span className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-primary-gold group-hover:w-4 transition-all"></span>
                             {item}
                          </a>
                        );
                      })}
                   </div>
                </CardBody>
             </Card>
           )}

           <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-black prose-a:text-primary-gold prose-strong:text-gray-900 dark:prose-strong:text-white leading-relaxed prose-h2:scroll-mt-32">
               <ReactMarkdown rehypePlugins={[rehypeSlug]}>{resolveTemplates(update.content)}</ReactMarkdown>
           </div>

           {update.faqs && update.faqs.length > 0 && (
              <section className="space-y-6 pt-12">
                 <h2 className="text-3xl font-black">Frequently Asked Questions</h2>
                 <Accordion variant="splitted">
                    {update.faqs.map((faq, i) => (
                      <AccordionItem key={i} title={faq.q} className="font-bold">
                         <p className="font-normal text-gray-600 dark:text-gray-400 pb-4">{faq.a}</p>
                      </AccordionItem>
                    ))}
                 </Accordion>
              </section>
           )}

           <Divider className="my-12" />

           <section className="bg-primary-gold/5 p-8 rounded-3xl border border-primary-gold/10 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                 <FaLink className="text-primary-gold" /> Sources & References
              </h3>
              <ul className="space-y-4">
                 <li className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                     <span>SASSA SRD Portal</span>
                    <Button as={NextLink} href="https://srd.sassa.gov.za" target="_blank" size="sm" variant="flat" color="primary">
                       Verify Source <FaExternalLinkAlt className="ml-2 text-xs" />
                    </Button>
                 </li>
                 <li className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <span>Department of Social Development</span>
                    <Button as={NextLink} href="https://www.dsd.gov.za" target="_blank" size="sm" variant="flat" color="primary">
                       Verify Source <FaExternalLinkAlt className="ml-2 text-xs" />
                    </Button>
                 </li>
              </ul>
           </section>

           <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl gap-6">
              <p className="font-bold text-lg">Was this article helpful?</p>
              <div className="flex gap-4">
                 <Button color="success" variant="flat" startContent={<FaThumbsUp />}>Yes, thanks!</Button>
                 <Button color="danger" variant="flat" startContent={<FaThumbsDown />}>Not really</Button>
              </div>
            </div>
         </div>

         <AdNetworkLoader />

         <aside className="lg:col-span-4 space-y-12">
           {toc.length > 0 && (
             <div className="sticky top-24 hidden lg:block space-y-8">
                <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                   <p className="font-black text-2xl mb-8 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primary-gold rounded-full"></span>
                      On this page
                   </p>
                   <div className="flex flex-col gap-6">
                      {toc.map((item, i) => {
                        const id = item.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                        return (
                          <a key={i} href={`#${id}`} className="text-sm font-bold text-gray-500 hover:text-primary-gold transition-all flex items-center gap-3 group">
                             <span className="w-2 h-2 rounded-full border-2 border-gray-200 group-hover:bg-primary-gold group-hover:border-primary-gold transition-all"></span>
                             {item}
                          </a>
                        );
                      })}
                   </div>
                </div>
             </div>
           )}

           <Card className="p-8 bg-primary-black text-white border-none shadow-2xl rounded-[2.5rem] relative overflow-hidden group">
              <CardBody className="p-0 space-y-6">
                 <h3 className="text-2xl font-black text-primary-gold">2026 Alert</h3>
                 <p className="text-sm text-secondary-gray">SASSA has implemented new biometric security measures. Ensure your cellphone number is RICA'd in your name.</p>
                 <Button as={NextLink} href="/guides/biometric-fix-guide" fullWidth color="primary" className="font-bold">
                    Learn More
                 </Button>
              </CardBody>
           </Card>

           <div className="space-y-4">
              <h3 className="text-xl font-bold px-2">Related Articles</h3>
              <div className="space-y-4">
                 {updates.filter(u => u.id !== id).slice(0, 3).map(rel => (
                    <Card key={rel.id} isPressable as={NextLink} href={`/updates/${rel.id}`} className="p-4 border border-gray-100 dark:border-gray-800 hover:border-primary-gold transition-colors">
                       <p className="text-xs font-bold text-primary-gold uppercase mb-2">{rel.type}</p>
                       <p className="font-bold leading-tight">{rel.title}</p>
                       <p className="text-[10px] text-gray-500 mt-2">{new Date(rel.date).toLocaleDateString()}</p>
                    </Card>
                 ))}
              </div>
           </div>
        </aside>
      </article>
    </div>
  );
}
