"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/layout/ContactForm";
import { IMAGES } from "@/lib/images";

export function ContactSection() {
  return (
    <section className="relative overflow-hidden surface-deep section-pad">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.metallicPour}
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/95 to-obsidian/80" />
      </div>

      <RevealSection
        variant="stagger"
        className="relative mx-auto grid max-w-content gap-12 px-6 lg:grid-cols-5"
        as="div"
      >
        <RevealItem index={0} className="lg:col-span-2">
          <SectionHeading
            eyebrow="GET IN TOUCH"
            eyebrowVariant="accent"
            title="Start with a conversation."
            subtitle="Tell us about your space. We respond to every inquiry within one business day with next steps — usually a photo request or a site walk slot."
            dark
            size="lg"
          />
          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-xl opacity-90 lg:block">
            <Image
              src={IMAGES.metallicPour}
              alt="Reserve flake epoxy pour catching light"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          <p className="mt-4 text-xs text-champagne lg:mt-6">
            Reserve flake system — Rochester Hills, 2026
          </p>
        </RevealItem>

        <RevealItem index={1} className="lg:col-span-3">
          <Card variant="glass" className="md:backdrop-blur-xl">
            <ContactForm formType="homepage" compact />
          </Card>
        </RevealItem>
      </RevealSection>
    </section>
  );
}
