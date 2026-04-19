# Task Plan: 1차피드백

> **Generated from**: `docs/prd/PRD_1차피드백.md`
> **Created**: 2026-04-19
> **Status**: pending

## Execution Config

| Option | Value | Description |
|--------|-------|-------------|
| `auto_commit` | true | 모든 Phase 완료 후 자동 커밋 |
| `commit_per_phase` | true | Phase별 중간 커밋 (콘텐츠/레이아웃/UI 분리) |
| `quality_gate` | true | `/auto-commit` 품질 검사 |
| `preview_deploy` | true | Vercel preview 후 운영자 리뷰 |

## Phases

### Phase 1: 콘텐츠 데이터 갱신 (FR-003, 006~012, 016~020, 025)
- [ ] `content/en.json`: hero/about/rooms/facilities/location 키 구조 업데이트
- [ ] Rooms items를 Double/Twin 2종으로 축소 + images 배열 + beds 필드 추가
- [ ] Facilities items 재구성 (Self check-in 제거, Water Dispenser/Washing & Drying/Free Luggage/Comfort Essentials 추가)
- [ ] Location에 `mapLinks.google`, `mapLinks.naver` 추가
- [ ] `content/ja.json` 번역 동기화
- [ ] `content/zh.json` 번역 동기화
- [ ] `content/ko.json` 번역 동기화
- [ ] 4개 JSON 키 구조 diff 검증

### Phase 2: 섹션 순서 & 네비게이션 (FR-001, 004, 026)
- [ ] `app/[locale]/page.tsx`에서 Rooms 다음에 Facilities, 그 다음 LongStay 순서로 import/render
- [ ] `components/Nav.tsx` 메뉴 링크 순서 동기화
- [ ] `app/globals.css`에 `html { scroll-behavior: smooth; }` + 섹션 `scroll-margin-top` 유틸
- [ ] About Hero CTA의 `href`를 `#longstay`로 변경하고 새 탭 속성 제거

### Phase 3: Hero / About 리디자인 (FR-002, 003, 005~008, 027)
- [ ] About.tsx Hero 배경: Unsplash → `/images/main.jpg` 교체 (next/image, priority)
- [ ] Hero 타이틀 변경, 서브타이틀 유지
- [ ] About 하단 본문 블록을 풀블리드 `/images/about.jpg` + 오버레이 + 플로팅 텍스트로 리플로우
- [ ] About 영역에는 CTA 버튼 넣지 않음 (Hero에만 존재)
- [ ] 다크 오버레이(opacity 0.45~0.6) + 흰색 타이포그래피로 대비 확보
- [ ] 모바일/데스크톱 비율 QA

### Phase 4: Rooms 캐러셀 (FR-009~015, 028)
- [ ] `components/RoomCarousel.tsx` 신규 (터치 스와이프 + PC 좌/우 버튼 + 도트 인디케이터 + ← → 키보드)
- [ ] `aria-roledescription="carousel"`, 슬라이드 변경 시 live region 알림
- [ ] `Rooms.tsx`의 `IMAGES` 상수 제거, JSON의 `items[i].images` 바인딩
- [ ] 카드와 상세 모달 모두 캐러셀 사용
- [ ] `beds` 필드 렌더 — Double: "1 Double Bed (1,300×2,000 mm)" / Twin: "2 Single Beds (900×2,000 mm each)"
- [ ] next/image로 교체, `sizes`, lazy, priority 설정
- [ ] 파일명 공백/괄호 URL-encoding 이슈 확인 (`%20`, `%28`, `%29`)

### Phase 5: Facilities & Location (FR-016~024)
- [ ] `Facilities.tsx` 아이콘 매핑 업데이트 (Self check-in 제거, 신규 4종 추가)
- [ ] Facilities 표시 순서 확정: Lounge → Washing & Drying → Water Dispenser → Microwave → Free Luggage → Comfort Essentials
- [ ] `Location.tsx`에 "Google Maps" · "Naver Map" 텍스트 링크 + `ExternalLink` 아이콘 배치 (v1은 텍스트만, PNG 수급 시 교체)
- [ ] 외부 링크에 `target="_blank" rel="noopener noreferrer"` 부여

### Phase 6: QA & 배포
- [ ] `npm run typecheck` + `npm run lint` 통과
- [ ] `npm run build` 성공
- [ ] Lighthouse (Perf ≥ 85, Access ≥ 95, SEO ≥ 95)
- [ ] 4개 locale (`/en`, `/ja`, `/zh`, `/ko`) 수동 확인
- [ ] 모바일 Safari / Chrome / 데스크톱 Chrome/Safari 크로스 체크
- [ ] 캐러셀 스와이프/버튼/키보드 각 10회 회귀 테스트
- [ ] Vercel preview 링크로 운영자 승인
- [ ] main 머지 + auto-commit

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

## Open Questions — Resolved (PRD §8 v1.1)

1. ✅ 네이버지도: 텍스트 "Naver Map" + `ExternalLink` 아이콘으로 선구현, PNG 수급 시 교체
2. ✅ Hero 서브타이틀 유지
3. ✅ About 영역 CTA 없음. CTA는 Hero에만
4. ✅ Double Room: 1 Double Bed (1,300×2,000 mm)
5. ✅ Twin Room: 2 Single Beds (900×2,000 mm each)
6. ✅ Facilities 순서: Lounge → Washing & Drying → Water Dispenser → Microwave → Free Luggage → Comfort
7. ✅ Room 캡션 생략 (a11y alt만)
