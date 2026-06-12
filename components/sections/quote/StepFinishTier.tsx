import Image from "next/image";
import { finishTierCards } from "@/data/finishTiers";
import type { FinishTier } from "@/lib/pricing";
import { Button } from "@/components/ui/button";

export function StepFinishTier({
  onSelect,
  onBack,
}: {
  onSelect: (tier: FinishTier) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl font-light text-obsidian sm:text-4xl">Choose your finish tier</h1>
      <div className="mt-8 space-y-4 sm:mt-10">
        {finishTierCards.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => onSelect(tier.id)}
            className="flex w-full gap-4 rounded-sm border border-hairline bg-white p-4 text-left transition-all hover:border-champagne/60 hover:-translate-y-0.5"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm sm:h-24 sm:w-24">
              <Image src={tier.image} alt="" fill className="object-cover" sizes="96px" />
            </div>
            <div>
              <p className="font-display text-xl text-obsidian">{tier.title}</p>
              <p className="tabular-nums text-sm text-champagne">{tier.priceRange}</p>
              <p className="mt-1 text-sm text-graphite">{tier.description}</p>
              <p className="mt-2 text-xs text-smoke">Best for: {tier.bestFor}</p>
            </div>
          </button>
        ))}
      </div>
      <Button onClick={onBack} className="btn-secondary mt-8">
        Back
      </Button>
    </div>
  );
}
