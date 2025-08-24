import React from 'react';
import { Clock, DollarSign, Lock, Link, Type, MessageSquare } from 'lucide-react';

interface RedFlagsProps {
  content: {
    title: string;
    intro: string;
    flags: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  Clock: <Clock className="w-8 h-8 text-primary-gold" />,
  DollarSign: <DollarSign className="w-8 h-8 text-primary-gold" />,
  Lock: <Lock className="w-8 h-8 text-primary-gold" />,
  Link: <Link className="w-8 h-8 text-primary-gold" />,
  Type: <Type className="w-8 h-8 text-primary-gold" />,
  MessageSquare: <MessageSquare className="w-8 h-8 text-primary-gold" />,
};

const CommonScamRedFlags: React.FC<RedFlagsProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{content.title}</h3>
      <p className="text-gray-600 mb-6">{content.intro}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.flags.map((flag) => (
          <div key={flag.id} className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              {iconMap[flag.icon]}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{flag.title}</h4>
              <p className="text-gray-600">{flag.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonScamRedFlags;
