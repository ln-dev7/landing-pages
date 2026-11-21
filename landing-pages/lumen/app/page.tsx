import { HeaderNav } from "@/components/header-nav";
import { HeroSection } from "@/components/hero-section";
import { ValuePropSection } from "@/components/value-prop-section";
import { ProductSection } from "@/components/product-section";
import { PillarsSection } from "@/components/pillars-section";
import { PartnersSection } from "@/components/partners-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { FinalCtaSection } from "@/components/final-cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <HeaderNav />
      <HeroSection />
      <ValuePropSection />
      <ProductSection />
      <PillarsSection />
      <PartnersSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
      <SiteFooter />
    </main>
  );
}
