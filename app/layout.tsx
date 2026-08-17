import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { site } from "@/lib/site";
import { photo } from "@/lib/images";

/* latin-ext je nutný kvôli slovenskej diakritike (č, ť, ž, ĺ, ô) */
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Daviclean | Profesionálne čistenie a tepovanie — Bratislava a okolie",
    template: "%s | Daviclean",
  },
  description:
    "Profesionálne hĺbkové čistenie pre váš domov, auto, kanceláriu aj exteriér. Tepovanie sedačiek, matracov a kobercov, ozónovanie, tlakové čistenie. Bratislava a okolie.",
  keywords: [
    "tepovanie Bratislava",
    "čistenie sedačiek",
    "tepovanie matracov",
    "čistenie kobercov",
    "čistenie interiéru auta",
    "ozónovanie",
    "tlakové čistenie dlažby",
    "odstraňovanie graffiti",
    "upratovanie po stavbe",
  ],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    url: site.url,
    siteName: site.name,
    title: "Daviclean — čistota, ktorá je vidieť",
    description:
      "Hĺbkové čistenie domácností, áut, firiem aj exteriéru. Profesionálna technika, ekologická chémia, rýchly výjazd v Bratislave a okolí.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "180x180" }],
    apple: "/favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  legalName: site.legalName,
  description:
    "Profesionálne hĺbkové čistenie — tepovanie sedačiek, matracov a kobercov, čistenie interiérov áut, ozónovanie, tlakové čistenie a porealizačné upratovanie.",
  url: site.url,
  ...(site.phone ? { telephone: site.phone } : {}),
  email: site.email,
  image: `${site.url}/favicon.png`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.city,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
  areaServed: [
    { "@type": "City", name: "Bratislava" },
    { "@type": "City", name: "Senec" },
    { "@type": "City", name: "Pezinok" },
    { "@type": "City", name: "Malacky" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome drawerImage={photo("drawer")}>{children}</SiteChrome>
      </body>
    </html>
  );
}
