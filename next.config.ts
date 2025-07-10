import type { NextConfig } from "next";

const APP_LANGUAGE = process.env.APP_LANGUAGE;

if (!APP_LANGUAGE) throw new Error("APP_LANGUAGE IS NOT SET");

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://genomas.bnjm.site",
    "https://www.genomas.bnjm.site",
  ],
  async rewrites() {
    return [
      // ❗ NO
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/:path*",
        destination: `/${APP_LANGUAGE}/:path*`,
      },
    ];
  },
};

export default nextConfig;
