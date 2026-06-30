import type {
  CollaborationTrait,
  CommunicationStyle,
  Intent,
  Role,
  WeeklyAvailability,
} from "@/shared/model";

/** 온보딩 step 1 — `UpdateStep1RequestDto` (`PATCH /onboarding/step/1`) */
export interface UpdateStep1Request {
  /** 사이디에서 하고 싶은 경험 */
  intent: Intent;
  /** 닉네임 (2~15자) */
  nickname: string;
}

/** 온보딩 step 2 — `UpdateStep2RequestDto` (skip 가능) */
export interface UpdateStep2Request {
  /** 함께하고 싶은 역할 (복수 선택) */
  roles?: Role[];
  /** 보유 기술 스택 (catalog skill name 값) */
  skills?: string[];
}

/** 온보딩 step 3 — `UpdateStep3RequestDto` (skip 가능) */
export interface UpdateStep3Request {
  /** 협업 성향 (최대 3개) */
  collaborationTraits?: CollaborationTrait[];
  /** 소통 스타일 (최대 2개) */
  communicationStyles?: CommunicationStyle[];
  /**
   * 활동 가능한 주간 시간표 (요일 → 0–23 시 배열).
   * 온보딩 입력값은 ONLINE 모드로 저장된다.
   */
  availability?: WeeklyAvailability;
}

/** `GET /onboarding/nickname/availability` 응답 */
export interface NicknameAvailabilityResponse {
  /** 사용 가능 여부 */
  available: boolean;
}
