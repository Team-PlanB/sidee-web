import { render, screen } from "@testing-library/react";
import type { RecommendedProject } from "@/entities/project";
import RecommendationCard from "./RecommendationCard";

const base: RecommendedProject = {
  id: "r1",
  name: "AI 추천 서비스 팀원 모집",
  field: "엔터테인먼트",
  dday: "마감 03일 남음",
  views: 866,
  likes: 44,
};

describe("RecommendationCard", () => {
  it("이름/분야/마감/조회수/좋아요를 렌더한다", () => {
    render(<RecommendationCard project={base} />);
    expect(screen.getByText("AI 추천 서비스 팀원 모집")).toBeInTheDocument();
    expect(screen.getByText("엔터테인먼트")).toBeInTheDocument();
    expect(screen.getByText(/마감 03일 남음/)).toBeInTheDocument();
    expect(screen.getByText("866")).toBeInTheDocument();
    expect(screen.getByText("44")).toBeInTheDocument();
  });

  it("featured 카드는 blue-600 배경", () => {
    render(<RecommendationCard project={{ ...base, featured: true }} />);
    expect(screen.getByRole("article")).toHaveClass("bg-blue-600");
  });

  it("일반 카드는 white 배경 + gray-200 보더", () => {
    render(<RecommendationCard project={base} />);
    const card = screen.getByRole("article");
    expect(card).toHaveClass("bg-white", "border-gray-200");
  });

  it("관심 버튼 클릭 시 onToggleLike(id) 호출", () => {
    const onToggleLike = jest.fn();
    render(<RecommendationCard project={base} onToggleLike={onToggleLike} />);
    screen.getByRole("button", { name: /관심/ }).click();
    expect(onToggleLike).toHaveBeenCalledWith("r1");
  });
});
