import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Event 21 | Luxury Event Planning, Styling & Gifts by Adeola | Lagos, Nigeria",
  description:
    "Boutique event planning, styling, and coordination studio based in Lagos, Nigeria. Specializing in luxury weddings, traditional engagements, milestone celebrations, and curated gifting by Gifts by Adeola.",
  keywords: [
    "Event 21",
    "Gifts by Adeola",
    "Lagos event planner",
    "Nigerian luxury wedding planner",
    "Yoruba wedding coordinator",
    "Wedding decor Lagos",
    "Corporate event management Nigeria",
    "Bespoke event styling",
  ],
  openGraph: {
    title: "Event 21 | Beautifully Planned. Unforgettable Moments.",
    description:
      "Bespoke event planning and coordination studio based in Lagos, Nigeria. Discover our portfolio and Gifts by Adeola.",
    url: "https://events21.ng",
    siteName: "Event 21",
    images: [
      {
        url: "/images/ballroom-first-dance.jpg",
        width: 1200,
        height: 630,
        alt: "Event 21 Luxury Ballroom First Dance",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-brand-warm-white text-brand-plum antialiased selection:bg-brand-soft-lavender selection:text-brand-purple">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
