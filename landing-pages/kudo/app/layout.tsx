import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/inter-tight-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: [
    { path: "./fonts/geist-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/geist-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
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
  title: "Kudo — Get paid by the people who love your work.",
  description:
    "An imagined suite of six apps for creators: tips, memberships, a shop, paid calls, courses and letters, on one page.",
  metadataBase: new URL("https://kudo-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f4f4f3",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
