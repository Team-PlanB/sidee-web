import { render, screen } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("message 텍스트를 렌더링한다", () => {
    render(<Tooltip message="안내 문구" />);
    expect(screen.getByText("안내 문구")).toBeInTheDocument();
  });

  it("role=tooltip 으로 접근 가능하다", () => {
    render(<Tooltip message="안내" />);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("버블 기본 스타일: gray-800 배경, radius 4px, padding 4px 8px", () => {
    render(<Tooltip message="안내" />);
    expect(screen.getByRole("tooltip")).toHaveClass(
      "bg-gray-800",
      "rounded-[4px]",
      "px-2",
      "py-1",
    );
  });

  it("제목은 Caption2/Medium + white 이다", () => {
    render(<Tooltip message="제목" />);
    expect(screen.getByText("제목")).toHaveClass(
      "text-caption-2",
      "font-medium",
      "text-white",
    );
  });

  describe("Description=False (설명 없음)", () => {
    it("가로 레이아웃이고 설명 노드가 없다", () => {
      render(<Tooltip message="제목" />);
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveClass("flex-row");
      expect(tooltip.children).toHaveLength(1);
    });
  });

  describe("Description=True (설명 있음)", () => {
    it("세로 레이아웃 + gap, 제목/설명 두 줄을 렌더링한다", () => {
      render(<Tooltip message="제목" description="설명 문구" />);
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveClass("flex-col", "gap-1");
      expect(tooltip.children).toHaveLength(2);
      expect(screen.getByText("제목")).toBeInTheDocument();
      expect(screen.getByText("설명 문구")).toBeInTheDocument();
    });

    it("설명은 Caption2/Medium + gray-300 이다", () => {
      render(<Tooltip message="제목" description="설명 문구" />);
      expect(screen.getByText("설명 문구")).toHaveClass(
        "text-caption-2",
        "font-medium",
        "text-gray-300",
      );
    });
  });

  it("ss10 폰트 피처를 적용한다", () => {
    render(<Tooltip message="안내" />);
    expect(screen.getByRole("tooltip")).toHaveStyle({
      fontFeatureSettings: "'ss10'",
    });
  });

  it("className을 병합한다", () => {
    render(<Tooltip message="안내" className="absolute" />);
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveClass("absolute", "bg-gray-800");
  });
});
