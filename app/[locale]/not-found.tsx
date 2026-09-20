import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getCopy } from "@/lib/renewal-copy";
export default async function NotFound() {
  const c = getCopy(await getLocale());
  return (
    <section className="section-shell min-h-[60vh]">
      <p className="eyebrow">404 · ARU STAY</p>
      <h1 className="heading mt-5">{c.notFound}</h1>
      <Link className="aru-button mt-8" href="/">
        {c.home} →
      </Link>
    </section>
  );
}
