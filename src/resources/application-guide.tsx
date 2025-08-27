import { FileText, Users, CreditCard, AlertCircle, CheckCircle, Phone } from "lucide-react"

const applicationSteps = [
  {
    number: 1,
    title: "Prepare Required Documents",
    description:
      "Gather your South African ID, proof of income, proof of residence, and grant-specific documents like birth certificates or medical reports.",
    icon: FileText,
  },
  {
    number: 2,
    title: "Choose Application Method",
    description:
      "Apply online for SRD grants at srd.sassa.gov.za or visit your nearest SASSA office for other grants requiring in-person assistance.",
    icon: Users,
  },
  {
    number: 3,
    title: "Complete Application Form",
    description:
      "Fill out all required information accurately. Double-check your ID number, contact details, and income information to avoid rejections.",
    icon: CreditCard,
  },
  {
    number: 4,
    title: "Submit and Get Receipt",
    description:
      "Submit your application and keep your receipt or reference number safe. This is essential for tracking your application status.",
    icon: CheckCircle,
  },
  {
    number: 5,
    title: "Track Your Application",
    description:
      "Monitor your application status online, via WhatsApp, or by calling the helpline. SASSA processes applications within 90 days.",
    icon: AlertCircle,
  },
  {
    number: 6,
    title: "Appeal if Necessary",
    description:
      "If your application is declined, you have 90 days to lodge an appeal through the official appeals portal or at a SASSA office.",
    icon: Phone,
  },
]

export default function ApplicationGuide() {
  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-black/90 to-primary-black/80 text-white rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How SASSA Applications Work</h2>
          <p className="text-yellow-10 max-w-3xl mx-auto text-lg">
            Follow this comprehensive step-by-step process to successfully apply for SASSA grants, from document
            preparation to final approval and payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applicationSteps.map((step, index) => (
            <div
              key={step.number}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <step.icon className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-yellow-10 mb-6 text-lg">
            Need assistance with your application? Our support team is ready to help you through every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Start Application
            </button>
            <button className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
