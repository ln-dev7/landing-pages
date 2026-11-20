import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bodoni = localFont({
  src: [
    {
      path: "./fonts/bodoni-moda-latin-standard-normal.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "./fonts/bodoni-moda-latin-standard-italic.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-bodoni",
  display: "swap",
});

const hanken = localFont({
  src: [
    {
      path: "./fonts/hanken-grotesk-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/hanken-grotesk-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MindScript — Train Your Mind Like You Train Your Body",
  description: "High-performance cognitive conditioning, journaling prompts, and expert mental care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable}`}>
      <body className="min-h-screen antialiased bg-[#f6f8f5] text-[#121c17] selection:bg-[#163327] selection:text-white">
        {children}
      </body>
    </html>
  );
}
