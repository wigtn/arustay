'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import LegalModal from './LegalModal';
import { LEGAL_LOCALES, PRIVACY, TERMS, type LegalLocale } from '@/lib/legal';

type Open = null | 'privacy' | 'terms';

const isLegalLocale = (l: string): l is LegalLocale =>
  (LEGAL_LOCALES as readonly string[]).includes(l);

export default function LegalLinks({ className }: { className?: string }) {
  const t = useTranslations('footer');
  const currentLocale = useLocale();
  const initialLocale: LegalLocale = isLegalLocale(currentLocale)
    ? currentLocale
    : 'ko';
  const [open, setOpen] = useState<Open>(null);

  return (
    <>
      <div
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${className ?? 'text-ink'}`}
      >
        <button
          type="button"
          onClick={() => setOpen('privacy')}
          className="underline-offset-4 hover:underline transition-colors"
        >
          {t('privacy')}
        </button>
        <span aria-hidden className="opacity-60">
          ·
        </span>
        <button
          type="button"
          onClick={() => setOpen('terms')}
          className="underline-offset-4 hover:underline transition-colors"
        >
          {t('terms')}
        </button>
      </div>

      <LegalModal
        open={open === 'privacy'}
        onClose={() => setOpen(null)}
        docs={PRIVACY}
        initialLocale={initialLocale}
      />
      <LegalModal
        open={open === 'terms'}
        onClose={() => setOpen(null)}
        docs={TERMS}
        initialLocale={initialLocale}
      />
    </>
  );
}
