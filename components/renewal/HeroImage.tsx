"use client";

import Image from "next/image";

export default function HeroImage() {
  return (
    <Image
      src="/images/optimized/hero-main.avif"
      alt="ARU STAY"
      fill
      priority
      sizes="100vw"
      className="hero-image object-cover"
      onLoad={(event) => {
        // Start the subtle zoom only once the actual photo is ready.
        event.currentTarget.dataset.loaded = "true";
      }}
    />
  );
}
