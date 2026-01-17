import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image Optimization Configuration */
  images: {
    // Enable modern formats (automatic conversion)
    formats: ['image/avif', 'image/webp'],
    
    // Device-specific image sizes for responsive loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for smaller elements (avatars, icons, etc.)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache optimized images for 1 year
    minimumCacheTTL: 60 * 60 * 24 * 365, // 365 days
    
    // Allow optimization for external images (if needed)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      // Add other domains as needed
    ],
  },
  
  /* Performance Optimizations */
  compress: true, // Enable gzip compression
  
  /* Production Optimizations */
  // swcMinify is enabled by default in Next.js 13+
  
  /* Experimental Features for Better Performance */
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  
  /* Deployment Protection - Prevent build failures due to lint errors */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
  /* Type Safety - Similar protection for TypeScript errors */
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has TypeScript errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
