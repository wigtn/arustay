'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

type Item = { q: string; a: string };

export default function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Item[];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  return (
    <section id="faq" className="bg-sand-100/50">
      <div className="section-shell">
        <FadeIn>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="heading mt-3 max-w-2xl">{t('title')}</h2>
        </FadeIn>

        <div className="mt-12 max-w-3xl divide-y divide-sand-200 border-t border-b border-sand-200">
          {items.map((it, i) => {
            const open = openIdx === i;
            return (
              <FadeIn key={it.q} delay={i * 0.03}>
                <div>
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-base sm:text-lg font-medium text-ink">
                      {it.q}
                    </span>
                    <Plus
                      size={20}
                      strokeWidth={1.6}
                      className={`shrink-0 mt-1 text-ink-mute transition-transform duration-300 ${
                        open ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="whitespace-pre-line pb-5 pr-10 text-ink-soft leading-relaxed">
                          {it.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
