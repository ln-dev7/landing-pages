import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/bricolage-grotesque-latin-standard-normal.woff2",
  variable: "--font-display",
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
  title: "Knot — One sentence in. A working automation out.",
  description:
    "An imagined AI automation tool. Describe the chore in a sentence and Knot wires your apps, tests the flow and keeps it running.",
  metadataBase: new URL("https://knot-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#f1ecff",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
