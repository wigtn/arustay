import { unstable_cache } from 'next/cache';
import { createSupabaseReadOnlyClient } from '@/lib/supabase/server';
import type { Locale } from '@/lib/supabase/types';

import enFallback from '@/content/en.json';
import koFallback from '@/content/ko.json';
import jaFallback from '@/content/ja.json';
import zhFallback from '@/content/zh.json';

export const SITE_CONTENT_TAG = 'site-content';

type Messages = Record<string, unknown>;

const FALLBACK: Record<Locale, Messages> = {
  en: enFallback as unknown as Messages,
  ko: koFallback as unknown as Messages,
  ja: jaFallback as unknown as Messages,
  zh: zhFallback as unknown as Messages,
};

function setByPath(target: Messages, dotted: string, value: unknown) {
  const keys = dotted.split('.');
  let node: Record<string, unknown> = target;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    if (typeof node[k] !== 'object' || node[k] === null) node[k] = {};
    node = node[k] as Record<string, unknown>;
  }
  node[keys[keys.length - 1]] = value;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

type RoomItem = {
  slug: string;
  name: string;
  capacity: string;
  size: string;
  beds: string;
  desc: string;
  amenities: string[];
  images: string[];
};

async function overlaySupabase(
  messages: Messages,
  locale: Locale,
): Promise<void> {
  const sb = createSupabaseReadOnlyClient();

  const [
    siteText,
    aboutPoints,
    aboutPointsI18n,
    rooms,
    roomsI18n,
    facilities,
    facilitiesI18n,
    faq,
    faqI18n,
    guestNotes,
    guestNotesI18n,
    locationAccess,
    locationAccessI18n,
    longStayBullets,
    longStayBulletsI18n,
  ] = await Promise.all([
    sb.from('site_text').select('key, value').eq('locale', locale),
    sb.from('about_points').select('id, sort_order').order('sort_order'),
    sb.from('about_points_i18n').select('point_id, title, body').eq('locale', locale),
    sb.from('rooms').select('id, slug, sort_order, size, image_key').order('sort_order'),
    sb.from('rooms_i18n')
      .select('room_id, name, capacity, description, amenities')
      .eq('locale', locale),
    sb.from('facilities').select('id, sort_order').order('sort_order'),
    sb.from('facilities_i18n').select('facility_id, name, description').eq('locale', locale),
    sb.from('faq').select('id, sort_order').order('sort_order'),
    sb.from('faq_i18n').select('faq_id, question, answer').eq('locale', locale),
    sb.from('guest_notes').select('id, sort_order').order('sort_order'),
    sb.from('guest_notes_i18n').select('note_id, quote, author').eq('locale', locale),
    sb.from('location_access').select('id, sort_order').order('sort_order'),
    sb.from('location_access_i18n').select('access_id, place, time').eq('locale', locale),
    sb.from('long_stay_bullets').select('id, sort_order').order('sort_order'),
    sb.from('long_stay_bullets_i18n').select('bullet_id, text').eq('locale', locale),
  ]);

  for (const row of siteText.data ?? []) {
    if (typeof row.value === 'string' && row.value.length > 0) {
      setByPath(messages, row.key, row.value);
    }
  }

  const join = <P extends { id: string; sort_order: number }, C extends Record<string, unknown>>(
    parents: P[] | null | undefined,
    children: C[] | null | undefined,
    childKey: keyof C,
  ) => {
    const byId = new Map<string, C>();
    for (const c of children ?? []) byId.set(c[childKey] as unknown as string, c);
    return (parents ?? []).map((p) => ({
      ...p,
      ...(byId.get(p.id) ?? ({} as Partial<C>)),
    }));
  };

  const aboutMerged = join(aboutPoints.data, aboutPointsI18n.data, 'point_id');
  if (aboutMerged.length > 0) {
    setByPath(
      messages,
      'about.points',
      aboutMerged.map((p) => ({ title: p.title ?? '', body: p.body ?? '' })),
    );
  }

  const roomsMerged = join(rooms.data, roomsI18n.data, 'room_id');
  const fallbackItems = ((messages.rooms as Messages | undefined)?.items as
    | RoomItem[]
    | undefined) ?? [];
  const fallbackBySlug = new Map(fallbackItems.map((it) => [it.slug, it]));
  // Only surface rooms whose slug we still ship (ignore legacy Supabase rows).
  const allowed = roomsMerged.filter((r) => fallbackBySlug.has(r.slug));
  if (allowed.length > 0) {
    const items: RoomItem[] = allowed.map((r) => {
      const fb = fallbackBySlug.get(r.slug)!;
      return {
        slug: r.slug,
        name: r.name ?? fb.name,
        capacity: r.capacity ?? fb.capacity,
        size: r.size ?? fb.size,
        beds: fb.beds,
        desc: r.description ?? fb.desc,
        amenities: r.amenities ?? fb.amenities,
        images: fb.images,
      };
    });
    setByPath(messages, 'rooms.items', items);
  }

  const facilitiesMerged = join(facilities.data, facilitiesI18n.data, 'facility_id');
  if (facilitiesMerged.length > 0) {
    setByPath(
      messages,
      'facilities.items',
      facilitiesMerged.map((f) => ({ name: f.name ?? '', desc: f.description ?? '' })),
    );
  }

  const faqMerged = join(faq.data, faqI18n.data, 'faq_id');
  if (faqMerged.length > 0) {
    setByPath(
      messages,
      'faq.items',
      faqMerged.map((q) => ({ q: q.question ?? '', a: q.answer ?? '' })),
    );
  }

  const notesMerged = join(guestNotes.data, guestNotesI18n.data, 'note_id');
  if (notesMerged.length > 0) {
    setByPath(
      messages,
      'guestNotes.items',
      notesMerged.map((n) => ({ quote: n.quote ?? '', author: n.author ?? '' })),
    );
  }

  const accessMerged = join(locationAccess.data, locationAccessI18n.data, 'access_id');
  if (accessMerged.length > 0) {
    setByPath(
      messages,
      'location.access',
      accessMerged.map((a) => ({ place: a.place ?? '', time: a.time ?? '' })),
    );
  }

  const bulletsMerged = join(longStayBullets.data, longStayBulletsI18n.data, 'bullet_id');
  if (bulletsMerged.length > 0) {
    setByPath(
      messages,
      'longStay.bullets',
      bulletsMerged.map((b) => b.text ?? ''),
    );
  }
}

