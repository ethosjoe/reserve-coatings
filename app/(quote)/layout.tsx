import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { TextMeButton } from "@/components/layout/TextMeButton";
import { SiteEngagement } from "@/components/layout/SiteEngagement";

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bone pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0">
      <header className="hairline-gold border-b bg-bone py-4">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 sm:px-6">
          <Logo variant="primary" size="nav" />
          <div className="flex items-center gap-3">
            <TextMeButton variant="nav" />
            <Link href="/" className="text-xs uppercase tracking-widest text-smoke hover:text-champagne">
              Exit quote
            </Link>
          </div>
        </div>
      </header>
      {children}
      <MobileNav />
      <SiteEngagement />
    </div>
  );
}
