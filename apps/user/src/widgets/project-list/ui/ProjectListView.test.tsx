import { fireEvent, render, screen, within } from "@testing-library/react";
import type { Project } from "@/entities/project";
import ProjectListView from "./ProjectListView";

const projects: Project[] = [
  {
    id: "1",
    title: "첫 번째 프로젝트",
    positions: ["기획"],
    techStack: [{ name: "Swift", color: "#F05138" }],
    postedAt: "2026.06.30 (금)",
    postedAgo: "1시간 전",
    deadline: "2026.08.30 (금)",
    author: { nickname: "닉네임1" },
  },
  {
    id: "2",
    title: "두 번째 프로젝트",
    positions: ["디자인"],
    techStack: [{ name: "Python", color: "#3776AB" }],
    postedAt: "2026.06.29 (목)",
    postedAgo: "1일 전",
    deadline: "2026.07.31 (금)",
    author: { nickname: "닉네임2" },
  },
];

describe("ProjectListView", () => {
  it("'전체 프로젝트' 제목을 렌더한다", () => {
    render(<ProjectListView projects={projects} />);
    expect(
      screen.getByRole("heading", { name: "전체 프로젝트" }),
    ).toBeInTheDocument();
  });

  it("뷰 토글(SegmentedControl)이 있고 기본은 리스트뷰다", () => {
    render(<ProjectListView projects={projects} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "리스트로 보기" }),
    ).toHaveAttribute("aria-checked", "true");
  });

  it("테이블 헤더 컬럼을 렌더한다", () => {
    render(<ProjectListView projects={projects} />);
    expect(screen.getByText("프로젝트 제목")).toBeInTheDocument();
    expect(screen.getByText("모집 포지션")).toBeInTheDocument();
    expect(screen.getByText("게시일")).toBeInTheDocument();
    expect(screen.getByText("마감일")).toBeInTheDocument();
  });

  it("프로젝트 행을 데이터 수만큼 렌더한다", () => {
    render(<ProjectListView projects={projects} />);
    const list = screen.getByRole("list", { name: "프로젝트 목록" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("첫 번째 프로젝트")).toBeInTheDocument();
    expect(screen.getByText("두 번째 프로젝트")).toBeInTheDocument();
  });

  it("검색 입력을 렌더한다", () => {
    render(<ProjectListView projects={projects} />);
    expect(
      screen.getByPlaceholderText("검색어를 입력해주세요"),
    ).toBeInTheDocument();
  });

  it("카드로 보기 전환 시 카드 그리드와 페이지네이션을 렌더한다", () => {
    render(<ProjectListView projects={projects} />);
    fireEvent.click(screen.getByRole("radio", { name: "카드로 보기" }));

    const list = screen.getByRole("list", { name: "프로젝트 목록" });
    expect(within(list).getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByRole("navigation", { name: "페이지네이션" }),
    ).toBeInTheDocument();
    // 리스트 테이블 헤더는 사라진다
    expect(screen.queryByText("모집 포지션")).not.toBeInTheDocument();
  });
});
