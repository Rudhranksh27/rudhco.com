import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rudhco",
  description: "Rudhco Infra & Tech Pvt. Ltd. - Building Your Legacy with Excellence in Construction and Technology.",
  metadataBase: new URL("https://rudhco.com"),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Rudhco",
    description: "Rudhco Infra & Tech Pvt. Ltd. - Building Your Legacy with Excellence in Construction and Technology.",
    url: "https://rudhco.com",
    siteName: "Rudhco",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1730,
        height: 909,
        alt: "Rudhco Infra & Tech Pvt. Ltd. - Your Trust, Our Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudhco",
    description: "Rudhco Infra & Tech Pvt. Ltd. - Building Your Legacy with Excellence in Construction and Technology.",
    images: ["/og-banner.jpg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://rudhco.com/#localbusiness",
  name: "Rudhco Infra & Tech Pvt. Ltd.",
  url: "https://rudhco.com",
  image: "https://rudhco.com/logo.png",
  telephone: "+91-98646-58393",
  email: "business@rudhco.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House No-35, 3rd floor, Panjabari Road, Near Canara Bank, Panjabari Branch",
    addressLocality: "Panjabari",
    postalCode: "781037",
    addressRegion: "Assam",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Guwahati",
    },
    {
      "@type": "AdministrativeArea",
      name: "Assam",
    },
  ],
  priceRange: "$$$",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
