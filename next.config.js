/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  images: {
    domains: ['www.sassahelphub.co.za', 'images.unsplash.com'],
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/updates', permanent: true },
      { source: '/blog/:path*', destination: '/updates', permanent: true },
      { source: '/status-check', destination: '/', permanent: true },
      { source: '/application-tracking', destination: '/', permanent: true },
      { source: '/appeals', destination: '/guides/appeal-guide', permanent: true },
      { source: '/offices', destination: '/resources', permanent: true },
      { source: '/bank-details', destination: '/guides/srd-grant', permanent: true },
      { source: '/srd-grant-guide', destination: '/guides/srd-grant', permanent: true },
      { source: '/old-age-grant-guide', destination: '/guides', permanent: true },
      { source: '/disability-grant-guide', destination: '/guides', permanent: true },
      { source: '/child-support-grant-guide', destination: '/guides', permanent: true },
      { source: '/foster-child-grant-guide', destination: '/guides', permanent: true },
      { source: '/care-dependency-grant-guide', destination: '/guides', permanent: true },
      { source: '/war-veterans-grant-guide', destination: '/guides', permanent: true },
      { source: '/grant-in-aid-guide', destination: '/guides', permanent: true },
      { source: '/scams', destination: '/scam-alert', permanent: true },
      { source: '/financial-tools', destination: '/', permanent: true },
      { source: '/eligibility', destination: '/guides', permanent: true },
      { source: '/travel', destination: '/guides', permanent: true },
      { source: '/account-management', destination: '/guides', permanent: true },
      { source: '/assistance', destination: '/guides', permanent: true },
      { source: '/payment-issues', destination: '/guides', permanent: true },
      { source: '/communication', destination: '/guides', permanent: true },
      { source: '/biometrics', destination: '/guides', permanent: true },
      { source: '/grant-reviews', destination: '/guides', permanent: true },
      { source: '/applications', destination: '/guides', permanent: true },
      { source: '/fraud-prevention', destination: '/scam-alert', permanent: true },
      { source: '/grant-amounts', destination: '/guides', permanent: true },
    ];
  },
};

export default nextConfig;
