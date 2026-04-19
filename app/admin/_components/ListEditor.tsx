'use client';

import { useState, useTransition } from 'react';
import { LOCALES, type Locale } from '@/lib/supabase/types';

const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

export type FieldDef = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'tags'; // tags = string[] (comma-separated in UI)
};

export type ListItem = {
  id?: string;
  sort_order: number;
  parent_extra?: Record<string, string>;
  i18n: Record<Locale, Record<string, unknown>>;
};

export type SaveResult = { ok: true } | { error: string } | undefined;

type Props = {
  title: string;
  initialItems: ListItem[];
  localeFields: FieldDef[];
  parentFields?: FieldDef[];
  onSave: (items: ListItem[]) => Promise<SaveResult>;
  emptyParent?: Record<string, string>;
  emptyLocaleValue?: Record<string, unknown>;
};

function emptyI18n(emptyLocaleValue: Record<string, unknown>) {
  return LOCALES.reduce(
    (acc, l) => ({ ...acc, [l]: { ...emptyLocaleValue } }),
    {} as Record<Locale, Record<string, unknown>>,
  );
}

export default function ListEditor({
  title,
  initialItems,
  localeFields,
  parentFields = [],
  onSave,
  emptyParent = {},
  emptyLocaleValue = {},
}: Props) {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [activeLocale, setActiveLocale] = useState<Locale>('ko');
  const [pending, startTransition] = useTransition();
  const [flash, setFlash] = useState<{ kind: 'ok' | 'error'; msg: string } | null>(null);

  function updateField(idx: number, field: string, value: unknown, forParent = false) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        if (forParent) {
          return { ...item, parent_extra: { ...item.parent_extra, [field]: String(value) } };
        }
        return {
          ...item,
          i18n: {
            ...item.i18n,
            [activeLocale]: { ...item.i18n[activeLocale], [field]: value },
          },
        };
      }),
    );
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        sort_order: prev.length,
        parent_extra: { ...emptyParent },
        i18n: emptyI18n(emptyLocaleValue),
      },
    ]);
  }

  function deleteItem(idx: number) {
    if (!confirm('이 항목을 삭제할까요?')) return;
    setItems((prev) => prev.filter((_, i) => i !== idx).map((it, i) => ({ ...it, sort_order: i })));
  }

  function move(idx: number, dir: -1 | 1) {
    setItems((prev) => {
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[target]] = [copy[target], copy[idx]];
      return copy.map((it, i) => ({ ...it, sort_order: i }));
    });
  }

  function handleSave() {
    setFlash(null);
    startTransition(async () => {
      const result = await onSave(items);
      if (result && 'error' in result) {
        setFlash({ kind: 'error', msg: result.error });
      } else {
        setFlash({ kind: 'ok', msg: '저장했어요. 사이트에 반영됩니다.' });
      }
    });
  }

  function renderField(item: ListItem, idx: number, field: FieldDef, forParent: boolean) {
    const value = forParent
      ? (item.parent_extra?.[field.name] ?? '')
      : (item.i18n[activeLocale]?.[field.name] ?? '');

    if (field.type === 'textarea') {
      return (
        <textarea
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
          rows={3}
          value={String(value)}
          onChange={(e) => updateField(idx, field.name, e.target.value, forParent)}
        />
      );
    }
    if (field.type === 'tags') {
      const arr = Array.isArray(value) ? (value as string[]) : [];
      return (
        <input
          type="text"
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
          value={arr.join(', ')}
          placeholder="쉼표로 구분 (예: Wi-Fi, 에어컨)"
          onChange={(e) => {
            const parts = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
            updateField(idx, field.name, parts, forParent);
          }}
        />
      );
    }
    return (
      <input
        type="text"
        className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
        value={String(value)}
        onChange={(e) => updateField(idx, field.name, e.target.value, forParent)}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button
          onClick={handleSave}
          disabled={pending}
          className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm hover:bg-neutral-800 disabled:opacity-50"
        >
          {pending ? '저장 중...' : '저장'}
        </button>
      </div>

      {flash && (
        <div
          className={`mb-4 px-4 py-2 rounded-md text-sm ${
            flash.kind === 'ok'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {flash.msg}
        </div>
      )}

      <div className="mb-4 flex gap-1 text-sm">
        {LOCALES.map((l) => (
          <button
            key={l}
            onClick={() => setActiveLocale(l)}
            className={`px-3 py-1.5 rounded-md ${
              activeLocale === l
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id ?? `new-${idx}`} className="bg-white border border-neutral-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-neutral-500">#{idx + 1}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  className="px-2 py-1 text-xs text-neutral-600 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(idx, 1)}
                  disabled={idx === items.length - 1}
                  className="px-2 py-1 text-xs text-neutral-600 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => deleteItem(idx)}
                  className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                >
                  삭제
                </button>
              </div>
            </div>

            {parentFields.length > 0 && (
              <div className="space-y-3 mb-4 pb-4 border-b border-neutral-100">
                <div className="text-xs text-neutral-500">공통 (언어 무관)</div>
                {parentFields.map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs text-neutral-600 mb-1">{f.label}</label>
                    {renderField(item, idx, f, true)}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              {localeFields.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs text-neutral-600 mb-1">
                    {f.label}{' '}
                    <span className="text-neutral-400">[{LOCALE_LABELS[activeLocale]}]</span>
                  </label>
                  {renderField(item, idx, f, false)}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full px-4 py-3 border border-dashed border-neutral-300 rounded-lg text-sm text-neutral-600 hover:bg-white hover:border-neutral-400"
        >
          + 항목 추가
        </button>
      </div>
    </div>
  );
}
