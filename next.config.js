/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    domains: [
      "img.geonames.org",
      "upload.wikimedia.org",
      "knowledgehub.vercel.app",
      "dev-mission-efficiency.pantheonsite.io",
      "test-mission-efficiency.pantheonsite.io",
      "dev-mission.keymouseit.com"
    ],
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
