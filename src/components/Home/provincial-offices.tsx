import { MapPin, Phone, Clock } from "lucide-react"
import { Link } from "react-router-dom"

const provincialOffices = [
  {
    province: "Western Cape",
    address: "7th Floor, 4 Dorp Street, Cape Town, 8001",
    phone: "021 469 4000",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-pink-100",
    features: ["Online Applications", "Document Verification", "Status Inquiries", "Appeal Submissions"],
  },
  {
    province: "Gauteng",
    address: "SASSA House, 501 Prodinsa Building, Pretoria, 0002",
    phone: "012 400 2000",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-green-100",
    features: ["Bulk Processing", "Corporate Services", "Training Programs", "System Support"],
  },
  {
    province: "KwaZulu-Natal",
    address: "Anton Lembede Street, Durban, 4001",
    phone: "031 308 7500",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-purple-100",
    features: ["Rural Outreach", "Mobile Services", "Community Programs", "Beneficiary Support"],
  },
  {
    province: "Eastern Cape",
    address: "Bisho Government Complex, Bisho, 5605",
    phone: "040 609 4000",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-blue-100",
    features: ["Remote Area Coverage", "Traditional Authority Liaison", "Disability Services", "Elder Care Programs"],
  },
  {
    province: "Limpopo",
    address: "36 Hans van Rensburg Street, Polokwane, 0699",
    phone: "015 230 4000",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-yellow-100",
    features: ["Multi-language Support", "Agricultural Worker Programs", "Seasonal Services", "Border Area Support"],
  },
  {
    province: "Mpumalanga",
    address: "Government Boulevard, Riverside Park, Nelspruit, 1200",
    phone: "013 766 8400",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-cyan-100",
    features: ["Mining Community Support", "Cross-border Services", "Emergency Assistance", "Youth Programs"],
  },
  {
    province: "North West",
    address: "Mmabatho Government Complex, Mafikeng, 2735",
    phone: "018 397 1500",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-orange-100",
    features: ["Platinum Belt Services", "Agricultural Support", "Migrant Worker Programs", "Family Services"],
  },
  {
    province: "Free State",
    address: "Bram Fischer Building, Bloemfontein, 9300",
    phone: "051 505 3000",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-indigo-100",
    features: ["Central Processing Hub", "Quality Assurance", "Training Center", "Research Programs"],
  },
  {
    province: "Northern Cape",
    address: "Sol Plaatje House, Kimberley, 8300",
    phone: "053 830 9800",
    hours: "Mon-Fri: 8:00-16:30",
    color: "bg-rose-100",
    features: ["Desert Region Coverage", "Mining Town Services", "Extended Hours", "Satellite Offices"],
  },
]

export default function ProvincialOffices() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">SASSA Offices Nationwide</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Find your nearest SASSA provincial head office for comprehensive grant services, support, and assistance
          across all nine provinces of South Africa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {provincialOffices.map((office) => (
          <div
            key={office.province}
            className={`${office.color} rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 justify-between`}
          >
            <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{office.province}</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700">{office.address}</p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">{office.phone}</p>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <p className="text-sm text-gray-700">{office.hours}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                {/* <Users className="w-4 h-4" /> */}
                Services Available
              </h4>
              <ul className="space-y-1">
                {office.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-gray-700 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <a href="https://www.sassa.gov.za/SitePages/Head-Office-and-Regional-Contacts.aspx" target="_blank" rel="noopener noreferrer" className="w-full flex text-center px-2 py-2 items-center justify-center mb-4 bg-black/90 hover:bg-gray-800 text-white rounded-lg">Contact Office</a>
            </div>
             <div className="flex overflow-hidden w-full bottom-0 rounded-b-2xl">
                      <div className="flex-1 h-1.5 bg-yellow-600 rounded-bl-lg"></div>
                      <div className="flex-1 h-1.5 bg-red-600"></div>
                      <div className="flex-1 h-1.5 bg-green-600"></div>
                      <div className="flex-1 h-1.5 bg-black/95"></div>
                      <div className="flex-1 h-1.5 bg-blue-600 rounded-br-lg"></div>
                    </div>
          </div>
        ))}
      </div>
    </section>
  )
}
