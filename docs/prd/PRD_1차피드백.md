# ARU STAY 1차 피드백 반영 PRD

> **Version**: 1.2
> **Created**: 2026-04-19
> **Updated**: 2026-04-19 (prd-reviewer Critical 4건 + 주요 Major 반영)
> **Status**: Approved for Implementation
> **Source**: `docs/prd/1차피드백.md`
> **Scope**: Frontend-only content & UI 업데이트 (백엔드 변경 없음)

## Changelog

- **v1.2 (2026-04-19)** — prd-reviewer 보고(Critical 4 / Major 7) 반영
  - **C-1**: 앵커 ID `#long-stay` → 실제 코드(`<section id="long-stay">`, `SECTION_IDS`)에 맞춰 **`#long-stay`** 로 일괄 정정
  - **C-2**: Phase 0 "이미지 전처리(AVIF/WebP 변환 + kebab-case 리네임)" 태스크 승격 — FR-029 신설
  - **C-3**: Double Bed 스펙 변경 근거 표기 — "2026-04-19 사용자 직접 답변(`/prd` 세션 내)": Double 1대가 맞음 / Twin 2대가 맞음. 원본 `1차피드백.md` 기재분은 오기로 확인.
  - **C-4**: Hero/About 섹션 분리 구조 명시 — `<section id="hero">` (main.avif) + `<section id="about">` (about.avif). Nav에는 기존대로 "About"만 노출(Hero는 스크롤 최상단 고정)
  - **M-1**: 다국어 톤 가이드 추가 (§4.7)
  - **M-2**: 캐러셀 세부 정책(autoplay off, loop on, 50px threshold, reduced-motion 존중) 명시
  - **M-4**: 객실 이미지 파일명 kebab-case 리네임 FR 승격 (FR-029에 통합)
  - **M-5**: `RoomCarousel` `'use client'` 의무화 명시
  - **M-6**: FR-026 검증 항목 구체화(전체 섹션 id ↔ Nav 대응 스모크 테스트)
  - **M-7**: Phase 6에 `npm run typecheck` 단계 명시

- **v1.1 (2026-04-19)** — Open Questions §8 운영자 답변 반영
  - 메인배너 이미지: `about.jpg` → **`main.jpg`** (About 섹션 이미지와 분리)
  - Double Room Beds: "2 Double Beds" → **"1 Double Bed (1,300×2,000 mm)"**
  - Twin Room Beds: "1 Single Bed" → **"2 Single Beds (900×2,000 mm each)"**
  - About 풀블리드 영역 내 CTA 배치: **별도 블록(Hero)에만 두고 About 플로팅 텍스트 영역에는 CTA 없음**
  - 네이버지도: 아이콘 PNG 대기 없이 **텍스트 "Naver Map" + lucide `ExternalLink`** 아이콘으로 선 구현, PNG 수급 시 교체
  - Hero 서브타이틀 유지
  - Facilities 순서: Lounge → Washing & Drying → Water Dispenser → Microwave → Free Luggage → Comfort Essentials (확정)
  - Room 이미지 캡션 생략 (a11y alt만 사용)

## 1. Overview

### 1.1 Problem Statement

현재 ARU STAY 웹사이트(MVP)는 임시 카피, 언플래시 스톡 이미지, 실제와 다른 객실 구성(4종)으로 운영 중이다. 운영자가 실제 객실 사진 및 브랜드 카피를 확정했고, 섹션 구조·메인배너·About·객실·시설·지도에 걸친 1차 피드백을 주었다. 이 피드백을 사이트에 반영해 "실제 서비스를 반영한 1차 퍼블리싱" 상태로 만드는 것이 목표.

### 1.2 Goals

- 실제 운영 중인 객실(Double, Twin) 2종 구성으로 전환하고 실사 이미지로 교체
- About 섹션을 풀블리드 배경 이미지 + 오버레이 + 플로팅 텍스트 형태로 리디자인
- 메인 CTA(“Request a Long Stay”)가 동일 페이지 LONG STAY 섹션으로 부드럽게 스크롤되도록 동작 변경
- Long Stay ↔ Facilities 섹션 순서 스왑
- Facilities 항목을 실제 제공 시설로 정정(Water Dispenser, Washing & Drying Machine, Free Luggage Storage, Comfort Essentials)
- Location 섹션에 네이버 지도 바로가기 추가 (국내 방문객 대응)
- 모든 카피를 4개 언어(en/ja/zh/ko) 리소스에 반영

### 1.3 Non-Goals (Out of Scope)

- 예약 시스템, 결제, 회원가입 등 백엔드 기능 추가
- CMS 도입 (카피는 계속 `content/*.json`에서 관리)
- 새로운 섹션 추가 (Blog, Gallery 페이지 등)
- Facilities/Rooms 데이터를 Supabase로 마이그레이션 (현 정적 JSON 유지)
- SEO/애드테크 추가 작업 (기존 Phase 2 SEO 결과물 유지)

