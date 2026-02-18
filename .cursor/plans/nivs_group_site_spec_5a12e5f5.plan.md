---
name: NIVS Group Site Spec
overview: Produce a single English markdown file that contains the full project specification, page structure, global components, content requirements, tech stack (Next.js/React), and i18n (EN, AL, MK) for the NIVS Group informative website.
todos: []
isProject: false
---

# NIVS Group Informative Website – Plan and Specification

## Deliverable

**One markdown file** (e.g. `SPECIFICATION.md` or `docs/PROJECT_SPEC.md`) containing:

- Full app specification (pages, sections, content)
- Global components (Header, Footer)
- Tech stack and dependencies
- i18n strategy (EN, AL, MK)
- Implementation plan (no code written in plan mode)

---

## 1. Project summary

- **Type:** Informative/corporate website
- **Business:** Import and distribution (wholesale to markets, local stores, etc.)
- **Stack:** Next.js (App Router) + React
- **Languages:** Macedonian (mk), English (en), Albanian (al)
- **Routing:** Next.js App Router with locale prefix (e.g. `/en`, `/mk`, `/al`)

---

## 2. Tech stack and tools

| Area          | Technology                                                   |
| ------------- | ------------------------------------------------------------ |
| Framework     | Next.js 14+ (App Router)                                     |
| UI            | React 18+                                                    |
| Styling       | **Tailwind CSS** (recommended; see Styling approach below)   |
| i18n          | next-intl or next-i18next (locale routing + JSON/namespaces) |
| Images        | next/image, optional: sharp                                  |
| Slider (Hero) | Swiper or embla-carousel-react                               |
| Icons         | lucide-react or Heroicons                                    |
| Fonts         | next/font (e.g. Google Fonts)                                |

**Suggested file for stack:** In the single MD file, add a “Technologies” section listing the above with brief rationale (e.g. “next-intl for App Router and locale prefixes”).

### Styling approach: avoid inline styles; use Tailwind (or CSS Modules)

- **Inline styles** (`style={{ ... }}`): Possible, but **not recommended** for this site because:
  - No media queries (responsive layout is hard).
  - No pseudo-classes (`:hover`, `:focus`, `:active`) for links, buttons, cards.
  - No animations/keyframes (e.g. hero slider transitions).
  - Verbose and repetitive across many components.
  - Harder to keep spacing, typography, and colors consistent.
- **Recommended: Tailwind CSS**
  - Utility classes give responsive design (`md:`, `lg:`), hover/focus states, and transitions out of the box.
  - Works well with Next.js, small production CSS bundle, no separate CSS files to maintain.
  - Fits a multi-page site with Hero, grids, accordion, and tables.
- **Alternative: CSS Modules**
  - Scoped `.module.css` per component; use normal CSS (media queries, pseudo-classes).
  - Good if you prefer traditional CSS over utility classes.

---

## 3. Route and page structure

Base structure (locale applied at root, e.g. `[locale]`):

```
app/
  [locale]/
    page.tsx                    → Page 1: Home
    proizvodi/
      page.tsx                  → Page 2: Products (brands grid)
      [brand]/
        page.tsx                → Page 3: Products by brand
        [product]/
          page.tsx              → Page 4: Single product
    za-nas/
      page.tsx                  → Page 5: About Us
    kontakt/
      page.tsx                  → Page 6: Contact
    cpp/
      page.tsx                  → Page 7: FAQ (ČPP)
```

**Spec in the MD file:** For each route, document: purpose, main sections, and required content (as in sections 4–5 below).

---

## 4. Page-by-page specification (for the MD file)

### Page 1: Home (`/`)

- **Hero:** Section with 3 rotating images (slider/carousel).
- **Company stats:** Section with numbers, e.g. 100+ clients, number of products, years in industry.
- **Partners:** Section with logos of known markets/retailers.
- **Testimonials:** Section with customer/testimonial quotes (and optional photos/roles).

### Page 2: Products (`/proizvodi`)

- Single section: **grid of brands** (cards with logo/name, link to `/proizvodi/[brand]`).

### Page 3: Products by brand (`/proizvodi/[brand]`)

- List/grid of **products for the selected brand** (links to `/proizvodi/[brand]/[product]`).

### Page 4: Single product (`/proizvodi/[brand]/[product]`)

- **Gallery:** 3–4 product images.
- **Description:** Text next to or below the gallery.
- **Nutrition table:** Table of nutritional values (e.g. per 100 g/ml).

### Page 5: About Us (`/za-nas`)

- **One main content block:** Text describing the company (history, mission, values, etc.).

### Page 6: Contact (`/kontakt`)

- **Sections by department**, each with:
  - Department name (e.g. Marketing, Sales).
  - Email.
  - Phone.
- Repeat pattern for other departments (e.g. Logistics, Support) as needed.

### Page 7: FAQ / ČPP (`/cpp`)

- **Accordion:** Items of question + answer (ČPP = Često postavljana pitanja / FAQ).

---

## 5. Global components (for the MD file)

- **Header:** Logo, main nav (Home, Products, About, Contact, FAQ), language switcher (EN / AL / MK).
- **Footer:** Repeat key links, optional contact snippet, copyright, social links if needed.

Specify in the MD that these are used in a root layout so they appear on every page.

---

## 6. i18n (EN, AL, MK)

- **Locales:** `en`, `al`, `mk` (or `sq` for Albanian if you prefer standard codes).
- **URLs:** `/[locale]/...` (e.g. `/en/proizvodi`, `/mk/kontakt`). Optionally use pathnames in the default language without prefix (e.g. `/proizvodi` = MK).
- **Content:** All UI strings and page content in JSON/namespaces per locale; document in the MD that “Copy and structure for EN/AL/MK” is required for each page and component.

---

## 7. Content and data (all static JSON)

- **All data is static:** No CMS or API. All content is loaded from JSON files (e.g. under `data/` or `content/`).
- **Data sources:** e.g. `data/brands.json`, `data/products.json` (or per-brand JSON), `data/testimonials.json`, `data/contact.json`, `data/faq.json`, plus i18n JSON per locale for UI and page copy.
- **Images:** Hero images, brand logos, product images, partner logos — stored in `public/images/` (e.g. `hero/`, `brands/`, `products/`, `partners/`) with paths referenced from JSON or fixed structure. Use `next/image` for optimization.

---

## 8. Structure of the single MD file

Recommended sections inside the one file:

1. **Title and overview** (project summary, deliverable)
2. **Technologies** (stack table + short rationale)
3. **Route structure** (tree + short description per route)
4. **Page specifications** (Pages 1–7 as above, with sections and content types)
5. **Global components** (Header, Footer behaviour and content)
6. **i18n** (locales, URL strategy, content structure)
7. **Data and content** (all static JSON: data files, folders, image paths)
8. **Implementation plan** (phases: setup Next.js + i18n, layout + global components, then page-by-page)

---

## 9. Implementation plan (high level)

- **Phase 1:** Next.js app with `[locale]` routing, i18n (EN/AL/MK), Tailwind, base layout with Header and Footer.
- **Phase 2:** Home page (hero slider, stats, partners, testimonials).
- **Phase 3:** Products flow (brands grid → brand page → product page with gallery and nutrition table).
- **Phase 4:** About, Contact, FAQ (accordion); final copy and assets.
- **Phase 5:** Content for all three languages and QA.

No code or file creation is done in plan mode; the only concrete deliverable described here is **one markdown file** that contains this full specification and plan so the team can implement from it.
