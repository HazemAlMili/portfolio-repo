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
    url: "https://portfolio-repo-pearl.vercel.app/",
    siteName: "Hazem Al-Melli Portfolio",
    images: [
      {
        url: "https://portfolio-repo-pearl.vercel.app/images/Hero.png",
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
    images: ["https://portfolio-repo-pearl.vercel.app/images/Hero.png"],
  },
  icons: {
    icon: ["https://portfolio-repo-pearl.vercel.app/images/logo.svg"],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
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
        <meta name="author" content="[Hazem Al-Melli]"></meta>
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
          content="https://portfolio-repo-pearl.vercel.app/images/Hero.png"
        />
        <meta
          property="og:url"
          content="https://portfolio-repo-pearl.vercel.app/"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
