import { EventEnquiry, GiftItem, GiftRequest, PortfolioItem, ServiceItem, Testimonial, ConsultationBooking, TeamMember, FounderInfo } from "./types";

export const BRAND_CONFIG = {
  name: "Events 21",
  legalName: "Royalty Twenty One Events",
  subBrand: "Gifts by Adeola",
  tagline: "Curating Regal Experiences. Orchestrating Royalty.",
  description:
    "Events 21 creates thoughtfully planned, beautifully styled celebrations that turn meaningful moments into lasting memories.",
  longDescription:
    "A premier royal event planning and styling brand specialising in weddings, birthdays, celebrations, and memorable gatherings—serving clients nationwide and available to travel.",
  instagramUrl: "https://www.instagram.com/events_21/",
  instagramHandle: "@events_21",
  giftsInstagramUrl: "https://www.instagram.com/giftsbyadeola/",
  giftsInstagramHandle: "@giftsbyadeola",
  phone: "08060549596",
  phoneFormatted: "+234 806 054 9596",
  whatsappNumber: "2348060549596", // International format for wa.me
  email: "Royaltyeventservice@gmail.com",
  address: "No 12, Johnson Estate, Ojodu Berger, Lagos, Nigeria",
  serviceAreas: "Serving clients nationwide and available to travel",
  openingHours: "Mon – Sat: 9:00 AM – 6:00 PM (By Appointment)",
  heroVideoUrl: "/images/hero-video.mp4",
  heroPosterUrl: "/images/hero-poster.jpg",
};


