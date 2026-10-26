import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://events21.ng"),
  title: {
    default: "Events 21 | Luxury Event Planning, Styling & Celebrations | Serving Nationwide & Travel",
    template: "%s | Events 21",
  },
  description:
    "Events 21 (Royalty Twenty One Events) creates thoughtfully planned, beautifully styled celebrations. Professional wedding planning, milestone birthdays, and event styling—serving clients nationwide and available to travel.",
  keywords: [
    "Events 21",
    "Royalty Twenty One Events",
    "Events 21 Nigeria",
    "Events 21 Lagos",
    "Events 21 Ibadan",
    "Adeola Oyeyode",
    "Luxury event planner Nigeria",
    "Wedding planner Lagos",
    "Wedding planner Ibadan",
    "Nigerian luxury wedding planner",
    "Yoruba traditional engagement planner",
    "Aso-oke wedding styling",
    "Milestone birthday event planner",
    "Wedding decoration and event styling",
    "Ballroom wedding styling Lagos",
    "Nationwide destination event planner",
    "Gifts by Adeola",
    "Eru Iyawo packaging Lagos",
    "Executive corporate event planner",
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
  twitter: {
    card: "summary_large_image",
    title: "Events 21 | Regal Event Planning & Luxury Wedding Styling",
    description:
      "Curating Regal Experiences. Orchestrating Royalty. Luxury weddings, milestone celebrations, and bespoke gifting across Nigeria.",
    images: ["/images/landing-couple-traditional.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/royalty-logo-transparent.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/images/royalty-logo-transparent.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/images/royalty-logo-transparent.png",
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
    <html lang="en" className={`${cormorant.variable} ${plusJakartaSans.variable}`}>
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
