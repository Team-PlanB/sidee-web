/**
 * catalog 슬라이스 query key. 카탈로그는 거의 정적이므로 staleTime 을 길게 쓰기 좋다.
 */
export type CatalogName =
  | "skills"
  | "roles"
  | "intents"
  | "job-titles"
  | "locations"
  | "affiliations"
  | "collaboration-traits"
  | "communication-styles"
  | "collaboration-modes";

export const catalogKeys = {
  all: ["catalog"] as const,
  list: (name: CatalogName) => [...catalogKeys.all, name] as const,
};
