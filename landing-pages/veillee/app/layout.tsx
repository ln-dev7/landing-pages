import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const display = localFont({
  src: [
    {
      path: "./fonts/bodoni-moda-latin-standard-normal.woff2",
      style: "normal",
    },
    {
      path: "./fonts/bodoni-moda-latin-standard-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "./fonts/Manrope.ttf",
  variable: "--font-body",
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
  title: "Veillée — Trust no one. Play together.",
  description:
    "Enter a village of secrets. An immersive, original interpretation of the Werewolf party game.",
  metadataBase: new URL("https://veillee-lndev.vercel.app"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
