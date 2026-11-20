import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { IllustrationDefs } from "@/components/illustrations/defs"
import { SiteHeader } from "@/components/site-header"
import { MotionObserver } from "@/components/site/motion-observer"
import { site } from "@/lib/site"

const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin-standard-normal.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-bricolage",
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
    default: "Passeline, gifts that cross Wrenhaven by hand",
    template: "%s | Passeline",
  },
  description: site.description,
  applicationName: "Passeline",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Passeline",
    url: site.url,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#D3E9E3",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Passeline",
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
  areaServed: "Wrenhaven, Vermont, and 12 miles around",
  sameAs: [site.appStoreUrl],
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
      className={bricolage.variable}
    >
      <body>
        <IllustrationDefs />
        <SiteHeader />
        {children}
        <MotionObserver />
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
