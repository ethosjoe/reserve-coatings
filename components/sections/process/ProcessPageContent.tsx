import Link from "next/link";
import { Check, X } from "lucide-react";
import { EyebrowLabel } from "@/components/layout/EyebrowLabel";
import { RevealSection, RevealItem } from "@/components/motion/RevealSection";
import { ReserveSystemDiagram } from "@/components/sections/shared/ReserveSystemDiagram";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProcessToc, ProcessTocMobile } from "./ProcessToc";
import {
  processOverview,
  processMetrics,
  processJourney,
  installStages,
  processStandards,
  processFaqs,
} from "@/data/process";
import { CTAS } from "@/lib/copy";

/** Full-width intro — no sidebar */
export function ProcessOverviewSection() {
  return (
    <section id="overview" className="scroll-mt-28 surface-warm section-pad">
      <div className="mx-auto max-w-content px-6">
        <RevealSection as="div" variant="fadeUp">
          <div className="max-w-3xl">
            <EyebrowLabel>Installation protocol</EyebrowLabel>
            <h2 className="mt-4 font-display text-3xl font-light text-obsidian md:text-[2.5rem] md:leading-tight">
              {processOverview.headline}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
              {processOverview.subhead}
            </p>
            <Link href="/quote" className="btn-primary mt-8 inline-flex">
              {CTAS.quotePrimary}
            </Link>
          </div>
        </RevealSection>

        <RevealSection
          as="div"
          variant="stagger"
          className="mt-14 grid grid-cols-2 gap-8 border-t border-hairline pt-12 md:grid-cols-4 md:gap-6"
        >
          {processMetrics.map((m, i) => (
            <RevealItem key={m.label} index={i}>
              <p className="font-display text-4xl tabular-nums text-champagne">{m.value}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-smoke leading-snug">
                {m.label}
              </p>
            </RevealItem>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}

/** Full-width timeline */
export function ProcessJourneySection() {
  return (
    <RevealSection
      id="journey"
      className="scroll-mt-28 surface-elevated section-pad section-divider"
    >
      <div className="mx-auto max-w-content px-6">
        <RevealItem>
          <EyebrowLabel variant="gold">End-to-end</EyebrowLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-light text-obsidian md:text-4xl">
            From walk-through to final cure.
          </h2>
          <p className="mt-4 max-w-xl text-graphite">
            Three phases. One accountable crew. No surprises on install day.
          </p>
        </RevealItem>
        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {processJourney.map((block, i) => (
            <RevealItem key={block.phase} index={i + 1}>
              <article className="flex h-full flex-col rounded-sm border border-hairline bg-bone/50 p-6 md:p-8">
                <span className="inline-flex w-fit rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-champagne">
                  {block.phase}
                </span>
                <ul className="mt-6 flex flex-1 flex-col gap-6">
                  {block.steps.map((step) => (
                    <li key={step.title} className="border-t border-hairline/80 pt-6 first:border-t-0 first:pt-0">
                      <h3 className="font-display text-lg text-obsidian">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-graphite">{step.detail}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/** Six stages — pairs with sidebar TOC on desktop */
export function ProcessStagesSection() {
  return (
    <section className="surface-warm section-pad">
      <div className="mx-auto max-w-content px-6">
        <RevealItem>
          <EyebrowLabel>Six stages</EyebrowLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-light text-obsidian md:text-4xl">
            What happens on your slab — in order.
          </h2>
          <p className="mt-4 max-w-xl text-graphite">
            Each stage is documented, timed, and executed by the same in-house crew that scoped your job.
          </p>
        </RevealItem>

        <ProcessTocMobile />

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_240px] xl:gap-16">
          <div className="min-w-0 space-y-0">
            {installStages.map((stage, index) => (
              <article
                key={stage.id}
                id={stage.id}
                className="scroll-mt-32 border-t border-hairline py-12 first:border-t-0 first:pt-0 lg:py-14"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-display text-4xl text-champagne tabular-nums md:text-5xl">
                    {stage.number}
                  </span>
                  {stage.duration && (
                    <span className="text-[10px] uppercase tracking-[0.18em] text-smoke">
                      {stage.duration}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl font-light text-obsidian md:text-3xl">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm font-medium tracking-wide text-champagne">
                  {stage.tagline}
                </p>
                <p className="mt-5 max-w-2xl leading-relaxed text-graphite">{stage.body}</p>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-sm border border-hairline bg-white p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-obsidian">
                      What we execute
                    </p>
                    <ul className="mt-4 space-y-3">
                      {stage.checklist.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-graphite">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-sm border border-champagne/25 bg-champagne/[0.06] p-6">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-champagne">
                      Why it matters
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-graphite">
                      {stage.whyItMatters}
                    </p>
                  </div>
                </div>

                {index < installStages.length - 1 && (
                  <div className="mt-12 hidden h-px bg-gradient-to-r from-champagne/40 via-hairline to-transparent lg:block" aria-hidden />
                )}
              </article>
            ))}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <ProcessToc />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ProcessSystemSection() {
  return (
    <div id="reserve-system" className="scroll-mt-28">
      <ReserveSystemDiagram dark={false} showProcessLink={false} />
    </div>
  );
}

export function ProcessStandardsSection() {
  return (
    <RevealSection
      id="standards"
      className="scroll-mt-28 section-grain surface-deep section-pad"
    >
      <div className="mx-auto max-w-content px-6">
        <RevealItem>
          <EyebrowLabel variant="gold">Standards</EyebrowLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-light text-bone md:text-4xl">
            How Reserve holds every crew accountable.
          </h2>
        </RevealItem>
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <RevealItem index={1}>
            <div className="h-full rounded-sm border border-bone/10 bg-bone/5 p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-champagne/90">
                We never
              </p>
              <ul className="mt-6 space-y-4">
                {processStandards.never.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-bone/85">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-champagne/70" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
          <RevealItem index={2}>
            <div className="h-full rounded-sm border border-champagne/25 bg-champagne/10 p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-champagne">
                We always
              </p>
              <ul className="mt-6 space-y-4">
                {processStandards.always.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-bone/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-champagne" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}

export function ProcessFaqSection() {
  return (
    <RevealSection id="faq" className="scroll-mt-28 surface-warm section-pad">
      <div className="mx-auto max-w-content px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <RevealItem>
            <EyebrowLabel>FAQ</EyebrowLabel>
            <h2 className="mt-4 font-display text-3xl font-light text-obsidian">
              Questions about install day.
            </h2>
            <p className="mt-4 text-graphite">
              Still deciding?{" "}
              <Link href="/contact" className="link-gold">
                Book a consultation
              </Link>{" "}
              or{" "}
              <Link href="/quote" className="link-gold">
                get your estimate
              </Link>
              .
            </p>
          </RevealItem>
          <RevealItem index={1}>
            <Accordion type="single" collapsible className="mt-8 lg:mt-0">
              {processFaqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`faq-${i}`} className="border-hairline">
                  <AccordionTrigger className="py-5 text-left font-display text-lg font-light text-obsidian hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-graphite">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealItem>
        </div>
      </div>
    </RevealSection>
  );
}
