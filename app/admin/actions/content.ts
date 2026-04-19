'use server';

import { updateTag } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { SITE_CONTENT_TAG } from '@/lib/content';
import { LOCALES, type Locale } from '@/lib/supabase/types';

type LocaleMap<T> = Partial<Record<Locale, T>>;

type StructuredItem = {
  id?: string;
  sort_order: number;
  parent_extra?: Record<string, unknown>; // extra columns on parent table (e.g. rooms.size)
  i18n: LocaleMap<Record<string, unknown>>;
};

async function requireAuth() {
  const sb = await createSupabaseServerClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return sb;
}

export async function saveSiteText(rows: { key: string; locale: Locale; value: string }[]) {
  const sb = await requireAuth();
  const { error } = await sb.from('site_text').upsert(rows, { onConflict: 'key,locale' });
  if (error) return { error: error.message };
  updateTag(SITE_CONTENT_TAG);
  return { ok: true as const };
}

/**
 * Save structured list: replaces parent+i18n rows for the given table.
 * Delete removed items (by id), insert new items (no id), update kept items.
 */
export async function saveStructuredList(opts: {
  parentTable: string;
  i18nTable: string;
  parentFk: string; // column in i18n table pointing at parent (e.g. 'room_id')
  items: StructuredItem[];
  parentSlugField?: string; // if set, rooms.slug for example — required on insert
}) {
  const { parentTable, i18nTable, parentFk, items } = opts;
  const sb = await requireAuth();

  // 1. Fetch current parent IDs to figure out deletes.
  const { data: existing, error: fetchErr } = await sb.from(parentTable).select('id');
  if (fetchErr) return { error: fetchErr.message };
  const existingIds = new Set((existing ?? []).map((r) => r.id));
  const submittedIds = new Set(items.filter((i) => i.id).map((i) => i.id as string));
  const toDelete = [...existingIds].filter((id) => !submittedIds.has(id));

  if (toDelete.length > 0) {
    const { error } = await sb.from(parentTable).delete().in('id', toDelete);
    if (error) return { error: error.message };
  }

  // 2. Upsert parents. Split into insert vs update based on presence of id.
  const toInsert = items.filter((i) => !i.id).map((i) => ({
    sort_order: i.sort_order,
    ...(i.parent_extra ?? {}),
  }));
  const toUpdate = items.filter((i) => i.id).map((i) => ({
    id: i.id!,
    sort_order: i.sort_order,
    ...(i.parent_extra ?? {}),
  }));

  let insertedRows: { id: string }[] = [];
  if (toInsert.length > 0) {
    const { data, error } = await sb.from(parentTable).insert(toInsert).select('id');
    if (error) return { error: error.message };
    insertedRows = data ?? [];
  }

  for (const row of toUpdate) {
    const { id, ...rest } = row;
    const { error } = await sb.from(parentTable).update(rest).eq('id', id);
    if (error) return { error: error.message };
  }

  // 3. Rebuild the id list aligning with the submitted items order.
  // New items get ids assigned in insertion order.
  const idQueue = [...insertedRows];
  const itemIds: string[] = items.map((i) => {
    if (i.id) return i.id;
    const next = idQueue.shift();
    if (!next) throw new Error('ID queue drained unexpectedly');
    return next.id;
  });

  // 4. Upsert i18n rows (one per locale per item). Empty/missing locale entries skipped.
  const i18nRows: Record<string, unknown>[] = [];
  items.forEach((item, idx) => {
    const id = itemIds[idx];
    for (const locale of LOCALES) {
      const fields = item.i18n[locale];
      if (!fields) continue;
      i18nRows.push({ [parentFk]: id, locale, ...fields });
    }
  });
  if (i18nRows.length > 0) {
    const { error } = await sb
      .from(i18nTable)
      .upsert(i18nRows, { onConflict: `${parentFk},locale` });
    if (error) return { error: error.message };
  }

  updateTag(SITE_CONTENT_TAG);
  return { ok: true as const };
}

export async function saveSiteImage(row: { key: string; url: string; alt_text: string }) {
  const sb = await requireAuth();
  const { error } = await sb.from('site_images').upsert(row, { onConflict: 'key' });
  if (error) return { error: error.message };
  updateTag(SITE_CONTENT_TAG);
  return { ok: true as const };
}

export async function deleteSiteImage(key: string) {
  const sb = await requireAuth();
  const { error } = await sb.from('site_images').delete().eq('key', key);
  if (error) return { error: error.message };
  updateTag(SITE_CONTENT_TAG);
  return { ok: true as const };
}
