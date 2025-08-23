import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  experimental: {
    // This is to allow the Next.js dev server to be accessible from the Firebase Studio preview environment.
    allowedDevOrigins: [
      'https://6000-firebase-studio-1755704118258.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
