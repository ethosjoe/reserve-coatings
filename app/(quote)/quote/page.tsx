import { Suspense } from "react";
import { QuoteFlow } from "@/components/sections/quote/QuoteFlow";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Instant Quote",
  description:
    "Get your epoxy floor estimate in under 60 seconds. Upload photos, enter square footage, and receive a real price range.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="px-6 py-12 text-smoke">Loading quote tool…</div>}>
      <QuoteFlow />
    </Suspense>
  );
}
