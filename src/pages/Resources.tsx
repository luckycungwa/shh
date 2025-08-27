import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ContactInformation from "../resources/contact-information";
import ApplicationGuide from "../resources/application-guide";
import PaymentInformation from "../resources/payment-information";
import Troubleshooting from "../resources/troubleshooting";

interface SassaOffice {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email?: string;
  hours: {
    weekdays: string;
    saturday?: string;
    sunday?: string;
  };
  services: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  accessibility: string[];
}

const Resources: React.FC = () => {
  const [offices, setOffices] = useState<SassaOffice[]>([]);
  const [filteredOffices, setFilteredOffices] = useState<SassaOffice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("all");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/68a68cb3ae596e708fcfa5f5/latest"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch offices");
        }
        const jsonResponse = await response.json();
        const data: SassaOffice[] = jsonResponse.record;
        setOffices(data);
        setFilteredOffices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffices();
  }, []);

  useEffect(() => {
    let filtered = [...offices];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (office) =>
          office.name.toLowerCase().includes(query) ||
          office.city.toLowerCase().includes(query) ||
          office.province.toLowerCase().includes(query) ||
          office.address.toLowerCase().includes(query)
      );
    }

    // Filter by province
    if (selectedProvince !== "all") {
      filtered = filtered.filter(
        (office) => office.province === selectedProvince
      );
    }

    // Sort by distance if user location is available
    if (userLocation) {
      filtered.sort((a, b) => {
        const distanceA = calculateDistance(userLocation, a.coordinates);
        const distanceB = calculateDistance(userLocation, b.coordinates);
        return distanceA - distanceB;
      });
    }

    setFilteredOffices(filtered);
  }, [offices, searchQuery, selectedProvince, userLocation]);

  const calculateDistance = (
    pos1: { lat: number; lng: number },
    pos2: { lat: number; lng: number }
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((pos2.lat - pos1.lat) * Math.PI) / 180;
    const dLng = ((pos2.lng - pos1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pos1.lat * Math.PI) / 180) *
        Math.cos((pos2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_error) => {
        setLocationError(
          "Unable to retrieve your location. Please search manually."
        );
      }
    );
  };

  const provinces = [
    "all",
    ...new Set(offices.map((office) => office.province)),
  ];

  const getDirections = (office: SassaOffice) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${office.coordinates.lat},${office.coordinates.lng}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading SASSA offices..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Offices
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          SASSA Offices - Find Your Nearest SASSA Office | SASSA Help Hub
        </title>
        <meta
          name="description"
          content="Find your nearest SASSA office with addresses, phone numbers, operating hours, and directions. Locate SASSA offices across South Africa."
        />
        <meta
          name="keywords"
          content="SASSA offices, SASSA locations, nearest SASSA office, SASSA address, SASSA contact details"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          {/* <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              SASSA Resources Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your comprehensive guide to SASSA grants, applications, and
              support services. Find official contact information, step-by-step
              guides, and solutions to common issues.
            </p>
          </div> */}
          {/* Resources section */}
          <div>
            <ContactInformation />
            <ApplicationGuide />
            <PaymentInformation />
            <Troubleshooting />
          </div>
          {/* Location Request */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Find Offices Near You
              </h2>
              {!userLocation ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Allow location access to find the nearest SASSA offices to
                    you.
                  </p>
                  <button
                    onClick={requestLocation}
                    className="bg-primary-gold text-primary-black px-6 py-2 rounded-lg font-medium hover:bg-primary-gold transition-colors duration-200 inline-flex items-center"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Use My Location
                  </button>
                  {locationError && (
                    <p className="text-red-600 text-sm mt-2">{locationError}</p>
                  )}
                </div>
              ) : (
                <div className="text-green-600">
                  <p className="mb-2">
                    ✓ Location enabled - offices sorted by distance
                  </p>
                  <button
                    onClick={() => setUserLocation(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear location
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, province, or office name..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Province:
              </span>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold"
              >
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province === "all" ? "All Provinces" : province}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 text-center">
              {filteredOffices.length === 1
                ? "1 office found"
                : `${filteredOffices.length} offices found`}
            </p>
          </div>
          {/* Office List */}
          <div className="space-y-6">
            {filteredOffices.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No offices found matching your criteria.
                </p>
              </div>
            ) : (
              filteredOffices.map((office) => (
                <div
                  key={office.id}
                  className="bg-white rounded-lg shadow-sm border border-black/50 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {office.name}
                            </h3>
                            <div className="flex items-start text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <p>{office.address}</p>
                                <p>
                                  {office.city}, {office.province}{" "}
                                  {office.postalCode}
                                </p>
                              </div>
                            </div>
                          </div>
                          {userLocation && (
                            <div className="text-right text-sm text-gray-500">
                              <p>
                                {calculateDistance(
                                  userLocation,
                                  office.coordinates
                                ).toFixed(1)}{" "}
                                km away
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Contact Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                <a
                                  href={`tel:${office.phone}`}
                                  className="text-primary-gold hover:text-primary-gold"
                                >
                                  {office.phone}
                                </a>
                              </div>
                              {office.email && (
                                <div className="flex items-center">
                                  <ExternalLink className="w-4 h-4 mr-2 text-gray-400" />
                                  <a
                                    href={`mailto:${office.email}`}
                                    className="text-primary-gold hover:text-primary-gold"
                                  >
                                    {office.email}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Operating Hours
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                <span>Mon-Fri: {office.hours.weekdays}</span>
                              </div>
                              {office.hours.saturday && (
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>Saturday: {office.hours.saturday}</span>
                                </div>
                              )}
                              {office.hours.sunday && (
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>Sunday: {office.hours.sunday}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Services Available
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {office.services.map((service, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        {office.accessibility.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Accessibility
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {office.accessibility.map((feature, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 lg:mt-0 lg:ml-6 flex-shrink-0">
                        <button
                          onClick={() => getDirections(office)}
                          className="w-full lg:w-auto bg-primary-gold text-primary-black px-6 py-2 rounded-lg font-medium hover:bg-primary-gold transition-colors duration-200 inline-flex items-center justify-center"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Emergency Contact */}-
          <div className=" bg-primary-dark text-white rounded-lg text-center">
            <div className="p-8 mt-12">
            <h2 className="text-2xl font-semibold mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-gray-300 mb-6">
              For urgent SASSA queries or if you can't visit an office, contact
              the SASSA helpline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0800601011"
                className="bg-primary-gold text-primary-black px-6 py-3 rounded-lg font-semibold hover:bg-primary-gold transition-colors duration-200"
              >
                Call SASSA: 0800 60 10 11
              </a>
              <a
                href="https://www.sassa.gov.za"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition-colors duration-200 inline-flex items-center"
              >
                Visit Official Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
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
      </div>
    </>
  );
};

export default Resources;
