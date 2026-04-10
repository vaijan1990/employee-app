import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/employees',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
