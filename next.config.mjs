/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
    appIsrStatus: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  },
};

export default nextConfig; 