"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import { activeStays, stayPath } from "@/lib/stays";
import { getCopy } from "@/lib/renewal-copy";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BookingButton } from "./BookingProvider";
import Modal from "./Modal";

export default function SiteHeader() {
  const locale = useLocale();
  const c = getCopy(locale);
  const pathname = usePathname();
  const stay = activeStays.find(
    (item) =>
      pathname === stayPath(item) || pathname.startsWith(`${stayPath(item)}/`),
  );
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const items = [
    ["locations", c.locations],
    ["about", c.about],
    ["rooms", c.rooms],
    ["facilities", c.facilities],
    ["guest-notes", c.notes],
    ["faq", c.faq],
    ["contact", c.contact],
  ];
  return (
    <>
      <a href="#main-content" className="skip-link">
        {c.skip}
      </a>
      <header className="site-header">
        <div className="site-width header-inner">
          <Link
            href="/"
            aria-label={`ARU STAY — ${c.home}`}
            className="site-brand"
          >
            <Image
              src="/images/aru-stay-logo.png"
              alt=""
              width={309}
              height={485}
              sizes="48px"
              priority
              className="site-brand-logo"
            />
          </Link>
          <nav aria-label={c.navigation} className="header-nav">
            {items.map(([id, label]) => (
              <Link className="nav-link" key={id} href={`/#${id}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <div className="header-language">
              <LanguageSwitcher compact />
            </div>
            <div className="header-booking">
              <BookingButton stayId={stay?.id} />
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={c.menu}
              aria-expanded={open}
              className="header-menu icon-button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        titleId={titleId}
        closeLabel={c.close}
      >
        <h2 id={titleId} className="text-xl font-bold">
          ARU STAY
        </h2>
        <nav aria-label={c.navigation} className="grid mt-6 divide-y divide-sand-200">
          {items.map(([id, label]) => (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={() => setOpen(false)}
              className="py-3 text-lg"
            >
              {label}
              <span aria-hidden className="float-right">
                ↗
              </span>
            </Link>
          ))}
        </nav>
        <div className="pt-6">
          <LanguageSwitcher onChange={() => setOpen(false)} />
        </div>
      </Modal>
    </>
  );
}
