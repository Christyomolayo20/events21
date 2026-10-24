import { EventEnquiry, GiftItem, GiftRequest, PortfolioItem, ServiceItem, Testimonial, ConsultationBooking, TeamMember, FounderInfo } from "./types";

export const BRAND_CONFIG = {
  name: "Events 21",
  legalName: "Royalty Twenty One Events",
  subBrand: "Gifts by Adeola",
  tagline: "Curating Regal Experiences. Orchestrating Royalty.",
  description:
    "Events 21 creates thoughtfully planned, beautifully styled celebrations that turn meaningful moments into lasting memories.",
  longDescription:
    "A premier royal event planning and styling brand specialising in weddings, birthdays, celebrations, and memorable gatherings across Ibadan, Lagos, and nationwide.",
  instagramUrl: "https://www.instagram.com/events_21/",
  instagramHandle: "@events_21",
  giftsInstagramUrl: "https://www.instagram.com/giftsbyadeola/",
  giftsInstagramHandle: "@giftsbyadeola",
  phone: "08060549596",
  phoneFormatted: "+234 806 054 9596",
  whatsappNumber: "2348060549596", // International format for wa.me
  email: "Royaltyeventservice@gmail.com",
  address: "No 12, Johnson Estate, Ojodu Berger, Lagos, Nigeria",
  serviceAreas: "Serving Ibadan, Lagos, and destinations nationwide",
  openingHours: "Mon – Sat: 9:00 AM – 6:00 PM (By Appointment)",
  heroVideoUrl: "/images/hero-video.mp4",
  heroPosterUrl: "/images/hero-poster.jpg",
};


export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "royal-wedding-design",
    title: "Luxury Wedding Planning & Royal Styling",
    tagline: "Timeless Grandeur, Cultured Sophistication",
    description:
      "Specialized curation for contemporary and traditional Nigerian weddings fit for royalty. We harmoniously merge cultural heritage with high-fashion aesthetics, bespoke floral architecture, and dramatic ambient lighting.",
    image: "/images/the-kayodes-traditional-couple.jpg",
    inclusions: [
      "Custom mood boards, colour palettes & royal design decks",
      "Stage, altar, and head-table floral architecture",
      "Traditional Yoruba engagement protocols & coordination",
      "First dance special effects (low-lying dry ice fog, cold fireworks & pyrotechnics)",
      "Bridal party timeline & backstage royal concierge",
      "Rehearsal supervision and VIP attendant management",
    ],
    suitableFor: "Couples desiring a deeply memorable, regal, and visually breathtaking wedding.",
  },
  {
    id: "proposal-planning",
    title: "Romantic Proposal Planning & Concepts",
    tagline: "Unforgettable Beginnings, Crafted With Romance",
    description:
      "A surprise proposal deserves theatrical precision and breathtaking romance. From private rooftop setups with cold pyrotechnics and rose petals to intimate candlelit private dining, we bring dream proposals to life.",
    image: "/images/the-kayodes-portrait.jpg",
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
    id: "retirement-party",
    title: "Milestone Retirement Celebrations",
    tagline: "Honoring a Lifetime of Excellence & Legacy",
    description:
      "A distinguished career calls for an honorable, elegant send-off. We orchestrate stately retirement receptions, tribute dinners, and celebratory galas designed to commemorate decades of dedication with prestige.",
    image: "/images/milestone-matriarch-celebration.jpg",
    inclusions: [
      "Legacy tribute production, photo retrospectives & video staging",
      "VIP dignitary protocol, seating logistics & guest greeting",
      "Classy banquet spatial design, tailored linens & bespoke centerpieces",
      "Live band, classical instrumentalists & seasoned MC coordination",
      "Custom executive retirement hampers by Gifts by Adeola",
      "Full day-of program pacing and hospitality coordination",
    ],
    suitableFor: "Executives, public servants, academics, and families celebrating retirement milestones.",
  },
  {
    id: "full-planning",
    title: "Full-Service Royal Event Management",
    tagline: "From First Concept to Last Farewell",
    description:
      "A complete, end-to-end luxury management experience designed for discerning hosts. We handle budget formulation, vetted vendor sourcing, contract negotiations, guest management, and total execution.",
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
    id: "social-celebrations",
    title: "Milestone Birthdays & Private Soirées",
    tagline: "Sophisticated Gatherings with Distinct Personality",
    description:
      "From intimate 30th, 40th, and 50th milestone dinners to opulent ballroom banquets and romantic anniversary celebrations. Every gathering is tailored to reflect the celebrant's unique taste.",
    image: "/images/milestone-matriarch-celebration.jpg",
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
    tagline: "Corporate Gifts, Hampers, Souvenirs & Wrapping of Eru Iyawo",
    description:
      "We help you curate thoughtful gifts on a budget. From bespoke wrapping of traditional Yoruba Eru Iyawo engagement boxes to branded corporate hampers, VIP souvenirs, and celebratory gift packages.",
    image: "/images/eru-iyawo-traditional-green.jpg",
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
    category: "Ballrooms & Decor",
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
];