export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "royal-wedding-design",
    title: "Luxury Wedding Planning & Styling",
    tagline: "Timeless Grandeur & Cultural Reverence",
    snippet:
      "Comprehensive curation for contemporary white weddings and traditional engagements with couture florals, lighting, and seamless coordination.",
    description:
      "Bespoke curation for white weddings and traditional engagements. We combine cultural heritage with couture floral architecture, dramatic lighting, and seamless day-of coordination.",
    image: "/images/service-wedding-reception.jpg",
    inclusions: [
      "Custom aesthetic design decks & colour palettes",
      "Head-table floral architecture & stage styling",
      "Special effects (low-fog dry ice & pyrotechnics)",
      "Full bridal concierge & timeline coordination",
    ],
    suitableFor: "Couples desiring a regal, deeply memorable celebration.",
  },
  {
    id: "proposal-planning",
    title: "Romantic Proposal Concepts",
    tagline: "Cinematic Surprise Moments",
    snippet:
      "Intimate and cinematic proposal experiences, from private rooftop setups and candlelight to hidden photography and custom florals.",
    description:
      "Undercover planning, private rooftop or intimate candlelit styling, custom marquee lettering, and hidden photography for an unforgettable beginning.",
    image: "/images/service-proposal-black.jpg",
    inclusions: [
      "Concept formulation & discrete venue scouting",
      "Marquee letters, ambient florals & candlelight",
      "Hidden photographer & videographer pacing",
      "Champagne toast & celebratory styling",
    ],
    suitableFor: "Partners seeking a flawless, romantic marriage proposal.",
  },
  {
    id: "milestone-celebrations",
    title: "Milestones, Birthdays & Galas",
    tagline: "Honoring Lifetime Legacies",
    snippet:
      "Distinguished retirement tribute galas, jubilant milestone birthdays (40th, 50th, 80th), and bespoke private soirees with refined hospitality.",
    description:
      "Distinguished retirement receptions, tribute galas, and lavish jubilee birthdays (40th, 50th, 80th) orchestrated with dignitary protocol and refined hospitality.",
    image: "/images/service-milestone-celebrations.jpg",
    inclusions: [
      "Thematic concept, tablescapes & floral artistry",
      "Legacy tribute staging & photo retrospectives",
      "VIP protocol, guest greeting & entertainment",
      "Custom stationery, place cards & pacing",
    ],
    suitableFor: "Milestone celebrants, retirees, and families marking landmark moments.",
  },
  {
    id: "full-planning",
    title: "Full-Service Event Management",
    tagline: "From Concept to Execution",
    snippet:
      "End-to-end luxury management covering budget formulation, vetted vendor sourcing, master timelines, and total day-of execution.",
    description:
      "End-to-end luxury management covering budget formulation, vetted vendor sourcing, master timelines, and total day-of execution with zero client stress.",
    image: "/images/ballroom-first-dance.jpg",
    inclusions: [
      "Senior event planner & coordination team",
      "Curated vendor sourcing & contract management",
      "Comprehensive master timeline & spatial design",
      "Flawless day-of on-site management",
    ],
    suitableFor: "Discerning hosts seeking complete, stress-free celebration management.",
  },
  {
    id: "gifting-concierge",
    title: "Gifts by Adeola Concierge",
    tagline: "Curated Hampers & Souvenirs",
    snippet:
      "Thoughtful gifts curated on a budget—from branded corporate hampers to VIP event souvenirs delivered nationwide.",
    description:
      "Bespoke gift curation on a budget—from executive corporate hampers and wedding souvenirs to celebration packages delivered nationwide.",
    image: "/images/celebration-gift-hamper.jpg",
    inclusions: [
      "Thoughtfully curated gift hampers for all budgets",
      "Bespoke corporate gifting & staff appreciation",
      "Custom event return souvenirs & keepsake packaging",
      "Doorstep delivery in Lagos and nationwide",
    ],
    suitableFor: "Hosts, corporate teams, and celebrants seeking curated gifts.",
  },
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "regal-yoruba-engagement",
    title: "A Regal Yoruba Wedding Celebration",
    subtitle: "Traditional Yoruba engagement with rich wine aso-oke, heirloom coral beads, and cultural protocol.",
    category: "Weddings",
    year: "2024",
    location: "Ibadan & Lagos",
    image: "/images/landing-couple-traditional.jpg",
    featured: true,
    description:
      "A culturally majestic traditional engagement celebrating sacred union. Featuring intricately tailored royal burgundy and wine aso-oke, layered coral beadwork, family protocol, and bespoke ceremonial coordination by Events 21.",
    highlights: [
      "Traditional Yoruba engagement coordination",
      "Authentic burgundy and wine royal styling",
      "Heirloom coral beads and Gele / Fila curation",
      "Alaga protocol and live percussion direction",
    ],
    gallery: [
      "/images/landing-couple-traditional.jpg",
      "/images/the-kayodes-traditional-couple.jpg",
    ],
  },
  {
    id: "monochrome-editorial-wedding",
    title: "Monochrome Editorial Romance",
    subtitle: "High-fashion black-tie pre-wedding styling with understated modern elegance.",
    category: "Weddings",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/landing-couple-black.jpg",
    featured: true,
    description:
      "A cinematic, high-fashion portrait session defined by textured black couture, intimate connection, and timeless fine-art styling crafted for the contemporary couple.",
    highlights: [
      "Fine-art photography art direction",
      "Contemporary black-tie bridal couture styling",
      "Editorial lighting and intimate pacing",
    ],
    gallery: [
      "/images/landing-couple-black.jpg",
      "/images/landing-couple-white.jpg",
    ],
  },
  {
    id: "white-wedding-intimacy",
    title: "Timeless White Wedding & Bridal Elegance",
    subtitle: "Classic crisp white styling, tender romance, and refined simplicity.",
    category: "Weddings",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/landing-couple-white.jpg",
    featured: true,
    description:
      "Understated luxury and genuine romance. Styled with clean tailoring, elegant white shirts, and an intimate aesthetic celebrating natural connection.",
    highlights: [
      "Minimalist, pure editorial concept",
      "Natural warmth and couple choreography",
      "Pre-wedding styling direction",
    ],
    gallery: [
      "/images/landing-couple-white.jpg",
      "/images/the-kayodes-white-wedding.jpg",
    ],
  },
  {
    id: "golden-80th-milestone",
    title: "The Golden 80th Milestone Celebration",
    subtitle: "Bespoke tablescape artistry, gold scalloped charger plates, and lush botanical centerpieces.",
    category: "Celebrations",
    year: "2024",
    location: "Ibadan, Nigeria",
    image: "/images/decor-tablescape-celebration.jpg",
    featured: true,
    description:
      "An opulent 80th birthday dinner celebration. Featuring chocolate table linens, gold scalloped charger plates, crisp green folded napkins, and bespoke multi-hued rose centerpieces designed to honour an extraordinary milestone.",
    highlights: [
      "Custom gold and green tablescape architecture",
      "Artisanal fresh floral centerpieces",
      "Milestone birthday tribute and dignitary hospitality",
    ],
    gallery: [
      "/images/decor-tablescape-celebration.jpg",
      "/images/milestone-matriarch-celebration.jpg",
    ],
  },
  {
    id: "ballroom-first-dance",
    title: "The Ballroom Symphony: Sparklers & Low Fog",
    subtitle: "An unforgettable first dance enveloped in dancing clouds, cold fireworks, and crystal chandeliers.",
    category: "Decor",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/ballroom-first-dance.jpg",
    featured: true,
    description:
      "The pinnacle reception moment: a dramatic first dance in heavy low fog, illuminated by cascading crystal icicles, burgundy ceiling drapery, and indoor cold pyrotechnics that created an awe-inspiring royal spectacle for guests.",
    highlights: [
      "Precision low-fog dry ice machine synchronization",
      "Indoor safe cold-spark fountain effects",
      "Architectural ceiling drapery in rich wine velveteen",
    ],
    gallery: [
      "/images/ballroom-first-dance.jpg",
    ],
  },
  {
    id: "executive-corporate-gala",
    title: "Executive Annual Gala & Awards",
    subtitle: "Prestigious corporate banquet with royal stage architecture, ambient mood lighting, and VIP protocols.",
    category: "Corporate Events",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/decor-tablescape-celebration.jpg",
    featured: true,
    description:
      "A distinguished annual awards dinner and corporate celebration. Featuring elegant branded stage backdrops, formal banquet seating, dignitary hospitality, and bespoke executive gift boxes curated by Gifts by Adeola.",
    highlights: [
      "Corporate brand integration & stage architecture",
      "Executive dignitary seating & protocol coordination",
      "Curated awards presentation pacing & live instrumentalists",
      "Bespoke branded corporate gifts by Gifts by Adeola",
    ],
    gallery: [
      "/images/decor-tablescape-celebration.jpg",
      "/images/ballroom-first-dance.jpg",
    ],
  },
];

