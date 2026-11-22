/*
 * Shadcn Pages Pro on the free site. Everything below stays invisible while `live` is false.
 * The day the Pro site opens, set `live: true` and the free site shows, with no other change:
 *   - a "Pro" link in the header (it takes the place of "The idea", like "Community" does),
 *     plus a compact "Pro" pill on mobile;
 *   - the "Need the whole site?" section after the collection, with the covers below;
 *   - a "Full site in Pro" link on every free page listed in `fullSites`;
 *   - a "Shadcn Pages Pro" link in the footer.
 */
window.PRO = {
  live: false,
  name: "Shadcn Pages Pro",
  url: "https://shadcnpages.dev",
  price: { launch: 99, regular: 129 },
  // Free pages that also exist as a complete site in Pro: free slug → Pro template slug.
  fullSites: { keel: "keel", hum: "hum", kudo: "kudo", mesa: "mesa", folio: "folio" },
  // Covers shown in the section, in this order (960×600 images in showcase/pro/).
  showcase: [
    { slug: "conduit", name: "Conduit", niche: "AI agents for operations" },
    { slug: "ostler", name: "Ostler", niche: "Business banking" },
    { slug: "plotline", name: "Plotline", niche: "Product analytics" },
    { slug: "bloop", name: "Bloop", niche: "Form builder" },
    { slug: "bastion", name: "Bastion", niche: "Compliance automation" },
    { slug: "margin", name: "Margin", niche: "AI meeting notes" },
    { slug: "waypoint", name: "Waypoint", niche: "Fleet telematics" },
    { slug: "fader", name: "Fader", niche: "Podcast studio" },
    { slug: "keel", name: "Keel", niche: "Issue tracker" },
    { slug: "hum", name: "Hum", niche: "Team chat" },
    { slug: "folio", name: "Folio", niche: "Docs and wikis" },
    { slug: "kudo", name: "Kudo", niche: "Creator apps" },
    { slug: "mesa", name: "Mesa", niche: "Restaurant apps" },
  ],
};
