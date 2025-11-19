// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite imagini de pe domenii externe (PCPartPicker, eMAG, Amazon etc.)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // permite orice domeniu HTTPS
      },
    ],
    // Pentru performanță (opțional, dar recomandat)
    formats: ["image/avif", "image/webp"],
  },

  // Optimizează bundle-ul și permite tree-shaking
  reactStrictMode: true,
  swcMinify: true,

  // Pentru compatibilitate cu Firebase și variabile de mediu
  env: {
    // Nu e nevoie să pui nimic aici – Vercel le injectează automat din .env
  },

  // Dacă vrei să folosești transpile pentru pachete externe (nu e nevoie acum)
  transpilePackages: [],

  // Permite export static dacă vrei (opțional)
  // output: 'standalone', // folosește doar dacă vrei Docker

  // Header-uri de securitate (bonus)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;