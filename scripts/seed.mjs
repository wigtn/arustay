#!/usr/bin/env node
/**
 * Seed Supabase with content from content/{ko,en,ja,zh}.json.
 * Idempotent: run as many times as you need. Wipes structured tables then reinserts.
 *
 * Requires: SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL
 * Run:      node --env-file=.env scripts/seed.mjs
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const LOCALES = ['ko', 'en', 'ja', 'zh'];
const ROOM_SLUGS = ['single', 'double', 'twin', 'family'];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.');
  process.exit(1);
}

const sb = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ---------------------------------------------------------------------------
// 1. Load content
// ---------------------------------------------------------------------------
async function loadContent() {
  const byLocale = {};
  for (const locale of LOCALES) {
    const raw = await fs.readFile(
      path.join(root, 'content', `${locale}.json`),
      'utf8',
    );
    byLocale[locale] = JSON.parse(raw);
  }
  return byLocale;
}

// ---------------------------------------------------------------------------
// 2. site_text — scalar key/value
// ---------------------------------------------------------------------------
// Keys the editor considers scalar — everything NOT handled by a structured
// table below.
const SCALAR_PATHS = [
  'meta.title', 'meta.description',
  'nav.about', 'nav.rooms', 'nav.longStay', 'nav.facilities',
  'nav.location', 'nav.guestNotes', 'nav.book',
  'hero.eyebrow', 'hero.title', 'hero.subtitle', 'hero.cta',
  'about.eyebrow', 'about.title', 'about.body',
  'rooms.eyebrow', 'rooms.title', 'rooms.viewDetails', 'rooms.close',
  'rooms.size', 'rooms.capacityLabel', 'rooms.amenitiesLabel',
  'longStay.eyebrow', 'longStay.title', 'longStay.body',
  'longStay.cta', 'longStay.note',
  'facilities.eyebrow', 'facilities.title',
  'location.eyebrow', 'location.title', 'location.body', 'location.nearby',
  'faq.eyebrow', 'faq.title',
  'guestNotes.eyebrow', 'guestNotes.title',
  'booking.eyebrow', 'booking.title', 'booking.body',
  'booking.longStayCta', 'booking.shortStay', 'booking.contact',
  'booking.email', 'booking.instagram', 'booking.booking', 'booking.agoda',
  'floating.cta',
  'footer.tagline', 'footer.rights',
];

function getByPath(obj, dotted) {
  return dotted.split('.').reduce((acc, k) => (acc == null ? acc : acc[k]), obj);
}

async function seedSiteText(byLocale) {
  const rows = [];
  for (const key of SCALAR_PATHS) {
    for (const locale of LOCALES) {
      const value = getByPath(byLocale[locale], key);
      if (typeof value !== 'string') {
        console.warn(`⚠  ${locale}.${key} is not a string, skipping`);
        continue;
      }
      rows.push({ key, locale, value });
    }
  }
  const { error } = await sb
    .from('site_text')
    .upsert(rows, { onConflict: 'key,locale' });
  if (error) throw error;
  console.log(`✓ site_text: ${rows.length} rows upserted`);
}

// ---------------------------------------------------------------------------
// 3. Structured tables — truncate + reinsert
//    (Use when parent identity is generated; keeps seeding clean/repeatable.)
// ---------------------------------------------------------------------------
async function truncate(table) {
  // Use delete-all rather than TRUNCATE (RLS-safe via service key, and
  // the PostgREST API doesn't expose TRUNCATE anyway).
  const { error } = await sb.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) throw error;
}

async function seedAboutPoints(byLocale) {
  await truncate('about_points'); // cascade removes _i18n rows
  const count = byLocale.ko.about.points.length;
  const parents = Array.from({ length: count }, (_, i) => ({ sort_order: i }));
  const { data: inserted, error } = await sb
    .from('about_points')
    .insert(parents)
    .select('id, sort_order');
  if (error) throw error;
  const rows = [];
  for (const row of inserted) {
    for (const locale of LOCALES) {
      const p = byLocale[locale].about.points[row.sort_order];
      rows.push({ point_id: row.id, locale, title: p.title, body: p.body });
    }
  }
  const r = await sb.from('about_points_i18n').insert(rows);
  if (r.error) throw r.error;
  console.log(`✓ about_points: ${inserted.length} parents, ${rows.length} i18n`);
}

async function seedRooms(byLocale) {
  await truncate('rooms');
  const parents = ROOM_SLUGS.map((slug, i) => ({
    slug,
    sort_order: i,
    size: byLocale.ko.rooms.items[i].size, // size is locale-neutral
    image_key: `room.${slug}`,
  }));
  const { data: inserted, error } = await sb
    .from('rooms')
    .insert(parents)
    .select('id, sort_order, slug');
  if (error) throw error;
  const rows = [];
  for (const row of inserted) {
    for (const locale of LOCALES) {
      const item = byLocale[locale].rooms.items[row.sort_order];
      rows.push({
        room_id: row.id,
        locale,
        name: item.name,
        capacity: item.capacity,
        description: item.desc,
        amenities: item.amenities,
      });
    }
  }
  const r = await sb.from('rooms_i18n').insert(rows);
  if (r.error) throw r.error;
  console.log(`✓ rooms: ${inserted.length} parents, ${rows.length} i18n`);
}

async function seedFacilities(byLocale) {
  await truncate('facilities');
  const count = byLocale.ko.facilities.items.length;
  const parents = Array.from({ length: count }, (_, i) => ({ sort_order: i }));
  const { data: inserted, error } = await sb
    .from('facilities')
    .insert(parents)
    .select('id, sort_order');
  if (error) throw error;
  const rows = [];
  for (const row of inserted) {
    for (const locale of LOCALES) {
      const item = byLocale[locale].facilities.items[row.sort_order];
      rows.push({ facility_id: row.id, locale, name: item.name, description: item.desc });
    }
  }
  const r = await sb.from('facilities_i18n').insert(rows);
  if (r.error) throw r.error;
  console.log(`✓ facilities: ${inserted.length} parents, ${rows.length} i18n`);
}

async function seedFaq(byLocale) {
  await truncate('faq');
  const count = byLocale.ko.faq.items.length;
  const parents = Array.from({ length: count }, (_, i) => ({ sort_order: i }));
  const { data: inserted, error } = await sb
    .from('faq')
    .insert(parents)
    .select('id, sort_order');
  if (error) throw error;
  const rows = [];
  for (const row of inserted) {
    for (const locale of LOCALES) {
      const item = byLocale[locale].faq.items[row.sort_order];
      rows.push({ faq_id: row.id, locale, question: item.q, answer: item.a });
    }
  }
  const r = await sb.from('faq_i18n').insert(rows);
  if (r.error) throw r.error;
  console.log(`✓ faq: ${inserted.length} parents, ${rows.length} i18n`);
}

async function seedGuestNotes(byLocale) {
  await truncate('guest_notes');
  const count = byLocale.ko.guestNotes.items.length;
  const parents = Array.from({ length: count }, (_, i) => ({ sort_order: i }));
  const { data: inserted, error } = await sb
    .from('guest_notes')
    .insert(parents)
    .select('id, sort_order');
  if (error) throw error;
  const rows = [];
  for (const row of inserted) {
    for (const locale of LOCALES) {
      const item = byLocale[locale].guestNotes.items[row.sort_order];
      rows.push({ note_id: row.id, locale, quote: item.quote, author: item.author });
    }
  }
  const r = await sb.from('guest_notes_i18n').insert(rows);
  if (r.error) throw r.error;
  console.log(`✓ guest_notes: ${inserted.length} parents, ${rows.length} i18n`);
}

async function seedLocationAccess(byLocale) {
  await truncate('location_access');
  const count = byLocale.ko.location.access.length;
  const parents = Array.from({ length: count }, (_, i) => ({ sort_order: i }));
  const { data: inserted, error } = await sb
    .from('location_access')
    .insert(parents)
    .select('id, sort_order');
  if (error) throw error;
  const rows = [];
  for (const row of inserted) {
    for (const locale of LOCALES) {
      const item = byLocale[locale].location.access[row.sort_order];
      rows.push({ access_id: row.id, locale, place: item.place, time: item.time });
    }
  }
  const r = await sb.from('location_access_i18n').insert(rows);
  if (r.error) throw r.error;
  console.log(`✓ location_access: ${inserted.length} parents, ${rows.length} i18n`);
}

async function seedLongStayBullets(byLocale) {
  await truncate('long_stay_bullets');
  const count = byLocale.ko.longStay.bullets.length;
  const parents = Array.from({ length: count }, (_, i) => ({ sort_order: i }));
  const { data: inserted, error } = await sb
    .from('long_stay_bullets')
    .insert(parents)
    .select('id, sort_order');
  if (error) throw error;
  const rows = [];
  for (const row of inserted) {
    for (const locale of LOCALES) {
      rows.push({
        bullet_id: row.id,
        locale,
        text: byLocale[locale].longStay.bullets[row.sort_order],
      });
    }
  }
  const r = await sb.from('long_stay_bullets_i18n').insert(rows);
  if (r.error) throw r.error;
  console.log(`✓ long_stay_bullets: ${inserted.length} parents, ${rows.length} i18n`);
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
(async () => {
  const byLocale = await loadContent();
  await seedSiteText(byLocale);
  await seedAboutPoints(byLocale);
  await seedRooms(byLocale);
  await seedFacilities(byLocale);
  await seedFaq(byLocale);
  await seedGuestNotes(byLocale);
  await seedLocationAccess(byLocale);
  await seedLongStayBullets(byLocale);
  console.log('\n✅ Seed complete.');
})().catch((err) => {
  console.error('\n❌ Seed failed:');
  console.error(err);
  process.exit(1);
});
