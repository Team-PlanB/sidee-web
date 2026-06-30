import { httpClient } from "@/shared/api";
import type { Me } from "../model/types";
import type {
  ProfileImageUploadUrlRequest,
  ProfileImageUploadUrlResponse,
  UpdateProfileRequest,
} from "./dto";

/** GET /users/me — 내 계정 + 프로필 조회 */
export function getMe(signal?: AbortSignal): Promise<Me> {
  return httpClient.get<Me>("/users/me", { signal });
}

/** PATCH /users/me/profile — 프로필 부분 수정. 409 = 닉네임 중복 */
export function updateProfile(body: UpdateProfileRequest): Promise<Me> {
  return httpClient.patch<Me>("/users/me/profile", body);
}

/** POST /users/me/profile-image/upload-url — presigned PUT URL 발급 */
export function createProfileImageUploadUrl(
  body: ProfileImageUploadUrlRequest,
): Promise<ProfileImageUploadUrlResponse> {
  return httpClient.post<ProfileImageUploadUrlResponse>(
    "/users/me/profile-image/upload-url",
    body,
  );
}

/**
 * presigned URL 로 R2 에 이미지를 직접 PUT 업로드한다.
 * 발급 시 보낸 contentType/contentLength 와 정확히 일치해야 R2 가 수락한다.
 */
export async function uploadProfileImage(
  uploadUrl: string,
  file: File,
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!res.ok) {
    throw new Error(`프로필 이미지 업로드에 실패했습니다 (${res.status}).`);
  }
}
