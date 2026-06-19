import { httpClient } from "@/shared/api";
import type {
  AffiliationCatalogItem,
  CollaborationModeCatalogItem,
  CollaborationTraitCatalogItem,
  CommunicationStyleCatalogItem,
  IntentCatalogItem,
  JobTitleCatalogItem,
  LocationCatalogItem,
  RoleCatalogItem,
  SkillCatalogItem,
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
