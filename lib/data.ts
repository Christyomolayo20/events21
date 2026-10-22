import { EventEnquiry, GiftItem, GiftRequest, PortfolioItem, ServiceItem } from "./types";

export const BRAND_CONFIG = {
  name: "Event 21",
  subBrand: "Gifts by Adeola",
  tagline: "Beautifully Planned. Unforgettable Moments.",
  description:
    "A boutique event planning, styling, and coordination studio based in Lagos, Nigeria. Crafting bespoke celebrations with refined elegance and effortless execution.",
  instagramUrl: "https://www.instagram.com/events_21/",
  instagramHandle: "@events_21",
  phone: "+234 812 345 6789",
  whatsappNumber: "2348123456789", // international format for wa.me
  email: "hello@events21.ng",
  location: "Lagos, Nigeria",
  openingHours: "Mon – Sat: 9:00 AM – 6:00 PM (By Appointment)",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "full-planning",
    title: "Full-Service Event Planning",
    tagline: "From First Concept to Last Farewell",
    description:
      "A complete, end-to-end management experience designed for discerning hosts. We handle budget formulation, vetted vendor sourcing, contract negotiations, guest management, and total execution.",
    image: "/images/ballroom-first-dance.jpg",
    inclusions: [
      "Dedicated senior event planner & management team",
      "Comprehensive budget allocation & tracking",
      "Curated vendor sourcing, vetting & contract negotiation",
      "Detailed master production timeline & spatial design",
      "RSVP tracking and guest concierge coordination",
      "Full day-of on-site execution with zero client stress",
    ],
    suitableFor: "Luxury weddings, multi-day celebrations, and large-scale galas.",
  },
  {
    id: "wedding-design",
    title: "Luxury Wedding Planning & Styling",
    tagline: "Timeless Romance, Thoughtfully Curated",
    description:
      "Specialized curation for contemporary and traditional Nigerian weddings. We blend cultural heritage with high-fashion aesthetic, bespoke floral installations, and dramatic ambient lighting.",
    image: "/images/the-kayodes-white-wedding.jpg",
    inclusions: [
      "Custom mood boards, colour palettes & design deck",
      "Stage, altar, and head-table floral architecture",
      "Bridal party timeline & backstage coordination",
      "Traditional engagement protocols & coordination",
      "First dance special effects (low fog, cold sparks, pyrotechnics)",
      "Rehearsal management and bridal attendant service",
    ],
    suitableFor: "Couples desiring a deeply personal, visually breathtaking wedding.",
  },
  {
    id: "day-coordination",
    title: "Event Coordination & Management",
    tagline: "Flawless Execution on Your Big Day",
    description:
      "For hosts who have already selected their vendors and venue but need seasoned professionals to run the day. We step in weeks prior to verify contracts, build schedules, and direct every moving part.",
    image: "/images/the-kayodes-traditional.jpg",
    inclusions: [
      "Vendor handoff & contract review 4–6 weeks prior",
      "Creation of the minute-by-minute day-of itinerary",
      "Vendor call-sheets and delivery schedule supervision",
      "On-site lead coordinator and assistant coordinators",
      "Emergency bridal / host toolkit and crisis handling",
      "Post-event breakdown and vendor reconciliations",
    ],
    suitableFor: "Hosts who planned their event but want to be fully present guests.",
  },
  {
    id: "corporate-events",
    title: "Corporate Events & Brand Activations",
    tagline: "Polished, Impactful, Brand-Aligned",
    description:
      "Professional production for corporate galas, product launches, executive retreats, and annual banquets. We prioritize seamless timing, elevated hospitality, and brand storytelling.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Brand alignment and immersive spatial aesthetics",
      "Audiovisual, stage engineering, and lighting direction",
      "VIP & dignitary protocol management",
      "Corporate gifting integration via Gifts by Adeola",
      "Catering quality control and guest flow logistics",
      "Comprehensive post-event debrief and media asset coordination",
    ],
    suitableFor: "Brands, corporate institutions, and executive dinner organizers.",
  },
  {
    id: "social-celebrations",
    title: "Milestone Birthdays & Private Soirées",
    tagline: "Memorable Gatherings with Distinct Personality",
    description:
      "From intimate 30th, 40th, and 50th milestone dinners to garden luncheons and romantic anniversary celebrations. Every gathering is tailored to reflect the celebrant's unique taste.",
    image: "/images/the-kayodes-portrait.jpg",
    inclusions: [
      "Thematic concept development and tablescape artistry",
      "Custom stationery, place cards, and personalized menus",
      "Specialty bar, mixology, and chef curation",
      "Live acoustic, saxophone, or DJ entertainment curation",
      "Ambient lighting and bespoke photo-moment backdrops",
      "Seamless guest greeting and hospitality hostessing",
    ],
    suitableFor: "Milestone anniversaries, intimate birthday dinners, and private parties.",
  },
  {
    id: "gifting-concierge",
    title: "Gifts by Adeola Concierge",
    tagline: "Bespoke Celebratory & Bridal Gifting",
    description:
      "Our dedicated gifting division curates elevated celebration boxes, bridal party hampers, VIP guest favours, and corporate appreciation boxes with personalized touches.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    inclusions: [
      "Curated luxury gift hampers with keepsake packaging",
      "Bridesmaid and groomsmen proposal gift suites",
      "Event souvenir & VIP guest welcome boxes",
      "Custom branded ribbon, wax seals & calligraphy notes",
      "Safe, timed hand-delivery across Lagos and nationwide courier",
      "Direct WhatsApp concierge consultation",
    ],
    suitableFor: "Event hosts, corporate gifting managers, and thoughtful gift givers.",
  },
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "the-kayodes-traditional",
    title: "The Kayodes: A Regal Yoruba Wedding",
    subtitle: "A vibrant celebration of Yoruba culture, rich royal wine aso-oke, and timeless heritage.",
    category: "Traditional",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/the-kayodes-traditional.jpg",
    featured: true,
    description:
      "A breathtaking traditional engagement celebrating the union of The Kayodes. Featuring intricately embroidered wine and gold aso-oke, regal ceremonial staffs, coordinated family attire, and traditional Yoruba wedding customs seamlessly coordinated by Event 21.",
    highlights: [
      "Full cultural protocol coordination",
      "Custom burgundy and gold aesthetic",
      "Regal couple styling & heirloom beadwork",
      "Traditional live percussion and Alaga coordination",
    ],
    gallery: [
      "/images/the-kayodes-traditional.jpg",
      "/images/the-kayodes-portrait.jpg",
    ],
  },
  {
    id: "the-kayodes-white-wedding",
    title: "The Kayodes: An Enchanting White Wedding",
    subtitle: "Classic monochrome sophistication, delicate bridal lace, and profound romance.",
    category: "Weddings",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/the-kayodes-white-wedding.jpg",
    featured: true,
    description:
      "An ethereal white wedding characterized by timeless romance. The groom's tailored white tuxedo paired harmoniously with the bride's exquisite high-neck beaded lace gown. Event 21 ensured every movement flowed effortlessly from the morning preparations to the vows.",
    highlights: [
      "Comprehensive bridal concierge & timeline",
      "Contemporary luxury editorial photography styling",
      "Seamless transition from ceremony to reception",
      "Curated bridal suite gifting by Gifts by Adeola",
    ],
    gallery: [
      "/images/the-kayodes-white-wedding.jpg",
      "/images/the-kayodes-portrait.jpg",
      "/images/ballroom-first-dance.jpg",
    ],
  },
  {
    id: "ballroom-first-dance",
    title: "The Ballroom Symphony: Sparklers & Low Fog",
    subtitle: "An unforgettable first dance enveloped in dancing clouds, cold fireworks, and crystal chandeliers.",
    category: "Ballrooms & Decor",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/ballroom-first-dance.jpg",
    featured: true,
    description:
      "The pinnacle reception moment: a dramatic first dance in heavy low fog, illuminated by cascading crystal icicles, burgundy ceiling drapery, and indoor cold pyrotechnics that created an awe-inspiring visual spectacle for guests.",
    highlights: [
      "Precision low-fog dry ice machine synchronization",
      "Indoor safe cold-spark fountain effects",
      "Architectural ceiling drapery in rich wine velveteen",
      "Bespoke tiered cake staging & floral riser",
    ],
    gallery: [
      "/images/ballroom-first-dance.jpg",
      "/images/the-kayodes-white-wedding.jpg",
    ],
  },
  {
    id: "the-kayodes-editorial-portrait",
    title: "The Kayodes: Modern Fine Art Portraiture",
    subtitle: "Minimalist, high-fashion pre-wedding styling highlighting subtle elegance and timeless grace.",
    category: "Weddings",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/the-kayodes-portrait.jpg",
    featured: false,
    description:
      "An editorial studio session capturing genuine intimacy, pearl embellishments, and classic styling. Styled to reflect the couple's personal aesthetic ahead of their grand celebrations.",
    highlights: [
      "Studio art direction and mood board",
      "Pearl detail styling & jewelry curation",
      "Editorial lighting guidance",
    ],
    gallery: ["/images/the-kayodes-portrait.jpg"],
  },
  {
    id: "candlelit-gala-tablescape",
    title: "The Golden Hour Gala: Tablescape Artistry",
    subtitle: "Warm amber candlelight, delicate crystal stemware, and lush botanical centerpieces.",
    category: "Ballrooms & Decor",
    year: "2024",
    location: "Victoria Island, Lagos",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description:
      "A grand celebratory dinner featuring continuous banquet tables adorned with tapered candles in brass holders, seasonal floral blooms, and gold-rimmed glassware designed to foster connection.",
    highlights: [
      "Custom tapered candle lighting architecture",
      "Textured linen runners & bespoke chargers",
      "Menu card calligraphy & wax seals",
    ],
    gallery: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"],
  },
  {
    id: "milestone-anniversary-soiree",
    title: "The Velvet Soirée: 50th Milestone Dinner",
    subtitle: "An intimate gathering celebrating five decades of love, curated with personal stories and music.",
    category: "Celebrations",
    year: "2023",
    location: "Ikoyi, Lagos",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description:
      "An exclusive private dinner for 60 close family and friends. Features customized cocktail pairings, a live acoustic trio, and bespoke welcome gifts presented to each guest.",
    highlights: [
      "Intimate guest flow and customized 4-course menu",
      "Live saxophone and acoustic performance",
      "Personalized favor boxes from Gifts by Adeola",
    ],
    gallery: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80"],
  },
];

