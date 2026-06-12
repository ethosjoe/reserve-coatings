import Link from "next/link";
import { RevealSection } from "@/components/ui/reveal-wrapper";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAS } from "@/lib/copy";

export function CtaBand({
  headline,
  buttonLabel = CTAS.quotePrimary,
  buttonHref = "/quote",
}: {
  headline: string;
  buttonLabel?: string;
  buttonHref?: string;
}) {
  return (
    <RevealSection variant="blurUp" className="section-grain surface-deep section-pad text-center">
      <div className="mx-auto flex max-w-content flex-col items-center gap-8 px-6">
        <SectionHeading
          title={headline}
          size="md"
          dark
          align="center"
        />
        <Link href={buttonHref} className="btn-primary">
          {buttonLabel}
        </Link>
      </div>
    </RevealSection>
  );
}
