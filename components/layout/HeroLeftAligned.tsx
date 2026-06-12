import Image from "next/image";
import Link from "next/link";
import { TrustStrip } from "./TrustStrip";
import { EyebrowLabel } from "./EyebrowLabel";
import { TextMeButton } from "./TextMeButton";

export function HeroLeftAligned({
  eyebrow,
  headline,
  subhead,
  image,
  imageAlt,
  primaryCta = { label: "GET INSTANT QUOTE", href: "/quote" },
  secondaryCta,
  dark = true,
  showTextMe = false,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  image: string;
  imageAlt: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  dark?: boolean;
  showTextMe?: boolean;
}) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-obsidian/30"
            : "bg-gradient-to-t from-bone/90 to-transparent"
        }`}
      />
      {dark && <div id="hero-dark-sentinel" className="pointer-events-none absolute inset-0" aria-hidden />}
      <div className="relative mx-auto flex min-h-[85vh] max-w-content flex-col justify-end px-6 pb-20 pt-32">
        <EyebrowLabel variant="gold">{eyebrow}</EyebrowLabel>
        <h1
          className={`mt-4 max-w-3xl font-display text-4xl font-light leading-tight md:text-6xl lg:text-7xl ${
            dark ? "text-bone" : "text-obsidian"
          }`}
        >
          {headline}
        </h1>
        <p
          className={`mt-6 max-w-xl text-lg ${
            dark ? "text-bone/80" : "text-graphite"
          }`}
        >
          {subhead}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link href={primaryCta.href} className="btn-primary">
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link href={secondaryCta.href} className="link-gold text-bone">
              {secondaryCta.label}
            </Link>
          )}
          {showTextMe && <TextMeButton variant="cta" />}
        </div>
        {dark && (
          <div className="mt-10">
            <TrustStrip />
          </div>
        )}
      </div>
    </section>
  );
}
