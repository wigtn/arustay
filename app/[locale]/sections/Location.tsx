import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';
import { GOOGLE_MAPS_EMBED_SRC } from '@/lib/constants';

type Access = { place: string; time: string };

export default function Location() {
  const t = useTranslations('location');
  const access = t.raw('access') as Access[];

  return (
    <section id="location" className="bg-sand-100/50">
      <div className="section-shell">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16">
          <FadeIn className="md:col-span-2">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="heading mt-3">{t('title')}</h2>
            <p className="lede mt-5">{t('body')}</p>

            <ul className="mt-10 divide-y divide-sand-200 border-y border-sand-200">
              {access.map((a) => (
                <li key={a.place} className="flex justify-between py-3 text-sm">
                  <span className="text-ink">{a.place}</span>
                  <span className="text-ink-mute">{a.time}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-soft leading-relaxed">
              {t('nearby')}
            </p>
          </FadeIn>

          <FadeIn className="md:col-span-3" delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-sand-200 aspect-[4/3] bg-sand-200">
              <iframe
                src={GOOGLE_MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ARU STAY location map"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
