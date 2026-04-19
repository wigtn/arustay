import { useTranslations } from 'next-intl';
import {
  Sofa,
  WashingMachine,
  Droplets,
  Microwave,
  Luggage,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import FadeIn from '@/components/FadeIn';

type Facility = { name: string; desc: string };

const ICONS: LucideIcon[] = [
  Sofa,
  WashingMachine,
  Droplets,
  Microwave,
  Luggage,
  Sparkles,
];

export default function Facilities() {
  const t = useTranslations('facilities');
  const items = t.raw('items') as Facility[];

  return (
    <section id="facilities">
      <div className="section-shell">
        <FadeIn>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="heading mt-3 max-w-2xl">{t('title')}</h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 divide-y divide-sand-200 sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-px sm:bg-sand-200 sm:border sm:border-sand-200 sm:rounded-2xl sm:overflow-hidden">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Sofa;
            return (
              <FadeIn key={item.name} delay={i * 0.04}>
                <div className="flex items-start gap-4 py-6 sm:block sm:bg-sand-50 sm:p-8 sm:h-full">
                  <div className="shrink-0 sm:mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-sand-100 text-sand-700">
                    <Icon strokeWidth={1.6} size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-ink">{item.name}</h3>
                    <p className="mt-1.5 sm:mt-2 text-sm text-ink-soft leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
