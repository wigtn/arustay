import { asLocale, text, type Locale, type Localized } from "./renewal-copy";

export type FacilityId =
  "lounge" | "laundry" | "luggage" | "wifi" | "water" | "selfCheckin";
export type Room = {
  slug: string;
  name: Localized;
  description: Localized;
  images: string[];
  capacity: number | null;
  size: number | null;
  beds: Localized | null;
  bathroom: "privateBath" | null;
  bathtub: boolean | null;
  draft: boolean;
};
export type Stay = {
  id: string;
  active: boolean;
  name: Localized;
  introduction: Localized;
  features: Localized[];
  image: string | null;
  bookingUrl: string | null;
  address: Localized | null;
  coordinates: { latitude: number; longitude: number } | null;
  maps: { google: string; naver: string; embed: string } | null;
  transport: Localized;
  checkin: string | null;
  checkout: string | null;
  facilities: FacilityId[];
  draft: boolean;
  rooms: Room[];
};

const pending = text(
  "Room information is being prepared. Photos and full specifications will be added soon.",
  "객실 정보를 준비하고 있습니다. 사진과 상세 사양은 추후 업데이트됩니다.",
  "客室情報を準備中です。写真と詳細は近日更新します。",
  "客房信息正在准备中，照片和详细配置即将更新。",
);
const placeholderRoom = (slug: string, name: Localized): Room => ({
  slug,
  name,
  description: pending,
  images: [],
  capacity: null,
  size: null,
  beds: null,
  bathroom: null,
  bathtub: null,
  draft: true,
});