### 1.4 Scope

| 포함 | 제외 |
|------|------|
| Hero(메인배너) 배경 `main.jpg`로 교체 + 카피/CTA 동작 변경 | 신규 페이지 라우팅 |
| About 섹션 풀블리드(`about.jpg`) + 플로팅 텍스트 리디자인 | 다크모드 |
| Rooms 섹션을 2종(Double, Twin)으로 축소 | 객실 예약/재고 관리 |
| Rooms에 다중 이미지 슬라이드 캐러셀 도입 | 라이트박스 확대(이미 모달 존재, 재활용) |
| Facilities 항목 리라이트(추가/삭제/개명) | 시설 이미지 추가 |
| Long Stay ↔ Facilities 렌더 순서 스왑 | Nav 메뉴 재배열 정책 변경 |
| Location에 네이버지도 링크 아이콘 추가 | 지도 SDK(네이버) 임베드 |
| `content/en.json` + ja/zh/ko 카피 동기화 | 신규 언어 추가 |
| 객실 이미지 `public/images/` 로컬 배포 | CDN·이미지 최적화 파이프라인 전면 교체 |

## 2. User Stories

### 2.1 Primary Users

- **외국인 장기 체류 예정자(영/일/중)**: 서울에서 조용하고 깨끗한 10박 이상 숙소를 찾는 여행자
- **국내 단기 방문자**: 왕십리 인근을 네이버지도로 확인하고 싶은 한국인 게스트
- **운영자(클라이언트)**: 실제 객실/시설 정보가 정확히 반영되길 원하는 호스트

### 2.2 Acceptance Criteria (Gherkin)

```
Scenario: 메인배너 CTA 클릭 시 LONG STAY 섹션으로 스크롤
  Given 사용자가 홈페이지 상단을 보고 있다
  When "Request a Long Stay" 버튼을 클릭한다
  Then 페이지가 동일 페이지 내 #long-stay 섹션까지 부드럽게(smooth) 스크롤된다
  And 새 탭이 열리지 않는다

Scenario: 메인배너 배경이 main.jpg로 풀블리드 렌더
  Given 사용자가 홈페이지를 연다
  Then `/images/main.jpg`가 Hero 배경으로 cover 렌더되고
  And "A cozy base for your days in Seoul" 타이틀이 Hero 위 플로팅 텍스트로 표시된다
  And "Request a Long Stay" CTA 버튼이 Hero 영역 내 존재한다

Scenario: About 배경이 about.jpg로 풀블리드 렌더
  Given 사용자가 홈페이지를 연다
  When About 영역이 뷰포트에 들어온다
  Then `/images/about.jpg`가 섹션 배경으로 cover 렌더되고
  And 가독성을 위한 어두운 오버레이(opacity ≥ 0.4) 위에 타이틀/본문이 흰색으로 플로팅된다
  And About 플로팅 영역 내부에는 CTA 버튼이 존재하지 않는다 (CTA는 Hero에만)

Scenario: Double Room 캐러셀 스와이프(모바일)
  Given 사용자가 모바일 뷰포트(< 768px)에서 Rooms 섹션을 본다
  When Double Room 이미지를 좌/우로 스와이프한다
  Then 다음/이전 이미지가 슬라이드 전환되고
  And 하단 도트 인디케이터의 활성 상태가 현재 인덱스로 업데이트된다

Scenario: Double Room 캐러셀 PC 버튼
  Given 사용자가 데스크톱(≥ 768px)에서 Rooms 섹션을 본다
  When 좌/우 화살표 버튼을 클릭한다
  Then 순환하며 다음/이전 이미지로 이동한다

Scenario: 섹션 순서(Long Stay ↔ Facilities 스왑)
  Given 사용자가 홈페이지를 스크롤한다
  Then About → Rooms → Facilities → Long Stay → Location → Guest Notes → FAQ → Booking 순서로 렌더된다

Scenario: Facilities 항목 정정
  Given 사용자가 Facilities 섹션을 본다
  Then "Self check-in" 항목이 보이지 않고
  And "Water Dispenser", "Washing & Drying Machine", "Free Luggage Storage", "Comfort Essentials" 항목이 표시된다

Scenario: Location 네이버지도 링크
  Given 사용자가 Location 섹션을 본다
  When "Naver Map" 텍스트 링크(또는 아이콘)를 클릭한다
  Then 새 탭으로 https://naver.me/5qLOV1Bq 가 열린다
  And 구글맵은 메인 영역에 iframe으로 계속 표시된다
  And 외국인 사용자도 "Naver Map" 영문 라벨을 통해 의미를 알 수 있다

Scenario: 다국어 카피 동기화
  Given 사용자가 /ja, /zh, /ko 경로로 접근한다
  Then 변경된 About 본문, Rooms 제목/본문, Facilities 항목, Hero 카피가 각 언어로 표시되며 누락(fallback to key)이 없다
```

