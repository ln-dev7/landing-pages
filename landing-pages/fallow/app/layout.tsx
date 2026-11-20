import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const sans = localFont({
  src: "./fonts/Manrope.ttf",
  variable: "--font-sans",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "./fonts/CormorantGaramond.ttf", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic.ttf", style: "italic" },
  ],
  variable: "--font-serif",
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
  metadataBase: origin ? new URL(origin) : undefined,
  alternates: origin ? { canonical: origin } : undefined,
  title: "FALLOW — A small world, waiting",
  description:
    "An interactive botanical daydream. Wake a seed, follow its roots, and leave something growing.",
  robots: { index: false, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <noscript>
          <style>{`.roots{background:#59414d}.garden-loader{display:none!important}.garden-content{visibility:visible!important}html:has(.garden-loader),body:has(.garden-loader){overflow:auto!important}.skip{visibility:visible!important}`}</style>
        </noscript>
        <a className="skip" href="#story">
          Skip to the story
        </a>
        {children}
        <Toaster theme="light" />
      </body>
    </html>
  );
}
