/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "1337" },
      // If you sometimes use http://localhost:1337 too, add:
      { protocol: "http", hostname: "localhost", port: "1337" },
    ],
  },
};

module.exports = nextConfig;
