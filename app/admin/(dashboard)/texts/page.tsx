import { createSupabaseServerClient } from '@/lib/supabase/server';
import { LOCALES, type Locale } from '@/lib/supabase/types';
import { saveSiteText } from '../../actions/content';
import TextsEditor, { type TextRowMap } from './TextsEditor';

const KEYS_BY_SECTION: { section: string; label: string; keys: { key: string; label: string; type?: 'text' | 'textarea' }[] }[] = [
  {
    section: 'meta',
    label: '메타 (SEO)',
    keys: [
      { key: 'meta.title', label: '페이지 제목' },
      { key: 'meta.description', label: '페이지 설명', type: 'textarea' },
    ],
  },
  {
    section: 'nav',
    label: '네비게이션',
    keys: [
      { key: 'nav.about', label: 'About' },
      { key: 'nav.rooms', label: 'Rooms' },
      { key: 'nav.longStay', label: 'Long Stay' },
      { key: 'nav.facilities', label: 'Facilities' },
      { key: 'nav.location', label: 'Location' },
      { key: 'nav.guestNotes', label: 'Guest Notes' },
      { key: 'nav.book', label: 'Book' },
    ],
  },
  {
    section: 'hero',
    label: 'Hero (첫 화면)',
    keys: [
      { key: 'hero.eyebrow', label: 'Eyebrow (상단 작은 글자)' },
      { key: 'hero.title', label: '타이틀', type: 'textarea' },
      { key: 'hero.subtitle', label: '서브타이틀', type: 'textarea' },
      { key: 'hero.cta', label: 'CTA 버튼' },
    ],
  },
  {
    section: 'about',
    label: 'About (헤더만, 포인트는 별도 메뉴)',
    keys: [
      { key: 'about.eyebrow', label: 'Eyebrow' },
      { key: 'about.title', label: '타이틀', type: 'textarea' },
      { key: 'about.body', label: '본문', type: 'textarea' },
    ],
  },
  {
    section: 'rooms',
    label: 'Rooms (헤더/레이블)',
    keys: [
      { key: 'rooms.eyebrow', label: 'Eyebrow' },
      { key: 'rooms.title', label: '타이틀' },
      { key: 'rooms.viewDetails', label: '“자세히 보기” 버튼' },
      { key: 'rooms.close', label: '“닫기” 버튼' },
      { key: 'rooms.size', label: '크기 레이블' },
      { key: 'rooms.capacityLabel', label: '정원 레이블' },
      { key: 'rooms.amenitiesLabel', label: '편의시설 레이블' },
    ],
  },
  {
    section: 'longStay',
    label: 'Long Stay (헤더만, 불릿은 별도 메뉴)',
    keys: [
      { key: 'longStay.eyebrow', label: 'Eyebrow' },
      { key: 'longStay.title', label: '타이틀' },
      { key: 'longStay.body', label: '본문', type: 'textarea' },
      { key: 'longStay.cta', label: 'CTA 버튼' },
      { key: 'longStay.note', label: '보조 텍스트' },
    ],
  },
  {
    section: 'facilities',
    label: 'Facilities (헤더만)',
    keys: [
      { key: 'facilities.eyebrow', label: 'Eyebrow' },
      { key: 'facilities.title', label: '타이틀' },
    ],
  },
  {
    section: 'location',
    label: 'Location (헤더 및 본문)',
    keys: [
      { key: 'location.eyebrow', label: 'Eyebrow' },
      { key: 'location.title', label: '타이틀' },
      { key: 'location.body', label: '본문', type: 'textarea' },
      { key: 'location.nearby', label: '주변 소개', type: 'textarea' },
    ],
  },
  {
    section: 'faq',
    label: 'FAQ (헤더만)',
    keys: [
      { key: 'faq.eyebrow', label: 'Eyebrow' },
      { key: 'faq.title', label: '타이틀' },
    ],
  },
  {
    section: 'guestNotes',
    label: 'Guest Notes (헤더만)',
    keys: [
      { key: 'guestNotes.eyebrow', label: 'Eyebrow' },
      { key: 'guestNotes.title', label: '타이틀' },
    ],
  },
  {
    section: 'booking',
    label: 'Booking',
    keys: [
      { key: 'booking.eyebrow', label: 'Eyebrow' },
      { key: 'booking.title', label: '타이틀' },
      { key: 'booking.body', label: '본문', type: 'textarea' },
      { key: 'booking.longStayCta', label: '장기숙박 CTA' },
      { key: 'booking.shortStay', label: '단기숙박 레이블' },
      { key: 'booking.contact', label: '연락처 레이블' },
      { key: 'booking.email', label: '이메일 표시' },
      { key: 'booking.instagram', label: 'Instagram 레이블' },
      { key: 'booking.booking', label: 'Booking.com 레이블' },
      { key: 'booking.agoda', label: 'Agoda 레이블' },
    ],
  },
  {
    section: 'floating',
    label: 'Floating CTA',
    keys: [{ key: 'floating.cta', label: 'CTA 버튼' }],
  },
  {
    section: 'footer',
    label: 'Footer',
    keys: [
      { key: 'footer.tagline', label: '태그라인' },
      { key: 'footer.rights', label: '저작권 문구' },
    ],
  },
];

export default async function TextsPage() {
  const sb = await createSupabaseServerClient();
  const { data } = await sb.from('site_text').select('key, locale, value');

  const rowMap: TextRowMap = {};
  for (const row of data ?? []) {
    if (!rowMap[row.key]) rowMap[row.key] = {} as Record<Locale, string>;
    rowMap[row.key]![row.locale as Locale] = row.value;
  }
  // ensure empty strings for any missing locales
  for (const section of KEYS_BY_SECTION) {
    for (const k of section.keys) {
      if (!rowMap[k.key]) rowMap[k.key] = {} as Record<Locale, string>;
      for (const l of LOCALES) {
        if (rowMap[k.key]![l] == null) rowMap[k.key]![l] = '';
      }
    }
  }

  async function save(next: TextRowMap) {
    'use server';
    const rows: { key: string; locale: Locale; value: string }[] = [];
    for (const [key, byLocale] of Object.entries(next)) {
      for (const locale of LOCALES) {
        rows.push({ key, locale, value: (byLocale?.[locale] ?? '') as string });
      }
    }
    return saveSiteText(rows);
  }

  return (
    <TextsEditor sections={KEYS_BY_SECTION} initialRows={rowMap} onSave={save} />
  );
}
