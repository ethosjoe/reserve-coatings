import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/layout/ContactForm";
import { TextMeButton } from "@/components/layout/TextMeButton";
import { Card } from "@/components/ui/card";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { locations } from "@/data/locations";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get a quote, ask a question, or schedule a site visit. Response within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Start a conversation"
        subtitle="We respond to every inquiry within one business day — usually with a photo request or a site walk slot."
        image={IMAGES.metallicPour}
        imageAlt="Reserve flake epoxy finish"
      />
      <RevealSection variant="staggerBlur" className="surface-warm section-pad">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <RevealItem index={0} className="lg:col-span-2">
              <Card variant="elevated">
                <ContactForm formType="contact-page" />
              </Card>
            </RevealItem>
            <RevealItem index={1}>
              <Card variant="elevated" className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="font-display text-display-sm text-obsidian">{locations.name}</h2>
                <p className="mt-2 text-sm text-graphite">{locations.region}</p>
                <p className="mt-6">
                  <a
                    href={`tel:${locations.phone.replace(/\D/g, "")}`}
                    className="text-lg text-obsidian transition-colors duration-base ease-luxury hover:text-champagne"
                  >
                    {locations.phone}
                  </a>
                </p>
                <p className="mt-3">
                  <TextMeButton variant="nav" label="Text me" />
                </p>
                <p className="mt-4">
                  <a
                    href={`mailto:${locations.email}`}
                    className="text-sm text-graphite transition-colors duration-base ease-luxury hover:text-champagne"
                  >
                    {locations.email}
                  </a>
                </p>
                <p className="mt-6 text-sm text-smoke">{locations.hours.weekday}</p>
                <p className="text-sm text-smoke">{locations.hours.saturday}</p>
                <p className="mt-8 border-t border-hairline/60 pt-6 text-sm text-graphite">
                  Prefer a number first?{" "}
                  <Link href="/quote" className="link-gold">
                    Try the instant quote tool
                  </Link>
                </p>
              </Card>
            </RevealItem>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
