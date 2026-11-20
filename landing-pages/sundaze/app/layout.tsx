import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const archivo = localFont({
  src: "./fonts/archivo-latin-standard-normal.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});
const manrope = localFont({
  src: "./fonts/Manrope.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "200 800",
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
  title: "Sundaze — A little salt does a lot of good.",
  description:
    "Good waves. Better company. An imagined surf club for your first wave, your next one, and everything in between.",
  metadataBase: new URL("https://sundaze-lndev.vercel.app"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
