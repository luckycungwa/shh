import type React from "react"
import { CheckCircle, Database, Shield, ThumbsUp } from "lucide-react"

interface HowToApplyProps {
  content: {
    title: string
    intro: string
    steps: Array<{
      id: string
      title: string
      description: string
    }>
    outro: string
  }
}

const HowToApply: React.FC<HowToApplyProps> = ({ content }) => {
 const features = [
  {
    icon: CheckCircle,
    title: "Clear Application Guidance",
    description: "Easily understand the SASSA grant application process with our detailed, step-by-step guides. From preparing documents to submitting your application, we provide clear instructions to help you apply for grants like the SRD R370 or Child Support with confidence."
  },
  {
    icon: Database,
    title: "Flexible Application Options",
    description: "Learn how to apply for SASSA grants in the way that suits you best. Discover how to submit the SRD R370 grant online at srd.sassa.gov.za using your ID and phone, or get guidance on visiting a local SASSA office for in-person applications."
  },
  {
    icon: Shield,
    title: "Trusted Information Source",
    description: "Rely on our accurate, up-to-date information to navigate SASSA grants safely. We provide verified details on eligibility, documents, and processes, ensuring you have trustworthy guidance without any need for personal data collection."
  },
  {
    icon: ThumbsUp,
    title: "All-in-One Resource Hub",
    description: "Find everything you need in one place: eligibility requirements, document checklists, status tracking tips, and appeal guidance. Explore our resources or contact SASSA at 0800 60 10 11 to stay informed throughout your grant application journey."
  }
];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title.replace(
                "How to Apply for SASSA Grants",
                "Hassle-free grant application services for your financial security",
              )}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{content.intro}</p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-96">
              <img
                src="/sassa-office.jpeg"
                alt="A SASSA office with people waiting to be assisted."
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">{content.outro}</p>
        </div>
      </div>
    </section>
  )
}

export default HowToApply