## 3. Functional Requirements

| ID | Requirement | Priority | Dependencies |
|----|-------------|----------|--------------|
| FR-001 | 섹션 렌더 순서를 `About → Rooms → Facilities → LongStay → Location → GuestNotes → Faq → Booking`으로 변경 | P0 | - |
| FR-002 | Hero(메인배너) 배경 이미지를 `public/images/main.jpg`로 교체, 기존 Unsplash URL 제거 | P0 | - |
| FR-003 | Hero 타이틀을 "A cozy base for your days in Seoul"로 변경. 서브타이틀("Soft, warm, and thoughtfully cared for…")은 유지 | P0 | - |
| FR-004 | Hero CTA "Request a Long Stay" 클릭 시 `#long-stay` 섹션으로 smooth scroll (동일 페이지 이동, 새 탭/폼 열지 않음) | P0 | FR-001 |
| FR-005 | About 섹션을 풀블리드 배경(`public/images/about.jpg`) + 어두운 오버레이(0.45~0.6) + 중앙/좌측 플로팅 텍스트 레이아웃으로 리디자인. **CTA 버튼은 Hero에만, About 플로팅 영역에는 포함하지 않음.** | P0 | - |
| FR-006 | About 타이틀을 "Run by travelers, for travelers"로 변경 | P0 | FR-005 |
| FR-007 | About 본문을 1차 피드백 문단으로 교체 (ARU STAY is a small, internationally friendly stay…) | P0 | FR-005 |
| FR-008 | About points 3개를 "A stay made with care / Thoughtfully made, simply run / A place to feel at ease"로 교체 | P0 | FR-007 |
| FR-009 | Rooms items를 2종(Double, Twin)만 유지, Single/Family 제거 | P0 | - |
| FR-010 | Rooms 공통 카피 갱신 — 타이틀 "Not too much, not too little.", 리드 문단 교체 | P0 | FR-009 |
| FR-011 | Double Room 스펙 — Capacity 2, Size 14m², Beds **"1 Double Bed (1,300×2,000 mm)"**, Amenities [Free Wi-Fi, Flat-screen TV, Air Conditioning, Private Bathroom, Hair Dryer] | P0 | FR-009 |
| FR-012 | Twin Room 스펙 — Capacity 2, Size 15m², Beds **"2 Single Beds (900×2,000 mm each)"**, Amenities 동일 | P0 | FR-009 |
| FR-013 | Rooms 카드/상세에 다중 이미지 캐러셀 도입: 모바일 터치 스와이프, 데스크톱 좌/우 버튼 + 하단 도트 인디케이터 | P0 | FR-009 |
| FR-014 | Double Room 이미지 소스를 `/images/double (1).jpg ~ double (7).jpg` 7장으로 바인딩 | P0 | FR-013 |
| FR-015 | Twin Room 이미지 소스를 `/images/twin.jpg, twin (2).jpg ~ twin (6).jpg` 6장으로 바인딩 | P0 | FR-013 |
| FR-016 | Facilities items에서 "Self Check-in after 9 PM" 제거 | P0 | - |
| FR-017 | Facilities의 "Water Purifier"를 "Water Dispenser"로 개명(desc 유지 혹은 "Cold and hot water, anytime.") | P0 | - |
| FR-018 | Facilities에 "Washing & Drying Machine" 항목 추가, desc "Wash and dry in one easy cycle." | P0 | - |
| FR-019 | Facilities에 "Free Luggage Storage" 항목 추가, desc "Available before check-in and after check-out." (기존 Luggage Storage는 이 항목으로 통합) | P0 | - |
| FR-020 | Facilities에 "Comfort Essentials" 항목 추가, desc "Extra towels and toilet paper are available on each floor." | P0 | - |
| FR-021 | Facilities 유지 항목: Lounge, Microwave | P0 | - |
| FR-021a | Facilities 표시 순서 확정: Lounge → Washing & Drying Machine → Water Dispenser → Microwave → Free Luggage Storage → Comfort Essentials | P0 | FR-016~FR-021 |
| FR-022 | Location 섹션에 네이버지도 외부 링크 추가. `target="_blank" rel="noopener noreferrer"`로 `https://naver.me/5qLOV1Bq` 열기 | P0 | - |
| FR-023 | 네이버지도 링크는 **텍스트 라벨 "Naver Map" + lucide `ExternalLink` 아이콘** 조합으로 선구현. (운영자가 이미지 아이콘 제공 전까지 텍스트 우선 — 외국인 게스트도 영문 라벨로 의미 파악 가능) | P0 | FR-022 |
| FR-023a | 운영자가 추후 네이버맵 PNG 아이콘을 제공하면 `public/images/naver-map.png`에 배치 후 텍스트 앞에 `<Image>`로 표시 | P2 | FR-023 |
| FR-024 | 구글맵 iframe은 현재 `GOOGLE_MAPS_EMBED_SRC` 그대로 유지. 구글맵 외부 링크 주소는 `https://maps.app.goo.gl/ZMjFaHmrpoyzxVLS8` (네이버와 동일 라인에 "Google Maps" 링크로 병기 가능) | P1 | - |
| FR-025 | `content/en.json, ja.json, zh.json, ko.json` 4개 파일에 위 변경사항 모두 동기화 (키 구조 일치, 누락 시 빌드 타임 검증) | P0 | FR-003, FR-006~FR-008, FR-010~FR-012, FR-017~FR-021a |
| FR-026 | Nav 메뉴 순서와 앵커 ID가 새 섹션 순서와 일치 (`#rooms`, `#facilities`, `#long-stay`, `#location`) | P1 | FR-001 |
| FR-027 | 이미지 로딩 최적화 — Next.js `<Image>` 컴포넌트로 교체, `loading="lazy"`, `sizes` 속성 지정, LCP 대상 `main.jpg`는 `priority` | P1 | FR-002, FR-014, FR-015 |
| FR-028 | 캐러셀 키보드 접근성 — 포커스 상태에서 ←/→ 키로 이동, `aria-roledescription="carousel"`, 이미지에 의미 있는 `alt` | P1 | FR-013 |
| FR-029 | **[Phase 0]** 이미지 전처리: 원본 JPG를 `sharp`로 AVIF 변환 + kebab-case 리네임 + 리사이즈. Hero/About 1600px ≤ 300KB, Room 이미지 1400px ≤ 200KB. 산출물: `public/images/optimized/{hero,about,double-1..7,twin-1..6}.avif` (원본은 보존) | P0 | - |
| FR-030 | 캐러셀 동작 정책: **autoplay OFF, loop ON, swipe threshold 50px, 전환 300ms ease-out, `prefers-reduced-motion: reduce` 시 애니메이션 0ms**, 라이브 리전으로 "Slide i of n" 공지 | P0 | FR-013 |
| FR-031 | Hero/About 섹션 구조: `<section id="hero" class="min-h-[92vh]">` (main.avif 배경 + CTA) + 이어서 `<section id="about" class="min-h-screen">` (about.avif 풀블리드 + 오버레이 0.5 + 플로팅 텍스트, CTA 없음). `scroll-behavior: smooth` 전역 적용하되 `prefers-reduced-motion: reduce` 시 auto. 각 섹션 `scroll-margin-top: 72px` (Nav 높이) | P0 | FR-002, FR-005 |
| FR-032 | **Nav 정합성 검증** — 빌드 후 smoke test: `SECTION_IDS` 7개(`about, rooms, facilities, long-stay, location, guest-notes, book`) 각각 `document.getElementById()`가 엘리먼트를 찾아야 함. `hero`는 Nav에 포함하지 않음(스크롤 최상단 고정) | P1 | FR-001, FR-026 |

