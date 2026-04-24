export const SECTION_IDS = [
  'about',
  'rooms',
  'facilities',
  'long-stay',
  'location',
  'guest-notes',
  'book',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// Placeholder URLs (to be replaced with real values in production)
export const LONG_STAY_FORM_URL = '#'; // Google Form URL (to be provided)
export const BOOKING_COM_URL =
  'https://www.booking.com/hotel/kr/aru-stay-in-seoul.ko.html?aid=356980&label=gog235jc-10CAsofUIRYXJ1LXN0YXktaW4tc2VvdWxIF1gDaH2IAQGYATO4ARfIAQzYAQPoAQH4AQGIAgGoAgG4AsyMqM8GwAIB0gIkNDgxNDczZjktOTEyZS00MjIxLWE1YWMtNjU0OWI3YzAwYjU42AIB4AIB';
export const AGODA_URL =
  'https://www.agoda.com/ko-kr/aru-stay-in-seoul/hotel/seoul-kr.html?cid=1844104&ds=fIzr764zUWTXCbK0';
export const TRIP_COM_URL =
  'https://kr.trip.com/hotels/seoul-hotel-detail-133527264/aru-stay/';
export const INSTAGRAM_URL = 'https://www.instagram.com/arustay.seoul/';
export const EMAIL = 'arustay26@gmail.com';

export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/fM8XncmPdbCt14yo7';
export const NAVER_MAP_URL = 'https://naver.me/GntGYVbf';

// Google Maps embed — ARU STAY actual location (37.5635136, 127.0351235)
export const GOOGLE_MAPS_EMBED_SRC =
  'https://www.google.com/maps?q=ARU+STAY,+Wangsimni,+Seoul&ll=37.5635136,127.0351235&z=17&output=embed';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arustay.com';

export const CREW = {
  name: 'WIGTN',
  url: 'https://wigtn.com',
} as const;

export const BUSINESS = {
  name: 'ARU STAY',
  legalName: 'ARU STAY',
  streetAddress: 'Wangsimni-ro, Seongdong-gu',
  addressLocality: 'Seoul',
  addressRegion: 'Seoul',
  postalCode: '04766',
  addressCountry: 'KR',
  latitude: 37.5635136,
  longitude: 127.0351235,
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
