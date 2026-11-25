import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/albert-sans-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const serif = localFont({
  src: [
    { path: "./fonts/crimson-pro-latin-wght-normal.woff2", style: "normal" },
    { path: "./fonts/crimson-pro-latin-wght-italic.woff2", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  weight: "200 900",
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
  title: "Vesper — The day, wrapped up before you leave.",
  description:
    "An imagined end-of-day digest for teams: what shipped, what is stuck and what is due tomorrow, on one short page sent at six.",
  metadataBase: new URL("https://vesper-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#12112a",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
