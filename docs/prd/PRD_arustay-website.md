# ARU STAY Official Website PRD

> **Version**: 1.0
> **Created**: 2026-04-15
> **Status**: Draft
> **Source**: 요청사항.md (고객사 제공)

## 1. Overview

### 1.1 Problem Statement
ARU STAY는 현재 Booking.com, Agoda 등 OTA를 통해서만 예약을 받고 있어 수수료 부담이 크다. 특히 **장기 숙박(10박 이상) 고객**의 경우 OTA를 거치지 않고 직접 문의·예약을 유도하면 수수료 없는 전환이 가능하지만, 이를 위한 브랜드 공식 채널이 부재하다.

### 1.2 Goals
- ARU STAY의 브랜드 이미지와 분위기를 전달하는 공식 홈페이지 구축
- 장기 숙박 고객을 OTA가 아닌 직접 문의로 유도
- 문의 접수 → 내부 확인 → 개별 결제 링크 발송 방식의 예약 전환 플로우 구축
- 외국인 관광객 중심의 다국어(EN/JA/ZH/KO) 지원

### 1.3 Non-Goals (Out of Scope)
- 실시간 객실 재고 연동 (OTA API/PMS 연동 없음)
- 사이트 내 실시간 예약 확정 시스템
- 회원가입 / 로그인 시스템
- 사이트 내 직접 결제 모듈 (1차 범위 제외, 베타 이후 재검토)
- 스파/피트니스/레스토랑/웨딩 등 대형 호텔형 메뉴
- 복잡한 백오피스/CMS 시스템

### 1.4 Scope
| 포함 | 제외 |
|------|------|
| 싱글 페이지 스크롤형 웹사이트 | 실시간 예약 엔진 |
| Sticky navigation, active highlight | 객실 재고 실시간 연동 |
| 7개 섹션 (About/Rooms/Long Stay/Facilities/Location/Guest Notes/Booking) | 회원 시스템 |
| Google Form 연동 (장기 숙박 문의) | 사이트 내 결제 |
| Google Maps 임베드 | 관리자 백오피스 |
| 다국어 4개 (EN/JA/ZH/KO) | 결제 모듈 |
| OTA 아웃바운드 링크 | 실시간 채팅 |
| 반응형 모바일 최적화 | - |
| 이미지 갤러리 / 슬라이더 | - |

## 2. User Stories

### 2.1 Primary User
**외국인 장기 숙박 여행객**
> As a 서울 장기 체류를 고려 중인 외국인 여행객, I want to ARU STAY 공식 사이트에서 숙소 분위기·편의시설·위치를 확인하고 장기 숙박 문의를 남길 수 있기를 원한다, so that OTA 수수료 없이 더 좋은 조건으로 예약할 수 있다.

### 2.2 Secondary Users
- **단기 숙박 고객**: OTA에서 본 뒤 공식 사이트로 신뢰도를 확인하고 OTA 예약으로 복귀
- **한국인 고객**: 인스타/구글맵을 통해 유입, 숙소 정보 확인
- **관리자(운영자)**: 개발자 도움 없이 텍스트/이미지를 일부 수정

### 2.3 Acceptance Criteria (Gherkin)

```
Scenario: 장기 숙박 문의 전환
  Given 방문자가 홈페이지에 접속함
  When Long Stay 섹션의 "Request a Long Stay" CTA를 클릭함
  Then Google Form이 새 탭에서 열리고 필수 항목(Name/Check-in/Check-out 등)이 표시됨

Scenario: 섹션 간 스크롤 네비게이션
  Given 방문자가 상단 sticky nav의 "Location" 메뉴를 클릭함
  When 클릭이 발생함
  Then 페이지가 Location 섹션으로 smooth scroll 되고 해당 메뉴가 active 상태로 표시됨

Scenario: 모바일 floating CTA
  Given 모바일 사용자가 페이지를 스크롤하고 있음
  When 스크롤이 About 섹션을 지남
  Then 우측 하단에 "Long Stay Inquiry" floating 버튼이 노출됨

Scenario: 언어 전환
  Given 방문자가 우측 상단 언어 선택기에서 "日本語"를 선택함
  When 선택이 완료됨
  Then 모든 섹션의 텍스트가 일본어로 전환되고 URL에 locale(/ja)이 반영됨

Scenario: 단기 숙박 OTA 이동
  Given 방문자가 Booking/Contact 섹션에 도달함
  When "Book on Booking.com" 링크를 클릭함
  Then 해당 OTA 페이지가 새 탭에서 열림
```

## 3. Functional Requirements

