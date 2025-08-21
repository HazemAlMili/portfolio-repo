import type React from "react";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Hazem Al-Melli | Front-End Developer",
  description:
    "Portfolio showcasing modern, responsive web projects built with React & Next.js.",
  openGraph: {
    title: "Hazem Al-Melli | Front-End Developer",
    description:
      "Portfolio showcasing modern, responsive web projects built with React & Next.js.",
    url: "https://YOUR-DOMAIN.com",
    siteName: "Hazem Al-Melli Portfolio",
    images: [
      {
        url: "https://YOUR-DOMAIN.com/images/preview.png",
        width: 1200,
        height: 630,
        alt: "Hazem Al-Melli Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazem Al-Melli | Front-End Developer",
    description:
      "Portfolio showcasing modern, responsive web projects built with React & Next.js.",
    images: ["https://YOUR-DOMAIN.com/images/preview.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          property="og:title"
          content="Hazem Al-Melli | Front-End Developer Portfolio"
        />
        <meta
          property="og:description"
          content="Check out my portfolio showcasing modern, responsive web projects built with React & Next.js."
        />
        <meta
          property="og:image"
          content="https://your-domain.com/images/preview.png"
        />
        <meta property="og:url" content="https://your-domain.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
