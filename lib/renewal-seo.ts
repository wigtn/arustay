import type { Metadata } from "next";
import { SITE_URL } from "./constants";
import { routing } from "@/i18n/routing";
import { asLocale, text } from "./renewal-copy";
import { localizedPath, stayPath, value, type Stay, type Room } from "./stays";

const ogLocales = { en: "en_US", ko: "ko_KR", ja: "ja_JP", zh: "zh_CN" };
const city = text("Seoul", "서울", "ソウル", "首尔");

export function homeSearchCopy(locale: string) {
  return {
    title: value(text(
      "ARU STAY | Guesthouse in Seoul",
      "아루스테이 | 서울 왕십리 게스트하우스",
      "ARU STAY | ソウル・往十里のゲストハウス",
      "ARU STAY | 首尔往十里旅宿",
    ), locale),
    description: value(text(
      "Discover ARU STAY in Seoul. Compare private double and twin rooms near Wangsimni Station, view photos and facilities, and find check-in information.",
      "서울 아루스테이의 지점과 객실을 둘러보세요. 왕십리역 인근 더블룸·트윈룸의 사진과 전용 욕실, 편의시설, 체크인 정보를 확인할 수 있습니다.",
      "ソウルのゲストハウスARU STAY。往十里駅近くのダブル・ツインルーム、専用バスルーム、設備、チェックイン方法をご案内。写真を見ながら宿泊先をご検討ください。",
      "探索首尔ARU STAY旅宿。查看往十里站附近配有独立卫浴的双人房与双床房、客房照片、公共设施及入住指南，为首尔之旅选择合适的住宿。",
    ), locale),
  };
}

export function staySearchCopy(stay: Stay, locale: string) {
  return {
    title: `ARU STAY ${value(stay.name, locale)} | ${value(city, locale)}`,
    description: stay.id === "wangsimni" ? value(text(
      "Stay near Wangsimni Station in Seoul. Explore ARU STAY's double and twin rooms with private bathrooms, free Wi-Fi, self check-in and access to Seongsu.",
      "서울 왕십리역 인근 아루스테이 왕십리점입니다. 전용 욕실을 갖춘 더블룸·트윈룸, 무료 와이파이, 셀프 체크인과 성수 방면 교통 정보를 확인하세요.",
      "ソウル・往十里駅近くのARU STAY。専用バスルーム付きのダブル・ツインルーム、無料Wi-Fi、セルフチェックイン、聖水方面へのアクセスをご案内します。",
      "ARU STAY往十里分店位于首尔往十里站附近。查看配有独立卫浴的双人房与双床房、免费Wi-Fi、自助入住说明及前往圣水的交通信息。",
    ), locale) : value(stay.introduction, locale),
  };
}

export function roomSearchTitle(stay: Stay, room: Room, locale: string) {
  return `${value(room.name, locale)} | ARU STAY ${value(stay.name, locale)} · ${value(city, locale)}`;
}

// Sharing crawlers receive the original JPEG; page images stay optimized AVIF.
// The original and optimized image names share the same asset stem.
function shareImage(image: string) {
  return image.startsWith("/images/optimized/") && image.endsWith(".avif")
    ? image.replace("/images/optimized/", "/images/").replace(/\.avif$/, ".jpg")
    : image;
}

export function pageMetadata(
  locale: string,
  path: string,
  title: string,
  description: string,
  image = "/icon.png",
  draft = false,
): Metadata {
  const socialImage = shareImage(image);
  const ogLocale = ogLocales[asLocale(locale)];
  const url = `${SITE_URL}${localizedPath(path, locale)}`;
  const languages = Object.fromEntries(
    routing.locales.map((lang) => [
      lang,
      `${SITE_URL}${localizedPath(path, lang)}`,
    ]),
  );
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `${SITE_URL}${path}` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ARU STAY",
      type: "website",
      locale: ogLocale,
      alternateLocale: Object.values(ogLocales).filter((item) => item !== ogLocale),
      images: [{
        url: `${SITE_URL}${socialImage}`,
        alt: title,
        ...(socialImage.endsWith(".jpg") ? { type: "image/jpeg" } : {}),
      }],
    },
    twitter: {
      card: socialImage === "/icon.png" ? "summary" : "summary_large_image",
      title,
      description,
      images: [{ url: `${SITE_URL}${socialImage}`, alt: title }],
    },
    robots: { index: !draft, follow: true },
  };
}

export function lodgingData(stay: Stay, locale: string) {
  if (stay.draft || !stay.address || !stay.coordinates) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}${stayPath(stay)}#lodging`,
    name: `ARU STAY ${value(stay.name, locale)}`,
    description: value(stay.introduction, locale),
    url: `${SITE_URL}${localizedPath(stayPath(stay), locale)}`,
    image: stay.image ? `${SITE_URL}${stay.image}` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: value(stay.address, locale),
      addressLocality: "Seoul",
      addressCountry: "KR",
    },
    geo: { "@type": "GeoCoordinates", ...stay.coordinates },
    checkinTime: stay.checkin,
    checkoutTime: stay.checkout,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}
