import type { NextConfig } from "next";
const isMain = process.env.PANTHEON_ENVIRONMENT === "main";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    serverComponentsExternalPackages: ["@pantheon-systems/drupal-kit"],
  },
  images: {
    domains: [
      "img.geonames.org",
      "upload.wikimedia.org",
      "knowledgehub.vercel.app",
      "dev-mission-efficiency.pantheonsite.io",
      "test-mission-efficiency.pantheonsite.io",
    ],
  },
  env: {
    NEXT_PUBLIC_DRUPAL_BASE_URL: isMain
      ? process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
      : process.env.NEXT_PUBLIC_DRUPAL_BASE_DEV_URL,
  },
};

export default nextConfig;
