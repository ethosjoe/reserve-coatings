import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

const siteUrl = BRAND.siteUrl;

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/images/og-default.jpg",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title: `${title} | ${BRAND.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      images: [{ url: `${siteUrl}${image}`, width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.name,
    description: BRAND.tagline,
    telephone: BRAND.phone,
    email: BRAND.email,
    url: siteUrl,
    areaServed: "Metro Detroit",
    priceRange: "$$",
  };
}

export function serviceJsonLd(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "LocalBusiness", name: BRAND.name },
    areaServed: "Metro Detroit",
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
