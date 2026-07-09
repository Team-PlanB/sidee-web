import { fireEvent, render, screen } from "@testing-library/react";
import ProjectDetailView from "./ProjectDetailView";
import { mockProjectDetail } from "../model/mock";

describe("ProjectDetailView", () => {
  it("제목과 팀 모집 인원 섹션을 렌더한다", () => {
    render(<ProjectDetailView />);
    expect(
      screen.getByRole("heading", { level: 1, name: mockProjectDetail.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("팀 모집 인원")).toBeInTheDocument();
    expect(screen.getByText("기획자 1명")).toBeInTheDocument();
  });

  it("메타 정보(분야/진행 기간)를 렌더한다", () => {
    render(<ProjectDetailView />);
    expect(screen.getByText("엔터테인먼트")).toBeInTheDocument();
    expect(screen.getByText("5개월")).toBeInTheDocument();
  });

  it("지원하기 버튼이 지원 링크로 연결된다", () => {
    render(<ProjectDetailView />);
    const apply = screen.getByRole("link", { name: "지원하기" });
    expect(apply).toHaveAttribute("href", mockProjectDetail.applyLink);
    expect(apply).toHaveAttribute("target", "_blank");
  });

  it("작성자 프로필(자기소개/등급)을 렌더한다", () => {
    render(<ProjectDetailView />);
    expect(
      screen.getByText(mockProjectDetail.authorProfile.bio),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProjectDetail.authorProfile.grade),
    ).toBeInTheDocument();
  });

  it("함께 추천하는 프로젝트 섹션을 렌더한다", () => {
    render(<ProjectDetailView />);
    expect(screen.getByText("함께 추천하는 프로젝트")).toBeInTheDocument();
  });

  it("관심 버튼을 누르면 눌린 상태가 되고 좋아요 수가 증가한다", () => {
    render(<ProjectDetailView />);
    const likeButton = screen.getByTestId("project-like");
    expect(likeButton).toHaveTextContent(String(mockProjectDetail.likeCount));

    fireEvent.click(likeButton);

    expect(likeButton).toHaveAttribute("aria-pressed", "true");
    expect(likeButton).toHaveAttribute("aria-label", "관심 해제");
    expect(likeButton).toHaveTextContent(String(mockProjectDetail.likeCount + 1));
  });
});
