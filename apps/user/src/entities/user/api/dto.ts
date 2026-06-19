import type {
  Affiliation,
  JobTitle,
  Location,
} from "@/shared/model";

/**
 * 프로필 수정 요청 — `UpdateProfileRequestDto` (`PATCH /users/me/profile`).
 * 모든 필드 optional(부분 수정). nullable 필드에 `null` 을 보내면 초기화된다.
 */
export interface UpdateProfileRequest {
  /** 닉네임 (2~15자) */
  nickname?: string;
  /** 자기소개 (max 500자, null = 초기화) */
  bio?: string | null;
  /** 직무 (null = 초기화) */
  jobTitle?: JobTitle | null;
  /** 경력 (0~50년, null = 초기화) */
  experienceYears?: number | null;
  /** 활동지역 (null = 초기화) */
  location?: Location | null;
  /** 소속 (null = 초기화) */
  affiliation?: Affiliation | null;
  /** 프로필 이미지 public URL (null = placeholder 리셋) */
  profileImageUrl?: string | null;
}

/** 프로필 이미지 업로드 가능한 MIME type */
export type ProfileImageContentType =
  | "image/jpeg"
  | "image/png"
  | "image/webp";

/**
 * presigned 업로드 URL 발급 요청
 * — `ProfileImageUploadUrlRequestDto` (`POST /users/me/profile-image/upload-url`).
 */
export interface ProfileImageUploadUrlRequest {
  contentType: ProfileImageContentType;
  /** 파일 사이즈(bytes). presigned URL 에 동일 사이즈 강제. 최대 5,242,880 (5MB) */
  contentLength: number;
}

/** presigned 업로드 URL 응답 — `ProfileImageUploadUrlResponseDto` */
export interface ProfileImageUploadUrlResponse {
  /** R2 presigned PUT URL — 이 URL 로 이미지를 직접 PUT 업로드 */
  uploadUrl: string;
  /** 업로드 후 `profileImageUrl` 로 전달할 public URL */
  publicUrl: string;
  /** uploadUrl 만료까지 남은 초 */
  expiresInSeconds: number;
}

/** 프로필 이미지 최대 크기 (5MB) */
export const PROFILE_IMAGE_MAX_BYTES = 5_242_880;
