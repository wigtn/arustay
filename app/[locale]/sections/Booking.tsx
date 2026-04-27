import { useTranslations } from 'next-intl';
import { ArrowUpRight, Mail, Instagram, BedDouble } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import LegalLinks from '@/components/LegalLinks';
import {
  LONG_STAY_FORM_URL,
  BOOKING_COM_URL,
  AGODA_URL,
  TRIP_COM_URL,
  INSTAGRAM_URL,
  EMAIL,
  CREW,
} from '@/lib/constants';

export default function Booking() {
  const t = useTranslations('booking');
  const footer = useTranslations('footer');

  return (
    <section id="book" className="bg-sand-100">
      <div className="section-shell">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <FadeIn>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="heading mt-3">{t('title')}</h2>
            <p className="lede mt-5 max-w-md">{t('body')}</p>

            <a
              href={LONG_STAY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-sand-50 text-sm font-medium transition-all duration-300 hover:bg-ink-soft hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgba(42,38,35,0.55)]"
            >
              <span>{t('longStayCta')}</span>
              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-wider2 text-ink-mute">
                  {t('shortStay')}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={BOOKING_COM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full border border-sand-300 text-sm text-ink transition-all duration-300 hover:bg-ink hover:text-sand-50 hover:border-ink hover:-translate-y-0.5"
                  >
                    <BedDouble
                      size={15}
                      strokeWidth={1.6}
                      className="text-ink-mute transition-colors group-hover:text-sand-50"
                    />
                    <span>{t('booking')}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                  <a
                    href={AGODA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full border border-sand-300 text-sm text-ink transition-all duration-300 hover:bg-ink hover:text-sand-50 hover:border-ink hover:-translate-y-0.5"
                  >
                    <BedDouble
                      size={15}
                      strokeWidth={1.6}
                      className="text-ink-mute transition-colors group-hover:text-sand-50"
                    />
                    <span>{t('agoda')}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                  <a
                    href={TRIP_COM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 pl-4 pr-5 py-2.5 rounded-full border border-sand-300 text-sm text-ink transition-all duration-300 hover:bg-ink hover:text-sand-50 hover:border-ink hover:-translate-y-0.5"
                  >
                    <BedDouble
                      size={15}
                      strokeWidth={1.6}
                      className="text-ink-mute transition-colors group-hover:text-sand-50"
                    />
                    <span>{t('trip')}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.6}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider2 text-ink-mute">
                  {t('contact')}
                </p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  <li>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="group inline-flex items-center gap-2.5 text-ink transition-colors hover:text-ink-soft"
                    >
                      <Mail
                        size={15}
                        strokeWidth={1.6}
                        className="text-ink-mute transition-colors group-hover:text-ink"
                      />
                      <span className="decoration-ink-mute underline-offset-4 group-hover:underline">
                        {EMAIL}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 text-ink transition-colors hover:text-ink-soft"
                    >
                      <Instagram
                        size={15}
                        strokeWidth={1.6}
                        className="text-ink-mute transition-colors group-hover:text-ink"
                      />
                      <span className="decoration-ink-mute underline-offset-4 group-hover:underline">
                        {t('instagram')}
                      </span>
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.6}
                        className="text-ink-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        <footer className="mt-24 pt-8 border-t border-sand-200 text-xs text-ink-mute">
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-wider2 text-ink-mute mb-3">
              {footer('business.heading')}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-y-3 gap-x-12">
              <dl className="space-y-1.5">
                {(['name', 'representative', 'phone'] as const).map((k) => (
                  <div key={k} className="flex gap-2">
                    <dt className="text-ink-mute">{footer(`business.${k}.label`)}</dt>
                    <dd className="text-ink">{footer(`business.${k}.value`)}</dd>
                  </div>
                ))}
              </dl>
              <dl className="space-y-1.5 sm:text-right">
                {(['registration', 'address'] as const).map((k) => (
                  <div key={k} className="flex gap-2 sm:justify-end">
                    <dt className="text-ink-mute">{footer(`business.${k}.label`)}</dt>
                    <dd className="text-ink">{footer(`business.${k}.value`)}</dd>
                  </div>
                ))}
                <div className="sm:flex sm:justify-end">
                  <LegalLinks />
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p>{footer('tagline')}</p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:justify-end">
              <span>© {new Date().getFullYear()} ARU STAY. {footer('rights')}</span>
              <span aria-hidden className="text-ink-mute">·</span>
              <span className="inline-flex items-center gap-1">
                {footer('credit')}{' '}
                <a
                  href={CREW.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-medium tracking-wider2 text-ink transition-colors hover:text-ink-soft"
                >
                  {CREW.name}
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </span>
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
