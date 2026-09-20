"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing, type Locale } from "@/i18n/routing";
import { LOCALE_LABELS } from "@/lib/constants";
import { useTransition } from "react";
import { ChevronDown, Globe2 } from "lucide-react";
import { getCopy } from "@/lib/renewal-copy";

type Props = {
  variant?: "light" | "dark";
  onChange?: () => void;
  compact?: boolean;
};

export default function LanguageSwitcher({
  variant = "light",
  onChange,
  compact = false,
}: Props) {
  const locale = useLocale();
  const c = getCopy(locale);
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelect = (next: Locale) => {
    if (next === locale) return;
    onChange?.();
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const activeCls =
    variant === "dark" ? "text-sand-50 font-medium" : "text-ink font-medium";
  const idleCls =
    variant === "dark"
      ? "text-sand-50/60 hover:text-sand-50"
      : "text-ink-mute hover:text-ink";
  const divider = variant === "dark" ? "text-sand-50/30" : "text-ink-mute/40";

  if (compact)
    return (
      <div className="language-select">
        <Globe2 size={16} className="language-globe" aria-hidden />
        <select
          value={locale}
          onChange={(event) => onSelect(event.target.value as Locale)}
          disabled={isPending}
          aria-label={c.language}
        >
          {routing.locales.map((lang) => (
            <option key={lang} value={lang} lang={lang}>
              {LOCALE_LABELS[lang]}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="language-chevron" aria-hidden />
      </div>
    );

  return (
    <div
      className="flex flex-wrap items-center gap-1 text-xs"
      aria-label={c.language}
    >
      {routing.locales.map((l, idx) => (
        <div key={l} className="flex items-center gap-1">
          <button
            onClick={() => onSelect(l)}
            disabled={isPending}
            aria-pressed={locale === l}
            lang={l}
            className={`min-h-11 px-1 transition-colors uppercase tracking-wider ${
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
