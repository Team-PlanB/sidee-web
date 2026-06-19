/**
 * 인증 브리지 — shared 는 features 를 import 할 수 없으므로(FSD 의존 방향),
 * features/auth 가 이 setter 들로 토큰 공급자와 refresh 핸들러를 주입한다.
 * httpClient 는 여기 등록된 함수만 호출한다.
 */

let accessTokenProvider: () => string | null = () => null;
let refreshHandler: (() => Promise<string | null>) | null = null;
let unauthorizedHandler: (() => void) | null = null;

/** 현재 access token 을 반환하는 함수 등록 (features/auth 의 store getter) */
export function setAccessTokenProvider(provider: () => string | null): void {
  accessTokenProvider = provider;
}

/**
 * 401 발생 시 새 access token 을 받아오는 함수 등록.
 * 성공하면 새 토큰, 실패하면 null 반환. (`POST /auth/refresh` 호출 래퍼)
 */
export function setRefreshHandler(handler: () => Promise<string | null>): void {
  refreshHandler = handler;
}

/** refresh 까지 실패해 세션이 끊겼을 때 호출 (로그아웃 처리/로그인 리다이렉트) */
export function setUnauthorizedHandler(handler: () => void): void {
  unauthorizedHandler = handler;
}

export function getAccessToken(): string | null {
  return accessTokenProvider();
}

export function getRefreshHandler(): (() => Promise<string | null>) | null {
  return refreshHandler;
}

export function notifyUnauthorized(): void {
  unauthorizedHandler?.();
}
