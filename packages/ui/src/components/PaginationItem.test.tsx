import { render, screen } from "@testing-library/react";
import { PaginationItem } from "./PaginationItem";

describe("PaginationItem", () => {
  it("페이지 번호 children을 렌더링한다", () => {
    render(<PaginationItem>1</PaginationItem>);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  it("기본값은 default 상태 (30x30, gray-800, font-normal, 투명 border)", () => {
    render(<PaginationItem>1</PaginationItem>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass(
      "size-[30px]",
      "rounded-[2px]",
      "border-2",
      "border-transparent",
      "text-body-2",
      "text-gray-800",
      "font-normal",
    );
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveAttribute("data-state", "default");
    expect(btn).not.toHaveAttribute("aria-current");
  });

  describe("상호작용 의사상태 (hover/pressed/focused)", () => {
    it("Hover: gray-100 배경", () => {
      render(<PaginationItem>1</PaginationItem>);
      expect(screen.getByRole("button")).toHaveClass("hover:bg-gray-100");
    });

    it("Pressed: gray-200 배경", () => {
      render(<PaginationItem>1</PaginationItem>);
      expect(screen.getByRole("button")).toHaveClass("active:bg-gray-200");
    });

    it("Focused: white 배경 + blue-600 border + font-semibold", () => {
      render(<PaginationItem>1</PaginationItem>);
      expect(screen.getByRole("button")).toHaveClass(
        "focus-visible:bg-white",
        "focus-visible:border-blue-600",
        "focus-visible:font-semibold",
      );
    });
  });

  describe("논리 상태", () => {
    it("Selected: blue-100 배경 · blue-600 텍스트 · font-semibold · aria-current=page", () => {
      render(<PaginationItem selected>1</PaginationItem>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("bg-blue-100", "text-blue-600", "font-semibold");
      expect(btn).toHaveAttribute("aria-current", "page");
      expect(btn).toHaveAttribute("data-state", "selected");
    });

    it("Disabled: gray-400 텍스트 + 네이티브 disabled", () => {
      render(<PaginationItem disabled>1</PaginationItem>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("text-gray-400");
      expect(btn).toBeDisabled();
      expect(btn).toHaveAttribute("data-state", "disabled");
    });

    it("disabled가 selected보다 우선한다", () => {
      render(
        <PaginationItem selected disabled>
          1
        </PaginationItem>,
      );
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("data-state", "disabled");
      expect(btn).not.toHaveAttribute("aria-current");
    });
  });

  it("onClick 핸들러가 호출된다", () => {
    const onClick = jest.fn();
    render(<PaginationItem onClick={onClick}>1</PaginationItem>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled면 클릭이 무시된다", () => {
    const onClick = jest.fn();
    render(
      <PaginationItem disabled onClick={onClick}>
        1
      </PaginationItem>,
    );
    screen.getByRole("button").click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("className을 병합한다", () => {
    render(<PaginationItem className="mx-1">1</PaginationItem>);
    expect(screen.getByRole("button")).toHaveClass("mx-1", "size-[30px]");
  });
});
