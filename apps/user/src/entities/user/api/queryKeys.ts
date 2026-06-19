/**
 * user 슬라이스 query key. 모양: `[domain, operation, ...params]`.
 * 중앙 집중 금지 — 슬라이스별로 둔다.
 */
export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
};
