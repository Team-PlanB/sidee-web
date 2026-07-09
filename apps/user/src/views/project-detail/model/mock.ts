import { mockProjects, type Project } from "@/entities/project";

/**
 * 프로젝트 상세 화면 view-model (더미).
 * 백엔드 연동 시 `entities/project` 의 `ProjectDetail`(서버 DTO) → 이 형태로 매핑해 교체한다.
 * 지금은 UI 퍼블리싱용 목업이다.
 */

/** 모집 항목 한 줄 — 대분류(role) + 인원 + 세부 포지션 태그들 */
export interface RecruitmentVM {
  /** 예: "기획자" */
  role: string;
  /** 모집 인원 */
  count: number;
  /** 세부 포지션 라벨 (태그로 표시) */
  subPositions: string[];
}

/** 참고 링크 */
export interface ReferenceLinkVM {
  label: string;
  url: string;
}

/** 기술 스택 뱃지 (색상 원) */
export interface TechVM {
  name: string;
  color: string;
}

/** 우측 메타 카드의 라벨/값 */
export interface ProjectMetaVM {
  field: string;
  platforms: string;
  workMode: string;
  duration: string;
  recruitTypes: string;
  applyMethod: string;
}

/** 작성자 프로필 카드 */
export interface AuthorProfileVM {
  nickname: string;
  grade: string;
  bio: string;
  skills: string[];
  avatarUrl?: string;
}

export interface ProjectDetailVM {
  id: string;
  title: string;
  author: { nickname: string; avatarUrl?: string };
  viewCount: number;
  likeCount: number;
  liked: boolean;
  /** 마감 표기 (예: "마감 61일 남음") */
  deadline: string;
  /** 본문 (지금은 평문 더미) */
  description: string;
  recruitments: RecruitmentVM[];
  referenceLinks: ReferenceLinkVM[];
  meta: ProjectMetaVM;
  techStack: TechVM[];
  /** 지원(오픈채팅/폼) 링크 */
  applyLink: string;
  authorProfile: AuthorProfileVM;
  /** 함께 추천하는 프로젝트 (기존 카드 위젯 재사용) */
  related: Project[];
}

/** 퍼블리싱용 목업 — 백엔드 연동 시 교체. */
export const mockProjectDetail: ProjectDetailVM = {
  id: "1",
  title: "프로젝트 이름(프로젝트 제목)",
  author: { nickname: "사용자닉네임" },
  viewCount: 866,
  likeCount: 44,
  liked: false,
  deadline: "마감 61일 남음",
  description:
    "함께 사이드 프로젝트를 진행할 팀원을 모집합니다. 서비스 기획부터 디자인, 개발까지 " +
    "전 과정을 함께 만들어갈 분들을 찾고 있어요. 주 1회 온라인 미팅과 자유로운 비동기 " +
    "협업으로 진행되며, 실제 출시를 목표로 합니다. 관심 있으신 분은 오픈 채팅으로 편하게 " +
    "연락 주세요!",
  recruitments: [
    { role: "기획자", count: 1, subPositions: ["서비스 기획", "UX/UI 기획"] },
    { role: "디자이너", count: 1, subPositions: ["UI/UX 디자인"] },
    {
      role: "프론트엔드 개발",
      count: 2,
      subPositions: ["웹 프론트엔드", "크로스 플랫폼"],
    },
    { role: "백엔드 개발", count: 1, subPositions: ["웹 서버"] },
  ],
  referenceLinks: [
    { label: "www.sidee.co.kr", url: "https://www.sidee.co.kr" },
    { label: "github.com/sidee", url: "https://github.com/sidee" },
  ],
  meta: {
    field: "엔터테인먼트",
    platforms: "모바일 앱",
    workMode: "온/오프라인",
    duration: "5개월",
    recruitTypes: "PM, 마케터, 기획자, 백엔드",
    applyMethod: "오픈 채팅 링크",
  },
  techStack: [
    { name: "Swift", color: "#F05138" },
    { name: "Python", color: "#3776AB" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "MongoDB", color: "#001E2A" },
    { name: "React", color: "#087EA4" },
  ],
  applyLink: "https://open.kakao.com/o/sidee",
  authorProfile: {
    nickname: "사용자닉네임",
    grade: "새싹 사이디",
    bio: "일과 삶의 균형을 중요하게 생각해요. 늘 배우고 성장하는 것이 가장 큰 목표예요. 누군가에게 영감을 주는 삶을 살고 싶어요.",
    skills: ["Figma", "Notion", "Swift", "Python"],
  },
  related: mockProjects,
};