export const GIFTS_CATALOGUE: GiftItem[] = [
  {
    id: "luxury-celebration-hamper",
    name: "The Grand Celebration Hamper",
    category: "Celebration",
    price: 85000,
    description:
      "Our signature celebration box featuring premium sparkling wine, artisan chocolate truffles, a hand-poured soy candle, luxury Turkish hand towel, and a handwritten calligraphy card.",
    details: [
      "Premium sparkling wine or non-alcoholic cider bottle",
      "Gourmet artisan chocolate box",
      "Signature French lavender & amber hand-poured candle",
      "Woven keepsake keepsake box with satin ribbon",
      "Custom gold-foil wax sealed note",
    ],
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    popular: true,
    inStock: true,
  },
  {
    id: "bridal-suite-keepsake",
    name: "The Bridal Suite Keepsake Box",
    category: "Bridal Suite",
    price: 58000,
    description:
      "Thoughtfully assembled for the bride or bridesmaid. Includes a personalized silk-blend satin robe, mini celebration prosecco, floral fragrance mist, and bridal compact mirror.",
    details: [
      "Personalized embroidered / monogrammed satin robe",
      "Mini celebration prosecco with gold straw",
      "Floral rosewater hydrating mist",
      "Pearl hair clip & compact vanity mirror",
      "Blush pink velvet-lined gift box",
    ],
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    popular: true,
    inStock: true,
  },
  {
    id: "executive-gentlemans-box",
    name: "The Executive Gentleman's Curation",
    category: "Corporate",
    price: 65000,
    description:
      "A tailored masculine gift set featuring a genuine leather journal, weighted matte black metal pen, single-origin artisanal coffee blend, and 70% dark cocoa bar.",
    details: [
      "A5 bound leather executive journal",
      "Weighted brass rollerball pen with refill",
      "Craft roast whole bean or ground coffee blend",
      "Artisan single-origin dark chocolate tablet",
      "Matte plum presentation box with magnetic close",
    ],
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    popular: false,
    inStock: true,
  },
  {
    id: "velvet-milestone-diffuser",
    name: "The Velvet Ambient Glow Box",
    category: "Milestones",
    price: 48000,
    description:
      "Designed to elevate any home sanctuary. Includes a luxury ceramic reed diffuser with essential botanical oils, crystal rocks glass, scented wax melts, and ambient matches.",
    details: [
      "150ml luxury ceramic reed diffuser (Wild Fig & Cassis)",
      "Cut crystal rocks drinking glass",
      "Long luxury safety matches in glass apothecary bottle",
      "Handmade vanilla bean shortbread treats",
      "Soft blush keepsake rigid box",
    ],
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=800&q=80",
    popular: false,
    inStock: true,
  },
  {
    id: "celebration-toast-box",
    name: "The Golden Toast Duo",
    category: "Celebration",
    price: 42000,
    description:
      "The perfect accompaniment for congratulations, promotions, and housewarmings. Includes twin gold-rimmed crystal flutes, artisan caramel popcorn, and celebratory sparkle.",
    details: [
      "Pair of hand-blown gold-rimmed crystal champagne flutes",
      "Gourmet sea salt caramel popcorn jar",
      "Celebratory metallic gold party poppers",
      "Custom printed congratulatory card",
    ],
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
    popular: false,
    inStock: true,
  },
  {
    id: "bespoke-custom-curation",
    name: "Bespoke Custom Gifting Concierge",
    category: "Bespoke",
    price: 50000, // starting price
    description:
      "Work directly with Adeola to design completely customized gift boxes for your wedding guests, bridal party, corporate clients, or VIP attendees. Tailored to your exact budget and aesthetic.",
    details: [
      "1-on-1 WhatsApp consultation to finalize theme and items",
      "Bespoke packaging, ribbon colour matching & custom branding",
      "Bulk pricing discounts for orders over 15 units",
      "Scheduled white-glove delivery to event venue or doorstep",
    ],
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    popular: true,
    inStock: true,
  },
];

