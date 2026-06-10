import { render, screen } from "@testing-library/react";
import { Tag } from "./Tag";

describe("Tag", () => {
  it("children 텍스트를 렌더링한다", () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("버튼이 아닌 정적 요소(span)로 렌더링한다", () => {
    render(<Tag>React</Tag>);
    expect(screen.getByText("React").tagName).toBe("SPAN");
  });

  it("기본값은 solid / accent / size m 이다", () => {
    render(<Tag>태그</Tag>);
    const tag = screen.getByText("태그");
    expect(tag).toHaveClass("bg-blue-100", "text-blue-600", "rounded-full");
    expect(tag).toHaveClass("h-7", "px-2.5", "gap-0.5", "text-label-2");
  });

  it("텍스트는 Medium 굵기를 사용한다", () => {
    render(<Tag>태그</Tag>);
    expect(screen.getByText("태그")).toHaveClass("font-medium");
  });

  describe("size 레이아웃", () => {
    it("xs: 높이 20px, 좌우 패딩 8px, gap 2px, caption-2 타이포", () => {
      render(<Tag size="xs">태그</Tag>);
      expect(screen.getByText("태그")).toHaveClass(
        "h-5",
        "px-2",
        "gap-0.5",
        "text-caption-2",
      );
    });

    it("s: 높이 24px, 좌우 패딩 8px, gap 2px, caption-1 타이포", () => {
      render(<Tag size="s">태그</Tag>);
      expect(screen.getByText("태그")).toHaveClass(
        "h-6",
        "px-2",
        "gap-0.5",
        "text-caption-1",
      );
    });

    it("m: 높이 28px, 좌우 패딩 10px, gap 2px, label-2 타이포", () => {
      render(<Tag size="m">태그</Tag>);
      expect(screen.getByText("태그")).toHaveClass(
        "h-7",
        "px-2.5",
        "gap-0.5",
        "text-label-2",
      );
    });
  });

  describe("type × variant 컬러", () => {
    it("solid / accent: 배경 Blue100, 텍스트 Blue600", () => {
      render(
        <Tag type="solid" variant="accent">
          태그
        </Tag>,
      );
      expect(screen.getByText("태그")).toHaveClass(
        "bg-blue-100",
        "text-blue-600",
      );
    });

    it("solid / neutral: 배경 Gray200, 텍스트 Gray700", () => {
      render(
        <Tag type="solid" variant="neutral">
          태그
        </Tag>,
      );
      expect(screen.getByText("태그")).toHaveClass(
        "bg-gray-200",
        "text-gray-700",
      );
    });

    it("outlined / accent: 배경 white, 보더 Blue300, 텍스트 Blue600", () => {
      render(
        <Tag type="outlined" variant="accent">
          태그
        </Tag>,
      );
      expect(screen.getByText("태그")).toHaveClass(
        "bg-white",
        "inset-ring",
        "inset-ring-blue-300",
        "text-blue-600",
      );
    });

    it("outlined / neutral: 배경 white, 보더 Gray300, 텍스트 Gray700", () => {
      render(
        <Tag type="outlined" variant="neutral">
          태그
        </Tag>,
      );
      expect(screen.getByText("태그")).toHaveClass(
        "bg-white",
        "inset-ring",
        "inset-ring-gray-300",
        "text-gray-700",
      );
    });
  });

  it("className을 병합한다", () => {
    render(<Tag className="ml-2">태그</Tag>);
    const tag = screen.getByText("태그");
    expect(tag).toHaveClass("ml-2");
    expect(tag).toHaveClass("bg-blue-100");
  });
});
