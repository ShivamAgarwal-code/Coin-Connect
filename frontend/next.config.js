/** @type {import('next').NextConfig} */
const nextConfig = {
  // disbaled for dev mode coz' rendring every api components twice
  // reactStrictMode: true,
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
