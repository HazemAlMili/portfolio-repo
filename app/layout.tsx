import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// ============================================================================
// FONTS CONFIGURATION
// ============================================================================
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

// ============================================================================
// LAZY LOAD HEAVY COMPONENTS
// ============================================================================
const PageLoader = dynamic(() => import("@/components/PageLoader"));
const CircuitBackground = dynamic(() => import("@/components/CircuitBackground"));

// ============================================================================
// METADATA & SEO
// ============================================================================
export const metadata: Metadata = {
  metadataBase: new URL("https://hazemalmelli.vercel.app"),
  
  title: {
    default: "Hazem's Portfolio - Front-End Developer",
    template: "%s | Hazem's Portfolio",
  },
  
  description:
    "Hazem Al-Melli - Professional Front-End Developer based in Cairo, Egypt. Specializing in React, Next.js, TypeScript, and modern web technologies. Building responsive, high-performance web applications with cutting-edge design.",
  
  keywords: [
    // Primary Keywords
    "Front-End Developer",
    "React Specialist",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Hazem Al-Melli",
    
    // Name Variations
    "Hazem",
    "AlMelli",
    "almelli",
    "HazemAlMelli",
    "HazemAlMili",
    "hazemalmili",
    "HazemAlMile",
    "hazemalmile",
    "hazemalmelli",
    
    // Technical Skills
    "JavaScript Developer",
    "Web Developer",
    "UI Developer",
    "Full Stack Developer",
    "Frontend Engineer",
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Responsive Design",
    "Web Performance",
    "Modern Web Design",
    
    // Location-Based
    "Front-End Developer Cairo",
    "React Developer Egypt",
    "Web Developer Cairo",
    "Software Developer Egypt",
    "Cairo Developer",
    "Egypt Web Development",
    
    // Additional
    "Portfolio",
    "Web Applications",
    "User Interface",
    "User Experience",
    "vibe engineer",
    "vibe coder",
    
    // Arabic Keywords
    "حازم الملي",
    "مطور واجهات أمامية",
    "مبرمج ريأكت",
    "مطور ويب",
  ],
  
  authors: [{ name: "Hazem Al-Melli", url: "https://hazemalmelli.vercel.app" }],
  creator: "Hazem Al-Melli",
  publisher: "Hazem Al-Melli",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hazemalmelli.vercel.app/",
    siteName: "Hazem's Portfolio",
    title: "Hazem's Portfolio - Front-End Developer & React Specialist",
    description: "Professional Front-End Developer based in Cairo, Egypt. Specializing in React, Next.js, and TypeScript. Explore my portfolio of modern web applications.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Hazem's Portfolio - Front-End Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hazem's Portfolio - Front-End Developer",
    description: "Professional Front-End Developer from Cairo, Egypt. Building modern web applications with React, Next.js & TypeScript.",
    images: ["/api/og"],
    creator: "@HazemAlMelli",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.json",
  
  verification: {
    google: "1f4ac51d03ae467c",
  },
  
  alternates: {
    canonical: "https://hazemalmelli.vercel.app",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ============================================================================
// ROOT LAYOUT COMPONENT
// ============================================================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} dark`}>
      <head>
        {/* JSON-LD Structured Data - WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Hazem's Portfolio",
              "alternateName": "Hazem Al-Melli Portfolio",
              "url": "https://hazemalmelli.vercel.app/",
              "description": "Professional Front-End Developer portfolio showcasing modern web applications built with React, Next.js, and TypeScript",
              "inLanguage": "en-US",
              "author": {
                "@type": "Person",
                "name": "Hazem Al-Melli"
              }
            }),
          }}
        />
        
        {/* JSON-LD Structured Data - Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Hazem Al-Melli",
              "alternateName": ["Hazem AlMelli", "HazemAlMelli", "Hazem"],
              "url": "https://hazemalmelli.vercel.app/",
              "image": "https://hazemalmelli.vercel.app/api/og",
              "jobTitle": "Front-End Developer",
              "description": "Professional Front-End Developer specializing in React, Next.js, and TypeScript",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cairo",
                "addressCountry": "Egypt"
              },
              "knowsAbout": [
                "React",
                "Next.js",
                "TypeScript",
                "JavaScript",
                "Front-End Development",
                "Web Development",
                "UI/UX Design",
                "Responsive Design",
                "Web Performance"
              ],
              "sameAs": [
                "https://github.com/HazemAlMili",
                "https://hazemalmelli.vercel.app"
              ]
            }),
          }}
        />
      </head>
      <body className="font-serif antialiased">
        <SmoothScroll>
          <CircuitBackground />
          <PageLoader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}