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
  title: "Hazem Al-Melli - Front-End Developer",
  description:
    "Personal portfolio of Hazem Al-Melli, a passionate front-end developer specializing in modern web technologies.",
  keywords:
    "Hazem Al-Melli, front-end developer, web developer, React, HTML, CSS, JavaScript, portfolio",
  authors: [{ name: "Hazem Al-Melli" }],
  creator: "Hazem Al-Melli",
  openGraph: {
    title: "Hazem Al-Melli - Front-End Developer",
    description:
      "Personal portfolio showcasing modern web development projects and skills.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazem Al-Melli - Front-End Developer",
    description:
      "Personal portfolio showcasing modern web development projects and skills.",
  },
  robots: {
    index: true,
    follow: true,
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
      </head>
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
