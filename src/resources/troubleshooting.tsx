import { AlertCircle, FileX, CreditCard, Clock, Phone, HelpCircle } from "lucide-react"

const commonProblems = [
  {
    question: "Why is my status 'Approved - No Payment Date'?",
    answer:
      "This means your application has been approved but payment processing is still pending. SASSA releases payments in batches, so monitor official announcements for your payment date. This status is common and doesn't indicate any issues with your application.",
    icon: Clock,
  },
  {
    question: "Why was my SRD application declined?",
    answer:
      "Common reasons include income above R350 threshold, missing documents, failed identity verification, or duplicate applications. Check your rejection reason online and ensure you meet all eligibility criteria before reapplying or lodging an appeal.",
    icon: FileX,
  },
  {
    question: "How do I update my banking details?",
    answer:
      "Update banking details online through the SASSA portal, via WhatsApp (082 046 8553), or visit your nearest SASSA office with your ID and recent bank statement. Changes may take 1-2 payment cycles to take effect.",
    icon: CreditCard,
  },
  {
    question: "What should I do if my grant is suspended?",
    answer:
      "Contact SASSA immediately at 0800 60 10 11 to understand the suspension reason. Common causes include failed means tests, missing documentation, or administrative reviews. Provide requested information promptly to restore your grant.",
    icon: AlertCircle,
  },
  {
    question: "How do I report fraud or corruption?",
    answer:
      "Report fraud through the SASSA anti-fraud hotline, email fraud@sassa.gov.za, or visit your nearest office. Provide detailed information including names, dates, and evidence. All reports are treated confidentially and investigated thoroughly.",
    icon: Phone,
  },
  {
    question: "What if I lost my SASSA card?",
    answer:
      "Report the lost card immediately to SASSA and your bank to prevent unauthorized use. Visit a SASSA office with your ID to apply for a replacement card. There may be a small fee for card replacement, and processing takes 7-10 working days.",
    icon: HelpCircle,
  },
]

export default function Troubleshooting() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Problems & Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find quick solutions to the most frequently encountered issues with SASSA grants and applications. Get the
            help you need to resolve problems efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commonProblems.map((problem, index) => (
            <div
              key={index}
              className="bg-white border border-black/50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <problem.icon className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{problem.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{problem.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl  text-center">
          <div className="m-8">
          <h3 className="text-2xl font-bold text-yellow-900 mb-4">Still Need Help?</h3>
          <p className="text-yellow-700 mb-6 max-w-2xl mx-auto">
            If you can't find the solution to your problem above, our support team is available to provide personalized
            assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Call 0800 60 10 11
            </button>
            <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Find SASSA Office
            </button>
            <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
              WhatsApp Support
            </button>
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
