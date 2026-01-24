import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, AlertTriangle, Search, Phone, Mail, MessageSquare, ExternalLink, Eye, EyeOff } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import CommonScamRedFlags from '../components/ScamAlert/CommonScamRedFlags';
import ScamPreventionChecklist from '../components/ScamAlert/ScamPreventionChecklist';
import AdUnit from '../components/Common/AdUnit';

interface Scam {
  id: string;
  title: string;
  description: string;
  type: 'SMS' | 'Email' | 'Phone' | 'In-Person' | 'Website';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportedDate: string;
  indicators: string[];
  prevention: string;
  examples?: string[];
}

interface ScamPreventionData {
  redFlags: {
    title: string;
    intro: string;
    flags: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  checklist: {
    title: string;
    intro: string;
    items: Array<{
      id: string;
      text: string;
      isInitiallyChecked: boolean;
      link?: {
        text: string;
        url: string;
        isExternal: boolean;
      };
    }>;
  };
}

const ScamAlert: React.FC = () => {
  const [scams, setScams] = useState<Scam[]>([]);
  const [scamPreventionData, setScamPreventionData] = useState<ScamPreventionData | null>(null);
  const [filteredScams, setFilteredScams] = useState<Scam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [scamCheckerText, setScamCheckerText] = useState('');
  const [scamCheckResult, setScamCheckResult] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showScamChecker, setShowScamChecker] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scamsResponse, scamPreventionResponse] = await Promise.all([
          fetch('/data/scams.json').then(res => res.ok ? res.json() : Promise.resolve([])),
          fetch('/data/scamPrevention.json').then(res => res.ok ? res.json() : Promise.resolve(null))
        ]);

        const allScams: Scam[] = scamsResponse || [];

        setScams(allScams);
        setFilteredScams(allScams);
        setScamPreventionData(scamPreventionResponse);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...scams];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(scam =>
        scam.title.toLowerCase().includes(query) ||
        scam.description.toLowerCase().includes(query) ||
        scam.indicators.some(indicator => indicator.toLowerCase().includes(query))
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(scam => scam.type === selectedType);
    }

    // Filter by severity
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(scam => scam.severity === selectedSeverity);
    }

    setFilteredScams(filtered);
  }, [scams, searchQuery, selectedType, selectedSeverity]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-500-100 text-yellow-500-800 border-yellow-500-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SMS': return <MessageSquare className="w-4 h-4" />;
      case 'Email': return <Mail className="w-4 h-4" />;
      case 'Phone': return <Phone className="w-4 h-4" />;
      case 'Website': return <ExternalLink className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const checkForScam = async () => {
    if (!scamCheckerText.trim()) return;

    setIsChecking(true);
    setScamCheckResult(null);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    const text = scamCheckerText.toLowerCase();
    let riskLevel = 'low';
    const warnings: string[] = [];

    // Check for common scam indicators
    if (text.includes('banking details') || text.includes('bank details')) {
      riskLevel = 'high';
      warnings.push('Requests banking information');
    }
    if (text.includes('urgent') || text.includes('immediately')) {
      riskLevel = riskLevel === 'low' ? 'medium' : 'high';
      warnings.push('Creates false urgency');
    }
    if (text.includes('pay') || text.includes('fee') || text.includes('cost')) {
      riskLevel = 'high';
      warnings.push('Requests payment');
    }
    if (text.includes('suspended') || text.includes('cancelled')) {
      riskLevel = riskLevel === 'low' ? 'medium' : 'high';
      warnings.push('Threatens service suspension');
    }

    let result = '';
    if (riskLevel === 'high') {
      result = `🚨 HIGH RISK: This message shows multiple scam indicators. Do not respond or provide any information. ${warnings.join(', ')}.`;
    } else if (riskLevel === 'medium') {
      result = `⚠️ MEDIUM RISK: This message has some concerning elements. Verify through official SASSA channels before taking action. ${warnings.join(', ')}.`;
    } else {
      result = `✅ LOW RISK: This message appears to be legitimate, but always verify important SASSA communications through official channels.`;
    }

    setScamCheckResult(result);
    setIsChecking(false);
  };

  const types = ['all', ...new Set(scams.map(scam => scam.type))];
  const severities = ['all', 'low', 'medium', 'high', 'critical'];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading scam alerts..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Scam Alerts</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>SASSA Scam Alert - Protect Yourself from Fraud | SASSA Help Hub</title>
        <meta name="description" content="Stay protected from SASSA scams and fraud. Learn to identify fake officials, SMS scams, and fraudulent websites targeting SASSA beneficiaries." />
        <meta name="keywords" content="SASSA scams, SASSA fraud, avoid SASSA scams, fake SASSA officials, SASSA SMS scam" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SASSA Scam Alert Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect yourself from SASSA-related scams and fraud. Learn to identify threats and report suspicious activity.
            </p>
          </div>

          {/* Scam Prevention Hub */}
          {scamPreventionData && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 space-y-8">
              <CommonScamRedFlags content={scamPreventionData.redFlags} />
              <ScamPreventionChecklist content={scamPreventionData.checklist} />
            </div>
          )}

          {/* Scam Checker Tool */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                {/* <Shield className="w-6 h-6 mr-2 text-primary-gold" /> */}
                Scam Checker Tool
              </h2>
              <button
                onClick={() => setShowScamChecker(!showScamChecker)}
                className="flex items-center text-primary-gold hover:text-primary-gold"
              >
                {showScamChecker ? <EyeOff className="w-5 h-5 mr-1" /> : <Eye className="w-5 h-5 mr-1" />}
                {showScamChecker ? 'Hide' : 'Show'} Checker
              </button>
            </div>
            
            {showScamChecker && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Copy & paste the suspicious message and we'll analyze & verify it for you.
                </p>
                <textarea
                  value={scamCheckerText}
                  onChange={(e) => setScamCheckerText(e.target.value)}
                  placeholder="Paste the suspicious SMS, email, or message here..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent resize-none"
                />
                <div className="flex justify-between items-center">
                  <button
                    onClick={checkForScam}
                    disabled={!scamCheckerText.trim() || isChecking}
                    className="bg-primary-gold text-primary-black px-6 py-2 rounded-lg font-medium hover:bg-primary-gold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isChecking ? 'Analyzing...' : 'Check for Scam'}
                  </button>
                  <button
                    onClick={() => {
                      setScamCheckerText('');
                      setScamCheckResult(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
                
                {scamCheckResult && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-gold">
                    <h4 className="font-semibold mb-2">Analysis Result:</h4>
                    <p className="text-sm">{scamCheckResult}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <AdUnit slot="6677889900" />

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scam alerts..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex items-center justify-center space-x-6 flex-wrap">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Severity:</span>
                <select
                  value={selectedSeverity}
                  onChange={(e) => setSelectedSeverity(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
                >
                  {severities.map((severity) => (
                    <option key={severity} value={severity}>
                      {severity === 'all' ? 'All Severities' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Scam Alerts */}
          <div className="space-y-6">
            {filteredScams.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No scam alerts found matching your criteria.
                </p>
              </div>
            ) : (
              filteredScams.map((scam) => (
                <div
                  key={scam.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(scam.type)}
                          <span className="text-sm font-medium text-gray-600">{scam.type}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(scam.severity)}`}>
                          {scam.severity.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(scam.reportedDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {scam.title}
                    </h3>

                    <p className="text-gray-700 mb-4">
                      {scam.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Warning Signs:</h4>
                        <ul className="space-y-1">
                          {scam.indicators.map((indicator, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <AlertTriangle className="w-3 h-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              {indicator}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">How to Protect Yourself:</h4>
                        <p className="text-sm text-gray-600">{scam.prevention}</p>
                      </div>
                    </div>

                    {scam.examples && scam.examples.length > 0 && (
                      <div className="mt-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-semibold text-red-900 mb-2">Example Messages:</h4>
                        <div className="space-y-2">
                          {scam.examples.map((example, index) => (
                            <p key={index} className="text-sm text-red-800 italic">
                              "{example}"
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Report Scam CTA */}
          <div className="mt-12 bg-primary-dark text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Encountered a New Scam?
            </h2>
            <p className="text-gray-300 mb-6">
              Help protect the community by reporting suspicious activity to SASSA and local authorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0800601011"
                className="bg-primary-gold text-primary-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200"
              >
                Report to SASSA: 0800 60 10 11
              </a>
              <a
                href="mailto:fraud@sassa.gov.za"
                className="border border-gray-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition-colors duration-200"
              >
                Email: fraud@sassa.gov.za
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScamAlert;