import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="relative">
      <div className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-sand-300">
        <Image
          src="/images/optimized/about.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink/85 md:hidden"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden md:block bg-[linear-gradient(to_right,rgba(42,38,35,0.88)_0%,rgba(42,38,35,0.35)_22%,transparent_45%,transparent_55%,rgba(42,38,35,0.35)_78%,rgba(42,38,35,0.82)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden md:block bg-gradient-to-t from-ink/55 via-ink/10 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl w-full px-5 sm:px-10 md:px-12 pt-24 pb-16 sm:pb-20">
          <FadeIn>
            <div className="grid md:grid-cols-[minmax(0,22rem)_minmax(0,20rem)] md:justify-between gap-10 md:gap-16 text-sand-50 items-end">
              <div>
                <p className="eyebrow !text-sand-50/80">{t('eyebrow')}</p>
                <h2 className="mt-3 font-serif text-3xl sm:text-[2.25rem] md:text-[2.5rem] leading-[1.1]">
                  {t('title')}
                </h2>
                <p className="mt-6 text-sand-50/90 leading-relaxed text-[0.95rem] sm:text-base">
                  {t('body')}
                </p>
              </div>
              <ul className="space-y-5">
                {t.raw('points').map((p: { title: string; body: string }, i: number) => (
                  <li key={i} className="border-t border-sand-50/30 pt-4">
                    <p className="font-medium text-sand-50">{p.title}</p>
                    <p className="mt-1 text-sand-50/80 text-sm leading-relaxed">{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
