import Link from "next/link";
import { featuredCities } from "@/data/cities";

export function ServiceAreaStrip() {
  return (
    <section className="border-y border-hairline bg-white py-14">
      <div className="mx-auto max-w-content px-6 text-center">
        <p className="eyebrow">Metro Detroit</p>
        <h2 className="mt-3 font-display text-2xl font-light text-obsidian md:text-3xl">
          Serving Oakland, Livingston & Washtenaw counties
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {featuredCities.map((city) => (
            <span
              key={city}
              className="rounded-full border border-hairline bg-bone px-4 py-1.5 text-xs text-graphite"
            >
              {city}
            </span>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-champagne/50 px-4 py-1.5 text-xs text-champagne transition-colors hover:bg-champagne/10"
          >
            + 30 more communities
          </Link>
        </div>
      </div>
    </section>
  );
}
