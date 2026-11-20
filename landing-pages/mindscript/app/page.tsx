import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { HowWeHelpSection } from "@/components/how-we-help-section";
import { JournalPromptsSection } from "@/components/journal-prompts-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactFooterSection } from "@/components/contact-footer-section";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-start">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <HowWeHelpSection />
      <JournalPromptsSection />
      <TestimonialsSection />
      <ContactFooterSection />
    </main>
  );
}
