import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const serif = localFont({
  src: [
    {
      path: "./fonts/instrument-serif-latin-400-normal.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/instrument-serif-latin-400-italic.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/figtree-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  title: "Murmur — Every call, answered.",
  description:
    "An imagined AI receptionist for small businesses. Murmur picks up in under a second, books the appointment and texts you the summary.",
  metadataBase: new URL("https://murmur-lndev.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#08090d",
  colorScheme: "dark",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
