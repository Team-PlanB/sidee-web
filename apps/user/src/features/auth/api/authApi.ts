import { apiBaseUrl, httpClient } from "@/shared/api";
import type { SocialProvider } from "@/shared/model";
import type { RefreshResponse } from "../model/types";
import type { DevLoginRequest } from "./dto";

/**
 * POST /auth/refresh — refresh 쿠키로 새 access token 발급(토큰 회전).
 * skipAuthRefresh: 401 자동 재시도 루프에 다시 들어가지 않도록.
 */
export function refresh(): Promise<RefreshResponse> {
  return httpClient.post<RefreshResponse>("/auth/refresh", undefined, {
    skipAuthRefresh: true,
  });
}

/** POST /auth/logout — refresh 토큰 revoke + 쿠키 clear (204) */
export function logout(): Promise<void> {
  return httpClient.post<void>("/auth/logout", undefined, {
    skipAuthRefresh: true,
  });
}

/** DELETE /auth/account — 계정 탈퇴 (soft delete + 세션 정리, 204) */
export function deleteAccount(): Promise<void> {
  return httpClient.delete<void>("/auth/account");
}

/** 🔧 DEV ONLY — POST /auth/dev-login — 임의 user 로 로그인 */
export function devLogin(body: DevLoginRequest): Promise<RefreshResponse> {
  return httpClient.post<RefreshResponse>("/auth/dev-login", body, {
    skipAuthRefresh: true,
  });
}

/**
 * 소셜 OAuth 시작 절대 URL. 브라우저 redirect 전용
 * (`GET /auth/kakao` | `GET /auth/google` 은 서버가 302 로 응답).
 * 사용: `window.location.href = getOAuthStartUrl("kakao")`
 */
export function getOAuthStartUrl(provider: SocialProvider): string {
  return `${apiBaseUrl}/auth/${provider}`;
}
