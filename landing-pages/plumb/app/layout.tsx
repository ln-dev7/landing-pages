import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin-standard-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: "Plumb — Ask your metrics why they moved.",
  description:
    "An imagined product analytics tool you can question in plain words. Plumb returns the chart, the segment behind it and the cause.",
  metadataBase: new URL("https://plumb-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f4f4f3",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
