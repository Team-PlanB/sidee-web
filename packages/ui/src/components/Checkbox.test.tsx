import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

const boxOf = (input: HTMLElement) => input.nextElementSibling as HTMLElement;

describe("Checkbox", () => {
  it("checkbox input을 렌더링한다", () => {
    render(<Checkbox aria-label="동의" />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("input ref를 forward한다 (폼 호환)", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="동의" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("박스는 rounded-[5px] (사각형)", () => {
    render(<Checkbox aria-label="동의" />);
    expect(boxOf(screen.getByRole("checkbox"))).toHaveClass("rounded-[5px]");
  });

  describe("Size", () => {
    it("medium: box size-5", () => {
      render(<Checkbox aria-label="동의" />);
      expect(boxOf(screen.getByRole("checkbox"))).toHaveClass("size-5");
    });

    it("small: box size-4", () => {
      render(<Checkbox size="small" aria-label="동의" />);
      expect(boxOf(screen.getByRole("checkbox"))).toHaveClass("size-4");
    });
  });

  describe("State", () => {
    it("Unchecked(기본): border gray-200, 체크 아이콘 없음", () => {
      render(<Checkbox aria-label="동의" />);
      const box = boxOf(screen.getByRole("checkbox"));
      expect(box).toHaveClass("border-gray-200", "bg-transparent");
      expect(box.querySelector("svg")).toBeNull();
    });

    it("Error: border error", () => {
      render(<Checkbox error aria-label="동의" />);
      expect(boxOf(screen.getByRole("checkbox"))).toHaveClass("border-error");
    });

    it("Checked: bg blue-600 + 흰 체크 아이콘", () => {
      render(<Checkbox checked readOnly aria-label="동의" />);
      const box = boxOf(screen.getByRole("checkbox"));
      expect(box).toHaveClass("bg-blue-600", "border-transparent");
      expect(box.querySelector("svg")).toHaveClass("text-white", "size-4");
    });

    it("Checked + small: 체크 아이콘 size-3.5", () => {
      render(<Checkbox size="small" checked readOnly aria-label="동의" />);
      expect(boxOf(screen.getByRole("checkbox")).querySelector("svg")).toHaveClass(
        "size-3.5",
      );
    });
  });

  describe("Disabled", () => {
    it("Unchecked + disabled: bg gray-100, native disabled", () => {
      render(<Checkbox disabled aria-label="동의" />);
      const input = screen.getByRole("checkbox");
      expect(input).toBeDisabled();
      expect(boxOf(input)).toHaveClass("bg-gray-100", "border-gray-200");
    });

    it("Checked + disabled (medium): bg blue-200", () => {
      render(<Checkbox checked disabled readOnly aria-label="동의" />);
      expect(boxOf(screen.getByRole("checkbox"))).toHaveClass("bg-blue-200");
    });

    it("Checked + disabled (small): bg blue-300", () => {
      render(<Checkbox size="small" checked disabled readOnly aria-label="동의" />);
      expect(boxOf(screen.getByRole("checkbox"))).toHaveClass("bg-blue-300");
    });
  });

  it("클릭 시 onChange가 호출된다", () => {
    const onChange = jest.fn();
    render(<Checkbox aria-label="동의" onChange={onChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("className을 label에 병합한다", () => {
    render(<Checkbox className="mr-2" aria-label="동의" />);
    expect(screen.getByRole("checkbox").parentElement).toHaveClass(
      "mr-2",
      "group",
    );
  });
});
