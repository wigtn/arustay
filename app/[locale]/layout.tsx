import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Fraunces, Inter, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SITE_URL, BUSINESS, INSTAGRAM_URL } from '@/lib/constants';
import '../globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif-latin',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-latin',
  display: 'swap',
});

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif-kr',
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans-kr',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const OG_IMAGE =
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=630&fit=crop&q=80';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const localePath = (l: string) =>
    l === routing.defaultLocale ? '/' : `/${l}`;

  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = `${SITE_URL}${localePath(l)}`;
  });
  languages['x-default'] = `${SITE_URL}/`;

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}${localePath(locale)}`,
      languages,
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${localePath(locale)}`,
      siteName: BUSINESS.name,
      title: t('title'),
      description: t('description'),
      locale,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: BUSINESS.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });

  const fontClass = `${fraunces.variable} ${inter.variable} ${notoSerifKR.variable} ${notoSansKR.variable}`;

  const lodgingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE_URL}/#lodging`,
    name: BUSINESS.name,
    description: t('description'),
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    image: [OG_IMAGE],
    priceRange: BUSINESS.priceRange,
    checkinTime: BUSINESS.checkinTime,
    checkoutTime: BUSINESS.checkoutTime,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    sameAs: [INSTAGRAM_URL].filter((u) => u && u !== '#'),
    amenityFeature: [
      'Lounge',
      'Washing Machine',
      'Water Purifier',
      'Microwave',
      'Luggage Storage',
      'Self Check-in after 9 PM',
      'Free Wi-Fi',
    ].map((name) => ({
      '@type': 'LocationFeatureSpecification',
      name,
      value: true,
    })),
  };

  return (
    <html lang={locale} className={fontClass}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
      </body>
    </html>
  );
}
