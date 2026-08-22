import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Parisienne, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./styles/primitives.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/audio.css";
import "./styles/base-motion.css";
import "./styles/academy.css";
import "./styles/ghost-hover.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getCurrentSeason } from "@/lib/seasons";
import { GOOGLE_MAPS_URL } from "@/lib/site";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const display = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-display", 
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const body = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-body", 
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const hand = Parisienne({
  subsets: ["latin"],
  variable: "--font-hand-raw",
  weight: "400",
  display: "swap",
  preload: true,
});

const narrative = Lora({
  subsets: ["latin"],
  variable: "--font-serif-narrative",
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});
// Site origin for the Schema.org markup (no hardcoded domain).
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Schema.org LocalBusiness structured data (JSON-LD) so search engines can show
 * richer results (knowledge panel, address/opening-hours, deep links).
 */
const schemaOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: "Meenakshi Art Work",
  description:
    "Women-only fine art academy, original paintings and custom art commissions in Saharanpur since 2017.",
  url: siteUrl,
  image: `${siteUrl}/images/hero-home.webp`,
  telephone: "+917017512686",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "H.no.11/280B, Bansal Wali Gali, Pratap Nagar, near Raiwala Market",
    addressLocality: "Saharanpur",
    addressRegion: "Uttar Pradesh",
    postalCode: "247001",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "16:30",
      closes: "17:30",
    },
  ],
  sameAs: [
    "https://wa.me/917017512686",
    GOOGLE_MAPS_URL,
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Meenakshi Oil Painting | Art Academy in Saharanpur", template: "%s | Meenakshi Art Work" },
  description: "Women-only fine art academy, original paintings and custom art commissions in Saharanpur since 2017.",
  keywords: ["oil painting Saharanpur", "art classes for girls Saharanpur", "custom painting", "Meenakshi Art Work"],
  openGraph: {
    title: "Meenakshi Oil Painting",
    description: "Women-only fine art academy, original paintings and custom art commissions in Saharanpur since 2017.",
    siteName: "Meenakshi Art Work",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meenakshi Oil Painting",
    description: "Women-only fine art academy, original paintings and custom art commissions in Saharanpur since 2017.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentSeason = getCurrentSeason();
  
  return (
    <html lang="en" data-season={currentSeason}>
      <head>
        <link rel="dns-prefetch" href="https://assets.pinterest.com" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJsonLd) }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${hand.variable} ${narrative.variable}`}>
        <ErrorBoundary>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
        <ServiceWorkerRegister />
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaMeasurementId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
