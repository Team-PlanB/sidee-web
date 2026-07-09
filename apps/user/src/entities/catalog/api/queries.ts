"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
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
import {
  getAffiliationCatalog,
  getApplicationMethodCatalog,
  getAvailabilityPresetCatalog,
  getCollaborationModeCatalog,
  getCollaborationTraitCatalog,
  getCommunicationStyleCatalog,
  getDurationOptionCatalog,
  getIntentCatalog,
  getJobTitleCatalog,
  getLocationCatalog,
  getProjectFieldCatalog,
  getProjectPlatformCatalog,
  getProjectPositionCatalog,
  getRoleCatalog,
  getSkillCatalog,
  getWorkModeCatalog,
} from "./catalogApi";
import { catalogKeys, type CatalogName } from "./queryKeys";

// 카탈로그는 사실상 정적 — 자주 변하지 않으므로 길게 캐시한다.
const CATALOG_STALE_TIME = 60 * 60 * 1000; // 1h

function useCatalog<T>(
  name: CatalogName,
  queryFn: (signal?: AbortSignal) => Promise<T>,
): UseQueryResult<T> {
  return useQuery({
    queryKey: catalogKeys.list(name),
    queryFn: ({ signal }) => queryFn(signal),
    staleTime: CATALOG_STALE_TIME,
  });
}

export const useSkillCatalog = (): UseQueryResult<SkillCatalogItem[]> =>
  useCatalog("skills", getSkillCatalog);

export const useRoleCatalog = (): UseQueryResult<RoleCatalogItem[]> =>
  useCatalog("roles", getRoleCatalog);

export const useIntentCatalog = (): UseQueryResult<IntentCatalogItem[]> =>
  useCatalog("intents", getIntentCatalog);

export const useJobTitleCatalog = (): UseQueryResult<JobTitleCatalogItem[]> =>
  useCatalog("job-titles", getJobTitleCatalog);

export const useLocationCatalog = (): UseQueryResult<LocationCatalogItem[]> =>
  useCatalog("locations", getLocationCatalog);

export const useAffiliationCatalog = (): UseQueryResult<
  AffiliationCatalogItem[]
> => useCatalog("affiliations", getAffiliationCatalog);

export const useCollaborationTraitCatalog = (): UseQueryResult<
  CollaborationTraitCatalogItem[]
> => useCatalog("collaboration-traits", getCollaborationTraitCatalog);

export const useCommunicationStyleCatalog = (): UseQueryResult<
  CommunicationStyleCatalogItem[]
> => useCatalog("communication-styles", getCommunicationStyleCatalog);

export const useCollaborationModeCatalog = (): UseQueryResult<
  CollaborationModeCatalogItem[]
> => useCatalog("collaboration-modes", getCollaborationModeCatalog);

export const useAvailabilityPresetCatalog = (): UseQueryResult<
  AvailabilityPresetCatalogItem[]
> => useCatalog("availability-presets", getAvailabilityPresetCatalog);

export const useApplicationMethodCatalog = (): UseQueryResult<
  ApplicationMethodCatalogItem[]
> => useCatalog("application-methods", getApplicationMethodCatalog);

export const useDurationOptionCatalog = (): UseQueryResult<
  DurationOptionCatalogItem[]
> => useCatalog("duration-options", getDurationOptionCatalog);

export const useProjectFieldCatalog = (): UseQueryResult<
  ProjectFieldCatalogItem[]
> => useCatalog("project-fields", getProjectFieldCatalog);

export const useProjectPlatformCatalog = (): UseQueryResult<
  ProjectPlatformCatalogItem[]
> => useCatalog("project-platforms", getProjectPlatformCatalog);

export const useProjectPositionCatalog = (): UseQueryResult<
  ProjectPositionCatalogItem[]
> => useCatalog("project-positions", getProjectPositionCatalog);

export const useWorkModeCatalog = (): UseQueryResult<WorkModeCatalogItem[]> =>
  useCatalog("work-modes", getWorkModeCatalog);
