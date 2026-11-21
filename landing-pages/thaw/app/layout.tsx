import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const syne = localFont({
  src: "./fonts/syne.woff2",
  variable: "--font-syne",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/ibm-plex-mono-latin-400-normal.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXBOT — Autonomous Robotic Intelligence",
  description: "Next-generation interactive autonomous robotic character.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${mono.variable}`}>
      <head>
        <link rel="preload" href="/spline/scene.bin" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/spline/build/runtime.js" as="script" />
      </head>
      <body className="min-h-screen bg-[#e3e3e3] text-[#141518] antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
