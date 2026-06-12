import { EyebrowLabel } from "./EyebrowLabel";
import { RevealSection } from "@/components/motion/RevealSection";

export function PageTitleBar({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <RevealSection
      as="div"
      variant="fadeIn"
      className="section-grain relative overflow-hidden bg-obsidian"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian to-obsidian/95" aria-hidden />
      <div className="relative mx-auto max-w-content px-6 py-16 text-center md:py-20">
        <EyebrowLabel variant="gold">{eyebrow}</EyebrowLabel>
        <h1 className="mt-4 font-display text-3xl font-light text-bone md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-bone/75 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
        aria-hidden
      />
    </RevealSection>
  );
}
