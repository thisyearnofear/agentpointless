/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/ai-plugin.json",
        destination: "/api/ai-plugin",
      },
    ];
  },
  env: {
    BITTE_CONFIG: process.env.BITTE_CONFIG,
  },
};

export default nextConfig;