## 4. Non-Functional Requirements

### 4.0 Scale Grade

**Hobby (사이드 프로젝트 / 소형 부티크 스테이 홍보 사이트)**

- 예상 DAU: < 1,000
- 피크 동시접속: < 100
- 인프라: Vercel 무료~Hobby 티어 (현 배포 유지)
- 가용성 목표: 95% (실제는 Vercel SLA ≈ 99.9%)

### 4.1 Performance SLA

| 지표 | 목표값 |
|------|--------|
| LCP (Largest Contentful Paint) | < 2.5s (3G Fast) |
| CLS | < 0.1 |
| INP | < 200ms |
| 이미지 총량 (Rooms 2종 합계) | < 3MB (로딩 지연 허용) |
| Hero main.jpg | WebP/AVIF 우선, < 250KB 목표 |
| About 배경 about.jpg | WebP/AVIF 우선, < 250KB 목표 |

### 4.2 Availability SLA

95% (Hobby). Vercel CDN에 위임.

### 4.3 Data Requirements

- 정적 이미지만 증가: 현재 추가된 14장 (~로컬 용량 확인 필요). 월간 증가 없음.
- 카피 변경은 Git commit으로 관리.

### 4.4 Recovery

N/A — 정적 사이트, Git revert로 즉시 롤백 가능.

### 4.5 Security

- 외부 링크(네이버지도/구글폼/OTA): `rel="noopener noreferrer"` 필수
- `next.config.js` `images.domains` 검토(외부 Unsplash 제거 후 로컬만 사용 시 설정 정리)
- 사용자 입력 처리 없음 → OWASP 관련 신규 리스크 없음

