import Image from "next/image";
import { getCopy } from "@/lib/renewal-copy";
import FadeIn from "@/components/FadeIn";

export default function StayImage({
  src,
  alt,
  locale,
  className = "",
  priority = false,
  reveal = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  src: string | null;
  alt: string;
  locale: string;
  className?: string;
  priority?: boolean;
  reveal?: boolean;
  sizes?: string;
}) {
  const photo = src ? (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  ) : null;
  return (
    <div className={`relative overflow-hidden bg-sand-100 ${className}`}>
      {src ? (
        reveal ? (
          <FadeIn className="image-reveal absolute inset-0">{photo}</FadeIn>
        ) : photo
      ) : (
        <div className="image-placeholder absolute inset-0 flex flex-col items-center justify-center gap-4 p-5 text-center">
          <Image
            src="/images/aru-stay-logo.png"
            alt=""
            width={44}
            height={69}
            className="opacity-45"
          />
          <span className="text-xs text-ink-soft">
            {getCopy(locale).photoPending}
          </span>
        </div>
      )}
    </div>
  );
}
