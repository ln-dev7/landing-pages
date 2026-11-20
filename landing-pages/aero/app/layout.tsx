import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const space = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  weight: "300 700",
  variable: "--font-space",
  display: "swap",
});
const manrope = localFont({
  src: "./fonts/Manrope.ttf",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});
const origin =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aero-lndev.vercel.app";
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
  metadataBase: new URL(origin),
  title: "AÉRO — A little paper. A lot of elsewhere.",
  description:
    "A playful paper-flight bureau. Fold an idea, follow the currents and launch your own little elsewhere. An original interactive 3D design study by LN.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "AÉRO — A little paper. A lot of elsewhere.",
    description: "An imaginary flight bureau for real daydreamers.",
    url: origin,
    siteName: "AÉRO",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${manrope.variable}`}>
      <body>
        <noscript>
          <style>{`.preflight{display:none!important}.aero-content{visibility:visible!important}html:has(.preflight),body:has(.preflight){overflow:auto!important}.skip{visibility:visible!important}.folding{background:#2046ed!important}.aero-content button,.pilot-card,.flight-nav{display:none!important}.cockpit{min-height:850px!important}.cockpit .chapter-inner{min-height:750px!important}`}</style>
        </noscript>
        <a className="skip" href="#journey">
          Skip to the journey
        </a>
        {children}
        <Toaster theme="light" />
      </body>
    </html>
  );
}
