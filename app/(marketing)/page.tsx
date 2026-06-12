import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { InstantQuotePromo } from "@/components/sections/home/InstantQuotePromo";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { ServiceFooterCta } from "@/components/layout/ServiceFooterCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";

const ReserveSystemSection = dynamic(
  () =>
    import("@/components/sections/home/ReserveSystemSection").then((m) => ({
      default: m.ReserveSystemSection,
    }))
);
const ColorPreviewSection = dynamic(
  () =>
    import("@/components/sections/home/ColorPreviewSection").then((m) => ({
      default: m.ColorPreviewSection,
    }))
);
const TransformationGallery = dynamic(
  () =>
    import("@/components/sections/home/TransformationGallery").then((m) => ({
      default: m.TransformationGallery,
    }))
);
const WhyReserveSection = dynamic(
  () =>
    import("@/components/sections/home/WhyReserveSection").then((m) => ({
      default: m.WhyReserveSection,
    }))
);
const ReviewsSection = dynamic(
  () =>
    import("@/components/sections/home/ReviewsSection").then((m) => ({
      default: m.ReviewsSection,
    }))
);
const ContactSection = dynamic(
  () =>
    import("@/components/sections/home/ContactSection").then((m) => ({
      default: m.ContactSection,
    }))
);

export const metadata = buildMetadata({
  title: "Epoxy Floor Coatings Metro Detroit",
  description:
    "Premium epoxy and flake floor coatings. One-day install, lifetime warranty, starting at $995. Bloomfield Hills, Birmingham, Rochester Hills & more.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <HeroSection />
      <InstantQuotePromo />
      <ServicesGrid />
      <ReserveSystemSection />
      <ColorPreviewSection />
      <TransformationGallery />
      <WhyReserveSection />
      <ReviewsSection />
      <ContactSection />
      <ServiceFooterCta
        eyebrow="Metro Detroit's preferred epoxy services"
        headline="The floor your home deserves."
        description="One-day installation, lifetime warranty, and finishes specified for Michigan weather—from Birmingham showrooms to Northville basements. Speak with our team or get your estimate in under a minute."
      />
    </>
  );
}
