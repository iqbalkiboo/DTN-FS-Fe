/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
    allowedDevOrigins: ["192.168.1.29"],
  },
};

module.exports = nextConfig;