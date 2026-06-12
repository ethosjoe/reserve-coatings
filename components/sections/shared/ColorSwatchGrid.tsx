"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { colors, type ColorFinish } from "@/data/colors";
import type { FinishTier } from "@/lib/pricing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ColorSwatchGrid({ tier }: { tier?: FinishTier }) {
  const [selected, setSelected] = useState<ColorFinish | null>(null);
  const filtered = tier ? colors.filter((c) => c.tier === tier) : colors;

  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {filtered.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => setSelected(color)}
            className="text-center"
          >
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border border-hairline md:h-40 md:w-40">
              <Image src={color.image} alt={color.name} fill className="object-cover" sizes="160px" />
            </div>
            <p className="mt-3 text-sm text-obsidian">{color.name}</p>
          </button>
        ))}
      </div>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-bone">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-light">
                  {selected.name}
                </DialogTitle>
              </DialogHeader>
              <div className="relative aspect-square max-h-64 overflow-hidden rounded-sm">
                <Image src={selected.image} alt="" fill className="object-cover" />
              </div>
              <p className="text-sm text-smoke">Palette: {selected.palette.join(", ")}</p>
              <p className="text-sm text-graphite">Best for: {selected.recommendedFor}</p>
              <Button asChild className="btn-primary">
                <Link href={`/quote?tier=${selected.tier}`}>Add to my Quote</Link>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