### 4.6 Accessibility

- 이미지 `alt` 필수(객실명 + 인덱스). 장식용은 `alt=""` + `aria-hidden`.
- About 오버레이 위 본문 대비비 ≥ 4.5:1 (흰색 글자 + 오버레이 대비 검증 필요)
- 캐러셀 키보드 조작 가능, 스크린리더 라이브 리전으로 현재 슬라이드 알림

### 4.7 i18n

- `content/{en,ja,zh,ko}.json` 키 구조 완전 일치. 누락 키 존재 시 CI fail (수동 diff 확인)
- 번역 문구는 원문 대비 자연스러운 로컬라이제이션 (직역 금지 가이드)

**톤 가이드** (v1.2 추가):

| Locale | 문체 | 샘플 (About.title "Run by travelers, for travelers") |
|--------|------|------------------------------------------------------|
| `en` | Warm, conversational | Run by travelers, for travelers |
| `ja` | 丁寧体 (です/ます), やわらかく親しみやすいトーン | 旅人が、旅人のために営むやど |
| `zh` | 简体, 客服조 중립체 (您 사용 지양, 자연스럽게) | 旅行者为旅行者打造的小宿 |
| `ko` | 해요체, 부드럽고 친근한 톤 | 여행자가 여행자를 위해 운영하는 숙소 |

## 5. Technical Design

### 5.1 API Specification

**N/A — 순수 정적 사이트. 백엔드 API 변경 없음.**

### 5.2 콘텐츠 스키마 변경

**`content/en.json` diff 핵심:**

```jsonc
{
  "hero": {
    "title": "A cozy base for your days in Seoul.",     // 변경
    "subtitle": "Soft, warm, and thoughtfully cared for. Stay a night, or stay a while.", // 유지
    "cta": "Request a Long Stay"                          // 유지
    // 배경 이미지는 컴포넌트에서 /images/main.jpg 로 직접 참조
  },
  "about": {
    "title": "Run by travelers, for travelers",           // 변경
    "body": "ARU STAY is a small, internationally friendly stay in the heart of Seoul. We keep things simple and kind — clean rooms, quiet mornings, and an easy, self-guided rhythm. We truly enjoy what we do, and we care deeply about every guest who walks through our doors. More than anything, we hope ARU STAY feels like a place you can feel at ease, just like home.",
    "points": [
      { "title": "A stay made with care", "body": "We pay attention to the little things that make your stay comfortable." },
      { "title": "Thoughtfully made, simply run", "body": "We all love traveling, and we understand the joy it brings. We try to share that same feeling with every guest who stays with us." },
      { "title": "A place to feel at ease", "body": "We hope you feel relaxed, comfortable, and truly welcomed here." }
    ]
    // 배경 이미지는 컴포넌트에서 /images/about.jpg 로 직접 참조
  },
  "rooms": {
    "title": "Not too much, not too little.",
    "subtitle": "Our rooms are compact, but thoughtfully arranged with the essentials for a comfortable stay. We keep things simple, practical, and reasonably priced, so you can enjoy Seoul without paying for more than you need.",
    "items": [
      {
        "slug": "double",
        "name": "Double Room",
        "capacity": "2 guests",
        "size": "14 m²",
        "beds": "1 Double Bed (1,300 × 2,000 mm)",
        "amenities": ["Free Wi-Fi", "Flat-screen TV", "Air Conditioning", "Private Bathroom", "Hair Dryer"],
        "images": [
          "/images/double (1).jpg",
          "/images/double (2).jpg",
          "/images/double (3).jpg",
          "/images/double (4).jpg",
          "/images/double (5).jpg",
          "/images/double (6).jpg",
          "/images/double (7).jpg"
        ]
      },
      {
        "slug": "twin",
        "name": "Twin Room",
        "capacity": "2 guests",
        "size": "15 m²",
        "beds": "2 Single Beds (900 × 2,000 mm each)",
        "amenities": ["Free Wi-Fi", "Flat-screen TV", "Air Conditioning", "Private Bathroom", "Hair Dryer"],
        "images": [
          "/images/twin.jpg",
          "/images/twin (2).jpg",
          "/images/twin (3).jpg",
          "/images/twin (4).jpg",
          "/images/twin (5).jpg",
          "/images/twin (6).jpg"
        ]
      }
    ],
    "viewDetails": "View details",
    "close": "Close",
    "size": "Size",
    "capacityLabel": "Capacity",
    "bedsLabel": "Bed Configuration",
    "amenitiesLabel": "Amenities"
  },
  "facilities": {
    "items": [
      // 순서 확정 (FR-021a)
      { "name": "Lounge", "desc": "A shared space to relax or work." },
      { "name": "Washing & Drying Machine", "desc": "Wash and dry in one easy cycle." },
      { "name": "Water Dispenser", "desc": "Cold and hot water, anytime." },
      { "name": "Microwave", "desc": "For quick meals and late snacks." },
      { "name": "Free Luggage Storage", "desc": "Available before check-in and after check-out." },
      { "name": "Comfort Essentials", "desc": "Extra towels and toilet paper are available on each floor." }
    ]
  },
  "location": {
    "mapLinks": {
      // icon 필드는 옵셔널. v1은 텍스트 + ExternalLink 아이콘으로 선구현, 추후 naver-map.png 수급 시 optional icon 경로 추가
      "google": { "label": "Google Maps", "url": "https://maps.app.goo.gl/ZMjFaHmrpoyzxVLS8" },
      "naver":  { "label": "Naver Map",   "url": "https://naver.me/5qLOV1Bq" }
    }
  }
}
```

