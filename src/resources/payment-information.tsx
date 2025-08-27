import { CreditCard, MapPin, AlertTriangle } from "lucide-react"

const paymentSteps = [
  {
    number: 1,
    title: "Choose Payment Method",
    description:
      "Select from bank account transfer, SASSA card, or Cash Send at retail partners like Pick n Pay and Shoprite for convenient access.",
  },
  {
    number: 2,
    title: "Update Banking Details",
    description:
      "Ensure your banking information is current and accurate to prevent payment delays. Update details online or at SASSA offices.",
  },
  {
    number: 3,
    title: "Monitor Payment Dates",
    description:
      "SRD grant payments are announced in batches, while other grants follow monthly schedules. Check official announcements regularly.",
  },
  {
    number: 4,
    title: "Collect Your Payment",
    description:
      "Access your funds through your chosen method. Bank transfers are instant, while cash collection requires valid ID at retail partners.",
  },
  {
    number: 5,
    title: "Verify Payment Receipt",
    description:
      "Confirm payment received and keep records. Report any discrepancies or missing payments to SASSA immediately for resolution.",
  },
]

const paymentMethods = [
  {
    title: "Bank Account Transfer",
    description: "Direct deposit to your bank account - fastest and most secure method",
    icon: CreditCard,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "SASSA Card",
    description: "Official SASSA payment card for ATM withdrawals and purchases",
    icon: CreditCard,
    color: "bg-yellow-100 text-yellow-500",
  },
  {
    title: "Cash Send",
    description: "Collect cash at retail partners nationwide with your ID document",
    icon: MapPin,
    color: "bg-orange-100 text-orange-600",
  },
]

export default function PaymentInformation() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left sidebar with title and description */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Understanding Payment Steps</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Learn how SASSA processes and delivers your grant payments through secure, reliable methods designed for
              your convenience.
            </p>

            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.color}`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{method.title}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side with payment steps */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paymentSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-black/50 ${
                    index === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Payment Information</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• SRD grant payment dates vary and are announced in batches</li>
                    <li>• Other grants follow predictable monthly payment schedules</li>
                    <li>• Always keep your banking details updated to avoid delays</li>
                    <li>• Report missing payments within 30 days for investigation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
