"use client"

import type React from "react"
import { useState } from "react"
import { CheckCircle, Clock, AlertTriangle, XCircle, CreditCard, User, Info } from "lucide-react"
import { Link } from "react-router-dom"

interface SrdStatus {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  phoneMessage: {
    title: string
    details: string
    code: string
  }
}

const srdStatuses: SrdStatus[] = [
  {
    id: "approved",
    title: "Approved",
    description:
      "Your SASSA SRD R370 grant application is approved. A specific payment date will be assigned and will appear on your status check. Payments are typically processed in batches towards the end of the month.",
    icon: <CheckCircle className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Approved",
      details: "Your SRD R370 grant is approved. Check your status regularly for your payment date. Ensure banking details are updated. Ref: APP123456.",
      code: "APP001",
    },
  },
  {
    id: "approved-no-date",
    title: "Approved - No Payment Date",
    description:
      "Your SASSA SRD R370 grant is approved, but no payment date is scheduled yet. This is common and may be due to pending banking verification or system processing delays. The payment date will appear on your status check once it is assigned.",
    icon: <Info className="w-6 h-6" />,
    phoneMessage: {
      title: "Approved - Action Required",
      details: "SRD R370 grant approved, but payment not scheduled. A payment date will be assigned soon. Check your status again later. Ref: APP002.",
      code: "APP002",
    },
  },
  {
    id: "pending",
    title: "Pending",
    description:
      "Your SASSA SRD R370 application is under review. This process can take time as SASSA verifies your details with institutions like Home Affairs and banks to check eligibility. Check your status regularly for updates.",
    icon: <Clock className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Pending",
      details: "Your SRD R370 grant is under review. Check status on the official SASSA website. Update banking details if requested. Ref: PEN001.",
      code: "PEN001",
    },
  },
  {
    id: "declined-income",
    title: "Declined - Income Threshold",
    description:
      "Your SASSA SRD R370 grant was declined because your income or other financial resources exceed the current monthly threshold. You can appeal this decision online within 30 days if you believe it is incorrect.",
    icon: <CreditCard className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Declined",
      details: "SRD R370 grant declined due to income exceeding the threshold. You have 30 days to appeal online. Ref: DEC001.",
      code: "DEC001",
    },
  },
  {
    id: "declined-identity",
    title: "Declined - Identity Verification",
    description:
      "Your SASSA SRD R370 grant was declined because your identity could not be verified with Home Affairs. Visit a SASSA office with your ID or appeal online within 30 days.",
    icon: <User className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Declined",
      details: "SRD R370 grant declined due to identity verification failure. Visit a SASSA office with ID or appeal online. Ref: DEC002.",
      code: "DEC002",
    },
  },
  {
    id: "declined-existing",
    title: "Declined - Existing Grant",
    description:
      "Your SASSA SRD R370 grant was declined because you are receiving another social grant (like a Child Support or Old Age grant), or benefits from UIF or NSFAS. You are not eligible for the SRD grant if you receive other social assistance.",
    icon: <AlertTriangle className="w-6 h-6" />,
    phoneMessage: {
      title: "Application Declined",
      details: "Ineligible for SRD R370 due to existing SASSA grant/UIF/NSFAS. Contact SASSA for details. Ref: DEC003.",
      code: "DEC003",
    },
  },
  {
    id: "cancelled",
    title: "Cancelled",
    description:
      "Your SASSA SRD R370 grant was cancelled. This can happen if you have not collected payments, there has been a change in your circumstances, or due to a fraudulent claim. Reapply online if you are still eligible.",
    icon: <XCircle className="w-6 h-6" />,
    phoneMessage: {
      title: "Grant Cancelled",
      details: "SRD R370 grant cancelled. Reapply online if you are still eligible. Ref: CAN001.",
      code: "CAN001",
    },
  },
];

export default function SrdStatusMessages() {
  const [selectedStatus, setSelectedStatus] = useState<SrdStatus>(srdStatuses[0])

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Understanding SASSA SRD R370 Status Messages</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Learn about common SASSA SRD status check results for your R370 grant application. Stay informed on approval, payments, and what to do if declined.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side status messages */}
          <div className="space-y-4">
            {srdStatuses.slice(0, 3).map((status) => (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(status)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedStatus.id === status.id
                    ? "bg-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-900 hover:bg-yellow-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${selectedStatus.id === status.id ? "bg-yellow-500" : "bg-yellow-300"}`}>
                    {status.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{status.title}</h3>
                    <p className={`text-sm ${selectedStatus.id === status.id ? "text-yellow-100" : "text-gray-600"}`}>
                      {status.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 flex h-[600px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                <div className="w-full h-full bg-gray-800 rounded-[2.5rem] p-4 flex flex-col">
                  {/* Phone header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm">SASSA SRD Portal</div>
                  </div>

                  {/* Phone content */}
                  <div className="flex-1 bg-white rounded-2xl flex flex-col">
                    <div className="p-4 flex flex-col">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {selectedStatus.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedStatus.phoneMessage.title}</h3>
                        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                          Code: {selectedStatus.phoneMessage.code}
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-gray-700 text-center leading-relaxed">{selectedStatus.phoneMessage.details}</p>
                      </div>

                      <div className="mt-6 space-y-3">
                        {/* navigate to calender controls */}
                        <Link to="/payment-calendar">
                          <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-medium mb-3">
                            Check Payment Dates
                          </button>
                        </Link>
                        <Link to="https://srd.sassa.gov.za/appeals/appeal" >
                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium">
                          Appeal Decision
                        </button>
                      </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex overflow-hidden w-full bottom-0 rounded-full mt-1">
                    <div className="flex-1 h-1.5 bg-yellow-600"></div>
                    <div className="flex-1 h-1.5 bg-red-600"></div>
                    <div className="flex-1 h-1.5 bg-green-600"></div>
                    <div className="flex-1 h-1.5 bg-black/95"></div>
                    <div className="flex-1 h-1.5 bg-blue-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side status messages */}
          <div className="space-y-4">
            {srdStatuses.slice(3, 6).map((status) => (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(status)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedStatus.id === status.id
                    ? "bg-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-900 hover:bg-yellow-50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${selectedStatus.id === status.id ? "bg-yellow-500" : "bg-yellow-100"}`}>
                    {status.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{status.title}</h3>
                    <p className={`text-sm ${selectedStatus.id === status.id ? "text-yellow-100" : "text-gray-600"}`}>
                      {status.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need help with your SASSA SRD R370 grant status? Contact SASSA support for assistance.</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Call 0800 60 10 11
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Find SASSA Offices
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
