import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yellow.ua",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
