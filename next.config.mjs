/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/testimonials",
        destination: "/#testimonials",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
