import { render, screen } from "@testing-library/react";
import { FilterChip } from "./FilterChip";

describe("FilterChip", () => {
  it("라벨 children을 렌더링한다", () => {
    render(<FilterChip>지역</FilterChip>);
    expect(screen.getByRole("button", { name: /지역/ })).toBeInTheDocument();
  });

  it("기본값은 medium / default (gray-200 border, gray-800 text)", () => {
    render(<FilterChip>지역</FilterChip>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("h-9", "rounded-full", "border", "font-medium");
    expect(btn).toHaveClass("border-gray-200", "text-gray-800");
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });

  describe("Size", () => {
    it("xsmall: h-6, caption-1, icon size-3", () => {
      render(<FilterChip size="xsmall">지역</FilterChip>);
      expect(screen.getByRole("button")).toHaveClass(
        "h-6",
        "px-2",
        "py-1",
        "text-caption-1",
        "[&_svg]:size-3",
      );
    });

    it("small: h-8, label-1", () => {
      render(<FilterChip size="small">지역</FilterChip>);
      expect(screen.getByRole("button")).toHaveClass("h-8", "text-label-1");
    });

    it("medium: h-9, body-2", () => {
      render(<FilterChip size="medium">지역</FilterChip>);
      expect(screen.getByRole("button")).toHaveClass("h-9", "text-body-2");
    });

    it("large: h-10, body-2, padding 9/14", () => {
      render(<FilterChip size="large">지역</FilterChip>);
      expect(screen.getByRole("button")).toHaveClass(
        "h-10",
        "px-3.5",
        "py-[9px]",
        "text-body-2",
      );
    });
  });

  describe("State", () => {
    it("Selected: bg blue-100, border/text blue-600, aria-pressed=true", () => {
      render(<FilterChip selected>지역</FilterChip>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("bg-blue-100", "border-blue-600", "text-blue-600");
      expect(btn).toHaveAttribute("aria-pressed", "true");
      expect(btn).toHaveAttribute("data-state", "selected");
    });

    it("Disabled: text gray-400 + 네이티브 disabled", () => {
      render(<FilterChip disabled>지역</FilterChip>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("border-gray-200", "text-gray-400");
      expect(btn).toBeDisabled();
    });

    it("disabled가 selected보다 우선한다", () => {
      render(
        <FilterChip selected disabled>
          지역
        </FilterChip>,
      );
      expect(screen.getByRole("button")).toHaveAttribute(
        "data-state",
        "disabled",
      );
    });
  });

  describe("아이콘 슬롯", () => {
    it("leadingIcon / trailingIcon을 렌더링한다", () => {
      render(
        <FilterChip
          leadingIcon={<svg data-testid="lead" />}
          trailingIcon={<svg data-testid="trail" />}
        >
          지역
        </FilterChip>,
      );
      expect(screen.getByTestId("lead")).toBeInTheDocument();
      expect(screen.getByTestId("trail")).toBeInTheDocument();
    });

    it("아이콘 미지정 시 svg가 없다", () => {
      render(<FilterChip>지역</FilterChip>);
      expect(screen.getByRole("button").querySelector("svg")).toBeNull();
    });
  });

  it("onClick 핸들러가 호출된다", () => {
    const onClick = jest.fn();
    render(<FilterChip onClick={onClick}>지역</FilterChip>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled면 클릭이 무시된다", () => {
    const onClick = jest.fn();
    render(
      <FilterChip disabled onClick={onClick}>
        지역
      </FilterChip>,
    );
    screen.getByRole("button").click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("className을 병합한다", () => {
    render(<FilterChip className="w-40">지역</FilterChip>);
    expect(screen.getByRole("button")).toHaveClass("w-40", "rounded-full");
  });
});
