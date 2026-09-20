import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowDown } from "lucide-react";
import About from "./sections/About";
import HeroImage from "@/components/renewal/HeroImage";
import { getCopy } from "@/lib/renewal-copy";
import { homeSearchCopy, pageMetadata } from "@/lib/renewal-seo";
import {
  Benefit,
  Locations,
  RoomsPreview,
  Facilities,
  GuestNotes,
  Faq,
  FinalBooking,
} from "@/components/renewal/Sections";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const search = homeSearchCopy(locale);
  return pageMetadata(
    locale,
    "/",
    search.title,
    search.description,
    "/images/optimized/hero-main.avif",
  );
}
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = getCopy(locale);
  return (
    <>
      <section id="hero" className="home-hero">
        <div className="hero-photo">
          <HeroImage />
          <div className="hero-shade" aria-hidden />
        </div>
        <div className="site-width relative">
          <div className="hero-copy">
            <p className="eyebrow !text-sand-100">ARU STAY · SEOUL</p>
            <h1 className="hero-title">{c.heroTitle}</h1>
            <p className="mt-6 max-w-md leading-relaxed text-sand-100">
              {c.heroBody}
            </p>
            <a
              href="#locations"
              className="hero-explore mt-9 inline-flex items-center gap-5 text-sm"
            >
              {c.compare}
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>
      <Benefit locale={locale} booking />
      <Locations locale={locale} />
      <About />
      <RoomsPreview locale={locale} />
      <Facilities locale={locale} />
      <GuestNotes locale={locale} />
      <Faq locale={locale} />
      <FinalBooking locale={locale} />
    </>
  );
}
