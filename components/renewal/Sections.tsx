import {
  ArrowRight,
  Armchair,
  WashingMachine,
  Luggage,
  Wifi,
  GlassWater,
  KeyRound,
  Plus,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import {
  activeStays,
  stayPath,
  roomPath,
  value,
  type Stay,
  type FacilityId,
} from "@/lib/stays";
import { getCopy, type Copy } from "@/lib/renewal-copy";
import { BookingButton } from "./BookingProvider";
import StayImage from "./StayImage";

export function SectionHeading({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2 className="heading mt-4">{title}</h2>
      </div>
      {body ? <p className="lede max-w-md">{body}</p> : null}
    </div>
  );
}

export function Benefit({
  locale,
  booking = false,
}: {
  locale: string;
  booking?: boolean;
}) {
  const c = getCopy(locale);
  return (
    <section
      aria-label={c.benefitLabel}
      className={booking ? "booking-benefit site-width" : "stay-benefit"}
    >
      <div
        className={`benefit-row ${booking ? "booking-benefit-inner" : "site-width py-7"}`}
      >
        <div className="benefit-copy">
          <div>
            <p className="eyebrow">{c.benefitLabel}</p>
            <h2 className="mt-3 font-bold text-lg sm:text-xl">
              {c.benefitBody}
            </h2>
            <p className="text-xs mt-2 text-ink-soft">{c.benefitFine}</p>
          </div>
        </div>
        {booking ? (
          <div className="benefit-actions">
            {activeStays.map((stay) => (
              <BookingButton key={stay.id} stayId={stay.id} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-soft">{c.benefitTitle}</p>
        )}
      </div>
    </section>
  );
}

export function Locations({ locale }: { locale: string }) {
  const c = getCopy(locale);
  return (
    <section id="locations" className="section-shell">
      <SectionHeading
        label={c.locations}
        title={c.locationsTitle}
        body={c.locationsBody}
      />
      <div className="mt-12 grid gap-12 md:gap-10 md:grid-cols-2">
        {activeStays.map((stay, index) => (
          <article key={stay.id} className="stay-card">
            <Link
              href={stayPath(stay)}
              aria-label={`ARU STAY ${value(stay.name, locale)}`}
              className="stay-photo block overflow-hidden"
            >
              <StayImage
                src={stay.image}
                alt={`ARU STAY ${value(stay.name, locale)}`}
                locale={locale}
                className="aspect-[3/2]"
                reveal
              />
            </Link>
            <div className="pt-6 flex flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  {value(stay.name, locale)}
                </h3>
                <span className="eyebrow">ARU STAY · 0{index + 1}</span>
              </div>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {value(stay.introduction, locale)}
              </p>
              <ul className="stay-facts mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {stay.features.map((feature, i) => (
                  <li key={i}>{value(feature, locale)}</li>
                ))}
              </ul>
              <div className="stay-actions">
                <Link className="text-link" href={stayPath(stay)}>
                  {c.explore}
                  <ArrowRight size={16} />
                </Link>
                <BookingButton stayId={stay.id} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RoomGrid({ stay, locale, reveal = false }: {
  stay: Stay;
  locale: string;
  reveal?: boolean;
}) {
  const c = getCopy(locale);
  if (stay.rooms.every((room) => !room.images.length))
    return (
      <div className="draft-room-list">
        {stay.rooms.map((room) => (
          <Link
            href={roomPath(stay, room)}
            key={room.slug}
            className="draft-room-row"
          >
            <span className="font-medium">{value(room.name, locale)}</span>
            <span className="draft-room-status">{c.roomPending}</span>
            <ArrowRight size={19} strokeWidth={1.5} aria-hidden />
          </Link>
        ))}
      </div>
    );
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stay.rooms.map((room) => (
        <article className="room-card" key={room.slug}>
          <Link
            href={roomPath(stay, room)}
            aria-label={value(room.name, locale)}
          >
            <StayImage
              src={room.images[0] ?? null}
              alt={value(room.name, locale)}
              locale={locale}
              className="room-photo aspect-[4/3]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              reveal={reveal}
            />
          </Link>
          <div className="pt-5 flex flex-1 flex-col">
            <p className="eyebrow">ARU STAY {value(stay.name, locale)}</p>
            <h3 className="mt-3 text-xl font-bold">
              {value(room.name, locale)}
            </h3>
            <p className="mt-3 text-sm text-ink-soft min-h-12">
              {room.capacity
                ? `${c.guests} ${room.capacity} · ${room.size} m²`
                : c.roomPending}
              {room.beds ? (
                <>
                  <br />
                  {value(room.beds, locale)}
                </>
              ) : room.bathtub ? (
                ` · ${c.bathtub}`
              ) : null}
            </p>
            <Link
              href={roomPath(stay, room)}
              className="text-link mt-5 pt-4 border-t border-sand-200 justify-between"
            >
              {c.roomDetails}
              <ArrowRight size={16} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function RoomsPreview({ locale }: { locale: string }) {
  const c = getCopy(locale);
  return (
    <section id="rooms" className="rooms-section">
      <div className="section-shell">
        <SectionHeading
          label={c.rooms}
          title={c.roomsTitle}
          body={c.roomsBody}
        />
        <div className="mt-12 space-y-16">
          {activeStays.map((stay) => (
            <div key={stay.id}>
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-2xl font-bold">
                  {value(stay.name, locale)}
                </h3>
                <Link className="text-link" href={`${stayPath(stay)}#rooms`}>
                  {c.allRooms}
                  <ArrowRight size={16} />
                </Link>
              </div>
              <RoomGrid stay={stay} locale={locale} reveal />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const facilityIcons = {
  lounge: Armchair,
  laundry: WashingMachine,
  luggage: Luggage,
  wifi: Wifi,
  water: GlassWater,
  selfCheckin: KeyRound,
};
export function Facilities({
  locale,
  items = Object.keys(facilityIcons) as FacilityId[],
}: {
  locale: string;
  items?: FacilityId[];
}) {
  const c = getCopy(locale);
  return (
    <section id="facilities" className="section-shell">
      <SectionHeading
        label={c.facilities}
        title={c.essentialsTitle}
        body={c.essentialsBody}
      />
      {items.length ? (
        <div className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((key) => {
            const Icon = facilityIcons[key];
            return (
              <article key={key} className="facility-row">
                <Icon size={23} strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="font-medium">{c[key]}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {c[`${key}Body` as keyof Copy]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-sand-300 p-8 text-ink-soft">
          {c.contentPending}
        </p>
      )}
    </section>
  );
}

export function GuestNotes({ locale }: { locale: string }) {
  const c = getCopy(locale);
  const samples = [c.notesSampleRoom, c.notesSampleArrival, c.notesSampleLocation];
  return (
    <section id="guest-notes" className="guest-notes-section">
      <div className="section-shell">
        <SectionHeading
          label={c.notes}
          title={c.notesTitle}
          body={c.notesPending}
        />
        <div data-nosnippet>
          <div className="guest-notes-grid">
            {samples.map((sample, index) => (
              <figure className="guest-note" key={index}>
                <blockquote>{sample}</blockquote>
                <figcaption>{c.notesSampleLabel}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ locale }: { locale: string }) {
  const c = getCopy(locale);
  const keys = ["Benefit", "Times", "Late", "Luggage", "Choose"] as const;
  return (
    <section id="faq" className="section-shell">
      <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="heading mt-4">{c.faqTitle}</h2>
        </div>
        <div className="border-t border-sand-200">
          {keys.map((key) => (
            <details key={key} className="faq-item border-b border-sand-200">
              <summary className="py-6 flex justify-between items-start gap-5 cursor-pointer font-bold">
                <span>{c[`faq${key}`]}</span>
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden
                  className="faq-plus"
                />
              </summary>
              <p className="pb-6 pr-7 text-ink-soft leading-relaxed">
                {c[`faq${key}Answer`]}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalBooking({
  locale,
  stay,
}: {
  locale: string;
  stay?: Stay;
}) {
  const c = getCopy(locale);
  return (
    <section className="final-booking">
      <div className="site-width final-booking-inner">
        <div>
          <p className="eyebrow">{c.benefitLabel}</p>
          <h2 className="heading mt-4">{c.ready}</h2>
          <p className="mt-4 text-sm leading-relaxed">{c.benefitBody}</p>
        </div>
        <div className="final-booking-actions">
          {(stay ? [stay] : activeStays).map((item) => (
            <BookingButton key={item.id} stayId={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
