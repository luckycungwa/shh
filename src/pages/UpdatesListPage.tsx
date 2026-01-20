import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { AlertTriangle, Search } from 'lucide-react';

interface Update {
  id: string;
  title: string;
  summary: string;
  date: string;
  type: "news" | "alert" | "update";
  urgent: boolean;
}

type SortOrder = 'newest' | 'oldest';

const UpdatesListPage: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/68a4a96fd0ea881f405d88f4");
        if (!response.ok) {
          throw new Error("Failed to fetch updates");
        }
        const data = await response.json();
        setUpdates(data.record || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  const filteredAndSortedUpdates = useMemo(() => {
    return updates
      .filter(update =>
        update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.summary.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [updates, searchTerm, sortOrder]);

  return (
    <>
      <Helmet>
        <title>Latest SASSA News and Updates | SASSA Help Hub</title>
        <meta name="description" content="Stay informed with the latest SASSA news, press releases, and important updates for 2026. Get details on grant changes, payment schedules, and application deadlines." />
        <meta name="keywords" content="SASSA news, SASSA updates, SASSA press release, social grant news, SASSA 2026" />
        <link rel="canonical" href="https://sassahelphub.co.za/updates" />
        <meta property="og:title" content="Latest SASSA News and Updates | SASSA Help Hub" />
        <meta property="og:description" content="Stay informed with the latest SASSA news, press releases, and important updates for 2026." />
        <meta property="og:url" content="https://sassahelphub.co.za/updates" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sassahelphub.co.za/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest SASSA News and Updates | SASSA Help Hub" />
        <meta name="twitter:description" content="Stay informed with the latest SASSA news, press releases, and important updates for 2026." />
        <meta name="twitter:image" content="https://sassahelphub.co.za/logo.png" />
        {updates.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "SASSA News and Updates",
              "description": "The latest news and updates from SASSA Help Hub.",
              "url": "https://sassahelphub.co.za/updates",
              "blogPost": updates.map(update => ({
                "@type": "BlogPosting",
                "headline": update.title,
                "url": `https://sassahelphub.co.za/updates/${update.id}`,
                "datePublished": update.date,
                "description": update.summary,
                "author": {
                  "@type": "Organization",
                  "name": "SASSA Help Hub"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "SASSA Help Hub",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://sassahelphub.co.za/logo.png"
                  }
                }
              }))
            })}
          </script>
        )}
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Latest Updates</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Stay informed with all the news and announcements.
            </p>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search updates..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-order" className="text-gray-600 dark:text-gray-400 text-sm">Sort by:</label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value as SortOrder)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold mb-4">Error Loading Updates</h2>
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredAndSortedUpdates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedUpdates.map((update) => (
                <Link to={`/updates/${update.id}`} key={update.id} className="block h-full">
                  <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col hover:shadow-xl transition-shadow duration-200">
                    <div className="flex-grow">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${
                          update.type === "alert"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : update.type === "news"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        }`}
                      >
                        {update.type.toUpperCase()}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{update.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-4">
                        {update.summary}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={update.date}>
                        {new Date(update.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Updates Found</h2>
              <p className="text-gray-600 dark:text-gray-400">
                No updates matched your search criteria. Please try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdatesListPage;
