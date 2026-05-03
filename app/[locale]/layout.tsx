import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { Fraunces, Inter, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google';
import { routing } from '@/i18n/routing';
import {
  SITE_URL,
  BUSINESS,
  INSTAGRAM_URL,
  OTA_URLS,
  SEO_KEYWORDS_FALLBACK,
} from '@/lib/constants';
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

const OG_IMAGE = `${SITE_URL}/images/hero.jpg`;

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
  languages['x-default'] = `${SITE_URL}${localePath(routing.defaultLocale)}`;

  let keywords: string;
  try {
    keywords = t('keywords');
  } catch {
    keywords = SEO_KEYWORDS_FALLBACK;
  }

  let ogImageAlt: string;
  try {
    ogImageAlt = t('ogImageAlt');
  } catch {
    ogImageAlt = `${BUSINESS.name} — small English-friendly Seoul guesthouse near Wangsimni Station`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    keywords,
    applicationName: BUSINESS.name,
    authors: [{ name: BUSINESS.name, url: SITE_URL }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    category: 'Travel',
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
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
      ...(process.env.NEXT_PUBLIC_NAVER_VERIFICATION
        ? {
            other: {
              'naver-site-verification':
                process.env.NEXT_PUBLIC_NAVER_VERIFICATION,
            },
          }
        : {}),
    },
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

  const sameAs = [
    INSTAGRAM_URL,
    OTA_URLS.booking,
    OTA_URLS.agoda,
    OTA_URLS.trip,
  ].filter((u) => u && u !== '#');

  const lodgingJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'Hotel'],
    '@id': `${SITE_URL}/#lodging`,
    name: BUSINESS.name,
    alternateName: [...BUSINESS.alternateNames],
    description: t('description'),
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    image: [OG_IMAGE],
    logo: `${SITE_URL}/icon.png`,
    priceRange: BUSINESS.priceRange,
    checkinTime: BUSINESS.checkinTime,
    checkoutTime: BUSINESS.checkoutTime,
    numberOfRooms: BUSINESS.numberOfRooms,
    petsAllowed: false,
    smokingAllowed: false,
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
    sameAs,
    knowsLanguage: ['ko', 'en', 'ja', 'zh'],
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

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    alternateName: [...BUSINESS.alternateNames],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon.png`,
    },
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    sameAs,
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BUSINESS.name,
    alternateName: [...BUSINESS.alternateNames],
    url: SITE_URL,
    inLanguage: ['ko', 'en', 'ja', 'zh'],
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  const faqRoot = (messages as Record<string, unknown>).faq as
    | { items?: Array<{ q: string; a: string }> }
    | undefined;
  const faqItems = Array.isArray(faqRoot?.items) ? faqRoot!.items! : [];

  const faqJsonLd =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${SITE_URL}/#faq`,
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <html lang={locale} className={fontClass}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
      </body>
    </html>
  );
}