export const INITIAL_ENQUIRIES: EventEnquiry[] = [
  {
    id: "enq-101",
    fullName: "Tolulope & Babatunde Adeleke",
    email: "t.adeleke@gmail.com",
    phone: "+234 803 234 5678",
    eventType: "Wedding",
    eventDate: "2026-11-28",
    eventLocation: "Eko Hotel Convention Centre, Victoria Island, Lagos",
    guestCount: "450 guests",
    budgetRange: "₦15M – ₦25M",
    message:
      "We loved the ballroom and traditional wedding setup for The Kayodes! We are planning a combined traditional engagement and white wedding reception in November. Need full planning and coordination.",
    status: "New",
    createdAt: "2026-10-21T14:32:00Z",
    notes: "Interested in the low fog & sparkler first dance package.",
  },
  {
    id: "enq-102",
    fullName: "Dr. Olayinka Soyinka",
    email: "olayinka.s@healthcorp.ng",
    phone: "+234 802 888 1234",
    eventType: "Milestone Birthday",
    eventDate: "2026-12-15",
    eventLocation: "Private Residence, Banana Island, Lagos",
    guestCount: "80 guests",
    budgetRange: "₦5M – ₦10M",
    message:
      "Planning my wife's surprise 40th birthday dinner. We want an intimate, candlelit outdoor dinner with live saxophone and curated return gifts from Gifts by Adeola.",
    status: "Contacted",
    createdAt: "2026-10-20T09:15:00Z",
    notes: "Initial consultation held via WhatsApp. Sent mood board draft.",
  },
  {
    id: "enq-103",
    fullName: "Zenith Capital Partners (Attn: Folake Balogun)",
    email: "folake.b@zenithcapital.com",
    phone: "+234 818 555 4321",
    eventType: "Corporate Event & Gala",
    eventDate: "2026-12-18",
    eventLocation: "The Civic Centre, Victoria Island, Lagos",
    guestCount: "250 guests",
    budgetRange: "₦25M+",
    message:
      "Annual End of Year Gala & Executive Awards. Requires stage production, LED screens, floral head tables, and 120 executive VIP gift hampers for high-net-worth clients.",
    status: "In Review",
    createdAt: "2026-10-19T11:45:00Z",
    notes: "Proposal deck submitted. Awaiting board budget sign-off.",
  },
];

