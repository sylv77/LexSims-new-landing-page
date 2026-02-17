import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { Analytics } from "@vercel/analytics/next";
import { lexsimsFont } from "./fonts/lexsims";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Flight Simulator for Legal Decisions",
  description:
    "LexSims builds legal digital twins — simulation environments that model litigation, regulatory, and compliance scenarios at scale. Test legal strategies before you commit.",
  keywords: ["legal digital twin", "legal simulation", "litigation modeling", "regulatory compliance", "legal risk assessment", "case outcome prediction", "legal intelligence"],
  authors: [{ name: "LexSims" }],
  openGraph: {
    title: "LexSims — Flight Simulator for Legal Decisions",
    description: "LexSims builds legal digital twins — simulation environments that model litigation, regulatory, and compliance scenarios at scale. Test legal strategies before you commit.",
    url: "https://lexsims.com",
    siteName: "LexSims",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://lexsims.com/images/og-image-3.jpg",
        width: 1200,
        height: 630,
        alt: "LexSims — Legal Simulation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexSims — Flight Simulator for Legal Decisions",
    description: "LexSims builds legal digital twins — simulation environments that model litigation, regulatory, and compliance scenarios at scale. Test legal strategies before you commit.",
    creator: "@lexsims",
    images: ["https://lexsims.com/images/og-image-3.jpg"],
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
    <html lang="en">
      <head>
        <link rel="preload" href="/video.webm?v=3" as="video" type="video/webm" />
        <link rel="preload" href="/video.mp4?v=3" as="video" type="video/mp4" />
      </head>
      <body
        className={`${geist.variable} ${newsreader.variable} ${lexsimsFont.variable} antialiased bg-cream text-text-primary`}
      >
        {children}
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
