import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint errors during build for faster development
  eslint: {
    ignoreDuringBuilds: true,
  },

  /* config options here */
};

export default nextConfig;
