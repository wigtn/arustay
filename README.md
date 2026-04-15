# ARU STAY — Official Website (MVP)

Next.js 15 (App Router) · TypeScript · Tailwind CSS · next-intl · Framer Motion.

Single-page, scroll-based brand site with sticky nav, scroll spy, and 4-locale routing (EN / JA / ZH / KO).

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000  (redirects to / for EN)
npm run build
npm run typecheck
```

Locales: `/` `/ja` `/zh` `/ko`.

## Project structure

```
app/
  [locale]/
    layout.tsx          # locale layout + <html lang>
    page.tsx            # single-page composition
    sections/           # About / Rooms / LongStay / Facilities / Location / GuestNotes / Booking
  layout.tsx            # root passthrough (so globals.css loads)
  globals.css
components/
  Nav.tsx               # sticky + IntersectionObserver scroll spy + mobile hamburger
  FloatingCTA.tsx       # mobile-only Long Stay CTA
  LanguageSwitcher.tsx
  FadeIn.tsx            # Framer Motion fade-in-on-view wrapper
content/                # {en,ja,zh,ko}.json  (editable copy)
i18n/                   # next-intl routing + request config
lib/constants.ts        # URLs, section ids, locale labels
public/images/          # hero.jpg, room-1..4.jpg  (placeholders — see README.txt)
middleware.ts           # next-intl locale middleware
```

## Editing content

- Text: edit `content/{locale}.json` and redeploy.
- Images: replace files in `public/images/` (keep the filenames).
- External links: `lib/constants.ts`
  - `LONG_STAY_FORM_URL` — Google Form (currently `#` placeholder)
  - `BOOKING_COM_URL`, `AGODA_URL`, `INSTAGRAM_URL`, `EMAIL`
  - `GOOGLE_MAPS_EMBED_SRC` — Maps iframe src (currently generic Wangsimni embed)

## Known limitations

- No real image assets shipped — the hero and room cards render on a sand-colored fallback until `public/images/*.jpg` are provided.
- Google Form URL, OTA URLs, Instagram URL are all `#` placeholders.
- SEO structured data (LodgingBusiness), sitemap, robots, hreflang, and analytics are Phase 2 (per PRD) and intentionally omitted.
- Translations are first-pass; a native proofreading pass is recommended before launch.
