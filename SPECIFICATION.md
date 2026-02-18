# NIVS Group – Project Specification

Informative website for a company in import and distribution (wholesale to markets, local stores, etc.). Single specification document for implementation.

---

## 1. Title and overview

| Item          | Description                                                |
| ------------- | ---------------------------------------------------------- |
| **Project**   | NIVS Group                                                 |
| **Type**      | Corporate / marketing site                                 |
| **Business**  | Import and distribution (wholesale)                        |
| **Stack**     | Next.js (App Router) + React                               |
| **Languages** | Macedonian (mk), English (en), Albanian (al)               |
| **Routing**   | Next.js App Router with locale prefix: `/en`, `/mk`, `/al` |

---

## 2. Technologies

| Area            | Technology                     | Rationale                                                                   |
| --------------- | ------------------------------ | --------------------------------------------------------------------------- |
| **Framework**   | Next.js 14+ (App Router)       | SSR/SSG, file-based routing, API routes if needed later                     |
| **Language**    | TypeScript                     | Type safety, better DX, `.ts`/`.tsx` for app and components                  |
| **UI**          | React 18+                      | Component model, ecosystem                                                  |
| **Styling**     | Tailwind CSS                   | Responsive utilities, hover/focus, small bundle; see Styling approach below |
| **i18n**        | next-intl (or next-i18next)    | App Router–friendly, locale routing, JSON namespaces                        |
| **Images**      | next/image                     | Optimization, responsive srcset; optional sharp for transforms              |
| **Hero slider** | Swiper or embla-carousel-react | Accessible carousel with 3 rotating images                                  |
| **Icons**       | lucide-react or Heroicons      | Consistent icon set                                                         |
| **Fonts**       | next/font                      | Self-hosted or Google Fonts with no layout shift                            |

### Styling approach

- **Use Tailwind CSS**: utility classes for breakpoints (`md:`, `lg:`), states, and transitions; fits multi-page layout (hero, grids, accordion, tables).

## 3. Route structure

All routes live under a `[locale]` segment. Example: `/[locale]/proizvodi`, `/[locale]/kontakt`.

```
app/
  [locale]/
    page.tsx                      → Home
    proizvodi/
      page.tsx                    → Products (brands grid)
      [brand]/
        page.tsx                  → Products by brand
        [product]/
          page.tsx                → Single product
    za-nas/
      page.tsx                    → About Us
    kontakt/
      page.tsx                    → Contact
    cpp/
      page.tsx                    → FAQ (ČPP)
```

| Route                                   | Purpose                                               |
| --------------------------------------- | ----------------------------------------------------- |
| `/[locale]`                             | Home: hero, stats, partners, testimonials             |
| `/[locale]/proizvodi`                   | Grid of brands (cards → brand page)                   |
| `/[locale]/proizvodi/[brand]`           | List/grid of products for one brand                   |
| `/[locale]/proizvodi/[brand]/[product]` | Single product: gallery, description, nutrition table |
| `/[locale]/za-nas`                      | About: one main text block                            |
| `/[locale]/kontakt`                     | Contact: sections by department (email, phone)        |
| `/[locale]/cpp`                         | FAQ: accordion (question + answer)                    |

---

## 4. Page specifications

### Page 1: Home (`/[locale]`)

- **Hero:** One section with 3 images in a rotating slider/carousel.
- **Company stats:** Numbers (e.g. 100+ clients, number of products, years in industry). Use a simple stats strip or grid.
- **Partners:** Logos of known markets/retailers (from static JSON + images in `public/images/partners/`).
- **Testimonials:** Customer quotes; optional photo and role per quote. Data from `data/testimonials.json` (or i18n).

### Page 2: Products (`/[locale]/proizvodi`)

- **Single section:** Grid of brand cards. Each card: logo + name, link to `/[locale]/proizvodi/[brand]`. Data from `data/brands.json`.

### Page 3: Products by brand (`/[locale]/proizvodi/[brand]`)

