import React, { useEffect, useState } from 'react';
import StatusCheckMethods from './StatusCheckMethods';
import HowToApply from './HowToApply';
import NewsAndUpdates from './NewsAndUpdates';

interface Grant {
  name: string;
  description: string;
  link: string;
}

interface Step {
  title: string;
  description: string;
}

interface Method {
  name: string;
  description: string;
  link: string;
}

interface Article {
  title: string;
  summary: string;
  link: string;
}

interface Content {
  grantTypes: { title: string; intro: string; grants: Grant[]; outro: string };
  howToApply: { title: string; intro: string; steps: Step[]; outro: string };
  statusCheckMethods: { title: string; intro: string; methods: Method[]; outro: string };
  latestNews: { title: string; articles: Article[]; outro: string };
}

const ContentComponent: React.FC = () => {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/data/expanded-content.json');
        if (!response.ok) throw new Error('Failed to fetch content');
        const data: Content = await response.json();
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) return <p>Loading content...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content?.grantTypes.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content?.grantTypes.intro || '' }} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content?.grantTypes.grants.map((grant, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{grant.name}</h3>
                <div dangerouslySetInnerHTML={{ __html: grant.description }} />
                <a href={grant.link} className="text-primary-gold hover:underline">Learn More</a>
              </div>
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: content?.grantTypes.outro || '' }} />
        </div>
      </section>
      <HowToApply content={content?.howToApply} />
      <StatusCheckMethods content={content?.statusCheckMethods} />
      <NewsAndUpdates content={content?.latestNews} />
    </div>
  );
};

export default ContentComponent;