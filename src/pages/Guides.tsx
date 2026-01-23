import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, Clock, User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import RejectionMessages from '../components/Home/rejection-messages';
import ProvincialOffices from '../components/Home/provincial-offices';
import AdUnit from '../components/Common/AdUnit';

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
  relatedLinks?: Array<{
    title: string;
    url: string;
    isExternal: boolean;
  }>;
}

const Guides: React.FC = () => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/68a5ec9a43b1c97be9237421/latest');
        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }
        const data = await response.json();
        const allGuides: Guide[] = data.record || [];
        setGuides(allGuides);
        setFilteredGuides(allGuides);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    let filtered = [...guides];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(guide => guide.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(guide => guide.difficulty === selectedDifficulty);
    }

    // Filter by search query
    if (localSearchQuery.trim()) {
      const query = localSearchQuery.toLowerCase();
      filtered = filtered.filter(guide =>
        guide.title.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query) ||
        guide.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredGuides(filtered);
  }, [guides, selectedCategory, selectedDifficulty, localSearchQuery]);

  const categories = ['all', ...new Set(guides.map(guide => guide.category))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-500-100 text-yellow-500-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading guides..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Guides</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>SASSA Guides - Step-by-Step Instructions | SASSA Help Hub</title>
        <meta name="description" content="Comprehensive step-by-step guides for SASSA services. Learn how to apply for grants, avoid scams, and navigate SASSA processes." />
        <meta name="keywords" content="SASSA guides, SASSA application guide, SASSA step by step, SASSA help" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Step-by-Step Guides
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Friendly Guides to help you navigate SASSA services, applications, and processes with confidence.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Search guides..."
                className="w-full px-4 py-3 pl-12 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-gold text-primary-black px-4 py-1.5 rounded-md font-medium hover:bg-primary-gold transition-colors duration-200"
              >
                Search
              </button>
            </form>

            {/* Filters */}
            <div className="flex items-center justify-center space-x-6 flex-wrap">
              <div className="flex items-center space-x-2">
                {/* <Filter className="w-5 h-5 text-gray-500" /> */}
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Difficulty:</span>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <AdUnit slot="4455667788" />

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 text-center">
              {filteredGuides.length === 1
                ? '1 guide found'
                : `${filteredGuides.length} guides found`}
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No guides found matching your criteria.
                </p>
              </div>
            ) : (
              filteredGuides.map((guide) => (
                <Link to={`/guides/${guide.id}`} key={guide.id} className="block">
                  <div
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 h-full"
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                          {guide.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                          {guide.difficulty}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {guide.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {guide.description}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {guide.estimatedTime}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {guide.author}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-xs text-gray-500">
                          Updated {new Date(guide.lastUpdated).toLocaleDateString()}
                        </div>
                        <div className="text-primary-gold hover:text-primary-gold font-medium text-sm">
                          Read Guide →
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1">
                      {guide.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {guide.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{guide.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                </Link>
              ))
            )}
          </div>
          <section>
             {/* REJECTION MESSAGES */}
        <RejectionMessages />
        <ProvincialOffices />
      </section>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Need More Help?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the guide you're looking for? Contact SASSA directly for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0800601011"
                className="bg-primary-gold text-primary-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200"
              >
                Call SASSA: 0800 60 10 11
              </a>
              <a
                href="https://www.sassa.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
              >
                Visit Official Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guides;