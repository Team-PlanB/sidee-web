import { render, screen, within } from "@testing-library/react";
import type { RecommendedProject } from "@/entities/project";
import RecommendedProjects from "./RecommendedProjects";

const projects: RecommendedProject[] = [
  {
    id: "r1",
    name: "추천 프로젝트 1",
    field: "엔터테인먼트",
    dday: "마감 03일 남음",
    views: 100,
    likes: 10,
    featured: true,
  },
  {
    id: "r2",
    name: "추천 프로젝트 2",
    field: "여행",
    dday: "마감 07일 남음",
    views: 50,
    likes: 5,
  },
];

describe("RecommendedProjects", () => {
  it("맞춤 추천 제목(사용자명 포함)을 렌더한다", () => {
    render(<RecommendedProjects userName="홍길동" projects={projects} />);
    expect(
      screen.getByRole("heading", { name: /홍길동님 맞춤 추천/ }),
    ).toBeInTheDocument();
  });

  it("전체보기 버튼과 이전/다음 화살표를 렌더한다", () => {
    render(<RecommendedProjects projects={projects} />);
    expect(
      screen.getByRole("button", { name: "전체보기" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "이전 페이지" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음 페이지" })).toBeInTheDocument();
  });

  it("추천 카드를 데이터 수만큼 렌더한다", () => {
    render(<RecommendedProjects projects={projects} />);
    const list = screen.getByRole("list", { name: "추천 프로젝트 목록" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("추천 프로젝트 1")).toBeInTheDocument();
    expect(screen.getByText("추천 프로젝트 2")).toBeInTheDocument();
  });

  it("전체보기 클릭 시 onViewAll 호출", () => {
    const onViewAll = jest.fn();
    render(<RecommendedProjects projects={projects} onViewAll={onViewAll} />);
    screen.getByRole("button", { name: "전체보기" }).click();
    expect(onViewAll).toHaveBeenCalledTimes(1);
  });
});
