import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "400 700",
});
const serif = localFont({
  src: [
    { path: "./fonts/source-serif-4-latin-opsz-normal.woff2", style: "normal" },
    { path: "./fonts/source-serif-4-latin-opsz-italic.woff2", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  weight: "200 900",
});
const mono = localFont({
  src: "./fonts/red-hat-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "300 700",
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
  title: "Wren — A thinking partner for real work.",
  description:
    "An imagined AI assistant that reads what you share, asks before it assumes and writes alongside you.",
  metadataBase: new URL("https://wren-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
