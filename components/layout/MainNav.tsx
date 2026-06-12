"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, NAV_SERVICES } from "@/lib/brand";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const linkClass =
  "relative text-[11px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-champagne";

export function MainNav({ onDark = false }: { onDark?: boolean }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const text = onDark ? "text-bone/95 hover:text-bone" : "text-obsidian hover:text-obsidian";

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const NavLink = ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const active = isActive(href);
    return (
      <Link href={href} className={cn(linkClass, text, className)}>
        {children}
        {active && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute -bottom-1 left-0 h-px w-full bg-champagne"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </Link>
    );
  };

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
      <div
        className="relative"
        onMouseEnter={() => setServicesOpen(true)}
        onMouseLeave={() => setServicesOpen(false)}
      >
        <button
          type="button"
          className={cn("inline-flex items-center gap-1", linkClass, text)}
          aria-expanded={servicesOpen}
          aria-haspopup="true"
        >
          Services
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-base ease-luxury",
              servicesOpen && "rotate-180"
            )}
          />
        </button>
        {servicesOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-[60] min-w-[240px] pt-2"
          >
            <ul
              className="rounded-lg border border-hairline bg-bone py-2 shadow-card-hover ring-1 ring-obsidian/5"
              role="menu"
            >
              {NAV_SERVICES.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className={cn(
                      "block px-4 py-3 text-sm font-medium text-obsidian transition-colors hover:bg-obsidian/5 hover:text-brushed",
                      isActive(item.href) && "text-brushed"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
      {NAV_LINKS.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export function MobileNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const reduced = usePrefersReducedMotion();

  const content = (
    <>
      <p className="eyebrow-gold mb-2">Services</p>
      {NAV_SERVICES.map((link, i) => (
        <motion.div
          key={link.href}
          variants={reduced ? undefined : fadeUp}
          custom={i}
        >
          <Link
            href={link.href}
            onClick={onNavigate}
            className="block border-b border-champagne/20 py-3 font-display text-xl font-light transition-colors hover:text-champagne"
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
      <p className="eyebrow-gold mb-2 mt-6">Explore</p>
      {NAV_LINKS.map((link, i) => (
        <motion.div key={link.href} variants={reduced ? undefined : fadeUp} custom={i + 4}>
          <Link
            href={link.href}
            onClick={onNavigate}
            className="block border-b border-champagne/20 py-3 font-display text-xl font-light transition-colors hover:text-champagne"
          >
            {link.label}
          </Link>
        </motion.div>
      ))}
      <motion.div variants={reduced ? undefined : fadeUp} custom={8}>
        <Link
          href="/blog"
          onClick={onNavigate}
          className="block border-b border-champagne/20 py-3 font-display text-xl font-light text-bone/70 transition-colors hover:text-champagne"
        >
          Blog
        </Link>
      </motion.div>
    </>
  );

  if (reduced) return <>{content}</>;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      {content}
    </motion.div>
  );
}
