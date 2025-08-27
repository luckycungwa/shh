import { Phone, Globe, Mail, MessageSquare, Users, Shield } from "lucide-react"

const contactMethods = [
  {
    title: "Toll-Free Helpline",
    description:
      "Call our main support line for general inquiries, application assistance, and grant information. Available Monday to Friday, 8:00 AM to 4:30 PM.",
    details: "0800 60 10 11",
    icon: Phone,
  },
  {
    title: "Official Website",
    description:
      "Access official SASSA services, download forms, check eligibility requirements, and find the latest updates on grants and policies.",
    details: "www.sassa.gov.za",
    icon: Globe,
  },
  {
    title: "SRD Grant Portal",
    description:
      "Dedicated portal for Social Relief of Distress grant applications, status checks, and appeals. Quick and secure online access.",
    details: "srd.sassa.gov.za",
    icon: Globe,
  },
  {
    title: "Email Support",
    description:
      "Send detailed inquiries about your grant application, documentation requirements, or general questions to our support team.",
    details: "grantenquiries@sassa.gov.za",
    icon: Mail,
  },
  {
    title: "WhatsApp Service",
    description:
      "Check your SRD application status, submit applications, and get quick responses through our official WhatsApp service.",
    details: "082 046 8553",
    icon: MessageSquare,
  },
  {
    title: "Social Media Updates",
    description:
      "Follow our official social media channels for the latest announcements, payment dates, and important updates about SASSA services.",
    details: "Facebook & Twitter",
    icon: Users,
  },
]

export default function ContactInformation() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Official SASSA Contact Information</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted contact methods to reach SASSA safely. Avoid scams by using only these official channels for all
            your grant-related inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white border border-black/50 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4  m-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-yellow rounded-lg flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{method.description}</p>
                  <div className="bg-gray-50 px-3 py-2 rounded-lg">
                    <p className="text-yellow-500 font-medium text-sm">{method.details}</p>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl ">
          <div className="flex items-start space-x-3 p-6">
            <Shield className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-500 mb-2">Scam Prevention Warning</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                SASSA will never ask for banking details, OTPs, or payments via SMS, email, or phone calls. Always
                verify information through official channels listed above. Report suspicious activity to our helpline
                immediately.
              </p>
            </div>
          </div>
           <div className="flex overflow-hidden w-full bottom-0 rounded-b-2xl">
                      <div className="flex-1 h-1.5 bg-yellow-600 rounded-bl-lg"></div>
                      <div className="flex-1 h-1.5 bg-red-600"></div>
                      <div className="flex-1 h-1.5 bg-green-600"></div>
                      <div className="flex-1 h-1.5 bg-black/95"></div>
                      <div className="flex-1 h-1.5 bg-blue-600 rounded-br-lg"></div>
                    </div>
        </div>
      </div>
    </section>
  )
}
