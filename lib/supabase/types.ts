export type Locale = 'ko' | 'en' | 'ja' | 'zh';

export const LOCALES: Locale[] = ['ko', 'en', 'ja', 'zh'];

export type SiteTextRow = {
  key: string;
  locale: Locale;
  value: string;
};

export type AboutPointRow = { id: string; sort_order: number };
export type AboutPointI18n = {
  point_id: string;
  locale: Locale;
  title: string;
  body: string;
};

export type RoomRow = {
  id: string;
  slug: string;
  sort_order: number;
  size: string;
  image_key: string | null;
};
export type RoomI18n = {
  room_id: string;
  locale: Locale;
  name: string;
  capacity: string;
  description: string;
  amenities: string[];
};

export type FacilityRow = { id: string; sort_order: number };
export type FacilityI18n = {
  facility_id: string;
  locale: Locale;
  name: string;
  description: string;
};

export type FaqRow = { id: string; sort_order: number };
export type FaqI18n = {
  faq_id: string;
  locale: Locale;
  question: string;
  answer: string;
};

export type GuestNoteRow = { id: string; sort_order: number };
export type GuestNoteI18n = {
  note_id: string;
  locale: Locale;
  quote: string;
  author: string;
};

export type LocationAccessRow = { id: string; sort_order: number };
export type LocationAccessI18n = {
  access_id: string;
  locale: Locale;
  place: string;
  time: string;
};

export type LongStayBulletRow = { id: string; sort_order: number };
export type LongStayBulletI18n = {
  bullet_id: string;
  locale: Locale;
  text: string;
};

export type SiteImageRow = {
  key: string;
  url: string;
  alt_text: string;
};
