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
  swcMinify: true, // Use SWC for faster builds
  
  /* Experimental Features for Better Performance */
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
};

export default nextConfig;
