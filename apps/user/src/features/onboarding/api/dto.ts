import type {
  AvailabilityPreset,
  CollaborationTrait,
  CommunicationStyle,
  Intent,
  Role,
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
   * 활동 가능한 시간대 preset (단일 선택, skip 가능).
   * 서버가 저장 시 ONLINE 모드의 주간 시간표로 확장한다.
   */
  availability?: AvailabilityPreset;
}

/** `GET /onboarding/nickname/availability` 응답 */
export interface NicknameAvailabilityResponse {
  /** 사용 가능 여부 */
  available: boolean;
}
