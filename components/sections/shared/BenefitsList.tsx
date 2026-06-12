import { Check } from "lucide-react";

export function BenefitsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-graphite">
          <Check className="h-5 w-5 shrink-0 text-champagne" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
