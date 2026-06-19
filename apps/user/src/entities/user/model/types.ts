import type {
  Affiliation,
  CollaborationTrait,
  CommunicationStyle,
  Intent,
  JobTitle,
  Location,
  ProfileAvailability,
  Role,
  SocialProvider,
} from "@/shared/model";

/**
 * 사용자 계정 — `UserResponseDto`.
 * 인증/계정 정보. 마이페이지 표시 데이터는 {@link UserProfile} 에 있다.
 */
export interface User {
  id: string;
  socialProvider: SocialProvider;
  /** 소셜 동의 시 받음, 거부하면 null */
  email: string | null;
  /** 온보딩 진행 단계 (0 = 시작 전, 3 = 완료) */
  onboardingStep: number;
  /** 온보딩 완료 시각 (미완료면 null) */
  onboardingCompletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * 사용자 프로필 — `UserProfileResponseDto`.
 * 마이페이지/매칭에 표시되는 데이터.
 */
export interface UserProfile {
  id: string;
  userId: string;
  nickname: string | null;
  profileImageUrl: string | null;
  bio: string | null;
  jobTitle: JobTitle;
  /** 경력 (년) */
  experienceYears: number | null;
  location: Location;
  affiliation: Affiliation;
  intent: Intent;
  roles: Role[];
  /** 기술 스택 (catalog skill name 값) */
  skills: string[];
  /** 협업 성향 (최대 3) */
  collaborationTraits: CollaborationTrait[];
  /** 소통 스타일 (최대 2) */
  communicationStyles: CommunicationStyle[];
  /** 협업 모드별 주간 활동 시간표 */
  availability: ProfileAvailability;
  createdAt: string;
  updatedAt: string;
}

/** 계정 + 프로필 묶음 — `MeResponseDto` (`GET /users/me`) */
export interface Me {
  user: User;
  profile: UserProfile;
}
