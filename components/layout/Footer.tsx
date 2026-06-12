import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { featuredCities } from "@/data/cities";
import { Logo } from "./Logo";
import { TextMeButton } from "./TextMeButton";

const quickLinks = [
  { href: "/garages", label: "Garages" },
  { href: "/basements", label: "Basements" },
  { href: "/colors", label: "Colors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/quote", label: "Instant Quote" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="surface-deep section-grain">
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo variant="knockout" size="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/70">
              {BRAND.tagline} Premium epoxy and flake systems — installed in one day, backed for life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quote" className="btn-primary text-[10px]">
                Get instant quote
              </Link>
              <TextMeButton variant="footer" />
            </div>
          </div>
          <div>
            <h3 className="text-eyebrow mb-4">Explore</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-bone/80">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-base ease-luxury hover:text-champagne"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-eyebrow mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-bone/80">
              <li>
                <a
                  href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
                  className="transition-colors duration-base ease-luxury hover:text-champagne"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="transition-colors duration-base ease-luxury hover:text-champagne"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>Mon–Fri 9am–6pm · Sat by appointment</li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-bone/50">
              {featuredCities.join(" · ")} and 30+ Metro Detroit communities.
            </p>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-bone/50">
          <p>© 2026 Reserve Coatings LLC. Licensed & insured.</p>
          <p className="flex gap-4">
            <Link href="/process" className="transition-colors duration-base ease-luxury hover:text-champagne">
              Process
            </Link>
            <Link href="/reviews" className="transition-colors duration-base ease-luxury hover:text-champagne">
              Reviews
            </Link>
            <Link href="/blog" className="transition-colors duration-base ease-luxury hover:text-champagne">
              Blog
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
