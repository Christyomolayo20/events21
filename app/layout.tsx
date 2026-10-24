import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://events21.ng"),
  title: {
    default: "Events 21 | Event Planning, Styling & Celebrations | Ibadan & Lagos",
    template: "%s | Events 21",
  },
  description:
    "Events 21 (Royalty Twenty One Events) creates thoughtfully planned, beautifully styled celebrations. Professional wedding planning, milestone birthdays, and event styling in Ibadan, Lagos, and nationwide.",
  keywords: [
    "Event planners in Ibadan",
    "Wedding planners in Ibadan",
    "Events 21",
    "Royalty Twenty One Events",
    "Event planning and styling",
    "Birthday event planning",
    "Wedding decoration and event styling",
    "Nigerian luxury wedding planner",
    "Yoruba traditional engagement planner",
    "Gifts by Adeola",
  ],
  alternates: {
    canonical: "https://events21.ng",
  },
  openGraph: {
    title: "Events 21 | Thoughtfully Planned. Beautifully Styled.",
    description:
      "Events 21 creates thoughtfully planned, beautifully styled celebrations that turn meaningful moments into lasting memories.",
    url: "https://events21.ng",
    siteName: "Events 21",
    images: [
      {
        url: "/images/landing-couple-traditional.jpg",
        width: 1200,
        height: 630,
        alt: "Events 21 Regal Wedding & Event Styling",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  icons: {
    icon: "/images/events21-logo.jpg",
    apple: "/images/events21-logo.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Events 21 (Royalty Twenty One Events)",
  description:
    "Professional event planning, luxury wedding styling, birthday celebrations, and coordination studio based in Nigeria.",
  url: "https://events21.ng",
  telephone: "+2348060549596",
  email: "Royaltyeventservice@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 12, Johnson Estate, Ojodu Berger",
    addressLocality: "Lagos",
    addressRegion: "Lagos State",
    addressCountry: "NG",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Ibadan",
    },
    {
      "@type": "City",
      name: "Lagos",
    },
    {
      "@type": "Country",
      name: "Nigeria",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/events_21/",
    "https://www.instagram.com/giftsbyadeola/",
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-brand-warm-white text-brand-plum antialiased selection:bg-brand-soft-lavender selection:text-brand-purple">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