ja/zh/ko 동일 키 구조 유지, 문자열만 현지어로.

### 5.3 컴포넌트 변경

| 파일 | 변경 내용 |
|------|-----------|
| `app/[locale]/page.tsx` | 섹션 import 순서 변경: Rooms 다음에 Facilities, 그 다음 LongStay |
| `app/[locale]/sections/About.tsx` | **Hero 상단부** 배경을 `/images/main.jpg`로 교체 (Unsplash 제거) + CTA `href`를 외부 폼(`LONG_STAY_FORM_URL`)에서 `#long-stay`로 변경 + `target/rel` 속성 제거. **About 하단 본문 블록**을 별개의 풀블리드 섹션으로 재구성하고 배경은 `/images/about.jpg` + 어두운 오버레이(0.5) + 플로팅 텍스트(타이틀/본문/points). About 영역에는 CTA 없음. |
| `app/[locale]/sections/Rooms.tsx` | `IMAGES` 상수 제거. items에서 room별 `images[]` 사용. 카드와 모달 이미지 영역을 신규 `<RoomCarousel>`로 교체. `bedsLabel`/`beds` 필드 추가 렌더 |
| `components/RoomCarousel.tsx` (신규) | **`'use client'` 의무**. Props: `images: string[]`, `alt: string`. 기능: 터치 스와이프(Framer Motion `drag`, `dragElastic=0.2`, `dragSnapToOrigin=true`, threshold 50px), 좌/우 버튼, 도트 인디케이터, 키보드 ←/→, `aria-roledescription="carousel"`, autoplay OFF, loop ON, 전환 300ms ease-out, `prefers-reduced-motion: reduce` 시 애니메이션 0ms, `role="status" aria-live="polite"`로 "Slide i of n" 공지 |
| `app/[locale]/sections/Facilities.tsx` | items 구조 변경 반영(JSON만 갱신해도 OK). 아이콘 매핑 업데이트 (Self check-in 제거) |
| `app/[locale]/sections/Location.tsx` | 맵 iframe 상단/하단에 "Google Maps" · "Naver Map" 텍스트 링크 2개를 `lucide-react`의 `ExternalLink` 아이콘과 함께 배치. 네이버 PNG 제공 시 `<Image src="/images/naver-map.png">`를 텍스트 앞에 삽입하는 형태로 교체 가능 (v1은 텍스트만) |
| `components/Nav.tsx` | 앵커 리스트 순서가 `#rooms → #facilities → #long-stay → #location`이 되도록 확인/수정 |

### 5.4 네이버맵 링크 UI

v1 결정: **텍스트 라벨 "Naver Map" + `lucide-react` `ExternalLink` 아이콘** 조합.

- 이유: 네이버맵 PNG 브랜드 아이콘만 있으면 외국인 게스트가 의미를 파악하기 어려움(영문 라벨 병기 필수)
- 레이아웃 예시:
  ```tsx
  <a href={NAVER_MAP_URL} target="_blank" rel="noopener noreferrer"
     className="inline-flex items-center gap-1.5 text-sm hover:text-ink">
    <ExternalLink size={14} /> Naver Map
  </a>
  ```
- 아이콘 PNG 수급 시: `public/images/naver-map.png` 배치 후 `ExternalLink`를 `<Image src="/images/naver-map.png" width={16} height={16} />`로 교체. 라벨은 유지.

### 5.5 스크롤 동작

- `globals.css`에 `html { scroll-behavior: smooth; }` 적용 (전역) 또는 CTA 클릭 시에만 `scrollIntoView({behavior:'smooth', block:'start'})`로 제한.
- Nav 고정 높이만큼 `scroll-margin-top` 섹션에 적용해 헤더에 가리지 않게.

### 5.6 Hero / About 분리 구조 (v1.2)

