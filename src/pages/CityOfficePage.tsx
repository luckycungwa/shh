import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, ArrowLeft, Info, CheckCircle, Navigation } from "lucide-react";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import AdUnit from "../components/Common/AdUnit";

interface CityOffice {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  description: string;
  localTips: string[];
}

const CityOfficePage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [office, setOffice] = useState<CityOffice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const response = await fetch("/data/officeCities.json");
        if (!response.ok) throw new Error("Failed to fetch office data");
        const data: CityOffice[] = await response.json();
        const found = data.find((o) => o.id === cityId);
        if (found) {
          setOffice(found);
        } else {
          setError("Office not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffice();
  }, [cityId]);

  if (isLoading) return <div className="min-h-screen flex justify-center items-center"><LoadingSpinner size="lg" /></div>;
  if (error || !office) return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Error: {error || "Office not found"}</h1>
      <Link to="/resources" className="text-primary-gold hover:underline flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to all offices
      </Link>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>SASSA Office in {office.city} | Contact & Directions | SASSA Help Hub</title>
        <meta name="description" content={`Find the SASSA office in ${office.city}, ${office.province}. Get the address, phone number, and local tips for your visit. Unofficial SASSA guide.`} />
        <meta name="keywords" content={`SASSA office ${office.city}, SASSA ${office.city} contact, SASSA ${office.province} office, SASSA address ${office.city}`} />
        <link rel="canonical" href={`https://sassahelphub.co.za/offices/${office.id}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/resources" className="inline-flex items-center text-primary-gold hover:text-yellow-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Offices
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary-black p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-primary-gold" />
                <h1 className="text-3xl md:text-4xl font-bold">{office.name}</h1>
              </div>
              <p className="text-gray-300 text-lg">{office.description}</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary-gold" />
                      Contact Details
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Physical Address:</p>
                          <p className="text-gray-600 dark:text-gray-400">{office.address}</p>
                          <p className="text-gray-600 dark:text-gray-400">{office.city}, {office.province}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Phone Number:</p>
                          <a href={`tel:${office.phone}`} className="text-primary-gold hover:underline text-lg font-bold">
                            {office.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AdUnit slot="1122334455" />

                  <div>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address + " " + office.city)}`, '_blank')}
                      className="w-full bg-primary-gold text-primary-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all shadow-lg"
                    >
                      <Navigation className="w-6 h-6" />
                      Open in Google Maps
                    </button>
                  </div>
                </div>

                {/* Local Tips */}
                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl border border-gray-200 dark:border-gray-600">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Local Visitor Tips
                  </h2>
                  <ul className="space-y-6">
                    {office.localTips.map((tip, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-6 h-6 bg-primary-gold text-primary-black rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 p-4 bg-yellow-500 bg-opacity-10 border-l-4 border-yellow-500 rounded-r-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-400">
                      <strong>Note:</strong> We are an unofficial resource. For immediate official assistance, call SASSA at 0800 60 10 11.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked for SASSA {office.city}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Link to="/" className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow">
                    <h4 className="font-bold mb-2">Status Check</h4>
                    <p className="text-sm text-gray-600">Check your SRD status online instantly.</p>
                  </Link>
                  <Link to="/payment-calendar" className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow">
                    <h4 className="font-bold mb-2">Payment Dates</h4>
                    <p className="text-sm text-gray-600">See when your grant will be paid.</p>
                  </Link>
                  <Link to="/guides" className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-md transition-shadow">
                    <h4 className="font-bold mb-2">How to Apply</h4>
                    <p className="text-sm text-gray-600">Step-by-step guides for all grants.</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CityOfficePage;
