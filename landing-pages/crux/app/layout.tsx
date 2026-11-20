import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionSetup } from "@/components/motion";
import { brand } from "@/lib/content";
import "./globals.css";
const body = localFont({
  src: "./fonts/SpaceGrotesk[wght].ttf",
  variable: "--font-body",
  display: "swap",
});
const display = localFont({
  src: "./fonts/BarlowCondensed-BlackItalic.ttf",
  variable: "--font-display",
  display: "swap",
  style: "italic",
  weight: "900",
});
const origin = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  keywords: [
    "shadcn pages",
    "shadcn templates",
    "shadcn/ui landing page",
    "Next.js landing page template",
    "Tailwind CSS landing page",
    "free landing page template",
    "open source",
  ],
  authors: [{ name: "LN", url: "https://lndev.me" }],
  creator: "LN",
  publisher: "Shadcn Pages",
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  metadataBase: origin ? new URL(origin) : undefined,
  robots: { index: false, follow: true },
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    type: "website",
    locale: "en_GB",
  },
};
export const viewport: Viewport = { themeColor: "#d9ef48" };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <MotionSetup />
      </body>
    </html>
  );
}
