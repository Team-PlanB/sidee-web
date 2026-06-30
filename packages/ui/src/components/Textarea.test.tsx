import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Textarea } from "./Textarea";

const container = () =>
  document.querySelector('[data-slot="textarea-container"]') as HTMLElement;
const counter = () =>
  document.querySelector('[data-slot="textarea-count"]') as HTMLElement | null;

describe("Textarea", () => {
  it("textarea를 렌더링한다", () => {
    render(<Textarea placeholder="메시지" />);
    const el = screen.getByPlaceholderText("메시지");
    expect(el.tagName).toBe("TEXTAREA");
  });

  it("ref를 forward한다 (폼 호환)", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("텍스트 body-1 gray-800 / placeholder gray-400, resize 없음", () => {
    render(<Textarea placeholder="ph" />);
    expect(screen.getByPlaceholderText("ph")).toHaveClass(
      "text-body-1",
      "text-gray-800",
      "placeholder:text-gray-400",
      "resize-none",
    );
  });

  it("입력박스: rounded-xl, border, p-3", () => {
    render(<Textarea />);
    expect(container()).toHaveClass("rounded-xl", "border", "p-3");
  });

  describe("라벨/필수", () => {
    it("label을 htmlFor로 연결", () => {
      render(<Textarea label="주제" />);
      expect(screen.getByLabelText("주제")).toBeInTheDocument();
    });
    it("required면 * (error)", () => {
      render(<Textarea label="주제" required />);
      expect(screen.getByText("*")).toHaveClass("text-error");
    });
  });

  describe("State", () => {
    it("default: border gray-200 + focus-within blue-600", () => {
      render(<Textarea />);
      expect(container()).toHaveClass(
        "border-gray-200",
        "focus-within:border-blue-600",
      );
    });
    it("invalid: border error + helper error + aria-invalid", () => {
      render(<Textarea invalid helperText="에러" />);
      expect(container()).toHaveClass("border-error");
      expect(container()).not.toHaveClass("focus-within:border-blue-600");
      expect(screen.getByText("에러")).toHaveClass("text-error");
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });
    it("disabled: bg gray-100 + native disabled", () => {
      render(<Textarea disabled />);
      expect(container()).toHaveClass("bg-gray-100", "border-gray-200");
      expect(screen.getByRole("textbox")).toBeDisabled();
    });
    it("비에러 helper는 gray-500", () => {
      render(<Textarea helperText="도움말" />);
      expect(screen.getByText("도움말")).toHaveClass("text-gray-500");
    });
  });

  describe("글자수 카운터", () => {
    it("maxLength가 있으면 현재/최대 카운터를 표시한다", () => {
      render(<Textarea maxLength={2000} />);
      expect(counter()).toBeInTheDocument();
      expect(counter()).toHaveTextContent("0/2000");
      expect(counter()?.firstChild).toHaveClass(
        "text-label-2",
        "text-gray-500",
      );
    });

    it("입력 시 카운터가 증가한다 (uncontrolled)", () => {
      render(<Textarea maxLength={2000} />);
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "안녕하세요" },
      });
      expect(counter()).toHaveTextContent("5/2000");
    });

    it("controlled value 길이를 반영한다", () => {
      render(<Textarea maxLength={2000} value="가나다" onChange={() => {}} />);
      expect(counter()).toHaveTextContent("3/2000");
    });

    it("maxLength가 없으면 카운터를 표시하지 않는다", () => {
      render(<Textarea />);
      expect(counter()).toBeNull();
    });

    it("showCount=false면 maxLength가 있어도 숨긴다", () => {
      render(<Textarea maxLength={100} showCount={false} />);
      expect(counter()).toBeNull();
    });
  });

  it("onChange가 호출된다", () => {
    const onChange = jest.fn();
    render(<Textarea onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "x" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("className은 루트에 병합", () => {
    render(<Textarea className="max-w-sm" />);
    expect(document.querySelector('[data-slot="textarea-field"]')).toHaveClass(
      "max-w-sm",
    );
  });
});
