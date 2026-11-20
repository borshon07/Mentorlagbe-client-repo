import type { NextConfig } from "next";

const api = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/api/auth/:path*", destination: `${api}/api/auth/:path*` },
      { source: "/api/token", destination: `${api}/api/token` },
    ];
  },
};

export default nextConfig;