import type {
  Affiliation,
  CollaborationMode,
  CollaborationTrait,
  CommunicationStyle,
  Intent,
  JobTitle,
  Location,
  Role,
  SkillCategory,
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
