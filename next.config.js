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
      { source: '/blog', destination: '/updates', statusCode: 301 },
      { source: '/blog/:path*', destination: '/updates', statusCode: 301 },
      { source: '/application-tracking', destination: '/', statusCode: 301 },
      { source: '/appeals', destination: '/guides/appeal-guide', statusCode: 301 },
      { source: '/offices', destination: '/resources', statusCode: 301 },
      { source: '/bank-details', destination: '/grants/srd-r370-grant', statusCode: 301 },
      { source: '/srd-grant-guide', destination: '/grants/srd-r370-grant', statusCode: 301 },
      { source: '/old-age-grant-guide', destination: '/guides', statusCode: 301 },
      { source: '/disability-grant-guide', destination: '/guides', statusCode: 301 },
      { source: '/child-support-grant-guide', destination: '/guides', statusCode: 301 },
      { source: '/foster-child-grant-guide', destination: '/guides', statusCode: 301 },
      { source: '/care-dependency-grant-guide', destination: '/guides', statusCode: 301 },
      { source: '/war-veterans-grant-guide', destination: '/guides', statusCode: 301 },
      { source: '/grant-in-aid-guide', destination: '/guides', statusCode: 301 },
      { source: '/scams', destination: '/scam-alert', statusCode: 301 },
      { source: '/financial-tools', destination: '/', statusCode: 301 },
      { source: '/eligibility', destination: '/guides', statusCode: 301 },
      { source: '/travel', destination: '/guides', statusCode: 301 },
      { source: '/account-management', destination: '/guides', statusCode: 301 },
      { source: '/assistance', destination: '/guides', statusCode: 301 },
      { source: '/payment-issues', destination: '/guides', statusCode: 301 },
      { source: '/communication', destination: '/guides', statusCode: 301 },
      { source: '/biometrics', destination: '/guides', statusCode: 301 },
      { source: '/grant-reviews', destination: '/guides', statusCode: 301 },
      { source: '/applications', destination: '/guides', statusCode: 301 },
      { source: '/fraud-prevention', destination: '/scam-alert', statusCode: 301 },
      { source: '/grant-amounts', destination: '/guides', statusCode: 301 },
      { source: '/updates/update-2026-027', destination: '/payment-calendar', statusCode: 301 },
      { source: '/updates/update-2026-022', destination: '/payment-calendar', statusCode: 301 },
      { source: '/updates/update-2026-018', destination: '/payment-calendar', statusCode: 301 },
      { source: '/updates/update-2026-015', destination: '/payment-calendar', statusCode: 301 },
      { source: '/updates/update-2026-013', destination: '/payment-calendar', statusCode: 301 },
      { source: '/updates/update-2026-001', destination: '/payment-calendar', statusCode: 301 },
      { source: '/updates/update-2026-009', destination: '/updates', statusCode: 301 },
      { source: '/updates/update-2026-030', destination: '/guides/grant-verification-process', statusCode: 301 },
      { source: '/updates/update-2026-032', destination: '/updates', statusCode: 301 },
      { source: '/grants/srd-grant', destination: '/grants/srd-r370-grant', statusCode: 301 },
      { source: '/grants/older-persons-grant', destination: '/grants/old-age-pension', statusCode: 301 },
      { source: '/guides/srd-grant', destination: '/grants/srd-r370-grant', statusCode: 301 },
      { source: '/guides/change-banking-details', destination: '/guides/bank-details-pending-fix', statusCode: 301 },
      { source: '/guides/biometric-verification-guide', destination: '/guides/biometric-fix-guide', statusCode: 301 },
      { source: '/guides/guide-means-test', destination: '/guides/bulk-means-test', statusCode: 301 },
      { source: '/guides/guide-report-fraud', destination: '/scam-alert', statusCode: 301 },
      { source: '/guides/postbank-black-card', destination: '/guides/postbank-black-card-guide', statusCode: 301 },
      { source: '/guides/status-check-no-phone', destination: '/guides/ussd-codes', statusCode: 301 },
      { source: '/updates/update-2026-005', destination: '/guides/grant-amounts-history', statusCode: 301 },
      { source: '/updates/update-2026-006', destination: '/grants/child-support-grant', statusCode: 301 },
      { source: '/updates/update-2026-007', destination: '/sassa-offices', statusCode: 301 },
      { source: '/updates/update-2026-008', destination: '/guides/apply-sassa-grants', statusCode: 301 },
      { source: '/updates/update-2026-021', destination: '/sassa-offices', statusCode: 301 },
      { source: '/updates/update-2026-025', destination: '/guides/ussd-codes', statusCode: 301 },
      { source: '/updates/update-2026-026', destination: '/payment-calendar', statusCode: 301 },
    ];
  },
};

export default nextConfig;
