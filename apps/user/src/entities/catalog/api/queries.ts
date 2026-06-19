"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
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
import {
  getAffiliationCatalog,
  getCollaborationModeCatalog,
  getCollaborationTraitCatalog,
  getCommunicationStyleCatalog,
  getIntentCatalog,
  getJobTitleCatalog,
  getLocationCatalog,
  getRoleCatalog,
  getSkillCatalog,
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
