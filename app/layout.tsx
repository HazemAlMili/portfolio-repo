import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import dynamic from "next/dynamic";
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
    default: "Hazem Al-Melli | Front-End Developer & React Specialist",
    template: "%s | Hazem Al-Melli",
  },
  description:
    "Experienced Front-End Developer specializing in React, Next.js, and TypeScript. Building modern, responsive web applications in Cairo, Egypt.",
  
  keywords: ["Front-End Developer", "React Developer", "Next.js", "TypeScript", "Hazem Al-Melli"],
  
  authors: [{ name: "Hazem Al-Melli", url: "https://hazemalmelli.vercel.app" }],
  creator: "Hazem Al-Melli",
  publisher: "Hazem Al-Melli",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hazemalmelli.vercel.app/",
    siteName: "Hazem Al-Melli", // لضمان تغيير كلمة Vercel في جوجل
    title: "Hazem Al-Melli | Front-End Developer",
    description: "Explore my portfolio of modern web applications and cutting-edge projects.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Hazem Al-Melli Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hazem Al-Melli | Front-End Developer",
    description: "Experienced Front-End Developer building modern web applications.",
    images: ["/api/og"],
  },

  // ملاحظة: تم حذف قسم icons لأنك وضعت icon.png داخل فولدر app
  // Next.js سيتعرف عليها تلقائياً ويولد الروابط الصحيحة.

  manifest: "/manifest.json",
  verification: {
    google: "1f4ac51d03ae467c",
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
        {/* Force Dark Mode Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              })();
            `,
          }}
        />
        
        {/* JSON-LD - أقوى طريقة لتعريف اسم الموقع لجوجل */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Hazem Al-Melli",
              "url": "https://hazemalmelli.vercel.app/"
            }),
          }}
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