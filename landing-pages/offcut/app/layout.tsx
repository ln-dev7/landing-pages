import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion";
import { brand } from "@/lib/content";
import "./globals.css";
const body = localFont({
  src: "./fonts/Manrope[wght].ttf",
  variable: "--font-body",
  display: "swap",
});
const accent = localFont({
  src: "./fonts/Fraunces[SOFT,WONK,opsz,wght].ttf",
  variable: "--font-accent",
  display: "swap",
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
    title: brand.name,
    description: brand.description,
    type: "website",
  },
};
export const viewport: Viewport = { themeColor: "#f7f1df" };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${accent.variable}`}>
      <body>
        <MotionProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
