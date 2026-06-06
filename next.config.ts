import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v4", destination: "/", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "gez.studio",
      },
    ],
  },
};

export default nextConfig;
