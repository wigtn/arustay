import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { EMAIL } from "@/lib/constants";
import { getCopy } from "@/lib/renewal-copy";
import { pageMetadata } from "@/lib/renewal-seo";

const documents = ["policies", "privacy", "terms"] as const;
type Document = (typeof documents)[number];
type Props = { params: Promise<{ locale: string; document: string }> };
const isDocument = (value: string): value is Document =>
  documents.includes(value as Document);
export function generateStaticParams() {
  return documents.map((document) => ({ document }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, document } = await params;
  if (!isDocument(document)) notFound();
  const c = getCopy(locale);
  return pageMetadata(
    locale,
    `/${document}`,
    `${c[document]} · ARU STAY`,
    c.policyDraft,
    undefined,
    true,
  );
}
export default async function PolicyPage({ params }: Props) {
  const { locale, document } = await params;
  if (!isDocument(document)) notFound();
  setRequestLocale(locale);
  const c = getCopy(locale);
  return (
    <article className="section-shell max-w-3xl">
      <Link href="/" className="text-link">
        ← {c.home}
      </Link>
      <p className="eyebrow mt-12">ARU STAY</p>
      <h1 className="page-title mt-4">{c[document]}</h1>
      <p className="mt-8 info-panel leading-relaxed">{c.policyDraft}</p>
      <section className="mt-10">
        <h2 className="text-xl font-bold">
          {document === "privacy" ? c.privacy : c.bookingPolicy}
        </h2>
        <p className="mt-4 text-ink-soft leading-loose">
          {document === "privacy" ? c.privacyBody : c.bookingPolicyBody}
        </p>
      </section>
      {document === "policies" ? (
        <section className="mt-10">
          <h2 className="text-xl font-bold">{c.arrival}</h2>
          <p className="mt-4 text-ink-soft leading-loose">{c.faqTimesAnswer}</p>
          <p className="mt-4 text-ink-soft leading-loose">{c.faqLateAnswer}</p>
        </section>
      ) : null}
      <a className="text-link mt-10" href={`mailto:${EMAIL}`}>
        {c.email} ↗
      </a>
    </article>
  );
}
