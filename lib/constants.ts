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

export const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
};
