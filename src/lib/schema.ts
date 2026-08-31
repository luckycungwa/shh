import { SITE_CONFIG } from "./config";

export function personSchema(name: string, url: string, jobTitle: string, description: string, sameAs: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    jobTitle,
    description,
    sameAs,
  };
}

export function governmentServiceSchema(name: string, description: string, phone: string, url: string, areaServed: string, serviceType: string) {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name,
    description,
    telephone: phone,
    url,
    areaServed: { "@type": "Country", name: areaServed },
    serviceType,
  };
}

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

export function paymentScheduleSchema(
  schedule: {
    label: string;
    grant: string;
    date: string; // ISO date or TBC
    status: "confirmed" | "projected" | string;
    sourceURL?: string;
  }[]
) {
  const events = schedule
    .filter((s) => s.date && s.date !== "TBC")
    .map((s) => ({
      "@type": "Event",
      name: `${s.grant} — ${s.label} Payment Date`,
      startDate: s.date,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: s.status === "confirmed" ? "https://schema.org/EventScheduled" : "https://schema.org/EventPostponed",
      ...(s.sourceURL ? { url: s.sourceURL, organizer: { "@type": "Organization", name: "SASSA" } } : {}),
    }));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: e,
    })),
  };
}
