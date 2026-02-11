
import { DollarSign, Users, Heart, Baby, Home, Shield, Award, Plus } from "lucide-react"
import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

interface Grant {
  name: string
  description: string
  link: string
}

interface GrantTypesProps {
  grantTypes: {
    title: string
    intro: string
    grants: Grant[]
    outro: string
  }
}

const grantIcons = [
  { icon: DollarSign, color: "text-yellow-500" },
  { icon: Users, color: "text-yellow-500" },
  { icon: Heart, color: "text-yellow-500" },
  { icon: Baby, color: "text-yellow-500" },
  { icon: Home, color: "text-yellow-500" },
  { icon: Shield, color: "text-yellow-500" },
  { icon: Award, color: "text-yellow-500" },
  { icon: Plus, color: "text-yellow-500" },
]

export default function GrantTypes({ grantTypes }: GrantTypesProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">SASSA Grants</h2>
          <div className="text-gray-600 max-w-4xl mx-auto text-lg prose prose-lg dark:prose-invert">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => {
                  if (href?.startsWith("/")) {
                    return <Link to={href} className="text-primary-gold hover:underline">{children}</Link>
                  }
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-gold hover:underline">
                      {children}
                    </a>
                  )
                },
              }}
            >
              {grantTypes.intro}
            </ReactMarkdown>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {grantTypes.grants.map((grant, index) => {
            const IconComponent = grantIcons[index]?.icon || DollarSign
            const iconColor = grantIcons[index]?.color || "primary-gold"

            // Extract a shorter description (first sentence or first 120 characters)
            const shortDescription =
              grant.description.split(".")[0] + "." || grant.description.substring(0, 120) + "..."

            return (
              <Link
              // link to guide pages
              to="/guides"
                key={index}
                // onclick navigate to guides page
                className="bg-white border hover:shadow-md transition-shadow duration-300 border-gray-500 border-1 rounded-lg flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <IconComponent className={`w-8 h-8 ${iconColor}`} />
                     <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-3 leading-tight">
                    {grant.name.replace(/\s*$$[^)]*$$/g, "")} {/* Remove parenthetical text for cleaner titles */}
                  </h3>
                  </div>
                 
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {shortDescription.replace(/\*\*/g, "").substring(0, 150)}...
                  </p>
                </div>
                {/* Bottom color bar */}
  <div className="flex overflow-hidden w-full bottom-0">
    <div className="flex-1 h-1.5 bg-yellow-600 rounded-bl-lg"></div>
    <div className="flex-1 h-1.5 bg-red-600"></div>
    <div className="flex-1 h-1.5 bg-green-600"></div>
    <div className="flex-1 h-1.5 bg-black/95"></div>
    <div className="flex-1 h-1.5 bg-blue-600 rounded-br-lg"></div>
  </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
