/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.sassahelphub.co.za', 'images.unsplash.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/updates', permanent: true },
      { source: '/blog/:path*', destination: '/updates', permanent: true },
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
      { source: '/updates/update-2026-027', destination: '/payment-calendar', permanent: true },
      { source: '/updates/update-2026-022', destination: '/payment-calendar', permanent: true },
      { source: '/updates/update-2026-018', destination: '/payment-calendar', permanent: true },
      { source: '/updates/update-2026-015', destination: '/payment-calendar', permanent: true },
      { source: '/updates/update-2026-013', destination: '/payment-calendar', permanent: true },
      { source: '/updates/update-2026-001', destination: '/payment-calendar', permanent: true },
    ];
  },
};

export default nextConfig;
