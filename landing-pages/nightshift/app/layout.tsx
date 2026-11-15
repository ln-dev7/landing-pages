import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pixel = localFont({
  src: "./fonts/vt323-latin-400-normal.woff2",
  variable: "--font-pixel",
  display: "swap",
  weight: "400",
});
const mono = localFont({
  src: [
    { path: "./fonts/space-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/space-mono-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nightshift — You sleep. We take the pager.",
  description:
    "An imagined AI on-call engineer. Nightshift reads the alert, investigates, fixes what your runbooks allow and only wakes a human when it has to.",
  metadataBase: new URL("https://nightshift-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#090a07",
  colorScheme: "dark",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pixel.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
