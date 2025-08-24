import React from 'react';
import { Smartphone, MessageSquare, Globe, Phone, AppWindow } from 'lucide-react';

interface StatusCheckMethodsProps {
  content: {
    title: string;
    intro: string;
    methods: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  online: <Globe className="w-8 h-8" />,
  whatsapp: <MessageSquare className="w-8 h-8" />,
  sms: <Smartphone className="w-8 h-8" />,
  app: <AppWindow className="w-8 h-8" />,
  phone: <Phone className="w-8 h-8" />,
};

const StatusCheckMethods: React.FC<StatusCheckMethodsProps> = ({ content }) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{content.intro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.methods.map((method, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-primary-gold text-primary-black rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                  {iconMap[method.icon]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{method.name}</h3>
              </div>
              <p className="text-gray-600">{method.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatusCheckMethods;
