import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/hanken-grotesk-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const serif = localFont({
  src: [
    { path: "./fonts/newsreader-latin-opsz-normal.woff2", style: "normal" },
    { path: "./fonts/newsreader-latin-opsz-italic.woff2", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  weight: "200 800",
});
const mono = localFont({
  src: "./fonts/fragment-mono-latin-400-normal.woff2",
  variable: "--font-mono",
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
  title: "Folio — Write it down once. Find it forever.",
  description:
    "An imagined workspace for docs, wikis and project tables, with an assistant that has read every page.",
  metadataBase: new URL("https://folio-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
