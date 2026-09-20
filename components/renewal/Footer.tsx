import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { EMAIL, INSTAGRAM_URL, CREW } from "@/lib/constants";
import { activeStays, stayPath, value } from "@/lib/stays";
import { getCopy } from "@/lib/renewal-copy";

export default async function Footer({ locale }: { locale: string }) {
  const c = getCopy(locale);
  const t = await getTranslations({ locale, namespace: "footer" });
  return (
    <footer id="contact" className="site-footer bg-brown-deep text-sand-50">
      <div className="site-width py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="text-3xl font-bold tracking-wider">
              ARU STAY
            </Link>
            <p className="mt-5 max-w-xs leading-relaxed text-sand-100">
              {c.footerBody}
            </p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[.15em] text-sand-100">
              {c.locations}
            </h2>
            <div className="grid gap-3 mt-5">
              {activeStays.map((stay) => (
                <Link
                  className="footer-link"
                  key={stay.id}
                  href={stayPath(stay)}
                >
                  {value(stay.name, locale)}
                  <ArrowUpRight size={15} />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[.15em] text-sand-100">
              {c.contact}
            </h2>
            <div className="grid gap-3 mt-5">
              <a className="footer-link" href={`mailto:${EMAIL}`}>
                <Mail size={17} />
                {EMAIL}
              </a>
              <a className="footer-link" href={INSTAGRAM_URL}>
                <Instagram size={17} />
                Instagram
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-sand-200/25 pt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/policies" className="underline-offset-4 hover:underline">
            {c.policies}
          </Link>
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            {c.privacy}
          </Link>
          <Link href="/terms" className="underline-offset-4 hover:underline">
            {c.terms}
          </Link>
        </div>
        <details className="mt-6 text-xs text-sand-100">
          <summary className="cursor-pointer py-2 w-fit">{c.business}</summary>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                "name",
                "representative",
                "registration",
                "address",
                "phone",
              ] as const
            ).map((key) => (
              <div key={key}>
                <dt className="inline">{t(`business.${key}.label`)}: </dt>
                <dd className="inline">{t(`business.${key}.value`)}</dd>
              </div>
            ))}
          </dl>
        </details>
        <div className="mt-8 flex flex-wrap justify-between gap-4 text-xs text-sand-100">
          <p>© {new Date().getFullYear()} ARU STAY</p>
          <a href={CREW.url}>Crafted by {CREW.name} ↗</a>
        </div>
      </div>
    </footer>
  );
}
