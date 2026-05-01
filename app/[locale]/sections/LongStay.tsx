import { useTranslations } from 'next-intl';
import { FileText, Search, Mail, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import LegalLinks from '@/components/LegalLinks';
import { LONG_STAY_FORM_URL } from '@/lib/constants';

const STEP_ICONS = [FileText, Search, Mail, CreditCard, CheckCircle2];

export default function LongStay() {
  const t = useTranslations('longStay');
  const bullets = t.raw('bullets') as string[];
  const steps = t.raw('process.steps') as string[];

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

        <FadeIn delay={0.2}>
          <div className="mt-16 md:mt-20">
            <h3 className="font-serif text-center text-2xl sm:text-3xl md:text-4xl">
              {t('process.heading')}
            </h3>
            <div className="mt-8 md:mt-10 mx-auto h-px w-24 bg-sand-50/30" aria-hidden />

            <ol className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-9 gap-y-10 md:gap-y-0 items-start">
              {steps.map((label, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li key={i} className="contents">
                    <div className="md:col-span-1 flex flex-col items-center text-center">
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full font-serif text-sm"
                        style={{ backgroundColor: '#f8f3ed', color: '#000000' }}
                      >
                        {i + 1}
                      </span>
                      <Icon
                        className="mt-4 w-10 h-10 md:w-11 md:h-11 stroke-[1.25] text-sand-50/85"
                        aria-hidden
                      />
                      <span className="mt-4 text-xs sm:text-sm text-sand-50/85 leading-snug max-w-[10rem]">
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="md:col-span-1 hidden md:flex justify-center items-start pt-[4.25rem]">
                        <ArrowRight className="w-5 h-5 text-sand-50/40" aria-hidden />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            <p className="mt-10 md:mt-12 text-center text-xs sm:text-sm text-sand-50/75 leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
              {t('process.disclaimer')}
            </p>

            <div className="mt-8 md:mt-10 flex justify-center">
              <LegalLinks className="text-sand-50/80 hover:text-sand-50 justify-center" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
