import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';
import { LONG_STAY_FORM_URL } from '@/lib/constants';

export default function About() {
  const t = useTranslations('about');
  const hero = useTranslations('hero');

  return (
    <section id="about" className="relative">
      <div className="relative min-h-[92vh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(42,38,35,0.25) 0%, rgba(42,38,35,0.6) 100%), url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80)',
            backgroundColor: '#d9c6a7',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 pb-20 sm:pb-28 pt-32 text-sand-50">
          <FadeIn>
            <p className="eyebrow !text-sand-50/80">{hero('eyebrow')}</p>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] max-w-3xl">
              {hero('title')}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-sand-50/90 max-w-xl">
              {hero('subtitle')}
            </p>
            <a
              href={LONG_STAY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sand-50 text-ink text-sm font-medium hover:bg-white transition-colors"
            >
              {hero('cta')}
              <span aria-hidden>→</span>
            </a>
          </FadeIn>
        </div>
      </div>

      <div className="section-shell">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16">
          <FadeIn className="md:col-span-2">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="heading mt-3">{t('title')}</h2>
          </FadeIn>
          <FadeIn className="md:col-span-3" delay={0.1}>
            <p className="lede">{t('body')}</p>
            <ul className="mt-10 space-y-6">
              {t.raw('points').map((p: { title: string; body: string }, i: number) => (
                <li key={i} className="border-t border-sand-200 pt-5">
                  <p className="font-medium text-ink">{p.title}</p>
                  <p className="mt-1 text-ink-soft text-sm leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
