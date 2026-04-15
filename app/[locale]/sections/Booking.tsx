import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';
import {
  LONG_STAY_FORM_URL,
  BOOKING_COM_URL,
  AGODA_URL,
  INSTAGRAM_URL,
  EMAIL,
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
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-sand-50 text-sm font-medium hover:bg-ink-soft transition-colors"
            >
              {t('longStayCta')}
              <span aria-hidden>→</span>
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
                    className="px-4 py-2 rounded-full border border-sand-300 text-sm text-ink hover:bg-sand-50 transition-colors"
                  >
                    {t('booking')} ↗
                  </a>
                  <a
                    href={AGODA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full border border-sand-300 text-sm text-ink hover:bg-sand-50 transition-colors"
                  >
                    {t('agoda')} ↗
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider2 text-ink-mute">
                  {t('contact')}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-ink hover:text-ink-soft transition-colors"
                    >
                      {EMAIL}
                    </a>
                  </li>
                  <li>
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-ink-soft transition-colors"
                    >
                      {t('instagram')} ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>

        <footer className="mt-24 pt-8 border-t border-sand-200 flex flex-col sm:flex-row justify-between gap-3 text-xs text-ink-mute">
          <p>{footer('tagline')}</p>
          <p>
            © {new Date().getFullYear()} ARU STAY. {footer('rights')}
          </p>
        </footer>
      </div>
    </section>
  );
}
