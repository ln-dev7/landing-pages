import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: "./fonts/bricolage-grotesque-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "200 800",
});
const mono = localFont({
  src: [
    { path: "./fonts/dm-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/dm-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mesa — Fill every table, every single night.",
  description:
    "An imagined suite of six apps for independent restaurants: bookings, a waitlist, pickup orders, a stamp card, reviews and gift cards.",
  metadataBase: new URL("https://mesa-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f6f1ea",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
