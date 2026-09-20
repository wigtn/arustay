import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { getCopy } from "@/lib/renewal-copy";

export default function About() {
  const t = useTranslations("about");
  const c = getCopy(useLocale());

  return (
    <section id="about" className="about-section">
      <div className="section-shell about-layout">
        <figure className="about-portrait w-full">
          <div className="about-photo relative w-full overflow-hidden bg-sand-200">
            <FadeIn className="image-reveal absolute inset-0">
              <Image
                src="/images/optimized/about.avif"
                alt={c.hostsPhoto}
                fill
                loading="eager"
                fetchPriority="low"
                sizes="(min-width: 768px) 420px, (min-width: 380px) 340px, calc(100vw - 40px)"
                className="object-cover"
              />
            </FadeIn>
          </div>
          <figcaption className="about-caption">{c.hostsCaption}</figcaption>
        </figure>

        <div className="about-copy">
          <p className="eyebrow mb-5">{c.about}</p>
          <h2 className="heading about-heading">{t("title")}</h2>
          <p className="about-body">{t("body")}</p>
          <p className="about-signoff">{c.hostsSignoff}</p>
        </div>
      </div>
    </section>
  );
}
