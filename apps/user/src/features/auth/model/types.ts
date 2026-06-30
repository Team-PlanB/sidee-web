import type { User } from "@/entities/user";

/** `POST /auth/refresh` / `POST /auth/dev-login` 응답 — `RefreshResponseDto` */
export interface RefreshResponse {
  /** JWT access token. `Authorization: Bearer` 에 사용. 15분 만료 */
  accessToken: string;
  user: User;
}
