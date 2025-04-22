import type { NextConfig } from "next";

const APP_LANGUAGE = process.env.APP_LANGUAGE;

if (!APP_LANGUAGE) throw new Error("APP_LANGUAGE IS NOT SET");

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/${APP_LANGUAGE}/:path*`,
      }
    ]
  }
};

export default nextConfig;
