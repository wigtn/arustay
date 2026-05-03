import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart, Leaf, Home } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

const POINT_ICONS = [Heart, Leaf, Home];

export default function About() {
  const t = useTranslations('about');
  const points = t.raw('points') as { title: string; body: string }[];

  return (
    <section id="about" className="bg-sand-100/50">
      <div className="section-shell">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <FadeIn>
            <div className="relative aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(42,38,35,0.45)] ring-1 ring-sand-200/70 bg-sand-200">
              <Image
                src="/images/about.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                aria-hidden
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-ink">
                {t('title')}
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed text-[0.95rem] sm:text-base max-w-xl">
                {t('body')}
              </p>

              <ul className="mt-10 space-y-6">
                {points.map((p, i) => {
                  const Icon = POINT_ICONS[i] ?? Heart;
                  return (
                    <li
                      key={i}
                      className="flex gap-4 sm:gap-5 pt-6 border-t border-sand-200 first:border-t-0 first:pt-0"
                    >
                      <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-sand-200/70 text-ink">
                        <Icon size={20} strokeWidth={1.4} aria-hidden />
                      </span>
                      <div>
                        <p className="font-medium text-ink">{p.title}</p>
                        <p className="mt-1 text-sm text-ink-soft leading-relaxed max-w-md">
                          {p.body}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
