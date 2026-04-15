# Task Plan: arustay-website

> **Generated from**: docs/prd/PRD_arustay-website.md
> **Created**: 2026-04-15
> **Status**: pending

## Execution Config

| Option | Value | Description |
|--------|-------|-------------|
| `auto_commit` | true | 완료 시 자동 커밋 |
| `commit_per_phase` | true | Phase별 중간 커밋 (에셋 교체 용이) |
| `quality_gate` | true | /auto-commit 품질 검사 |

## Phases

### Phase 1: 환경 설정
- [x] Next.js 15 (App Router) + TypeScript 프로젝트 생성
- [x] Tailwind CSS 설치/설정
- [x] next-intl 설치 + locale 라우팅(`[locale]`) 구성
- [x] Framer Motion 설치
- [ ] ESLint/Prettier 설정
- [ ] Vercel 프로젝트 연동 (preview 배포)

### Phase 2: 레이아웃 & 네비게이션
- [x] Root layout + 폰트/글로벌 스타일
- [x] Sticky Navigation 컴포넌트
- [x] Scroll Spy (IntersectionObserver) + smooth scroll
- [x] 모바일 햄버거 메뉴
- [x] Language Switcher (EN/JA/ZH/KO)

### Phase 3: 핵심 섹션 (MVP)
- [x] About 섹션 (hero 이미지/영상, 한 줄 소개)
- [x] Rooms 섹션 (객실 카드 + 플로팅 오버레이)
- [x] Long Stay 섹션 + Google Form CTA
- [x] Facilities 섹션 (6개 항목 아이콘 + 설명)
- [x] Location 섹션 (Google Maps 임베드 + 주변 정보)

### Phase 4: 보조 섹션 & 강화
- [x] Guest Notes 섹션 (후기 슬라이더)
- [x] Booking/Contact 섹션 (OTA 링크, 이메일, IG)
- [x] Floating "Long Stay Inquiry" 모바일 CTA
- [x] Fade-in / section transition 애니메이션

### Phase 5: 다국어 콘텐츠
- [x] `content/en.json` 작성 (기준)
- [x] JA / ZH(간체) / KO 번역 적용
- [ ] hreflang 메타 태그

### Phase 6: SEO & 성능 최적화
- [ ] next/image 최적화 + WebP
- [ ] 메타태그 / Open Graph / Twitter Card
- [ ] LodgingBusiness 구조화 데이터
- [ ] sitemap.xml, robots.txt
- [ ] Lighthouse ≥ 90 달성 확인

### Phase 7: 테스트 & 배포
- [ ] 반응형 QA (모바일/태블릿/데스크톱)
- [ ] 크로스 브라우저 확인 (Chrome/Safari/FF)
- [ ] 접근성(WCAG 2.1 AA) 점검
- [ ] 프로덕션 배포

## Progress

| Metric | Value |
|--------|-------|
| Total Tasks | 0/28 |
| Current Phase | - |
| Status | pending |

## Execution Log

| Timestamp | Phase | Task | Status |
|-----------|-------|------|--------|
| - | - | - | - |

## Blocker / 자산 의존성

- Google Form URL 확정 필요 (FR-005)
- 객실/라운지/시설 사진 에셋 수급 필요 (FR-003, FR-004, FR-006)
- OTA(Booking/Agoda) 공식 URL 수집 필요 (FR-008)
- 왕십리 지점 정확 주소 (Google Maps embed용)
- Instagram 공식 계정 URL
