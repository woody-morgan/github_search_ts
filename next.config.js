/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};

module.exports = nextConfig;
