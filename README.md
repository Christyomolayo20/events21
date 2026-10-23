# Event 21 (Royalty Twenty One Events) & Gifts by Adeola

> Event 21 (Royalty Twenty One Events) transforms weddings, birthdays, proposals, retirement milestones, and special gatherings into extraordinary experiences that feel like stepping into a palace ballroom. With meticulous planning, breathtaking décor, and attention to every detail.

A premium, minimalist, photography-led website and management system for **Event 21** and its connected gifting sub-brand, **Gifts by Adeola**, based in Lagos, Nigeria.

---

## 🌟 Brand & Design Highlights

- **Visual Direction:** Boutique royal studio aesthetic, editorial typography (Cormorant Garamond & Plus Jakarta Sans), generous white space, restrained luxury.
- **Brand Palette:**
  - Primary Purple: `#6E35A5`
  - Deep Plum: `#30213A`
  - Accent Pink (Gifts by Adeola): `#D84F91`
  - Soft Lavender: `#F5EAFB`
  - Blush Pink: `#FFF0F5`
  - Warm White: `#FFFCF8`
  - Gold Accents: `#C5A059`
- **Authentic Portfolio (The Kayodes & Royal Ballroom):**
  - **Traditional Yoruba Wedding:** Regal wine aso-oke, ceremonial staffs, heirloom beadwork, cultural protocols.
  - **White Wedding Ceremony:** High-neck bridal lace, tailored white tuxedo, intimate editorial portraits.
  - **The Ballroom Symphony:** Grand ballroom pyrotechnics, dry-ice low fog clouds, cascading crystal icicle lighting, tiered wedding cake.
- **Integrated Sub-Brand (Gifts by Adeola):**
  - Official Instagram: [https://www.instagram.com/giftsbyadeola/](https://www.instagram.com/giftsbyadeola/)
  - Exact brand promise: *"We help you curate thoughtful gifts on a budget. Corporate Gifts, Hampers, Souvenirs & Wrapping of Eru Iyawo."*
  - One-click **WhatsApp Direct Ordering** (`08060549596`) carrying product details and pricing into the chat.

---

## 🔐 Admin Control Center

An administrative control center is built into the website.

- **URL:** `/admin` (hidden from public navigation and footer)
- **Password:** `Event$21`

### Admin Features:
1. **Event Enquiries Manager:**
   - Real-time lead tracking (New, In Review, Contacted, Booked, Archived).
   - One-click **WhatsApp Reply** pre-populating client name and event type.
   - One-click **Email Reply**.
   - **Export to CSV** for spreadsheets and CRM importing.
2. **Gifts by Adeola Catalogue & Uploads:**
   - Add new gift items, upload photos directly from your device, set prices in NGN, and edit/delete existing packages.
   - Track custom gift client orders with status updates and WhatsApp reply.
3. **Portfolio & Gallery Showcase Manager:**
   - Edit existing projects, delete projects, and upload new photos from your device or via URL.
4. **Studio Contact Settings:**
   - Real-time editing of official phone number (`08060549596`), email (`Royaltyeventservice@gmail.com`), address (*No 12, Johnson Estate, Ojodu Berger, Lagos, Nigeria*), and Instagram handles.

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
  - `page.tsx` - Homepage (Royal Hero, About, Services, Portfolio, Gifts by Adeola, Contact)
  - `about/page.tsx` - Detailed story, brand values, 4-stage planning process
  - `services/page.tsx` - Detailed breakdown of planning, styling, romantic proposals, and retirement parties
  - `gallery/page.tsx` - Filterable portfolio with high-resolution Lightbox story viewer
  - `gifts-by-adeola/page.tsx` - Dedicated gifting boutique, catalogue, and custom request modal
  - `contact/page.tsx` - Interactive blank event enquiry brief and studio contact avenues
  - `admin/page.tsx` - Password-protected Admin Control Center (`Event$21`)
  - `api/enquiries/` - Event enquiry API endpoint
  - `api/admin/login/` - Admin authentication endpoint
- **`components/`**: Reusable UI components
  - `Navbar.tsx` - Sticky header with mobile drawer (pure Event 21 brand mark)
  - `Footer.tsx` - Minimal footer with verified contacts, address, and Instagram links
  - `Logo.tsx` - Event 21 brand mark
  - `Hero.tsx` - Full ballroom backdrop with multi-layered royal plum veils and crown crest
  - `AboutSection.tsx` - Editorial "Every Celebration Has a Story"
  - `ServicesSection.tsx` - Clean 6-service grid including Proposal and Retirement celebrations
  - `PortfolioSection.tsx` - Reactive project grid with category filtering
  - `GiftsSection.tsx` - Gifts by Adeola preview section with Instagram link
  - `ContactSection.tsx` - Conversion section with embedded brief form
  - `EnquiryForm.tsx` - Completely blank form with open budget text input
  - `LightboxModal.tsx` - Keyboard-accessible modal image viewer
  - `WhatsAppButton.tsx` - Floating WhatsApp concierge assistant connected to `08060549596`
- **`public/images/`**:
  - `events21-logo.jpg` - Official Event 21 logo
  - `the-kayodes-traditional.jpg` - The Kayodes traditional Yoruba wedding
  - `the-kayodes-white-wedding.jpg` - The Kayodes white wedding
  - `ballroom-first-dance.jpg` - Grand ballroom pyrotechnics & low fog first dance
  - `the-kayodes-portrait.jpg` - Fine art pre-wedding portrait
