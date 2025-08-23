import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, MessageCircle, ThumbsUp, Clock, Search, Filter, ExternalLink } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface CommunityPost {
  id: string;
  question: string;
  answer: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  helpful: number;
  tags: string[];
  verified: boolean;
}

const Community: React.FC = () => {
  const { translations } = useAppContext();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'popular'>('helpful');

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      try {
        // Sample community data - in production this would come from community.json
        const samplePosts: CommunityPost[] = [
          {
            id: 'post-001',
            question: 'How long does it take to get approved for Child Support Grant?',
            answer: 'The Child Support Grant application typically takes 30-60 days to process. However, this can vary depending on the completeness of your application and the workload at your local SASSA office. Make sure you have all required documents to avoid delays.',
            category: 'Applications',
            author: 'SASSA Helper',
            date: '2025-01-20',
            likes: 45,
            helpful: 89,
            tags: ['child support', 'application', 'processing time'],
            verified: true
          },
          {
            id: 'post-002',
            question: 'What should I do if my SASSA card is not working at the ATM?',
            answer: 'If your SASSA card is not working, first try a different ATM or retailer. If it still doesn\'t work, contact SASSA immediately at 0800 60 10 11 to report the issue. You may need to visit a SASSA office to get a replacement card. In the meantime, you can collect your grant using your ID document at designated pay points.',
            category: 'Card Issues',
            author: 'Community Moderator',
            date: '2025-01-18',
            likes: 32,
            helpful: 67,
            tags: ['sassa card', 'atm problems', 'card replacement'],
            verified: true
          },
          {
            id: 'post-003',
            question: 'Can I apply for multiple grants at the same time?',
            answer: 'Yes, you can apply for multiple grants if you qualify for them. For example, you can receive Child Support Grants for your children while also receiving an Old Age Grant or Disability Grant for yourself. However, you cannot receive both an Old Age Grant and Disability Grant simultaneously. Each application will be assessed separately.',
            category: 'Eligibility',
            author: 'Sarah M.',
            date: '2025-01-15',
            likes: 28,
            helpful: 54,
            tags: ['multiple grants', 'eligibility', 'applications'],
            verified: false
          },
          {
            id: 'post-004',
            question: 'How do I update my banking details with SASSA?',
            answer: 'To update your banking details, visit your nearest SASSA office with your ID document, a bank confirmation letter (not older than 3 months), and a recent bank statement. Complete the change of payment method form and submit it with your documents. The change typically takes 1-2 months to take effect.',
            category: 'Account Management',
            author: 'John D.',
            date: '2025-01-12',
            likes: 41,
            helpful: 76,
            tags: ['banking details', 'payment method', 'account update'],
            verified: false
          },
          {
            id: 'post-005',
            question: 'What are the income limits for Old Age Grant in 2025?',
            answer: 'For 2025, the income thresholds for Old Age Grant are: Single person - R7,920 per month or less, Married couple - Combined income of R15,840 per month or less. Asset thresholds are R1,227,600 for single persons and R2,455,200 for married couples. These amounts are reviewed annually.',
            category: 'Eligibility',
            author: 'SASSA Helper',
            date: '2025-01-10',
            likes: 56,
            helpful: 92,
            tags: ['old age grant', 'income limits', '2025', 'eligibility'],
            verified: true
          },
          {
            id: 'post-006',
            question: 'How can I check if someone is using my ID for SASSA grants?',
            answer: 'You can check your grant status online at www.sassa.gov.za or SMS your ID number to 32148 (R1 cost). If you suspect fraud, immediately contact SASSA at 0800 60 10 11 and report it to the police. You can also visit a SASSA office with your ID to verify what grants are registered under your name.',
            category: 'Fraud Prevention',
            author: 'Community Moderator',
            date: '2025-01-08',
            likes: 38,
            helpful: 71,
            tags: ['identity theft', 'fraud', 'grant status', 'verification'],
            verified: true
          }
        ];
        
        setPosts(samplePosts);
        setFilteredPosts(samplePosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityPosts();
  }, []);

  useEffect(() => {
    let filtered = [...posts];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.question.toLowerCase().includes(query) ||
        post.answer.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'helpful':
          return b.helpful - a.helpful;
        case 'popular':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory, sortBy]);

  const categories = ['all', ...new Set(posts.map(post => post.category))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading community posts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Community</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>SASSA Community Q&A - Get Help from the Community | SASSA Help Hub</title>
        <meta name="description" content="Join the SASSA community to ask questions, share experiences, and get help from other beneficiaries and experts." />
        <meta name="keywords" content="SASSA community, SASSA questions, SASSA help, SASSA forum, SASSA support" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-black" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Community Q&A
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get help from the community. Browse questions and answers from other SASSA beneficiaries and experts.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">
                {posts.length}
              </div>
              <div className="text-gray-600">Community Posts</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">
                {posts.reduce((sum, post) => sum + post.helpful, 0)}
              </div>
              <div className="text-gray-600">People Helped</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-primary-gold mb-2">
                {posts.filter(post => post.verified).length}
              </div>
              <div className="text-gray-600">Verified Answers</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search community posts..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex items-center justify-center space-x-6 flex-wrap">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
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
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful' | 'popular')}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  <option value="helpful">Most Helpful</option>
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 text-center">
              {filteredPosts.length === 1
                ? '1 post found'
                : `${filteredPosts.length} posts found`}
            </p>
          </div>

          {/* Community Posts */}
          <div className="space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No community posts found matching your criteria.
                </p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        {post.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {post.question}
                    </h3>

                    <div className="prose max-w-none text-gray-700 mb-4">
                      <p>{post.answer}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes} likes
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {post.helpful} found helpful
                        </div>
                        <div>
                          by {post.author}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Social Media Integration */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Join the Conversation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Follow Us on Social Media
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with the latest SASSA news and community discussions.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://twitter.com/sassahelphub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 inline-flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                  <a
                    href="https://facebook.com/sassahelphub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 inline-flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Facebook
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Need Direct Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  For official SASSA assistance, contact them directly.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="tel:0800601011"
                    className="bg-primary-gold text-primary-black px-4 py-2 rounded-lg hover:bg-primary-gold transition-colors duration-200"
                  >
                    Call SASSA
                  </a>
                  <a
                    href="https://www.sassa.gov.za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 inline-flex items-center"
                  >
                    Official Website
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-yellow-500-50 border-l-4 border-yellow-500 rounded-r-lg">
            <p className="text-sm text-yellow-500-800">
              <strong>Community Disclaimer:</strong> Information shared in the community comes from users and may not always be accurate or up-to-date. 
              Always verify important information through official SASSA channels at www.sassa.gov.za or 0800 60 10 11.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;