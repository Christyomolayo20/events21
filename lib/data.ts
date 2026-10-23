import { EventEnquiry, GiftItem, GiftRequest, PortfolioItem, ServiceItem } from "./types";

export const BRAND_CONFIG = {
  name: "Event 21",
  subBrand: "Gifts by Adeola",
  tagline: "Curating Regal Experiences. Orchestrating Royalty.",
  description:
    "A premier royal event planning, styling, and management studio based in Lagos, Nigeria. Crafting regal celebrations, timeless weddings, and bespoke gifting with unmatched sophistication.",
  instagramUrl: "https://www.instagram.com/events_21/",
  instagramHandle: "@events_21",
  giftsInstagramUrl: "https://www.instagram.com/giftsbyadeola/",
  giftsInstagramHandle: "@giftsbyadeola",
  phone: "08060549596",
  phoneFormatted: "+234 806 054 9596",
  whatsappNumber: "2348060549596", // International format for wa.me
  email: "Royaltyeventservice@gmail.com",
  address: "No 12, Johnson Estate, Ojodu Berger, Lagos, Lagos, Nigeria",
  openingHours: "Mon – Sat: 9:00 AM – 6:00 PM (By Appointment)",
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
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
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
    id: "the-kayodes-traditional",
    title: "The Kayodes: A Regal Yoruba Wedding",
    subtitle: "A royal celebration of Yoruba culture, rich royal wine aso-oke, and timeless heritage.",
    category: "Traditional",
    year: "2024",
    location: "Lagos, Nigeria",
    image: "/images/the-kayodes-traditional.jpg",
    featured: true,
    description:
      "A breathtaking traditional engagement celebrating the union of The Kayodes. Featuring intricately embroidered wine and gold aso-oke, regal ceremonial staffs, coordinated family attire, and traditional Yoruba wedding customs seamlessly coordinated by Event 21.",
    highlights: [
      "Full cultural protocol coordination",
      "Custom burgundy and gold royal aesthetic",
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
      "An ethereal white wedding characterized by timeless romance and royal poise. The groom's tailored white tuxedo paired harmoniously with the bride's exquisite high-neck beaded lace gown. Event 21 ensured every movement flowed effortlessly from the morning preparations to the vows.",
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
      "The pinnacle reception moment: a dramatic first dance in heavy low fog, illuminated by cascading crystal icicles, burgundy ceiling drapery, and indoor cold pyrotechnics that created an awe-inspiring royal spectacle for guests.",
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
    title: "The Velvet Soirée: Milestone Celebration",
    subtitle: "An intimate gathering celebrating decades of excellence, curated with personal stories and music.",
    category: "Celebrations",
    year: "2023",
    location: "Ikoyi, Lagos",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    featured: false,
    description:
      "An exclusive private dinner for close family and friends. Features customized cocktail pairings, a live acoustic trio, and bespoke welcome gifts presented to each guest.",
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
