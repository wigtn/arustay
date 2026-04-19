'use client';

import { useState, useTransition } from 'react';

type Row = { key: string; url: string; alt_text: string };

type Props = {
  initial: Row[];
  suggestedKeys: string[];
  uploadAction: (
    fd: FormData,
  ) => Promise<{ ok: true; url: string } | { error: string } | undefined>;
  saveAction: (row: Row) => Promise<{ ok: true } | { error: string } | undefined>;
  deleteAction: (key: string) => Promise<{ ok: true } | { error: string } | undefined>;
};

export default function ImagesEditor({
  initial,
  suggestedKeys,
  uploadAction,
  saveAction,
  deleteAction,
}: Props) {
  const [rows, setRows] = useState<Row[]>(initial);
  const [newKey, setNewKey] = useState('');
  const [pending, startTransition] = useTransition();
  const [flash, setFlash] = useState<{ kind: 'ok' | 'error'; msg: string } | null>(null);

  function flashOk(msg: string) {
    setFlash({ kind: 'ok', msg });
  }
  function flashErr(msg: string) {
    setFlash({ kind: 'error', msg });
  }

  async function handleUpload(key: string, fd: FormData) {
    fd.set('key', key);
    const res = await uploadAction(fd);
    if (!res || 'error' in res) {
      flashErr(res?.error ?? '업로드 실패');
      return;
    }
    setRows((prev) => {
      const alt = String(fd.get('alt') ?? '');
      const idx = prev.findIndex((r) => r.key === key);
      if (idx === -1) return [...prev, { key, url: res.url, alt_text: alt }];
      const next = [...prev];
      next[idx] = { ...next[idx], url: res.url, alt_text: alt };
      return next;
    });
    flashOk(`"${key}" 업로드 완료`);
  }

  async function handleSaveAlt(row: Row) {
    const res = await saveAction(row);
    if (!res || 'error' in res) {
      flashErr(res?.error ?? '저장 실패');
      return;
    }
    flashOk(`"${row.key}" 대체 텍스트 저장`);
  }

  async function handleDelete(key: string) {
    if (!confirm(`"${key}" 이미지를 삭제할까요?`)) return;
    const res = await deleteAction(key);
    if (!res || 'error' in res) {
      flashErr(res?.error ?? '삭제 실패');
      return;
    }
    setRows((prev) => prev.filter((r) => r.key !== key));
    flashOk(`"${key}" 삭제 완료`);
  }

  function addEmptyRow() {
    const k = newKey.trim();
    if (!k) return;
    if (rows.some((r) => r.key === k)) {
      flashErr(`"${k}"는 이미 존재하는 키예요.`);
      return;
    }
    setRows((prev) => [...prev, { key: k, url: '', alt_text: '' }]);
    setNewKey('');
  }

  const visibleKeys = new Set(rows.map((r) => r.key));
  const missingSuggestions = suggestedKeys.filter((k) => !visibleKeys.has(k));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">이미지</h1>
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

      <div className="bg-white border border-neutral-200 rounded-lg p-5 mb-5">
        <div className="text-sm font-medium mb-2">새 키 추가</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="예: room.custom"
            className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
          />
          <button
            onClick={addEmptyRow}
            className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm"
          >
            추가
          </button>
        </div>
        {missingSuggestions.length > 0 && (
          <div className="mt-3 text-xs text-neutral-500">
            추천 키:{' '}
            {missingSuggestions.map((k) => (
              <button
                key={k}
                onClick={() => setNewKey(k)}
                className="inline-block px-2 py-0.5 mr-1 mb-1 bg-neutral-100 rounded hover:bg-neutral-200"
              >
                {k}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <ImageRow
            key={row.key}
            row={row}
            pending={pending}
            onUpload={(fd) => startTransition(() => handleUpload(row.key, fd))}
            onSaveAlt={(alt) => startTransition(() => handleSaveAlt({ ...row, alt_text: alt }))}
            onDelete={() => startTransition(() => handleDelete(row.key))}
          />
        ))}
        {rows.length === 0 && (
          <p className="text-sm text-neutral-500 text-center py-10">
            등록된 이미지가 없어요. 위에서 키를 추가하거나 추천 키 중 하나를 골라 시작하세요.
          </p>
        )}
      </div>
    </div>
  );
}

function ImageRow({
  row,
  pending,
  onUpload,
  onSaveAlt,
  onDelete,
}: {
  row: Row;
  pending: boolean;
  onUpload: (fd: FormData) => void;
  onSaveAlt: (alt: string) => void;
  onDelete: () => void;
}) {
  const [alt, setAlt] = useState(row.alt_text);
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-5">
      <div className="flex items-start justify-between gap-5">
        <div className="flex-shrink-0 w-40 aspect-video bg-neutral-100 rounded-md overflow-hidden">
          {row.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={row.url} alt={row.alt_text} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">
              미업로드
            </div>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-neutral-700">{row.key}</code>
            <button
              onClick={onDelete}
              disabled={pending}
              className="text-xs text-red-600 hover:underline"
            >
              삭제
            </button>
          </div>

          <form
            action={(fd) => {
              fd.set('alt', alt);
              onUpload(fd);
            }}
            className="flex items-end gap-2"
          >
            <div className="flex-1">
              <label className="block text-xs text-neutral-600 mb-1">파일 업로드</label>
              <input
                type="file"
                name="file"
                accept="image/*"
                required
                className="w-full text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm disabled:opacity-50"
            >
              업로드
            </button>
          </form>

          <div>
            <label className="block text-xs text-neutral-600 mb-1">
              대체 텍스트 (alt)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md text-sm"
              />
              <button
                onClick={() => onSaveAlt(alt)}
                disabled={pending || !row.url}
                className="px-3 py-2 bg-white border border-neutral-300 text-sm rounded-md hover:bg-neutral-50 disabled:opacity-50"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
