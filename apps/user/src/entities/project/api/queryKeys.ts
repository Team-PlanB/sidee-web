import type { ProjectListParams } from "./dto";

/**
 * project 슬라이스 query key. 모양: `[domain, operation, ...params]`.
 * 리스트는 필터 파라미터까지 키에 포함해 필터별로 캐시를 분리한다.
 */
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (params?: ProjectListParams) =>
    [...projectKeys.lists(), params ?? {}] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  related: (id: string) => [...projectKeys.all, "related", id] as const,
  recommended: () => [...projectKeys.all, "recommended"] as const,
};
