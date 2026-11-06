/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/gifts",
        destination: "/gifts-by-adeola",
        permanent: false,
      },
      {
        source: "/gifting",
        destination: "/gifts-by-adeola",
        permanent: false,
      },
      {
        source: "/academy",
        destination: "/services/royal-planners-academy",
        permanent: false,
      },
      {
        source: "/training",
        destination: "/services/royal-planners-academy",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
