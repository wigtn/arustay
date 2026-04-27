'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LegalModal from './LegalModal';
import { PRIVACY, TERMS } from '@/lib/legal';

type Open = null | 'privacy' | 'terms';

export default function LegalLinks() {
  const t = useTranslations('footer');
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
        initialLocale="ko"
      />
      <LegalModal
        open={open === 'terms'}
        onClose={() => setOpen(null)}
        docs={TERMS}
        initialLocale="ko"
      />
    </>
  );
}
