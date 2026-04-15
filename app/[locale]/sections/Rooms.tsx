'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Users, Maximize2, Check } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

type Room = {
  name: string;
  capacity: string;
  size: string;
  desc: string;
  amenities: string[];
};

const IMAGES = [
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=80',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80',
];

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
  const activeImage = openIdx !== null ? IMAGES[openIdx % IMAGES.length] : '';

  return (
    <section id="rooms" className="bg-sand-100/50">
      <div className="section-shell">
        <FadeIn>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="heading mt-3 max-w-2xl">{t('title')}</h2>
        </FadeIn>

        <div className="mt-14 grid sm:grid-cols-2 gap-6 md:gap-8">
          {items.map((room, i) => (
            <FadeIn key={room.name} delay={i * 0.05}>
              <button
                onClick={() => setOpenIdx(i)}
                className="group relative overflow-hidden rounded-2xl bg-sand-200 aspect-[4/5] w-full text-left"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(42,38,35,0) 40%, rgba(42,38,35,0.82) 100%), url(${IMAGES[i % IMAGES.length]})`,
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-sand-50">
                  <p className="text-xs tracking-wider2 uppercase text-sand-50/80">
                    {room.capacity}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl">{room.name}</h3>
                  <p className="mt-2 text-sm text-sand-50/90 max-w-xs leading-relaxed">
                    {room.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-sand-50/90 group-hover:text-sand-50">
                    {t('viewDetails')} <span aria-hidden>→</span>
                  </span>
                </div>
              </button>
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
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-auto bg-sand-50 rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setOpenIdx(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-sand-50/90 text-ink hover:bg-white transition-colors"
                aria-label={t('close')}
              >
                <X size={18} strokeWidth={1.8} />
              </button>

              <div className="grid md:grid-cols-2">
                <div
                  className="aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${activeImage})` }}
                  aria-hidden
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
