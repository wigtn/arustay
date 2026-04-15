import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

type Note = { quote: string; author: string };

export default function GuestNotes() {
  const t = useTranslations('guestNotes');
  const items = t.raw('items') as Note[];

  return (
    <section id="guest-notes">
      <div className="section-shell">
        <FadeIn>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 className="heading mt-3 max-w-2xl">{t('title')}</h2>
        </FadeIn>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((n, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <figure className="h-full p-8 rounded-2xl bg-sand-100/70 border border-sand-200">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-sand-400"
                  aria-hidden
                >
                  <path d="M7 7h4v4H7c0 2 1 3 3 3v2c-3 0-5-2-5-5V7zm8 0h4v4h-4c0 2 1 3 3 3v2c-3 0-5-2-5-5V7z" />
                </svg>
                <blockquote className="mt-4 text-ink leading-relaxed">
                  {n.quote}
                </blockquote>
                <figcaption className="mt-6 text-sm text-ink-mute">
                  — {n.author}
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
