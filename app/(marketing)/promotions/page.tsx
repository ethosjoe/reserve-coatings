import Image from "next/image";
import Link from "next/link";
import { PageTitleBar } from "@/components/layout/PageTitleBar";
import { PAGE_INTROS } from "@/lib/copy";
import { promotions } from "@/data/promotions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Current Offers",
  description: "Seasonal promotions on garage and basement epoxy floor installations.",
  path: "/promotions",
});

export default function PromotionsPage() {
  return (
    <>
      <PageTitleBar
        eyebrow={PAGE_INTROS.promotions.eyebrow ?? "Offers"}
        title="Current offers"
        subtitle={PAGE_INTROS.promotions.subtitle}
      />
      <section className="section-grain bg-obsidian py-12 text-bone">
        <div className="mx-auto max-w-content px-6 text-center">
          <p className="font-display text-3xl font-light">Limited-time offers for Metro Detroit homeowners.</p>
        </div>
      </section>
      <section className="bg-bone py-16">
        <div className="mx-auto grid max-w-content gap-8 px-6 md:grid-cols-2">
          {promotions.map((promo) => (
            <div key={promo.id} className="overflow-hidden rounded-sm border border-hairline bg-white">
              <div className="relative aspect-video">
                <Image src={promo.image} alt="" fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="eyebrow-gold text-[10px]">{promo.tag}</p>
                <h2 className="mt-2 font-display text-2xl text-obsidian">{promo.title}</h2>
                <p className="mt-3 text-graphite">{promo.description}</p>
                <p className="mt-2 text-xs text-smoke">{promo.terms}</p>
                <Link href="/contact" className="btn-primary mt-6 inline-flex">
                  Claim Offer
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-obsidian py-12 text-center text-bone">
        <p className="font-display text-2xl">Financing as low as $149/month through Hearth.</p>
        <Link href="/financing" className="btn-primary mt-6 inline-flex">
          Apply Now
        </Link>
      </section>
    </>
  );
}
