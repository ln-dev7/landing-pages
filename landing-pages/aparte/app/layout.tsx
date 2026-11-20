import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { SiteFooter } from "@/components/edito/site-footer"
import { SiteHeader } from "@/components/edito/site-header"
import { MotionReveal } from "@/components/site/motion-reveal"
import { motionBootScript } from "@/lib/motion"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

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
  adjustFontFallback: "Times New Roman",
})

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
})

const title = "Aparté: a gift in hand, a note read softly, in Larch Harbor"

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
  title: { default: title, template: "%s | Aparté" },
  description: site.description,
  applicationName: "Aparté",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aparté",
    url: "/",
    title,
    description: site.description,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#fcfcfa",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aparté",
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
  areaServed: "Larch Harbor, WA, and 20 miles around",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", bodoni.variable, hanken.variable)}
      // Le script de démarrage des animations pose data-motion avant React.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>
        <a
          href="#content"
          className="sr-only z-50 bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <MotionReveal />
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
