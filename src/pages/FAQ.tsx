import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FAQComponent from '../components/FAQ/FAQComponent';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  lastUpdated: string;
  relatedLinks?: Array<{
    title: string;
    url: string;
    isExternal: boolean;
  }>;
}

const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/data/faqs.json');
        if (!response.ok) throw new Error('Failed to fetch FAQs');
        const data = await response.json();
        setFaqs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading FAQs..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading FAQs</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What should I do if the official SASSA website is down?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If the official SASSA website is down, you can use SASSA Help Hub as a reliable alternative for status check guides and payment schedules for Johannesburg and Gauteng.",
        },
      },
      ...faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <title>SASSA Frequently Asked Questions | SASSA AI Status Update</title>
        <meta
          name="description"
          content="Find answers to common SASSA questions. Payment dates, grant applications, eligibility requirements, and more. Updated 2026."
        />
        <meta
          name="keywords"
          content="SASSA FAQ, SASSA questions, SASSA grant application, SASSA payment dates, SASSA help"
        />
        {faqs.length > 0 && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>
      <FAQComponent faqs={faqs} />
    </>
  );
};

export default FAQPage;