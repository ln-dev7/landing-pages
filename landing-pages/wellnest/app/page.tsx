import { HeroSection } from "@/components/hero-section";
import { PartnersBanner } from "@/components/partners-banner";
import { KeyFeaturesSection } from "@/components/key-features-section";
import { TeamBannerSection } from "@/components/team-banner-section";
import { AdaptsSection } from "@/components/adapts-section";
import { FAQSection } from "@/components/faq-section";
import { CTAFooterSection } from "@/components/cta-footer-section";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col justify-start bg-black">
      <HeroSection />
      <PartnersBanner />
      <KeyFeaturesSection />
      <TeamBannerSection />
      <AdaptsSection />
      <FAQSection />
      <CTAFooterSection />
    </main>
  );
}
