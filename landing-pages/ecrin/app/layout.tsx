import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const unbounded = localFont({
  src: "./fonts/unbounded-latin-wght-normal.woff2",
  weight: "200 900",
  style: "normal",
  display: "swap",
  variable: "--font-unbounded",
})

const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-geist",
})

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
  metadataBase: new URL(site.url),
  title: {
    default: "Écrin, gift delivery in Vantry with a note revealed on opening",
    template: "%s | Écrin",
  },
  description: site.description,
  applicationName: "Écrin",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Écrin",
    url: "/",
    title: "Écrin, wrapped in mystery",
    description: site.description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Écrin, wrapped in mystery: a teal gift box with a gold ribbon, topped with a gold sparkle",
      },
    ],
  },
  formatDetection: { telephone: false },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Écrin",
  legalName: site.company.legalName,
  url: site.url,
  logo: `${site.url}/icon.png`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.company.street,
    addressLocality: site.company.city,
    addressRegion: site.company.state,
    postalCode: site.company.zip,
    addressCountry: "US",
  },
  areaServed: "Vantry, Ohio, and 10 miles around",
}

export const viewport: Viewport = {
  themeColor: "#0F2324",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn("antialiased", unbounded.variable, geist.variable)}
    >
      <body>
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="contenu" className="relative">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  )
}
