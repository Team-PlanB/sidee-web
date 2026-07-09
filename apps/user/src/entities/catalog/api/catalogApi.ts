import { httpClient } from "@/shared/api";
import type {
  AffiliationCatalogItem,
  ApplicationMethodCatalogItem,
  AvailabilityPresetCatalogItem,
  CollaborationModeCatalogItem,
  CollaborationTraitCatalogItem,
  CommunicationStyleCatalogItem,
  DurationOptionCatalogItem,
  IntentCatalogItem,
  JobTitleCatalogItem,
  LocationCatalogItem,
  ProjectFieldCatalogItem,
  ProjectPlatformCatalogItem,
  ProjectPositionCatalogItem,
  RoleCatalogItem,
  SkillCatalogItem,
  WorkModeCatalogItem,
} from "../model/types";

/** GET /catalogs/skills — 기술 스택 카탈로그 */
export function getSkillCatalog(signal?: AbortSignal): Promise<SkillCatalogItem[]> {
  return httpClient.get<SkillCatalogItem[]>("/catalogs/skills", { signal });
}

/** GET /catalogs/roles — 직군 카탈로그 */
export function getRoleCatalog(signal?: AbortSignal): Promise<RoleCatalogItem[]> {
  return httpClient.get<RoleCatalogItem[]>("/catalogs/roles", { signal });
}

/** GET /catalogs/intents — 온보딩 의도 카탈로그 */
export function getIntentCatalog(signal?: AbortSignal): Promise<IntentCatalogItem[]> {
  return httpClient.get<IntentCatalogItem[]>("/catalogs/intents", { signal });
}

/** GET /catalogs/job-titles — 직무 카탈로그 */
export function getJobTitleCatalog(
  signal?: AbortSignal,
): Promise<JobTitleCatalogItem[]> {
  return httpClient.get<JobTitleCatalogItem[]>("/catalogs/job-titles", { signal });
}

/** GET /catalogs/locations — 지역 카탈로그 */
export function getLocationCatalog(
  signal?: AbortSignal,
): Promise<LocationCatalogItem[]> {
  return httpClient.get<LocationCatalogItem[]>("/catalogs/locations", { signal });
}

/** GET /catalogs/affiliations — 소속 카탈로그 */
export function getAffiliationCatalog(
  signal?: AbortSignal,
): Promise<AffiliationCatalogItem[]> {
  return httpClient.get<AffiliationCatalogItem[]>("/catalogs/affiliations", {
    signal,
  });
}

/** GET /catalogs/collaboration-traits — 협업 성향 카탈로그 */
export function getCollaborationTraitCatalog(
  signal?: AbortSignal,
): Promise<CollaborationTraitCatalogItem[]> {
  return httpClient.get<CollaborationTraitCatalogItem[]>(
    "/catalogs/collaboration-traits",
    { signal },
  );
}

/** GET /catalogs/communication-styles — 소통 스타일 카탈로그 */
export function getCommunicationStyleCatalog(
  signal?: AbortSignal,
): Promise<CommunicationStyleCatalogItem[]> {
  return httpClient.get<CommunicationStyleCatalogItem[]>(
    "/catalogs/communication-styles",
    { signal },
  );
}

/** GET /catalogs/collaboration-modes — 협업 모드 카탈로그 */
export function getCollaborationModeCatalog(
  signal?: AbortSignal,
): Promise<CollaborationModeCatalogItem[]> {
  return httpClient.get<CollaborationModeCatalogItem[]>(
    "/catalogs/collaboration-modes",
    { signal },
  );
}

/** GET /catalogs/availability-presets — 활동 시간대 preset 카탈로그 */
export function getAvailabilityPresetCatalog(
  signal?: AbortSignal,
): Promise<AvailabilityPresetCatalogItem[]> {
  return httpClient.get<AvailabilityPresetCatalogItem[]>(
    "/catalogs/availability-presets",
    { signal },
  );
}

/** GET /catalogs/application-methods — 지원 방법 카탈로그 */
export function getApplicationMethodCatalog(
  signal?: AbortSignal,
): Promise<ApplicationMethodCatalogItem[]> {
  return httpClient.get<ApplicationMethodCatalogItem[]>(
    "/catalogs/application-methods",
    { signal },
  );
}

/** GET /catalogs/duration-options — 진행 기간 카탈로그 */
export function getDurationOptionCatalog(
  signal?: AbortSignal,
): Promise<DurationOptionCatalogItem[]> {
  return httpClient.get<DurationOptionCatalogItem[]>(
    "/catalogs/duration-options",
    { signal },
  );
}

/** GET /catalogs/project-fields — 프로젝트 분야 카탈로그 */
export function getProjectFieldCatalog(
  signal?: AbortSignal,
): Promise<ProjectFieldCatalogItem[]> {
  return httpClient.get<ProjectFieldCatalogItem[]>("/catalogs/project-fields", {
    signal,
  });
}

/** GET /catalogs/project-platforms — 출시 플랫폼 카탈로그 */
export function getProjectPlatformCatalog(
  signal?: AbortSignal,
): Promise<ProjectPlatformCatalogItem[]> {
  return httpClient.get<ProjectPlatformCatalogItem[]>(
    "/catalogs/project-platforms",
    { signal },
  );
}

/** GET /catalogs/project-positions — 포지션 + 세부 포지션 카탈로그 */
export function getProjectPositionCatalog(
  signal?: AbortSignal,
): Promise<ProjectPositionCatalogItem[]> {
  return httpClient.get<ProjectPositionCatalogItem[]>(
    "/catalogs/project-positions",
    { signal },
  );
}

/** GET /catalogs/work-modes — 진행 방식 카탈로그 */
export function getWorkModeCatalog(
  signal?: AbortSignal,
): Promise<WorkModeCatalogItem[]> {
  return httpClient.get<WorkModeCatalogItem[]>("/catalogs/work-modes", {
    signal,
  });
}
