import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-jakarta",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/ibm-plex-mono-latin-400-normal.woff2",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Ostra — Editorial & Fashion Photography Studio",
  description: "Studio Ostra crafts editorial portraits, high-fashion beauty, and timeless visual stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[#0a0a0c] text-white antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
