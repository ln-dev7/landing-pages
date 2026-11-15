import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/schibsted-grotesk-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "400 900",
});
const mono = localFont({
  src: "./fonts/martian-mono-latin-standard-normal.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: "Tally — Receipts in. Taxes sorted.",
  description:
    "An imagined AI bookkeeper for freelancers. Tally reads every receipt, matches it to your bank, books it and tells you what to set aside for tax.",
  metadataBase: new URL("https://tally-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
