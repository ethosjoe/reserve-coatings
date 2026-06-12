import { PageTitleBar } from "@/components/layout/PageTitleBar";
import { PAGE_INTROS } from "@/lib/copy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Financing",
  description: "0% APR financing through Hearth. Apply online in under 60 seconds.",
  path: "/financing",
});

const faqs = [
  {
    question: "Will applying affect my credit?",
    answer: "Hearth uses a soft pull for pre-qualification. A hard pull only occurs if you accept an offer.",
  },
  {
    question: "How long does approval take?",
    answer: "Most homeowners receive a decision in under 60 seconds.",
  },
  {
    question: "What terms are available?",
    answer: "Terms from 12 to 84 months depending on project size and credit profile.",
  },
];

const hearthUrl = process.env.NEXT_PUBLIC_HEARTH_APPLY_URL ?? "https://www.gethearth.com";

export default function FinancingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageTitleBar
        eyebrow={PAGE_INTROS.financing.eyebrow ?? "Financing"}
        title="Financing"
        subtitle={PAGE_INTROS.financing.subtitle}
      />
      <section className="bg-bone py-16">
        <div className="mx-auto max-w-content px-6">
          <h2 className="font-display text-3xl font-light text-obsidian sm:text-4xl">
            Affordable financing through Hearth.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {["Apply online", "Get approved in under 60 seconds", "Start your project"].map((step, i) => (
              <div key={step} className="border-t border-champagne/40 pt-6">
                <span className="font-display text-3xl text-champagne">0{i + 1}</span>
                <p className="mt-4 text-graphite">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="py-3 pr-4">Terms</th>
                  <th className="py-3 pr-4">Example project</th>
                  <th className="py-3">Est. monthly</th>
                </tr>
              </thead>
              <tbody className="text-graphite">
                <tr className="border-b border-hairline">
                  <td className="py-3">12 mo · 0% APR</td>
                  <td className="py-3">$3,500 garage</td>
                  <td className="py-3 tabular-nums">~$292/mo</td>
                </tr>
                <tr className="border-b border-hairline">
                  <td className="py-3">36 mo</td>
                  <td className="py-3">$6,000 basement</td>
                  <td className="py-3 tabular-nums">~$195/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a
            href={hearthUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-10 inline-flex"
          >
            Apply Now →
          </a>
          <Accordion type="single" collapsible className="mt-16">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
