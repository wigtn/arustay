'use client';

import { Fragment, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import {
  LEGAL_LOCALES,
  LEGAL_LOCALE_LABELS,
  type LegalDoc,
  type LegalLocale,
} from '@/lib/legal';

type Props = {
  open: boolean;
  onClose: () => void;
  docs: Record<LegalLocale, LegalDoc>;
  initialLocale: LegalLocale;
};

const LOGO_SRC = '/images/' + encodeURIComponent('아루스테이 로고-3.png');
const subscribeToClient = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function LegalModal(props: Props) {
  const mounted = useSyncExternalStore(subscribeToClient, clientSnapshot, serverSnapshot);
  if (!mounted || !props.open) return null;
  return <LegalModalContent key={props.initialLocale} {...props} />;
}

function LegalModalContent({ onClose, docs, initialLocale }: Omit<Props, 'open'>) {
  const [locale, setLocale] = useState<LegalLocale>(initialLocale);
  useEffect(() => {
    const overflow = document.body.style.overflow;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const doc = docs[locale];
  const blocks = useMemo(() => parseMarkdown(doc.markdown), [doc.markdown]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
      className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/30 backdrop-blur-[2px] p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-3xl bg-white text-ink flex flex-col max-h-screen sm:max-h-[90vh] sm:rounded-sm shadow-xl border border-neutral-200"
      >
        <header className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-neutral-200">
          <Link href="/" className="flex items-center" aria-label="ARU STAY">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="ARU STAY"
              className="h-7 w-auto"
            />
          </Link>
          <div className="flex items-center gap-3">
            <LangSelect value={locale} onChange={setLocale} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 -mr-1 text-neutral-500 hover:text-ink transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        <div className="overflow-y-auto px-5 sm:px-12 py-8 sm:py-12 prose-legal">
          {blocks}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function LangSelect({
  value,
  onChange,
}: {
  value: LegalLocale;
  onChange: (l: LegalLocale) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LegalLocale)}
        aria-label="Language"
        className="appearance-none bg-transparent border border-neutral-300 text-xs tracking-wider2 text-ink py-1.5 pl-3 pr-7 hover:border-ink transition-colors cursor-pointer focus:outline-none focus:border-ink"
      >
        {LEGAL_LOCALES.map((l) => (
          <option key={l} value={l}>
            {LEGAL_LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        strokeWidth={1.5}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
      />
    </div>
  );
}

function parseMarkdown(source: string): ReactNode {
  const lines = source.split('\n');
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('### ')) {
      out.push(
        <h3 key={key++} className="text-base font-medium text-ink mt-8 mb-3">
          {renderInline(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      out.push(
        <h2
          key={key++}
          className="text-lg font-medium text-ink mt-10 mb-4 pb-2 border-b border-neutral-200"
        >
          {renderInline(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }
    if (line.startsWith('# ')) {
      out.push(
        <h1
          key={key++}
          className="text-2xl sm:text-3xl font-medium tracking-tight text-ink mb-8"
        >
          {renderInline(line.slice(2))}
        </h1>,
      );
      i++;
      continue;
    }
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      out.push(
        <ul
          key={key++}
          className="list-disc pl-5 my-3 space-y-1.5 text-[13px] sm:text-sm text-neutral-700 leading-relaxed"
        >
          {items.map((it, j) => (
            <li key={j}>{renderInline(it)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    if (line.trim() === '') {
      i++;
      continue;
    }
    out.push(
      <p
        key={key++}
        className="my-3 text-[13px] sm:text-sm text-neutral-700 leading-relaxed"
      >
        {renderInline(line)}
      </p>,
    );
    i++;
  }

  return <>{out}</>;
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return (
            <strong key={i} className="font-medium text-ink">
              {p.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
