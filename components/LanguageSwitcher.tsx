'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { LOCALE_LABELS } from '@/lib/constants';
import { useTransition } from 'react';

type Props = { variant?: 'light' | 'dark' };

export default function LanguageSwitcher({ variant = 'light' }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelect = (next: string) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as 'en' });
    });
  };

  const activeCls =
    variant === 'dark' ? 'text-sand-50 font-medium' : 'text-ink font-medium';
  const idleCls =
    variant === 'dark'
      ? 'text-sand-50/60 hover:text-sand-50'
      : 'text-ink-mute hover:text-ink';
  const divider =
    variant === 'dark' ? 'text-sand-50/30' : 'text-ink-mute/40';

  return (
    <div className="flex items-center gap-2.5 text-xs">
      {routing.locales.map((l, idx) => (
        <div key={l} className="flex items-center gap-2.5">
          <button
            onClick={() => onSelect(l)}
            disabled={isPending}
            className={`transition-colors uppercase tracking-wider ${
              locale === l ? activeCls : idleCls
            }`}
          >
            {LOCALE_LABELS[l]}
          </button>
          {idx < routing.locales.length - 1 && (
            <span className={divider}>·</span>
          )}
        </div>
      ))}
    </div>
  );
}
