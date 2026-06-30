import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TextField } from "./TextField";

const container = () =>
  document.querySelector('[data-slot="text-field-container"]') as HTMLElement;

describe("TextField", () => {
  it("placeholder를 가진 input을 렌더링한다", () => {
    render(<TextField placeholder="텍스트를 입력해 주세요." />);
    expect(
      screen.getByPlaceholderText("텍스트를 입력해 주세요."),
    ).toBeInTheDocument();
  });

  it("input ref를 forward한다 (폼 호환)", () => {
    const ref = createRef<HTMLInputElement>();
    render(<TextField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("입력 텍스트 body-1 gray-800 / placeholder gray-400", () => {
    render(<TextField placeholder="ph" />);
    expect(screen.getByPlaceholderText("ph")).toHaveClass(
      "text-body-1",
      "text-gray-800",
      "placeholder:text-gray-400",
    );
  });

  it("입력박스 기본: h-12, rounded-xl, border", () => {
    render(<TextField />);
    expect(container()).toHaveClass("h-12", "rounded-xl", "border");
  });

  describe("라벨 / 필수", () => {
    it("label을 input과 htmlFor로 연결한다", () => {
      render(<TextField label="주제" />);
      const input = screen.getByLabelText("주제");
      expect(input).toBeInTheDocument();
    });

    it("required면 * (error색) 표시", () => {
      render(<TextField label="주제" required />);
      const star = screen.getByText("*");
      expect(star).toHaveClass("text-error");
    });

    it("label이 없으면 헤딩 미표시", () => {
      render(<TextField />);
      expect(screen.queryByText("*")).toBeNull();
    });
  });

  describe("State", () => {
    it("default: border gray-200 + focus-within blue-600", () => {
      render(<TextField />);
      expect(container()).toHaveClass(
        "border-gray-200",
        "focus-within:border-blue-600",
      );
    });

    it("invalid: border error, helper error, aria-invalid", () => {
      render(<TextField invalid helperText="에러 메시지" />);
      expect(container()).toHaveClass("border-error");
      expect(container()).not.toHaveClass("focus-within:border-blue-600");
      expect(screen.getByText("에러 메시지")).toHaveClass("text-error");
      expect(screen.getByRole("textbox")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("disabled: bg gray-100, native disabled", () => {
      render(<TextField disabled />);
      expect(container()).toHaveClass("bg-gray-100", "border-gray-200");
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("비에러 helper는 gray-500", () => {
      render(<TextField helperText="도움말" />);
      expect(screen.getByText("도움말")).toHaveClass("text-gray-500");
      // aria-describedby 연결
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby");
    });
  });

  describe("trailing 버튼 (actionLabel)", () => {
    it("actionLabel 있으면 버튼 표시 + 박스 rounded-l-xl", () => {
      render(<TextField actionLabel="확인" />);
      expect(
        screen.getByRole("button", { name: "확인" }),
      ).toBeInTheDocument();
      expect(container()).toHaveClass("rounded-l-xl");
      expect(container()).not.toHaveClass("rounded-xl");
    });

    it("버튼 enabled 스타일: white/blue-600", () => {
      render(<TextField actionLabel="확인" />);
      expect(screen.getByRole("button", { name: "확인" })).toHaveClass(
        "bg-white",
        "text-blue-600",
        "rounded-r-xl",
      );
    });

    it("disabled면 버튼도 gray-100/gray-400 + disabled", () => {
      render(<TextField actionLabel="확인" disabled />);
      const btn = screen.getByRole("button", { name: "확인" });
      expect(btn).toHaveClass("bg-gray-100", "text-gray-400");
      expect(btn).toBeDisabled();
    });

    it("버튼 클릭 시 onActionClick 호출", () => {
      const onActionClick = jest.fn();
      render(<TextField actionLabel="확인" onActionClick={onActionClick} />);
      screen.getByRole("button", { name: "확인" }).click();
      expect(onActionClick).toHaveBeenCalledTimes(1);
    });

    it("actionLabel 없으면 버튼 없음 + 박스 rounded-xl", () => {
      render(<TextField />);
      expect(screen.queryByRole("button")).toBeNull();
      expect(container()).toHaveClass("rounded-xl");
    });
  });

  describe("아이콘 슬롯", () => {
    it("leadingIcon / trailing을 렌더링한다", () => {
      render(
        <TextField
          leadingIcon={<svg data-testid="lead" />}
          trailing={<svg data-testid="trail" />}
        />,
      );
      expect(screen.getByTestId("lead")).toBeInTheDocument();
      expect(screen.getByTestId("trail")).toBeInTheDocument();
    });
  });

  it("값 입력 시 onChange가 호출된다", () => {
    const onChange = jest.fn();
    render(<TextField onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "안녕" },
    });
    expect(onChange).toHaveBeenCalled();
  });

  it("className은 루트에 병합된다", () => {
    render(<TextField className="max-w-sm" />);
    expect(document.querySelector('[data-slot="text-field"]')).toHaveClass(
      "max-w-sm",
    );
  });
});
