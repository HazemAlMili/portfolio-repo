import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

// ============================================================================
// LAZY LOAD HEAVY COMPONENTS
// ============================================================================

// These are client components ('use client'), so they won't SSR anyway
const PageLoader = dynamic(() => import("@/components/PageLoader"));
const CircuitBackground = dynamic(() => import("@/components/CircuitBackground"));

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Hazem Al-Melli | Front-End Developer & React Specialist",
    template: "%s | Hazem Al-Melli",
  },
  description:
    "Experienced Front-End Developer specializing in React, Next.js, and TypeScript. Building modern, responsive web applications with clean code and exceptional user experiences. Based in Cairo, Egypt.",
  
  // Keywords for SEO
  keywords: [
    "Front-End Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Cairo",
    "JavaScript Developer",
    "UI/UX Developer",
    "Responsive Web Design",
    "Modern Web Development",
    "Hazem Al-Melli",
    "Portfolio",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Bootstrap",
  ],

  // Authors
  authors: [
    {
      name: "Hazem Al-Melli",
      url: "https://hazemalmelli.vercel.app",
    },
  ],

  // Creator
  creator: "Hazem Al-Melli",

  // Publisher
  publisher: "Hazem Al-Melli",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hazemalmelli.vercel.app/",
    siteName: "Hazem Al-Melli - Front-End Developer Portfolio",
    title: "Hazem Al-Melli | Front-End Developer & React Specialist",
    description:
      "Experienced Front-End Developer specializing in React, Next.js, and TypeScript. Explore my portfolio of modern web applications and cutting-edge projects. Available for freelance and full-time opportunities.",
    images: [
      {
        url: "https://hazemalmelli.vercel.app/api/og",
        width: 1200,
        height: 630,
        alt: "Hazem Al-Melli - Front-End Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Hazem Al-Melli | Front-End Developer & React Specialist",
    description:
      "Experienced Front-End Developer building modern web applications with React, Next.js & TypeScript. Check out my portfolio and latest projects!",
    creator: "@hazem_almelli", // Update with your Twitter handle if you have one
    images: ["https://hazemalmelli.vercel.app/api/og"],
  },

  // Icons & Manifest
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/Logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/Logo.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest
  manifest: "/manifest.json",

  // verification (Add these tokens when you verify your site)
  verification: {
    google: "1f4ac51d03ae467c", // Google Search Console verification
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Category
  category: "technology",

  // Additional metadata
  metadataBase: new URL("https://hazemalmelli.vercel.app"),
  
  // Alternate languages (if you support multiple languages)
  alternates: {
    canonical: "https://hazemalmelli.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* Blocking theme script - Prevents FOUC and flickering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Prevent transitions during initial theme application
                document.documentElement.classList.add('no-transition');
                
                // Determine theme
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme ? theme === 'dark' : prefersDark;
                
                // Apply theme immediately
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                
                // Re-enable transitions after paint (double RAF ensures paint completes)
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    document.documentElement.classList.remove('no-transition');
                  });
                });
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-serif antialiased">
        <CircuitBackground />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
