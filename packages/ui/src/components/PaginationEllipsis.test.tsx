import { render, screen } from "@testing-library/react";
import { PaginationEllipsis } from "./PaginationEllipsis";

describe("PaginationEllipsis", () => {
  it("30x30 박스에 dots 아이콘을 렌더링한다", () => {
    render(<PaginationEllipsis data-testid="ellipsis" />);
    const el = screen.getByTestId("ellipsis");
    expect(el).toHaveClass("size-[30px]", "text-gray-800");
    expect(el.querySelector("svg")).toBeInTheDocument();
  });

  it("버튼이 아니다 (비인터랙티브)", () => {
    render(<PaginationEllipsis />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("스크린리더용 텍스트를 제공한다", () => {
    render(<PaginationEllipsis />);
    expect(screen.getByText("생략된 페이지")).toBeInTheDocument();
  });

  it("className 을 병합한다", () => {
    render(<PaginationEllipsis data-testid="ellipsis" className="mx-1" />);
    expect(screen.getByTestId("ellipsis")).toHaveClass("mx-1", "size-[30px]");
  });
});
