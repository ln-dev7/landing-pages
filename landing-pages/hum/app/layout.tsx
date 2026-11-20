import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "200 800",
});
const mono = localFont({
  src: "./fonts/spline-sans-mono-latin-wght-normal.woff2",
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
  title: "Hum — Where your team talks it through.",
  description:
    "An imagined team chat with channels, threads, huddles and a catch-up that reads the backlog for you.",
  metadataBase: new URL("https://hum-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f5f4f6",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