async function fetchMessages(locale: Locale): Promise<Messages> {
  // JSON is the source of truth. Supabase overlay is retained but disabled
  // until the admin CMS schema is aligned with the new content structure
  // (new scalar keys + 2-room roster + room.images/beds fields).
  const messages = deepClone(FALLBACK[locale]);
  if (process.env.NEXT_PUBLIC_ENABLE_CMS_OVERLAY === 'true') {
    try {
      await overlaySupabase(messages, locale);
    } catch (err) {
      console.warn(`[content] Supabase overlay failed for ${locale}; using JSON fallback.`, err);
    }
  }
  return messages;
}

export async function getMessagesForLocale(locale: Locale): Promise<Messages> {
  if (process.env.NODE_ENV !== 'production') {
    return fetchMessages(locale);
  }
  const cached = unstable_cache(
    () => fetchMessages(locale),
    ['site-content', locale],
    { tags: [SITE_CONTENT_TAG] },
  );
  return cached();
}

export async function getSiteImages(): Promise<Record<string, { url: string; alt: string }>> {
  const fetchImages = async () => {
    const sb = createSupabaseReadOnlyClient();
    const { data } = await sb.from('site_images').select('key, url, alt_text');
    const map: Record<string, { url: string; alt: string }> = {};
    for (const row of data ?? []) {
      map[row.key] = { url: row.url, alt: row.alt_text ?? '' };
    }
    return map;
  };
  if (process.env.NODE_ENV !== 'production') {
    return fetchImages();
  }
  const cached = unstable_cache(fetchImages, ['site-images'], {
    tags: [SITE_CONTENT_TAG],
  });
  return cached();
}
