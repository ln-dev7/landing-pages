import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ShaderVariantProvider } from "@/lib/shader-context";
import { FloatingControls } from "@/components/floating-controls";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumen — Build what matters, ship without limits.",
  description:
    "The all-in-one platform for product teams to design, deploy, and scale software products faster than ever. Plan, build, and ship from one workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-neutral-900 selection:text-white">
        <ShaderVariantProvider>
          {children}
          <FloatingControls />
        </ShaderVariantProvider>
      </body>
    </html>
  );
}