export const GIFTS_CATALOGUE: GiftItem[] = [
  {
    id: "eruiyawo-wrapping-suite",
    name: "Eru Iyawo (Traditional Bridal Presentation)",
    category: "Wrapping of Eru Iyawo",
    price: 75000,
    description:
      "Expert traditional wrapping and aesthetic presentation of the bride's Eru Iyawo engagement gifts. Styled with royal fabrics, lace accents, custom calligraphed tags, satin ribbons, and transparent acrylic display boxes.",
    details: [
      "Complete aesthetic wrapping of 5 to 20+ engagement gift luggage/boxes",
      "Royal colour matching with couple's aso-oke palette",
      "Bespoke ribbon styling, wax seals, and personalized Yoruba tags",
      "Display arrangement and coordination for traditional Alaga presentation",
    ],
    image: "/images/bespoke-gift-curation.jpg",
    popular: true,
    inStock: true,
  },
  {
    id: "celebration-rose-bouquet",
    name: "Luxury Celebration Rose Bouquet",
    category: "Hampers",
    price: 35000,
    description:
      "Hand-tied fresh crimson red velvet roses accented with fresh botanical greens and celebratory wrapping. Perfect for matriculation dances, milestone birthdays, and romantic gestures on a budget.",
    details: [
      "Imported fresh crimson red velvet roses",
      "Fresh green botanical accents & eucalyptus",
      "Crystal clear water-resistant presentation wrapping",
      "Personalized satin ribbon & luxury calligraphy tag",
    ],
    image: "/images/celebration-rose-bouquet.jpg",
    popular: true,
    inStock: true,
  },
  {
    id: "executive-corporate-gifts",
    name: "Corporate Executive Appreciation Box",
    category: "Corporate Gifts",
    price: 45000,
    description:
      "Elevate client relations and staff milestones on a budget. Features a personalized thermal flask, gold keepsake mug, fine executive journal, branded pen, and luxury gift presentation.",
    details: [
      "Insulated gold/rose gold thermal drinkware flask",
      "Gold ceramic coffee & tea keepsake mug",
      "Executive hardcover notebook & weighted metal pen",
      "Luxury rigid keepsake box with crinkle shredding",
      "Custom branding & company logo options available",
    ],
    image: "/images/corporate-gift-box.jpg",
    popular: true,
    inStock: true,
  },
  {
    id: "budget-celebration-hamper",
    name: "The Thoughtful Celebration Hamper",
    category: "Hampers",
    price: 35000,
    description:
      "Thoughtfully curated on a realistic budget. Features premium sparkling celebration wine, artisanal chocolates, scented hand-poured candle, gourmet honey jar, and a handwritten calligraphy card.",
    details: [
      "Sparkling celebration wine bottle with ribbon styling",
      "Artisan box of gourmet chocolate truffles",
      "Handmade soy wax scented relaxation candle",
      "Gift presentation basket with satin ribbon & wax seal",
      "Handwritten personalized calligraphy message",
    ],
    image: "/images/celebration-gift-hamper.jpg",
    popular: true,
    inStock: true,
  },
  {
    id: "event-souvenirs-pack",
    name: "VIP Guest Souvenirs & Keepsake Set",
    category: "Souvenirs",
    price: 25000,
    description:
      "Leave a lasting impression on your event guests. Customized guest souvenir boxes with scented diffusers, gold wax seals, and personalized thank-you calligraphy tokens.",
    details: [
      "Custom branded guest keepsake box with wax seal",
      "50ml luxury scented mini reed diffuser with black reeds",
      "Personalized thank-you acrylic token or torn-edge card",
      "Bulk curation tailored to your guest count & budget tier",
    ],
    image: "/images/vip-event-souvenirs.jpg",
    popular: false,
    inStock: true,
  },
  {
    id: "grand-royalty-hamper",
    name: "The Grand Royalty Celebration Hamper",
    category: "Hampers",
    price: 85000,
    description:
      "Our most opulent gift collection. Premium celebration champagne, twin crystal flutes with gold rims, artisan gold-dusted truffles, luxury diffuser, and royal velvet keepsake trunk.",
    details: [
      "Prestige celebration champagne bottle on silk bedding",
      "Twin gold-rimmed crystal champagne flutes",
      "Royal lavender & botanical reed diffuser",
      "Artisan gold-leaf truffle collection",
      "Rigid velvet-lined keepsake trunk with gold hardware",
    ],
    image: "/images/grand-royalty-hamper.jpg",
    popular: true,
    inStock: true,
  },
  {
    id: "bespoke-budget-curation",
    name: "Custom Gifting on a Budget",
    category: "Bespoke",
    price: 30000,
    description:
      "Tell us your target budget per box or ceremony, and Adeola will personally curate items matching your theme, colour scheme, and celebration requirements.",
    details: [
      "1-on-1 consultation directly via WhatsApp",
      "Flexible product selection matching your exact budget limit",
      "Custom gift boxes, ribbons, wax seals, and calligraphy notes",
      "Doorstep delivery across Lagos, Ibadan, and nationwide",
    ],
    image: "/images/bespoke-gift-curation.jpg",
    popular: true,
    inStock: true,
  },
];

