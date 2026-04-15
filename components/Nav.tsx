'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SECTION_IDS, type SectionId } from '@/lib/constants';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_KEYS: Array<{ id: SectionId; key: keyof NavKeyMap }> = [
  { id: 'about', key: 'about' },
  { id: 'rooms', key: 'rooms' },
  { id: 'long-stay', key: 'longStay' },
  { id: 'facilities', key: 'facilities' },
  { id: 'location', key: 'location' },
  { id: 'guest-notes', key: 'guestNotes' },
  { id: 'book', key: 'book' },
];

type NavKeyMap = {
  about: string;
  rooms: string;
  longStay: string;
  facilities: string;
  location: string;
  guestNotes: string;
  book: string;
};

export default function Nav() {
  const t = useTranslations('nav');
  const [active, setActive] = useState<SectionId>('about');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (entries: IntersectionObserverEntry[]) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id as SectionId);
    };

    const io = new IntersectionObserver(handler, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onDark = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onDark
          ? 'bg-transparent'
          : 'bg-sand-50/95 backdrop-blur border-b border-sand-200'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 h-[72px] gap-6">
        <button
          onClick={() => handleClick('about')}
          className={`font-serif text-xl tracking-[0.15em] font-medium whitespace-nowrap transition-colors ${
            onDark ? 'text-sand-50' : 'text-ink'
          }`}
        >
          ARU STAY
        </button>

        <nav className="hidden xl:flex items-center gap-7">
          {NAV_KEYS.map(({ id, key }) => {
            const isActive = active === id;
            const color = onDark
              ? isActive
                ? 'text-sand-50'
                : 'text-sand-50/70 hover:text-sand-50'
              : isActive
                ? 'text-ink font-medium'
                : 'text-ink-mute hover:text-ink';
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`text-sm transition-colors whitespace-nowrap ${color}`}
              >
                {t(key)}
              </button>
            );
          })}
          <div className="pl-4 ml-2 border-l border-current/20">
            <LanguageSwitcher variant={onDark ? 'dark' : 'light'} />
          </div>
        </nav>

        <button
          className="xl:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 transition-all ${
              onDark ? 'bg-sand-50' : 'bg-ink'
            } ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 transition-opacity ${
              onDark ? 'bg-sand-50' : 'bg-ink'
            } ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all ${
              onDark ? 'bg-sand-50' : 'bg-ink'
            } ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-sand-200 bg-sand-50/95 backdrop-blur">
          <nav className="flex flex-col px-5 py-6 gap-4">
            {NAV_KEYS.map(({ id, key }) => (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className={`text-left text-base ${
                  active === id ? 'text-ink font-medium' : 'text-ink-soft'
                }`}
              >
                {t(key)}
              </button>
            ))}
            <div className="pt-4 border-t border-sand-200">
              <LanguageSwitcher variant="light" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
