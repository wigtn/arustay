'use client';

import { useState, useTransition } from 'react';
import { LOCALES, type Locale } from '@/lib/supabase/types';

const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

export type TextRowMap = Record<string, Partial<Record<Locale, string>>>;

type Section = {
  section: string;
  label: string;
  keys: { key: string; label: string; type?: 'text' | 'textarea' }[];
};

type Props = {
  sections: Section[];
  initialRows: TextRowMap;
  onSave: (rows: TextRowMap) => Promise<{ ok: true } | { error: string } | undefined>;
};

export default function TextsEditor({ sections, initialRows, onSave }: Props) {
  const [rows, setRows] = useState<TextRowMap>(initialRows);
  const [active, setActive] = useState<string>(sections[0]!.section);
  const [pending, startTransition] = useTransition();
  const [flash, setFlash] = useState<{ kind: 'ok' | 'error'; msg: string } | null>(null);

  function update(key: string, locale: Locale, value: string) {
    setRows((prev) => ({ ...prev, [key]: { ...prev[key], [locale]: value } }));
  }

  function save() {
    setFlash(null);
    startTransition(async () => {
      const res = await onSave(rows);
      if (res && 'error' in res) setFlash({ kind: 'error', msg: res.error });
      else setFlash({ kind: 'ok', msg: '저장했어요. 사이트에 반영됩니다.' });
    });
  }

  const current = sections.find((s) => s.section === active)!;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">텍스트</h1>
        <button
          onClick={save}
          disabled={pending}
          className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm hover:bg-neutral-800 disabled:opacity-50"
        >
          {pending ? '저장 중...' : '전체 저장'}
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

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.section}
            onClick={() => setActive(s.section)}
            className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${
              active === s.section
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-6">
        {current.keys.map((k) => (
          <div key={k.key}>
            <div className="text-sm font-medium mb-2">{k.label}</div>
            <div className="text-xs text-neutral-400 mb-2 font-mono">{k.key}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LOCALES.map((l) => (
                <label key={l} className="block">
                  <span className="text-xs text-neutral-500 mb-1 block">{LOCALE_LABELS[l]}</span>
                  {k.type === 'textarea' ? (
                    <textarea
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                      rows={3}
                      value={rows[k.key]?.[l] ?? ''}
                      onChange={(e) => update(k.key, l, e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                      value={rows[k.key]?.[l] ?? ''}
                      onChange={(e) => update(k.key, l, e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