- **Single section:** List or grid of products for the selected brand. Each item links to `/[locale]/proizvodi/[brand]/[product]`. Data from `data/products.json` or per-brand JSON, keyed by `[brand]`.

### Page 4: Single product (`/[locale]/proizvodi/[brand]/[product]`)

- **Gallery:** 3–4 product images (thumbnails + main image or small gallery).
- **Description:** Text beside or below the gallery (from JSON).
- **Nutrition table:** Table of nutritional values (e.g. per 100 g/ml). Data from product JSON.

### Page 5: About Us (`/[locale]/za-nas`)

- **One main content block:** Long-form text (history, mission, values). Content from i18n JSON or `data/about.json` per locale.

### Page 6: Contact (`/[locale]/kontakt`)

- **Sections by department.** Each section has:
  - Department name (e.g. Marketing, Sales, Logistics).
  - Email.
  - Phone.
- Data from `data/contact.json` (array of departments); labels can be in i18n.

### Page 7: FAQ / ČPP (`/[locale]/cpp`)

- **Accordion:** Multiple items, each with question + answer. Data from `data/faq.json` or i18n; structure must exist for EN, AL, MK.

---

## 5. Global components

Used in the root layout so they appear on every page.

### Header

- Logo (link to home).
- Main navigation: Home, Products, About Us, Contact, FAQ (labels from i18n).
- Language switcher: EN | AL | MK (or flags/icons). Switches `[locale]` and keeps current path.

### Footer

- Key links (same as header or subset).
- Optional: short contact line or address.
- Copyright and year.
- Optional: social links (from JSON/config).

---

## 6. i18n (EN, AL, MK)

- **Locales:** `en`, `al`, `mk` (or `sq` for Albanian if preferred).
- **URLs:** `/[locale]/...` (e.g. `/en/proizvodi`, `/mk/kontakt`). Optionally: default locale (e.g. `mk`) without prefix (`/proizvodi`).
- **Content:** All UI strings and page copy in JSON per locale (e.g. `messages/en.json`, `messages/mk.json`, `messages/al.json`). Namespaces or flat keys; ensure structure for EN, AL, MK for every page and component.

---

## 7. Data and content (all static JSON)

- **No CMS or API.** All content is loaded from JSON files.
- **Suggested locations:** `data/` or `content/` at project root.

| Data         | File(s)                                              | Purpose                                                             |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------------------- |
| Brands       | `data/brands.json`                                   | List of brands (id, name, logo path, slug) for Products page        |
| Products     | `data/products.json` or `data/products/[brand].json` | Products per brand (id, name, slug, images, description, nutrition) |
| Testimonials | `data/testimonials.json`                             | Quotes, optional photo/role; can be per locale                      |
| Contact      | `data/contact.json`                                  | Departments with email, phone                                       |
| FAQ          | `data/faq.json` or i18n                              | Question/answer pairs; per locale                                   |
| About        | i18n or `data/about.json`                            | Long text per locale                                                |
| UI + copy    | `messages/[locale].json`                             | Nav, buttons, headings, page copy for EN, AL, MK                    |

**Images:** Under `public/images/` with subfolders, e.g.:

- `public/images/hero/` – hero slider images
- `public/images/brands/` – brand logos
- `public/images/products/` – product images
- `public/images/partners/` – partner/market logos

Paths in JSON should be relative to `public` (e.g. `/images/hero/1.jpg`) or consistent so `next/image` can be used.

---

## 8. Implementation plan

1. **Phase 1:** Next.js app with `[locale]` routing, i18n (EN/AL/MK), Tailwind, root layout with Header and Footer.
2. **Phase 2:** Home page: hero slider (3 images), stats section, partners logos, testimonials.
3. **Phase 3:** Products flow: brands grid → brand page → product page (gallery, description, nutrition table).
4. **Phase 4:** About, Contact, FAQ (accordion); plug in final copy and assets.
5. **Phase 5:** Fill all three languages (EN, AL, MK) and QA.

This document is the single source of truth for the NIVS Group website implementation.
