import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';
import { LONG_STAY_FORM_URL } from '@/lib/constants';

export default function LongStay() {
  const t = useTranslations('longStay');
  const bullets = t.raw('bullets') as string[];

  return (
    <section id="long-stay" className="bg-ink text-sand-50">
      <div className="section-shell">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn>
            <p className="eyebrow !text-sand-50/60">{t('eyebrow')}</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
              {t('title')}
            </h2>
            <p className="mt-6 text-sand-50/80 leading-relaxed max-w-lg">{t('body')}</p>
            <a
              href={LONG_STAY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sand-50 text-ink text-sm font-medium hover:bg-white transition-colors"
            >
              {t('cta')}
              <span aria-hidden>→</span>
            </a>
            <p className="mt-3 text-xs text-sand-50/50">{t('note')}</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ul className="space-y-5">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-4 border-t border-sand-50/15 pt-5">
                  <span className="font-serif text-sand-50/50 text-sm mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-sand-50/90">{b}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
