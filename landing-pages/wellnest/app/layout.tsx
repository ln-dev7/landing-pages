import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const figtree = localFont({
  src: "./fonts/figtree-latin-wght-normal.woff2",
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wellnest — Care for your mental health",
  description:
    "Track every move, analyze your performance, and get real-time coaching, all from your wrist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="min-h-screen bg-[#0a110d] text-white antialiased selection:bg-[#d7f943] selection:text-black">
        {children}
      </body>
    </html>
  );
}
