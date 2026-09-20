import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { SITE_URL, EMAIL, INSTAGRAM_URL } from "@/lib/constants";
import { BookingProvider } from "@/components/renewal/BookingProvider";
import SiteHeader from "@/components/renewal/SiteHeader";
import Footer from "@/components/renewal/Footer";
import MobileBooking from "@/components/renewal/MobileBooking";

const displayLatin = localFont({
  src: [
    {
      path: "../../public/fonts/aru-display-latin-medium.woff2",
      weight: "400 500",
      style: "normal",
    },
    {
      path: "../../public/fonts/aru-display-latin-bold.woff2",
      weight: "600 900",
      style: "normal",
    },
  ],
  variable: "--font-display-latin",
  display: "swap",
  adjustFontFallback: false,
  preload: true,
  declarations: [{
    prop: "unicode-range",
    value: "U+0000-024F,U+1E00-1EFF,U+2000-206F,U+20A0-20CF,U+2100-214F,U+2190-21FF",
  }],
});
const displayKorean = localFont({
  src: [
    {
      path: "../../public/fonts/aru-display-korean-medium.woff2",
      weight: "400 500",
      style: "normal",
    },
    {
      path: "../../public/fonts/aru-display-korean-bold.woff2",
      weight: "600 900",
      style: "normal",
    },
  ],
  variable: "--font-display-korean",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
  declarations: [{
    prop: "unicode-range",
    value: "U+1100-11FF,U+3130-318F,U+A960-A97F,U+AC00-D7AF,U+D7B0-D7FF",
  }],
});
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "ARU STAY",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    ...(process.env.NEXT_PUBLIC_NAVER_VERIFICATION
      ? {
          other: {
            "naver-site-verification":
              process.env.NEXT_PUBLIC_NAVER_VERIFICATION,
          },
        }
      : {}),
  },
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ARU STAY",
    url: SITE_URL,
    email: EMAIL,
    sameAs: [INSTAGRAM_URL],
    logo: `${SITE_URL}/icon.png`,
  };
  return (
    <html lang={locale} className={`${displayLatin.variable} ${displayKorean.variable}`}>
      <body className="renewal-site">
        <NextIntlClientProvider
          locale={locale}
          messages={{ about: messages.about, footer: messages.footer }}
        >
          <BookingProvider>
            <SiteHeader />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer locale={locale} />
            <MobileBooking />
          </BookingProvider>
        </NextIntlClientProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
