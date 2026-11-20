import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const display = localFont({
  src: "./fonts/SpaceGrotesk-Variable.ttf",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

const origin =
  process.env.NEXT_PUBLIC_SITE_URL || "https://umbra-lndev.vercel.app";
const description =
  "An imaginary observatory at the edge of light. Explore an immersive, interactive eclipse through an original three-dimensional world.";

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
  publisher: "Shadcn Pages",
  metadataBase: new URL(origin),
  title: "UMBRA — At the edge of light",
  description,
  applicationName: "UMBRA",
  alternates: { canonical: "/" },
  authors: [{ name: "LN", url: "https://lndev.me" }],
  creator: "LN",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "UMBRA",
    title: "UMBRA — At the edge of light",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "UMBRA — At the edge of light",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080d16",
  colorScheme: "dark",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${mono.variable}`}>
      <body className={display.className}>
        <noscript>
          <style>{`.loading-screen{display:none!important}.observatory-content{visibility:visible!important;opacity:1!important}html:has(.loading-screen),body:has(.loading-screen){overflow:auto!important}.skip{visibility:visible!important}`}</style>
        </noscript>
        <a className="skip" href="#observatory">
          Skip to the observatory
        </a>
        {children}
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
