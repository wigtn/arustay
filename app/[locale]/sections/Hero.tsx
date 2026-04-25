import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative">
      <div className="relative min-h-[100svh] flex items-end overflow-hidden bg-sand-300">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/75 to-ink/90"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl w-full px-5 sm:px-8 pb-20 sm:pb-28 pt-32 text-sand-50">
          <FadeIn>
            <p className="eyebrow !text-sand-50">{t('eyebrow')}</p>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] max-w-3xl">
              {t('title')}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-sand-50 max-w-xl">
              {t('subtitle')}
            </p>
            <a
              href="#long-stay"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sand-50 text-ink text-sm font-medium hover:bg-white transition-colors"
            >
              {t('cta')}
              <span aria-hidden>→</span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
