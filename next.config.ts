import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const APP_LANGUAGE = process.env.APP_LANGUAGE;

if (!APP_LANGUAGE) throw new Error("APP_LANGUAGE IS NOT SET");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ["md", "mdx", "ts", "tsx"],
  reactCompiler: true,
  experimental: {
    viewTransition: true,
    mdxRs: true,
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://genomas.bnjm.site",
    "https://www.genomas.bnjm.site",
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@prisma/client': require.resolve('@prisma/client'),
    };
    return config;
  },
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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
