import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/reddit-sans-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "200 900",
});
const serif = localFont({
  src: "./fonts/hedvig-letters-serif-latin-400-normal.woff2",
  variable: "--font-serif",
  display: "swap",
  weight: "400",
});

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
  title: "Tenth — Spend what's yours. The rest is already set aside.",
  description:
    "An imagined card for freelancers: every payment is split the moment it lands, so tax is set aside before you can spend it.",
  metadataBase: new URL("https://tenth-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f6eef4",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
