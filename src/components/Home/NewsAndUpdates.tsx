import React from 'react';
import { Rss } from 'lucide-react';

interface NewsAndUpdatesProps {
  content: {
    title: string;
    articles: Array<{
      id: string;
      title:string;
      summary: string;
      date: string;
    }>;
  };
}

const NewsAndUpdates: React.FC<NewsAndUpdatesProps> = ({ content }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.articles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary-gold text-primary-black rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                  <Rss className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <p className="text-gray-500 text-sm">{new Date(article.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsAndUpdates;
