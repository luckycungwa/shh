import { SITE_CONFIG } from "./config";

export interface Breadcrumb {
  name: string;
  slug: string;
}

export function articleSchema(title: string, description: string, slug: string, author: string, datePublished: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_CONFIG.url}${slug}`,
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export function breadcrumbSchema(items: Breadcrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.slug}`,
    })),
  };
}

export function howToSchema(name: string, description: string, steps: { title: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.text,
    })),
  };
}

export function definedTermSchema(term: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description,
    inDefinedTermSet: `${SITE_CONFIG.url}/glossary`,
  };
}

export function governmentOfficeSchema(name: string, address: string, town: string, province: string, code: string, phone: string, hours: string, lat?: number, lng?: number) {
  const geo = lat && lng ? { geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } } : {};
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOffice",
    name,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: town,
      addressRegion: province,
      postalCode: code,
      addressCountry: "ZA",
    },
    telephone: phone,
    openingHours: hours,
    ...geo,
  };
}
