import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = l === routing.defaultLocale ? `${SITE_URL}/` : `${SITE_URL}/${l}`;
  });
  languages['x-default'] = languages[routing.defaultLocale];

  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? `${SITE_URL}/` : `${SITE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: locale === routing.defaultLocale ? 1.0 : 0.8,
    alternates: { languages },
  }));
}
