import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronDown, ChevronUp, Star, Heart, ExternalLink } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
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

const FAQ: React.FC = () => {
  const { translations, searchQuery, setSearchQuery, favorites, addToFavorites, removeFromFavorites } = useAppContext();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/68a5ea6bd0ea881f405e5846/latest');
        if (!response.ok) throw new Error('Failed to fetch FAQs');
        const jsonResponse = await response.json();
        const data = jsonResponse.record;
        setFaqs(data);
        setFilteredFaqs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setLocalSearchQuery(searchParam);
      setSearchQuery(searchParam);
    }
  }, [setSearchQuery]);

  useEffect(() => {
    let filtered = [...faqs];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (localSearchQuery.trim()) {
      const query = localSearchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredFaqs(filtered);
  }, [faqs, selectedCategory, localSearchQuery]);

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set('search', localSearchQuery);
    window.history.pushState({}, '', url);
    setSearchQuery(localSearchQuery);
  };

  const toggleFavorite = (faqId: string) => {
    if (favorites.includes(faqId)) {
      removeFromFavorites(faqId);
    } else {
      addToFavorites(faqId);
    }
  };

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
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>SASSA Frequently Asked Questions | SASSA Help Hub</title>
        <meta
          name="description"
          content="Find answers to common SASSA questions. Payment dates, grant applications, eligibility requirements, and more. Updated 2025."
        />
        <meta
          name="keywords"
          content="SASSA FAQ, SASSA questions, SASSA grant application, SASSA payment dates, SASSA help"
        />

        {/* Open Graph tags */}
        <meta property="og:title" content="SASSA Frequently Asked Questions | SASSA Help Hub" />
        <meta property="og:description" content="Find answers to common SASSA questions. Payment dates, grant applications, eligibility requirements, and more. Updated 2025." />
        <meta property="og:url" content="https://sassahelphub.co.za/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sassahelphub.co.za/logo.png" />
        <meta property="og:image:alt" content="SASSA Help Hub Logo" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SASSA Frequently Asked Questions | SASSA Help Hub" />
        <meta name="twitter:description" content="Find answers to common SASSA questions. Payment dates, grant applications, eligibility requirements, and more. Updated 2025." />
        <meta name="twitter:image" content="https://sassahelphub.co.za/logo.png" />

        {faqs.length > 0 && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.faqTitle || 'Frequently Asked Questions'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {translations.faqDescription || 'Find answers to the most common questions about SASSA services, payments, and eligibility requirements.'}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder={translations.searchFaqPlaceholder || 'Search FAQs...'}
                className="w-full px-4 py-3 pl-12 pr-16 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-gold text-primary-black px-4 py-1.5 rounded-md font-medium hover:bg-primary-gold transition-colors duration-200"
              >
                {translations.search || 'Search'}
              </button>
            </form>

            {/* Category Filter */}
            <div className="flex items-center justify-center space-x-2 flex-wrap">
              {/* <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 mr-4">
                {translations.filterByCategory || 'Filter by category:'}
              </span> */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary-gold text-primary-black'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {category === 'all' ? translations.allCategories || 'All' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {filteredFaqs.length === 1
                ? translations.oneResultFound || '1 result found'
                : translations.resultsFound?.replace('{count}', filteredFaqs.length.toString()) || `${filteredFaqs.length} results found`}
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {translations.noFaqsFound || 'No FAQs found matching your search criteria.'}
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                    aria-expanded={expandedItems.has(faq.id)}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {faq.helpful} helpful
                        </span>
                        <span>
                          Updated {new Date(faq.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(faq.id);
                        }}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          favorites.includes(faq.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                        aria-label={favorites.includes(faq.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(faq.id) ? 'fill-current' : ''}`} />
                      </button>
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {expandedItems.has(faq.id) && (
                    <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                      <div className="pt-4">
                        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                          <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </div>

                        {/* Tags */}
                        {faq.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {faq.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Related Links */}
                        {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                              {translations.relatedLinks || 'Related Links:'}
                            </h4>
                            <ul className="space-y-1">
                              {faq.relatedLinks.map((link, index) => (
                                <li key={index}>
                                  <a
                                    href={link.url}
                                    target={link.isExternal ? '_blank' : '_self'}
                                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                                    className="text-primary-gold hover:text-primary-gold text-sm inline-flex items-center"
                                  >
                                    {link.title}
                                    {link.isExternal && <ExternalLink className="w-3 h-3 ml-1" />}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {translations.stillNeedHelp || "Still need help?"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {translations.contactSassaDirectly || "Contact SASSA directly for personalized assistance."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0800601011"
                className="bg-primary-gold text-primary-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200"
              >
                {translations.callSassaHelpline || "Call SASSA: 0800 60 10 11"}
              </a>
              <a
                href="https://www.sassa.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 inline-flex items-center"
              >
                {translations.visitOfficialWebsite || "Visit Official Website"}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;