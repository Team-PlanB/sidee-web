/** 맞춤 추천 캐러셀 카드 데이터. */
export type RecommendedProject = {
  id: string;
  name: string;
  /** 프로젝트 분야 (예: 엔터테인먼트) */
  field: string;
  /** 마감 표기 (예: "마감 03일 남음") */
  dday: string;
  views: number;
  likes: number;
  liked?: boolean;
  /** 강조(파란) 카드 여부 */
  featured?: boolean;
};

/** 퍼블리싱용 목업 — 백엔드 연동 시 교체. */
export const mockRecommended: RecommendedProject[] = [
  {
    id: "r1",
    name: "AI 추천 서비스 팀원 모집",
    field: "엔터테인먼트",
    dday: "마감 03일 남음",
    views: 866,
    likes: 44,
    featured: true,
  },
  {
    id: "r2",
    name: "여행 플래너 앱 사이드 프로젝트",
    field: "여행 · 라이프스타일",
    dday: "마감 07일 남음",
    views: 512,
    likes: 31,
  },
  {
    id: "r3",
    name: "커머스 대시보드 리뉴얼",
    field: "이커머스",
    dday: "마감 12일 남음",
    views: 289,
    likes: 18,
  },
  {
    id: "r4",
    name: "헬스케어 데이터 시각화",
    field: "헬스케어",
    dday: "마감 05일 남음",
    views: 431,
    likes: 27,
  },
];
