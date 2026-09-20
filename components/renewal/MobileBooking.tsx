"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { activeStays, stayPath } from "@/lib/stays";
import { getCopy } from "@/lib/renewal-copy";
import { BookingButton } from "./BookingProvider";

export default function MobileBooking() {
  const pathname = usePathname();
  const c = getCopy(useLocale());
  const stay = activeStays.find(
    (item) =>
      pathname === stayPath(item) || pathname.startsWith(`${stayPath(item)}/`),
  );
  return (
    <aside className="mobile-booking xl:hidden" aria-label={c.book}>
      <BookingButton stayId={stay?.id} className="w-full">
        {stay ? undefined : c.mobileBook}
      </BookingButton>
    </aside>
  );
}
