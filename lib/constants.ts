export const SECTION_IDS = [
  'about',
  'rooms',
  'long-stay',
  'facilities',
  'location',
  'guest-notes',
  'book',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// Placeholder URLs (to be replaced with real values in production)
export const LONG_STAY_FORM_URL = '#'; // Google Form URL (to be provided)
export const BOOKING_COM_URL = '#';
export const AGODA_URL = '#';
export const INSTAGRAM_URL = '#';
export const EMAIL = 'hello@arustay.example';

// Google Maps embed placeholder centered around Wangsimni Station
export const GOOGLE_MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=Wangsimni+Station,+Seoul&output=embed';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arustay.com';

export const BUSINESS = {
  name: 'ARU STAY',
  legalName: 'ARU STAY',
  streetAddress: 'Wangsimni-ro, Seongdong-gu',
  addressLocality: 'Seoul',
  addressRegion: 'Seoul',
  postalCode: '04766',
  addressCountry: 'KR',
  latitude: 37.5612,
  longitude: 127.0376,
  telephone: '+82-10-0000-0000',
  email: EMAIL,
  priceRange: '₩₩',
  checkinTime: '15:00',
  checkoutTime: '11:00',
} as const;

export const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
};
