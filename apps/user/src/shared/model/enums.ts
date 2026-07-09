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

/** 활동 시간대 preset (`GET /catalogs/availability-presets`) */
export const AVAILABILITY_PRESETS = [
  "WEEKDAY_DAY",
  "WEEKDAY_NIGHT",
  "WEEKEND_DAY",
  "WEEKEND_NIGHT",
] as const;
export type AvailabilityPreset = (typeof AVAILABILITY_PRESETS)[number];

/** 프로젝트 분야 (14개) */
export const PROJECT_FIELDS = [
  "ECOMMERCE",
  "COMMUNITY",
  "EDUCATION_HR",
  "BEAUTY_FASHION",
  "DATING_MARRIAGE",
  "FINTECH",
  "TRAVEL",
  "O2O",
  "NEWS_INFO",
  "ENTERTAINMENT",
  "SHARING_SERVICE",
  "HEALTH",
  "HOME_INTERIOR",
  "MANUFACTURING_LOGISTICS",
] as const;
export type ProjectField = (typeof PROJECT_FIELDS)[number];

/** 출시 플랫폼 (6개) */
export const PROJECT_PLATFORMS = [
  "RESPONSIVE_WEB",
  "IOS",
  "ANDROID",
  "PC_PROGRAM",
  "INSTALLABLE_OR_SAAS",
  "UNDECIDED",
] as const;
export type ProjectPlatform = (typeof PROJECT_PLATFORMS)[number];

/** 진행 방식 (3개). 값은 협업 모드와 동일하나 프로젝트 도메인용으로 분리한다. */
export const WORK_MODES = ["ONLINE", "OFFLINE", "HYBRID"] as const;
export type WorkMode = (typeof WORK_MODES)[number];

/** 진행 기간 옵션 (7개) */
export const DURATION_OPTIONS = [
  "ONE_MONTH",
  "TWO_MONTHS",
  "THREE_MONTHS",
  "FOUR_MONTHS",
  "FIVE_MONTHS",
  "SIX_MONTHS_PLUS",
  "UNDECIDED",
] as const;
export type DurationOption = (typeof DURATION_OPTIONS)[number];

/** 지원 방법 (2개) */
export const APPLICATION_METHODS = ["OPEN_CHAT", "GOOGLE_FORM"] as const;
export type ApplicationMethod = (typeof APPLICATION_METHODS)[number];

/** 모집 포지션 대분류 (5개) */
export const PROJECT_POSITIONS = [
  "PLANNING",
  "DESIGN",
  "FRONTEND",
  "BACKEND",
  "ETC",
] as const;
export type ProjectPosition = (typeof PROJECT_POSITIONS)[number];

/** 모집 세부 포지션 (31개) */
export const PROJECT_SUB_POSITIONS = [
  "PLANNING_SERVICE",
  "PLANNING_UX_UI",
  "PLANNING_CONTENT",
  "PLANNING_PM",
  "PLANNING_PO",
  "PLANNING_PRODUCT",
  "PLANNING_ETC",
  "DESIGN_UI_UX",
  "DESIGN_WEB",
  "DESIGN_BX_BRAND",
  "DESIGN_3D",
  "DESIGN_GRAPHIC",
  "DESIGN_PRODUCT",
  "DESIGN_ETC",
  "FRONTEND_ANDROID",
  "FRONTEND_IOS",
  "FRONTEND_WEB",
  "FRONTEND_PUBLISHER",
  "FRONTEND_CROSS_PLATFORM",
  "FRONTEND_ETC",
  "BACKEND_WEB_SERVER",
  "BACKEND_DATA_DBA",
  "BACKEND_PROMPT_ENGINEER",
  "BACKEND_NETWORK_CLOUD",
  "BACKEND_ETC",
  "ETC_MARKETING_BRAND",
  "ETC_MARKETING_GROWTH",
  "ETC_MARKETING_CONTENT",
  "ETC_MARKETING_PERFORMANCE",
  "ETC_MARKETING_VIRAL",
  "ETC_MARKETING_ETC",
] as const;
export type ProjectSubPosition = (typeof PROJECT_SUB_POSITIONS)[number];

/** 프로젝트 상태 */
export const PROJECT_STATUSES = ["DRAFT", "PUBLISHED", "CLOSED"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
