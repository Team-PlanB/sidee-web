import type {
  Affiliation,
  ApplicationMethod,
  AvailabilityPreset,
  CollaborationMode,
  CollaborationTrait,
  CommunicationStyle,
  DurationOption,
  Intent,
  JobTitle,
  Location,
  ProjectField,
  ProjectPlatform,
  ProjectPosition,
  ProjectSubPosition,
  Role,
  SkillCategory,
  WorkMode,
} from "@/shared/model";

/**
 * 카탈로그 아이템 — `GET /catalogs/*` 응답.
 * 대부분 `{ code, label }` 형태(코드=DB값, label=한국어 표시). 스킬만 형태가 다르다.
 */

/** `GET /catalogs/skills` — `SkillCatalogItemResponseDto` */
export interface SkillCatalogItem {
  /** 스킬 이름 (DB 저장 값 = 프로필 skills 배열 값) */
  name: string;
  category: SkillCategory;
  /** 아이콘 URL (R2). null 이면 기본 아이콘 */
  iconUrl: string | null;
}

/** `code` + `label` 공통 카탈로그 아이템 */
export interface CodeLabelItem<TCode extends string> {
  code: TCode;
  label: string;
}

export type RoleCatalogItem = CodeLabelItem<Role>;
export type IntentCatalogItem = CodeLabelItem<Intent>;
export type JobTitleCatalogItem = CodeLabelItem<JobTitle>;
export type LocationCatalogItem = CodeLabelItem<Location>;
export type AffiliationCatalogItem = CodeLabelItem<Affiliation>;
export type CollaborationTraitCatalogItem = CodeLabelItem<CollaborationTrait>;
export type CommunicationStyleCatalogItem = CodeLabelItem<CommunicationStyle>;
export type CollaborationModeCatalogItem = CodeLabelItem<CollaborationMode>;

// ── 프로필 카탈로그 (추가) ────────────────────────────────
/** `GET /catalogs/availability-presets` — `AvailabilityPresetCatalogItemResponseDto` */
export type AvailabilityPresetCatalogItem = CodeLabelItem<AvailabilityPreset>;

// ── 프로젝트 카탈로그 (Catalogs:Project) ──────────────────
/** `GET /catalogs/application-methods` — `ApplicationMethodCatalogItemResponseDto` */
export type ApplicationMethodCatalogItem = CodeLabelItem<ApplicationMethod>;
/** `GET /catalogs/duration-options` — `DurationOptionCatalogItemResponseDto` */
export type DurationOptionCatalogItem = CodeLabelItem<DurationOption>;
/** `GET /catalogs/project-fields` — `ProjectFieldCatalogItemResponseDto` */
export type ProjectFieldCatalogItem = CodeLabelItem<ProjectField>;
/** `GET /catalogs/project-platforms` — `ProjectPlatformCatalogItemResponseDto` */
export type ProjectPlatformCatalogItem = CodeLabelItem<ProjectPlatform>;
/** `GET /catalogs/work-modes` — `WorkModeCatalogItemResponseDto` */
export type WorkModeCatalogItem = CodeLabelItem<WorkMode>;

/** 세부 포지션 카탈로그 아이템 — `ProjectSubPositionCatalogItemResponseDto` */
export type ProjectSubPositionCatalogItem = CodeLabelItem<ProjectSubPosition>;

/**
 * `GET /catalogs/project-positions` — `ProjectPositionCatalogItemResponseDto`.
 * 대분류(position) + 세부 포지션(subPositions) 중첩 구조.
 */
export interface ProjectPositionCatalogItem
  extends CodeLabelItem<ProjectPosition> {
  subPositions: ProjectSubPositionCatalogItem[];
}