export const INITIAL_ENQUIRIES: EventEnquiry[] = [
  {
    id: "enq-101",
    fullName: "Tolulope & Babatunde Adeleke",
    email: "t.adeleke@gmail.com",
    phone: "08032345678",
    eventType: "Wedding",
    eventDate: "2026-11-28",
    eventLocation: "Eko Hotel Convention Centre, Victoria Island, Lagos",
    guestCount: "450 guests",
    budgetRange: "₦20,000,000",
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
    phone: "08028881234",
    eventType: "Milestone Birthday",
    eventDate: "2026-12-15",
    eventLocation: "Private Residence, Banana Island, Lagos",
    guestCount: "80 guests",
    budgetRange: "₦7,500,000",
    message:
      "Planning my wife's surprise 40th birthday dinner. We want an intimate, candlelit outdoor dinner with live saxophone and curated return gifts from Gifts by Adeola.",
    status: "Contacted",
    createdAt: "2026-10-20T09:15:00Z",
    notes: "Initial consultation held via WhatsApp. Sent mood board draft.",
  },
];

export const INITIAL_GIFT_REQUESTS: GiftRequest[] = [
  {
    id: "gft-201",
    fullName: "Amaka Eze",
    email: "amaka.eze@outlook.com",
    phone: "08097654321",
    recipientName: "Chidimma (Maid of Honour)",
    occasion: "Bridal Party Proposal",
    budget: "₦45,000",
    itemsRequested: "Curated celebration box with personalized robe and mini champagne",
    deliveryDate: "2026-11-05",
    deliveryAddress: "Lekki Phase 1, Lagos",
    personalMessage: "To my best friend since university, I cannot say 'I Do' without you by my side!",
    status: "Sourcing",
    createdAt: "2026-10-21T16:20:00Z",
  },
];

