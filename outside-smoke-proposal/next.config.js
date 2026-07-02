/** Next.js configuration for Outside Smoke Proposal app */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  turbopack: {
    root: __dirname
  }
};

module.exports = nextConfig;
