import { render, screen } from "@testing-library/react";
import { SegmentedControl } from "./SegmentedControl";

const items = [
  {
    value: "card",
    ariaLabel: "카드로 보기",
    icon: <svg data-testid="card-icon" />,
  },
  {
    value: "list",
    ariaLabel: "리스트로 보기",
    icon: <svg data-testid="list-icon" />,
  },
];

describe("SegmentedControl", () => {
  it("radiogroup 안에 세그먼트를 렌더링한다", () => {
    render(<SegmentedControl items={items} value="list" />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
    expect(screen.getByTestId("list-icon")).toBeInTheDocument();
  });

  it("선택된 값에 aria-checked / data-state=active 를 준다", () => {
    render(<SegmentedControl items={items} value="list" />);
    const list = screen.getByRole("radio", { name: "리스트로 보기" });
    const card = screen.getByRole("radio", { name: "카드로 보기" });
    expect(list).toHaveAttribute("aria-checked", "true");
    expect(list).toHaveAttribute("data-state", "active");
    expect(card).toHaveAttribute("aria-checked", "false");
    expect(card).toHaveAttribute("data-state", "inactive");
  });

  it("active asset 은 blue-100/blue-600, inactive 는 gray-400", () => {
    render(<SegmentedControl items={items} value="list" />);
    const listAsset = screen
      .getByRole("radio", { name: "리스트로 보기" })
      .querySelector("span");
    const cardAsset = screen
      .getByRole("radio", { name: "카드로 보기" })
      .querySelector("span");
    expect(listAsset).toHaveClass("bg-blue-100", "text-blue-600");
    expect(cardAsset).toHaveClass("text-gray-400");
  });

  it("세그먼트 클릭 시 onChange(value) 를 호출한다", () => {
    const onChange = jest.fn();
    render(<SegmentedControl items={items} value="list" onChange={onChange} />);
    screen.getByRole("radio", { name: "카드로 보기" }).click();
    expect(onChange).toHaveBeenCalledWith("card");
  });

  it("label 을 렌더링한다", () => {
    render(
      <SegmentedControl
        items={[
          { value: "a", label: "목록" },
          { value: "b", label: "격자" },
        ]}
        value="a"
      />,
    );
    expect(screen.getByRole("radio", { name: "목록" })).toBeInTheDocument();
  });
});
