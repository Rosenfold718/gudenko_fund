import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Убираем standalone для Vercel
  // output: "standalone",
  
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  
  // Для Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Явно объявляем переменные окружения
  env: {
    TURSO_URL: process.env.TURSO_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