```tsx
// app/[locale]/sections/Hero.tsx  (신규, 'use client' 불필요 — 서버 컴포넌트)
<section id="hero" className="relative min-h-[92vh] flex items-end scroll-mt-[72px]">
  {/* next/image fill로 /images/optimized/hero.avif + gradient overlay */}
  <Image src="/images/optimized/hero.avif" fill priority alt="" className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/60" />
  {/* 텍스트 + CTA → href="#long-stay" */}
</section>

// app/[locale]/sections/About.tsx  (슬림화)
<section id="about" className="relative min-h-screen scroll-mt-[72px]">
  <Image src="/images/optimized/about.avif" fill alt="" className="object-cover" />
  <div className="absolute inset-0 bg-black/50" />
  {/* 플로팅 타이틀/본문/points. CTA 없음 */}
</section>
```

- `SECTION_IDS`는 기존 그대로 유지 (`about, rooms, facilities, long-stay, location, guest-notes, book` 7개). `hero`는 Nav에 포함하지 않음 — 스크롤 최상단에 자연 노출.
- Nav "About" 클릭 시 `#about`(풀블리드 about.avif 블록)으로 스크롤 — 기존 UX와 동일.
- 모바일: 두 섹션 모두 `min-h-screen` 유지, `bg-fixed` 사용 금지 (iOS Safari 점프 버그 회피).

### 5.7 아키텍처

```
┌──────────────────── Next.js 16 (App Router, RSC) ────────────────────┐
│                                                                       │
│  app/[locale]/page.tsx  ──────────────── 섹션 합성                    │
│    ├── <Hero>           ──── #hero + main.avif + CTA→#long-stay      │
│    ├── <About>          ──── #about 풀블리드 + about.avif, CTA 없음 │
│    ├── <Rooms>          ──── JSON items → <RoomCarousel> (client)    │
│    ├── <Facilities>     ──── JSON items                               │
│    ├── <LongStay>       ──── #long-stay target                        │
│    ├── <Location>       ──── GMap iframe + Naver link                 │
│    └── <Booking>                                                     │
│                                                                       │
│  content/{en,ja,zh,ko}.json  ──── next-intl translations             │
│  public/images/*              ──── 정적 로컬 이미지                    │
└───────────────────────────────────────────────────────────────────────┘
```

## 6. Implementation Phases

### Phase 0: 이미지 전처리 (신설, FR-029)
- [ ] `scripts/optimize-images.mjs` 생성 (sharp 사용, 없으면 `--dev` 설치)
- [ ] 입력: `public/images/{main,about,double (1..7),twin,twin (2..6)}.jpg`
- [ ] 출력: `public/images/optimized/{hero,about,double-1..7,twin-1..6}.avif`
- [ ] 제약: Hero/About 1600px ≤ 300KB, Room 이미지 1400px ≤ 200KB (quality 70~75 조정)
- [ ] 실행 로그로 실제 파일 크기 검증
**Deliverable**: 14장 AVIF, 총합 < 5MB, 원본 JPG는 그대로 보존

### Phase 1: 콘텐츠 데이터 갱신 (최우선)
- [ ] `content/en.json` 구조/카피 업데이트 (FR-003, 006~012, 017~020, 025)
- [ ] `content/ja.json` 동일 키 구조로 번역
- [ ] `content/zh.json` 동일 키 구조로 번역
- [ ] `content/ko.json` 동일 키 구조로 번역
- [ ] 키 동기화 검증 스크립트(간단) 혹은 수동 diff
**Deliverable**: 모든 언어에서 빌드 성공, key fallback 없음

### Phase 2: 섹션 순서 + 앵커
- [ ] `app/[locale]/page.tsx` 섹션 순서 스왑 (FR-001)
- [ ] `components/Nav.tsx` 메뉴 순서 정합성 (FR-026)
- [ ] `globals.css`에 smooth scroll + scroll-margin-top
**Deliverable**: 네비/스크롤 동작 정상

### Phase 3: Hero / About 리디자인
- [ ] About.tsx Hero 배경을 Unsplash → `/images/main.jpg` 교체 (Next Image + priority) (FR-002, 027)
- [ ] Hero 타이틀 "A cozy base for your days in Seoul" + 서브타이틀 유지 (FR-003)
- [ ] Hero CTA `href="#long-stay"` + smooth scroll + target/rel 제거 (FR-004)
- [ ] About 하단 본문 블록을 풀블리드 섹션으로 리플로우 + `/images/about.jpg` 배경 + 오버레이 + 플로팅 텍스트, CTA 없음 (FR-005~008)
**Deliverable**: 비주얼 QA 통과 (대비/가독성/모바일)

