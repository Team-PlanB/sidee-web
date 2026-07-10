import type { Role } from "@/shared/model";

/** 역할 선택지 (디자인 순서: 기획 · 디자인 · 개발 · 마케팅) */
export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "PLANNER", label: "기획" },
  { value: "DESIGNER", label: "디자인" },
  { value: "DEVELOPER", label: "개발" },
  { value: "MARKETER", label: "마케팅" },
];

/** 기술 스택 최대 선택 개수 */
export const MAX_SKILLS = 10;

/**
 * 퍼블리싱용 더미 스킬 목록.
 * TODO(백엔드): 실제로는 `useSkillCatalog()`(GET /catalogs/skills) 로 교체.
 */
export const MOCK_SKILLS = [
  "Figma",
  "Notion",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Next.js",
  "Python",
  "Django",
  "Java",
  "Spring",
  "Kotlin",
  "Swift",
  "Flutter",
  "MySQL",
  "MongoDB",
  "AWS",
  "Docker",
];
