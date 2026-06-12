import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { SiteEngagement } from "@/components/layout/SiteEngagement";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-[calc(4.25rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileNav />
      <SiteEngagement />
    </div>
  );
}
