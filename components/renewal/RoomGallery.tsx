"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { getCopy } from "@/lib/renewal-copy";
import Modal from "./Modal";
import StayImage from "./StayImage";

export default function RoomGallery({
  images,
  name,
  locale,
}: {
  images: string[];
  name: string;
  locale: string;
}) {
  const c = getCopy(locale);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const id = useId();
  const start = useRef<{ id: number; x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const go = (step: number) =>
    setIndex((current) => (current + step + images.length) % images.length);
  if (!images.length)
    return (
      <StayImage
        src={null}
        alt={name}
        locale={locale}
        className="aspect-[4/3] rounded-xl"
      />
    );
  const controls = (
    <div className="flex items-center justify-between gap-4 py-3">
      <button
        className="icon-button"
        onClick={() => go(-1)}
        aria-label={c.previous}
      >
        <ChevronLeft size={22} />
      </button>
      <p aria-live="polite" className="text-sm tabular-nums">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
      </p>
      <button className="icon-button" onClick={() => go(1)} aria-label={c.next}>
        <ChevronRight size={22} />
      </button>
    </div>
  );
  return (
    <div
      className="min-w-0"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      <div
        className="relative touch-pan-y touch-pinch-zoom"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          start.current = event.touches.length === 1
            ? { id: touch.identifier, x: touch.clientX, y: touch.clientY }
            : null;
          swiped.current = event.touches.length !== 1;
        }}
        onTouchEnd={(event) => {
          const origin = start.current;
          start.current = null;
          if (!origin) return;
          const touch = Array.from(event.changedTouches).find(
            (item) => item.identifier === origin.id,
          );
          if (!touch) return;
          const dx = touch.clientX - origin.x;
          const dy = touch.clientY - origin.y;
          // A scroll or drag must not also open the image on the following click.
          swiped.current = Math.max(Math.abs(dx), Math.abs(dy)) > 10;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.25) {
            go(dx < 0 ? 1 : -1);
          }
        }}
        onTouchCancel={() => {
          start.current = null;
          swiped.current = false;
        }}
      >
        <button
          className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-sand-100"
          aria-label={c.enlarge}
          onClick={(event) => {
            if (!swiped.current || event.detail === 0) setOpen(true);
            swiped.current = false;
          }}
        >
          <Image
            src={images[index]}
            alt={`${name} — ${index + 1}`}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
          <span className="absolute right-4 bottom-4 rounded-full bg-sand-50 p-3">
            <Expand size={19} />
          </span>
        </button>
      </div>
      {controls}
      <div className="flex gap-2 overflow-x-auto py-2" aria-label={name}>
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            aria-label={`${name} — ${i + 1}`}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
            className={`relative h-16 w-20 shrink-0 rounded-md overflow-hidden border-2 ${index === i ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        titleId={id}
        closeLabel={c.close}
        wide
      >
        <h2 id={id} className="font-bold mb-5 pr-10">
          {name}
        </h2>
        <div className="relative h-[55svh] w-full">
          <Image
            src={images[index]}
            alt={`${name} — ${index + 1}`}
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>
        {controls}
      </Modal>
    </div>
  );
}
