import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const display = localFont({
  src: "./fonts/DelaGothicOne.ttf",
  variable: "--font-display",
  display: "swap",
});
const body = localFont({
  src: "./fonts/Manrope.ttf",
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  keywords: [
    "shadcn pages",
    "shadcn templates",
    "shadcn/ui landing page",
    "Next.js landing page template",
    "Tailwind CSS landing page",
    "free landing page template",
    "open source",
  ],
  authors: [{ name: "LN", url: "https://lndev.me" }],
  creator: "LN",
  publisher: "Shadcn Pages",
  title: "Oddpress — Perfectly off-register",
  description:
    "An imaginary independent print club. A little ink. A happy accident. Make something wonderfully imperfect.",
  metadataBase: new URL("https://oddpress-lndev.vercel.app"),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
