'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Users, Maximize2, Check, BedDouble } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import RoomCarousel from '@/components/RoomCarousel';

type Room = {
  slug: string;
  name: string;
  capacity: string;
  size: string;
  beds: string;
  desc: string;
  amenities: string[];
  priceFrom: string;
  rates: { weekday: string; fri: string; sat: string };
  images: string[];
};

export default function Rooms() {
  const t = useTranslations('rooms');
  const items = t.raw('items') as Room[];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openIdx]);

  const active = openIdx !== null ? items[openIdx] : null;

  const carouselLabels = {
    prev: t('prev'),
    next: t('next'),
    slide: (current: number, total: number) => t('slide', { current, total }),
  };

  return (
    <section id="rooms" className="bg-sand-100/50">
      <div className="section-shell">
        <FadeIn>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="heading mt-3 max-w-2xl">{t('title')}</h2>
          <p className="lede mt-5 max-w-2xl">{t('subtitle')}</p>
        </FadeIn>

        <div className="mt-14 grid sm:grid-cols-2 gap-6 md:gap-8">
          {items.map((room, i) => (
            <FadeIn key={room.slug} delay={i * 0.05}>
              <div className="group overflow-hidden rounded-sm bg-sand-50 ring-1 ring-sand-200/70 transition-all duration-500 hover:-translate-y-1.5 hover:ring-ink/40 hover:shadow-[0_24px_48px_-24px_rgba(42,38,35,0.28)]">
                <RoomCarousel
                  images={room.images}
                  alt={room.name}
                  labels={carouselLabels}
                  className="aspect-[4/3] w-full"
                />
                <div className="p-6 sm:p-7">
                  <p className="text-xs tracking-wider2 uppercase text-ink-mute">
                    {room.capacity} · {room.size}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-ink">
                    {room.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {room.beds}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(i)}
                      className="group/btn inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[11px] uppercase tracking-wider2 text-ink transition-all duration-300 hover:bg-ink hover:text-sand-50"
                    >
                      <span>{t('viewDetails')}</span>
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
                      >
                        →
                      </span>
                    </button>
                    <p className="text-sm text-ink-soft">
                      {t('priceFrom', { price: room.priceFrom })}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
              onClick={() => setOpenIdx(null)}
              aria-label="Close modal backdrop"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.name}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-auto bg-sand-50 rounded-sm shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setOpenIdx(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-sand-50/90 text-ink hover:bg-white transition-colors shadow-sm"
                aria-label={t('close')}
              >
                <X size={18} strokeWidth={1.8} />
              </button>

              <div className="grid md:grid-cols-2">
                <RoomCarousel
                  images={active.images}
                  alt={active.name}
                  labels={carouselLabels}
                  className="aspect-[4/3] md:aspect-auto md:min-h-[480px] md:h-full"
                />
                <div className="p-7 sm:p-10">
                  <p className="eyebrow">{t('eyebrow')}</p>
                  <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-ink leading-tight">
                    {active.name}
                  </h3>
                  <p className="mt-4 text-ink-soft leading-relaxed">{active.desc}</p>

                  <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2.5">
                      <Users size={16} strokeWidth={1.6} className="text-ink-mute" />
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-ink-mute">
                          {t('capacityLabel')}
                        </dt>
                        <dd className="text-ink">{active.capacity}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Maximize2 size={16} strokeWidth={1.6} className="text-ink-mute" />
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-ink-mute">
                          {t('size')}
                        </dt>
                        <dd className="text-ink">{active.size}</dd>
                      </div>
                    </div>
                  </dl>

                  <div className="mt-5 flex items-start gap-2.5 text-sm">
                    <BedDouble size={16} strokeWidth={1.6} className="text-ink-mute mt-0.5" />
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-ink-mute">
                        {t('bedsLabel')}
                      </dt>
                      <dd className="text-ink">{active.beds}</dd>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-sand-200">
                    <p className="text-xs uppercase tracking-wider text-ink-mute">
                      {t('amenitiesLabel')}
                    </p>
                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-ink-soft">
                      {active.amenities.map((a) => (
                        <li key={a} className="flex items-center gap-2">
                          <Check size={14} strokeWidth={2} className="text-sand-500 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-sand-200">
                    <p className="text-xs uppercase tracking-wider text-ink-mute">
                      {t('rateLabel')}
                    </p>
                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
                      <dt className="text-ink-mute">{t('rateRows.weekday')}</dt>
                      <dd className="text-ink font-medium tabular-nums">
                        {active.rates.weekday}
                      </dd>
                      <dt className="text-ink-mute">{t('rateRows.fri')}</dt>
                      <dd className="text-ink font-medium tabular-nums">
                        {active.rates.fri}
                      </dd>
                      <dt className="text-ink-mute">{t('rateRows.sat')}</dt>
                      <dd className="text-ink font-medium tabular-nums">
                        {active.rates.sat}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
