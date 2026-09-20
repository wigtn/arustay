import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/routing";
import { activeStays, getStay, stayPath, value } from "@/lib/stays";
import { getCopy } from "@/lib/renewal-copy";
import { lodgingData, pageMetadata, staySearchCopy } from "@/lib/renewal-seo";
import { BookingButton } from "@/components/renewal/BookingProvider";
import StayImage from "@/components/renewal/StayImage";
import {
  Benefit,
  RoomGrid,
  Facilities,
  Faq,
  FinalBooking,
  SectionHeading,
} from "@/components/renewal/Sections";

type Props = { params: Promise<{ locale: string; location: string }> };
export function generateStaticParams() {
  return activeStays.map((stay) => ({ location: stay.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, location } = await params;
  const stay = getStay(location);
  if (!stay) notFound();
  const search = staySearchCopy(stay, locale);
  return pageMetadata(
    locale,
    stayPath(stay),
    search.title,
    search.description,
    stay.image ?? undefined,
    stay.draft,
  );
}
export default async function LocationPage({ params }: Props) {
  const { locale, location } = await params;
  setRequestLocale(locale);
  const stay = getStay(location);
  if (!stay) notFound();
  const c = getCopy(locale);
  const structured = lodgingData(stay, locale);
  return (
    <>
      <section className="site-width py-9 sm:py-14">
        <Link href="/#locations" className="text-link text-sm">
          <ArrowLeft size={16} />
          {c.backLocations}
        </Link>
        <div className="mt-8 grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <p className="eyebrow">SEOUL · ARU STAY</p>
            <h1 className="page-title mt-4">{value(stay.name, locale)}</h1>
            <p className="lede mt-6">{value(stay.introduction, locale)}</p>
            <ul className="flex flex-wrap gap-2 mt-7">
              {stay.features.map((feature, i) => (
                <li className="tag" key={i}>
                  {value(feature, locale)}
                </li>
              ))}
            </ul>
            <BookingButton stayId={stay.id} className="mt-8" />
          </div>
          <StayImage
            src={stay.image}
            alt={`ARU STAY ${value(stay.name, locale)}`}
            locale={locale}
            className="aspect-[4/3] rounded-xl"
            priority
          />
        </div>
      </section>
      <Benefit locale={locale} />
      <section id="rooms" className="section-shell">
        <SectionHeading
          label={c.rooms}
          title={`${value(stay.name, locale)} · ${c.rooms}`}
          body={c.roomsBody}
        />
        <div className="mt-10">
          <RoomGrid stay={stay} locale={locale} />
        </div>
      </section>
      <div className="bg-sand-100/50">
        <Facilities locale={locale} items={stay.facilities} />
      </div>
      <section id="arrival" className="section-shell">
        <SectionHeading label={c.policies} title={c.arrival} />
        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          <div className="info-panel">
            <p className="eyebrow">{c.checkin}</p>
            <p className="mt-4 text-2xl font-bold">
              {stay.checkin ?? c.contentPending}
            </p>
          </div>
          <div className="info-panel">
            <p className="eyebrow">{c.checkout}</p>
            <p className="mt-4 text-2xl font-bold">
              {stay.checkout ?? c.contentPending}
            </p>
            <p className="mt-3 text-sm text-ink-soft">{c.benefitBody}</p>
          </div>
        </div>
        <p className="mt-6 text-ink-soft leading-relaxed max-w-2xl">
          {c.faqLateAnswer}
        </p>
        <Link href="/policies" className="text-link mt-5">
          {c.policies}
          <ArrowUpRight size={16} />
        </Link>
      </section>
      <section id="location" className="bg-sand-100/50">
        <div className="section-shell">
          <SectionHeading label={c.transport} title={c.directions} />
          <div className="mt-10 grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <MapPin size={18} />
                {c.address}
              </h3>
              <p className="mt-4 text-lg">
                {stay.address ? value(stay.address, locale) : c.contentPending}
              </p>
              <p className="mt-6 leading-relaxed text-ink-soft">
                {value(stay.transport, locale)}
              </p>
              {stay.maps ? (
                <div className="mt-7 flex flex-wrap gap-5">
                  <a className="text-link" href={stay.maps.google}>
                    {c.googleMaps}
                    <ArrowUpRight size={16} />
                  </a>
                  <a className="text-link" href={stay.maps.naver}>
                    {c.naverMaps}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              ) : null}
            </div>
            {stay.maps ? (
              <iframe
                title={`ARU STAY ${value(stay.name, locale)} — ${c.address}`}
                src={stay.maps.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80 rounded-xl border border-sand-200"
              />
            ) : (
              <div className="info-panel min-h-60 grid place-content-center text-center gap-4">
                <MapPin size={30} className="mx-auto" />
                <p>{c.contentPending}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Faq locale={locale} />
      <FinalBooking locale={locale} stay={stay} />
      {structured ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </>
  );
}
