import { render, screen } from "@testing-library/react";
import { FilterSelect } from "./FilterSelect";

describe("FilterSelect", () => {
  it("라벨 children을 렌더링한다", () => {
    render(<FilterSelect>지역</FilterSelect>);
    expect(screen.getByRole("button", { name: /지역/ })).toBeInTheDocument();
  });

  it("기본값은 medium / default 이고 button type은 button", () => {
    render(<FilterSelect>지역</FilterSelect>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("h-9", "rounded-full", "border", "font-medium");
    expect(btn).toHaveClass("border-gray-200", "text-gray-800");
    expect(btn).toHaveAttribute("type", "button");
  });

  it("caret 아이콘을 렌더링한다", () => {
    render(<FilterSelect>지역</FilterSelect>);
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  describe("Size", () => {
    it("xsmall: h-6, caption-1, caret size-3", () => {
      render(<FilterSelect size="xsmall">지역</FilterSelect>);
      expect(screen.getByRole("button")).toHaveClass(
        "h-6",
        "py-1",
        "pr-1.5",
        "pl-2",
        "text-caption-1",
        "[&_svg]:size-3",
      );
    });

    it("small: h-8, label-1", () => {
      render(<FilterSelect size="small">지역</FilterSelect>);
      expect(screen.getByRole("button")).toHaveClass("h-8", "text-label-1");
    });

    it("medium: h-9, body-2", () => {
      render(<FilterSelect size="medium">지역</FilterSelect>);
      expect(screen.getByRole("button")).toHaveClass("h-9", "text-body-2");
    });

    it("large: h-10, body-2, padding 9/12/9/14", () => {
      render(<FilterSelect size="large">지역</FilterSelect>);
      expect(screen.getByRole("button")).toHaveClass(
        "h-10",
        "py-[9px]",
        "pr-3",
        "pl-3.5",
        "text-body-2",
      );
    });
  });

  describe("State", () => {
    it("default: 투명 배경, border gray-200, text gray-800", () => {
      render(<FilterSelect state="default">지역</FilterSelect>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("border-gray-200", "text-gray-800");
      expect(btn).not.toHaveClass("bg-blue-100");
      expect(btn).not.toBeDisabled();
    });

    it("focused: bg blue-100, border/text blue-600", () => {
      render(<FilterSelect state="focused">지역</FilterSelect>);
      expect(screen.getByRole("button")).toHaveClass(
        "bg-blue-100",
        "border-blue-600",
        "text-blue-600",
      );
    });

    it("disabled: text gray-400 + 네이티브 disabled", () => {
      render(<FilterSelect state="disabled">지역</FilterSelect>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("border-gray-200", "text-gray-400");
      expect(btn).toBeDisabled();
    });
  });

  describe("Active (드롭다운 열림)", () => {
    it("false: caret 회전 없음, aria-expanded=false", () => {
      render(<FilterSelect>지역</FilterSelect>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("aria-expanded", "false");
      expect(btn.querySelector("svg")).not.toHaveClass("rotate-180");
    });

    it("true: caret 180° 회전(▲), aria-expanded=true", () => {
      render(<FilterSelect active>지역</FilterSelect>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("aria-expanded", "true");
      expect(btn.querySelector("svg")).toHaveClass("rotate-180");
    });
  });

  it("onClick 핸들러가 호출된다", () => {
    const onClick = jest.fn();
    render(<FilterSelect onClick={onClick}>지역</FilterSelect>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled면 클릭이 무시된다", () => {
    const onClick = jest.fn();
    render(
      <FilterSelect state="disabled" onClick={onClick}>
        지역
      </FilterSelect>,
    );
    screen.getByRole("button").click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("className을 병합한다", () => {
    render(<FilterSelect className="w-40">지역</FilterSelect>);
    expect(screen.getByRole("button")).toHaveClass("w-40", "rounded-full");
  });
});
