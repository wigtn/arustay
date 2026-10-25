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
  amenities?: ("wifi" | "aircon" | "television" | "privateBath" | "hairdryer" | "towels" | "drinkingWater")[];
};
export type Stay = {
  id: string;
  active: boolean;
  name: Localized;
  introduction: Localized;
  features: Localized[];
  image: string | null;
  images?: string[];
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
      "A cozy base near Dongdaemun’s local markets, with rooms for solo travelers, friends, and families.",
      "동대문의 시장 가까이에서 편안히 머무세요. 혼자 떠나는 여행부터 친구, 가족과 함께하는 여행까지 아우르는 객실을 갖추고 있습니다.",
      "東大門の市場にほど近い、くつろぎの拠点。一人旅から友人同士、ご家族での旅行まで、それぞれに合う客室をご用意しています。",
      "邻近东大门当地市场的温馨住所，提供适合独行旅客、朋友及家庭入住的客房。",
    ),
    features: [
      text("1 min from Dongdaemun Station", "동대문역에서 도보 1분", "東大門駅から徒歩1分", "距东大门站步行1分钟"),
      text("Rooms for 1–4 guests", "1–4인 객실", "1〜4名様向けの客室", "可住1–4人的客房"),
      text("Private bathrooms", "전용 욕실", "専用バスルーム", "独立浴室"),
    ],
    image: "/images/revision-11/dongdaemun-location-1.jpg",
    images: Array.from({ length: 4 }, (_, i) => `/images/revision-11/dongdaemun-location-${i + 1}.jpg`),
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
    rooms: [
      {
        slug: "single",
        name: text("Single Room", "싱글룸", "シングルルーム", "单人房"),
        description: text("A compact room for solo travelers, with a single bed and warm wood accents. Soft lighting creates a cozy place to unwind after a day exploring Seoul.", "혼자 여행하는 분을 위한 아담한 객실입니다. 싱글 침대와 따뜻한 나무 소재, 은은한 조명이 어우러져 서울을 둘러본 뒤 편안히 쉬기 좋습니다.", "一人旅にぴったりのコンパクトな客室。シングルベッドと温かみのある木のアクセントを配し、柔らかな照明がソウル散策の後にくつろげる空間をつくります。", "为独行旅客打造的精巧客房，配有一张单人床，以温润木饰点缀。柔和灯光营造舒适氛围，让您在游览首尔一天后放松身心。"),
        capacity: 1,
        size: 9,
        beds: text("1 single bed (850 × 1900 mm)", "싱글 침대 1개 (850 × 1900 mm)", "シングルベッド1台（850 × 1900 mm）", "1张单人床（850 × 1900 mm）"),
        images: Array.from({ length: 6 }, (_, i) => `/images/revision-11/dongdaemun-single-${i + 1}.jpg`),
        bathroom: "privateBath",
        bathtub: null,
        draft: false,
        amenities: ["wifi", "aircon", "television", "privateBath", "hairdryer", "towels", "drinkingWater"],
      },
      {
        slug: "double",
        name: text("Double Room", "더블룸", "ダブルルーム", "双人房"),
        description: text("A cozy room for two, with a double bed, warm bedside lighting, and simple wooden furnishings. A welcoming base for exploring Seoul together.", "더블 침대와 따뜻한 침대 옆 조명, 단정한 원목 가구를 갖춘 2인 객실입니다. 함께 서울을 여행하며 편안히 머물 수 있습니다.", "ダブルベッド、温かみのあるベッドサイドの照明、シンプルな木製家具を備えた2名様向けの客室。お二人でソウルを巡る旅の拠点に。", "温馨的双人客房，配有一张双人床、暖色床头灯和简约木质家具，是两人一起探索首尔的舒适落脚点。"),
        capacity: 2,
        size: 14,
        beds: text("1 double bed (1350 × 1900 mm)", "더블 침대 1개 (1350 × 1900 mm)", "ダブルベッド1台（1350 × 1900 mm）", "1张双人床（1350 × 1900 mm）"),
        images: Array.from({ length: 15 }, (_, i) => `/images/revision-11/dongdaemun-double-${i + 1}.jpg`),
        bathroom: "privateBath",
        bathtub: null,
        draft: false,
        amenities: ["wifi", "aircon", "television", "privateBath", "hairdryer", "towels", "drinkingWater"],
      },
      {
        slug: "twin",
        name: text("Twin Room", "트윈룸", "ツインルーム", "双床房"),
        description: text("Travel together and enjoy your own bed. With two single beds, warm wood accents, and a simple layout, this room is a comfortable choice for friends or travel companions.", "함께 여행하면서 각자의 침대에서 편히 쉬세요. 싱글 침대 2개와 따뜻한 나무 소재, 단정한 구조를 갖춰 친구나 여행 동반자와 머물기 좋습니다.", "一緒に旅をしながら、それぞれのベッドでゆっくりと。シングルベッド2台、温かみのある木のアクセント、シンプルな間取りで、友人同士や旅仲間との滞在におすすめです。", "结伴出游，也能享有各自的睡眠空间。两张单人床、温润木饰与简洁布局，为朋友或旅伴提供舒适的住宿选择。"),
        capacity: 2,
        size: 16,
        beds: text("2 single beds (850 × 1900 mm each)", "싱글 침대 2개 (각 850 × 1900 mm)", "シングルベッド2台（各850 × 1900 mm）", "2张单人床（每张850 × 1900 mm）"),
        images: Array.from({ length: 8 }, (_, i) => `/images/revision-11/dongdaemun-twin-${i + 1}.jpg`),
        bathroom: "privateBath",
        bathtub: null,
        draft: false,
        amenities: ["wifi", "aircon", "television", "privateBath", "hairdryer", "towels", "drinkingWater"],
      },
      {
        slug: "triple",
        name: text("Triple Room", "트리플룸", "トリプルルーム", "三人房"),
        description: text("A welcoming room for up to three guests, with a double bed and a single bed. Light walls and wooden furnishings create a warm setting for a stay with friends or family.", "더블 침대와 싱글 침대를 갖춘 최대 3인 객실입니다. 밝은 벽과 원목 가구가 따뜻한 분위기를 만들어 친구나 가족과 함께 머물기 좋습니다.", "ダブルベッド1台とシングルベッド1台を備えた、最大3名様までの客室。明るい壁と木製家具が温かな雰囲気をつくり、ご友人やご家族との滞在に適しています。", "最多可住三人的温馨客房，配有一张双人床和一张单人床。浅色墙面与木质家具营造暖意，适合与朋友或家人一同入住。"),
        capacity: 3,
        size: 20,
        beds: text("1 double bed (1350 × 1900 mm) + 1 single bed (850 × 1900 mm)", "더블 침대 1개 (1350 × 1900 mm) + 싱글 침대 1개 (850 × 1900 mm)", "ダブルベッド1台（1350 × 1900 mm）＋シングルベッド1台（850 × 1900 mm）", "1张双人床（1350 × 1900 mm）+ 1张单人床（850 × 1900 mm）"),
        images: Array.from({ length: 7 }, (_, i) => `/images/revision-11/dongdaemun-triple-${i + 1}.jpg`),
        bathroom: "privateBath",
        bathtub: null,
        draft: false,
        amenities: ["wifi", "aircon", "television", "privateBath", "hairdryer", "towels", "drinkingWater"],
      },
      {
        slug: "deluxe-family",
        name: text("Deluxe Family Room", "디럭스 패밀리룸", "デラックスファミリールーム", "豪华家庭房"),
        description: text("Stay together in a room with two double beds, accommodating up to four guests. Warm wooden furnishings and soft bedside lighting make it a welcoming space for families or friends.", "더블 침대 2개를 갖춘 객실에서 최대 4명이 함께 머무를 수 있습니다. 따뜻한 원목 가구와 은은한 침대 옆 조명이 가족이나 친구와 편안히 쉬는 공간을 만들어 줍니다.", "ダブルベッド2台を備え、最大4名様でご一緒にお泊まりいただける客室。温かみのある木製家具と柔らかなベッドサイドの照明が、ご家族やご友人との滞在を心地よく彩ります。", "配有两张双人床，最多可容纳四人一同入住。温润的木质家具与柔和的床头灯光，为家人或朋友营造温馨舒适的相聚空间。"),
        capacity: 4,
        size: 23,
        beds: text("2 double beds (1350 × 1900 mm each)", "더블 침대 2개 (각 1350 × 1900 mm)", "ダブルベッド2台（各1350 × 1900 mm）", "2张双人床（每张1350 × 1900 mm）"),
        images: Array.from({ length: 7 }, (_, i) => `/images/revision-11/dongdaemun-deluxe-family-${i + 1}.jpg`),
        bathroom: "privateBath",
        bathtub: null,
        draft: false,
        amenities: ["wifi", "aircon", "television", "privateBath", "hairdryer", "towels", "drinkingWater"],
      },
    ],
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
