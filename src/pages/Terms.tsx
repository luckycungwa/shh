import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, AlertTriangle, Shield, Scale, ExternalLink } from 'lucide-react';

const Terms: React.FC = () => {
  const lastUpdated = '2024-01-15';

  return (
    <>
      <Helmet>
        <title>Terms of Service - SASSA Help Hub</title>
        <meta name="description" content="Terms of Service for SASSA Help Hub. Learn about our user agreement and service conditions." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <FileText className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-gray-600">
                Last updated: {new Date(lastUpdated).toLocaleDateString()}
              </p>
            </div>

            <div className="prose max-w-none">
              <section className="mb-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-red-800 font-semibold text-lg mb-2">Important Disclaimer</h3>
                      <p className="text-red-700">
                        <strong>SASSA Help Hub is an independent resource.</strong> We are not affiliated with, 
                        endorsed by, or officially connected to the South African Social Security Agency (SASSA), 
                        the South African Government, or any government department. 
                        Always verify information through official SASSA channels.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using SASSA Help Hub ("the Website", "our Service"), you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our website.
                </p>
                <p className="text-gray-700">
                  These terms apply to all visitors, users, and others who access or use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-primary-gold" />
                  2. Service Description
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">What We Provide:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Unofficial information and resources related to SASSA services</li>
                    <li>Payment calendar information compiled from official sources</li>
                    <li>Scam awareness and protection information</li>
                    <li>Community support and frequently asked questions</li>
                    <li>Directory of SASSA office locations</li>
                    <li>Educational content about social security benefits</li>
                  </ul>

                  <h3 className="font-semibold mb-3">What We Do NOT Provide:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Official SASSA services or government services</li>
                    <li>Grant application processing or status updates</li>
                    <li>Legal advice or official legal representation</li>
                    <li>Guaranteed or certified information</li>
                    <li>Direct access to SASSA systems or databases</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Information Verification</h3>
                    <p className="text-blue-800 text-sm">
                      You must verify all information through official SASSA channels before taking any action. 
                      We strongly recommend contacting SASSA directly at 0800 60 10 11 or visiting www.sassa.gov.za.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Appropriate Use</h3>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Use the website for informational purposes only</li>
                      <li>• Respect other users in community discussions</li>
                      <li>• Do not share personal or sensitive information</li>
                      <li>• Report suspected scams or fraudulent content</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-500-900 mb-2">Prohibited Activities</h3>
                    <ul className="text-yellow-500-800 text-sm space-y-1">
                      <li>• Misrepresenting yourself or impersonating others</li>
                      <li>• Posting false, misleading, or harmful information</li>
                      <li>• Attempting to breach website security</li>
                      <li>• Using automated tools to access our service</li>
                      <li>• Redistributing our content without permission</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Accuracy and Updates</h2>
                <div className="bg-yellow-500-50 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="text-yellow-500-800">
                    <strong>No Guarantee of Accuracy:</strong> While we strive to provide accurate and up-to-date information, 
                    we cannot guarantee the completeness, accuracy, or timeliness of the information on our website.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Information is compiled from publicly available sources</li>
                  <li>SASSA policies and procedures may change without notice</li>
                  <li>Payment dates and schedules are subject to government changes</li>
                  <li>We update information regularly but cannot guarantee real-time accuracy</li>
                  <li>Users should always verify critical information through official channels</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property Rights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Our Content</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Original content, design, and compilation on this website are protected by copyright and other intellectual property laws.
                    </p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Website design and layout</li>
                      <li>• Original articles and guides</li>
                      <li>• Logo and branding materials</li>
                      <li>• Data compilation and organization</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Third-Party Content</h3>
                    <p className="text-gray-700 text-sm mb-2">
                      We respect the intellectual property rights of others and expect our users to do the same.
                    </p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Official SASSA information (public domain)</li>
                      <li>• Government publications and announcements</li>
                      <li>• Third-party links and references</li>
                      <li>• User-contributed content</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-2 text-primary-gold" />
                  6. Disclaimers and Limitation of Liability
                </h2>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-4">
                  <h3 className="text-red-800 font-semibold text-lg mb-3">Service Disclaimer</h3>
                  <p className="text-red-700 text-sm mb-2">
                    THE WEBSITE AND SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. 
                    WE MAKE NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Accuracy, completeness, or timeliness of information</li>
                    <li>• Uninterrupted or error-free service</li>
                    <li>• Security or data protection</li>
                    <li>• Fitness for a particular purpose</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Limitation of Liability</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                    <li>Direct, indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Damages arising from use of incorrect or outdated information</li>
                    <li>Actions taken based on information from our website</li>
                    <li>Technical failures, downtime, or service interruptions</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links and Services</h2>
                <p className="text-gray-700 mb-4">
                  Our website contains links to third-party websites and services, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Official SASSA website (www.sassa.gov.za)</li>
                    <li>South African Government websites</li>
                    <li>Google Maps for office locations</li>
                    <li>Social media platforms</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Email service providers</li>
                    <li>Analytics and advertising services</li>
                    <li>Payment processing services</li>
                    <li>Content delivery networks</li>
                  </ul>
                </div>
                <div className="bg-yellow-500-50 p-4 rounded-lg">
                  <p className="text-yellow-500-800 text-sm">
                    <strong>Important:</strong> We are not responsible for the content, privacy policies, or practices of third-party websites. 
                    Your interactions with third-party services are governed by their respective terms and privacy policies.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Key Privacy Points:</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• We collect minimal personal information necessary for our services</li>
                    <li>• We use cookies and analytics to improve user experience</li>
                    <li>• We do not sell or share personal information with third parties</li>
                    <li>• You have rights regarding your personal information</li>
                  </ul>
                  <p className="text-blue-700 text-sm mt-3">
                    <a href="/privacy" className="underline hover:no-underline">
                      Read our complete Privacy Policy
                    </a>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. User-Generated Content</h2>
                <p className="text-gray-700 mb-4">
                  If you submit content to our website (comments, questions, feedback), you agree that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Your content does not violate any laws or third-party rights</li>
                  <li>You grant us a license to use, display, and distribute your content</li>
                  <li>We may moderate, edit, or remove content at our discretion</li>
                  <li>You are responsible for the accuracy of information you provide</li>
                  <li>You will not post personal, sensitive, or confidential information</li>
                </ul>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Warning:</strong> Never share personal information such as ID numbers, banking details, 
                    or SASSA reference numbers in public comments or messages.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Advertising and Monetization</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Our website displays advertisements through Google AdSense and other advertising networks to support our operations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li>Advertisements are clearly marked as such</li>
                    <li>We do not endorse advertised products or services</li>
                    <li>Third-party advertisers may use cookies for targeted advertising</li>
                    <li>You can opt-out of personalized advertising through your browser settings</li>
                  </ul>
                  <div className="bg-yellow-500-50 p-3 rounded border-l-4 border-yellow-500">
                    <p className="text-yellow-500-800 text-sm">
                      <strong>Scam Warning:</strong> Be cautious of advertisements claiming to offer official SASSA services, 
                      loans, or grants. Always verify through official SASSA channels.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Service Availability</h2>
                <p className="text-gray-700 mb-4">
                  We strive to maintain continuous service availability, but we do not guarantee uninterrupted access:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Scheduled maintenance may temporarily interrupt service</li>
                  <li>Technical issues may cause unexpected downtime</li>
                  <li>We reserve the right to suspend service for improvements</li>
                  <li>Service availability may vary by location and internet provider</li>
                  <li>We are not liable for damages caused by service interruptions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications to Terms</h2>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm mb-3">
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective when posted on this page.
                  </p>
                  <h3 className="font-semibold text-blue-900 mb-2">How We Notify You:</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Updating the "Last Updated" date</li>
                    <li>• Prominent notice on our website</li>
                    <li>• Email notification for significant changes (if subscribed)</li>
                  </ul>
                  <p className="text-blue-800 text-sm mt-3">
                    Continued use of our website after changes constitutes acceptance of the updated terms.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law and Disputes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Governing Law</h3>
                    <p className="text-gray-700 text-sm">
                      These terms are governed by the laws of the Republic of South Africa. 
                      Any legal proceedings shall be subject to the exclusive jurisdiction of South African courts.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                    <p className="text-gray-700 text-sm">
                      We encourage resolving disputes through direct communication. 
                      For formal disputes, South African courts have exclusive jurisdiction.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Severability and Waiver</h2>
                <p className="text-gray-700 mb-4">
                  If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full effect. 
                  Our failure to enforce any right or provision does not constitute a waiver of such right or provision.
                </p>
              </section>

              <section className="bg-primary-gold bg-opacity-10 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms of Service or our website:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>Email: legal@sassahelphub.co.za</p>
                  <p>Phone: +27 11 123 4567</p>
                  <p className="text-sm text-gray-600 mt-4">
                    For SASSA-related queries, contact SASSA directly:
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <a href="tel:0800601011" className="text-primary-gold hover:text-primary-gold">
                      0800 60 10 11
                    </a>
                    <span>|</span>
                    <a href="https://www.sassa.gov.za" target="_blank" rel="noopener noreferrer" 
                       className="text-primary-gold hover:text-primary-gold inline-flex items-center">
                      www.sassa.gov.za
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;