| ID | Requirement | Priority | Dependencies |
|----|------------|----------|--------------|
| FR-001 | 싱글 페이지 스크롤형 구조 (7개 섹션) | P0 | - |
| FR-002 | Sticky navigation + scroll spy(active highlight) + smooth scroll | P0 | FR-001 |
| FR-003 | About 섹션 (브랜드 소개, 대표 이미지/영상) | P0 | FR-001 |
| FR-004 | Rooms 섹션 (객실 타입별 사진, 수용 인원, 설명, 플로팅 오버레이) | P0 | FR-001 |
| FR-005 | Long Stay 섹션 + Google Form 링크 CTA ("Request a Long Stay") | P0 | FR-001 |
| FR-006 | Facilities 섹션 (Lounge/Washer/Water Purifier/Microwave/Luggage/Self Check-in) | P0 | FR-001 |
| FR-007 | Location 섹션 + Google Maps 임베드 + 주요 지역 접근성 안내 | P0 | FR-001 |
| FR-008 | Booking/Contact 섹션 (Google Form, 이메일, Instagram, OTA 링크) | P0 | FR-001 |
| FR-009 | 반응형 모바일 최적화 (햄버거 메뉴) | P0 | FR-002 |
| FR-010 | 다국어 지원 (EN/JA/ZH/KO) - next-intl 기반 | P0 | FR-001 |
| FR-011 | Guest Notes/Reviews 섹션 (OTA 후기 발췌 슬라이더) | P1 | FR-001 |
| FR-012 | Floating "Long Stay Inquiry" CTA (모바일 우측 하단) | P1 | FR-009 |
| FR-013 | Fade-in / section transition 애니메이션 (과하지 않게) | P1 | FR-001 |
| FR-014 | 이미지 최적화 (next/image, lazy loading, WebP) | P1 | FR-003, FR-004 |
| FR-015 | SEO 메타 태그 / Open Graph / 구조화 데이터(LodgingBusiness) | P1 | FR-001 |
| FR-016 | 콘텐츠(텍스트/이미지) 파일 기반 수정 구조 (JSON/MDX) | P1 | FR-010 |
| FR-017 | "Stay Like ARU" 외부 맵 링크 | P2 | FR-007 |
| FR-018 | 간단한 방문/클릭 분석 (GA4 또는 Plausible) | P2 | - |
| FR-019 | 결제 모듈 (베타 이후 재검토) | P3 | - |

## 4. Non-Functional Requirements

### 4.0 Scale Grade
**Startup (소규모 서비스)** 선택됨.
- 예상 DAU: 수백~수천 (브랜드/마케팅 채널 유입)
- 피크 동시접속: < 100
- 주 트래픽 패턴: 관광 시즌(봄/가을) 집중

### 4.1 Performance SLA
| 지표 | 목표값 |
|------|--------|
| LCP (Largest Contentful Paint) | < 2.5s (모바일 4G) |
| FID / INP | < 200ms |
| CLS | < 0.1 |
| Lighthouse Performance | ≥ 90 |
| Response Time (정적 페이지, p95) | < 300ms |

### 4.2 Availability SLA
| 항목 | 목표 |
|------|------|
| Uptime | 99% (Vercel 호스팅 SLA에 준함) |
| 허용 다운타임(월) | 7.3시간 |

### 4.3 Data Requirements
| 항목 | 값 |
|------|-----|
| 이미지/영상 에셋 | < 500MB (초기) |
| 콘텐츠 데이터 | < 5MB (JSON/MDX) |
| 보존 기간 | 무기한 (브랜드 사이트) |

### 4.4 Recovery
| 항목 | 값 |
|------|----|
| RTO | 4시간 (Vercel 롤백) |
| RPO | 0 (Git 기반 콘텐츠 버전 관리) |

### 4.5 Security
- HTTPS 강제 (Vercel 기본 제공)
- 인증: 없음 (공개 브랜드 사이트)
- Google Form 외부 처리 → 개인정보 직접 수집/저장 없음
- CSP(Content Security Policy) 헤더 설정
- 이미지 외부 도메인 허용 목록 관리 (next.config.js)

### 4.6 Accessibility & i18n
- WCAG 2.1 AA 준수 (색 대비, 키보드 네비게이션, alt 텍스트)
- 언어: EN(default), JA, ZH(간체), KO
- URL 구조: `/` (EN) · `/ja` · `/zh` · `/ko`
- `hreflang` 태그 필수

### 4.7 SEO
- 메타: title/description, Open Graph, Twitter Card
- 구조화 데이터: `LodgingBusiness` schema.org
- sitemap.xml, robots.txt
- 언어별 hreflang

## 5. Technical Design

### 5.1 Tech Stack
| 영역 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| i18n | next-intl |
| Animation | Framer Motion (간단한 fade-in만) |
| Image | next/image (WebP, lazy) |
| Map | Google Maps Embed API (iframe, 무료) |
| Form | 외부 Google Form (iframe 또는 외부 링크) |
| Deploy | Vercel |
| Analytics | GA4 또는 Plausible (P2) |

### 5.2 외부 연동 (No custom API)

본 사이트는 백엔드 API를 자체 구현하지 않는다. 외부 서비스로 처리:

| 기능 | 외부 서비스 | 연동 방식 |
|------|-------------|----------|
| 장기 숙박 문의 폼 | Google Forms | CTA 버튼 → 새 탭 링크 (`target="_blank"`) |
| 지도 | Google Maps | iframe embed |
| OTA 예약 (단기) | Booking.com / Agoda | 외부 링크 |
| 이메일 문의 | `mailto:` | 브라우저 기본 메일 클라이언트 |
| Instagram | Instagram 프로필 | 외부 링크 |

