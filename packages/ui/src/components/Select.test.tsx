import { fireEvent, render, screen } from "@testing-library/react";
import { Select } from "./Select";

const trigger = () => screen.getByRole("combobox");

describe("Select", () => {
  it("placeholder를 표시한다 (값 없음 → gray-400)", () => {
    render(<Select placeholder="선택해 주세요." />);
    const ph = screen.getByText("선택해 주세요.");
    expect(ph).toHaveClass("text-body-1", "text-gray-400");
  });

  it("단일 값 표시 (gray-800)", () => {
    render(<Select value="프론트엔드" />);
    expect(screen.getByText("프론트엔드")).toHaveClass("text-gray-800");
  });

  it("트리거: h-12, rounded-xl, role=combobox", () => {
    render(<Select />);
    expect(trigger()).toHaveClass("h-12", "rounded-xl", "border");
  });

  describe("라벨/필수", () => {
    it("label + aria-labelledby 연결", () => {
      render(<Select label="직군" />);
      expect(screen.getByText("직군")).toBeInTheDocument();
      expect(trigger()).toHaveAttribute("aria-labelledby");
    });
    it("required면 * (error)", () => {
      render(<Select label="직군" required />);
      expect(screen.getByText("*")).toHaveClass("text-error");
    });
  });

  describe("State", () => {
    it("default: border gray-200 + focus blue-600(단일)", () => {
      render(<Select />);
      expect(trigger()).toHaveClass(
        "border-gray-200",
        "focus:border-blue-600",
      );
    });
    it("multiselect focus는 blue-500", () => {
      render(<Select multiselect />);
      expect(trigger()).toHaveClass("focus:border-blue-500");
    });
    it("invalid: border error + aria-invalid + helper error", () => {
      render(<Select invalid helperText="에러" />);
      expect(trigger()).toHaveClass("border-error");
      expect(trigger()).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("에러")).toHaveClass("text-error");
    });
    it("disabled: bg gray-100 + aria-disabled + tabIndex 없음", () => {
      render(<Select disabled />);
      expect(trigger()).toHaveClass("bg-gray-100", "border-gray-200");
      expect(trigger()).toHaveAttribute("aria-disabled", "true");
      expect(trigger()).not.toHaveAttribute("tabindex");
    });
    it("비에러 helper는 gray-500", () => {
      render(<Select helperText="도움말" />);
      expect(screen.getByText("도움말")).toHaveClass("text-gray-500");
    });
  });

  describe("caret (active)", () => {
    it("active=off → ▼ (회전 없음)", () => {
      render(<Select />);
      expect(trigger()).toHaveAttribute("aria-expanded", "false");
      expect(trigger().querySelector("svg")).not.toHaveClass("rotate-180");
    });
    it("active=on → ▲ (rotate-180) + aria-expanded", () => {
      render(<Select active />);
      expect(trigger()).toHaveAttribute("aria-expanded", "true");
      expect(trigger().querySelector("svg")).toHaveClass("rotate-180");
    });
    it("caret 색: 빈값 gray-400 / 값 gray-800 / invalid gray-800 / disabled gray-400", () => {
      const { rerender } = render(<Select />);
      expect(trigger().querySelector("svg")).toHaveClass("text-gray-400");
      rerender(<Select value="x" />);
      expect(trigger().querySelector("svg")).toHaveClass("text-gray-800");
      rerender(<Select invalid />);
      expect(trigger().querySelector("svg")).toHaveClass("text-gray-800");
      rerender(<Select disabled value="x" />);
      expect(trigger().querySelector("svg")).toHaveClass("text-gray-400");
    });
  });

  describe("multiselect 칩", () => {
    const items = [
      { value: "fe", label: "프론트" },
      { value: "be", label: "백엔드" },
    ];

    it("선택 항목을 칩으로 표시 (gray-200/gray-700)", () => {
      render(<Select multiselect selectedItems={items} />);
      const chip = screen.getByText("프론트");
      expect(chip).toHaveClass("text-caption-1", "text-gray-700");
      expect(chip.parentElement).toHaveClass("bg-gray-200", "rounded-full");
    });

    it("칩 제거 버튼 클릭 시 onRemoveItem 호출 + 트리거 토글 안 됨", () => {
      const onRemoveItem = jest.fn();
      const onTrigger = jest.fn();
      render(
        <Select
          multiselect
          selectedItems={items}
          onRemoveItem={onRemoveItem}
          onTrigger={onTrigger}
        />,
      );
      const removeButtons = screen.getAllByRole("button", { name: "제거" });
      fireEvent.click(removeButtons[0]);
      expect(onRemoveItem).toHaveBeenCalledWith("fe");
      expect(onTrigger).not.toHaveBeenCalled();
    });

    it("disabled면 칩 제거 버튼이 없다", () => {
      render(<Select multiselect disabled selectedItems={items} />);
      expect(screen.queryByRole("button", { name: "제거" })).toBeNull();
    });

    it("값 없으면 placeholder를 표시", () => {
      render(<Select multiselect selectedItems={[]} />);
      expect(screen.getByText("선택해 주세요.")).toBeInTheDocument();
    });
  });

  describe("트리거 상호작용", () => {
    it("클릭 시 onTrigger 호출", () => {
      const onTrigger = jest.fn();
      render(<Select onTrigger={onTrigger} />);
      fireEvent.click(trigger());
      expect(onTrigger).toHaveBeenCalledTimes(1);
    });
    it("Enter/Space로 onTrigger 호출", () => {
      const onTrigger = jest.fn();
      render(<Select onTrigger={onTrigger} />);
      fireEvent.keyDown(trigger(), { key: "Enter" });
      fireEvent.keyDown(trigger(), { key: " " });
      expect(onTrigger).toHaveBeenCalledTimes(2);
    });
    it("disabled면 클릭해도 onTrigger 미호출", () => {
      const onTrigger = jest.fn();
      render(<Select disabled onTrigger={onTrigger} />);
      fireEvent.click(trigger());
      expect(onTrigger).not.toHaveBeenCalled();
    });
  });

  it("className은 루트에 병합", () => {
    render(<Select className="max-w-sm" />);
    expect(document.querySelector('[data-slot="select"]')).toHaveClass(
      "max-w-sm",
    );
  });
});
