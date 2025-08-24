import React from 'react';
import { CheckCircle } from 'lucide-react';

interface HowToApplyProps {
  content: {
    title: string;
    intro: string;
    steps: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    outro: string;
  };
}

const HowToApply: React.FC<HowToApplyProps> = ({ content }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{content.intro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {content.steps.map((step, index) => (
            <div key={step.id} className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary-gold text-primary-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-gray-600">{content.outro}</p>
      </div>
    </section>
  );
};

export default HowToApply;