**Google Form 필드 (참고)**:
- Name, Nationality, Check-in date, Check-out date, Number of guests, Preferred room type, Email, WhatsApp/phone, Arrival time, Special requests

### 5.3 프로젝트 구조 (제안)

```
arustay/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # 싱글 페이지
│   │   └── sections/
│   │       ├── About.tsx
│   │       ├── Rooms.tsx
│   │       ├── LongStay.tsx
│   │       ├── Facilities.tsx
│   │       ├── Location.tsx
│   │       ├── GuestNotes.tsx
│   │       └── Booking.tsx
│   └── layout.tsx
├── components/
│   ├── Nav.tsx                    # sticky + scroll spy
│   ├── FloatingCTA.tsx
│   ├── LanguageSwitcher.tsx
│   └── ImageSlider.tsx
├── content/
│   ├── en.json
│   ├── ja.json
│   ├── zh.json
│   └── ko.json
├── public/
│   └── images/
└── next.config.js
```

### 5.4 콘텐츠 관리 전략

개발자 도움 없이 수정 가능하도록:
- 텍스트: `content/{locale}.json` 파일 편집
- 이미지: `public/images/` 교체 (파일명 유지)
- Git 기반 배포 → 변경 시 Vercel 자동 재빌드

향후 CMS 전환 고려 (Sanity / Contentful): Phase 3에서 재평가.

### 5.5 Navigation Structure

| 메뉴 (EN) | 섹션 ID | 우선순위 |
|-----------|---------|---------|
| About | `#about` | P0 |
| Rooms | `#rooms` | P0 |
| Long Stay | `#long-stay` | P0 |
| Facilities | `#facilities` | P0 |
| Location | `#location` | P0 |
| Guest Notes | `#guest-notes` | P1 |
| Book | `#book` | P0 |

> 요청사항의 "Stay Like ARU"는 Location 섹션 내 서브 링크로 통합 (별도 메뉴 X).

## 6. Implementation Phases

### Phase 1: MVP (1차 오픈)
- [ ] Next.js + Tailwind + next-intl 프로젝트 초기 셋업
- [ ] 전역 레이아웃 + Sticky Nav + Scroll spy
- [ ] About / Rooms / Long Stay / Facilities / Location 섹션 구현
- [ ] Google Form 연결 (Long Stay CTA)
- [ ] Google Maps 임베드
- [ ] 모바일 반응형 + 햄버거 메뉴
- [ ] 다국어 4개(EN/JA/ZH/KO) 기본 번역
- [ ] Vercel 배포

**Deliverable**: 장기 숙박 문의 전환이 가능한 공식 사이트 1차 오픈

### Phase 2: Enhancement
- [ ] Guest Notes 섹션 + OTA 후기 슬라이더
- [ ] Booking/Contact 섹션 (OTA 링크, Instagram, 이메일)
- [ ] Floating "Long Stay Inquiry" 모바일 CTA
- [ ] Fade-in / section transition 애니메이션
- [ ] SEO 메타 / Open Graph / LodgingBusiness 스키마
- [ ] sitemap.xml, robots.txt, hreflang
- [ ] GA4 / Plausible 연동

**Deliverable**: 브랜드 신뢰 및 SEO 완성

### Phase 3: Iteration (운영 후)
- [ ] 결제 모듈 도입 여부 재검토 (베타 데이터 기반)
- [ ] Headless CMS 전환 평가 (콘텐츠 수정 빈도에 따라)
- [ ] A/B 테스트 (Long Stay CTA 문구/위치)

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| 장기 숙박 Google Form 제출 수 | 월 20건+ | Google Form 응답 수 |
| Long Stay CTA 클릭률 | 방문자 대비 8%+ | GA4 이벤트 |
| 평균 세션 시간 | 90초+ | GA4 |
| 모바일 Lighthouse Performance | ≥ 90 | Lighthouse CI |
| Bounce Rate | < 55% | GA4 |
| OTA 수수료 절감 (간접) | 분기 10% 직접 예약 비중 | 내부 예약 집계 |

## 8. Design Direction

**무드 키워드**: soft, warm, thoughtful, calm, comfortable, well-organized
**피하기**: 과한 애니메이션, 스타트업 랜딩 느낌, 게스트하우스 느낌, 무거운 호텔 브랜드 느낌
**콘텐츠 비중**: 사진 중심, 짧고 명확한 텍스트

## 9. Open Questions / Assumptions

- [ ] Google Form URL 및 필드 최종 확정 필요 (고객사 제공)
- [ ] 객실 타입 수 및 공식 영문 명칭 확정 필요
- [ ] OTA 링크 (Booking/Agoda 계정 URL) 수집 필요
- [ ] Instagram 공식 핸들 확정 필요
- [ ] 왕십리 지점 정확한 주소 및 대표 이미지 에셋 수급 필요
- [ ] 중국어는 간체/번체 중 어느 것? (1차 가정: 간체)
- [ ] 결제 모듈 베타 결정 기준 (전환율? 문의 건수?) — 추후 정의