// Edit booking URLs here once supplied. null opens a truthful preparation notice.
// These records also drive navigation, pages, the booking dialog and the sitemap.
export const stays: Stay[] = [
  {
    id: "wangsimni",
    active: true,
    name: text("Wangsimni", "왕십리", "往十里", "往十里"),
    introduction: text(
      "A quiet place to return to, with Seongsu and central Seoul within easy reach.",
      "성수와 서울의 주요 지역을 편리하게 오가며, 하루 끝에 편안히 돌아오는 곳.",
      "聖水やソウル中心部へのアクセスが便利。一日の終わりに、ほっとくつろげる場所。",
      "轻松前往圣水与首尔中心，在一天结束后安心归来。",
    ),
    features: [
      text(
        "Wangsimni Station",
        "왕십리역 인근",
        "往十里駅近く",
        "邻近往十里站",
      ),
      text(
        "Easy access to Seongsu",
        "성수 접근성",
        "聖水へのアクセス",
        "便捷前往圣水",
      ),
      text(
        "Simple, practical rooms",
        "실용적이고 단정한 객실",
        "シンプルで機能的な客室",
        "简洁实用的客房",
      ),
    ],
    image: "/images/optimized/hero.avif",
    bookingUrl: null,
    address: text(
      "18, Wangsimni-ro 22-gil, Seongdong-gu, Seoul",
      "서울특별시 성동구 왕십리로22길 18",
      "ソウル特別市 城東区 往十里路22キル18",
      "首尔特别市城东区往十里路22街18号",
    ),
    coordinates: { latitude: 37.5635136, longitude: 127.0351235 },
    maps: {
      google: "https://maps.app.goo.gl/fM8XncmPdbCt14yo7",
      naver: "https://naver.me/GntGYVbf",
      embed:
        "https://www.google.com/maps?q=37.5635136,127.0351235&z=16&output=embed",
    },
    transport: text(
      "A short walk from Wangsimni Station. Explore Seongsu, Dongdaemun and central Seoul from one connected neighborhood.",
      "왕십리역에서 도보로 이동할 수 있습니다. 성수, 동대문과 서울의 다양한 지역으로 여행을 이어가세요.",
      "往十里駅から徒歩圏内。聖水、東大門、ソウル中心部へ便利にお出かけいただけます。",
      "从往十里站步行可达，轻松探索圣水、东大门和首尔中心。",
    ),
    checkin: "15:00",
    checkout: "11:00",
    facilities: [
      "lounge",
      "laundry",
      "luggage",
      "wifi",
      "water",
      "selfCheckin",
    ],
    draft: false,
    rooms: [
      {
        slug: "double",
        name: text("Double Room", "더블룸", "ダブルルーム", "双人房"),
        description: text(
          "A 14 m² room for up to 2 guests, with one double bed and a private bathroom. Includes free Wi-Fi, air conditioning, a flat-screen TV and a hair dryer.",
          "더블 침대 1개와 전용 욕실을 갖춘 14m² 객실로 최대 2명이 머무를 수 있습니다. 무료 와이파이, 에어컨, 평면 TV, 헤어드라이어를 제공합니다.",
          "ダブルベッド1台と専用バスルームを備えた14m²の客室。定員は2名です。無料Wi-Fi、エアコン、薄型テレビ、ヘアドライヤーをご利用いただけます。",
          "14平方米客房，配有1张双人床和独立卫浴，最多入住2人。提供免费Wi-Fi、空调、平板电视和吹风机。",
        ),
        capacity: 2,
        size: 14,
        beds: text(
          "1 double bed",
          "더블 침대 1개",
          "ダブルベッド1台",
          "1张双人床",
        ),
        images: Array.from(
          { length: 7 },
          (_, i) => `/images/optimized/double-${i + 1}.avif`,
        ),
        bathroom: "privateBath",
        bathtub: null,
        draft: false,
      },
      {
        slug: "twin",
        name: text("Twin Room", "트윈룸", "ツインルーム", "双床房"),
        description: text(
          "A 15 m² room for up to 2 guests, with two single beds and a private bathroom. Includes free Wi-Fi, air conditioning, a flat-screen TV and a hair dryer.",
          "싱글 침대 2개와 전용 욕실을 갖춘 15m² 객실로 최대 2명이 머무를 수 있습니다. 무료 와이파이, 에어컨, 평면 TV, 헤어드라이어를 제공합니다.",
          "シングルベッド2台と専用バスルームを備えた15m²の客室。定員は2名です。無料Wi-Fi、エアコン、薄型テレビ、ヘアドライヤーをご利用いただけます。",
          "15平方米客房，配有2张单人床和独立卫浴，最多入住2人。提供免费Wi-Fi、空调、平板电视和吹风机。",
        ),
        capacity: 2,
        size: 15,
        beds: text(
          "2 single beds",
          "싱글 침대 2개",
          "シングルベッド2台",
          "2张单人床",
        ),
        images: Array.from(
          { length: 6 },
          (_, i) => `/images/optimized/twin-${i + 1}.avif`,
        ),
        bathroom: "privateBath",
        bathtub: null,
        draft: false,
      },
      {
        ...placeholderRoom(
          "deluxe-double",
          text(
            "Deluxe Double",
            "디럭스 더블룸",
            "デラックスダブル",
            "豪华双人房",
          ),
        ),
        bathtub: true,
      },
    ],
  },
  {
    id: "dongdaemun",
    active: true,
    name: text("Dongdaemun", "동대문", "東大門", "东大门"),
    introduction: text(
      "A new chapter of ARU STAY in Dongdaemun. We’re preparing the details of your next Seoul base.",
      "동대문에서 만나는 아루스테이의 새로운 이야기. 다음 서울 여행을 위한 자세한 소개를 준비하고 있습니다.",
      "東大門で始まるARU STAYの新しい物語。新たなソウルの拠点をご紹介する準備をしています。",
      "ARU STAY在东大门的新篇章。我们正为你的下一次首尔之旅准备详细介绍。",
    ),
    features: [
      text("Dongdaemun, Seoul", "서울 동대문", "ソウル・東大門", "首尔东大门"),
      text(
        "Location details coming soon",
        "지점 정보 준비 중",
        "詳細は近日公開",
        "分店详情即将更新",
      ),
    ],
    image: null,
    bookingUrl: null,
    address: null,
    coordinates: null,
    maps: null,
    transport: text(
      "The exact address and directions will be added after confirmation.",
      "정확한 주소와 교통 안내는 확인 후 업데이트됩니다.",
      "正確な住所とアクセスは確認後に更新します。",
      "准确地址和交通指南将在确认后更新。",
    ),
    checkin: null,
    checkout: null,
    facilities: [],
    draft: true,
    rooms: [1, 2, 3].map((n) =>
      placeholderRoom(
        `room-${n}`,
        text(
          `Room ${String(n).padStart(2, "0")}`,
          `객실 ${String(n).padStart(2, "0")}`,
          `客室 ${String(n).padStart(2, "0")}`,
          `客房 ${String(n).padStart(2, "0")}`,
        ),
      ),
    ),
  },
];

export const activeStays = stays.filter((stay) => stay.active);
export const getStay = (id: string) =>
  activeStays.find((stay) => stay.id === id);
export const getRoom = (stay: Stay, slug: string) =>
  stay.rooms.find((room) => room.slug === slug);
export const stayPath = (stay: Stay) => `/locations/${stay.id}`;
export const roomPath = (stay: Stay, room: Room) =>
  `${stayPath(stay)}/rooms/${room.slug}`;
export const value = (localized: Localized, locale: string) =>
  localized[asLocale(locale)];
export function bookingHref(stay: Stay): string | null {
  if (!stay.bookingUrl) return null;
  try {
    const url = new URL(stay.bookingUrl);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
export const localizedPath = (path: string, locale: Locale | string) =>
  locale === "en" ? path : `/${locale}${path === "/" ? "" : path}`;
