# sidee-web

Sidee 유저·관리자 서비스를 한 저장소에서 운영하는 **Next.js 16 모노레포**.

![CI](https://github.com/Team-PlanB/sidee-web/actions/workflows/ci.yml/badge.svg?branch=dev)

## 기술 스택

- **프레임워크**: Next.js 16 (App Router, Turbopack), React 19
- **언어**: TypeScript (strict)
- **모노레포**: pnpm workspaces + Turborepo
- **스타일**: Tailwind CSS v4 (`@theme` 기반 디자인 시스템)
- **상태 관리**: TanStack Query (서버) / Zustand (클라이언트) / react-hook-form + zod (폼)
- **테스트**: Jest + Testing Library (`next/jest`, jsdom)
- **린트**: ESLint 9 (flat config, `eslint-config-next`)
- **폰트**: [Wanted Sans](https://github.com/wanteddev/wanted-sans) (`next/font/local`, 가변 woff2)

## 모노레포 구조

```
sidee-web/
├── apps/
│   ├── user/                    # 유저 서비스
│   └── admin/                   # 관리자 서비스
├── packages/
│   ├── ui/                      # @sidee/ui          공유 컴포넌트 + 폰트 자산
│   ├── tailwind-config/         # @sidee/tailwind-config   디자인 토큰 (theme.css)
│   ├── eslint-config/           # @sidee/eslint-config     공유 ESLint 설정
│   └── tsconfig/                # @sidee/tsconfig          공유 tsconfig
├── pnpm-workspace.yaml
├── turbo.json
└── package.json                 # workspace root
```

각 앱 내부는 **Feature-Sliced Design**을 따릅니다:

```
apps/<app>/
├── app/                         # Next.js 라우팅 전용 (얇게)
└── src/
    ├── views/                   # FSD pages 레이어 (화면 단위 합성)
    ├── widgets/                 # cross-feature 합성 UI
    ├── features/                # 사용자 액션/기능
    ├── entities/                # 비즈니스 엔티티
    └── shared/                  # 앱 내부 공용 (api, config, lib, ui 프리미티브)
```

**의존 방향**: `app → views → widgets → features → entities → shared → packages/ui`
상위 레이어만 하위를 import. 같은 레이어 내 슬라이스 간 import 금지. 슬라이스 외부에서는 슬라이스 `index.ts`만 import.

## 시작하기

### 사전 요구사항

- **Node.js ≥ 22.13** (pnpm 11 요건)
- **pnpm 11.1.0** (`packageManager` 필드로 corepack이 자동 해석)

### 설치 & 개발

```bash
pnpm install            # 워크스페이스 전체 설치
pnpm dev                # 두 앱 동시 (user=3000, admin=3001)
pnpm dev:user           # user 앱만 (port 3000)
pnpm dev:admin          # admin 앱만 (port 3001)
```

## 명령어

| 명령 | 설명 |
| --- | --- |
| `pnpm dev` | 두 앱 동시 dev (user=**3000**, admin=**3001**) |
| `pnpm dev:user` | user 앱만 (port 3000) |
| `pnpm dev:admin` | admin 앱만 (port 3001) |
| `pnpm build` | 전체 production 빌드 |
| `pnpm build:user` / `pnpm build:admin` | 단일 앱 빌드 |
| `pnpm test` | 전체 Jest |
| `pnpm test:user` / `pnpm test:admin` | 단일 앱 테스트 |
| `pnpm lint` | 모든 앱/패키지 lint |
| `pnpm start` | 빌드 결과물로 서빙 |
| `pnpm test:e2e` | Playwright E2E (도입 시) |

더 세분화된 필터링은 `pnpm --filter <name> <command>` 직접 사용.

## 디자인 시스템

`packages/tailwind-config/theme.css`의 Tailwind v4 `@theme` 토큰. 두 앱이 `globals.css`에서 import하여 자동으로 유틸리티 클래스가 생성됩니다.

### 컬러

```
시멘틱 :  primary (Navy)   accent (Action)   surface (Tint)
스케일 :  blue-50  ~ blue-900     gray-50 ~ gray-900
Status :  success            warning           error
```

사용: `bg-primary`, `text-accent`, `bg-surface`, `border-gray-300`, `text-success` …

### 타이포그래피

| 스타일 | size / line-height / tracking |
| --- | --- |
| `text-display-1` | 40 / 52 / -0.0282em |
| `text-title-1/2/3` | 36 / 28 / 24 |
| `text-heading-1/2` | 22 / 20 |
| `text-headline` | 18 |
| `text-body-1/2` | 16 / 15 |
| `text-label-1/2` | 14 / 13 |
| `text-caption-1/2` | 12 / 11 |

**굵기는 합성**: `text-display-1 font-bold` = "Display1-Bold". `font-medium`(500) / `font-normal`(400).

## 상태 관리

| 상태 종류 | 도구 | 위치 |
| --- | --- | --- |
| 서버 상태 (캐시·재요청·뮤테이션) | **TanStack Query** | 클라이언트측. 초기 데이터는 Server Component fetch 우선 |
| 클라이언트 / 전역 UI 상태 | **Zustand** | 모달·탭·테마 등 |
| 폼 상태 + 검증 | **react-hook-form + zod** | |
| URL 상태 | **Next.js 라우터** | `useRouter`, `useSearchParams` |

- HTTP 에러 핸들러는 각 앱 `src/shared/api/`에 단일 구현. 슬라이스에서 ad-hoc `try/catch` + UI 호출 금지.
- Query key는 슬라이스의 `api/queryKeys.ts`에 정의 (중앙 집중 금지). 모양: `[domain, operation, ...params]`.

## 테스트

**TDD 원칙**: 새 기능·수정에는 테스트를 무조건 작성한다 (Red → Green → Refactor).

| 대상 | 위치 | 도구 |
| --- | --- | --- |
| 순수 함수 / 유틸 | `*.test.ts` (대상과 같은 폴더) | Jest |
| 커스텀 hook | `*.test.ts` | Jest + Testing Library `renderHook` |
| 컴포넌트 / 페이지 | `*.test.tsx` | Jest + Testing Library + `next/jest` (jsdom) |
| E2E | `e2e/*.spec.ts` | Playwright (예정) |

테스트 파일은 대상 코드와 **같은 슬라이스에 co-locate** (E2E 제외).

## 개발 규칙

### 브랜치

- 작업은 **`dev`** 브랜치에서. main으로의 PR로 머지.
- CI가 PR마다 lint + test + build 실행. **CI 실패 = 머지 불가**.

### 커밋

성격이 다르면 **별도 커밋으로 분리**(`Feat` + `Style` + `Test`를 한 커밋에 섞지 않음).

| Prefix | 의미 |
| --- | --- |
| `Feat:` | 새 기능 추가 |
| `Refactor:` | 기능 변경 없이 구조 개선 |
| `Style:` | UI / 스타일 / 포매팅 변경 |
| `Fix:` | 버그 수정 |
| `Test:` | 테스트 추가 / 수정 |
| `Chore:` | 빌드 / 설정 / 문서 외 잡일 |
| `Docs:` | 문서 변경 |

메시지는 한 줄로 간결하게, 현재 staged 된 파일만 설명.

예시 (매칭 스크롤 구현 — 3개 커밋으로):
```
Feat: add matching scroll sync logic
Style: add matching scroll UI
Test: add matching scroll widget test
```

### 코딩 스타일

- TypeScript strict, React 19
- 컴포넌트는 default export, 그 외는 named export
  - Next.js 라우트 파일(`page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `route.ts` 등)은 규약상 **default export**
- 파일명: 컴포넌트는 PascalCase, 그 외 ts 파일은 camelCase, 라우트 폴더는 kebab-case
- path alias: 앱 내부 `@/*` → `./src/*`. 슬라이스 외부 import는 슬라이스 root까지만. 앱 간/공유는 workspace 패키지명(`@sidee/ui` 등)
- 환경변수는 각 앱 `src/shared/config/env.ts`의 zod 스키마로 검증 후 사용. 클라이언트 노출은 `NEXT_PUBLIC_` 접두사

## CI

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) — PR과 main/dev 푸시마다 `lint → test → build` 실행.

## 라이선스

폰트: [Wanted Sans](https://github.com/wanteddev/wanted-sans)는 OFL-1.1. 라이선스 사본은 [`packages/ui/fonts/OFL.txt`](packages/ui/fonts/OFL.txt) 참조.
