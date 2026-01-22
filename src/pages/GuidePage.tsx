import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, User, BookOpen, ChevronLeft } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  steps: Array<{
    title: string;
    content: string;
    tips?: string[];
  }>;
  tags: string[];
  lastUpdated: string;
  author: string;
}

const GuidePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/68a5ec9a43b1c97be9237421/latest');
        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }
        const data = await response.json();
        const guides: Guide[] = data.record || [];
        const foundGuide = guides.find(g => g.id === id);
        if (foundGuide) {
          setGuide(foundGuide);
        } else {
          setError('Guide not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading guide..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Guide</h2>
          <p className="text-gray-600">{error}</p>
          <Link to="/guides" className="mt-4 inline-flex items-center text-primary-gold hover:text-primary-gold">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Guides
          </Link>
        </div>
      </div>
    );
  }

  if (!guide) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{guide.title} | SASSA AI Status Update</title>
        <meta name="description" content={guide.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/guides" className="inline-flex items-center text-primary-gold hover:text-primary-gold">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to All Guides
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.title}</h1>
              <p className="text-xl text-gray-600">{guide.description}</p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {guide.estimatedTime}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {guide.author}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {guide.category}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
                  {guide.difficulty}
                </span>
              </div>
            </header>

            <div className="prose max-w-none">
              {guide.steps.map((step, index) => (
                <section key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Step {index + 1}: {step.title}
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: step.content }} />
                  {step.tips && step.tips.length > 0 && (
                    <div className="mt-4 p-4 bg-yellow-500-50 border-l-4 border-yellow-500 rounded-r-lg">
                      <h4 className="font-semibold text-yellow-500-800 mb-2">Tips:</h4>
                      <ul className="list-disc list-inside space-y-1 text-yellow-500-700">
                        {step.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <footer className="mt-8 border-t pt-4">
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Last Updated: {new Date(guide.lastUpdated).toLocaleDateString()}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
