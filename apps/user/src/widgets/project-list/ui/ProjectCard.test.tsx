import { render, screen } from "@testing-library/react";
import type { Project } from "@/entities/project";
import ProjectCard from "./ProjectCard";

const project: Project = {
  id: "1",
  title: "프로젝트 이름 프로젝트 이름 길어요",
  positions: ["기획", "디자인"],
  techStack: [
    { name: "Swift", color: "#F05138" },
    { name: "Python", color: "#3776AB" },
  ],
  postedAt: "2026.06.30 (금)",
  postedAgo: "1시간 전",
  deadline: "2026.08.30 (금)",
  dday: "마감 61일 남음",
  author: { nickname: "사용자닉네임" },
  viewCount: 866,
  likeCount: 44,
};

describe("ProjectCard", () => {
  it("마감 태그 · 제목 · 작성자 · 조회수 · 좋아요를 렌더한다", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText("마감 61일 남음")).toBeInTheDocument();
    expect(screen.getByText("프로젝트 이름 프로젝트 이름 길어요")).toBeInTheDocument();
    expect(screen.getByText("사용자닉네임")).toBeInTheDocument();
    expect(screen.getByText("866")).toBeInTheDocument();
    expect(screen.getByText("44")).toBeInTheDocument();
  });

  it("모집 포지션 태그와 기술 스택 원을 렌더한다", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText("기획")).toBeInTheDocument();
    expect(screen.getByText("디자인")).toBeInTheDocument();
    expect(screen.getByLabelText("Swift")).toHaveStyle({
      backgroundColor: "#F05138",
    });
  });

  it("white 배경 + gray-200 보더 카드다", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("article")).toHaveClass("bg-white", "border-gray-200");
  });

  it("관심 버튼 클릭 시 onToggleLike(id) 호출", () => {
    const onToggleLike = jest.fn();
    render(<ProjectCard project={project} onToggleLike={onToggleLike} />);
    screen.getByRole("button", { name: /관심/ }).click();
    expect(onToggleLike).toHaveBeenCalledWith("1");
  });
});
