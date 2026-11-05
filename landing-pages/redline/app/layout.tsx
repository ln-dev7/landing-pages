import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "./fonts/geist-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/geist-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Redline — The reviewer who reads every line.",
  description:
    "An imagined AI code reviewer. Redline studies each change in context, points to what will fail in production and writes the patch you can accept in one click.",
  metadataBase: new URL("https://redline-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f5f2eb",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
