"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getCopy } from "@/lib/renewal-copy";
import { BookingButton } from "./BookingProvider";

// Mounted only on room details. The inline booking panel remains the primary CTA.
export default function MobileBooking({ stayId, roomName }: {
  stayId: string;
  roomName: string;
}) {
  const c = getCopy(useLocale());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const primary = document.getElementById("room-booking");
    const ending = document.querySelector(".final-booking");
    const header = document.querySelector(".site-header");
    const main = document.getElementById("main-content");
    if (!primary || !ending) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const passedPrimary = primary.getBoundingClientRect().bottom <= (header?.getBoundingClientRect().bottom ?? 0);
      const reachedEnding = ending.getBoundingClientRect().top <= window.innerHeight + 16;
      setVisible(window.innerWidth < 1280 && passedPrimary && !reachedEnding);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    if (main) resize.observe(main);
    if (header) resize.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [stayId, roomName]);

  return (
    <aside className="mobile-booking xl:hidden" hidden={!visible} aria-label={`${roomName} · ${c.book}`}>
      <div className="mobile-booking-inner">
        <p className="mobile-booking-room">{roomName}</p>
        <BookingButton stayId={stayId}>{c.book}</BookingButton>
        <p className="mobile-booking-benefit">{c.benefitBody}</p>
      </div>
    </aside>
  );
}
