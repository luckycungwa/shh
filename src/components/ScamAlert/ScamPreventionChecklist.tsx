import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface ChecklistProps {
  content: {
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

const ScamPreventionChecklist: React.FC<ChecklistProps> = ({ content }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    content.items.reduce((acc, item) => {
      acc[item.id] = item.isInitiallyChecked;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const handleCheckboxChange = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{content.title}</h3>
      <p className="text-gray-600 mb-6">{content.intro}</p>
      <div className="space-y-4">
        {content.items.map((item) => (
          <div key={item.id} className="flex items-start">
            <input
              type="checkbox"
              id={item.id}
              checked={checkedItems[item.id]}
              onChange={() => handleCheckboxChange(item.id)}
              className="h-6 w-6 rounded border-gray-300 text-primary-gold focus:ring-primary-gold"
            />
            <div className="ml-3 text-sm">
              <label htmlFor={item.id} className="font-medium text-gray-700">
                {item.text}
              </label>
              {item.link && (
                <span className="ml-2">
                  {item.link.isExternal ? (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-gold hover:text-primary-gold font-medium inline-flex items-center"
                    >
                      {item.link.text}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  ) : (
                    <RouterLink
                      to={item.link.url}
                      className="text-primary-gold hover:text-primary-gold font-medium"
                    >
                      {item.link.text}
                    </RouterLink>
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScamPreventionChecklist;
