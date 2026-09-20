import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  activeStays,
  getStay,
  getRoom,
  roomPath,
  stayPath,
  value,
} from "@/lib/stays";
import { getCopy } from "@/lib/renewal-copy";
import { pageMetadata, roomSearchTitle } from "@/lib/renewal-seo";
import { BookingButton } from "@/components/renewal/BookingProvider";
import { FinalBooking } from "@/components/renewal/Sections";
import RoomGallery from "@/components/renewal/RoomGallery";

type Props = {
  params: Promise<{ locale: string; location: string; room: string }>;
};
export function generateStaticParams() {
  return activeStays.flatMap((stay) =>
    stay.rooms.map((room) => ({ location: stay.id, room: room.slug })),
  );
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, location, room: slug } = await params;
  const stay = getStay(location);
  const room = stay ? getRoom(stay, slug) : undefined;
  if (!stay || !room) notFound();
  return pageMetadata(
    locale,
    roomPath(stay, room),
    roomSearchTitle(stay, room, locale),
    value(room.description, locale),
    room.images[0] ?? stay.image ?? undefined,
    room.draft || stay.draft,
  );
}
export default async function RoomPage({ params }: Props) {
  const { locale, location, room: slug } = await params;
  setRequestLocale(locale);
  const stay = getStay(location);
  const room = stay ? getRoom(stay, slug) : undefined;
  if (!stay || !room) notFound();
  const c = getCopy(locale);
  const specs = [
    [c.guests, room.capacity?.toString() ?? c.contentPending],
    [c.beds, room.beds ? value(room.beds, locale) : c.contentPending],
    [c.size, room.size ? `${room.size} m²` : c.contentPending],
    [c.bathroom, room.bathroom ? c[room.bathroom] : c.contentPending],
  ];
  return (
    <>
      <section className="site-width py-9 sm:py-14">
        <Link className="text-link text-sm" href={`${stayPath(stay)}#rooms`}>
          <ArrowLeft size={16} />
          {c.backRooms}
        </Link>
        <div className="mt-8 mb-10">
          <Link
            className="eyebrow underline underline-offset-4"
            href={stayPath(stay)}
          >
            ARU STAY {value(stay.name, locale)}
          </Link>
          <h1 className="page-title mt-4">{value(room.name, locale)}</h1>
        </div>
        <div className="grid grid-cols-1 gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start">
          <RoomGallery
            images={room.images}
            name={value(room.name, locale)}
            locale={locale}
          />
          <div>
            <p className="lede">{value(room.description, locale)}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7">
              {specs.map(([label, detail]) => (
                <div key={label} className="border-t border-sand-200 pt-4">
                  <dt className="text-xs text-ink-soft">{label}</dt>
                  <dd className="mt-2 font-bold leading-relaxed">{detail}</dd>
                </div>
              ))}
            </dl>
            {room.bathtub ? (
              <p className="mt-6 tag w-fit">{c.bathtub}</p>
            ) : null}
            <div className="mt-8 info-panel">
              <p className="eyebrow">{c.benefitLabel}</p>
              <p className="font-bold mt-3">{c.benefitBody}</p>
              <BookingButton stayId={stay.id} className="mt-5 w-full" />
            </div>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-sand-200 pt-10">
          <div>
            <h2 className="text-xl font-bold">{c.included}</h2>
            {room.draft ? (
              <p className="mt-5 text-ink-soft">{c.contentPending}</p>
            ) : (
              <ul className="mt-5 grid grid-cols-2 gap-4 text-sm">
                {[c.wifi, c.aircon, c.tv, c.privateBath, c.hairdryer].map(
                  (item) => (
                    <li className="flex items-center gap-2" key={item}>
                      <Check size={16} />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            )}
            <h3 className="mt-7 font-bold">{c.notIncluded}</h3>
            <p className="text-sm text-ink-soft mt-3">{c.exclusions}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">{c.arrival}</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt>{c.checkin}</dt>
                <dd>{stay.checkin ?? c.contentPending}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{c.checkout}</dt>
                <dd>{stay.checkout ?? c.contentPending}</dd>
              </div>
            </dl>
            <Link href="/policies" className="text-link mt-7">
              {c.policies} ↗
            </Link>
          </div>
        </div>
      </section>
      <FinalBooking locale={locale} stay={stay} />
    </>
  );
}
