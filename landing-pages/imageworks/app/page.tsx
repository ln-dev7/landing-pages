import { HeaderNav } from "@/components/header-nav";
import { ImageworksHero } from "@/components/imageworks-hero";
import { BriefSection } from "@/components/brief-section";
import { FeaturesVariations } from "@/components/features-variations";
import { BenchmarksSection } from "@/components/benchmarks-section";
import { FormatsSection } from "@/components/formats-section";
import { StoriesSection } from "@/components/stories-section";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col">
      <HeaderNav />
      <ImageworksHero />
      <BriefSection />
      <FeaturesVariations />
      <BenchmarksSection />
      <FormatsSection />
      <StoriesSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <SiteFooter />
    </main>
  );
}
