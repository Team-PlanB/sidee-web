/**
 * TanStack Query 전역 에러 핸들러.
 * 모든 query/mutation 에러가 이 함수로 모인다. 슬라이스에서 개별 try/catch + UI 호출 금지.
 */
export function handleApiError(error: unknown): void {
  // TODO(401): 인증 만료 응답 시 세션 클리어 + 로그인 페이지 리다이렉트 연결
  // TODO(기획): 전역 사용자 알림 방식 미정 (토스트 vs 모달 vs 인라인). 결정 후 연결.
  if (process.env.NODE_ENV !== "production") {
    console.error("[api]", error);
  }
}
