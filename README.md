# Event 21 & Gifts by Adeola

A premium, minimalist, photography-led website and management system for **Event 21** and its connected gifting sub-brand, **Gifts by Adeola**, based in Lagos, Nigeria.

---

## 🌟 Brand & Design Highlights

- **Visual Direction:** Boutique studio aesthetic, editorial typography, generous white space, restrained luxury.
- **Brand Palette:**
  - Primary Purple: `#6E35A5`
  - Deep Plum: `#30213A`
  - Accent Pink (Gifts by Adeola): `#D84F91`
  - Soft Lavender: `#F5EAFB`
  - Blush Pink: `#FFF0F5`
  - Warm White: `#FFFCF8`
  - Gold Accents: `#C5A059`
- **Authentic Portfolio (The Kayodes):**
  - **Traditional Yoruba Wedding:** Regal wine aso-oke, ceremonial staffs, heirloom beadwork, cultural protocols.
  - **White Wedding Ceremony:** High-neck bridal lace, tailored white tuxedo, intimate editorial portraits.
  - **The Ballroom Symphony:** Indoor cold fireworks, dry-ice low fog clouds, cascading crystal icicle lighting, tiered wedding cake.
- **Integrated Sub-Brand (Gifts by Adeola):**
  - Curated celebration hampers, bridal suite sets, and executive boxes with prices in Nigerian Naira (NGN ₦).
  - One-click **WhatsApp Direct Ordering** buttons carrying product details and pricing into the chat.
  - Interactive Custom Gift Builder for personalized bridesmaid proposals and corporate orders.

---

## 🔐 Admin Control Center

An administrative control center is built into the website.

- **URL:** `/admin` (or click the lock icon in the navigation / footer)
- **Password:** `Event$21`

### Admin Features:
1. **Event Enquiries Manager:**
   - Real-time lead tracking (New, In Review, Contacted, Booked, Archived).
   - One-click **WhatsApp Reply** pre-populating client name and event type.
   - One-click **Email Reply**.
   - **Export to CSV** for spreadsheets and CRM importing.
2. **Gifts by Adeola Orders Tracker:**
   - View custom gift briefs and recipient details.
   - Update order status (Pending, Sourcing, Assembled, Delivered).
3. **Portfolio & Gallery Showcase Manager:**
   - Add new projects with photos, category, year, and description.
4. **Studio Contact Settings:**
   - Real-time editing of official phone number, WhatsApp number, email, and Instagram handle.

---

## 🚀 Getting Started

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Serve
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

- **`app/`**: Next.js App Router
  - `page.tsx` - Homepage (Hero, About, Services, Portfolio, Gifts by Adeola, Contact)
  - `about/page.tsx` - Detailed story, brand values, 4-stage planning process
  - `services/page.tsx` - Detailed breakdown of planning, styling, and coordination services
  - `gallery/page.tsx` - Filterable portfolio with high-resolution Lightbox viewer
  - `gifts-by-adeola/page.tsx` - Dedicated gifting boutique, catalogue, and custom request modal
  - `contact/page.tsx` - Interactive event enquiry brief and studio contact avenues
  - `admin/page.tsx` - Password-protected Admin Control Center (`Event$21`)
  - `api/enquiries/` - Event enquiry API endpoint
  - `api/admin/login/` - Admin authentication endpoint
- **`components/`**: Reusable UI components
  - `Navbar.tsx` - Sticky header with mobile drawer and Gifts by Adeola highlight
  - `Footer.tsx` - Minimal footer with verified contacts and privacy modal
  - `Logo.tsx` - Event 21 brand mark and sub-brand rendering
  - `Hero.tsx` - Photography-led hero section
  - `AboutSection.tsx` - Editorial "Every Celebration Has a Story"
  - `ServicesSection.tsx` - Clean 6-service grid
  - `PortfolioSection.tsx` - Project grid with category filtering
  - `GiftsSection.tsx` - Gifts by Adeola preview section
  - `ContactSection.tsx` - Conversion section with embedded brief form
  - `EnquiryForm.tsx` - Validated form with WhatsApp backup
  - `LightboxModal.tsx` - Keyboard-accessible modal image viewer
  - `WhatsAppButton.tsx` - Floating WhatsApp concierge assistant
- **`lib/`**:
  - `types.ts` - TypeScript data definitions
  - `data.ts` - Brand config, services, real portfolio items, and initial gift catalogue
  - `store.ts` - Client persistence, reactive state, and admin auth helpers
- **`public/images/`**:
  - `events21-logo.jpg` - Official Event 21 logo
  - `the-kayodes-traditional.jpg` - The Kayodes traditional Yoruba wedding
  - `the-kayodes-white-wedding.jpg` - The Kayodes white wedding
  - `ballroom-first-dance.jpg` - Grand ballroom pyrotechnics & low fog first dance
  - `the-kayodes-portrait.jpg` - Fine art pre-wedding portrait
