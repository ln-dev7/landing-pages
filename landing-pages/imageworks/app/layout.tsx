import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSerif = localFont({
  src: "./fonts/instrument-serif.woff2",
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Imageworks — The picture in your head, rendered before lunch",
  description:
    "Image generation for creative teams. Describe the shot, steer it with references and brand rules, and export production-ready files in every size you need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-foreground selection:text-background">
        {children}
      </body>
    </html>
  );
}
