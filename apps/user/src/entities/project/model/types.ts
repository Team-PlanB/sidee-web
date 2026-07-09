import type {
  ApplicationMethod,
  DurationOption,
  ProjectField,
  ProjectPlatform,
  ProjectPosition,
  ProjectStatus,
  ProjectSubPosition,
  WorkMode,
} from "@/shared/model";

/** 기술 스택 뱃지 (하단 색상 원). color 는 브랜드 컬러 hex. */
export type TechStackItem = {
  name: string;
  color: string;
};

export type ProjectAuthor = {
  nickname: string;
  /** 없으면 기본 아바타(AppLogo) 사용 */
  avatarUrl?: string;
};

/** 전체 프로젝트 리스트의 한 행 데이터. */
export type Project = {
  id: string;
  title: string;
  /** 모집 포지션 (기획/디자인/프론트 등) */
  positions: string[];
  techStack: TechStackItem[];
  /** 게시일 표기 (예: "2026.06.30 (금)") */
  postedAt: string;
  /** 상대 시간 (예: "1시간 전") */
  postedAgo: string;
  /** 마감일 표기 (예: "2026.08.30 (금)") */
  deadline: string;
  /** 마감 카운트다운 표기 (예: "마감 30일 남음"). 카드형 태그에 사용 */
  dday?: string;
  author: ProjectAuthor;
  /** 관심(하트) 여부 */
  liked?: boolean;
  /** 조회수 */
  viewCount?: number;
  /** 관심(좋아요) 수 */
  likeCount?: number;
};

// ─────────────────────────────────────────────────────────────
// 서버 응답 DTO (`GET/POST /projects`). 위 목업 view-model 과 별개다.
// 위젯이 아직 목업을 쓰므로 교체 전까지 공존한다.
// ─────────────────────────────────────────────────────────────

/** 기술 스택 (카드/상세 공통) — `ProjectTechStack*Dto` */
export interface ProjectTechStackItem {
  name: string;
  /** simple-icons slug. null 이면 기본 아이콘 */
  iconSlug: string | null;
}

/** 카드 작성자 요약 — `ProjectAuthorCardDto` */
export interface ProjectAuthorCard {
  id: string;
  nickname: string | null;
  avatarUrl: string | null;
}

/** 상세 작성자 — `ProjectAuthorDetailDto` */
export interface ProjectAuthorDetail extends ProjectAuthorCard {
  bio: string | null;
  skills: string[];
}

/** 카드에 표시되는 모집 포지션 — `ProjectPositionCardDto` */
export interface ProjectPositionCard {
  position: ProjectPosition;
  subPosition: ProjectSubPosition;
}

/** 상세 모집 항목 (인원 포함) — `ProjectRecruitmentDetailDto` */
export interface ProjectRecruitmentDetail extends ProjectPositionCard {
  count: number;
}

/** 상세 참고 링크 — `ProjectReferenceLinkDetailDto` */
export interface ProjectReferenceLinkDetail {
  id: string;
  url: string;
}

/** 리스트/추천/연관 카드 — `ProjectCardResponseDto` */
export interface ProjectCard {
  id: string;
  title: string;
  field: ProjectField;
  /** 모집 마감일 (YYYY-MM-DD) */
  deadline: string;
  viewCount: number;
  likeCount: number;
  likedByMe: boolean;
  positions: ProjectPositionCard[];
  techStack: ProjectTechStackItem[];
  author: ProjectAuthorCard;
  status: ProjectStatus;
}

/** 프로젝트 상세 — `ProjectDetailResponseDto` (`GET /projects/{id}`) */
export interface ProjectDetail {
  id: string;
  title: string;
  field: ProjectField;
  platforms: ProjectPlatform[];
  workMode: WorkMode;
  durationOption: DurationOption;
  /** 모집 마감일 (YYYY-MM-DD) */
  deadline: string;
  /** HTML (sanitized) */
  description: string;
  applicationMethod: ApplicationMethod;
  applicationLink: string;
  status: ProjectStatus;
  viewCount: number;
  likeCount: number;
  likedByMe: boolean;
  techStack: ProjectTechStackItem[];
  recruitments: ProjectRecruitmentDetail[];
  referenceLinks: ProjectReferenceLinkDetail[];
  author: ProjectAuthorDetail;
}

/** 페이징 프로젝트 리스트 — `ListProjectsResponseDto` (`GET /projects`) */
export interface ProjectListResult {
  items: ProjectCard[];
  total: number;
  page: number;
  size: number;
}

/** 좋아요 토글 응답 — `LikeResponseDto` */
export interface LikeResult {
  likeCount: number;
  likedByMe: boolean;
}
