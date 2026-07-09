import type {
  ApplicationMethod,
  DurationOption,
  ProjectField,
  ProjectPlatform,
  ProjectPosition,
  ProjectSubPosition,
  WorkMode,
} from "@/shared/model";

/** 작성 요청의 기술 스택 항목 — `CreateProjectTechStackDto` */
export interface CreateProjectTechStack {
  /** 기술 스택 이름 (max 100자) */
  skillName: string;
}

/** 작성 요청의 모집 항목 — `CreateProjectRecruitmentDto` */
export interface CreateProjectRecruitment {
  position: ProjectPosition;
  subPosition: ProjectSubPosition;
  /** 인원수 (1~9) */
  count: number;
}

/** 작성 요청의 참고 링크 — `CreateProjectReferenceLinkDto` */
export interface CreateProjectReferenceLink {
  /** 링크 URL (max 500자) */
  url: string;
}

/** 작성/임시저장 상태 (등록 시 CLOSED 는 불가) */
export type CreateProjectStatus = "DRAFT" | "PUBLISHED";

/**
 * 프로젝트 작성 요청 — `CreateProjectRequestDto` (`POST /projects`).
 * `status: DRAFT` 는 임시저장, `PUBLISHED` 는 등록.
 */
export interface CreateProjectRequest {
  /** 제목 (1~100자) */
  title: string;
  field: ProjectField;
  /** 출시 플랫폼 (최소 1개) */
  platforms: ProjectPlatform[];
  workMode: WorkMode;
  durationOption: DurationOption;
  /** 모집 마감일 (YYYY-MM-DD) */
  recruitmentDeadline: string;
  /** 본문 HTML rich text (서버가 sanitize 후 저장) */
  description: string;
  applicationMethod: ApplicationMethod;
  /** 지원 링크 (max 500자, URI) */
  applicationLink: string;
  status: CreateProjectStatus;
  /** 기술 스택 (최대 5개) */
  techStacks: CreateProjectTechStack[];
  /** 모집 항목 (최소 1개) */
  recruitments: CreateProjectRecruitment[];
  /** 참고 링크 (최대 3개) */
  referenceLinks: CreateProjectReferenceLink[];
}

/**
 * 프로젝트 수정 요청 — `UpdateProjectRequestDto` (`PATCH /projects/{id}`).
 * 모든 필드 optional(부분 수정). status 는 여기서 바꾸지 않는다(마감은 close API).
 */
export type UpdateProjectRequest = Partial<
  Omit<CreateProjectRequest, "status">
>;

/** 리스트 필터 상태 (모집중 / 마감). 프로젝트 status enum 과 다른 값이다. */
export type ProjectListStatus = "open" | "closed";

/** `GET /projects` 쿼리 파라미터 */
export interface ProjectListParams {
  /** 검색어 (제목 등) */
  q?: string;
  /** 포지션 필터 */
  position?: ProjectPosition;
  /** 모집 상태 필터 */
  status?: ProjectListStatus;
  /** 내가 좋아요한 것만 */
  liked?: boolean;
  /** 페이지 (1-base) */
  page?: number;
  /** 페이지 크기 */
  size?: number;
}
