import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Radio } from "./Radio";

/** box(span)는 input의 다음 형제 */
const boxOf = (input: HTMLElement) => input.nextElementSibling as HTMLElement;

describe("Radio", () => {
  it("radio input을 렌더링한다", () => {
    render(<Radio aria-label="옵션" />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("input ref를 forward한다 (폼 호환)", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio ref={ref} aria-label="옵션" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("name/value를 input에 전달한다", () => {
    render(<Radio name="plan" value="pro" aria-label="pro" />);
    const input = screen.getByRole("radio");
    expect(input).toHaveAttribute("name", "plan");
    expect(input).toHaveAttribute("value", "pro");
  });

  describe("Size", () => {
    it("medium: box size-5", () => {
      render(<Radio aria-label="옵션" />);
      expect(boxOf(screen.getByRole("radio"))).toHaveClass("size-5");
    });

    it("small: box size-4", () => {
      render(<Radio size="small" aria-label="옵션" />);
      expect(boxOf(screen.getByRole("radio"))).toHaveClass("size-4");
    });
  });

  describe("State", () => {
    it("Unchecked(기본): border gray-200, 점 없음", () => {
      render(<Radio aria-label="옵션" />);
      const box = boxOf(screen.getByRole("radio"));
      expect(box).toHaveClass("border-gray-200", "bg-transparent");
      expect(box.querySelector("span")).toBeNull();
    });

    it("Error: border error", () => {
      render(<Radio error aria-label="옵션" />);
      expect(boxOf(screen.getByRole("radio"))).toHaveClass("border-error");
    });

    it("Checked: bg blue-600 + 흰 점", () => {
      render(<Radio checked readOnly aria-label="옵션" />);
      const box = boxOf(screen.getByRole("radio"));
      expect(box).toHaveClass("bg-blue-600", "border-transparent");
      const dot = box.querySelector("span");
      expect(dot).toHaveClass("bg-white", "size-2");
    });

    it("Checked + small: 점 size-[7px]", () => {
      render(<Radio size="small" checked readOnly aria-label="옵션" />);
      expect(boxOf(screen.getByRole("radio")).querySelector("span")).toHaveClass(
        "size-[7px]",
      );
    });
  });

  describe("Disabled", () => {
    it("Unchecked + disabled: bg gray-100, native disabled", () => {
      render(<Radio disabled aria-label="옵션" />);
      const input = screen.getByRole("radio");
      expect(input).toBeDisabled();
      expect(boxOf(input)).toHaveClass("bg-gray-100", "border-gray-200");
    });

    it("Checked + disabled: 점은 blue-300 배경", () => {
      render(<Radio checked disabled readOnly aria-label="옵션" />);
      expect(boxOf(screen.getByRole("radio"))).toHaveClass("bg-blue-300");
    });
  });

  it("클릭 시 onChange가 호출된다", () => {
    const onChange = jest.fn();
    render(<Radio aria-label="옵션" onChange={onChange} />);
    fireEvent.click(screen.getByRole("radio"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("className을 label에 병합한다", () => {
    render(<Radio className="mr-2" aria-label="옵션" />);
    // label은 input의 부모
    expect(screen.getByRole("radio").parentElement).toHaveClass("mr-2", "group");
  });
});
