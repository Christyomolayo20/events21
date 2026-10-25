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
    title: "Luxury Wedding Planning & Royal Styling",
    tagline: "Timeless Grandeur, Cultured Sophistication",
    snippet:
      "Comprehensive curation for contemporary white weddings and traditional engagements, merging cultural heritage with royal aesthetics, floral architecture, and seamless coordination.",
    description:
      "Specialized curation for contemporary and traditional Nigerian weddings fit for royalty. We harmoniously merge cultural heritage with high-fashion aesthetics, bespoke floral architecture, ceremonial Alaga protocols, low-fog dry ice, and dramatic ambient lighting—serving clients nationwide and available to travel.",
    image: "/images/service-wedding-reception.jpg",
    inclusions: [
      "Custom mood boards, colour palettes & royal design decks",
      "Stage, altar, and head-table floral architecture",
      "Traditional Yoruba engagement protocols & Alaga coordination",
      "First dance special effects (low-lying dry ice fog, cold fireworks & pyrotechnics)",
      "Bridal party timeline & backstage royal concierge",
      "Rehearsal supervision and VIP attendant management",
    ],
    suitableFor: "Couples desiring a deeply memorable, regal, and visually breathtaking wedding celebration.",
  },
  {
    id: "proposal-planning",
    title: "Romantic Proposal Planning & Concepts",
    tagline: "Unforgettable Beginnings, Crafted With Romance",
    snippet:
      "Intimate and cinematic proposal experiences, from private rooftop setups and candlelight to hidden photography and custom florals.",
    description:
      "A surprise proposal deserves theatrical precision and breathtaking romance. From private rooftop setups with cold pyrotechnics and rose petals to intimate candlelit private dining, we bring dream proposals to life with undercover planning, ambient staging, and seamless surprise choreography.",
    image: "/images/service-proposal-black.jpg",
    inclusions: [
      "Discrete concept formulation & undercover location scouting",
      "Custom 'Marry Me' light-up marquee letters & ambient candlelight",
      "Curated floral arrangements, champagne bar & violins/saxophone",
      "Hidden professional photographer & videographer coordination",
      "Complete minute-by-minute surprise timeline management",
      "Celebratory suite styling or dinner reservation coordination",
    ],
    suitableFor: "Partners seeking a flawless, cinematic, and intimately royal marriage proposal.",
  },
  {
    id: "milestone-celebrations",
    title: "Milestone Celebrations, Birthdays & Retirements",
    tagline: "Honoring Lifetime Legacies & Joyful Jubilees",
    snippet:
      "Distinguished retirement tribute galas, jubilant milestone birthdays (40th, 50th, 80th), and bespoke private soirees with refined tablescapes and dignitary hospitality.",
    description:
      "Honoring a lifetime of excellence, career milestones, and generational celebrations. We orchestrate stately retirement receptions, tribute dinners, executive send-offs, and lavish milestone birthdays (30th, 40th, 50th, 70th, 80th). Every celebration features bespoke tablescape artistry, commemorative video reels, VIP dignitary protocol, live entertainment, and personalized hospitality.",
    image: "/images/service-milestone-celebrations.jpg",
    inclusions: [
      "Bespoke thematic concept, tablescape artistry & lush floral centerpieces",
      "Legacy tribute production, photo retrospectives & commemorative staging",
      "VIP dignitary protocol, seating logistics & guest greeting",
      "Custom stationery, personalized place cards & commemorative menus",
      "Live band, saxophonist, classical instrumentalists & seasoned MC coordination",
      "Custom executive hampers & milestone souvenirs by Gifts by Adeola",
      "Full day-of program pacing and hospitality coordination",
    ],
    suitableFor: "Executives, retirees, milestone celebrants (40th, 50th, 70th, 80th), and families hosting landmark lifetime gatherings.",
  },
  {
    id: "full-planning",
    title: "Full-Service Royal Event Management",
    tagline: "From First Concept to Last Farewell",
    snippet:
      "End-to-end luxury management covering budget formulation, vetted vendor sourcing, master production timelines, spatial design, and flawless execution.",
    description:
      "A complete, end-to-end luxury management experience designed for discerning hosts. We handle budget formulation, vetted vendor sourcing, contract negotiations, guest management, and total execution with zero host stress.",
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
    id: "gifting-concierge",
    title: "Gifts by Adeola Concierge",
    tagline: "Corporate Gifts, Hampers, Souvenirs & Wrapping of Eru Iyawo",
    snippet:
      "Thoughtful gifts curated on a budget—from artisanal wrapping of traditional Yoruba Eru Iyawo to branded corporate hampers and VIP souvenirs.",
    description:
      "We help you curate thoughtful gifts on a budget. From bespoke wrapping of traditional Yoruba Eru Iyawo engagement boxes to branded corporate hampers, VIP souvenirs, and celebratory gift packages with doorstep delivery across Lagos and nationwide.",
    image: "/images/celebration-gift-hamper.jpg",
    inclusions: [
      "Artisanal wrapping and presentation of traditional Eru Iyawo packages",
      "Thoughtfully curated gift hampers designed for every budget tier",
      "Branded executive corporate gifting and staff appreciation packages",
      "High-end event souvenirs and guest return gift boxes",
      "Personalized handwritten calligraphy cards & wax seal packaging",
      "Doorstep delivery across Lagos and nationwide courier service",
    ],
    suitableFor: "Grooms and families preparing Eru Iyawo, corporate teams, and event hosts.",
  },
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "regal-yoruba-engagement",
    title: "A Regal Yoruba Wedding Celebration",
    subtitle: "Traditional Yoruba engagement with rich wine aso-oke, heirloom coral beads, and cultural protocol.",
    category: "Traditional",
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

