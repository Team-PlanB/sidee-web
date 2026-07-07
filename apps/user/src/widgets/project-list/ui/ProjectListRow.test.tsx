import { render, screen } from "@testing-library/react";
import type { Project } from "@/entities/project";
import ProjectListRow from "./ProjectListRow";

const project: Project = {
  id: "1",
  title: "프로젝트 이름은 길 수도 있어요",
  positions: ["기획", "디자인"],
  techStack: [
    { name: "Swift", color: "#F05138" },
    { name: "Python", color: "#3776AB" },
  ],
  postedAt: "2026.06.30 (금)",
  postedAgo: "1시간 전",
  deadline: "2026.08.30 (금)",
  author: { nickname: "사용자닉네임" },
  liked: false,
  viewCount: 128,
};

describe("ProjectListRow", () => {
  it("제목/게시일/상대시간/마감일을 렌더한다", () => {
    render(<ProjectListRow project={project} />);
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText("2026.06.30 (금)")).toBeInTheDocument();
    expect(screen.getByText("1시간 전")).toBeInTheDocument();
    expect(screen.getByText("2026.08.30 (금)")).toBeInTheDocument();
  });

  it("모집 포지션을 태그로 렌더한다", () => {
    render(<ProjectListRow project={project} />);
    expect(screen.getByText("기획")).toBeInTheDocument();
    expect(screen.getByText("디자인")).toBeInTheDocument();
  });

  it("기술 스택 원을 색상과 함께 렌더한다", () => {
    render(<ProjectListRow project={project} />);
    const swift = screen.getByLabelText("Swift");
    expect(swift).toHaveStyle({ backgroundColor: "#F05138" });
    expect(screen.getByLabelText("Python")).toBeInTheDocument();
  });

  it("작성자 닉네임과 조회수를 렌더한다", () => {
    render(<ProjectListRow project={project} />);
    expect(screen.getByText("사용자닉네임")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
  });

  it("liked=true 면 관심 버튼이 눌린 상태다", () => {
    render(<ProjectListRow project={{ ...project, liked: true }} />);
    expect(screen.getByRole("button", { name: /관심/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("관심 버튼 클릭 시 onToggleLike(id) 호출", () => {
    const onToggleLike = jest.fn();
    render(<ProjectListRow project={project} onToggleLike={onToggleLike} />);
    screen.getByRole("button", { name: /관심/ }).click();
    expect(onToggleLike).toHaveBeenCalledWith("1");
  });
});