export const GIFTS_CATALOGUE: GiftItem[] = [
  {
    id: "eruiyawo-wrapping-suite",
    name: "Wrapping of Eru Iyawo (Traditional Bridal Trunks)",
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
    image: "/images/eru-iyawo-traditional-green.jpg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-wrapping-a-gift-box-with-ribbon-42013-large.mp4",
    mediaType: "video",
    popular: true,
    inStock: true,
  },
  {
    id: "eruiyawo-ladder-display",
    name: "Artisanal Eru Iyawo Tiered Ladder Presentation",
    category: "Wrapping of Eru Iyawo",
    price: 95000,
    description:
      "An awe-inspiring tiered ladder presentation for the bride's Eru Iyawo engagement gifts. Styled with olive green velvet draping, magenta floral accents, illuminated signage, and woven luxury hampers.",
    details: [
      "Architectural multi-tier wooden A-frame display staging",
      "Olive green royal velvet fabric draping & custom illumination",
      "Magenta ribbon flower styling and artisanal gift wrapping",
      "Woven fruit & delicacy hamper baskets with sheer organza accents",
    ],
    image: "/images/eru-iyawo-ladder-display.jpg",
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
    image: "/images/executive-gift-box-set.jpg",
    popular: true,
    inStock: true,
  },
  {
    id: "budget-celebration-hamper",
    name: "The Thoughtful Celebration Hamper",
    category: "Hampers",
    price: 35000,
    description:
      "Thoughtfully curated on a realistic budget. Features premium sparkling cider or wine, artisanal chocolates, scented hand-poured candle, gourmet biscuits, and a handwritten calligraphy card.",
    details: [
      "Sparkling wine or sparkling celebration cider bottle",
      "Artisan box of gourmet chocolates",
      "Handmade soy wax scented relaxation candle",
      "Gift presentation box with satin ribbon & wax seal",
      "Handwritten personalized calligraphy message",
    ],
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    popular: true,
    inStock: true,
  },
  {
    id: "event-souvenirs-pack",
    name: "VIP Guest Souvenirs & Keepsake Set",
    category: "Souvenirs",
    price: 25000,
    description:
      "Leave a lasting impression on your event guests. Customized guest souvenir boxes with scented diffusers, pocket vanity mirrors or notebooks, and custom event branding.",
    details: [
      "Custom branded guest keepsake box with wax seal",
      "50ml luxury scented mini reed diffuser",
      "Personalized thank-you acrylic token or card",
      "Bulk volume discounts available for 20+ units",
    ],
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d45f6?auto=format&fit=crop&w=800&q=80",
    popular: false,
    inStock: true,
  },
  {
    id: "grand-royalty-hamper",
    name: "The Grand Royalty Celebration Hamper",
    category: "Hampers",
    price: 85000,
    description:
      "Our most opulent gift collection. Premium champagne or non-alcoholic luxury blend, gold-dusted truffles, luxury room diffuser, crystal champagne flutes, and satin ribbon packaging.",
    details: [
      "Premium imported celebration champagne / luxury sparkling wine",
      "Twin gold-rimmed crystal champagne flutes",
      "French lavender & vanilla reed diffuser",
      "Artisan gold-leaf truffle collection",
      "Rigid velvet-lined keepsake trunk with personalized gold lock",
    ],
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
    popular: true,
    inStock: true,
  },
  {
    id: "bespoke-budget-curation",
    name: "Custom Gifting on a Budget",
    category: "Bespoke",
    price: 30000, // starting from
    description:
      "Tell us your target budget per box and Adeola will personally curate items matching your theme, colour scheme, and celebration requirements.",
    details: [
      "1-on-1 consultation directly via WhatsApp",
      "Flexible product selection matching your exact budget limit",
      "Custom gift boxes, ribbons, and calligraphy notes",
      "Doorstep delivery across Lagos and nationwide courier service",
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
  bio: "Adeola Oyeyode is the founder and visionary leader of Events 21 (Royalty Twenty One Events) and Gifts by Adeola. Guided by a profound passion for design, African culture, and logistical precision, she has orchestrated weddings, milestone jubilees, and VIP galas across Ibadan, Lagos, and Nigeria.",
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

// Public testimonials: Genuine testimonials only. Empty state by default as instructed!
export const INITIAL_TESTIMONIALS: Testimonial[] = [];

// Consultation Bookings
export const INITIAL_CONSULTATIONS: ConsultationBooking[] = [];