export const INITIAL_GIFT_REQUESTS: GiftRequest[] = [
  {
    id: "gft-201",
    fullName: "Amaka Eze",
    email: "amaka.eze@outlook.com",
    phone: "+234 809 765 4321",
    recipientName: "Chidimma (Maid of Honour)",
    occasion: "Bridal Party Proposal",
    budget: "₦60,000",
    itemsRequested: "The Bridal Suite Keepsake Box with personalized 'Maid of Honour' robe and mini champagne",
    deliveryDate: "2026-11-05",
    deliveryAddress: "Lekki Phase 1, Lagos",
    personalMessage: "To my best friend since university, I cannot say 'I Do' without you by my side!",
    status: "Sourcing",
    createdAt: "2026-10-21T16:20:00Z",
  },
  {
    id: "gft-202",
    fullName: "Segun Arinze",
    email: "s.arinze@yahoo.com",
    phone: "+234 805 123 9876",
    recipientName: "Mrs. Bunmi Arinze",
    occasion: "10th Wedding Anniversary",
    budget: "₦100,000",
    itemsRequested: "The Grand Celebration Hamper + custom scented diffuser and engraved message",
    deliveryDate: "2026-11-12",
    deliveryAddress: "Magodo Phase 2, Lagos",
    personalMessage: "Happy 10th anniversary my love. Cheers to forever!",
    status: "Pending",
    createdAt: "2026-10-22T08:10:00Z",
  },
];
