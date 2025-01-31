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
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      buffer: "buffer",
      util: "util",
    };
    return config;
  },
  env: {
    BITTE_CONFIG: process.env.BITTE_CONFIG,
  },
};

export default nextConfig;
