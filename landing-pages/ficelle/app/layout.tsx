import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { SiteFooter } from "@/components/colis/site-footer"
import { SiteHeader } from "@/components/colis/site-header"
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

/* Archivo variable : graisse 100 à 900, chasse 62 % à 125 % */
const archivo = localFont({
  src: [
    {
      path: "./fonts/archivo-latin-standard-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/archivo-latin-standard-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-archivo",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
})

/* IBM Plex Mono : uniquement les champs d'étiquette, le ticket et le suivi */
const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-mono-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-plex",
  display: "swap",
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
    default: "Ficelle, gifts tied up and delivered in Bellmere",
    template: "%s | Ficelle",
  },
  description: site.description,
  applicationName: "Ficelle",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ficelle",
    url: site.url,
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: "#c39c68",
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ficelle",
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
  areaServed: "Bellmere, Oregon, and 15 miles around",
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
      className={cn("antialiased", archivo.variable, plexMono.variable)}
    >
      <body>
        {/* Filtre partagé : bords tremblés de l'encre des tampons */}
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          className="absolute"
        >
          <filter id="ink-rough" x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
        <a
          href="#contenu"
          className="sr-only z-[60] rounded-[3px] bg-ink px-4 py-2.5 text-sm font-semibold text-cream focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <div className="overflow-x-clip">
          <SiteHeader />
          <main id="contenu" className="relative">
            {children}
          </main>
          <SiteFooter />
        </div>
        <RevealOnScroll />
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
