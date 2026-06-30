import type { SocialProvider } from "@/shared/model";

/**
 * 🔧 DEV ONLY — `DevLoginRequestDto` (`POST /auth/dev-login`).
 * Swagger Authorize 워크플로우용. 임의 user 로 로그인한다.
 */
export interface DevLoginRequest {
  provider: SocialProvider;
  /** 소셜 식별자 (테스트용 임의 문자열). 같은 값이면 기존 user 재사용 */
  socialId: string;
  email?: string;
}
