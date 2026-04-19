import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="relative">
      <div className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(24,20,18,0.75) 0%, rgba(24,20,18,0.55) 45%, rgba(24,20,18,0.25) 100%), url(/images/optimized/about.avif)',
            backgroundColor: '#b8a58a',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 py-24 sm:py-32">
          <FadeIn className="max-w-xl text-sand-50">
            <p className="eyebrow !text-sand-50/70">{t('eyebrow')}</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
              {t('title')}
            </h2>
            <p className="mt-6 text-sand-50/90 leading-relaxed text-base sm:text-lg">
              {t('body')}
            </p>
            <ul className="mt-10 space-y-5">
              {t.raw('points').map((p: { title: string; body: string }, i: number) => (
                <li key={i} className="border-t border-sand-50/20 pt-4">
                  <p className="font-medium text-sand-50">{p.title}</p>
                  <p className="mt-1 text-sand-50/75 text-sm leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