export const DEFAULT_FOUNDER_INFO: FounderInfo = {
  name: "Adeola Oyeyode",
  title: "CEO & Creative Director",
  image: "/images/founder-events21.jpg",
  bio: "Adeola Oyeyode is the founder and visionary leader of Events 21 (Royalty Twenty One Events) and Gifts by Adeola. Guided by a profound passion for design, African culture, and logistical precision, she has orchestrated weddings, milestone jubilees, and VIP galas nationwide and is available to travel.",
  vision: "To create thoughtfully planned, beautifully styled celebrations that turn meaningful moments into lasting memories, allowing every host to be a relaxed guest at their own event.",
};

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "The Production Crew",
    role: "On-Site Staging & Logistics Coordinators",
    image: "/images/about-team-portrait.jpg",
    bio: "Our lead production unit manages vendor coordination, minute-by-minute run-of-show cues, stagecraft, and guest protocol with effortless poise.",
  },
  {
    id: "team-2",
    name: "The Coordination Squad",
    role: "Bridal Concierge & Guest Hospitality",
    image: "/images/about-team-seated.jpg",
    bio: "Attentive stylists and coordinators ensuring seamless bridal party transitions, VIP welcoming, and immaculate table arrangements.",
  },
];

// Client testimonials with uploaded real event photos
export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-bukola-dara",
    clientName: "Bukola & Dara",
    roleOrEvent: "Bride & Groom • Luxury White Wedding",
    text: "Adeola and the Events 21 royal planning team orchestrated our wedding weekend beyond anything we could have ever dreamed. From the ballroom decor to the seamless minute-by-minute coordination, every single moment spoke elegance, peace of mind, and pure royalty.",
    quote: "Adeola and the Events 21 royal planning team orchestrated our wedding weekend beyond anything we could have ever dreamed. From the ballroom decor to the seamless minute-by-minute coordination, every single moment spoke elegance, peace of mind, and pure royalty.",
    rating: 5,
    image: "/images/landing-couple-white.jpg",
    isPublished: true,
    createdAt: "2026-10-15T12:00:00Z",
  },
  {
    id: "testi-the-kayodes",
    clientName: "The Kayodes",
    roleOrEvent: "Traditional Engagement & Grand Reception",
    text: "The traditional ceremony styling, olive velvet risers, and the smooth ballroom first dance transition were immaculate. Our guests who travelled from across Nigeria and abroad are still raving about how regal, hospitable, and intentional everything was.",
    quote: "The traditional ceremony styling, olive velvet risers, and the smooth ballroom first dance transition were immaculate. Our guests who travelled from across Nigeria and abroad are still raving about how regal, hospitable, and intentional everything was.",
    rating: 5,
    image: "/images/the-kayodes-traditional-couple.jpg",
    isPublished: true,
    createdAt: "2026-10-18T14:30:00Z",
  },
  {
    id: "testi-adeleke-jubilee",
    clientName: "Chief Mrs. Adeleke & Family",
    roleOrEvent: "80th Milestone Matriarch Jubilee",
    text: "Planning our mother's 80th milestone birthday celebration with Adeola was effortless. She brought our family's vision to life with majestic tablescapes, royal lighting, and an attentive coordination squad that treated every elder with regal honor.",
    quote: "Planning our mother's 80th milestone birthday celebration with Adeola was effortless. She brought our family's vision to life with majestic tablescapes, royal lighting, and an attentive coordination squad that treated every elder with regal honor.",
    rating: 5,
    image: "/images/milestone-matriarch-celebration.jpg",
    isPublished: true,
    createdAt: "2026-10-20T10:15:00Z",
  },
];

// Consultation Bookings
export const INITIAL_CONSULTATIONS: ConsultationBooking[] = [];

