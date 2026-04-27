'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import LegalModal from './LegalModal';
import { LEGAL_LOCALES, PRIVACY, TERMS, type LegalLocale } from '@/lib/legal';

type Open = null | 'privacy' | 'terms';

export default function LegalLinks() {
  const t = useTranslations('footer');
  const siteLocale = useLocale();
  const initialLocale: LegalLocale = (LEGAL_LOCALES as readonly string[]).includes(siteLocale)
    ? (siteLocale as LegalLocale)
    : 'ko';
  const [open, setOpen] = useState<Open>(null);

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <button
          type="button"
          onClick={() => setOpen('privacy')}
          className="text-ink underline-offset-4 hover:underline transition-colors"
        >
          {t('privacy')}
        </button>
        <span aria-hidden className="text-ink-mute">
          ·
        </span>
        <button
          type="button"
          onClick={() => setOpen('terms')}
          className="text-ink underline-offset-4 hover:underline transition-colors"
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
