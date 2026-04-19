import { createSupabaseServerClient } from '@/lib/supabase/server';
import { LOCALES, type Locale } from '@/lib/supabase/types';
import type { ListItem } from '../_components/ListEditor';

/**
 * Fetch parent + i18n rows for a structured list, assemble into ListItem[].
 * Parent fields kept as strings in `parent_extra`.
 */
export async function loadStructuredList(opts: {
  parentTable: string;
  i18nTable: string;
  parentFk: string;
  parentExtraCols?: string[];
  i18nCols: string[];
}): Promise<ListItem[]> {
  const { parentTable, i18nTable, parentFk, parentExtraCols = [], i18nCols } = opts;
  const sb = await createSupabaseServerClient();

  const parentCols = ['id', 'sort_order', ...parentExtraCols].join(', ');
  const { data: parents } = await sb.from(parentTable).select(parentCols).order('sort_order');
  const { data: i18n } = await sb
    .from(i18nTable)
    .select([parentFk, 'locale', ...i18nCols].join(', '));

  const parentRows = (parents ?? []) as unknown as Array<Record<string, unknown>>;
  const i18nRows = (i18n ?? []) as unknown as Array<Record<string, unknown>>;

  const byParent = new Map<string, Record<Locale, Record<string, unknown>>>();
  for (const p of parentRows) {
    byParent.set(p.id as string, LOCALES.reduce(
      (acc, l) => ({ ...acc, [l]: {} }),
      {} as Record<Locale, Record<string, unknown>>,
    ));
  }
  for (const row of i18nRows) {
    const id = row[parentFk] as string;
    const locale = row.locale as Locale;
    const bucket = byParent.get(id);
    if (!bucket) continue;
    for (const col of i18nCols) {
      bucket[locale][col] = row[col];
    }
  }

  return parentRows.map((p) => {
    const parent_extra: Record<string, string> = {};
    for (const col of parentExtraCols) {
      const v = p[col];
      parent_extra[col] = v == null ? '' : String(v);
    }
    return {
      id: p.id as string,
      sort_order: (p.sort_order as number) ?? 0,
      parent_extra,
      i18n: byParent.get(p.id as string)!,
    } satisfies ListItem;
  });
}
