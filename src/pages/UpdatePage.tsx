import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, AlertTriangle } from "lucide-react";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import AdUnit from "../components/Common/AdUnit";

interface Update {
  id: string;
  title: string;
  summary: string;
  content?: string; // Content is optional
  date: string;
  type: "news" | "alert" | "update";
  urgent: boolean;
}

const UpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [update, setUpdate] = useState<Update | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/68a4a96fd0ea881f405d88f4");
        if (!response.ok) {
          throw new Error("Failed to fetch updates");
        }
        const data = await response.json();
        const updates = data.record || [];
        const foundUpdate = updates.find((u: Update) => u.id === id);

        if (foundUpdate) {
          setUpdate(foundUpdate);
        } else {
          setError("Update not found.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpdate();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
        <Link to="/" className="text-blue-500 mt-4 inline-block">
          Go back to Home
        </Link>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Update not found</h1>
        <Link to="/" className="text-blue-500 mt-4 inline-block">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{update.title} | SASSA News</title>
        <meta name="description" content={update.summary} />
        <meta name="keywords" content={`SASSA, ${update.title}, sassa news, sassa updates`} />
        <link rel="canonical" href={`https://sassahelphub.co.za/updates/${update.id}`} />
        <meta property="og:title" content={`${update.title} | SASSA News`} />
        <meta property="og:description" content={update.summary} />
        <meta property="og:url" content={`https://sassahelphub.co.za/updates/${update.id}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={update.date} />
        <meta property="article:author" content="SASSA Help Hub" />
        <meta property="og:image" content="https://sassahelphub.co.za/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${update.title} | SASSA News`} />
        <meta name="twitter:description" content={update.summary} />
        <meta name="twitter:image" content="https://sassahelphub.co.za/logo.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": update.title,
            "url": `https://sassahelphub.co.za/updates/${update.id}`,
            "datePublished": update.date,
            "description": update.summary,
            "articleBody": update.content,
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
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary-gold hover:text-yellow-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{update.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <time dateTime={update.date}>
                    {new Date(update.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </header>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="font-semibold">{update.summary}</p>
              <AdUnit slot="5678901234" />
              {update.content && <ReactMarkdown>{update.content}</ReactMarkdown>}
              <AdUnit slot="4321098765" />
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
