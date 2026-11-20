import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const display = localFont({
  src: [
    { path: "./fonts/DMSerifDisplay-Regular.ttf", style: "normal" },
    { path: "./fonts/DMSerifDisplay-Italic.ttf", style: "italic" },
  ],
  variable: "--font-display",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/ibm-plex-mono-latin-400-normal.woff2",
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
  title: "Hollow — The house at No. 13",
  description:
    "Some houses remember you. An original, immersive Halloween journey through a house that is expecting one more guest.",
  metadataBase: new URL("https://hollow-lndev.vercel.app"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
