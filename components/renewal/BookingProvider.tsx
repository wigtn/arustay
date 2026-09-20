"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { useLocale } from "next-intl";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { activeStays, bookingHref, getStay, value } from "@/lib/stays";
import { getCopy } from "@/lib/renewal-copy";
import { EMAIL } from "@/lib/constants";
import Modal from "./Modal";

const BookingContext = createContext<((stayId?: string) => void) | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const c = getCopy(locale);
  const [dialog, setDialog] = useState<string | null>(null);
  const id = useId();
  const stay = dialog && dialog !== "choose" ? getStay(dialog) : undefined;
  return (
    <BookingContext.Provider value={(stayId) => setDialog(stayId ?? "choose")}>
      {children}
      <Modal
        open={dialog !== null}
        contentKey={dialog}
        onClose={() => setDialog(null)}
        titleId={id}
        closeLabel={c.close}
      >
        <p className="eyebrow pr-8">ARU STAY · {c.book}</p>
        <h2
          id={id}
          className="mt-4 text-2xl sm:text-3xl font-bold leading-snug pr-4"
        >
          {stay ? c.unavailableTitle : c.chooseTitle}
        </h2>
        <p className="mt-4 text-ink-soft leading-relaxed">
          {stay ? c.unavailableBody : c.chooseBody}
        </p>
        {stay ? (
          <>
            <p className="mt-6 flex items-center gap-2 font-bold">
              <MapPin size={18} />
              ARU STAY {value(stay.name, locale)}
            </p>
            <a className="aru-button mt-6" href={`mailto:${EMAIL}`}>
              {c.email}
              <ArrowUpRight size={18} />
            </a>
          </>
        ) : (
          <>
            <div className="my-6 flex gap-3 bg-sand-100 rounded-xl p-4">
              <Clock3 className="shrink-0" size={22} />
              <div>
                <p className="font-bold text-sm">{c.benefitBody}</p>
                <p className="mt-1 text-xs text-ink-soft">{c.benefitFine}</p>
              </div>
            </div>
            <div className="grid gap-3">
              {activeStays.map((item) => (
                <BookingButton
                  key={item.id}
                  stayId={item.id}
                  className="w-full justify-between"
                />
              ))}
            </div>
          </>
        )}
      </Modal>
    </BookingContext.Provider>
  );
}

export function BookingButton({
  stayId,
  className = "",
  children,
  secondary = false,
}: {
  stayId?: string;
  className?: string;
  children?: ReactNode;
  secondary?: boolean;
}) {
  const openBooking = useContext(BookingContext);
  const locale = useLocale();
  const c = getCopy(locale);
  const stay = stayId ? getStay(stayId) : undefined;
  const href = stay ? bookingHref(stay) : null;
  const label =
    children ??
    (stay
      ? c.bookLocation.replace("{location}", value(stay.name, locale))
      : c.book);
  const classes = `${secondary ? "aru-button-secondary" : "aru-button"} ${className}`;
  if (href)
    return (
      <a href={href} className={classes}>
        {label}
        <ArrowUpRight size={17} aria-hidden />
      </a>
    );
  return (
    <button
      type="button"
      className={classes}
      onClick={() => openBooking?.(stayId)}
    >
      {label}
      <ArrowUpRight size={17} aria-hidden />
    </button>
  );
}
