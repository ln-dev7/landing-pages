import { OstraNavbar } from "@/components/ostra-navbar";
import { OstraHero } from "@/components/ostra-hero";
import { OstraAbout } from "@/components/ostra-about";
import { OstraGallery } from "@/components/ostra-gallery";
import { OstraPricing } from "@/components/ostra-pricing";
import { OstraFAQ } from "@/components/ostra-faq";
import { OstraCTA } from "@/components/ostra-cta";
import { OstraFooter } from "@/components/ostra-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white flex flex-col">
      <OstraNavbar />
      <OstraHero />
      <OstraAbout />
      <OstraGallery />
      <OstraPricing />
      <OstraFAQ />
      <OstraCTA />
      <OstraFooter />
    </main>
  );
}
