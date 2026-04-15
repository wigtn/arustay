'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LONG_STAY_FORM_URL } from '@/lib/constants';

export default function FloatingCTA() {
  const t = useTranslations('floating');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const about = document.getElementById('about');
    const book = document.getElementById('book');
    if (!about) return;

    const onScroll = () => {
      const scrolled = window.scrollY > (about.offsetTop + 200);
      const inBook = book
        ? window.scrollY + window.innerHeight > book.offsetTop + 100
        : false;
      setVisible(scrolled && !inBook);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={LONG_STAY_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`lg:hidden fixed bottom-5 right-5 z-40 px-5 py-3 rounded-full bg-ink text-sand-50 text-sm font-medium shadow-lg transition-all ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      {t('cta')}
    </a>
  );
}
