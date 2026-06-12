import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { LuxuryLoadingProvider } from "@/components/layout/LuxuryLoadingProvider";
import { BRAND, LOGOS } from "@/lib/brand";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0B0C",
};

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Premium epoxy and flake floor coatings for Metro Detroit. One-day installation, lifetime warranty, starting at $995.",
  metadataBase: new URL(BRAND.siteUrl),
  icons: {
    icon: LOGOS.mark,
    apple: LOGOS.mark,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <NuqsAdapter>
          <Suspense fallback={null}>
            <LuxuryLoadingProvider>{children}</LuxuryLoadingProvider>
          </Suspense>
        </NuqsAdapter>
      </body>
    </html>
  );
}
