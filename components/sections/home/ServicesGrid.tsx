import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealSection, RevealItem } from "@/components/ui/reveal-wrapper";
import { Card } from "@/components/ui/card";
import { homeServices } from "@/data/services";
import { cn } from "@/lib/utils";

const gridSpans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
];

export function ServicesGrid() {
  return (
    <RevealSection variant="staggerBlur" className="surface-warm section-pad">
      <div className="mx-auto max-w-content px-6">
        <RevealItem index={0}>
          <SectionHeading
            eyebrow="Our work"
            title="Spaces we transform."
            size="lg"
          />
        </RevealItem>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-8">
          {homeServices.map((service, i) => (
            <RevealItem
              key={service.slug}
              index={i + 1}
              className={cn(gridSpans[i] ?? "")}
            >
              <Link href={service.href} className="group block h-full">
                <Card
                  variant="elevated"
                  size="none"
                  interactive
                  className="h-full overflow-hidden"
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      i === 0 ? "aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[480px]" : "aspect-[4/3]"
                    )}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-slow ease-luxury group-hover:scale-[1.06]"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                    <div className="absolute inset-0 border-2 border-transparent transition-colors duration-base group-hover:border-champagne/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:translate-y-2 lg:transition-transform lg:duration-base lg:ease-luxury lg:group-hover:translate-y-0">
                      <p className="text-eyebrow-muted text-[10px]">{service.eyebrow}</p>
                      <h3 className="mt-1 font-display text-display-sm text-bone">
                        {service.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-bone/70 lg:opacity-0 lg:transition-opacity lg:duration-base lg:group-hover:opacity-100">
                        {service.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-champagne lg:opacity-0 lg:transition-opacity lg:duration-base lg:group-hover:opacity-100">
                        Explore
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
