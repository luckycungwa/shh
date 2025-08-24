import React, { useState } from 'react';
import { AlertTriangle, X, ExternalLink } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const Disclaimer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { translations } = useAppContext();

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-500 text-primary-black py-2 px-4 relative" role="banner" aria-label="Important disclaimer">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-1">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <div className="text-xs text-center font-medium">
            <span className="block sm:inline">
              {translations.disclaimer || 'This is an independent resource and is not affiliated with the SASSA. '}
            </span>
            <span className="block sm:inline sm:ml-2">
              {translations.disclaimerAction || 'Always verify with official SASSA on'}{' '}
              <a
                href="https://www.sassa.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold hover:no-underline inline-flex items-center"
                aria-label="Visit official SASSA website (opens in new tab)"
              >
                www.sassa.gov.za
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              {' '}or call{' '}
              <a
                href="tel:0800601011"
                className="underline font-semibold hover:no-underline"
                aria-label="Call SASSA helpline"
              >
                0800 60 10 11
              </a>.
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors duration-200"
          aria-label="Close disclaimer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;