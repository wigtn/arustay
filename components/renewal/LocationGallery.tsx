"use client";

import { useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getCopy } from "@/lib/renewal-copy";
import StayImage from "./StayImage";

export default function LocationGallery({
  images, name, locale, href, priority = false, className = "aspect-[3/2]",
}: {
  images: string[];
  name: string;
  locale: string;
  href?: string;
  priority?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const c = getCopy(locale);
  const go = (step: number) => setIndex(current => (current + step + images.length) % images.length);
  const photo = <StayImage src={images[index] ?? null} alt={`${name} — ${index + 1}`} locale={locale} className={className} priority={priority && index === 0} />;
  return (
    <div
      role="group"
      aria-label={name}
      className="relative min-w-0"
      onKeyDown={event => {
        if (images.length > 1 && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
          event.preventDefault();
          go(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div id={id}>
        {href ? <Link href={href} aria-label={name} className="block overflow-hidden">{photo}</Link> : photo}
      </div>
      {images.length > 1 ? (
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between pointer-events-none">
          <button type="button" onClick={() => go(-1)} aria-label={c.previous} aria-controls={id} className="icon-button pointer-events-auto bg-sand-50 shadow-sm">
            <ChevronLeft size={22} aria-hidden />
          </button>
          <p aria-live="polite" aria-atomic="true" className="rounded-full bg-sand-50 px-3 py-1 text-xs tabular-nums text-ink">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <button type="button" onClick={() => go(1)} aria-label={c.next} aria-controls={id} className="icon-button pointer-events-auto bg-sand-50 shadow-sm">
            <ChevronRight size={22} aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
