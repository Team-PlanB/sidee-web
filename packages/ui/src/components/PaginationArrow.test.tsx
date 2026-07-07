import { render, screen } from "@testing-library/react";
import { PaginationArrow } from "./PaginationArrow";

describe("PaginationArrow", () => {
  it("방향별 기본 aria-label 과 아이콘을 렌더링한다", () => {
    const { rerender } = render(<PaginationArrow direction="first" />);
    expect(screen.getByLabelText("처음 페이지")).toBeInTheDocument();

    rerender(<PaginationArrow direction="prev" />);
    expect(screen.getByLabelText("이전 페이지")).toBeInTheDocument();

    rerender(<PaginationArrow direction="next" />);
    expect(screen.getByLabelText("다음 페이지")).toBeInTheDocument();

    rerender(<PaginationArrow direction="last" />);
    const btn = screen.getByLabelText("마지막 페이지");
    expect(btn).toBeInTheDocument();
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("기본 박스는 30x30, gray-800, type=button, data-direction", () => {
    render(<PaginationArrow direction="prev" />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass(
      "size-[30px]",
      "rounded-[2px]",
      "border-2",
      "border-transparent",
      "text-gray-800",
    );
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveAttribute("data-direction", "prev");
  });

  it("상호작용 의사상태 클래스를 가진다", () => {
    render(<PaginationArrow direction="next" />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass(
      "hover:bg-gray-100",
      "active:bg-gray-200",
      "focus-visible:bg-white",
      "focus-visible:border-blue-600",
    );
  });

  it("Disabled: gray-400 아이콘 + 네이티브 disabled + 클릭 무시", () => {
    const onClick = jest.fn();
    render(<PaginationArrow direction="prev" disabled onClick={onClick} />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("disabled:text-gray-400");
    expect(btn).toBeDisabled();
    btn.click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("onClick 핸들러가 호출된다", () => {
    const onClick = jest.fn();
    render(<PaginationArrow direction="next" onClick={onClick} />);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("aria-label 을 재정의할 수 있다", () => {
    render(<PaginationArrow direction="next" aria-label="다음으로" />);
    expect(screen.getByLabelText("다음으로")).toBeInTheDocument();
  });

  it("className 을 병합한다", () => {
    render(<PaginationArrow direction="prev" className="ml-2" />);
    expect(screen.getByRole("button")).toHaveClass("ml-2", "size-[30px]");
  });
});
