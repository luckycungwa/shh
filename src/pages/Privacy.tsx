import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Eye, Cookie, Mail, Phone } from 'lucide-react';

const Privacy: React.FC = () => {
  const lastUpdated = '2024-01-15';

  return (
    <>
      <Helmet>
        <title>Privacy Policy - SASSA Help Hub</title>
        <meta name="description" content="Learn how SASSA Help Hub protects your privacy and handles your personal information." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-primary-gold mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600">
                Last updated: {new Date(lastUpdated).toLocaleDateString()}
              </p>
            </div>

            <div className="prose max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-primary-gold" />
                  Information We Collect
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3">Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Contact information when you reach out for support</li>
                    <li>Email addresses for payment reminder subscriptions</li>
                    <li>Feedback and suggestions you submit</li>
                    <li>Search queries and preferences to improve our service</li>
                  </ul>

                  <h3 className="font-semibold mt-6 mb-3">Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Browser type and version</li>
                    <li>Operating system and device information</li>
                    <li>IP address and approximate location</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring websites and search terms</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Cookie className="w-6 h-6 mr-2 text-primary-gold" />
                  Cookies and Tracking
                </h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your experience on our website:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Essential Cookies</h3>
                    <p className="text-blue-800 text-sm">
                      Required for basic website functionality, security, and your preferences.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Analytics Cookies</h3>
                    <p className="text-green-800 text-sm">
                      Help us understand how visitors interact with our website to improve user experience.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Advertising Cookies</h3>
                    <p className="text-purple-800 text-sm">
                      Used to deliver relevant advertisements and measure their effectiveness.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-500-50 border-l-4 border-yellow-500 rounded-r-lg">
                  <p className="text-sm text-yellow-500-800">
                    <strong>Your Choice:</strong> You can control cookie preferences through your browser settings or our cookie consent banner.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li><strong>Service Provision:</strong> To provide SASSA-related information, payment reminders, and scam alerts</li>
                    <li><strong>Communication:</strong> To respond to your inquiries and provide customer support</li>
                    <li><strong>Improvement:</strong> To analyze usage patterns and improve our website functionality</li>
                    <li><strong>Safety:</strong> To detect and prevent fraud, scams, and security threats</li>
                    <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                    <li><strong>Marketing:</strong> To display relevant advertisements through Google AdSense (with your consent)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <p className="text-red-800 font-semibold">
                    We do NOT sell, rent, or trade your personal information to third parties.
                  </p>
                </div>
                
                <p className="text-gray-700 mb-4">We may share information only in these limited circumstances:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Service Providers:</strong> With trusted partners who help operate our website (hosting, email services, analytics)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                  <li><strong>Business Transfer:</strong> In the event of a merger, sale, or transfer of assets</li>
                  <li><strong>Consent:</strong> When you explicitly agree to sharing for specific purposes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Technical Measures</h3>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• SSL encryption for data transmission</li>
                      <li>• Regular security updates and monitoring</li>
                      <li>• Secure data storage and access controls</li>
                      <li>• Regular backups and disaster recovery</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Administrative Measures</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Limited access to personal information</li>
                      <li>• Staff training on data protection</li>
                      <li>• Regular privacy impact assessments</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Access:</strong> Request copies of your personal information</li>
                      <li>• <strong>Correction:</strong> Update or correct inaccurate information</li>
                      <li>• <strong>Deletion:</strong> Request deletion of your personal information</li>
                      <li>• <strong>Portability:</strong> Request transfer of your data</li>
                    </ul>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Objection:</strong> Object to processing of your information</li>
                      <li>• <strong>Restriction:</strong> Limit how we use your information</li>
                      <li>• <strong>Withdrawal:</strong> Withdraw consent at any time</li>
                      <li>• <strong>Complaint:</strong> File complaints with data protection authorities</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Google Services</h3>
                    <p className="text-blue-800 text-sm mb-2">
                      We use Google Analytics for website analytics and Google AdSense for advertisements.
                    </p>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 text-sm underline">
                      View Google's Privacy Policy
                    </a>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">EmailJS</h3>
                    <p className="text-purple-800 text-sm mb-2">
                      Used for sending payment reminder emails. No personal data is stored on their servers.
                    </p>
                    <a href="https://www.emailjs.com/docs/privacy-policy/" target="_blank" rel="noopener noreferrer" 
                       className="text-purple-600 hover:text-purple-800 text-sm underline">
                      View EmailJS Privacy Policy
                    </a>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">We retain your information for different periods:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Contact Information:</strong> Until you request deletion or unsubscribe</li>
                    <li><strong>Analytics Data:</strong> 26 months (Google Analytics default)</li>
                    <li><strong>Server Logs:</strong> 90 days for security and performance monitoring</li>
                    <li><strong>Support Inquiries:</strong> 2 years for reference and improvement</li>
                    <li><strong>Legal Requirements:</strong> As required by applicable law</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
                <div className="bg-yellow-500-50 border-l-4 border-yellow-500 p-4">
                  <p className="text-yellow-500-800">
                    Our website is not intended for children under 13. We do not knowingly collect personal information from children. 
                    If you believe we have collected information from a child, please contact us immediately.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Users</h2>
                <p className="text-gray-700 mb-4">
                  While primarily serving South African users, our website may be accessed internationally. 
                  By using our services, you consent to the transfer and processing of your information in South Africa, 
                  where data protection laws may differ from your jurisdiction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy periodically to reflect changes in our practices, technology, 
                  legal requirements, or other factors. We will notify you of material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last Updated" date</li>
                  <li>Sending email notifications for significant changes (if you've subscribed)</li>
                  <li>Displaying prominent notices on our website</li>
                </ul>
              </section>

              <section className="bg-primary-gold bg-opacity-10 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-primary-gold" />
                  Contact Us
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or your personal information:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-gray-500" />
                    Email: privacy@sassahelphub.co.za
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-gray-500" />
                    Phone: +27 11 123 4567
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    We will respond to your inquiry within 30 days of receipt.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;