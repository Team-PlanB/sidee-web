/**
 * 백엔드 도메인 enum — Swagger(`https://staging-api.sidee.co.kr/docs`) 스키마와 1:1.
 *
 * 여러 슬라이스(entities/user, entities/catalog, features/onboarding)에서 공유하므로
 * 최하위 레이어인 shared 에 둔다. 사용자 표시용 라벨(한국어)은 하드코딩하지 않고
 * `GET /catalogs/*` 응답의 `label` 을 사용한다 (여기 값은 코드/타입 용도).
 */

/** 소셜 로그인 provider */
export const SOCIAL_PROVIDERS = ["kakao", "google"] as const;
export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

/** 직무 */
export const JOB_TITLES = [
  "FRONTEND",
  "BACKEND",
  "FULLSTACK",
  "PLANNER",
  "DESIGNER",
  "MARKETER",
  "OTHER",
] as const;
export type JobTitle = (typeof JOB_TITLES)[number];

/** 활동 지역 (시/도) */
export const LOCATIONS = [
  "SEOUL",
  "BUSAN",
  "DAEGU",
  "INCHEON",
  "GWANGJU",
  "DAEJEON",
  "ULSAN",
  "SEJONG",
  "GYEONGGI",
  "GANGWON",
  "CHUNGBUK",
  "CHUNGNAM",
  "JEONBUK",
  "JEONNAM",
  "GYEONGBUK",
  "GYEONGNAM",
  "JEJU",
] as const;
export type Location = (typeof LOCATIONS)[number];

/** 소속 */
export const AFFILIATIONS = ["COMPANY", "STUDENT", "FREELANCER"] as const;
export type Affiliation = (typeof AFFILIATIONS)[number];

/** 온보딩 의도 — 사이디에서 하고 싶은 경험 */
export const INTENTS = ["STARTER", "JOINER", "EXPLORER"] as const;
export type Intent = (typeof INTENTS)[number];

/** 희망 역할 */
export const ROLES = ["DEVELOPER", "DESIGNER", "PLANNER", "MARKETER"] as const;
export type Role = (typeof ROLES)[number];

/** 협업 성향 (프로필에 최대 3개) */
export const COLLABORATION_TRAITS = [
  "PLANNING",
  "EXECUTION",
  "DECISION_MAKING",
  "DETAIL",
  "TEAM_MOOD",
  "PROACTIVE",
] as const;
export type CollaborationTrait = (typeof COLLABORATION_TRAITS)[number];

/** 소통 스타일 (프로필에 최대 2개) */
export const COMMUNICATION_STYLES = [
  "SHARE_PROCESS",
  "ON_DEMAND",
  "QUIET_FOCUS",
  "DELIBERATE",
  "FEEDBACK",
] as const;
export type CommunicationStyle = (typeof COMMUNICATION_STYLES)[number];

/** 협업 모드 — availability 슬롯당 1개 (상호 배타) */
export const COLLABORATION_MODES = ["ONLINE", "OFFLINE", "HYBRID"] as const;
export type CollaborationMode = (typeof COLLABORATION_MODES)[number];

/** 스킬 카탈로그 카테고리 */
export const SKILL_CATEGORIES = [
  "frontend",
  "backend",
  "mobile",
  "other",
] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];
