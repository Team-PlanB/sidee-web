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
