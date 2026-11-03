import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v4", destination: "/", permanent: true },
      // Finished work moved from /projects/ to /films/; in-development projects stay under /projects/.
      { source: "/projects/:id((?!nothing-disappears$)[^./]+)", destination: "/films/:id", permanent: true },
      { source: "/films/nothing-disappears", destination: "/projects/nothing-disappears", permanent: true },
    ];
  },
  images: {
    qualities: [75, 85],
    // Next 16 only optimizes local images whose query string is listed here.
    // Covers use "?v=N" cache-busting, so allow those exact values.
    localPatterns: [
      { pathname: "/projects/**", search: "" },
      ...Array.from({ length: 20 }, (_, i) => ({ pathname: "/projects/**", search: `?v=${i + 1}` })),
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gez.studio",
      },
    ],
  },
};

export default nextConfig;