### Phase 4: Rooms 캐러셀
- [ ] `components/RoomCarousel.tsx` 신규 (스와이프 + 버튼 + 도트 + 키보드) (FR-013, 028)
- [ ] `Rooms.tsx`의 `IMAGES` 상수 제거, items.images 바인딩 (FR-009, 014, 015)
- [ ] 카드 + 상세 모달에 캐러셀 적용
- [ ] Beds 필드 렌더 추가 (FR-011, 012)
- [ ] Next Image 최적화 (FR-027)
**Deliverable**: 2객실, 각 슬라이드 동작 확인 (모바일 스와이프 + PC 버튼 + 키보드)

### Phase 5: Facilities & Location
- [ ] Facilities items 구조/순서/아이콘 매핑 갱신 (FR-016~021a)
- [ ] Location에 "Google Maps" · "Naver Map" 텍스트 링크 + `ExternalLink` 아이콘 추가 (FR-022~024)
**Deliverable**: 최종 QA 리스트 통과

### Phase 6: QA & 배포
- [ ] `npm run typecheck` + `npm run lint` 통과
- [ ] `npm run build` 성공
- [ ] Nav 앵커 smoke test (FR-032): SECTION_IDS 7개 모두 `getElementById()` 매칭
- [ ] Lighthouse (Perf ≥ 85, Access ≥ 95, SEO ≥ 95)
- [ ] 4개 locale 수동 페이지 확인
- [ ] 모바일 Safari / Chrome / 데스크톱 Chrome/Safari 크로스 브라우징
- [ ] 외부 링크 target/rel 검증
- [ ] Vercel preview → production
**Deliverable**: 운영자 승인 + main 머지

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 운영자 피드백 반영률 | 100% (P0 FR 전원) | 체크리스트 레뷰 |
| LCP (Hero main.jpg) | < 2.5s (모바일 3G Fast) | Lighthouse / Vercel Analytics |
| Long Stay CTA → 섹션 스크롤 성공률 | 100% | 수동 QA + Chrome DevTools |
| 4개 언어 카피 누락 | 0건 | 빌드 로그 / 수동 diff |
| 객실 슬라이드 인터랙션 실패율 | 0% | QA (모바일/PC 각각 10회 테스트) |
| 2차 피드백 접수 전 결함 건수 | < 3건 | 운영자 리뷰 |

## 8. Open Questions — Resolved

> 운영자 1차 답변 수신 (2026-04-19). 아래는 결정사항.

1. ~~네이버지도 아이콘 PNG~~ → **텍스트 "Naver Map" + `ExternalLink` 아이콘으로 선 구현.** PNG 수급 시 교체 (FR-023, FR-023a)
2. ~~Hero 서브타이틀~~ → **유지** (FR-003)
3. ~~About 플로팅 CTA 배치~~ → **별도 블록(Hero)에만. About 영역에는 CTA 없음** (FR-005)
4. ~~Double Room bed~~ → **"1 Double Bed (1,300×2,000 mm)"** (FR-011)
5. ~~Twin Room bed~~ → **"2 Single Beds (900×2,000 mm each)"** (FR-012)
6. ~~Facilities 순서~~ → **Lounge → Washing & Drying → Water Dispenser → Microwave → Free Luggage → Comfort Essentials** (FR-021a)
7. ~~Room 이미지 캡션~~ → **생략. a11y `alt`만 사용** (FR-028)

### 남은 확인 사항 (구현 중 해결)

- 객실 카드 차별화는 "침대 구성" 외 뚜렷한 차별점이 없음 → v1은 이미지/스펙 차이로만 구분. 후속 피드백으로 visual hierarchy 개선 여지 열어둠.

## 9. Risks & Mitigations

| 리스크 | 영향 | 대응 |
|--------|------|------|
| 실사 이미지 용량 과다 → LCP 저하 | Perf 미달 | `next/image` + AVIF/WebP 자동 변환, `sizes` 명시 |
| `double (1).jpg`처럼 공백/괄호 포함 파일명 → URL 인코딩 이슈 | 이미지 404 | JSON에 URL-encoded 경로(`/images/double%20(1).jpg`) 사용 or 파일명 kebab-case로 리네임 |
| Twin 이미지 경로에 `twin (1).jpg`가 없고 `twin.jpg`임 | 매핑 혼선 | JSON에 정확히 나열, 순서 고정 |
| 캐러셀 자체 구현 시 접근성 결함 | a11y 점수 저하 | `aria-roledescription`, live region, 키보드 조작 필수 |
| 스크롤 앵커가 Nav 높이에 가려짐 | UX 불량 | 각 섹션에 `scroll-margin-top` 적용 |
| 번역 누락 | i18n 깨짐 | PR 전 4개 JSON diff 리뷰, 가능하면 스키마 validator |

---

**다음 단계**: 이 PRD(v1.1)를 `prd-reviewer` 에이전트로 1차 검증 후 `/implement 1차피드백`으로 진행.
